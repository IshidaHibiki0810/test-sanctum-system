import type { NextConfig } from "next";

const nextConfig: any = { // ここを :any にして一時的に型チェックを緩めます
  /* その他の設定 */
  
  // サーバーアクションの制限を解除
  serverActions: {
    bodySizeLimit: "10mb",
  },

  // バージョンによってはこちらが必要な場合があるため、念のため残します
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },
};

export default nextConfig as NextConfig;