'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import BottomNav from '@/components/BottomNav';
import Footer from '@/components/Footer';
import { communityPosts, expertQnA } from '@/data/healthData';

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState('posts');
  const [selectedTag, setSelectedTag] = useState('');
  const [expandedPost, setExpandedPost] = useState(null);
  const [expandedQnA, setExpandedQnA] = useState(null);
  const [newPost, setNewPost] = useState({ title: '', content: '' });
  const [showNewPost, setShowNewPost] = useState(false);

  const tags = ['success-story', 'question', 'recipe', 'expert-advice', 'exercise', 'meal-plan'];

  const filteredPosts = selectedTag
    ? communityPosts.filter(p => p.tags.includes(selectedTag))
    : communityPosts;

  const filteredQnA = selectedTag
    ? expertQnA.filter(q => q.tags.includes(selectedTag))
    : expertQnA;

  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto px-6 py-12">
        <section className="mb-10 animate-fade-in-up">
          <span className="text-primary font-headline font-bold tracking-widest uppercase text-xs block mb-3">Support Network</span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-on-surface tracking-tight leading-tight mb-4">
            Community & <span className="text-primary-container">Expert Q&A</span>
          </h1>
          <p className="text-on-surface-variant text-lg max-w-2xl">
            Connect with fellow patients, share your journey, and get answers from certified medical professionals.
          </p>
        </section>

        <div className="flex flex-wrap gap-2 mb-6">
          {[
            { key: 'posts', label: 'Community Posts', icon: 'forum' },
            { key: 'qna', label: 'Expert Q&A', icon: 'quiz' },
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => { setActiveTab(tab.key); setSelectedTag(''); }}
              className={`px-5 py-3 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${
                activeTab === tab.key ? 'bg-primary text-on-primary shadow-lg' : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'
              }`}
            >
              <span className="material-symbols-outlined text-lg">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setSelectedTag('')}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
              !selectedTag ? 'bg-secondary-container text-on-secondary-container' : 'bg-surface-container-low text-on-surface-variant'
            }`}
          >
            All
          </button>
          {tags.map(tag => (
            <button
              key={tag}
              onClick={() => setSelectedTag(selectedTag === tag ? '' : tag)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                selectedTag === tag ? 'bg-secondary-container text-on-secondary-container' : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'
              }`}
            >
              {tag.replace('-', ' ')}
            </button>
          ))}
        </div>

        {activeTab === 'posts' && (
          <div className="space-y-6">
            <div className="flex justify-end">
              <button
                onClick={() => setShowNewPost(!showNewPost)}
                className="px-6 py-3 bg-primary text-white rounded-xl font-bold text-sm hover:opacity-90 transition-all flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-lg">add</span>
                New Post
              </button>
            </div>

            {showNewPost && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="bg-surface-container-lowest rounded-xl p-6 border border-outline-variant/10 shadow-sm"
              >
                <h3 className="font-headline font-bold text-lg mb-4">Create a Post</h3>
                <input
                  type="text"
                  value={newPost.title}
                  onChange={(e) => setNewPost(p => ({ ...p, title: e.target.value }))}
                  placeholder="Post title..."
                  className="w-full h-12 px-4 bg-surface-container-low rounded-lg text-sm font-medium outline-none focus:ring-2 focus:ring-primary-container/30 mb-3"
                />
                <textarea
                  value={newPost.content}
                  onChange={(e) => setNewPost(p => ({ ...p, content: e.target.value }))}
                  placeholder="Share your experience, ask a question, or offer advice..."
                  rows={4}
                  className="w-full px-4 py-3 bg-surface-container-low rounded-lg text-sm font-medium outline-none focus:ring-2 focus:ring-primary-container/30 mb-3 resize-none"
                />
                <div className="flex justify-end gap-3">
                  <button onClick={() => setShowNewPost(false)} className="px-4 py-2 text-sm font-bold text-on-surface-variant hover:bg-surface-container rounded-lg transition-all">Cancel</button>
                  <button
                    onClick={() => { setShowNewPost(false); setNewPost({ title: '', content: '' }); }}
                    className="px-6 py-2 bg-primary text-white rounded-lg font-bold text-sm hover:opacity-90 transition-all"
                    disabled={!newPost.title || !newPost.content}
                  >
                    Post
                  </button>
                </div>
              </motion.div>
            )}

            {filteredPosts.map((post, i) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                className="bg-surface-container-lowest rounded-xl p-6 border border-outline-variant/10 shadow-sm hover:shadow-md transition-all"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center text-2xl shrink-0">
                    {post.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold">{post.author}</span>
                      {post.verified && (
                        <span className="material-symbols-outlined text-primary text-sm filled">verified</span>
                      )}
                      <span className="text-xs text-on-surface-variant">{post.location}</span>
                    </div>
                    <p className="text-xs text-on-surface-variant">
                      {new Date(post.timestamp).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </p>
                  </div>
                </div>
                <h3 className="font-headline font-bold text-lg mb-2 cursor-pointer hover:text-primary transition-colors" onClick={() => setExpandedPost(expandedPost === post.id ? null : post.id)}>
                  {post.title}
                </h3>
                <p className={`text-sm text-on-surface-variant ${expandedPost === post.id ? '' : 'line-clamp-3'}`}>
                  {post.content}
                </p>
                {post.content.length > 200 && (
                  <button
                    onClick={() => setExpandedPost(expandedPost === post.id ? null : post.id)}
                    className="text-sm font-bold text-primary mt-1 hover:underline"
                  >
                    {expandedPost === post.id ? 'Show less' : 'Read more'}
                  </button>
                )}
                <div className="flex flex-wrap gap-1.5 mt-3 mb-4">
                  {post.tags.map(tag => (
                    <span key={tag} className="px-2 py-0.5 bg-surface-container-low rounded-full text-[10px] font-semibold text-on-surface-variant">
                      {tag.replace('-', ' ')}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-6 text-sm text-on-surface-variant">
                  <button className="flex items-center gap-1.5 hover:text-primary transition-colors">
                    <span className="material-symbols-outlined text-lg">favorite</span>
                    <span className="font-medium">{post.likes}</span>
                  </button>
                  <button className="flex items-center gap-1.5 hover:text-primary transition-colors">
                    <span className="material-symbols-outlined text-lg">chat_bubble</span>
                    <span className="font-medium">{post.replies} replies</span>
                  </button>
                  <button className="flex items-center gap-1.5 hover:text-primary transition-colors">
                    <span className="material-symbols-outlined text-lg">share</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {activeTab === 'qna' && (
          <div className="space-y-6">
            <div className="bg-primary/5 border border-primary/10 rounded-xl p-6 flex items-start gap-4 mb-6">
              <span className="material-symbols-outlined text-primary text-3xl mt-1">info</span>
              <div>
                <h3 className="font-bold text-lg mb-1">Expert-Verified Answers</h3>
                <p className="text-sm text-on-surface-variant">
                  All answers in this section are provided by certified medical professionals. Always consult your own doctor before making medical decisions.
                </p>
              </div>
            </div>

            {filteredQnA.map((qa, i) => (
              <motion.div
                key={qa.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                className="bg-surface-container-lowest rounded-xl overflow-hidden border border-outline-variant/10 shadow-sm"
              >
                <div className="p-6">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-primary-container/10 flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-primary">help</span>
                    </div>
                    <div>
                      <h3 className="font-headline font-bold text-lg">{qa.question}</h3>
                      <p className="text-xs text-on-surface-variant mt-1">Asked by {qa.askedBy} · {new Date(qa.timestamp).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}</p>
                    </div>
                  </div>
                  <div className={`bg-surface-container-low rounded-xl p-5 border-l-4 border-primary ${expandedQnA === qa.id ? '' : 'max-h-32 overflow-hidden relative'}`}>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="material-symbols-outlined text-primary filled text-lg">verified</span>
                      <span className="text-sm font-bold text-primary">{qa.answeredBy}</span>
                    </div>
                    <p className="text-sm text-on-surface-variant leading-relaxed whitespace-pre-line">{qa.answer}</p>
                    {expandedQnA !== qa.id && (
                      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-surface-container-low to-transparent" />
                    )}
                  </div>
                  {qa.answer.length > 300 && (
                    <button
                      onClick={() => setExpandedQnA(expandedQnA === qa.id ? null : qa.id)}
                      className="text-sm font-bold text-primary mt-3 hover:underline"
                    >
                      {expandedQnA === qa.id ? 'Show less' : 'Read full answer'}
                    </button>
                  )}
                </div>
                <div className="px-6 py-3 bg-surface-container-low/50 border-t border-outline-variant/5 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <button className="flex items-center gap-1.5 text-sm text-on-surface-variant hover:text-primary transition-colors">
                      <span className="material-symbols-outlined text-lg">thumb_up</span>
                      <span className="font-medium">{qa.upvotes} helpful</span>
                    </button>
                    <div className="flex flex-wrap gap-1.5">
                      {qa.tags.map(tag => (
                        <span key={tag} className="px-2 py-0.5 bg-surface-container rounded-full text-[10px] font-semibold text-on-surface-variant">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </main>
      <Footer />
      <BottomNav />
    </>
  );
}
