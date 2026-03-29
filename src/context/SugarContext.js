'use client';

import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getStoredData, setStoredData, simulateSugarReduction, generateMockSugarHistory, getHealthScore } from '@/utils/helpers';
import { habits as defaultHabits, weeklyMealPlan } from '@/data/mockData';

const SugarContext = createContext();

export function SugarProvider({ children }) {
  const [currentSugar, setCurrentSugar] = useState(335);
  const [sugarHistory, setSugarHistory] = useState([]);
  const [habitsList, setHabitsList] = useState(defaultHabits);
  const [streak, setStreak] = useState(12);
  const [weight, setWeight] = useState(78);
  const [dietType, setDietType] = useState('veg');
  const [activityLevel, setActivityLevel] = useState('moderate');
  const [projectionData, setProjectionData] = useState([]);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const stored = getStoredData('currentSugar', 335);
    const history = getStoredData('sugarHistory', generateMockSugarHistory(30));
    const storedHabits = getStoredData('habits', defaultHabits);
    const storedStreak = getStoredData('streak', 12);
    const storedWeight = getStoredData('weight', 78);
    const storedDiet = getStoredData('dietType', 'veg');
    const storedActivity = getStoredData('activityLevel', 'moderate');

    setCurrentSugar(stored);
    setSugarHistory(history);
    setHabitsList(storedHabits);
    setStreak(storedStreak);
    setWeight(storedWeight);
    setDietType(storedDiet);
    setActivityLevel(storedActivity);
    setProjectionData(simulateSugarReduction(stored, 30, storedActivity === 'high' ? 90 : storedActivity === 'moderate' ? 75 : 60));
    setInitialized(true);
  }, []);

  const logSugar = useCallback((level) => {
    setCurrentSugar(level);
    setStoredData('currentSugar', level);
    const newEntry = {
      day: sugarHistory.length,
      date: new Date().toLocaleDateString('en-IN', { month: 'short', day: 'numeric' }),
      level,
      fasting: Math.max(70, level - Math.round(Math.random() * 15)),
      postMeal: level + Math.round(Math.random() * 40 + 20),
    };
    const newHistory = [...sugarHistory, newEntry];
    setSugarHistory(newHistory);
    setStoredData('sugarHistory', newHistory);
    setProjectionData(simulateSugarReduction(level, 30, activityLevel === 'high' ? 90 : activityLevel === 'moderate' ? 75 : 60));
  }, [sugarHistory, activityLevel]);

  const toggleHabit = useCallback((id) => {
    const updated = habitsList.map(h => h.id === id ? { ...h, checked: !h.checked } : h);
    setHabitsList(updated);
    setStoredData('habits', updated);
  }, [habitsList]);

  const resetHabits = useCallback(() => {
    const reset = defaultHabits.map(h => ({ ...h, checked: false }));
    setHabitsList(reset);
    setStoredData('habits', reset);
  }, []);

  const habitsCompleted = habitsList.filter(h => h.checked).length;
  const healthScore = getHealthScore(currentSugar, habitsCompleted, habitsList.length);

  const value = {
    currentSugar,
    sugarHistory,
    habitsList,
    streak,
    weight,
    dietType,
    activityLevel,
    projectionData,
    initialized,
    healthScore,
    habitsCompleted,
    logSugar,
    toggleHabit,
    resetHabits,
    setWeight: (w) => { setWeight(w); setStoredData('weight', w); },
    setDietType: (d) => { setDietType(d); setStoredData('dietType', d); },
    setActivityLevel: (a) => { setActivityLevel(a); setStoredData('activityLevel', a); },
  };

  return (
    <SugarContext.Provider value={value}>
      {children}
    </SugarContext.Provider>
  );
}

export function useSugar() {
  const context = useContext(SugarContext);
  if (!context) throw new Error('useSugar must be used within SugarProvider');
  return context;
}
