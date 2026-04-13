'use client';

import { memo } from 'react';
import { useTimer } from '@/hooks/useTimer';

function TimerWidget({ duration = 300, stepId }) {
  const { formatted, active, progress, start, stop, reset } = useTimer(duration);

  return (
    <div className="bg-surface-container-lowest rounded-xl p-6 shadow-sm border border-surface-container-high">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">timer</span>
          <h4 className="font-headline font-bold text-on-surface">Step Timer</h4>
        </div>
        {active && (
          <span className="pulse-glow w-3 h-3 rounded-full bg-primary" aria-label="Timer running" />
        )}
      </div>

      <div className="text-center mb-4">
        <span className="text-5xl font-headline font-extrabold text-on-surface tabular-nums" aria-live="polite">
          {formatted}
        </span>
      </div>

      <div className="w-full bg-surface-container-high rounded-full h-2 mb-4">
        <div
          className="bg-primary h-2 rounded-full transition-all duration-1000"
          style={{ width: `${progress}%` }}
          role="progressbar"
          aria-valuenow={Math.round(progress)}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>

      <div className="flex justify-center gap-3">
        {!active ? (
          <button
            onClick={() => start(duration)}
            className="px-6 py-2.5 bg-primary text-white rounded-xl font-bold text-sm shadow-md hover:opacity-90 active:scale-95 transition-all flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-lg">play_arrow</span>
            Start Timer
          </button>
        ) : (
          <button
            onClick={stop}
            className="px-6 py-2.5 bg-error text-white rounded-xl font-bold text-sm shadow-md hover:opacity-90 active:scale-95 transition-all flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-lg">stop</span>
            Stop
          </button>
        )}
        <button
          onClick={() => reset(duration)}
          className="px-4 py-2.5 bg-surface-container-low text-on-surface-variant rounded-xl font-bold text-sm hover:bg-surface-container transition-all flex items-center gap-2"
        >
          <span className="material-symbols-outlined text-lg">refresh</span>
          Reset
        </button>
      </div>
    </div>
  );
}

export default memo(TimerWidget);
