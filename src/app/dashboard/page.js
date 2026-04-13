'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import BottomNav from '@/components/BottomNav';
import Footer from '@/components/Footer';
import AlertBanner from '@/components/AlertBanner';
import SugarInputForm from '@/components/SugarInputForm';
import HealthScoreCard from '@/components/HealthScoreCard';
import GlucoseChart from '@/components/GlucoseChart';
import EmergencyModal from '@/components/EmergencyModal';
import AnalyticsDashboard from '@/components/AnalyticsDashboard';
import { useSugar } from '@/context/SugarContext';
import { getSugarStatus } from '@/utils/helpers';
import Link from 'next/link';

export default function DashboardPage() {
  const { currentSugar, sugarHistory, projectionData, initialized } = useSugar();
  const [showInput, setShowInput] = useState(false);
  const [showEmergency, setShowEmergency] = useState(false);
  const status = getSugarStatus(currentSugar);

  if (!initialized) {
    return (
      <>
        <Navbar />
        <main className="max-w-7xl mx-auto px-6 py-8">
          <div className="min-h-[60vh] flex items-center justify-center">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-primary-container border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-on-surface-variant">Loading your health data...</p>
            </div>
          </div>
        </main>
        <BottomNav />
      </>
    );
  }

  const trendData = sugarHistory.slice(-14);
  const lastWeekAvg = sugarHistory.slice(-14, -7).reduce((a, b) => a + b.level, 0) / 7;
  const thisWeekAvg = sugarHistory.slice(-7).reduce((a, b) => a + b.level, 0) / 7;
  const trendPercent = lastWeekAvg > 0 ? Math.round(((thisWeekAvg - lastWeekAvg) / lastWeekAvg) * 100) : 0;

  return (
    <>
      <Navbar />
      {showEmergency && <EmergencyModal onClose={() => setShowEmergency(false)} />}
      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        <section className="flex flex-col md:flex-row md:items-end justify-between gap-4 animate-fade-in-up">
          <div>
            <h1 className="font-headline font-extrabold text-on-surface tracking-tight text-4xl md:text-5xl">
              Good {new Date().getHours() < 12 ? 'Morning' : new Date().getHours() < 17 ? 'Afternoon' : 'Evening'}
            </h1>
            <p className="text-on-surface-variant mt-2 font-medium">
              {currentSugar > 200 ? "Let's work on bringing your levels down." : 'Your metabolic health is trending positively today.'}
            </p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-primary-container/10 rounded-full">
            <div className="w-3 h-3 bg-primary rounded-full animate-pulse" />
            <span className="text-primary font-bold text-sm tracking-wide font-label">TRACKING ACTIVE</span>
          </div>
        </section>

        <AlertBanner />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 bg-surface-container-lowest p-8 rounded-xl shadow-[0_12px_40px_rgba(25,28,30,0.04)] flex flex-col justify-between min-h-[320px] animate-fade-in-up-delay-1">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-label-md font-bold text-on-surface-variant font-label tracking-widest uppercase">Current Glucose</span>
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="text-6xl md:text-8xl font-extrabold font-headline tracking-tighter text-on-surface">{currentSugar}</span>
                  <span className="text-xl font-bold text-on-surface-variant font-label">mg/dL</span>
                </div>
              </div>
              <div className={`px-6 py-2 rounded-full font-bold text-sm ${
                status.urgent ? 'bg-tertiary-container text-on-tertiary-container' : 'bg-primary-container text-on-primary-container'
              }`}>
                {status.label}
              </div>
            </div>
            <div className="mt-8">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm font-semibold text-on-surface-variant">14 Day Trend</span>
                <span className={`text-xs font-bold flex items-center gap-1 ${trendPercent < 0 ? 'text-primary' : 'text-tertiary'}`}>
                  <span className="material-symbols-outlined text-xs">{trendPercent < 0 ? 'trending_down' : 'trending_up'}</span>
                  {trendPercent > 0 ? '+' : ''}{trendPercent}% vs last week
                </span>
              </div>
              <GlucoseChart data={trendData} height={120} />
            </div>
          </div>

          <div className="lg:col-span-5 animate-fade-in-up-delay-2">
            <HealthScoreCard />
          </div>
        </div>

<section className="space-y-6 animate-fade-in-up-delay-2">
           <h2 className="text-2xl font-extrabold font-headline tracking-tight">Quick Actions</h2>
           <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
             <button
               onClick={() => setShowInput(!showInput)}
               className="group flex items-center justify-between p-6 bg-gradient-to-r from-primary to-primary-container text-white rounded-xl shadow-lg hover:opacity-90 transition-all scale-100 active:scale-95"
             >
               <div className="flex items-center gap-4">
                 <span className="material-symbols-outlined text-2xl">add_circle</span>
                 <span className="font-bold tracking-tight">Log Sugar</span>
               </div>
               <span className="material-symbols-outlined opacity-0 group-hover:opacity-100 transition-opacity">chevron_right</span>
             </button>
             <Link
               href="/food-guide"
               className="group flex items-center justify-between p-6 bg-surface-container-lowest border border-outline-variant/20 rounded-xl hover:bg-surface-container-low transition-all scale-100 active:scale-95"
             >
               <div className="flex items-center gap-4 text-on-surface">
                 <span className="material-symbols-outlined text-2xl text-secondary">restaurant</span>
                 <span className="font-bold tracking-tight">What should I eat now?</span>
               </div>
               <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary transition-colors">smart_toy</span>
             </Link>
             <Link
               href="/weekly-plan"
               className="group flex items-center justify-between p-6 bg-surface-container-lowest border border-outline-variant/20 rounded-xl hover:bg-surface-container-low transition-all scale-100 active:scale-95"
             >
               <div className="flex items-center gap-4 text-on-surface">
                 <span className="material-symbols-outlined text-2xl text-primary">calendar_today</span>
                 <span className="font-bold tracking-tight">View Weekly Plan</span>
               </div>
               <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary transition-colors">event_note</span>
             </Link>
             <Link
               href="/recipes"
               className="group flex items-center justify-between p-6 bg-surface-container-lowest border border-outline-variant/20 rounded-xl hover:bg-surface-container-low transition-all scale-100 active:scale-95"
             >
               <div className="flex items-center gap-4 text-on-surface">
                 <span className="material-symbols-outlined text-2xl text-primary">menu_book</span>
                 <span className="font-bold tracking-tight">Recipe Database</span>
               </div>
               <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary transition-colors">restaurant</span>
             </Link>
           </div>
         </section>

        {showInput && (
          <section className="max-w-md mx-auto">
            <SugarInputForm onClose={() => setShowInput(false)} />
          </section>
        )}

        <section className="relative overflow-hidden rounded-xl bg-slate-900 p-8 text-white animate-fade-in-up-delay-3">
          <div className="relative z-10 max-w-2xl">
            <span className="text-primary-fixed-dim font-bold tracking-[0.2em] text-xs font-label uppercase">Smart Insights</span>
            <h3 className="text-2xl md:text-3xl font-bold font-headline mt-2 mb-4 leading-tight">
              {currentSugar > 200
                ? 'Your glucose levels are elevated. Focus on low-GI foods and regular walking.'
                : 'Your glucose spikes 15% more on mornings you skip protein.'}
            </h3>
            <p className="text-slate-400 mb-6">
              {currentSugar > 200
                ? 'We\'ve adjusted your meal recommendations to prioritize fiber-rich, low-glycemic foods.'
                : 'We\'ve adjusted your breakfast recommendations for tomorrow to include high-fiber options.'}
            </p>
            <Link href="/weekly-plan" className="inline-flex items-center gap-2 text-primary-fixed-dim font-bold hover:underline">
              Read the full analysis
              <span className="material-symbols-outlined">arrow_forward</span>
            </Link>
          </div>
        </section>

        <section className="bg-surface-container-lowest p-8 rounded-xl shadow-sm animate-fade-in-up-delay-3">
          <h3 className="font-headline font-extrabold text-2xl mb-6">Projected Improvement</h3>
          <p className="text-on-surface-variant mb-6">Based on your current plan adherence, here&apos;s your 30-day projection.</p>
          <GlucoseChart data={projectionData} height={180} />
          <div className="mt-6 grid grid-cols-3 gap-4 text-center">
            <div className="bg-surface-container-low p-4 rounded-lg">
              <p className="text-xs font-bold uppercase tracking-widest text-outline">Day 7</p>
              <p className="text-2xl font-extrabold font-headline text-primary">{projectionData[7]?.level || '—'}</p>
            </div>
            <div className="bg-surface-container-low p-4 rounded-lg">
              <p className="text-xs font-bold uppercase tracking-widest text-outline">Day 14</p>
              <p className="text-2xl font-extrabold font-headline text-primary">{projectionData[14]?.level || '—'}</p>
            </div>
            <div className="bg-surface-container-low p-4 rounded-lg">
              <p className="text-xs font-bold uppercase tracking-widest text-outline">Day 30</p>
              <p className="text-2xl font-extrabold font-headline text-primary">{projectionData[30]?.level || '—'}</p>
            </div>
          </div>
        </section>

        <section className="animate-fade-in-up-delay-3">
          <h3 className="font-headline font-extrabold text-2xl mb-6">Advanced Analytics</h3>
          <AnalyticsDashboard />
        </section>
      </main>
      <Footer />
      <BottomNav />
    </>
  );
}
