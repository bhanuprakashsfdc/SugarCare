'use client';

import { useState, useMemo } from 'react';
import Navbar from '@/components/Navbar';
import BottomNav from '@/components/BottomNav';
import Footer from '@/components/Footer';
import { indianFoods, avoidFoods, moderateFoods, foodSwaps } from '@/data/mockData';

export default function FoodGuidePage() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const allFoods = useMemo(() => {
    const combined = [
      ...indianFoods.map(f => ({ ...f, status: 'good' })),
      ...moderateFoods.map(f => ({ ...f, status: 'moderate' })),
      ...avoidFoods.map(f => ({ ...f, status: 'avoid' })),
    ];
    if (activeCategory === 'all') return combined;
    if (activeCategory === 'low') return combined.filter(f => f.status === 'good');
    if (activeCategory === 'moderate') return combined.filter(f => f.status === 'moderate');
    if (activeCategory === 'avoid') return combined.filter(f => f.status === 'avoid');
    return combined;
  }, [activeCategory]);

  const filteredFoods = useMemo(() => {
    if (!search) return allFoods;
    return allFoods.filter(f => f.name.toLowerCase().includes(search.toLowerCase()));
  }, [search, allFoods]);

  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto px-6 py-12 md:py-20">
        <section className="mb-16 animate-fade-in-up">
          <h1 className="text-5xl md:text-7xl font-extrabold text-on-surface tracking-tight leading-tight mb-8">
            Your Health,<br /><span className="text-primary">One Bite at a Time.</span>
          </h1>
          <div className="relative max-w-2xl group">
            <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
              <span className="material-symbols-outlined text-outline">restaurant</span>
            </div>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="What do you want to eat?"
              className="w-full h-20 pl-16 pr-16 bg-surface-container-high border-none rounded-xl text-xl font-medium focus:ring-4 focus:ring-primary-container/20 transition-all shadow-sm placeholder:text-outline outline-none"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                aria-label="Clear search"
                className="absolute inset-y-0 right-6 flex items-center text-on-surface-variant hover:text-on-surface transition-colors"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            )}
          </div>
        </section>

        <div className="flex flex-wrap gap-3 mb-10 animate-fade-in-up-delay-1">
          {[
            { key: 'all', label: 'All Foods' },
            { key: 'low', label: 'Safe Choices' },
            { key: 'moderate', label: 'Moderate' },
            { key: 'avoid', label: 'Avoid' },
          ].map(cat => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`px-6 py-3 rounded-xl font-bold text-sm transition-all ${
                activeCategory === cat.key
                  ? 'bg-primary text-on-primary shadow-lg'
                  : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <section className="mb-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredFoods.map((food, i) => {
              return (
                <div
                  key={food.id}
                  className={`bg-surface-container-lowest rounded-xl p-6 border shadow-sm hover:shadow-md transition-all animate-fade-in-up ${
                    food.status === 'avoid' ? 'border-tertiary-container/20' : food.status === 'moderate' ? 'border-outline-variant/30' : 'border-outline-variant/10'
                  }`}
                  style={{ animationDelay: `${Math.min(i * 0.05, 0.5)}s` }}
                >
                  <div className="flex justify-between items-start mb-4">
                    <span className={`px-3 py-1 font-bold rounded-full text-xs ${
                      food.status === 'avoid' ? 'bg-tertiary-container/10 text-tertiary' :
                      food.status === 'moderate' ? 'bg-secondary-container/10 text-secondary' :
                      'bg-primary-container/10 text-primary'
                    }`}>
                      {food.status === 'avoid' ? 'AVOID' : food.status === 'moderate' ? 'MODERATE' : 'GOOD'}
                    </span>
                    <span className="text-3xl">{food.image}</span>
                  </div>
                  <h4 className="text-xl font-bold mb-1">{food.name}</h4>
                  <p className="text-sm text-on-surface-variant mb-4 line-clamp-2">{food.description}</p>
                  <div className="flex items-center justify-between">
                    <div className={`flex items-center gap-2 text-xs font-bold bg-surface-container-low p-2 rounded-lg`}>
                      GI: {food.gi}
                    </div>
                    {food.calories && (
                      <span className="text-xs text-on-surface-variant">{food.calories} cal</span>
                    )}
                  </div>
                  {food.warning && (
                    <div className="mt-3 flex items-center gap-2 text-tertiary text-xs font-bold bg-tertiary-container/5 p-2 rounded-lg">
                      <span className="material-symbols-outlined text-sm">warning</span>
                      {food.warning}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        <section className="mb-20">
          <div className="mb-8">
            <span className="text-secondary font-bold tracking-widest uppercase text-sm block mb-2">Eat This, Not That</span>
            <h2 className="text-4xl font-extrabold font-headline">Smart Swaps</h2>
          </div>
          <div className="bg-surface-container-low rounded-xl p-8 md:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {foodSwaps.map((swap, i) => (
                  <div key={i} className="bg-surface-container-lowest p-5 rounded-lg border border-outline-variant/10">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <span className="text-xs font-bold text-error uppercase block">Instead of</span>
                        <span className="font-bold">{swap.from}</span>
                      </div>
                      <span className="material-symbols-outlined text-primary">trending_flat</span>
                      <div className="text-right">
                        <span className="text-xs font-bold text-primary uppercase block">Choose</span>
                        <span className="font-bold">{swap.to}</span>
                      </div>
                    </div>
                    <p className="text-xs text-on-surface-variant">{swap.benefit}</p>
                  </div>
                ))}
              </div>
              <div className="bg-surface-container-lowest p-8 rounded-xl shadow-sm border border-outline-variant/15">
                <h4 className="text-2xl font-bold mb-4 flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary">lightbulb</span>
                  Why Swap?
                </h4>
                <p className="text-on-surface-variant leading-relaxed mb-6 text-lg">
                  Whole grains contain the bran and germ, which are packed with fiber. Fiber slows down the digestion of starch into glucose—meaning smaller, more manageable rises in blood sugar.
                </p>
                <ul className="space-y-3">
                  {['Keeps you full for longer', 'Improves digestive health', 'Supports stable energy levels'].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-on-surface font-medium">
                      <span className="material-symbols-outlined text-primary text-sm mt-1">check</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <BottomNav />
    </>
  );
}
