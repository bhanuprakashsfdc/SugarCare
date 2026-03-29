'use client';

import Navbar from '@/components/Navbar';
import BottomNav from '@/components/BottomNav';
import Footer from '@/components/Footer';
import { weeklyMealPlan, foodSwaps } from '@/data/mockData';

export default function WeeklyPlanPage() {
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const todayName = dayNames[new Date().getDay()];

  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto px-6 py-12">
        <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 animate-fade-in-up">
          <div className="space-y-2">
            <span className="text-primary font-headline font-bold tracking-widest uppercase text-xs">Metabolic Optimization</span>
            <h1 className="text-4xl md:text-5xl font-headline font-extrabold text-on-surface tracking-tight">Your Weekly Plan</h1>
            <p className="text-on-surface-variant max-w-xl text-lg">
              A curated nutritional roadmap designed to keep your glucose levels stable while maximizing energy and satiety.
            </p>
          </div>
          <button className="signature-gradient text-white px-8 py-4 rounded-xl font-headline font-bold shadow-lg flex items-center gap-2 hover:opacity-90 active:scale-95 transition-all">
            <span className="material-symbols-outlined">download</span>
            Download Plan
          </button>
        </header>

        <div className="flex flex-wrap gap-4 mb-8 animate-fade-in-up-delay-1">
          <div className="flex items-center gap-2 px-4 py-2 bg-surface-container-low rounded-full">
            <span className="material-symbols-outlined text-primary text-sm filled">energy_savings_leaf</span>
            <span className="text-xs font-bold font-headline uppercase tracking-tighter">Low GI</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-surface-container-low rounded-full">
            <span className="material-symbols-outlined text-secondary text-sm filled">fitness_center</span>
            <span className="text-xs font-bold font-headline uppercase tracking-tighter">Protein Rich</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-surface-container-low rounded-full">
            <span className="material-symbols-outlined text-tertiary text-sm filled">nutrition</span>
            <span className="text-xs font-bold font-headline uppercase tracking-tighter">Fiber High</span>
          </div>
        </div>

        <div className="relative">
          <div className="overflow-x-auto hide-scrollbar -mx-6 px-6 pb-8">
            <div className="flex gap-6 w-max">
              {weeklyMealPlan.map((day, index) => {
                const isToday = day.day === todayName;
                return (
                  <div
                    key={day.day}
                    className={`w-80 bg-surface-container-lowest rounded-xl p-6 shadow-sm flex flex-col gap-6 transition-all animate-fade-in-up ${
                      isToday ? 'border-2 border-primary/20' : ''
                    }`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="border-b border-surface-container-high pb-4">
                      <div className="flex justify-between items-start">
                        <h2 className="font-headline font-extrabold text-2xl text-on-surface">{day.day}</h2>
                        {isToday && (
                          <span className="bg-primary text-white text-[10px] px-2 py-0.5 rounded uppercase font-bold">Today</span>
                        )}
                      </div>
                      <p className="text-label-md text-on-surface-variant font-medium">Focus: {day.focus}</p>
                    </div>
                    <div className="space-y-4">
                      {Object.entries(day.meals).map(([mealType, meal]) => (
                        <div key={mealType} className="space-y-2">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-outline">{mealType}</label>
                          <div className="bg-surface-container-low p-3 rounded-lg flex items-center justify-between">
                            <span className="text-sm font-semibold">{meal.name}</span>
                            <span className="material-symbols-outlined text-primary text-lg filled">{meal.icon}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-auto pt-4 bg-tertiary-container/10 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="material-symbols-outlined text-tertiary text-sm">swap_horiz</span>
                        <span className="text-[10px] font-bold uppercase text-tertiary">Swap Suggestion</span>
                      </div>
                      <p className="text-xs font-medium italic">{day.swap}</p>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-on-surface-variant">
                      <span className="material-symbols-outlined text-primary text-lg">directions_walk</span>
                      <span className="font-medium">{day.walkMins} min walk recommended</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="absolute right-0 top-0 bottom-8 w-16 bg-gradient-to-l from-surface to-transparent pointer-events-none md:hidden" />
        </div>

        <section className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 bg-surface-container-low rounded-xl p-8">
            <h3 className="font-headline font-extrabold text-2xl mb-6">Smart Swap Logic</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {foodSwaps.slice(0, 4).map((swap, i) => (
                <div key={i} className="bg-surface-container-lowest p-5 rounded-lg flex items-center gap-4 border border-outline-variant/10">
                  <div className="text-center w-1/2">
                    <span className="text-xs font-bold text-error uppercase block mb-1">Instead of</span>
                    <span className="font-bold text-sm">{swap.from}</span>
                  </div>
                  <span className="material-symbols-outlined text-primary">trending_flat</span>
                  <div className="text-center w-1/2">
                    <span className="text-xs font-bold text-primary uppercase block mb-1">Choose</span>
                    <span className="font-bold text-sm">{swap.to}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-primary rounded-xl p-8 text-white flex flex-col justify-between">
            <div>
              <h3 className="font-headline font-extrabold text-2xl mb-2">Plan Efficacy</h3>
              <p className="text-primary-fixed opacity-90 text-sm">Following this plan consistently can reduce post-meal spikes by up to 34%.</p>
            </div>
            <div className="mt-8 flex justify-center">
              <div className="relative w-32 h-32 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="64" cy="64" fill="transparent" r="58" stroke="currentColor" strokeWidth="8" className="text-on-primary/10" />
                  <circle cx="64" cy="64" fill="transparent" r="58" stroke="currentColor" strokeDasharray="364" strokeDashoffset="100" strokeLinecap="round" strokeWidth="12" className="text-primary-fixed" />
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="text-2xl font-extrabold">85%</span>
                  <span className="text-[10px] uppercase font-bold tracking-tighter">Match</span>
                </div>
              </div>
            </div>
            <p className="text-[10px] mt-4 uppercase font-bold tracking-widest text-center opacity-70">Alignment with your profile</p>
          </div>
        </section>
      </main>
      <Footer />
      <BottomNav />
    </>
  );
}
