import React from "react";
import Link from "next/link";
import Image from "next/image";
import './ArticleDetail.css';

type Props = {
  params: Promise<{ id: string }>;
};

// APIから記事データを取得する関数
async function getArticle(id: string) {
  try {
    const res = await fetch(
      `https://admin-panel-delta-six.vercel.app/api/blog/${id}`,
      {
        next: { revalidate: 3600 }, // 1時間ごとに再検証
      }
    );

    if (!res.ok) {
      throw new Error(`記事の取得に失敗しました (${res.status})`);
    }

    return await res.json();
  } catch (error) {
    console.error(`ID:${id}の記事取得エラー:`, error);
    return null;
  }
}

// 画像URLを処理する関数
function getImageUrl(srcString: string) {
  if (!srcString) return '/placeholder.jpg';
  
  try {
    if (srcString.startsWith('data:image/')) {
      return srcString;
    }
    return `data:image/jpeg;base64,${srcString}`;
  } catch (error) {
    console.error('画像のデコードエラー:', error);
    return '/placeholder.jpg';
  }
}

// 日付フォーマット関数
function formatDate(dateString: string) {
  if (!dateString) return '';
  
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return dateString;
    }
    
    return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;
  } catch (error) {
    return dateString;
  }
}

const BlogDetailsPage = async ({ params }: Props) => {
  const { id } = await params;
  const article = await getArticle(id);
  
  if (!article) {
    return (
      <div className="error-container">
        <div className="error-content">
          <h1>記事が見つかりませんでした</h1>
          <p>お探しの記事は削除されたか、URLが間違っている可能性があります。</p>
          <Link href="/" className="back-home-btn">
            ホームページに戻る
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="blog-detail-wrapper">
      <div className="blog-container">
        {/* ナビゲーション */}
        <nav className="blog-nav">
          <Link href="/" className="nav-back">
            <span className="back-icon">←</span>
            記事一覧に戻る
          </Link>
        </nav>
        
        {/* メイン記事コンテンツ */}
        <article className="blog-article">
          {/* ヘッダー */}
          <header className="article-header">
            <div className="article-meta">
              <span className="article-category">{article.category || 'お知らせ'}</span>
              <time className="article-date">{formatDate(article.date)}</time>
            </div>
            <h1 className="article-title">{article.title}</h1>
            {article.tag && (
              <div className="article-tags">
                <span className="tag">{article.tag}</span>
              </div>
            )}
          </header>
          
          {/* メイン画像 */}
          {article.src && (
            <div className="article-hero-image">
              <Image 
                src={getImageUrl(article.src)}
                alt={article.title}
                width={800}
                height={450}
                className="hero-image"
                priority
                unoptimized
              />
            </div>
          )}
          
          {/* 記事本文 */}
          <div className="article-content">
            {article.content ? (
              <div 
                className="content-body"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />
            ) : (
              <p className="no-content">コンテンツが見つかりませんでした。</p>
            )}
          </div>
          
          {/* フッター */}
          <footer className="article-footer">
            <div className="article-info-box">
              <p>この記事は {formatDate(article.date)} に公開されました。</p>
              {article.category && (
                <p>カテゴリー: <span className="category-link">{article.category}</span></p>
              )}
            </div>
            
            <div className="article-actions">
              <Link href="/" className="return-home">
                他の記事を見る
              </Link>
            </div>
          </footer>
        </article>
      </div>
    </div>
  );
};

export default BlogDetailsPage;