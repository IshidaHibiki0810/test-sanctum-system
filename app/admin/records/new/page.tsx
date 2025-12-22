import Link from 'next/link';
import { HiChevronRight, HiOutlineArrowLeft, HiHome } from 'react-icons/hi';
import NewRecordForm from '../../../components/NewRecordForm'; 
import AdminHeader from '../../../components/AdminHeader'; // パスを調整してください

export default function NewRecordPage() {
    const initialState = {
        success: false,
        message: '初期状態',
    };

    return (
        <div className="min-h-screen bg-[#F1F5F9]">
            {/* 🟢 共通ヘッダー：新規作成時はリフレッシュ不要のため title のみ指定 */}
            <AdminHeader title="新規記録作成" />

            <main className="p-8 md:p-12 lg:p-16 max-w-4xl w-full mx-auto">
                
                {/* 🟢 パンくずリスト（3階層・日本語化） */}
                <nav className="flex items-center gap-2 text-[11px] font-black tracking-widest text-slate-400 uppercase mb-8" aria-label="現在位置">
                    <Link href="/admin" className="hover:text-[#020617] transition-colors flex items-center gap-1">
                        <HiHome size={14} /> 管理者トップ
                    </Link>
                    <HiChevronRight size={14} className="text-slate-300" />
                    <Link href="/admin/records" className="hover:text-[#020617] transition-colors">
                        活動記録の管理
                    </Link>
                    <HiChevronRight size={14} className="text-slate-300" />
                    <span className="text-[#EAB308]">新規作成</span>
                </nav>

                {/* 戻るボタンとタイトル */}
                <div className="mb-12">
                    <Link 
                        href="/admin/records" 
                        className="inline-flex items-center gap-2 text-sm font-black text-slate-400 hover:text-[#020617] transition-colors mb-4 group"
                    >
                        <HiOutlineArrowLeft className="group-hover:-translate-x-1 transition-transform" /> 
                        管理一覧に戻る
                    </Link>
                    <h1 className="text-5xl font-black text-[#020617] tracking-tighter border-b-4 border-[#EAB308] pb-6">
                        新しい活動記録の作成
                    </h1>
                </div>

                {/* フォーム本体を含む Client Component */}
                <div className="mt-4 bg-white p-8 md:p-12 rounded-[3rem] border-2 border-slate-200 shadow-sm">
                    <NewRecordForm initialState={initialState} />
                </div>
            </main>
            <div className="h-20"></div>
        </div>
    );
}