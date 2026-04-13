'use client';

import { memo, useCallback } from 'react';
import { addToShoppingList } from '@/lib/api';
import { usePreparation } from '@/context/PreparationContext';

function ShoppingListGenerator({ ingredients = [] }) {
  const { addToast } = usePreparation();

  const handleAddAll = useCallback(() => {
    const items = ingredients.map(ing => ({
      name: ing.name,
      quantity: ing.quantity,
      unit: ing.unit,
    }));
    addToShoppingList(items);
    addToast(`${items.length} items added to shopping list`, 'success');
  }, [ingredients, addToast]);

  if (!ingredients.length) return null;

  return (
    <div className="bg-primary/5 border border-primary/20 rounded-xl p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">shopping_cart</span>
          <span className="text-sm font-bold text-on-surface">Shopping List</span>
        </div>
        <button
          onClick={handleAddAll}
          className="text-xs font-bold text-primary hover:bg-primary/10 px-3 py-1.5 rounded-lg transition-all"
        >
          Add All Ingredients
        </button>
      </div>
    </div>
  );
}

export default memo(ShoppingListGenerator);
