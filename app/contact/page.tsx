"use client";

import React, { useState } from "react";
import Link from "next/link";
import { HiOutlineMail, HiOutlineCheckCircle, HiOutlinePaperAirplane } from "react-icons/hi";

// デフォルトエクスポートとして関数を定義
export default function PublicContactPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    };

    try {
      const res = await fetch("/api/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setStatus("success");
        (e.target as HTMLFormElement).reset();
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error("Submit error:", error);
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">
        {/* ヘッダー */}
        <div className="bg-indigo-600 p-8 text-white text-center">
          <HiOutlineMail size={48} className="mx-auto mb-4" />
          <h1 className="text-3xl font-bold italic tracking-tighter">Contact Me</h1>
          <p className="text-indigo-100 mt-2 font-medium">お気軽にお問い合わせください</p>
        </div>

        <div className="p-8 md:p-12">
          {status === "success" ? (
            <div className="text-center py-12">
              <HiOutlineCheckCircle size={64} className="text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-800">送信完了しました！</h2>
              <p className="text-gray-500 mt-2 font-medium">内容を確認次第、折り返しご連絡いたします。</p>
              <button 
                onClick={() => setStatus("idle")}
                className="mt-8 bg-gray-100 px-6 py-2 rounded-full text-gray-600 font-semibold hover:bg-gray-200 transition"
              >
                フォームに戻る
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">お名前</label>
                <input 
                  name="name" 
                  type="text" 
                  required 
                  placeholder="山田 太郎"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition text-gray-800"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">メールアドレス</label>
                <input 
                  name="email" 
                  type="email" 
                  required 
                  placeholder="example@mail.com"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition text-gray-800"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">メッセージ内容</label>
                <textarea 
                  name="message" 
                  required 
                  placeholder="具体的なお問い合わせ内容をご記入ください"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition h-40 resize-none text-gray-800"
                />
              </div>

              <button 
                type="submit" 
                disabled={status === "loading"}
                className="w-full bg-indigo-600 text-white font-bold py-4 rounded-xl hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-100 disabled:bg-indigo-300 active:scale-[0.98]"
              >
                {status === "loading" ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    送信中...
                  </span>
                ) : (
                  <>
                    <HiOutlinePaperAirplane className="rotate-90" />
                    メッセージを送信する
                  </>
                )}
              </button>

              {status === "error" && (
                <div className="bg-red-50 text-red-600 p-4 rounded-xl text-center text-sm font-bold">
                  エラーが発生しました。もう一度お試しください。
                </div>
              )}
            </form>
          )}
        </div>
      </div>
      
      <div className="text-center mt-12">
        <Link href="/" className="text-gray-400 font-medium hover:text-indigo-600 transition flex items-center justify-center gap-2">
          <span>←</span> ホームへ戻る
        </Link>
      </div>
    </div>
  );
}