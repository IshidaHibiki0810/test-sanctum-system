"use server";

import { getDbClient } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { writeFile, mkdir, unlink } from 'fs/promises'; // unlinkを追加
import path from 'path';

/**
 * 物理ファイルを削除する内部関数
 */
async function deleteImageFile(imageUrl: string | null) {
    if (!imageUrl) return;

    try {
        // imageUrl は "/uploads/filename.jpg" の形式なので、物理パスに変換
        const filePath = path.join(process.cwd(), 'public', imageUrl);
        await unlink(filePath);
        console.log(`✅ 物理ファイルを削除しました: ${filePath}`);
    } catch (error: any) {
        // ファイルが存在しない場合などのエラーは無視して進行
        if (error.code === 'ENOENT') {
            console.warn("⚠️ 削除対象のファイルが見つかりませんでした。");
        } else {
            console.error("❌ ファイル削除失敗:", error);
        }
    }
}

/**
 * 画像ファイルをサーバーに保存し、URLパスを返す内部関数
 */
async function saveImage(formData: FormData, fieldName: string): Promise<string | null> {
    const file = formData.get(fieldName) as File | null;
    
    if (!file || file.name === 'undefined' || file.size === 0) {
        return null;
    }

    try {
        const uploadDir = path.join(process.cwd(), 'public', 'uploads');
        await mkdir(uploadDir, { recursive: true });

        const fileName = `${Date.now()}-${file.name}`;
        const filePath = path.join(uploadDir, fileName);

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        await writeFile(filePath, buffer);

        return `/uploads/${fileName}`;
    } catch (error) {
        console.error("📸 画像保存失敗:", error);
        return null;
    }
}

/**
 * 1. 新規記録を作成する (Create)
 */
export async function createRecord(prevState: any, formData: FormData) {
    const title = String(formData.get('title') || "");
    const content = String(formData.get('content') || "");
    const record_date = String(formData.get('record_date') || "");
    const category = String(formData.get('category') || "未分類");
    const is_published = formData.get('is_published') === '1' || formData.get('is_published') === 'on' ? 1 : 0;

    const image_url = await saveImage(formData, 'image');

    if (!title || !record_date) {
        return { success: false, message: "タイトルと実施日は必須です。" };
    }

    try {
        const db = getDbClient();
        await db.execute({
            sql: `INSERT INTO records (title, content, record_date, is_published, image_url, category, created_at) 
                  VALUES (?, ?, ?, ?, ?, ?, DATETIME('now', 'localtime'))`,
            args: [title, content, record_date, is_published, image_url, category],
        });

        revalidatePath('/admin/records');
        revalidatePath('/admin');
        return { success: true, message: "記録を正常に作成しました。" };
    } catch (error) {
        console.error("❌ 作成エラー:", error);
        return { success: false, message: "保存中にエラーが発生しました。" };
    }
}

/**
 * 2. 既存の記録を更新する (Update)
 */
export async function updateRecord(prevState: any, formData: FormData) {
    const id = formData.get('id');
    const title = String(formData.get('title') || "");
    const content = String(formData.get('content') || "");
    const record_date = String(formData.get('record_date') || "");
    const category = String(formData.get('category') || "未分類");
    const is_published = formData.get('is_published') === '1' || formData.get('is_published') === 'on' ? 1 : 0;

    const new_image_url = await saveImage(formData, 'image');
    const existing_image_url = formData.get('existing_image_url') as string | null;
    
    // ✅ 画像が新しくアップロードされた場合、古い画像を削除する
    if (new_image_url && existing_image_url) {
        await deleteImageFile(existing_image_url);
    }

    const final_image_url = new_image_url || existing_image_url;

    if (!id || !title || !record_date) {
        return { success: false, message: "必須項目が不足しています。" };
    }

    try {
        const db = getDbClient();
        await db.execute({
            sql: `UPDATE records 
                  SET title = ?, content = ?, record_date = ?, is_published = ?, image_url = ?, category = ?
                  WHERE id = ?`,
            args: [title, content, record_date, is_published, final_image_url, category, String(id)],
        });

        revalidatePath('/admin/records');
        revalidatePath(`/admin/records/edit/${id}`);
        return { success: true, message: "記録を更新しました。" };
    } catch (error) {
        console.error("❌ 更新エラー:", error);
        return { success: false, message: "更新中にエラーが発生しました。" };
    }
}

/**
 * 3. 公開状態の切り替え (Toggle)
 */
export async function togglePublishStatus(id: number, currentStatus: number) {
    const newStatus = currentStatus === 1 ? 0 : 1;
    try {
        const db = getDbClient();
        await db.execute({
            sql: `UPDATE records SET is_published = ? WHERE id = ?`,
            args: [newStatus, id],
        });
        revalidatePath('/admin/records');
    } catch (error) {
        console.error("❌ 切り替えエラー:", error);
        throw new Error("更新に失敗しました");
    }
}

/**
 * 4. 記録の削除 (Delete)
 */
export async function deleteRecord(id: number) {
    try {
        const db = getDbClient();

        // ✅ 1. 削除前にDBから画像URLを取得
        const result = await db.execute({
            sql: `SELECT image_url FROM records WHERE id = ?`,
            args: [id],
        });
        const imageUrl = result.rows[0]?.image_url as string | null;

        // ✅ 2. 物理ファイルを削除
        if (imageUrl) {
            await deleteImageFile(imageUrl);
        }

        // 3. DBからレコードを削除
        await db.execute({
            sql: `DELETE FROM records WHERE id = ?`,
            args: [id],
        });

        revalidatePath('/admin/records');
        revalidatePath('/admin');
    } catch (error) {
        console.error("❌ 削除エラー:", error);
        throw new Error("削除に失敗しました");
    }
}