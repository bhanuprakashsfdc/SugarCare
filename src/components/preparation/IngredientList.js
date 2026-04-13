'use client';

import { memo, useCallback } from 'react';
import { usePreparation } from '@/context/PreparationContext';

function IngredientList({ ingredients = [], unitSystem = 'imperial' }) {
  const { isIngredientChecked, dispatch } = usePreparation();

  const trackBy = useCallback((ing) => ing.name, []);

  const toggle = useCallback((name) => {
    dispatch({ type: 'TOGGLE_INGREDIENT', payload: name });
  }, [dispatch]);

  return (
    <ul className="space-y-2" role="list" aria-label="Ingredients checklist">
      {ingredients.map((ing) => {
        const checked = isIngredientChecked(ing.name);
        const displayQty = unitSystem === 'metric' ? ing.metric?.qty : ing.quantity;
        const displayUnit = unitSystem === 'metric' ? ing.metric?.unit : ing.unit;

        return (
          <li key={trackBy(ing)}>
            <button
              onClick={() => toggle(ing.name)}
              className={`
                w-full flex items-center gap-3 p-3 rounded-lg text-left transition-all
                ${checked ? 'bg-primary/5 line-through opacity-60' : 'hover:bg-surface-container-low'}
              `}
              aria-checked={checked}
              role="checkbox"
            >
              <span className={`
                w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-all
                ${checked ? 'bg-primary border-primary text-white' : 'border-outline'}
              `}>
                {checked && <span className="material-symbols-outlined text-xs">check</span>}
              </span>
              <span className="flex-1 text-sm font-medium">{ing.name}</span>
              <span className="text-xs text-on-surface-variant font-mono">
                {displayQty} {displayUnit}
              </span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}

export default memo(IngredientList);
