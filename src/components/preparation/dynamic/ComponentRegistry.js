import { lazy } from 'react';

const RecipePreparation = lazy(() => import('./RecipePreparation'));
const WorkoutPreparation = lazy(() => import('./WorkoutPreparation'));
const TaskPreparation = lazy(() => import('./TaskPreparation'));

export const componentRegistry = {
  recipe: RecipePreparation,
  workout: WorkoutPreparation,
  task: TaskPreparation,
};

export function getComponentForType(type) {
  return componentRegistry[type] || RecipePreparation;
}

export const typeLabels = {
  recipe: { label: 'Recipe', icon: 'restaurant', color: 'primary' },
  workout: { label: 'Workout', icon: 'fitness_center', color: 'secondary' },
  task: { label: 'Task', icon: 'checklist', color: 'tertiary' },
};

export const mealTypeLabels = {
  breakfast: { label: 'Breakfast', icon: 'wb_sunny' },
  lunch: { label: 'Lunch', icon: 'wb_cloudy' },
  dinner: { label: 'Dinner', icon: 'nightlight' },
  snack: { label: 'Snack', icon: 'cookie' },
};
