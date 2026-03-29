export function getStoredData(key, defaultValue) {
  if (typeof window === 'undefined') return defaultValue;
  try {
    const item = localStorage.getItem(`sugarcare_${key}`);
    return item ? JSON.parse(item) : defaultValue;
  } catch {
    return defaultValue;
  }
}

export function setStoredData(key, value) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(`sugarcare_${key}`, JSON.stringify(value));
  } catch (e) {
    console.error('localStorage error:', e);
  }
}

export function getSugarStatus(level) {
  if (level < 70) return { label: 'Low', color: 'tertiary', bg: 'tertiary-container/20', urgent: true };
  if (level <= 100) return { label: 'Normal', color: 'primary', bg: 'primary-container/20', urgent: false };
  if (level <= 125) return { label: 'Pre-diabetic', color: 'secondary', bg: 'secondary-container/20', urgent: false };
  if (level <= 200) return { label: 'High', color: 'tertiary', bg: 'tertiary-container/20', urgent: false };
  if (level <= 300) return { label: 'Very High', color: 'tertiary', bg: 'tertiary-container/30', urgent: true };
  return { label: 'Critical', color: 'error', bg: 'error-container', urgent: true };
}

export function simulateSugarReduction(startLevel, days, adherencePercent = 80) {
  const data = [];
  const adherence = adherencePercent / 100;
  const dailyReduction = (startLevel - 100) * 0.08 * adherence;

  for (let i = 0; i <= days; i++) {
    const noise = (Math.random() - 0.5) * 15;
    const reduction = dailyReduction * i;
    const level = Math.max(85, Math.round(startLevel - reduction + noise));
    data.push({
      day: i,
      date: new Date(Date.now() + i * 86400000).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' }),
      level,
      fasting: Math.max(70, level - Math.round(Math.random() * 15)),
      postMeal: level + Math.round(Math.random() * 40 + 20),
    });
  }
  return data;
}

export function generateMockSugarHistory(days = 30) {
  const data = [];
  let level = 335;
  for (let i = days; i >= 0; i--) {
    const reduction = (days - i) * 7.5;
    const noise = (Math.random() - 0.5) * 20;
    level = Math.max(85, Math.round(335 - reduction + noise));
    data.push({
      day: days - i,
      date: new Date(Date.now() - i * 86400000).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' }),
      level,
      fasting: Math.max(70, level - Math.round(Math.random() * 15)),
      postMeal: level + Math.round(Math.random() * 40 + 20),
    });
  }
  return data;
}

export function getHealthScore(sugarLevel, habitsCompleted, totalHabits) {
  let score = 100;
  if (sugarLevel > 300) score -= 50;
  else if (sugarLevel > 200) score -= 30;
  else if (sugarLevel > 125) score -= 15;
  else if (sugarLevel < 70) score -= 20;

  const habitBonus = Math.round((habitsCompleted / totalHabits) * 30);
  score = Math.max(10, Math.min(100, score + habitBonus));
  return score;
}

export function getGICategory(gi) {
  if (gi <= 35) return { label: 'Low GI', color: 'primary', bg: 'primary-container/10' };
  if (gi <= 55) return { label: 'Moderate', color: 'secondary', bg: 'secondary-container/10' };
  if (gi <= 70) return { label: 'Medium-High', color: 'tertiary', bg: 'tertiary-container/10' };
  return { label: 'High GI', color: 'error', bg: 'error-container/10' };
}
