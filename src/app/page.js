'use client';

import Link from 'next/link';
import Navbar from '@/components/Navbar';
import BottomNav from '@/components/BottomNav';
import Footer from '@/components/Footer';
import { useSugar } from '@/context/SugarContext';
import { getSugarStatus } from '@/utils/helpers';

export default function LandingPage() {
  const { currentSugar } = useSugar();
  const status = getSugarStatus(currentSugar);

  return (
    <>
      <Navbar />
      <main>
        <section className="relative overflow-hidden pt-16 pb-24 md:pt-24 md:pb-32 px-6">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="z-10 animate-fade-in-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-container/10 text-primary font-semibold text-sm mb-6">
                <span className="material-symbols-outlined text-sm filled">verified</span>
                <span>Doctor-guided approach</span>
              </div>
              <h1 className="font-headline font-extrabold text-5xl md:text-7xl text-on-surface tracking-tight leading-[1.1] mb-8">
                Reduce Blood Sugar <span className="text-primary-container">Naturally</span>
              </h1>
              <p className="font-body text-xl text-on-surface-variant leading-relaxed mb-10 max-w-lg">
                Track, plan, and improve your health with science-backed habits designed to stabilize your metabolic health.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/dashboard"
                  className="signature-gradient text-white font-bold h-16 px-10 rounded-xl shadow-lg hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  Start Free Plan
                  <span className="material-symbols-outlined">arrow_forward</span>
                </Link>
                <Link
                  href="/weekly-plan"
                  className="bg-surface-container-lowest border border-outline-variant/30 text-on-surface font-bold h-16 px-10 rounded-xl hover:bg-surface-container-low transition-colors flex items-center justify-center"
                >
                  Check My Sugar Plan
                </Link>
              </div>
              <div className="mt-12 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6 text-on-surface-variant">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary filled text-lg">science</span>
                  <span className="text-sm font-medium">Based on nutrition science</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary filled text-lg">security</span>
                  <span className="text-sm font-medium">Data stays local</span>
                </div>
              </div>
            </div>
            <div className="relative animate-fade-in-up-delay-1">
              <div className="absolute inset-0 bg-primary-container/5 rounded-full blur-3xl -z-10 transform scale-150" />
              <div className="relative asymmetric-shape overflow-hidden bg-surface-container-low aspect-square shadow-2xl border-8 border-surface-container-lowest flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-32 h-32 mx-auto mb-6 bg-primary-container/10 rounded-full flex items-center justify-center">
                    <span className="material-symbols-outlined text-6xl text-primary filled">favorite</span>
                  </div>
                  <p className="text-on-surface-variant text-lg font-medium">Your health journey starts here</p>
                </div>
                <div className="absolute bottom-8 left-8 bg-surface-container-lowest/90 backdrop-blur-md p-6 rounded-xl shadow-xl border border-white/20">
                  <p className="text-label-md font-semibold text-on-surface-variant mb-1 uppercase tracking-wider">Current Level</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-headline font-extrabold text-primary">{currentSugar}</span>
                    <span className="text-on-surface-variant font-medium">mg/dL</span>
                  </div>
                  <div className={`mt-2 inline-flex items-center px-2 py-1 rounded bg-primary-container/20 text-on-primary-container text-xs font-bold`}>
                    {status.label.toUpperCase()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 px-6 bg-surface-container-low">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-headline font-bold text-4xl text-on-surface mb-4">Precision Tools for Better Health</h2>
              <p className="text-on-surface-variant max-w-2xl mx-auto">Everything you need to manage your levels without the guesswork.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              <div className="md:col-span-8 bg-surface-container-lowest p-10 rounded-xl flex flex-col justify-between shadow-sm group hover:shadow-md transition-shadow">
                <div>
                  <span className="material-symbols-outlined text-primary text-4xl mb-6">ads_click</span>
                  <h3 className="font-headline font-bold text-2xl mb-4">Sugar Tracker</h3>
                  <p className="text-on-surface-variant text-lg max-w-md">Real-time data visualization of your levels with smart trend analysis and pattern recognition.</p>
                </div>
                <div className="mt-12 h-32 w-full bg-surface-container-low rounded-lg relative overflow-hidden">
                  <svg className="w-full h-full" viewBox="0 0 400 100">
                    <path d="M0,80 Q50,20 100,50 T200,30 T300,70 T400,40" fill="none" stroke="#22c55e" strokeLinecap="round" strokeWidth="4" />
                    <path d="M0,80 Q50,20 100,50 T200,30 T300,70 T400,40 L400,100 L0,100 Z" fill="url(#grad1)" opacity="0.1" />
                    <defs>
                      <linearGradient id="grad1" x1="0%" x2="0%" y1="0%" y2="100%">
                        <stop offset="0%" stopColor="#22c55e" stopOpacity="1" />
                        <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>

              <div className="md:col-span-4 bg-primary text-on-primary p-10 rounded-xl shadow-lg relative overflow-hidden">
                <span className="material-symbols-outlined text-4xl mb-6">restaurant</span>
                <h3 className="font-headline font-bold text-2xl mb-4">Weekly Meal Plan</h3>
                <p className="text-primary-fixed-dim/90 mb-8">Curated recipes specifically tailored to your glycemic index profile.</p>
                <div className="flex gap-3">
                  {['🌾', '🥗', '🥦'].map((emoji, i) => (
                    <div key={i} className="w-12 h-12 rounded-full border-2 border-primary flex items-center justify-center bg-on-primary/10 text-xl">
                      {emoji}
                    </div>
                  ))}
                  <div className="w-12 h-12 rounded-full border-2 border-primary flex items-center justify-center bg-primary-container text-xs font-bold">+12</div>
                </div>
              </div>

              <div className="md:col-span-5 bg-surface-container-lowest p-10 rounded-xl shadow-sm">
                <span className="material-symbols-outlined text-secondary text-4xl mb-6">psychology</span>
                <h3 className="font-headline font-bold text-2xl mb-4">Habit Coaching</h3>
                <p className="text-on-surface-variant">Gentle nudges and behavioral science techniques to help you stick to your goals long-term.</p>
              </div>

              <div className="md:col-span-7 bg-tertiary-container/10 p-10 rounded-xl border border-tertiary-container/20 flex items-center gap-8">
                <div className="bg-tertiary-container/30 w-16 h-16 rounded-full flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-tertiary text-3xl">warning</span>
                </div>
                <div>
                  <h3 className="font-headline font-bold text-2xl mb-2">Risk Alerts</h3>
                  <p className="text-on-surface-variant">Smart alerts when your levels spike, giving you time to adjust your activity and diet.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 px-6 bg-surface">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 relative">
              <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-outline-variant/20 -z-10" />
              {[
                { num: '01', title: 'Enter sugar level', desc: 'Log your daily readings to build your personalized health profile.' },
                { num: '02', title: 'Get plan', desc: 'Receive a personalized nutrition and activity roadmap based on your unique data.' },
                { num: '03', title: 'Improve weekly', desc: 'Watch your averages drop and energy levels rise with sustainable adjustments.' },
              ].map((step, i) => (
                <div key={i} className="flex flex-col items-center text-center">
                  <div className="w-20 h-20 rounded-full bg-surface-container-lowest shadow-xl flex items-center justify-center mb-8 border-4 border-surface">
                    <span className="text-2xl font-black text-primary">{step.num}</span>
                  </div>
                  <h3 className="font-headline font-bold text-xl mb-4">{step.title}</h3>
                  <p className="text-on-surface-variant px-4">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 px-6">
          <div className="max-w-5xl mx-auto signature-gradient rounded-xl p-12 md:p-20 text-center text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl" />
            <div className="relative z-10">
              <h2 className="font-headline font-extrabold text-4xl md:text-5xl mb-6">Ready to take control?</h2>
              <p className="text-xl opacity-90 mb-12 max-w-xl mx-auto">Start your journey toward better metabolic health today.</p>
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 bg-white text-primary font-bold h-16 px-12 rounded-xl text-lg hover:bg-surface-bright transition-colors shadow-xl"
              >
                Claim My Free Plan
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <BottomNav />
    </>
  );
}
