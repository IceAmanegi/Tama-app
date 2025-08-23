import Articles from './component/Articles/Articles';

// 記事一覧を取得
async function getArticles() {
  try {
    const res = await fetch('https://admin-panel-delta-six.vercel.app/api/blog', {
      next: { revalidate: 3600 } // 1時間ごとに再検証
    });
    
    if (!res.ok) {
      throw new Error(`API request failed with status ${res.status}`);
    }
    
    const data = await res.json();
console.log (data.posts.body);
    return data?.posts || [];
  } catch (error) {
    console.error('Error fetching blog data:', error);
    return [];
  }
}

export default async function Home() {
  const articles = await getArticles();
  
  return (
    <main>
      <Articles articles={articles} />
    </main>
  );
}