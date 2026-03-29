'use client';

import { useSugar } from '@/context/SugarContext';
import { getSugarStatus } from '@/utils/helpers';

export default function HealthScoreCard() {
  const { currentSugar, healthScore, streak } = useSugar();
  const status = getSugarStatus(currentSugar);
  const circumference = 2 * Math.PI * 34;
  const offset = circumference - (healthScore / 100) * circumference;

  return (
    <div className="grid grid-cols-1 gap-6">
      <div className="bg-surface-container-low p-6 rounded-xl flex items-center gap-6">
        <div className="relative w-20 h-20 flex items-center justify-center shrink-0">
          <svg className="w-full h-full -rotate-90">
            <circle cx="40" cy="40" fill="transparent" r="34" stroke="currentColor" strokeWidth="8" className="text-surface-container-highest" />
            <circle
              cx="40" cy="40" fill="transparent" r="34"
              stroke="currentColor"
              strokeWidth="8"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round"
              className="text-primary transition-all duration-1000"
            />
          </svg>
          <span className="absolute font-extrabold text-xl font-headline">{healthScore}</span>
        </div>
        <div>
          <h4 className="font-bold text-on-surface">Health Score</h4>
          <p className="text-sm text-on-surface-variant font-medium">
            {healthScore >= 80 ? 'Excellent progress!' : healthScore >= 60 ? 'Good, keep going!' : 'Room for improvement'}
          </p>
        </div>
      </div>

      <div className="bg-surface-container-lowest p-6 rounded-xl flex items-center gap-6 border border-outline-variant/15">
        <div className="bg-tertiary-fixed w-14 h-14 rounded-full flex items-center justify-center text-tertiary shrink-0">
          <span className="material-symbols-outlined text-3xl filled">local_fire_department</span>
        </div>
        <div>
          <h4 className="font-bold text-on-surface">{streak} Day Streak</h4>
          <p className="text-sm text-on-surface-variant font-medium">Following your plan</p>
        </div>
      </div>

      <div className="bg-surface-container-lowest p-6 rounded-xl flex items-center gap-6 border border-outline-variant/15">
        <div className={`w-14 h-14 rounded-full flex items-center justify-center shrink-0 ${
          status.urgent ? 'bg-tertiary-container/30' : 'bg-primary-container/20'
        }`}>
          <span className={`material-symbols-outlined text-2xl filled ${status.urgent ? 'text-tertiary' : 'text-primary'}`}>
            {status.urgent ? 'warning' : 'check_circle'}
          </span>
        </div>
        <div>
          <h4 className="font-bold text-on-surface">{currentSugar} mg/dL</h4>
          <p className={`text-sm font-medium ${status.urgent ? 'text-tertiary' : 'text-primary'}`}>{status.label}</p>
        </div>
      </div>
    </div>
  );
}
