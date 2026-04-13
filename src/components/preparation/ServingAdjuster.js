'use client';

import { memo } from 'react';

function ServingAdjuster({ servings, onChange }) {
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => onChange(servings - 1)}
        disabled={servings <= 1}
        className="w-8 h-8 rounded-lg bg-surface-container-low flex items-center justify-center text-on-surface-variant hover:bg-surface-container transition-all disabled:opacity-30"
        aria-label="Decrease servings"
      >
        <span className="material-symbols-outlined text-lg">remove</span>
      </button>
      <span className="text-sm font-bold text-on-surface w-16 text-center" aria-live="polite">
        {servings} serving{servings > 1 ? 's' : ''}
      </span>
      <button
        onClick={() => onChange(servings + 1)}
        disabled={servings >= 10}
        className="w-8 h-8 rounded-lg bg-surface-container-low flex items-center justify-center text-on-surface-variant hover:bg-surface-container transition-all disabled:opacity-30"
        aria-label="Increase servings"
      >
        <span className="material-symbols-outlined text-lg">add</span>
      </button>
    </div>
  );
}

export default memo(ServingAdjuster);
