"use client"
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Category } from '../data/categories';
import './Articles.css';  // CSSをインポート

interface Article {
  id: number;
  title: string;
  category: Category;
  imageUrl: string;
  link: string;
}

// サンプルデータ
const sampleArticles: Article[] = [
  {
    id: 1,
    title: "多摩センターのカフェ",
    category: "カフェ",
    imageUrl: "/images/sample1.jpg",
    link: "/articles/1"
  },
  {
    id: 2,
    title: "多摩の絶景スポット",
    category: "絶景",
    imageUrl: "/images/sample2.jpg",
    link: "/articles/2"
  },
  {
    id: 3,
    title: "おすすめグルメ",
    category: "グルメ",
    imageUrl: "/images/sample3.jpg",
    link: "/articles/3"
  },
  {
    id: 4,
    title: "週末イベント",
    category: "イベント",
    imageUrl: "/images/sample4.jpg",
    link: "/articles/4"
  }
];

export default function Articles() {
  return (
    <div className="articles-section">
      <div className="articles-header">
        <h1 className="main-title">たまっぷ</h1>
        <h2 className="sub-title">Pick Up</h2>
      </div>
      
      <div className="articles-grid">
        {sampleArticles.map((article) => (
          <Link href={article.link} key={article.id} className="article-card">
            <div className="article-image-wrapper">
              <div className="article-image-placeholder" />
              {/* 画像が用意できたら以下のコメントを解除
              <Image
                src={article.imageUrl}
                alt={article.title}
                fill
                className="article-image"
              />
              */}
            </div>
            <div className="article-info">
              <span className="article-category">{article.category}</span>
              <h3 className="article-title">{article.title}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}