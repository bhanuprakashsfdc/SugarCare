'use client';

import { useState } from 'react';
import { useSugar } from '@/context/SugarContext';

export default function SugarInputForm({ onClose }) {
  const { logSugar } = useSugar();
  const [value, setValue] = useState('');
  const [readingType, setReadingType] = useState('fasting');
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const level = parseInt(value);
    if (level >= 30 && level <= 600) {
      logSugar(level);
      setSaved(true);
      setTimeout(() => {
        if (onClose) onClose();
      }, 1500);
    }
  };

  if (saved) {
    return (
      <div className="bg-surface-container-lowest p-8 rounded-xl shadow-lg text-center animate-fade-in-up">
        <div className="w-16 h-16 mx-auto mb-4 bg-primary-container/20 rounded-full flex items-center justify-center">
          <span className="material-symbols-outlined text-primary text-4xl filled">check_circle</span>
        </div>
        <h3 className="font-headline font-bold text-xl mb-2">Reading Logged!</h3>
        <p className="text-on-surface-variant">{value} mg/dL saved successfully.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-surface-container-lowest p-8 rounded-xl shadow-lg animate-fade-in-up">
      <h3 className="font-headline font-bold text-2xl mb-6">Log Sugar Reading</h3>

      <div className="mb-6">
        <label className="text-xs font-bold uppercase tracking-widest text-outline block mb-3">Reading Type</label>
        <div className="flex gap-3">
          {['fasting', 'post-meal', 'random'].map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setReadingType(type)}
              className={`px-4 py-2 rounded-lg text-sm font-bold capitalize transition-all ${
                readingType === type
                  ? 'bg-primary text-on-primary'
                  : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high'
              }`}
            >
              {type.replace('-', ' ')}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <label className="text-xs font-bold uppercase tracking-widest text-outline block mb-3">Blood Sugar Level (mg/dL)</label>
        <div className="relative">
          <input
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="e.g. 120"
            min="30"
            max="600"
            required
            className="w-full h-16 px-6 bg-surface-container-high border-none rounded-xl text-2xl font-headline font-bold text-center focus:ring-4 focus:ring-primary-container/20 transition-all outline-none"
          />
          <span className="absolute right-6 top-1/2 -translate-y-1/2 text-on-surface-variant font-label text-sm">mg/dL</span>
        </div>
      </div>

      <button
        type="submit"
        className="w-full h-14 signature-gradient text-on-primary font-headline font-bold rounded-xl shadow-lg hover:opacity-90 active:scale-95 transition-all flex items-center justify-center gap-2"
      >
        <span className="material-symbols-outlined">add_circle</span>
        Log Reading
      </button>
    </form>
  );
}
