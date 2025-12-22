"use client";

import { useRouter } from 'next/navigation';
import { HiOutlineLogout, HiOutlineUserCircle, HiOutlineRefresh } from 'react-icons/hi';

interface AdminHeaderProps {
  title: string;
  breadcrumb?: { label: string; href?: string }[];
  onRefresh?: () => void;
  loading?: boolean;
}

export default function AdminHeader({ title, onRefresh, loading }: AdminHeaderProps) {
  const router = useRouter();

  const handleLogout = async () => {
    if (!confirm("ログアウトしますか？")) return;
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/admin/login');
      router.refresh();
    } catch (error) {
      console.error("ログアウト失敗", error);
    }
  };

  return (
    <header className="h-20 bg-white border-b-2 border-slate-200 flex items-center justify-between px-6 md:px-12 sticky top-0 z-40 shadow-sm">
      {/* 左側：現在のページタイトル（またはパンくず） */}
      <div className="flex flex-col">
        <p className="text-[9px] font-black text-[#EAB308] uppercase tracking-[0.3em] leading-none mb-1">Management</p>
        <h2 className="text-sm font-black text-[#020617] tracking-tighter uppercase">{title}</h2>
      </div>

      {/* 右側：アクションエリア */}
      <div className="flex items-center gap-4">
        {onRefresh && (
          <button 
            onClick={onRefresh}
            disabled={loading}
            className="p-2.5 text-slate-400 hover:text-[#020617] hover:bg-slate-100 rounded-xl transition-all"
          >
            <HiOutlineRefresh size={20} className={loading ? "animate-spin" : ""} />
          </button>
        )}

        {/* ユーザー ＋ ログアウトのセット */}
        <div className="flex items-center gap-3 pl-6 border-l-2 border-slate-100">
          <div className="hidden sm:block text-right mr-2">
            <p className="text-[9px] font-black text-slate-400 uppercase leading-none mb-1">Login User</p>
            <p className="text-sm font-black italic text-[#020617]">joji 様</p>
          </div>

          <div className="relative group">
            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 border-2 border-white shadow-sm overflow-hidden">
              <HiOutlineUserCircle size={28} />
            </div>
          </div>

          {/* 💡 ログアウトボタンをここに配置 */}
          <button 
            onClick={handleLogout}
            className="flex items-center justify-center w-10 h-10 rounded-xl bg-slate-50 text-slate-400 hover:bg-rose-50 hover:text-rose-500 transition-all border border-transparent hover:border-rose-100 group"
            title="ログアウト"
          >
            <HiOutlineLogout size={20} className="group-hover:scale-110 transition-transform" />
          </button>
        </div>
      </div>
    </header>
  );
}