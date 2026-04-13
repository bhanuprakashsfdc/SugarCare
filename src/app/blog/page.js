'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import BottomNav from '@/components/BottomNav';
import Footer from '@/components/Footer';
import { blogPosts } from '@/data/healthData';

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedPost, setSelectedPost] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { key: 'all', label: 'All Articles' },
    { key: 'nutrition', label: 'Nutrition' },
    { key: 'education', label: 'Education' },
    { key: 'heart-health', label: 'Heart Health' },
  ];

  const filtered = blogPosts.filter(post => {
    const matchCategory = activeCategory === 'all' || post.category === activeCategory;
    const matchSearch = !searchQuery || post.title.toLowerCase().includes(searchQuery.toLowerCase()) || post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto px-6 py-12">
        <section className="mb-12 animate-fade-in-up">
          <span className="text-primary font-headline font-bold tracking-widest uppercase text-xs block mb-3">AI-Powered Content</span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-on-surface tracking-tight leading-tight mb-4">
            Health <span className="text-primary-container">Articles & Blog</span>
          </h1>
          <p className="text-on-surface-variant text-lg max-w-2xl mb-8">
            Evidence-based articles, expert insights, and culturally relevant content for diabetes management in Tirupati and beyond.
          </p>

          <div className="relative max-w-xl">
            <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
              <span className="material-symbols-outlined text-outline">search</span>
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles..."
              className="w-full h-14 pl-14 pr-14 bg-surface-container-high border-none rounded-xl text-base font-medium focus:ring-4 focus:ring-primary-container/20 transition-all shadow-sm placeholder:text-outline outline-none"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="absolute inset-y-0 right-5 flex items-center">
                <span className="material-symbols-outlined text-on-surface-variant">close</span>
              </button>
            )}
          </div>
        </section>

        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map(cat => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all ${
                activeCategory === cat.key ? 'bg-primary text-on-primary shadow-md' : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <p className="text-sm text-on-surface-variant mb-6">{filtered.length} articles found</p>

        {!selectedPost ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {filtered.map((post, i) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="bg-surface-container-lowest rounded-xl overflow-hidden border border-outline-variant/10 shadow-sm hover:shadow-lg transition-all cursor-pointer group"
                onClick={() => setSelectedPost(post)}
              >
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-4xl">{post.image}</span>
                    <span className="px-3 py-1 bg-primary-container/10 text-primary rounded-full text-xs font-bold uppercase">{post.category}</span>
                  </div>
                  <h2 className="font-headline font-bold text-xl mb-3 group-hover:text-primary transition-colors leading-tight">
                    {post.title}
                  </h2>
                  <p className="text-sm text-on-surface-variant line-clamp-3 mb-4">{post.excerpt}</p>
                  <div className="flex items-center justify-between text-xs text-on-surface-variant">
                    <span className="font-medium">{post.author}</span>
                    <div className="flex items-center gap-3">
                      <span>{post.readTime} read</span>
                      <span>{new Date(post.date).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}</span>
                    </div>
                  </div>
                </div>
                <div className="px-8 py-3 bg-surface-container-low/50 border-t border-outline-variant/5 flex items-center justify-between">
                  <div className="flex flex-wrap gap-1.5">
                    {post.tags.slice(0, 2).map(tag => (
                      <span key={tag} className="px-2 py-0.5 bg-surface-container rounded-full text-[10px] font-semibold text-on-surface-variant">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="text-xs font-bold text-primary group-hover:translate-x-1 transition-transform">Read →</span>
                </div>
              </motion.article>
            ))}
          </div>
        ) : (
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto"
          >
            <button
              onClick={() => setSelectedPost(null)}
              className="flex items-center gap-2 text-sm font-bold text-on-surface-variant hover:text-primary transition-colors mb-8"
            >
              <span className="material-symbols-outlined">arrow_back</span>
              Back to articles
            </button>
            <div className="bg-surface-container-lowest rounded-xl overflow-hidden border border-outline-variant/10 shadow-sm">
              <div className="bg-gradient-to-br from-primary/5 to-primary-container/5 p-8 border-b border-outline-variant/10">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-5xl">{selectedPost.image}</span>
                  <span className="px-3 py-1 bg-primary text-white rounded-full text-xs font-bold uppercase">{selectedPost.category}</span>
                </div>
                <h1 className="text-3xl md:text-4xl font-headline font-extrabold text-on-surface leading-tight mb-4">{selectedPost.title}</h1>
                <div className="flex items-center gap-4 text-sm text-on-surface-variant">
                  <span className="font-bold text-on-surface">{selectedPost.author}</span>
                  <span>{new Date(selectedPost.date).toLocaleDateString('en-IN', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                  <span>{selectedPost.readTime} read</span>
                </div>
              </div>
              <div className="p-8">
                <div className="prose max-w-none">
                  {selectedPost.content.split('\n').map((paragraph, i) => {
                    if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                      return <h3 key={i} className="font-headline font-bold text-xl mt-8 mb-3 text-on-surface">{paragraph.replace(/\*\*/g, '')}</h3>;
                    }
                    if (paragraph.startsWith('**')) {
                      const cleanText = paragraph.replace(/\*\*/g, '');
                      return <h3 key={i} className="font-headline font-bold text-lg mt-6 mb-2 text-on-surface">{cleanText}</h3>;
                    }
                    if (paragraph.startsWith('- ')) {
                      return <li key={i} className="text-on-surface-variant leading-relaxed ml-4 mb-1">{paragraph.replace('- ', '')}</li>;
                    }
                    if (paragraph.trim()) {
                      return <p key={i} className="text-on-surface-variant leading-relaxed mb-4">{paragraph}</p>;
                    }
                    return null;
                  })}
                </div>
                <div className="mt-8 pt-6 border-t border-outline-variant/10">
                  <div className="bg-primary/5 border border-primary/10 rounded-xl p-5 flex items-start gap-3">
                    <span className="material-symbols-outlined text-primary mt-0.5">info</span>
                    <div>
                      <p className="text-sm font-bold text-primary mb-1">Medical Disclaimer</p>
                      <p className="text-xs text-on-surface-variant">This article is for educational purposes only and does not replace professional medical advice. Always consult your healthcare provider before making changes to your diabetes management plan.</p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mt-6">
                  {selectedPost.tags.map(tag => (
                    <span key={tag} className="px-3 py-1.5 bg-surface-container-low rounded-full text-xs font-bold text-on-surface-variant">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.article>
        )}
      </main>
      <Footer />
      <BottomNav />
    </>
  );
}
