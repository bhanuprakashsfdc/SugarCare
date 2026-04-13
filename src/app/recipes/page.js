'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar';
import BottomNav from '@/components/BottomNav';
import Footer from '@/components/Footer';
import { recipes, recipeCategories, recipeTags } from '@/data/recipes';

export default function RecipesPage() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeTag, setActiveTag] = useState('');
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [giFilter, setGiFilter] = useState(100);

  const filteredRecipes = useMemo(() => {
    let filtered = [...recipes];
    if (activeCategory !== 'all') filtered = filtered.filter(r => r.category === activeCategory);
    if (activeTag) filtered = filtered.filter(r => r.tags.includes(activeTag));
    if (giFilter < 100) filtered = filtered.filter(r => r.giIndex <= giFilter);
    if (search) {
      const q = search.toLowerCase();
      filtered = filtered.filter(r =>
        r.name.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q) ||
        r.ingredients.some(i => i.item.toLowerCase().includes(q))
      );
    }
    return filtered;
  }, [activeCategory, activeTag, search, giFilter]);

  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto px-6 py-12 md:py-16">
        <section className="mb-12 animate-fade-in-up">
          <span className="text-primary font-headline font-bold tracking-widest uppercase text-xs block mb-3">Diabetes-Safe Kitchen</span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-on-surface tracking-tight leading-tight mb-4">
            Recipe <span className="text-primary-container">Database</span>
          </h1>
          <p className="text-on-surface-variant text-lg max-w-2xl mb-8">
            Searchable collection of diabetic-friendly recipes with step-by-step instructions, nutritional breakdowns, and cholesterol-lowering tips.
          </p>

          <div className="relative max-w-2xl mb-8">
            <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
              <span className="material-symbols-outlined text-outline">search</span>
            </div>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search recipes, ingredients (e.g., ragi, bitter gourd, fish)..."
              className="w-full h-14 pl-14 pr-14 bg-surface-container-high border-none rounded-xl text-base font-medium focus:ring-4 focus:ring-primary-container/20 transition-all shadow-sm placeholder:text-outline outline-none"
            />
            {search && (
              <button onClick={() => setSearch('')} className="absolute inset-y-0 right-5 flex items-center">
                <span className="material-symbols-outlined text-on-surface-variant">close</span>
              </button>
            )}
          </div>
        </section>

        <div className="flex flex-wrap gap-2 mb-6">
          {recipeCategories.map(cat => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`px-4 py-2 rounded-lg font-bold text-sm transition-all flex items-center gap-2 ${
                activeCategory === cat.key
                  ? 'bg-primary text-on-primary shadow-md'
                  : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high'
              }`}
            >
              <span className="material-symbols-outlined text-lg">{cat.icon}</span>
              {cat.label}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setActiveTag('')}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
              !activeTag ? 'bg-secondary-container text-on-secondary-container' : 'bg-surface-container-low text-on-surface-variant'
            }`}
          >
            All Tags
          </button>
          {recipeTags.slice(0, 8).map(tag => (
            <button
              key={tag}
              onClick={() => setActiveTag(activeTag === tag ? '' : tag)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                activeTag === tag ? 'bg-secondary-container text-on-secondary-container' : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'
              }`}
            >
              {tag.replace('-', ' ')}
            </button>
          ))}
          <div className="flex items-center gap-2 ml-auto">
            <span className="text-xs text-on-surface-variant font-bold">Max GI:</span>
            <input
              type="range"
              min="0"
              max="100"
              value={giFilter}
              onChange={(e) => setGiFilter(parseInt(e.target.value))}
              className="w-24 accent-primary"
            />
            <span className="text-xs font-bold text-primary">{giFilter}</span>
          </div>
        </div>

        <p className="text-sm text-on-surface-variant mb-6">{filteredRecipes.length} recipes found</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredRecipes.map((recipe, i) => (
            <motion.div
              key={recipe.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-surface-container-lowest rounded-xl border border-outline-variant/10 shadow-sm hover:shadow-lg transition-all cursor-pointer group overflow-hidden"
              onClick={() => setSelectedRecipe(recipe)}
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <span className="text-4xl">{recipe.image}</span>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${
                      recipe.giIndex <= 35 ? 'bg-primary-container/10 text-primary' :
                      recipe.giIndex <= 55 ? 'bg-secondary-container/10 text-secondary' :
                      'bg-tertiary-container/10 text-tertiary'
                    }`}>
                      GI {recipe.giIndex}
                    </span>
                  </div>
                </div>
                <h3 className="font-headline font-bold text-lg mb-2 group-hover:text-primary transition-colors">{recipe.name}</h3>
                <p className="text-sm text-on-surface-variant line-clamp-2 mb-4">{recipe.description}</p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {recipe.tags.slice(0, 3).map(tag => (
                    <span key={tag} className="px-2 py-0.5 bg-surface-container-low rounded-full text-[10px] font-semibold text-on-surface-variant">
                      {tag.replace('-', ' ')}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between text-xs text-on-surface-variant">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">timer</span>
                      {recipe.prepTime + recipe.cookTime}m
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">restaurant</span>
                      {recipe.servings} servings
                    </span>
                  </div>
                  <span className="font-bold text-primary">{recipe.nutrition.calories} cal</span>
                </div>
              </div>
              <div className="px-6 py-3 bg-surface-container-low/50 border-t border-outline-variant/5 flex items-center justify-between">
                <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wide">{recipe.difficulty}</span>
                <span className="text-xs font-bold text-primary group-hover:translate-x-1 transition-transform">View Recipe →</span>
              </div>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {selectedRecipe && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 backdrop-blur-sm overflow-y-auto py-8 px-4"
              onClick={() => setSelectedRecipe(null)}
            >
              <motion.div
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 40, scale: 0.95 }}
                className="bg-surface rounded-2xl max-w-3xl w-full shadow-2xl overflow-hidden my-auto"
                onClick={e => e.stopPropagation()}
              >
                <div className="bg-gradient-to-br from-primary/5 to-primary-container/5 p-8 border-b border-outline-variant/10">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-5xl mb-4 block">{selectedRecipe.image}</span>
                      <h2 className="text-3xl font-headline font-extrabold text-on-surface">{selectedRecipe.name}</h2>
                      <p className="text-on-surface-variant mt-2">{selectedRecipe.description}</p>
                    </div>
                    <button onClick={() => setSelectedRecipe(null)} className="p-2 hover:bg-surface-container rounded-lg transition-colors">
                      <span className="material-symbols-outlined">close</span>
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-3 mt-4">
                    <span className="px-3 py-1.5 bg-primary text-white rounded-full text-xs font-bold">GI Index: {selectedRecipe.giIndex}</span>
                    <span className="px-3 py-1.5 bg-surface-container-lowest rounded-full text-xs font-bold">Prep: {selectedRecipe.prepTime}m</span>
                    <span className="px-3 py-1.5 bg-surface-container-lowest rounded-full text-xs font-bold">Cook: {selectedRecipe.cookTime}m</span>
                    <span className="px-3 py-1.5 bg-surface-container-lowest rounded-full text-xs font-bold">{selectedRecipe.servings} servings</span>
                  </div>
                </div>

                <div className="p-8 space-y-8">
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                    {Object.entries(selectedRecipe.nutrition).map(([key, value]) => (
                      <div key={key} className="bg-surface-container-low rounded-lg p-3 text-center">
                        <p className="text-xs font-bold uppercase tracking-wide text-on-surface-variant">{key}</p>
                        <p className="text-xl font-extrabold font-headline text-on-surface">{value}{key === 'calories' ? '' : 'g'}</p>
                      </div>
                    ))}
                  </div>

                  {selectedRecipe.cholesterolBenefit && (
                    <div className="bg-primary-container/5 border border-primary-container/20 rounded-xl p-4 flex items-start gap-3">
                      <span className="material-symbols-outlined text-primary mt-0.5">favorite</span>
                      <div>
                        <p className="text-sm font-bold text-primary mb-1">Cholesterol Benefit</p>
                        <p className="text-sm text-on-surface-variant">{selectedRecipe.cholesterolBenefit}</p>
                      </div>
                    </div>
                  )}

                  <div>
                    <h3 className="font-headline font-bold text-xl mb-4 flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary">grocery</span>
                      Ingredients
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {selectedRecipe.ingredients.map((ing, i) => (
                        <div key={i} className="flex items-center justify-between bg-surface-container-low rounded-lg p-3">
                          <span className="text-sm font-medium">{ing.item}</span>
                          <div className="flex items-center gap-3">
                            <span className="text-sm text-on-surface-variant">{ing.quantity}</span>
                            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                              ing.gi <= 20 ? 'bg-primary-container/10 text-primary' :
                              ing.gi <= 50 ? 'bg-secondary-container/10 text-secondary' :
                              'bg-tertiary-container/10 text-tertiary'
                            }`}>
                              GI:{ing.gi}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-headline font-bold text-xl mb-4 flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary">receipt_long</span>
                      Step-by-Step Instructions
                    </h3>
                    <div className="space-y-4">
                      {selectedRecipe.steps.map((step) => (
                        <div key={step.step} className="flex gap-4 group">
                          <div className="shrink-0 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm">
                            {step.step}
                          </div>
                          <div className="flex-1 pb-4 border-b border-outline-variant/10 last:border-0">
                            <p className="text-on-surface font-medium mb-2">{step.instruction}</p>
                            <div className="flex flex-wrap items-center gap-3 text-xs text-on-surface-variant">
                              <span className="flex items-center gap-1">
                                <span className="material-symbols-outlined text-sm">timer</span>
                                {step.duration}
                              </span>
                            </div>
                            {step.tip && (
                              <div className="mt-2 flex items-start gap-2 bg-secondary-container/5 p-2 rounded-lg">
                                <span className="material-symbols-outlined text-secondary text-sm mt-0.5">lightbulb</span>
                                <p className="text-xs text-on-surface-variant italic">{step.tip}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {selectedRecipe.tips && (
                    <div className="bg-surface-container-low rounded-xl p-6">
                      <h4 className="font-headline font-bold mb-3 flex items-center gap-2">
                        <span className="material-symbols-outlined text-secondary">tips_and_updates</span>
                        Pro Tips
                      </h4>
                      <ul className="space-y-2">
                        {selectedRecipe.tips.map((tip, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-on-surface-variant">
                            <span className="material-symbols-outlined text-primary text-sm mt-0.5">check_circle</span>
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      <Footer />
      <BottomNav />
    </>
  );
}
