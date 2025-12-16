// app/api/cases/route.ts

import { NextResponse } from 'next/server';
import { createClient } from "@libsql/client";

// 環境変数からTurso接続情報を取得
const url = process.env.DATABASE_URL;
const authToken = process.env.DATABASE_AUTH_TOKEN;

// Tursoクライアントの初期化
const client = createClient({
    url: url!,
    authToken: authToken!,
});

/**
 * GETリクエストのハンドラー (事例一覧の読み込み/Read操作)
 * URL: /api/cases
 */
export async function GET() {
  try {
    // ① テーブル初期化（そのまま）
    await client.execute(`
      CREATE TABLE IF NOT EXISTS cases (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        content TEXT NOT NULL
      );
    `);

    // ② データ取得（そのまま）
    const result = await client.execute(
      'SELECT id, title, content FROM cases'
    );

    // ③ 成功時レスポンス（拡張）
    return NextResponse.json(
      {
        ok: true,
        rows: result.rows,
        count: result.rows.length,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('❌ API /api/case error:', error);

    // ④ 失敗時レスポンス（デバッグ付き）
    return NextResponse.json(
      {
        ok: false,
        message: error.message,
        name: error.name,
        stack:
          process.env.NODE_ENV === 'development'
            ? error.stack
            : undefined,
      },
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
