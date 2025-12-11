// app/api/cases/route.ts

import { NextResponse } from 'next/server';
import { createClient } from "@libsql/client";

// 環境変数からTurso接続情報を取得
const url = process.env.DATABASE_URL;
const authToken = process.env.DATABASE_AUTH_TOKEN;

// Tursoクライアントの初期化
const client = createClient({
    url: url,
    authToken: authToken,
});

/**
 * GETリクエストのハンドラー (事例一覧の読み込み/Read操作)
 * URL: /api/cases
 */
export async function GET() {
    try {
        // --- 1. 初期化とテーブル作成 (初回のみ必要) ---
        // データベースにテーブルが存在しない場合に作成します
        await client.execute(`
            CREATE TABLE IF NOT EXISTS cases (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL,
                content TEXT NOT NULL
            );
        `);
        
        // --- 2. データの取得 ---
        const result = await client.execute("SELECT * FROM cases");

        // --- 3. データをJSON形式で返す ---
        // Next.jsのNextResponseを使用してJSONを返します
        return NextResponse.json(result.rows, { status: 200 });

    } catch (error) {
        console.error("APIエラー:", error);
        
        // エラーをクライアントに返す
        return NextResponse.json(
            { error: 'データベースからの事例取得に失敗しました。' },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        // リクエストボディからデータ（title, content）を取得
        const body = await request.json();
        const { title, content } = body;
        
        if (!title || !content) {
            return NextResponse.json({ error: 'タイトルと内容が必要です。' }, { status: 400 });
        }

        // データの挿入（プリペアドステートメントを使用）
        const result = await client.execute({
            sql: "INSERT INTO cases (title, content) VALUES (?, ?)",
            args: [title, content],
        });

        // 修正点: lastInsertRowid が BigInt の可能性があるため、String() で文字列に変換する
        return NextResponse.json(
            { 
                message: '事例データが正常に挿入されました。', 
                id: String(result.lastInsertRowid), // ここを修正！
                title, 
                content 
            }, 
            { status: 201 } // 201 Created を返す
        );

    } catch (error) {
        console.error("POST APIエラー:", error);
        
        // エラーをクライアントに返す
        return NextResponse.json(
            { error: 'データの挿入に失敗しました。' },
            { status: 500 }
        );
    }
}