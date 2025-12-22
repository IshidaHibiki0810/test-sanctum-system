export const dynamic = 'force-dynamic';

import { getDbClient } from '@/lib/db';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import React from 'react';
import { HiChevronRight, HiOutlineArrowLeft, HiHome } from 'react-icons/hi';
import EditFormStatus from '../../../../components/EditFormStatus'; 
import AdminHeader from '@/app/components/AdminHeader'; // パスを調整してください

interface EditPageProps {
  params: Promise<{ id: string }>;
}

interface RecordData {
  id: number;
  title: string;
  content: string;
  record_date: string;
  category: string | null;
  is_published: number;
  image_url: string | null;
}

async function getRecordForEdit(id: string): Promise<RecordData | null> {
  const numId = Number(id);
  if (isNaN(numId)) return null;
  
  try {
    const db = getDbClient();
    const result = await db.execute({
      sql: `SELECT id, title, content, record_date, category, is_published, image_url 
            FROM records 
            WHERE id = ?`,
      args: [numId],
    });
    
    if (result.rows.length === 0) return null; 

    const row = result.rows[0];
    return {
      id: Number(row.id),
      title: String(row.title),
      content: String(row.content),
      record_date: String(row.record_date),
      category: row.category ? String(row.category) : null,
      is_published: Number(row.is_published),
      image_url: row.image_url ? String(row.image_url) : null,
    };
  } catch (error) {
    console.error("❌ 編集データ取得エラー:", error);
    return null;
  }
}

export default async function EditRecordPage({ params }: EditPageProps) {
  const resolvedParams = await params;
  const recordId = resolvedParams.id;
  const record = await getRecordForEdit(recordId);

  if (!record) {
    notFound();
  }
  
  const initialState = {
      ...record,
      success: false,
      message: '',
  };

  return (
    <div className="min-h-screen bg-[#F1F5F9]">
      {/* 🟢 共通ヘッダー：ログイン情報の統合 */}
      <AdminHeader title="記録の編集" />

      {/* 🟢 メインコンテンツエリア */}
      <main className="p-8 md:p-12 lg:p-16 max-w-4xl mx-auto">
        
        {/* 🟢 パンくずリスト（3階層） */}
        <nav className="flex items-center gap-2 text-[11px] font-black tracking-widest text-slate-400 uppercase mb-8" aria-label="現在位置">
          <Link href="/admin" className="hover:text-[#020617] transition-colors flex items-center gap-1">
            <HiHome size={14} /> 管理者トップ
          </Link>
          <HiChevronRight size={14} className="text-slate-300" />
          <Link href="/admin/records" className="hover:text-[#020617] transition-colors">
            活動記録の管理
          </Link>
          <HiChevronRight size={14} className="text-slate-300" />
          <span className="text-[#EAB308]">記事の編集</span>
        </nav>

        {/* 戻るボタンとタイトル */}
        <div className="mb-12">
          <Link 
            href="/admin/records" 
            className="inline-flex items-center gap-2 text-sm font-black text-slate-400 hover:text-[#020617] mb-6 group transition-colors"
          >
            <HiOutlineArrowLeft className="group-hover:-translate-x-1 transition-transform" /> 
            管理一覧に戻る
          </Link>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <p className="text-[#EAB308] text-xs font-black tracking-[0.3em] uppercase mb-2">Editor Mode</p>
              <h1 className="text-4xl md:text-5xl font-black text-[#020617] tracking-tighter">
                活動記録を編集
              </h1>
            </div>
            <div className="bg-white border-2 border-slate-200 px-5 py-2 rounded-2xl shadow-sm">
              <span className="text-[10px] font-black text-slate-400 uppercase block mb-0.5 tracking-wider">管理番号</span>
              <span className="text-sm font-black text-[#020617]">#{record.id}</span>
            </div>
          </div>
          <div className="h-1.5 w-24 bg-[#EAB308] mt-8 rounded-full shadow-[0_2px_10px_rgba(234,179,8,0.3)]"></div>
        </div>

        {/* 🟢 フォームコンポーネントを白いカードで包む */}
        <div className="relative bg-white p-8 md:p-12 rounded-[3rem] border-2 border-slate-200 shadow-sm">
          <EditFormStatus 
              initialState={initialState} 
              recordId={record.id} 
          />
        </div>

      </main>

      {/* 下部の余白 */}
      <div className="h-24"></div>
    </div>
  );
}