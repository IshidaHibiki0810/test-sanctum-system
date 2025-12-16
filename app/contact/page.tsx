// app/contact/page.tsx

"use client"; // ← フォーム送信処理を行うのでクライアントコンポーネント化が必要

import React, { useState } from "react";

export default function ContactPage() {
  // ★ 追加: 入力値を管理するための useState フック
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  // ★ 追加: フォーム送信処理
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, message }),
    });
    const data = await res.json();
    alert(data.message); // 成功/失敗メッセージを表示
  }

  return (
    <main className="container mx-auto p-4 md:p-8 max-w-3xl font-sans text-gray-800">
      {/* ヘッダー */}
      <header className="py-8 border-b border-gray-300 mb-8 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
          お問い合わせ
        </h1>
        <p className="text-lg mt-2 text-indigo-700 font-semibold">
          Contact Us
        </p>
      </header>

      {/* お問い合わせフォーム */}
      <section className="mb-10 p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold mb-4 border-b pb-2 text-indigo-600">
          フォーム
        </h2>
        {/* ★ 変更: onSubmit に handleSubmit を設定 */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* 名前 */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              お名前
            </label>
            <input
              type="text"
              id="name"
              name="name"
              // ★ 変更: value と onChange を追加
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="例: 山田 太郎"
            />
          </div>

          {/* メールアドレス */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              メールアドレス
            </label>
            <input
              type="email"
              id="email"
              name="email"
              // ★ 変更: value と onChange を追加
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="your@example.com"
            />
          </div>

          {/* メッセージ */}
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">
              お問い合わせ内容
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              // ★ 変更: value と onChange を追加
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="ご用件をご記入ください"
            ></textarea>
          </div>

          {/* 送信ボタン */}
          <div className="text-center">
            <button
              type="submit"
              className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
            >
              送信
            </button>
          </div>
        </form>
      </section>

      {/* フッター */}
      <footer className="pt-8 border-t border-gray-300 text-center">
        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} 中条 俊介
        </p>
      </footer>
    </main>
  );
}