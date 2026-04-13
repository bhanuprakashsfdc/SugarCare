'use client';

import { memo } from 'react';

function UnitConverter({ unitSystem, onToggle }) {
  return (
    <button
      onClick={onToggle}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container-low text-xs font-bold text-on-surface-variant hover:bg-surface-container transition-all"
      aria-label={`Switch to ${unitSystem === 'imperial' ? 'metric' : 'imperial'} units`}
    >
      <span className="material-symbols-outlined text-sm">swap_horiz</span>
      {unitSystem === 'imperial' ? 'Imperial' : 'Metric'}
    </button>
  );
}

export default memo(UnitConverter);
