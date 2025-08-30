
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import './BlogDetail.css';

type Props = {
  params: Promise<{ id: string }>;
};

// 記事データの型定義
interface ArticleData {
  id: string;
  title: string;
  body: {
    type: 'doc';
    content: any[];
  };
  createdAt: string;
  updatedAt: string;
  src: string;
  tag: string[];
}

// 記事を取得する関数
async function getArticle(id: string): Promise<ArticleData | null> {
  try {
    const res = await fetch('https://admin-panel-delta-six.vercel.app/api/blog', {
      next: { revalidate: 60 }
    });
    
    if (!res.ok) {
      throw new Error(`Failed to fetch: ${res.status}`);
    }
    
    const articles = await res.json();
    const article = articles.find((item: any) => item.id === id);
    
    return article || null;
  } catch (error) {
    console.error('記事取得エラー:', error);
    return null;
  }
}

// 静的パラメータ生成
export async function generateStaticParams() {
  try {
    const res = await fetch('https://admin-panel-delta-six.vercel.app/api/blog');
    const articles = await res.json();
    
    return articles.map((article: any) => ({
      id: article.id,
    }));
  } catch (error) {
    console.error('静的パラメータ生成エラー:', error);
    return [];
  }
}

// メタデータ生成
export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const article = await getArticle(id);
  
  if (!article) {
    return {
      title: '記事が見つかりません | たまっぷ',
    };
  }
  
  return {
    title: `${article.title} | たまっぷ`,
    description: article.title,
  };
}

// 日付フォーマット関数
function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;
  } catch (error) {
    return dateString;
  }
}

// 画像URL処理関数
function getImageUrl(srcString: string): string {
  if (!srcString) return '/placeholder.jpg';
  
  if (srcString.startsWith('data:image/')) {
    return srcString;
  }
  
  if (srcString.startsWith('http://') || srcString.startsWith('https://')) {
    return srcString;
  }
  
  return srcString;
}

// コンテンツ抽出関数
function extractContentFromBody(body: any): string {
  if (!body || body.type !== 'doc' || !body.content) {
    return 'コンテンツが見つかりませんでした。';
  }

  try {
    const processContent = (contentArray: any[]): string => {
      let result = '';
      
      contentArray.forEach((item: any) => {
        switch (item.type) {
          case 'paragraph':
            if (item.content && Array.isArray(item.content)) {
              let paragraphText = '';
              item.content.forEach((textItem: any) => {
                if (textItem.type === 'text' && textItem.text) {
                  paragraphText += textItem.text;
                }
              });
              if (paragraphText.trim()) {
                result += paragraphText + '\n\n';
              }
            }
            break;
            
          case 'heading':
            if (item.content && Array.isArray(item.content)) {
              let headingText = '';
              item.content.forEach((textItem: any) => {
                if (textItem.type === 'text' && textItem.text) {
                  headingText += textItem.text;
                }
              });
              if (headingText.trim()) {
                const level = item.attrs?.level || 2;
                const prefix = '#'.repeat(level);
                result += `${prefix} ${headingText}\n\n`;
              }
            }
            break;
            
          case 'bulletList':
          case 'orderedList':
            if (item.content && Array.isArray(item.content)) {
              item.content.forEach((listItem: any, index: number) => {
                if (listItem.type === 'listItem' && listItem.content) {
                  const bullet = item.type === 'orderedList' ? `${index + 1}. ` : '• ';
                  const itemText = processContent(listItem.content);
                  if (itemText.trim()) {
                    result += bullet + itemText.trim() + '\n';
                  }
                }
              });
              result += '\n';
            }
            break;
            
          default:
            if (item.content && Array.isArray(item.content)) {
              result += processContent(item.content);
            }
            break;
        }
      });
      
      return result;
    };

    const extractedText = processContent(body.content);
    return extractedText || JSON.stringify(body, null, 2);
    
  } catch (error) {
    console.error('コンテンツ抽出エラー:', error);
    return `コンテンツの解析中にエラーが発生しました。\n\n${JSON.stringify(body, null, 2)}`;
  }
}

