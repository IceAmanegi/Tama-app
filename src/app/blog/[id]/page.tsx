"use client"
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function blogDetals({params} :Props) {
  const res = await fetch('https://admin-panel-delta-six.vercel.app/api/blog')
  
  const data = await res.json()
  const blog = data.posts
  console.log(blog)

  // タグ抽出関数を追加
  function extractTag(article: any): string {
    // 1. 直接tagフィールドをチェック
    if (article.tag) {
      return article.tag;
    }
    
    // 2. bodyオブジェクト内のtagをチェック
    if (article.body && typeof article.body === 'object') {
      const possibleTagFields = ['tag', 'category', 'type', 'genre', 'label'];
      for (const field of possibleTagFields) {
        if (article.body[field]) {
          return article.body[field];
        }
      }
    }
    
    // 3. titleからカテゴリを推測
    const title = article.title?.toLowerCase() || '';
    if (title.includes('グルメ') || title.includes('料理') || title.includes('食')) {
      return 'グルメ';
    } else if (title.includes('観光') || title.includes('スポット') || title.includes('景色')) {
      return '観光';
    } else if (title.includes('イベント') || title.includes('祭') || title.includes('体験')) {
      return 'イベント';
    } else if (title.includes('住') || title.includes('移住') || title.includes('生活')) {
      return '体験';
    }
    
    return 'お知らせ';
  }

  // 記事詳細ページの表示部分
  return (
    <>
      <header className="article-header">
        <div className="article-meta">
          <span className="article-category">{extractTag(blog[0])}</span>
          <time className="article-date">{new Date(blog[0].createdAt).toLocaleDateString()}</time>
        </div>
        <h1 className="article-title">{blog[0].title}</h1>
      </header>
    </>
);
}