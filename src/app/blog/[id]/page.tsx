"use client"
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import './Articles.css';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function blogDetals({params} :Props) {
  const res = await fetch('https://admin-panel-delta-six.vercel.app/api/blog')
  
  const data = await res.json()
  const blog = data.posts
  console.log(blog)

  return (
    <>
    </>
);
}