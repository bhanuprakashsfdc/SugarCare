'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import BottomNav from '@/components/BottomNav';
import Footer from '@/components/Footer';
import { challenges, achievementBadges } from '@/data/healthData';

export default function ChallengesPage() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [joinedChallenges, setJoinedChallenges] = useState(['ch-1', 'ch-4']);

  const filteredChallenges = activeFilter === 'all'
    ? challenges
    : challenges.filter(c => c.category === activeFilter);

  const toggleJoin = (id) => {
    setJoinedChallenges(prev =>
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };

  const totalPoints = joinedChallenges.reduce((sum, id) => {
    const ch = challenges.find(c => c.id === id);
    return sum + (ch?.points || 0);
  }, 0);

  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto px-6 py-12">
        <section className="mb-12 animate-fade-in-up">
          <span className="text-primary font-headline font-bold tracking-widest uppercase text-xs block mb-3">Gamified Health</span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-on-surface tracking-tight leading-tight mb-4">
            Challenges & <span className="text-primary-container">Rewards</span>
          </h1>
          <p className="text-on-surface-variant text-lg max-w-2xl">
            Join community challenges, earn badges, and stay motivated on your diabetes management journey.
          </p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10">
          <div className="bg-primary text-on-primary rounded-xl p-6 flex flex-col items-center justify-center text-center">
            <span className="text-5xl font-extrabold font-headline">{joinedChallenges.length}</span>
            <p className="text-sm font-bold mt-1 opacity-90">Active Challenges</p>
          </div>
          <div className="bg-surface-container-lowest rounded-xl p-6 flex flex-col items-center justify-center text-center border border-outline-variant/10">
            <span className="text-5xl font-extrabold font-headline text-primary">{totalPoints}</span>
            <p className="text-sm font-bold mt-1 text-on-surface-variant">Points Earned</p>
          </div>
          <div className="bg-surface-container-lowest rounded-xl p-6 flex flex-col items-center justify-center text-center border border-outline-variant/10">
            <span className="text-5xl font-extrabold font-headline text-secondary">{achievementBadges.filter(b => b.earned).length}</span>
            <p className="text-sm font-bold mt-1 text-on-surface-variant">Badges Earned</p>
          </div>
          <div className="bg-surface-container-lowest rounded-xl p-6 flex flex-col items-center justify-center text-center border border-outline-variant/10">
            <span className="text-5xl font-extrabold font-headline text-tertiary">#{Math.max(1, 15 - joinedChallenges.length * 3)}</span>
            <p className="text-sm font-bold mt-1 text-on-surface-variant">Community Rank</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {['all', 'diet', 'exercise', 'monitoring'].map(f => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all capitalize ${
                activeFilter === f ? 'bg-primary text-on-primary shadow-md' : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {filteredChallenges.map((challenge, i) => {
            const isJoined = joinedChallenges.includes(challenge.id);
            return (
              <motion.div
                key={challenge.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className={`bg-surface-container-lowest rounded-xl overflow-hidden border shadow-sm hover:shadow-lg transition-all ${
                  isJoined ? 'border-primary/30' : 'border-outline-variant/10'
                }`}
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-4xl">{challenge.icon}</span>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${
                        challenge.difficulty === 'easy' ? 'bg-primary-container/10 text-primary' :
                        challenge.difficulty === 'medium' ? 'bg-secondary-container/10 text-secondary' :
                        'bg-tertiary-container/10 text-tertiary'
                      }`}>
                        {challenge.difficulty}
                      </span>
                      {isJoined && (
                        <span className="px-2 py-1 rounded-full text-[10px] font-bold bg-primary text-white">JOINED</span>
                      )}
                    </div>
                  </div>
                  <h3 className="font-headline font-bold text-xl mb-2">{challenge.title}</h3>
                  <p className="text-sm text-on-surface-variant mb-4 line-clamp-2">{challenge.description}</p>
                  <div className="flex items-center gap-4 text-xs text-on-surface-variant mb-4">
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">timer</span>
                      {challenge.duration} days
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">star</span>
                      {challenge.points} pts
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">group</span>
                      {challenge.participants}
                    </span>
                  </div>
                  <div className="mb-4">
                    <p className="text-xs font-bold text-on-surface-variant mb-2 uppercase tracking-wide">Milestones</p>
                    <div className="flex gap-2">
                      {challenge.milestones.map((m, j) => (
                        <span key={j} className="text-lg" title={m.title}>{m.reward}</span>
                      ))}
                    </div>
                  </div>
                  <button
                    onClick={() => toggleJoin(challenge.id)}
                    className={`w-full py-3 rounded-xl font-bold text-sm transition-all ${
                      isJoined
                        ? 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'
                        : 'bg-primary text-white hover:opacity-90'
                    }`}
                  >
                    {isJoined ? 'Leave Challenge' : 'Join Challenge'}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        <section className="mb-12">
          <h2 className="text-3xl font-headline font-extrabold mb-8">Achievement Badges</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {achievementBadges.map((badge, i) => (
              <motion.div
                key={badge.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                className={`bg-surface-container-lowest rounded-xl p-5 text-center border transition-all ${
                  badge.earned
                    ? 'border-primary/30 shadow-md'
                    : 'border-outline-variant/10 opacity-50 grayscale'
                }`}
              >
                <span className="text-4xl block mb-2">{badge.icon}</span>
                <p className="font-bold text-sm mb-1">{badge.name}</p>
                <p className="text-xs text-on-surface-variant">{badge.description}</p>
                {badge.earned && (
                  <span className="inline-block mt-2 px-2 py-0.5 bg-primary-container/10 text-primary text-[10px] font-bold rounded-full">
                    EARNED
                  </span>
                )}
              </motion.div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
      <BottomNav />
    </>
  );
}
