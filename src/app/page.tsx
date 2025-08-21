import Image from "next/image";
import Drawermenu from "./component/Drawermenu";
import Articles from "./component/Articles";

export default async function Home() {
  try {
    const res = await fetch('https://admin-panel-delta-six.vercel.app/api/blog');
    
    if (!res.ok) {
      throw new Error(`API request failed with status ${res.status}`);
    }
    
    const data = await res.json();
    const blog = data?.posts || [];

    return (
      <div>
        <Articles articles={blog} />
        <Drawermenu />
      </div>
    );
  } catch (error) {
    console.error('Error fetching blog data:', error);
    return (
      <div>
        <Articles articles={[]} />
        <p>データの読み込み中にエラーが発生しました。</p>
        <Drawermenu />
      </div>
    );
  }
}
