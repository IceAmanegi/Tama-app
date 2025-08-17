import Image from "next/image";
import Drawermenu from "./component/Drawermenu";

export default async function Home() {
  try {
    const res = await fetch('https://admin-panel-delta-six.vercel.app/api/blog');
    
    if (!res.ok) {
      throw new Error(`API request failed with status ${res.status}`);
    }
    
    const data = await res.json();
    const blog = data?.posts || [];
    console.log(blog);

    return (
      <div>
        <Drawermenu />
      </div>
    );
  } catch (error) {
    console.error('Error fetching blog data:', error);
    return (
      <div>
        <p>データの読み込み中にエラーが発生しました。</p>
        <Drawermenu />
      </div>
    );
  }
}
