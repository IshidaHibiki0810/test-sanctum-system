// app/login/page.tsx

'use client'; // ★ これがあるか確認

import React from 'react';
import { signIn } from 'next-auth/react'; // ログイン処理用
import Link from 'next/link';

// ログインページコンポーネント (クライアントコンポーネントにする必要がある)
export default function LoginPage() {
    
  // ログインフォームの送信ハンドラ
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const username = formData.get('username') as string;
    const password = formData.get('password') as string;

    // NextAuth.js の signIn 関数を呼び出し、認証を実行
    const result = await signIn('credentials', {
      username,
      password,
      redirect: true,
      callbackUrl: '/admin', // 認証成功時に /admin にリダイレクト
    });

    if (result?.error) {
      alert('ログインに失敗しました: ' + result.error);
    }
  };

  return (
    <main className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-xl">
        <Link href="/" className="text-sm text-gray-500 hover:text-indigo-600 mb-6 block">← Public Siteへ戻る</Link>
        <h1 className="text-3xl font-bold mb-6 text-indigo-800 text-center">🔐 管理者ログイン</h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">ユーザー名</label>
            <input 
              name="username" 
              type="text" 
              required 
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="admin"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">パスワード</label>
            <input 
              name="password" 
              type="password" 
              required 
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="password123"
            />
          </div>
          <button 
            type="submit" 
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition duration-150 font-semibold"
          >
            ログイン
          </button>
        </form>
        
        <p className="mt-6 text-center text-sm text-gray-500">
          テスト用アカウント: admin / password123
        </p>
      </div>
    </main>
  );
}