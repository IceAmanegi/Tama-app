"use client"
import React, { useState, useEffect } from 'react';
import '../globals.css';
import menuIcon from '../assets/logoSort.png';
import { categories, Category } from '../data/categories';

export default function Drawermenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  const [blog, setBlog] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  return (
    <div className="App">
      <button className="circle-button" onClick={() => setIsOpen(true)}>
        {/* <img src={menuIcon} alt="メニュー" />  a*/}
      </button>
      
      <div
        className={`modal-overlay ${isOpen ? 'active' : ''}`} 
        onClick={() => setIsOpen(false)}
      >
        <div className="modal" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h2>絞り込む</h2>
            <button className="close-button" onClick={() => setIsOpen(false)}>
              ×
            </button>
          </div>
          
          <div className="category-scroll">
            {categories.map((category, index) => (
              <button 
                key={category} // indexをkeyとして使用するのを避ける
                className={`category-button ${selectedCategories.includes(category) ? 'selected' : ''}`}
                onClick={() => toggleCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