export default async function BlogDetailPage({ params }: Props) {
  const { id } = await params;
  const article = await getArticle(id);
  
  if (!article) {
    return (
      <div className="error-container">
        <div className="error-content">
          <h1>記事が見つかりませんでした</h1>
          <p>記事ID: {id}</p>
          <p>お探しの記事は削除されたか、URLが間違っている可能性があります。</p>
          <Link href="/" className="back-home-btn">
            ホームページに戻る
          </Link>
        </div>
      </div>
    );
  }

  const content = extractContentFromBody(article.body);

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
            {/* メタ情報バー */}
            <div className="article-meta-bar">
              <div className="meta-left">
                <span className="article-id">ID: {article.id.slice(0, 8)}...</span>
                <span className="article-category">
                  {article.tag && article.tag.length > 0 ? article.tag[0] : 'お知らせ'}
                </span>
              </div>
              <time className="article-date">
                {formatDate(article.createdAt)}
              </time>
            </div>
            
            {/* タイトルセクション */}
            <div className="title-section">
              <h1 className="article-title">{article.title}</h1>
              
              {/* タグ一覧表示 */}
              {article.tag && article.tag.length > 0 && (
                <div className="article-tags">
                  {article.tag.map((tag, index) => (
                    <span key={index} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </header>
          
          {/* メイン画像 */}
          {article.src && (
            <div className="article-hero-image">
              <Image 
                src={getImageUrl(article.src)}
                alt={article.title}
                fill
                className="hero-image"
                style={{ objectFit: 'cover' }}
                priority
                unoptimized
              />
            </div>
          )}
          
          {/* 記事本文 */}
          <div className="article-content">
            <div className="content-body">
              {content.split('\n\n').map((paragraph, index) => {
                if (paragraph.startsWith('# ')) {
                  return <h1 key={index}>{paragraph.replace('# ', '')}</h1>;
                } else if (paragraph.startsWith('## ')) {
                  return <h2 key={index}>{paragraph.replace('## ', '')}</h2>;
                } else if (paragraph.startsWith('### ')) {
                  return <h3 key={index}>{paragraph.replace('### ', '')}</h3>;
                } else if (paragraph.startsWith('• ')) {
                  const listItems = paragraph.split('\n').filter(item => item.startsWith('• '));
                  return (
                    <ul key={index}>
                      {listItems.map((item, i) => (
                        <li key={i}>{item.replace('• ', '')}</li>
                      ))}
                    </ul>
                  );
                } else if (paragraph.match(/^\d+\. /)) {
                  const listItems = paragraph.split('\n').filter(item => item.match(/^\d+\. /));
                  return (
                    <ol key={index}>
                      {listItems.map((item, i) => (
                        <li key={i}>{item.replace(/^\d+\. /, '')}</li>
                      ))}
                    </ol>
                  );
                } else if (paragraph.trim()) {
                  return <p key={index}>{paragraph}</p>;
                }
                return null;
              })}
            </div>
          </div>
          
          {/* フッター */}
          <footer className="article-footer">
            <div className="article-info-section">
              <div className="info-card publish-info">
                <h4>📅 投稿情報</h4>
                <p>公開日: {formatDate(article.createdAt)}</p>
                {article.updatedAt && article.updatedAt !== article.createdAt && (
                  <p>最終更新: {formatDate(article.updatedAt)}</p>
                )}
              </div>
              
              <div className="info-card tag-info">
                <h4>🏷️ カテゴリ情報</h4>
                {article.tag && article.tag.length > 0 ? (
                  <p>タグ: <span className="category-link">{article.tag.join(', ')}</span></p>
                ) : (
                  <p>タグ: なし</p>
                )}
                <p>記事ID: <span className="article-id-full">{article.id}</span></p>
              </div>
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
}