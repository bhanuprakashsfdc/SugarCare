'use client';

import Navbar from '@/components/Navbar';
import BottomNav from '@/components/BottomNav';
import { emergencySteps } from '@/data/mockData';
import Link from 'next/link';

export default function EmergencyPage() {
  return (
    <>
      <Navbar />
      <main className="max-w-3xl mx-auto px-6 py-12">
        <div className="bg-tertiary-container p-8 md:p-12 text-on-tertiary-container rounded-xl relative overflow-hidden mb-8 animate-fade-in-up">
          <div className="absolute -right-8 -top-8 opacity-10">
            <span className="material-symbols-outlined text-[160px] filled">warning</span>
          </div>
          <div className="relative z-10 flex items-start gap-6">
            <div className="bg-surface-container-lowest/30 p-4 rounded-full flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-4xl filled">emergency</span>
            </div>
            <div>
              <p className="font-headline font-extrabold text-4xl mb-2 tracking-tight">Emergency Mode</p>
              <h1 className="font-headline font-bold text-2xl">High Blood Sugar Protocol</h1>
              <p className="mt-2 text-sm opacity-80">Follow these steps immediately if your sugar is above 300 mg/dL</p>
            </div>
          </div>
        </div>

        <div className="space-y-4 mb-12">
          {emergencySteps.map((step, i) => (
            <div
              key={i}
              className="flex items-center gap-6 p-6 bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/10 animate-fade-in-up"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="bg-surface-container-low text-primary p-3 rounded-full flex items-center justify-center shadow-sm shrink-0 w-14 h-14">
                <span className="material-symbols-outlined text-2xl">{step.icon}</span>
              </div>
              <div>
                <h3 className="font-bold text-lg text-on-surface font-headline">{step.title}</h3>
                <p className="text-on-surface-variant text-sm">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-error-container p-6 rounded-xl border-l-8 border-error mb-8">
          <h3 className="font-bold text-lg text-on-error-container font-headline mb-2">When to Call Emergency Services</h3>
          <ul className="space-y-2 text-on-error-container text-sm">
            <li className="flex items-start gap-2">
              <span className="material-symbols-outlined text-sm mt-0.5">arrow_right</span>
              Blood sugar stays above 400 mg/dL for more than 1 hour
            </li>
            <li className="flex items-start gap-2">
              <span className="material-symbols-outlined text-sm mt-0.5">arrow_right</span>
              You experience vomiting, confusion, or difficulty breathing
            </li>
            <li className="flex items-start gap-2">
              <span className="material-symbols-outlined text-sm mt-0.5">arrow_right</span>
              You feel chest pain or extreme drowsiness
            </li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/dashboard"
            className="flex-1 h-14 signature-gradient text-on-primary rounded-xl font-headline font-bold text-lg shadow-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined">arrow_back</span>
            Back to Dashboard
          </Link>
          <a
            href="tel:108"
            className="flex-1 h-14 bg-surface-container-high text-on-surface rounded-xl font-headline font-bold text-lg hover:bg-surface-container-highest transition-colors flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined">call</span>
            Call 108 (Emergency)
          </a>
        </div>

        <p className="text-center text-sm font-label text-outline leading-relaxed mt-8">
          This information is for educational purposes only. Always follow your doctor&apos;s specific instructions for managing high blood sugar.
        </p>
      </main>
      <BottomNav />
    </>
  );
}
