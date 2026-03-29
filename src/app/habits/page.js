'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import BottomNav from '@/components/BottomNav';
import Footer from '@/components/Footer';
import { useSugar } from '@/context/SugarContext';
import { dailyNudges } from '@/data/mockData';

export default function HabitsPage() {
  const { habitsList, toggleHabit, streak, habitsCompleted, resetHabits } = useSugar();
  const [nudge, setNudge] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setNudge(dailyNudges[Math.floor(Math.random() * dailyNudges.length)]);
    setMounted(true);
  }, []);

  const completionPercent = habitsList.length > 0
    ? Math.round((habitsCompleted / habitsList.length) * 100)
    : 0;
  const circumference = 2 * Math.PI * 88;
  const offset = circumference - (completionPercent / 100) * circumference;

  const colorMap = {
    primary: { bg: 'bg-primary/10', text: 'text-primary', toggle: 'peer-checked:bg-primary-container' },
    secondary: { bg: 'bg-secondary-container/30', text: 'text-secondary', toggle: 'peer-checked:bg-secondary-container' },
    tertiary: { bg: 'bg-tertiary-container/20', text: 'text-tertiary', toggle: 'peer-checked:bg-tertiary-container' },
  };

  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto px-6 pt-12 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-12 animate-fade-in-up">
          <div className="md:col-span-4 bg-surface-container-lowest rounded-xl p-8 shadow-[0_12px_40px_rgba(25,28,30,0.06)] flex flex-col items-center justify-center text-center">
            <div className="relative w-48 h-48 flex items-center justify-center mb-6">
              <svg className="w-full h-full transform -rotate-90" aria-hidden="true">
                <circle cx="96" cy="96" fill="transparent" r="88" stroke="currentColor" strokeWidth="12" className="text-surface-container" />
                <circle
                  cx="96" cy="96" fill="transparent" r="88"
                  stroke="currentColor"
                  strokeDasharray={circumference}
                  strokeDashoffset={offset}
                  strokeLinecap="round"
                  strokeWidth="12"
                  className="text-primary-container transition-all duration-1000"
                />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-4xl font-extrabold font-headline">{completionPercent}%</span>
                <span className="text-xs font-label uppercase tracking-widest text-outline">Complete</span>
              </div>
            </div>
            <h2 className="text-xl font-headline font-bold mb-2">
              {completionPercent >= 80 ? "You're doing amazing!" : completionPercent >= 50 ? "Keep pushing!" : "Every step counts"}
            </h2>
            <p className="text-sm text-on-surface-variant leading-relaxed">Consistency is key to metabolic health.</p>
          </div>

          <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-primary-container text-on-primary-container rounded-xl p-8 flex flex-col justify-between overflow-hidden relative">
              <div className="z-10">
                <span className="inline-flex items-center px-3 py-1 bg-on-primary-container/10 rounded-full text-xs font-bold uppercase tracking-widest mb-4">Current Streak</span>
                <div className="text-6xl font-extrabold font-headline mb-2">{streak}</div>
                <p className="text-lg font-bold">Days of consistency</p>
              </div>
              <span className="material-symbols-outlined absolute -bottom-4 -right-4 text-[12rem] opacity-10 pointer-events-none filled" aria-hidden="true">local_fire_department</span>
            </div>
            <div className="bg-surface-container-low rounded-xl p-8 flex flex-col justify-center">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-secondary-container flex items-center justify-center">
                  <span className="material-symbols-outlined text-on-secondary-container" aria-hidden="true">psychology</span>
                </div>
                <h3 className="text-lg font-bold font-headline leading-tight">Daily Nudge</h3>
              </div>
              <p className="text-on-surface-variant italic leading-relaxed">
                {mounted ? `\u201C${nudge}\u201D` : '\u201CLoading...\u201D'}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-6 max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-8 animate-fade-in-up-delay-1">
            <h2 className="text-2xl font-extrabold font-headline tracking-tight">Daily Habits Checklist</h2>
            <div className="flex items-center gap-4">
              <span className="text-sm font-label text-outline">
                {habitsCompleted}/{habitsList.length} done
              </span>
              {habitsCompleted > 0 && (
                <button
                  onClick={resetHabits}
                  className="text-xs font-bold text-tertiary hover:underline"
                  aria-label="Reset all habits"
                >
                  Reset
                </button>
              )}
            </div>
          </div>

          {habitsList.map((habit, i) => {
            const colors = colorMap[habit.color] || colorMap.primary;

            return (
              <div
                key={habit.id}
                className={`group bg-surface-container-lowest rounded-lg p-6 flex items-center justify-between transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] animate-fade-in-up ${
                  habit.checked ? 'opacity-70' : ''
                }`}
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <div className="flex items-center space-x-5">
                  <div className={`w-14 h-14 rounded-xl ${colors.bg} flex items-center justify-center ${colors.text} group-hover:scale-110 transition-transform`}>
                    <span className="material-symbols-outlined text-2xl filled" aria-hidden="true">{habit.icon}</span>
                  </div>
                  <div>
                    <h4 className={`text-lg font-bold font-headline text-on-surface ${habit.checked ? 'line-through opacity-50' : ''}`}>
                      {habit.name}
                    </h4>
                    <p className="text-sm text-on-surface-variant">{habit.description}</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={habit.checked}
                    onChange={() => toggleHabit(habit.id)}
                    className="sr-only peer"
                    aria-label={habit.name}
                  />
                  <div className={`w-14 h-8 bg-surface-container-highest rounded-full peer peer-checked:after:translate-x-full after:absolute after:top-[4px] after:left-[4px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all ${colors.toggle}`} />
                </label>
              </div>
            );
          })}

          <div className="rounded-xl overflow-hidden mt-12 h-48 relative">
            <div className="w-full h-full bg-gradient-to-br from-primary/20 via-primary-container/10 to-secondary-container/20 flex items-center justify-center">
              <div className="text-center p-8">
                <span className="material-symbols-outlined text-5xl text-primary mb-4 block filled" aria-hidden="true">spa</span>
                <p className="text-on-surface text-xl font-bold font-headline">Small steps lead to massive results.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <BottomNav />
    </>
  );
}
