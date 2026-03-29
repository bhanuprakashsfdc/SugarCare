'use client';

import { useSugar } from '@/context/SugarContext';
import { getSugarStatus } from '@/utils/helpers';
import Link from 'next/link';

export default function AlertBanner() {
  const { currentSugar } = useSugar();
  const status = getSugarStatus(currentSugar);

  if (!status.urgent) return null;

  const isCritical = currentSugar > 350;

  return (
    <div className={`rounded-xl p-4 md:p-6 flex flex-col md:flex-row md:items-center gap-4 shadow-sm border-l-8 animate-fade-in-up ${
      isCritical ? 'bg-error-container border-error' : 'bg-tertiary-container border-tertiary'
    }`}>
      <div className="flex items-start gap-4 flex-1">
        <span className={`material-symbols-outlined text-3xl filled shrink-0 ${isCritical ? 'text-error' : 'text-tertiary'}`}>
          {isCritical ? 'emergency' : 'warning'}
        </span>
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-lg leading-tight font-headline">
            {isCritical ? 'Emergency: Critical Sugar Level' : 'High Sugar Alert'}
          </h3>
          <p className="text-sm opacity-90 mt-1">
            Your last reading was {currentSugar} mg/dL.{' '}
            {isCritical
              ? 'Please consult a doctor immediately.'
              : 'Follow your high-glucose protocol and stay hydrated.'}
          </p>
        </div>
      </div>
      <Link
        href={isCritical ? '/emergency' : '/food-guide'}
        className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap text-center ${
          isCritical
            ? 'bg-error text-on-error'
            : 'bg-tertiary text-on-tertiary'
        }`}
      >
        {isCritical ? 'Emergency Steps' : 'Action Plan'}
      </Link>
    </div>
  );
}
