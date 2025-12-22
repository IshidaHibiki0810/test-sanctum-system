export const dynamic = 'force-dynamic';

import { getDbClient } from '@/lib/db';
import Link from 'next/link';
import { togglePublishStatus } from './actions'; 
import DeleteButton from '../../components/DeleteButton';
import AdminHeader from '../../components/AdminHeader'; // パスをプロジェクトに合わせて調整
import { 
  HiOutlinePhotograph, 
  HiOutlinePlus, 
  HiChevronRight, 
  HiOutlineEye, 
  HiOutlineEyeOff,
  HiOutlinePencilAlt,
  HiHome
} from 'react-icons/hi';

// 記録データの型定義
interface AdminRecordItem {
  id: number;
  title: string;
  record_date: string;
  is_published: number;
  image_url: string | null;
}

/**
 * データベースから全ての活動記録を取得する（管理者用）
 */
async function getAllRecords(): Promise<AdminRecordItem[]> {
  try {
    const db = getDbClient();
    const result = await db.execute({
      sql: `SELECT id, title, record_date, is_published, image_url 
            FROM records 
            ORDER BY record_date DESC, id DESC`,
      args: [],
    });
    
    return result.rows.map(row => ({
      id: Number(row.id),
      title: String(row.title || '無題'),
      record_date: String(row.record_date || ''),
      is_published: Number(row.is_published),
      image_url: row.image_url ? String(row.image_url) : null,
    }));
  } catch (error) {
    console.error("❌ 管理者記録データ取得エラー:", error);
    return []; 
  }
}

export default async function AdminRecordsPage() {
  const records = await getAllRecords();

  return (
    <div className="min-h-screen bg-[#F1F5F9] text-[#020617] font-sans">
      {/* 🟢 共通ヘッダー（Server Componentから呼び出し可能） */}
      <AdminHeader title="活動記録の管理" />

      <main className="p-8 md:p-12 lg:p-16 max-w-6xl w-full mx-auto">
        
        {/* 🟢 パンくずリスト */}
        <nav className="flex items-center gap-2 text-[11px] font-black tracking-widest text-slate-400 uppercase mb-8" aria-label="現在位置">
          <Link href="/admin" className="hover:text-[#020617] transition-colors flex items-center gap-1">
            <HiHome size={14} /> 管理者トップ
          </Link>
          <HiChevronRight size={14} className="text-slate-300" />
          <span className="text-[#EAB308]">活動記録の管理</span>
        </nav>

        {/* タイトルエリア */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b-4 border-[#EAB308] pb-8">
          <div>
            <h1 className="text-5xl font-black tracking-tighter text-[#020617]">活動記録の管理</h1>
            <p className="text-slate-600 font-black mt-3 text-base">過去の実績や活動内容の追加・編集・公開設定を行います。</p>
          </div>
          <Link 
            href="/admin/records/new" 
            className="inline-flex items-center gap-2 py-4 px-8 bg-[#020617] text-white rounded-2xl font-black text-sm hover:bg-[#EAB308] hover:text-[#000000] transition-all shadow-xl group"
          >
            <HiOutlinePlus size={20} className="group-hover:rotate-90 transition-transform" />
            新規に記録を作成
          </Link>
        </div>

        {records.length === 0 ? (
          <div className="text-center py-32 bg-white rounded-[3rem] border-2 border-slate-200 shadow-sm">
            <p className="text-slate-400 font-black text-lg text-center">
              登録された記録がまだありません。<br />
              <span className="text-sm font-normal">「新規に記録を作成」ボタンから追加してください。</span>
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-[2.5rem] border-2 border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y-2 divide-slate-100">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-8 py-6 text-left text-xs font-black text-slate-500 uppercase tracking-widest">内容サマリー</th>
                    <th className="px-8 py-6 text-left text-xs font-black text-slate-500 uppercase tracking-widest">実施日</th>
                    <th className="px-8 py-6 text-left text-xs font-black text-slate-500 uppercase tracking-widest">現在の状態</th>
                    <th className="px-8 py-6 text-right text-xs font-black text-slate-500 uppercase tracking-widest">操作</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {records.map((record) => (
                    <tr key={record.id} className={`${record.is_published === 0 ? 'bg-slate-50/50' : 'bg-white'} hover:bg-slate-50 transition-colors group`}>
                      
                      {/* サムネイル & タイトル */}
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-6">
                          <div className="w-24 h-16 rounded-2xl overflow-hidden bg-slate-100 border-2 border-slate-200 flex-shrink-0 shadow-sm group-hover:border-[#EAB308] transition-all">
                            {record.image_url ? (
                              <img src={record.image_url} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-slate-300">
                                <HiOutlinePhotograph size={28} />
                              </div>
                            )}
                          </div>
                          <div className="flex flex-col gap-1.5">
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">ID: {record.id}</span>
                            <Link href={`/records/${record.id}`} target="_blank" className="text-lg font-black text-[#020617] hover:text-[#EAB308] transition-colors line-clamp-1 leading-tight">
                              {record.title}
                            </Link>
                          </div>
                        </div>
                      </td>

                      {/* 活動日 */}
                      <td className="px-8 py-6 whitespace-nowrap">
                        <span className="text-sm font-black text-[#020617] tabular-nums tracking-tight">{record.record_date}</span>
                      </td>

                      {/* 公開状態 */}
                      <td className="px-8 py-6 whitespace-nowrap">
                        <span className={`px-4 py-1.5 inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest rounded-full border-2 ${
                          record.is_published === 1 
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-100' 
                            : 'bg-slate-100 text-slate-500 border-slate-200'
                        }`}>
                          {record.is_published === 1 ? (
                            <>
                              <HiOutlineEye size={14} /> 公開中
                            </>
                          ) : (
                            <>
                              <HiOutlineEyeOff size={14} /> 下書き
                            </>
                          )}
                        </span>
                      </td>

                      {/* 操作ボタン */}
                      <td className="px-8 py-6 whitespace-nowrap text-right">
                        <div className="flex justify-end items-center gap-4">
                          <Link 
                            href={`/admin/records/edit/${record.id}`} 
                            className="flex items-center gap-1.5 py-2 px-4 text-xs font-black text-[#020617] hover:bg-[#EAB308] rounded-lg transition-all border border-slate-200"
                          >
                            <HiOutlinePencilAlt size={16} />
                            編集
                          </Link>
                          
                          <form action={async () => {
                            "use server";
                            await togglePublishStatus(record.id, record.is_published);
                          }}>
                            <button 
                              type="submit" 
                              className={`py-2 px-4 text-xs font-black rounded-lg border transition-all ${
                                record.is_published === 1 
                                ? 'text-slate-500 hover:bg-slate-100 border-slate-200' 
                                : 'text-emerald-700 hover:bg-emerald-50 border-emerald-100'
                              }`}
                            >
                              {record.is_published === 1 ? '非公開にする' : '公開する'}
                            </button>
                          </form>
                          
                          <div className="h-6 w-[2px] bg-slate-100 mx-1"></div>
                          
                          <DeleteButton recordId={record.id} title={record.title} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
      <div className="h-20"></div>
    </div>
  );
}