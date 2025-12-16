// lib/db.ts
import { createClient } from "@libsql/client";

// 環境変数を読み込む (.env.local の DATABASE_URL / DATABASE_AUTH_TOKEN を参照)
const DB_URL = process.env.DATABASE_URL;
const DB_TOKEN = process.env.DATABASE_AUTH_TOKEN;

// デバッグ用ログ（起動時に確認できる）
console.log("DB URL:", DB_URL ?? "undefined");
console.log("Auth Token:", DB_TOKEN ? "Loaded" : "Missing");

// DBクライアントを作成
export const client = createClient({
  url: process.env.DATABASE_URL!,
  authToken: process.env.DATABASE_AUTH_TOKEN!,
});
