/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['admin-panel-delta-six.vercel.app'],  // APIのドメインを追加
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'admin-panel-delta-six.vercel.app',
        port: '',
        pathname: '/**',
      },
    ],
  },
}

module.exports = nextConfig

import Articles from "@/components/Articles";
import Drawermenu from "@/components/Drawermenu";

/drawermenu/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/        # コンポーネント用ディレクトリ
│   │   ├── Articles/
│   │   │   ├── index.tsx
│   │   │   └── Articles.module.css
│   │   └── Drawermenu/
│   │       ├── index.tsx
│   │       └── Drawermenu.module.css
│   ├── types/            # 型定義用ディレクトリ
│   │   └── article.ts    # Article型の定義
│   └── constants/        # 定数用ディレクトリ
│       └── categories.ts
├── public/              # 画像などの静的ファイル
├── next.config.js
└── package.json

import { Category } from '../constants/categories';

export interface Article {
  id: number;
  title: string;
  category: Category;
  image: string;
  content: string;
  tag: string;
  date: string;
}

{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }