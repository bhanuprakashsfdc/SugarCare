'use client';

import { memo, useCallback, useState } from 'react';
import { usePreparation } from '@/context/PreparationContext';

function ReviewSection() {
  const { state, dispatch } = usePreparation();
  const [note, setNote] = useState(state.userNotes || '');

  const handleSaveNote = useCallback(() => {
    dispatch({ type: 'SET_NOTES', payload: note });
  }, [dispatch, note]);

  return (
    <div className="bg-surface-container-lowest rounded-xl shadow-sm p-6">
      <h3 className="font-headline font-bold text-on-surface mb-4 flex items-center gap-2">
        <span className="material-symbols-outlined text-primary">edit_note</span>
        Notes
      </h3>
      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Add your notes, modifications, or observations..."
        className="w-full h-24 p-3 rounded-lg bg-surface-container-low border border-surface-container-high text-sm text-on-surface placeholder:text-outline resize-none focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
        aria-label="Personal notes"
      />
      <div className="flex justify-end mt-2">
        <button
          onClick={handleSaveNote}
          className="text-xs font-bold text-primary hover:bg-primary/10 px-3 py-1.5 rounded-lg transition-all"
        >
          Save Note
        </button>
      </div>
    </div>
  );
}

export default memo(ReviewSection);
