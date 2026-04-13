'use client';

import { useEffect } from 'react';
import { usePreparation } from '@/context/PreparationContext';

export default function ToastContainer() {
  const { state, dispatch } = usePreparation();

  if (!state.toasts.length) return null;

  return (
    <div className="fixed bottom-20 md:bottom-6 left-1/2 -translate-x-1/2 z-50 flex flex-col gap-2" role="status" aria-live="polite">
      {state.toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} dispatch={dispatch} />
      ))}
    </div>
  );
}

function ToastItem({ toast, dispatch }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch({ type: 'REMOVE_TOAST', payload: toast.id });
    }, 3000);
    return () => clearTimeout(timer);
  }, [toast.id, dispatch]);

  const bgClass = toast.type === 'success' ? 'bg-primary text-white'
    : toast.type === 'error' ? 'bg-error text-white'
    : 'bg-surface-container-highest text-on-surface';

  return (
    <div className={`${bgClass} px-6 py-3 rounded-xl shadow-lg font-bold text-sm flex items-center gap-2 animate-fade-in-up`}>
      <span className="material-symbols-outlined text-lg">
        {toast.type === 'success' ? 'check_circle' : toast.type === 'error' ? 'error' : 'info'}
      </span>
      {toast.message}
    </div>
  );
}
