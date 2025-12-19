import { NextResponse } from 'next/server';
import { createClient } from '@libsql/client';

const client = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // 1. バリデーション
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "必須項目が不足しています" }, 
        { status: 400 }
      );
    }

    // 2. DB保存の実行
    // テーブル定義にある 'subject' と 'status' が NOT NULL なので、ここで明示的に値を入れます。
    // カラム名が 'subject' であることを再確認してください。
    await client.execute({
      sql: "INSERT INTO contacts (name, email, subject, message, status) VALUES (?, ?, ?, ?, ?)",
      args: [
        String(name), 
        String(email), 
        "Webサイトからのお問い合わせ", // subject への自動入力
        String(message), 
        "New"                         // status への自動入力
      ]
    });

    return NextResponse.json({ success: true });

  } catch (error: any) {
    console.error("送信エラー:", error);
    
    // エラーメッセージをより詳細に返す
    return NextResponse.json(
      { error: "送信に失敗しました", detail: error.message }, 
      { status: 500 }
    );
  }
}