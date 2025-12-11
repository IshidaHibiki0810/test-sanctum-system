// app/admin/page.tsx

import React from 'react';
import Link from 'next/link';

export default function AdminHomePage() {
  return (
    // ★ 1. mainタグ全体にスタイルを適用
    <main className="p-8 bg-indigo-50 min-h-screen font-sans">
      
      {/* ★ 2. Linkタグにスタイルを適用 */}
      <Link 
        href="/" 
        className="text-indigo-600 hover:text-indigo-800 transition duration-150"
      >
        ← Public Siteへ戻る
      </Link>
      
      {/* ★ 3. h1タグにスタイルを適用 */}
      <h1 className="text-4xl font-extrabold text-indigo-900 mt-4 mb-4 border-b-2 border-indigo-200 pb-2">
        🛡️ Sanctum Order System 管理サイト
      </h1>
      
      <p className="text-gray-700 mb-6">ここでは、事例データやユーザー情報の管理を行います。</p>
      
      <hr className="my-6 border-indigo-100" />
      
      <div className="bg-white p-6 rounded-lg shadow-xl">
        <h2 className="text-2xl font-semibold text-green-600 mb-3">
          ✅ 次のステップ: 認証の実装
        </h2>
        <p className="text-gray-600">
          管理サイトを保護するため、NextAuth.jsなどを使用した認証機能を実装する必要があります。
        </p>
      </div>

      <p className="mt-8 text-sm text-gray-500">
        現在のURL: http://localhost:3000/admin
      </p>
    </main>
  );
}