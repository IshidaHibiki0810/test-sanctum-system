// app/page.tsx

import React from 'react';
import { SiX, SiInstagram , SiLinkedin } from 'react-icons/si'; // SNSアイコン (npm install react-iconsが必要です)
import { TbBackground } from 'react-icons/tb';
import HamburgerMenu from './components/HambergerMenu';
import ImageSlider from './components/ImageSlider';
import ToTopButton from './components/ToTopButton';

// 動的 SSR（Vercel 安定）
export const dynamic = 'force-dynamic';

// 1. データの型定義 (TypeScript Interface)
interface ProfileData {
  name: string;
  title: string;
  introduction: string;
  motto: string;
  skills: string[];
  awards: { year: number; description: string }[];
  sns: { 
    x: string; 
    instagram: string; 
    linkedin: string; 
  };
}

// 2. 静的なモックデータ (ダミーデータ)
// 将来、この部分をAPIやCMSからのデータ取得に置き換えます
const memberProfile: ProfileData = {
  name: "中条 俊介",
  title: "過去の栄光に浸る男",
  introduction: "実務的な開発スキルと対人折衝能力の習得を目指し、チームでWebシステム開発に取り組んでいます。ユーザーに寄り添ったシンプルで高速な情報提供システムの構築が得意です。",
  motto: "「成果を形にする力」を重視し、計画だけでなく実行と改善を徹底します。",
  skills: ["TypeScript", "Tailwind CSS", "React/Next.js", "Vite", "SQLite/Turso DB", "要求分析"],
  awards: [
    { year: 2024, description: "全日本プログラミングコンテスト 優秀賞" },
    { year: 2023, description: "学内ハッカソン 最優秀アイデア賞" },
  ],
  sns: {
    x: "https://x.com/your_x_account",
    instagram: "https://www.instagram.com/syunsuke_0522?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
    linkedin: "https://www.linkedin.com/in/your_linkedin_account",

  },
};
export const metadata = {
  viewport: "width=device-width, initial-scale=1",
};


// ページコンポーネント (API接続処理は一時的に削除し、同期的な表示に専念)
export default function HomePage() {
  const profile = memberProfile;

  
  return (
    // Tailwind CSSでレイアウトを適用（最大幅を設定し、中央寄せ）
    <main className="container mx-auto p-4 md:p-8 max-w-4xl font-sans text-gray-800">
      <HamburgerMenu />
      <ToTopButton />
      {/* 1. 名前と職種・肩書 */}
      <header className="py-8 border-b border-gray-300 mb-8 text-center">
        <h1 className="text-5xl font-extrabold tracking-tight text-gray-900">
          {profile.name}
        </h1>
        <p className="text-xl mt-2 text-indigo-700 font-semibold">
          {profile.title}
        </p>
      </header>

      <ImageSlider />

      {/* 2. 自己紹介とモットー/熱意 */}
      <section className="mb-10 p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold mb-4 border-b pb-2 text-indigo-600">
          自己紹介
        </h2>
        <p className="text-lg leading-relaxed mb-4">
          {profile.introduction}
        </p>
        
        <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-700">
          仕事に対するモットーや熱意
        </h3>
        <p className="italic text-base text-gray-600 border-l-4 border-indigo-400 pl-3">
          {profile.motto}
        </p>
      </section>

      {/* 3. スキル・能力 */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4 border-b pb-2 text-indigo-600">
          スキル・能力
        </h2>
        <div className="flex flex-wrap gap-3">
          {profile.skills.map((skill, index) => (
            <span key={index} className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium">
              {skill}
            </span>
          ))}
        </div>
      </section>

      {/* 4. 受賞歴 */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4 border-b pb-2 text-indigo-600">
          受賞歴
        </h2>
        <ul className="list-disc pl-6 space-y-2">
          {profile.awards.map((award, index) => (
            <li key={index} className="text-base text-gray-700">
              <span className="font-mono text-gray-500 mr-2">{award.year}</span>
              {award.description}
            </li>
          ))}
        </ul>
      </section>

      {/* 5. SNSのリンク */}
      <footer className="pt-8 border-t border-gray-300 text-center">
        <h2 className="text-xl font-bold mb-4 text-gray-700">
          SNS リンク
        </h2>
        <div className="flex justify-center space-x-6">
          <a href={profile.sns.x} target="_blank" rel="noopener noreferrer" 
             className="text-gray-500 hover:text-indigo-600 transition duration-300" aria-label="X (Twitter)">
            <SiX size={30} />
          </a>
          <a href={profile.sns.instagram} target="_blank" rel="noopener noreferrer" 
             className="text-gray-500 hover:text-indigo-600 transition duration-300" aria-label="Instagram">
            <SiInstagram size={30} />
          </a>
          <a href={profile.sns.linkedin} target="_blank" rel="noopener noreferrer" 
             className="text-gray-500 hover:text-indigo-600 transition duration-300" aria-label="LinkedIn">
            <SiLinkedin size={30} />
          </a>
        </div>
        <p className="mt-4 text-sm text-gray-500">
            © {new Date().getFullYear()} {profile.name}
        </p>
      </footer>
    </main>
  );
}

// ///////////////////////////////////////////////////////////
// 💡 将来的なAPI連携について:
// プロフィールを動的にしたい場合は、以下のコメントアウトを解除し、
// `memberProfile`の定義を削除して、元のAPI連携コードを再構築してください。
// その際、APIは「事例データ」ではなく「プロフィールデータ」を返すように変更が必要です。
// ///////////////////////////////////////////////////////////

/*
// Turso APIからプロフィールデータを取得する関数 (将来的に利用)
async function fetchProfileDataFromAPI() {
   // APIエンドポイントを/api/profileなどに変更する必要があります
   const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
   const res = await fetch(`${baseUrl}/api/profile`, { 
        cache: 'no-store' 
   });
   // ... (エラー処理とデータ取得ロジック)
   return res.json();
}
*/

