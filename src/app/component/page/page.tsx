"use client"

import { useEffect, useState } from 'react';
import styles from './ArticleDetail.module.css';
import Link from 'next/link';
import Image from 'next/image';

interface Article {
  id: number;
  title: string;
  content: string;
  image: string;
  tag: string;
  date: string;
}

export default function ArticleDetail({ params }: { params: { id: string } }) {
  const [article, setArticle] = useState<Article | null>(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const res = await fetch(`https://admin-panel-delta-six.vercel.app/api/blog/${params.id}`);
        if (!res.ok) throw new Error('記事の取得に失敗しました');
        const data = await res.json();
        setArticle(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchArticle();
  }, [params.id]);

  if (!article) return <div>Loading...</div>;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }).replace(/\//g, '.');
  };

  return (
    <div className={styles.container}>
      <Link href="/" className={styles.backButton}>
        ← 戻る
      </Link>
      
      <article className={styles.article}>
        <div className={styles.imageWrapper}>
          <Image
            src={`data:image/jpeg;base64,${article.image}`}
            alt={article.title}
            fill
            className={styles.image}
          />
        </div>

        <div className={styles.content}>
          <h1 className={styles.title}>{article.title}</h1>
          
          <div className={styles.meta}>
            <span className={styles.date}>{formatDate(article.date)}</span>
            <span className={styles.tag}>{article.tag}</span>
          </div>

          <div className={styles.body}>
            {article.content}
          </div>
        </div>
      </article>
    </div>
  );
}