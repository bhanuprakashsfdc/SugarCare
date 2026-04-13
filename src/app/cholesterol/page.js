'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import BottomNav from '@/components/BottomNav';
import Footer from '@/components/Footer';
import { patientProfile } from '@/data/healthData';

export default function CholesterolPage() {
  const [activeWeek, setActiveWeek] = useState(1);
  const chol = patientProfile.cholesterol;

  const getProgress = (current, target, reverse = false) => {
    if (reverse) {
      return Math.min(100, Math.round((current / target) * 100));
    }
    const initial = current;
    const improvement = initial - current;
    const needed = initial - target;
    return needed > 0 ? Math.min(100, Math.round((improvement / needed) * 100)) : 100;
  };

  const mealPlan = [
    {
      week: 1,
      title: 'Foundation Week',
      focus: 'Eliminate trans fats, introduce oats daily',
      meals: {
        breakfast: 'Steel cut oats with almonds and flaxseeds',
        lunch: 'Brown rice + moong dal + bitter gourd stir-fry',
        dinner: 'Grilled fish + steamed vegetables',
        snack: 'Handful of walnuts + green tea',
      },
      supplements: ['Omega-3 fish oil capsule', 'Psyllium husk (isabgol) before bed'],
      exercise: '30 min walk after dinner',
      expectedChange: 'LDL: -5%, Triglycerides: -8%',
    },
    {
      week: 2,
      title: 'Fiber Fortification',
      focus: 'Maximize soluble fiber intake',
      meals: {
        breakfast: 'Ragi porridge with chia seeds',
        lunch: 'Millet biryani + raita + salad',
        dinner: 'Palak moong dal + 1 millet roti',
        snack: 'Apple + almonds',
      },
      supplements: ['Omega-3 fish oil capsule', 'Psyllium husk', 'Garlic capsule'],
      exercise: '30 min walk + 15 min yoga',
      expectedChange: 'LDL: -8%, HDL: +3%',
    },
    {
      week: 3,
      title: 'Protein Optimization',
      focus: 'Replace red meat with fish, lentils, paneer',
      meals: {
        breakfast: 'Egg white omelette + whole grain toast',
        lunch: 'Rajma + brown rice + cucumber raita',
        dinner: 'Andhra fish curry + steamed broccoli',
        snack: 'Greek yogurt + berries',
      },
      supplements: ['Omega-3 fish oil capsule', 'Plant sterol supplement'],
      exercise: '40 min brisk walk + strength training 2x',
      expectedChange: 'LDL: -12%, Total: -10%',
    },
    {
      week: 4,
      title: 'Lifestyle Integration',
      focus: 'Sustain changes, stress management',
      meals: {
        breakfast: 'Chia pudding with mixed nuts',
        lunch: 'Quinoa pulao + palak paneer',
        dinner: 'Clear soup + grilled chicken + salad',
        snack: 'Roasted makhana + herbal tea',
      },
      supplements: ['Omega-3 fish oil capsule', 'Psyllium husk'],
      exercise: '45 min daily activity mix',
      expectedChange: 'LDL: -15%, HDL: +5%, TG: -20%',
    },
  ];

  const currentWeekData = mealPlan[activeWeek - 1];

  const cholesterolMetrics = [
    { name: 'Total Cholesterol', current: chol.total.current, target: chol.total.target, unit: 'mg/dL', color: 'primary', icon: 'monitoring' },
    { name: 'LDL (Bad)', current: chol.ldl.current, target: chol.ldl.target, unit: 'mg/dL', color: 'tertiary', icon: 'trending_down' },
    { name: 'HDL (Good)', current: chol.hdl.current, target: chol.hdl.target, unit: 'mg/dL', color: 'primary', icon: 'trending_up', reverse: true },
    { name: 'Triglycerides', current: chol.triglycerides.current, target: chol.triglycerides.target, unit: 'mg/dL', color: 'secondary', icon: 'water_drop' },
  ];

  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto px-6 py-12">
        <section className="mb-12 animate-fade-in-up">
          <span className="text-primary font-headline font-bold tracking-widest uppercase text-xs block mb-3">90-Day Plan</span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-on-surface tracking-tight leading-tight mb-4">
            Cholesterol <span className="text-primary-container">Reduction Plan</span>
          </h1>
          <p className="text-on-surface-variant text-lg max-w-2xl">
            A structured, evidence-based program to reduce LDL cholesterol and improve your heart health alongside diabetes management.
          </p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {cholesterolMetrics.map((metric, i) => {
            const progress = metric.reverse
              ? Math.round((metric.current / metric.target) * 100)
              : Math.round(((metric.current - metric.target) / metric.current) * 100);
            const isGood = metric.reverse ? metric.current >= metric.target : metric.current <= metric.target;

            return (
              <motion.div
                key={metric.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="bg-surface-container-lowest rounded-xl p-6 border border-outline-variant/10 shadow-sm"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="material-symbols-outlined text-primary">{metric.icon}</span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    isGood ? 'bg-primary-container/10 text-primary' : 'bg-tertiary-container/10 text-tertiary'
                  }`}>
                    {isGood ? 'ON TARGET' : 'NEEDS WORK'}
                  </span>
                </div>
                <p className="text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-1">{metric.name}</p>
                <div className="flex items-baseline gap-2 mb-3">
                  <span className="text-3xl font-extrabold font-headline text-on-surface">{metric.current}</span>
                  <span className="text-sm text-on-surface-variant">/ {metric.target} {metric.unit}</span>
                </div>
                <div className="h-2 bg-surface-container rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${isGood ? 'bg-primary' : 'bg-tertiary'}`}
                    style={{ width: `${Math.min(100, Math.abs(progress))}%` }}
                  />
                </div>
                <p className="text-xs text-on-surface-variant mt-2">
                  {isGood ? 'Within target range' : `${metric.reverse ? '+' : '-'}${Math.abs(metric.current - metric.target)} ${metric.unit} to target`}
                </p>
              </motion.div>
            );
          })}
        </div>

        <section className="mb-12">
          <h2 className="text-3xl font-headline font-extrabold mb-6">Weekly Meal Plan</h2>
          <div className="flex gap-3 mb-8">
            {mealPlan.map(week => (
              <button
                key={week.week}
                onClick={() => setActiveWeek(week.week)}
                className={`px-5 py-3 rounded-xl font-bold text-sm transition-all ${
                  activeWeek === week.week ? 'bg-primary text-on-primary shadow-lg' : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'
                }`}
              >
                Week {week.week}
              </button>
            ))}
          </div>

          <motion.div
            key={activeWeek}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-surface-container-lowest rounded-xl border border-outline-variant/10 shadow-sm overflow-hidden"
          >
            <div className="bg-gradient-to-r from-primary/5 to-primary-container/5 p-6 border-b border-outline-variant/10">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-primary">Week {currentWeekData.week}</span>
                  <h3 className="font-headline font-extrabold text-2xl mt-1">{currentWeekData.title}</h3>
                  <p className="text-on-surface-variant mt-1">{currentWeekData.focus}</p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Expected Change</span>
                  <p className="text-lg font-bold text-primary mt-1">{currentWeekData.expectedChange}</p>
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="font-bold text-sm uppercase tracking-widest text-on-surface-variant mb-3">Daily Meals</h4>
                  <div className="space-y-3">
                    {Object.entries(currentWeekData.meals).map(([meal, desc]) => (
                      <div key={meal} className="flex items-start gap-3 bg-surface-container-low rounded-lg p-3">
                        <span className="material-symbols-outlined text-primary text-lg mt-0.5">
                          {meal === 'breakfast' ? 'wb_sunny' : meal === 'lunch' ? 'wb_cloudy' : meal === 'dinner' ? 'nights_stay' : 'cookie'}
                        </span>
                        <div>
                          <p className="text-xs font-bold uppercase text-on-surface-variant">{meal}</p>
                          <p className="text-sm font-medium">{desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-bold text-sm uppercase tracking-widest text-on-surface-variant mb-3">Supplements</h4>
                    <ul className="space-y-2">
                      {currentWeekData.supplements.map((sup, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm">
                          <span className="material-symbols-outlined text-primary text-sm">check_circle</span>
                          {sup}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-sm uppercase tracking-widest text-on-surface-variant mb-3">Exercise</h4>
                    <div className="flex items-center gap-2 bg-primary/5 rounded-lg p-3">
                      <span className="material-symbols-outlined text-primary">directions_walk</span>
                      <span className="text-sm font-medium">{currentWeekData.exercise}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-headline font-extrabold mb-6">Top Cholesterol-Lowering Foods</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { name: 'Oats', mechanism: 'Beta-glucan fiber binds bile acids, forcing liver to use cholesterol', reduction: '5-10%', icon: '🥣', daily: '1 cup steel cut oats' },
              { name: 'Almonds', mechanism: 'Plant sterols block cholesterol absorption in intestine', reduction: '5%', icon: '🥜', daily: '30g (23 almonds)' },
              { name: 'Fatty Fish', mechanism: 'Omega-3 reduces triglycerides and raises HDL', reduction: 'TG: 15-30%', icon: '🐟', daily: '2-3 servings/week' },
              { name: 'Garlic', mechanism: 'Allicin inhibits cholesterol synthesis in liver', reduction: '5-10%', icon: '🧄', daily: '2-3 fresh cloves' },
              { name: 'Bitter Gourd', mechanism: 'Charantin improves lipid metabolism', reduction: 'LDL: 8-12%', icon: '🥒', daily: '3-4 times/week' },
              { name: 'Fenugreek Seeds', mechanism: 'Galactomannan reduces cholesterol absorption', reduction: 'LDL: 10-15%', icon: '🌱', daily: '1 tsp soaked overnight' },
            ].map((food, i) => (
              <motion.div
                key={food.name}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                className="bg-surface-container-lowest rounded-xl p-6 border border-outline-variant/10 shadow-sm"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl">{food.icon}</span>
                  <div>
                    <h4 className="font-headline font-bold text-lg">{food.name}</h4>
                    <span className="text-xs font-bold text-primary">-{food.reduction} reduction</span>
                  </div>
                </div>
                <p className="text-sm text-on-surface-variant mb-3">{food.mechanism}</p>
                <div className="bg-surface-container-low rounded-lg p-3 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-sm">restaurant</span>
                  <span className="text-xs font-medium">Daily: {food.daily}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
      <BottomNav />
    </>
  );
}
