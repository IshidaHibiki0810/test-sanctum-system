// app/blog/page.tsx

import React from "react";

interface BlogPost {
  title: string;
  date: string;
  summary: string;
}

const blogPosts: BlogPost[] = [
  {
    title: "初めてのNext.js開発",
    date: "2025-12-01",
    summary: "Next.jsを使ったプロジェクトの立ち上げ方法や、App Routerの基本を紹介します。",
  },
  {
    title: "Tailwind CSSで効率的にデザイン",
    date: "2025-12-05",
    summary: "ユーティリティクラスを活用して、レスポンシブで美しいUIを素早く構築する方法。",
  },
  {
    title: "SQLiteとTurso DBの使い分け",
    date: "2025-12-10",
    summary: "軽量なSQLiteとクラウド対応のTurso DBをどう使い分けるかを解説します。",
  },
];

export default function BlogPage() {
  return (
    <main className="container mx-auto p-4 md:p-8 max-w-3xl font-sans text-gray-800">
      {/* ヘッダー */}
      <header className="py-8 border-b border-gray-300 mb-8 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
          ブログ
        </h1>
        <p className="text-lg mt-2 text-indigo-700 font-semibold">
          Blog Posts
        </p>
      </header>

      {/* 記事一覧 */}
      <section className="space-y-8">
        {blogPosts.map((post, index) => (
          <article key={index} className="p-6 bg-white shadow rounded-lg">
            <h2 className="text-2xl font-bold text-indigo-600 mb-2">
              {post.title}
            </h2>
            <p className="text-sm text-gray-500 mb-4">{post.date}</p>
            <p className="text-base text-gray-700">{post.summary}</p>
          </article>
        ))}
      </section>

      {/* フッター */}
      <footer className="pt-8 border-t border-gray-300 text-center mt-10">
        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} 中条 俊介
        </p>
      </footer>
    </main>
  );
}
