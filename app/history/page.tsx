// app/history/page.tsx

import React from "react";

export default function HistoryPage() {
  return (
    <main className="container mx-auto p-4 md:p-8 max-w-3xl font-sans text-gray-800">
      {/* ヘッダー */}
      <header className="py-8 border-b border-gray-300 mb-8 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
          History
        </h1>
        <p className="text-lg mt-2 text-indigo-700 font-semibold">
          仮ページ（準備中）
        </p>
      </header>

      {/* コンテンツ */}
      <section className="mb-10 p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold mb-4 border-b pb-2 text-indigo-600">
          過去の記録
        </h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>年表形式での経歴紹介</li>
          <li>プロジェクトごとの成果まとめ</li>
          <li>受賞歴やイベント参加記録</li>
          <li>写真や資料のアーカイブ</li>
        </ul>
        <p className="mt-6 text-gray-500 italic">
          ※ 現在は仮ページです。今後詳細な履歴情報を追加予定です。
        </p>
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
