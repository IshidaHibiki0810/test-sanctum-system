// app/api/contact/route.ts
import { NextResponse } from "next/server";
import { db } from "../../lib/db";

export async function POST(req: Request) {
  const { name, email, message } = await req.json();

  try {
    await db.execute({
      sql: "INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)",
      args: [name, email, message],
    });

    return NextResponse.json({ message: "お問い合わせを保存しました！" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "保存に失敗しました" }, { status: 500 });
  }
}
