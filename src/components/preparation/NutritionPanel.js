'use client';

import { memo } from 'react';

function NutritionPanel({ nutrition, servings = 1, baseServings = 1 }) {
  if (!nutrition) return null;

  const scale = servings / baseServings;

  const nutrients = [
    { label: 'Calories', value: Math.round(nutrition.calories * scale), unit: 'kcal', icon: 'local_fire_department', color: 'text-error' },
    { label: 'Protein', value: Math.round(nutrition.protein * scale), unit: 'g', icon: 'fitness_center', color: 'text-primary' },
    { label: 'Carbs', value: Math.round(nutrition.carbs * scale), unit: 'g', icon: 'grain', color: 'text-secondary' },
    { label: 'Fiber', value: Math.round(nutrition.fiber * scale), unit: 'g', icon: 'eco', color: 'text-primary' },
    { label: 'Fat', value: Math.round(nutrition.fat * scale), unit: 'g', icon: 'water_drop', color: 'text-tertiary' },
  ];

  const giColor = nutrition.gi <= 35 ? 'text-primary' : nutrition.gi <= 55 ? 'text-secondary' : 'text-error';

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">Per {servings} serving{servings > 1 ? 's' : ''}</span>
        <span className={`text-sm font-bold ${giColor}`}>GI: {nutrition.gi}</span>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {nutrients.map((n) => (
          <div key={n.label} className="bg-surface-container-low rounded-lg p-3">
            <div className="flex items-center gap-1 mb-1">
              <span className={`material-symbols-outlined text-sm ${n.color}`}>{n.icon}</span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">{n.label}</span>
            </div>
            <span className="text-lg font-extrabold text-on-surface">
              {n.value}
              <span className="text-xs font-normal text-on-surface-variant ml-1">{n.unit}</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default memo(NutritionPanel);
