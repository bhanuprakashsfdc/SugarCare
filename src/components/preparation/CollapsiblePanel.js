'use client';

import { memo, useState } from 'react';

function CollapsiblePanel({ title, icon, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-4 hover:bg-surface-container-low transition-all"
        aria-expanded={open}
      >
        <div className="flex items-center gap-2">
          {icon && <span className="material-symbols-outlined text-primary text-lg">{icon}</span>}
          <h3 className="font-headline font-bold text-on-surface">{title}</h3>
        </div>
        <span className={`material-symbols-outlined text-on-surface-variant transition-transform ${open ? 'rotate-180' : ''}`}>
          expand_more
        </span>
      </button>
      {open && (
        <div className="px-4 pb-4 border-t border-surface-container-high">
          <div className="pt-4">
            {children}
          </div>
        </div>
      )}
    </div>
  );
}

export default memo(CollapsiblePanel);
