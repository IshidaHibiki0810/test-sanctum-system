// /app/admin/records/edit/[id]/page.tsx

export const dynamic = 'force-dynamic'; // 常に最新のデータを取得

import { getDbClient } from '@/lib/db';
import { notFound } from 'next/navigation';
import Link from 'next/link';
// 💡 Client Component をインポート
// ご自身の環境のディレクトリ構造に合わせてパスを調整してください。
// (例: ../../components/EditFormStatus, または ../../../components/EditFormStatus など)
import EditFormStatus from '../../../../components/EditFormStatus'; 


// URLパラメータの型定義
interface EditPageProps {
  params: {
    id: string; // 編集対象のレコードID
  };
}

// 記録データの型定義
interface RecordData {
  id: number;
  title: string;
  content: string;
  record_date: string;
  category: string | null;
  is_published: number; // 1:公開, 0:非公開
}

/**
 * 💡 環境依存エラー回避策: paramsを非同期で解決するヘルパー関数
 */
async function getParams(params: EditPageProps['params']) {
    return await params; 
}

/**
 * データベースから編集対象のレコードをIDで取得する関数
 */
async function getRecordForEdit(id: string): Promise<RecordData | null> {
  if (isNaN(Number(id))) {
    return null;
  }
  
  try {
    const db = getDbClient();
    
    const result = await db.execute({
      sql: `SELECT id, title, content, record_date, category, is_published 
            FROM records 
            WHERE id = ?`,
      args: [id],
    });
    
    if (result.rows.length === 0) {
      return null; 
    }

    const row = result.rows[0];
    return {
      id: row.id as number,
      title: row.title as string,
      content: row.content as string,
      record_date: row.record_date as string,
      category: row.category as string | null,
      is_published: row.is_published as number,
    };
    
  } catch (error) {
    console.error("❌ 編集データ取得エラー:", error);
    return null;
  }
}

export default async function EditRecordPage({ params }: EditPageProps) {
  
  // 💡 修正点: getParamsを使って非同期でparamsを取得し、その結果からIDを取り出す
  const resolvedParams = await getParams(params); 
  const recordId = resolvedParams.id; // <-- ここでエラーが出ていたはず

  const record = await getRecordForEdit(recordId);

  // レコードが見つからない場合は404
  if (!record) {
    notFound();
  }
  
  // フォームの初期状態（データとステータス）を定義
  const initialState = {
      ...record,
      success: false,
      message: '初期状態', // フォームの状態を追跡するためのメッセージ
  };

  return (
    <main className="container mx-auto p-4 md:p-8 max-w-2xl font-sans">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-2">
        活動記録の編集 (ID: {record.id})
      </h1>

      <Link href="/admin/records" className="text-indigo-600 hover:text-indigo-800 text-sm mb-4 inline-block">
        ← 管理一覧に戻る
      </Link>
      
      {/* フォームの状態とメッセージ、およびフォーム本体を Client Component でレンダリング */}
      <EditFormStatus 
          initialState={initialState} 
          recordId={record.id} 
      />

    </main>
  );
}