"use client";

import { useState } from "react";

export default function HamburgerMenu() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* ハンバーガーボタン */}
      <button
        onClick={() => setOpen(!open)}
        style={{
          fontSize: "40px",
          background: "none",
          border: "none",
          cursor: "pointer",
          position: "fixed",
          top: "30px",
          right: "250px",
          zIndex: 1001,
        }}
       aria-label="メニュー切り替え"
      >
        {open ? "✕" : "☰"}
      </button>

      {/* オーバーレイ（背景） */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0, 0, 0, 0.4)",
            zIndex: 1000,
          }}
        />
      )}

      {/* スライドメニュー */}
        <nav className="menu"
            style={{
                position: "fixed",
                top: 0,
                right: 0,
                height: "100vh",
                width: "200px",
                background: "#bbffffff",
                transform: open ? "translateX(0)" : "translateX(100%)",
                transition: "transform 0.3s ease",
                zIndex: 1002,
                display: "flex",
                alignItems: "flex-start",
                paddingTop: "80px",
                paddingLeft: "60px",
            }}
            >
            <ul style={{ listStyle: "none", padding: 0 ,textAlign: "center",lineHeight:"3.5em"}}>
                <li><a href="/">トップページ</a></li>
                <li><a href="/history">過去の歴史</a></li>
                <li><a href="/blog">ブログ</a></li>
                <li><a href="/contact">お問い合わせ</a></li>
            </ul>
        </nav>
    </>
  );
}
