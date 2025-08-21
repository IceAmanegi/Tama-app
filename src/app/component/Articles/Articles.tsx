"use client"
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Category } from '../../assets/data/categories';
import './Articles.css';

interface Article {
  id: number;
  title: string;
  category: Category;
  image: string;  // imageUrlをimageに変更
  content: string;
  tag: string;
  date: string;
}

interface ArticlesProps {
  articles: Article[];
}

export default function Articles({ articles }: ArticlesProps) {
  // APIデータがない場合はサンプルデータを使用
  const displayArticles = articles.length > 0 ? articles : [
    {
      id: 1,
      title: "多摩センターのカフェ",
      category: "カフェ",
      image: "/cafe.jpg",
      content: "静かな環境で勉強できるカフェをご紹介",
      tag: "おすすめ",
      date: "2024.02.01"
    },
    {
      id: 2,
      title: "多摩の絶景スポット",
      category: "絶景",
      image: "/view.jpg",
      content: "四季折々の美しい風景が楽しめるスポット",
      tag: "絶景スポット",
      date: "2024.02.02"
    },
    {
      id: 3,
      title: "おすすめグルメ",
      category: "グルメ",
      image: "/images/sample3.jpg",
      content: "地元民に愛される絶品グルメを厳選して紹介",
      tag: "グルメ",  // サンプルタグ
      date: "2024.02.03"  // サンプル日付
    },
    {
      id: 4,
      title: "週末イベント",
      category: "イベント",
      image: "/images/sample4.jpg",
      content: "家族で楽しめる週末限定のイベント情報",
      tag: "イベント",  // サンプルタグ
      date: "2024.02.04"  // サンプル日付
    }
  ];

  return (
    <div className="articles-section">
      <div className="articles-header">
        <h1 className="main-title">たまっぷ</h1>
        <h2 className="sub-title">Pick Up</h2>
      </div>
      
      <div className="articles-grid">
        {displayArticles.map((article) => (
          <Link href={`/articles/${article.id}`} key={article.id} className="article-card">
            <div className="article-image-wrapper">
              {article.image ? (
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="article-image"
                />
              ) : (
                <div className="article-image-placeholder" />
              )}
            </div>
            <div className="article-info">
              <div className="tags-container">
                <span className="article-tag">{article.tag}</span>
                <span className="article-date">{article.date}</span>
              </div>
              <h3 className="article-title">{article.title}</h3>
              <p className="article-content">{article.content}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}