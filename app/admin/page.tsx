"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { 
  HiOutlineCollection, 
  HiOutlineMail, 
  HiOutlineExternalLink,
  HiChevronRight,
  HiHome
} from 'react-icons/hi';
import AdminHeader from '@/app/components/AdminHeader';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ records: 0, contacts: 0 });
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/stats');
      if (res.ok) {
        const data = await res.json();
        setStats(data);
      }
    } catch (error) {
      console.error("統計データの取得に失敗しました:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="min-h-screen bg-[#F1F5F9]">
      {/* 🟢 共通ヘッダー：右上のユーザー情報の横にログアウトが配置されます */}
      <AdminHeader 
        title="ダッシュボード" 
        onRefresh={fetchStats} 
        loading={loading} 
      />

      {/* メインコンテンツ */}
      <main className="p-8 md:p-12 lg:p-16 max-w-6xl w-full mx-auto">
        
        {/* 🟢 パンくずリスト（日本語表記） */}
        <nav className="flex items-center gap-2 text-[11px] font-black tracking-widest text-slate-400 uppercase mb-8" aria-label="現在位置">
          <Link href="/admin" className="hover:text-[#020617] transition-colors flex items-center gap-1">
            <HiHome size={14} /> 管理者トップ
          </Link>
          <HiChevronRight size={14} className="text-slate-300" />
          <span className="text-[#EAB308]">ダッシュボード</span>
        </nav>

        {/* タイトルセクション */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b-4 border-[#EAB308] pb-8">
          <div>
            <h1 className="text-5xl font-black text-[#020617] tracking-tighter">ダッシュボード</h1>
            <p className="text-slate-600 font-black mt-3 text-base">システム統計と通知のサマリーを確認します。</p>
          </div>
          <Link href="/" target="_blank" className="inline-flex items-center gap-2 py-3 px-8 bg-[#020617] text-white rounded-xl text-xs font-black hover:bg-[#EAB308] hover:text-[#000000] transition-all shadow-xl">
            サイトを表示 <HiOutlineExternalLink size={16} />
          </Link>
        </div>

        {/* 統計カード */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 mb-16">
          <div className="bg-white p-10 rounded-[2.5rem] border-2 border-slate-200 shadow-sm flex justify-between items-center group hover:border-[#020617] transition-all duration-300">
            <div>
              <p className="text-xs font-black text-slate-500 uppercase tracking-widest mb-4">公開中の記録</p>
              <h3 className="text-6xl font-black text-[#020617]">{loading ? "---" : stats.records}<span className="text-xl ml-2 text-slate-400">件</span></h3>
            </div>
            <div className="p-6 rounded-3xl bg-slate-50 text-slate-300 group-hover:bg-[#EAB308] group-hover:text-[#000000] transition-all shadow-inner">
              <HiOutlineCollection size={36} />
            </div>
          </div>

          <div className="bg-white p-10 rounded-[2.5rem] border-2 border-slate-200 shadow-sm flex justify-between items-center group hover:border-[#020617] transition-all duration-300">
            <div>
              <p className="text-xs font-black text-slate-500 uppercase tracking-widest mb-4">お問い合わせ通知</p>
              <h3 className="text-6xl font-black text-[#020617]">{loading ? "---" : stats.contacts}<span className="text-xl ml-2 text-slate-400">件</span></h3>
            </div>
            <div className="p-6 rounded-3xl bg-slate-50 text-slate-300 group-hover:bg-[#020617] group-hover:text-white transition-all shadow-inner">
              <HiOutlineMail size={36} />
            </div>
          </div>
        </div>

        {/* クイックリンク（日本語化） */}
        <div className="bg-white rounded-[3rem] border-2 border-slate-200 p-10 md:p-14 shadow-sm relative overflow-hidden">
          <h3 className="text-xs font-black text-slate-500 uppercase tracking-[0.3em] mb-12 inline-block border-b-4 border-[#EAB308] pb-1">クイックアクション</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
            <Link href="/admin/records" className="flex items-center justify-between p-8 bg-slate-50 rounded-[2rem] border-2 border-transparent hover:border-[#020617] hover:bg-white transition-all group shadow-sm">
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-slate-400 group-hover:text-[#EAB308] shadow-md border border-slate-100">
                  <HiOutlineCollection size={24} />
                </div>
                <div>
                  <span className="font-black text-xl text-[#020617]">記録を管理する</span>
                  <p className="text-[10px] text-slate-400 font-black mt-1 uppercase tracking-wider">実績の投稿と編集</p>
                </div>
              </div>
              <HiChevronRight size={28} className="text-slate-300 group-hover:text-[#020617] group-hover:translate-x-2 transition-all" />
            </Link>
            
            <Link href="/admin/contacts" className="flex items-center justify-between p-8 bg-slate-50 rounded-[2rem] border-2 border-transparent hover:border-[#020617] hover:bg-white transition-all group shadow-sm">
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-slate-400 group-hover:text-[#EAB308] shadow-md border border-slate-100">
                  <HiOutlineMail size={24} />
                </div>
                <div>
                  <span className="font-black text-xl text-[#020617]">メッセージを確認</span>
                  <p className="text-[10px] text-slate-400 font-black mt-1 uppercase tracking-wider">お問い合わせの返信管理</p>
                </div>
              </div>
              <HiChevronRight size={28} className="text-slate-300 group-hover:text-[#020617] group-hover:translate-x-2 transition-all" />
            </Link>
          </div>
        </div>
      </main>
      <div className="h-20"></div>
    </div>
  );
}