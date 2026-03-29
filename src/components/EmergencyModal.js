'use client';

import { useSugar } from '@/context/SugarContext';

export default function EmergencyModal({ onClose }) {
  const { currentSugar } = useSugar();

  const steps = [
    { icon: 'water_drop', title: 'Drink water immediately', desc: 'Stay hydrated to help your kidneys flush out excess sugar. Drink 2-3 glasses right now.' },
    { icon: 'directions_walk', title: 'Light walking (10 min)', desc: 'A gentle stroll can help lower glucose levels safely. Avoid intense exercise.' },
    { icon: 'block', title: 'Avoid all carbs right now', desc: 'No sugars, rice, bread, or fruits until levels stabilize below 200 mg/dL.' },
    { icon: 'medication', title: 'Take prescribed medication', desc: 'If your doctor has prescribed insulin or tablets for high sugar, take as directed.' },
    { icon: 'call', title: 'Call your doctor if >350', desc: 'If sugar stays above 350 mg/dL for more than 2 hours, seek medical help immediately.' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-on-surface/20 backdrop-blur-sm">
      <div className="w-full max-w-2xl bg-surface-container-lowest rounded-xl shadow-2xl overflow-hidden animate-fade-in-up max-h-[90vh] overflow-y-auto">
        <div className="bg-tertiary-container p-8 md:p-12 text-on-tertiary-container relative overflow-hidden">
          <div className="absolute -right-8 -top-8 opacity-10">
            <span className="material-symbols-outlined text-[160px] filled">warning</span>
          </div>
          <div className="relative z-10 flex items-start gap-6">
            <div className="bg-surface-container-lowest/30 p-4 rounded-full flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-4xl filled">emergency</span>
            </div>
            <div>
              <p className="font-headline font-extrabold text-4xl mb-2 tracking-tight">{currentSugar} mg/dL</p>
              <h1 className="font-headline font-bold text-2xl">High Blood Sugar Detected</h1>
            </div>
          </div>
        </div>

        <div className="p-8 md:p-12 space-y-8">
          <h2 className="text-xl font-bold font-headline text-on-surface">Immediate Actions to Take:</h2>
          <div className="grid gap-4">
            {steps.map((step, i) => (
              <div key={i} className="flex items-center gap-6 p-5 bg-surface-container-low rounded-lg">
                <div className="bg-surface-container-lowest text-primary p-3 rounded-full flex items-center justify-center shadow-sm shrink-0">
                  <span className="material-symbols-outlined text-2xl">{step.icon}</span>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-on-surface">{step.title}</h3>
                  <p className="text-on-surface-variant text-sm">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={onClose}
              className="flex-1 h-14 signature-gradient text-on-primary rounded-xl font-headline font-bold text-lg shadow-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined">check</span>
              Got It
            </button>
            <a
              href="tel:108"
              className="flex-1 h-14 bg-surface-container-high text-on-surface rounded-xl font-headline font-bold text-lg hover:bg-surface-container-highest transition-colors flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined">call</span>
              Call 108
            </a>
          </div>

          <p className="text-center text-sm font-label text-outline leading-relaxed">
            This alert is for informational purposes only. If you experience vomiting, confusion, or difficulty breathing, call emergency services immediately.
          </p>
        </div>
      </div>
    </div>
  );
}
