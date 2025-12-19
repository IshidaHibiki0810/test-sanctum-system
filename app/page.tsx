"use client";

import React, { useState } from 'react';
import Link from "next/link";
import { 
  HiOutlineMenuAlt3, 
  HiOutlineX, 
  HiOutlineChevronRight,
  HiOutlineHome,
  HiOutlineUser,
  HiOutlinePhotograph,
  HiOutlineMail
} from 'react-icons/hi';

const profile = {
  name: "中条 俊介",
  role: "Webデザイナー / コンサルタント",
  concept: "日常を少しだけ、特別にするデザイン。",
  introduction: "暮らしに溶け込み、使うたびに心がふわりと軽くなる。そんな優しく、凛としたWebサイトを制作しています。30代からの新しい挑戦や、想いのこもったビジネスをデザインの力でお手伝いします。",
};

export default function HomePage() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#FDFBF9] text-[#5C544E] font-sans selection:bg-[#F3E5E3]">
      
      {/* --- 1. ヘッダー & ハンバーガーメニュー --- */}
      <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-[#F2EDE9]">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="text-xl md:text-2xl font-serif tracking-widest text-[#8E7D73] font-semibold">
            中条 俊介 ポートフォリオ
          </Link>

          {/* PC用ナビゲーション */}
          <nav className="hidden md:flex items-center gap-10 text-sm font-bold tracking-widest">
            <Link href="#about" className="hover:text-[#C5A59E] transition-colors">自己紹介</Link>
            <Link href="/records" className="hover:text-[#C5A59E] transition-colors">活動記録</Link>
            <Link href="/contact" className="hover:text-[#C5A59E] transition-colors">お問い合わせ</Link>
          </nav>

          {/* スマホ用メニューボタン */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-[#8E7D73] p-2" aria-label="メニュー">
            {isOpen ? <HiOutlineX size={28} /> : <HiOutlineMenuAlt3 size={28} />}
          </button>
        </div>

        {/* スマホ用オーバーレイメニュー */}
        {isOpen && (
          <div className="absolute top-20 left-0 w-full bg-white border-b border-[#F2EDE9] p-8 md:hidden flex flex-col gap-6 animate-in slide-in-from-top duration-300">
            <Link href="#about" onClick={() => setIsOpen(false)} className="text-lg font-medium flex items-center justify-between">自己紹介 <HiOutlineChevronRight /></Link>
            <Link href="/records" onClick={() => setIsOpen(false)} className="text-lg font-medium flex items-center justify-between">活動記録 <HiOutlineChevronRight /></Link>
            <Link href="/contact" onClick={() => setIsOpen(false)} className="text-lg font-medium flex items-center justify-between">お問い合わせ <HiOutlineChevronRight /></Link>
          </div>
        )}
      </header>

      {/* --- 2. ヒーローセクション --- */}
      <main className="pt-20">
        <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-[#F3E5E3]/20 -z-10" />
          <div className="absolute -top-20 -right-20 w-96 h-96 bg-[#E9E4E0] rounded-full blur-3xl opacity-50" />
          
          <div className="text-center px-6">
            <p className="text-[#C5A59E] font-bold tracking-[0.2em] text-sm mb-6 animate-fade-in italic">穏やかな時間をデザインする</p>
            <h2 className="text-3xl md:text-5xl font-serif text-[#4A443F] leading-[1.4] mb-10">
              {profile.concept}
            </h2>
            <Link href="/contact" className="inline-block px-10 py-4 bg-[#8E7D73] text-white rounded-full text-sm font-bold tracking-widest hover:bg-[#7A6A61] transition-all shadow-lg shadow-[#8E7D73]/20">
              メッセージを送る
            </Link>
          </div>
        </section>

        {/* --- 3. パンくずリスト --- */}
        <nav className="max-w-7xl mx-auto px-6 py-6 flex items-center gap-2 text-[12px] font-bold tracking-wider text-[#B5ADA5]">
          <Link href="/" className="hover:text-[#8E7D73] flex items-center gap-1">
            <HiOutlineHome className="mb-0.5" /> ホーム
          </Link>
          <HiOutlineChevronRight size={10} />
          <span className="text-[#8E7D73]">ポートフォリオ</span>
        </nav>

        {/* --- 4. コンテンツセクション --- */}
        <div className="max-w-5xl mx-auto px-6">
          {/* 自己紹介 */}
          <section id="about" className="py-20 grid md:grid-cols-2 gap-12 items-center">
            <div className="aspect-[4/5] bg-[#EBE7E0] rounded-[3rem] overflow-hidden shadow-inner flex items-center justify-center text-[#CDC7BD]">
              <HiOutlineUser size={80} />
            </div>
            <div>
              <h3 className="text-xs font-black uppercase tracking-[0.3em] text-[#C5A59E] mb-6 flex items-center gap-2">
                <span className="w-6 h-[1px] bg-[#C5A59E]"></span> 自己紹介
              </h3>
              <h4 className="text-3xl font-serif mb-6 text-[#4A443F]">{profile.name}</h4>
              <p className="text-lg leading-[1.8] text-[#7A7167] mb-8 font-light">
                {profile.introduction}
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-white border border-[#F2EDE9] rounded-2xl">
                  <p className="text-[10px] font-bold text-[#B5ADA5] uppercase mb-1">役割</p>
                  <p className="text-sm font-bold text-[#5C544E]">{profile.role}</p>
                </div>
                <div className="p-4 bg-white border border-[#F2EDE9] rounded-2xl">
                  <p className="text-[10px] font-bold text-[#B5ADA5] uppercase mb-1">活動拠点</p>
                  <p className="text-sm font-bold text-[#5C544E]">東京 / 全国対応</p>
                </div>
              </div>
            </div>
          </section>

          {/* クイックリンク */}
          <section className="py-20 border-t border-[#F2EDE9]">
            <div className="grid sm:grid-cols-2 gap-6">
              <Link href="/records" className="group p-8 bg-white border border-[#F2EDE9] rounded-[2rem] hover:shadow-md transition-all">
                <HiOutlinePhotograph size={32} className="text-[#C5A59E] mb-6" />
                <h5 className="text-xl font-bold mb-2 text-[#4A443F]">活動記録を見る</h5>
                <p className="text-sm text-[#B5ADA5] leading-relaxed">これまでの制作実績や、日々の活動をまとめています。</p>
                <span className="inline-block mt-4 text-[#C5A59E] text-xs font-bold border-b border-[#C5A59E] pb-0.5">詳しく見る</span>
              </Link>
              <Link href="/contact" className="group p-8 bg-white border border-[#F2EDE9] rounded-[2rem] hover:shadow-md transition-all">
                <HiOutlineMail size={32} className="text-[#C5A59E] mb-6" />
                <h5 className="text-xl font-bold mb-2 text-[#4A443F]">お問い合わせ</h5>
                <p className="text-sm text-[#B5ADA5] leading-relaxed">お仕事のご依頼やご相談、メッセージはこちらからどうぞ。</p>
                <span className="inline-block mt-4 text-[#C5A59E] text-xs font-bold border-b border-[#C5A59E] pb-0.5">フォームを開く</span>
              </Link>
            </div>
          </section>
        </div>
      </main>

      {/* --- 5. フッター --- */}
      <footer className="bg-[#F2EDE9] py-16 px-6 text-center">
        <p className="font-serif text-xl text-[#8E7D73] mb-8 tracking-[0.2em]">中条 俊介 ポートフォリオ</p>
        <nav className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-xs font-bold tracking-widest text-[#B5ADA5] mb-8">
          <Link href="/" className="hover:text-[#8E7D73]">ホーム</Link>
          <Link href="/records" className="hover:text-[#8E7D73]">活動記録</Link>
          <Link href="/contact" className="hover:text-[#8E7D73]">お問い合わせ</Link>
          <Link href="/admin" className="hover:text-[#8E7D73]">管理者用</Link>
        </nav>
        <p className="text-[10px] text-[#CDC7BD] tracking-[0.2em]">© {new Date().getFullYear()} SHUNSUKE NAKAJO. ALL RIGHTS RESERVED.</p>
      </footer>
    </div>
  );
}