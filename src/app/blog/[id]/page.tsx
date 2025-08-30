import React from 'react';
import { generateHTML } from '@tiptap/html';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';

type Props = {
  params: Promise<{ id: string }>;
};

type BlogData = {
  id: string;
  title: string;
  body: JSON;
  createdAt: string;
  updatadAt: string;
  src: string;
};

export default async function blogDetals({ params }: Props) {
  const { id } = await params;
  const res = await fetch(
    `https://admin-panel-delta-six.vercel.app/api/blog/${id}`,
    {
      method: 'GET',
      cache: 'no-cache',
    }
  );
  if (!res.ok) {
    throw new Error(`レスポンスステータス,${res.status}`);
  } else {
    console.log('success');
  }
  const data = await res.json();
  const blog: BlogData = data.post;
  console.log(blog.body);
  const html = generateHTML(blog.body, [StarterKit, Image]);
  return (
    <>
      <h1>{blog.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </>
  );
}


