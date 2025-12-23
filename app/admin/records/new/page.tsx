"use client";

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  HiOutlineArrowLeft, 
  HiOutlineSave, 
  HiOutlinePhotograph,
  HiOutlineCalendar,
  HiOutlineDocumentText,
  HiChevronRight,
  HiOutlineX
} from 'react-icons/hi';
// 以前作成した Server Action をインポート
import { createRecord } from '@/app/admin/records/actions';

export default function NewRecordPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ファイルを処理する共通関数
  const handleFile = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // ドラッグ操作のハンドラー
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  // ドロップ時の処理
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
      // input要素にもファイルをセット（フォーム送信のため）
      if (fileInputRef.current) {
        fileInputRef.current.files = e.dataTransfer.files;
      }
    }
  };

  // 通常のファイル選択
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  // フォーム送信
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    
    try {
      // Server Action を呼び出し
      const result = await createRecord(null, formData);

      if (!result.success) throw new Error(result.message);

      router.push('/admin/records');
      router.refresh();
    } catch (error) {
      alert('エラーが発生しました: ' + (error as Error).message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* 🟢 ヘッダー */}
      <header className="h-20 bg-white border-b-2 border-slate-200 flex items-center justify-between px-6 md:px-12 sticky top-0 z-30 shadow-sm">
        <nav className="flex items-center gap-2 text-[11px] font-black tracking-widest text-slate-500 uppercase">
          <Link href="/admin" className="hover:text-[#020617]">Admin</Link>
          <HiChevronRight size={14} className="text-slate-300" />
          <Link href="/admin/records" className="hover:text-[#020617]">Records</Link>
          <HiChevronRight size={14} className="text-slate-300" />
          <span className="text-[#EAB308]">New Record</span>
        </nav>
      </header>

      <main className="p-8 md:p-12 lg:p-16 max-w-4xl mx-auto">
        <div className="mb-12">
          <Link href="/admin/records" className="inline-flex items-center gap-2 text-sm font-black text-slate-400 hover:text-[#020617] transition-colors mb-4 group">
            <HiOutlineArrowLeft className="group-hover:-translate-x-1 transition-transform" /> 一覧へ戻る
          </Link>
          <h1 className="text-5xl font-black text-[#020617] tracking-tighter">新規記録の作成</h1>
          <div className="h-1.5 w-20 bg-[#EAB308] mt-6 rounded-full"></div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="bg-white rounded-[2.5rem] border-2 border-slate-200 p-8 md:p-12 shadow-sm space-y-10">
            
            {/* タイトル入力 */}
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-xs font-black text-slate-500 uppercase tracking-widest">
                <HiOutlineDocumentText size={18} className="text-[#EAB308]" /> タイトル
              </label>
              <input
                name="title"
                type="text"
                required
                placeholder="活動のタイトルを入力"
                className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 text-[#020617] font-bold focus:bg-white focus:border-[#EAB308] outline-none transition-all"
              />
            </div>

            {/* 日付入力 */}
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-xs font-black text-slate-500 uppercase tracking-widest">
                <HiOutlineCalendar size={18} className="text-[#EAB308]" /> 実施日
              </label>
              <input
                name="record_date"
                type="date"
                required
                className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 text-[#020617] font-bold focus:bg-white focus:border-[#EAB308] outline-none transition-all"
              />
            </div>

            {/* 🟢 画像ドラッグ＆ドロップエリア */}
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-xs font-black text-slate-500 uppercase tracking-widest">
                <HiOutlinePhotograph size={18} className="text-[#EAB308]" /> 活動写真
              </label>
              
              <div 
                className={`relative group h-64 rounded-[2rem] border-4 border-dashed transition-all flex flex-center justify-center items-center overflow-hidden
                  ${dragActive ? 'border-[#EAB308] bg-[#EAB308]/5' : 'border-slate-100 bg-slate-50 hover:border-slate-200'}`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  ref={fileInputRef}
                  name="image" // Server Action のフィールド名に合わせる
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleChange}
                />

                {previewUrl ? (
                  <div className="relative w-full h-full">
                    <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <p className="text-white font-black text-sm">クリックして画像を変更</p>
                    </div>
                    <button 
                      type="button"
                      onClick={(e) => { e.stopPropagation(); setPreviewUrl(null); }}
                      className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-lg hover:text-rose-500 transition-colors"
                    >
                      <HiOutlineX size={20} />
                    </button>
                  </div>
                ) : (
                  <div className="text-center cursor-pointer">
                    <HiOutlinePhotograph size={48} className={`mx-auto mb-4 transition-colors ${dragActive ? 'text-[#EAB308]' : 'text-slate-300'}`} />
                    <p className="text-sm font-black text-slate-400">
                      画像をドラッグ＆ドロップ<br />
                      <span className="text-[10px] text-slate-300 uppercase tracking-tighter">Or click to browse files</span>
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* 本文入力 */}
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-xs font-black text-slate-500 uppercase tracking-widest">
                <HiOutlineDocumentText size={18} className="text-[#EAB308]" /> 本文
              </label>
              <textarea
                name="content"
                rows={6}
                required
                className="w-full bg-slate-50 border-2 border-slate-100 rounded-[2rem] px-8 py-6 text-[#020617] font-medium focus:bg-white focus:border-[#EAB308] outline-none transition-all"
              />
            </div>

            {/* 公開設定 */}
            <div className="pt-6 border-t border-slate-100">
              <label className="flex items-center gap-4 cursor-pointer">
                <div className="relative">
                  <input name="is_published" type="checkbox" value="1" className="sr-only peer" defaultChecked />
                  <div className="w-14 h-8 bg-slate-200 peer-checked:bg-[#EAB308] rounded-full transition-all"></div>
                  <div className="absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-all peer-checked:translate-x-6"></div>
                </div>
                <span className="text-sm font-black text-[#020617]">公開する</span>
              </label>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-3 px-12 py-5 bg-[#020617] text-white rounded-[2rem] font-black text-lg hover:bg-[#EAB308] hover:text-[#020617] transition-all shadow-xl disabled:opacity-50"
            >
              {loading ? "保存中..." : <><HiOutlineSave size={24} /> 記録を保存する</>}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}