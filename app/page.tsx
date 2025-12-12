// app/page.tsx (API接続版)

import React from 'react';


// Turso APIから事例データを取得する関数
async function fetchCaseDataFromAPI() {
  // 環境変数からローカル開発URLを取得
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'; // ローカルホストをデフォルト値に

  // 修正: フルURLを使ってフェッチする
  const res = await fetch(`${baseUrl}/api/cases`, { 
      // キャッシュを無効化（開発中は特に）
      cache: 'no-store' 
  });

  if (!res.ok) {
    // APIからエラーコードが返された場合のエラーメッセージ
    const errorText = await res.text();
    console.error("API Fetch Failed:", errorText);
    throw new Error('APIからのデータ取得に失敗しました。');
  }

  // APIから返されたJSONデータ（事例の配列）を返す
  return res.json();
}

// ページコンポーネント
export default async function HomePage() {
  let cases: any[] = [];
  let error: string | null = null;
  
  try {
    // APIから事例データを取得
    cases = await fetchCaseDataFromAPI();
  } catch (e: any) {
    error = e.message;
    console.error("Error displaying cases:", e);
  }
  
  return (
    <main style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1 className="text-4xl font-extrabold text-indigo-900 mt-4 mb-4 border-b-2 border-indigo-200 pb-2">
        Sanctum Order System (Turso API接続テスト)
      </h1>
      <p>このデータは、作成したサーバーレスAPI（/api/cases）を通じてTurso DBから取得されます。</p>
      
      <hr />
      
      {error ? (
        // エラーが発生した場合
        <div style={{ color: 'red', border: '1px solid red', padding: '10px' }}>
          <h2>🚨 接続エラー</h2>
          <p>{error}</p>
          <p>
            原因として、TursoのDB接続情報（.env.localの 
            <code>DATABASE_URL</code> や <code>DATABASE_AUTH_TOKEN</code>）が間違っている可能性があります。
          </p>
        </div>
      ) : (
        // データが正常に取得できた場合
        <>
          <h2>✌✌ 事例一覧 (Turso DBより)</h2>
          {cases.length === 0 ? (
            <p>まだデータベースに事例データがありません。テーブルは作成されました。</p>
          ) : (
            <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
              {cases.map((item: any) => (
                <li key={item.id} style={{ marginBottom: '10px' }}>
                  <strong>{item.title}</strong>: {item.content}
                </li>
              ))}
            </ul>
          )}
        </>
      )}
      
      <hr />
    </main>
  );
}