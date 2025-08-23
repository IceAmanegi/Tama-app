"use client"
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import './Articles.css';

interface Article {
  id: number;
  title: string;
  category: string;
  src: string;  // srcフィールドから画像データを取得
  content: string;
  tag: string;
  date: string;
}

interface ArticlesProps {
  articles: Article[];
}

export default function Articles({ articles }: ArticlesProps) {
  // Base64画像URLを作成する関数（srcフィールド用）
  const getImageUrl = (srcString: string) => {
    if (!srcString) return '/placeholder.jpg';
    
    try {
      // すでにdata:image/部分が含まれている場合はそのまま返す
      if (srcString.startsWith('data:image/')) {
        return srcString;
      }
      
      // Base64文字列にdata:image/jpeg;base64,プレフィックスを追加
      return `data:image/jpeg;base64,${srcString}`;
    } catch (error) {
      console.error('画像のデコードエラー:', error);
      return '/placeholder.jpg';
    }
  };

  return (
    <div className="articles-section">
      <div className="articles-header">
        <h1 className="main-title">たまっぷ</h1>
        <h2 className="sub-title">Pick Up</h2>
      </div>
      
      <div className="articles-grid">
        {articles.map((article) => (
          <Link href={`/blog/${article.id}`} key={article.id} className="article-card">
            <div className="article-image-wrapper">
              <Image
                src={getImageUrl(article.src)}  // srcフィールドを使用
                alt={article.title}
                fill
                unoptimized
                className="article-image"
              />
            </div>
            <div className="article-info">
              <h3 className="article-title">{article.title}</h3>
              <div className="meta-container">
                <span className="article-tag">{article.tag}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}