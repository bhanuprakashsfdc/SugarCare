export const indianFoods = [
  { id: 1, name: 'Ragi Mudde', gi: 30, category: 'low', type: 'veg', calories: 120, fiber: 3.6, protein: 2.7, description: 'Finger millet ball - excellent low GI staple from South India', image: '🌾' },
  { id: 2, name: 'Brown Rice', gi: 50, category: 'low', type: 'veg', calories: 216, fiber: 1.8, protein: 5, description: 'Complex carb that releases energy slowly', image: '🍚' },
  { id: 3, name: 'Millet (Bajra)', gi: 54, category: 'low', type: 'veg', calories: 200, fiber: 2.3, protein: 6, description: 'Ancient grain with excellent glycemic control properties', image: '🌾' },
  { id: 4, name: 'Moong Dal', gi: 38, category: 'low', type: 'veg', calories: 105, fiber: 7.6, protein: 7, description: 'Protein-rich lentil that stabilizes blood sugar', image: '🫘' },
  { id: 5, name: 'Paneer', gi: 27, category: 'low', type: 'veg', calories: 265, fiber: 0, protein: 18, description: 'Low carb protein source, great for diabetics', image: '🧀' },
  { id: 6, name: 'Palak (Spinach)', gi: 15, category: 'low', type: 'veg', calories: 23, fiber: 2.2, protein: 2.9, description: 'Iron-rich leafy green, virtually zero GI', image: '🥬' },
  { id: 7, name: 'Bitter Gourd', gi: 18, category: 'low', type: 'veg', calories: 17, fiber: 2.8, protein: 1, description: 'Natural insulin sensitizer, excellent for diabetes', image: '🥒' },
  { id: 8, name: 'Almonds', gi: 0, category: 'low', type: 'veg', calories: 164, fiber: 3.5, protein: 6, description: 'Rich in fiber and healthy fats, zero sugar spikes', image: '🥜' },
  { id: 9, name: 'Eggs', gi: 0, category: 'low', type: 'non-veg', calories: 155, fiber: 0, protein: 13, description: 'Zero carb complete protein source', image: '🥚' },
  { id: 10, name: 'Grilled Chicken', gi: 0, category: 'low', type: 'non-veg', calories: 165, fiber: 0, protein: 31, description: 'Lean protein with no glycemic impact', image: '🍗' },
  { id: 11, name: 'Fish (Grilled)', gi: 0, category: 'low', type: 'non-veg', calories: 206, fiber: 0, protein: 22, description: 'Omega-3 rich protein, anti-inflammatory', image: '🐟' },
  { id: 12, name: 'Greek Yogurt', gi: 11, category: 'low', type: 'veg', calories: 100, fiber: 0, protein: 17, description: 'High protein, probiotic-rich, low GI', image: '🥛' },
  { id: 13, name: 'Chia Seeds', gi: 1, category: 'low', type: 'veg', calories: 137, fiber: 34, protein: 4.7, description: 'Superfood with almost zero glycemic impact', image: '🌱' },
  { id: 14, name: 'Oats (Steel Cut)', gi: 42, category: 'low', type: 'veg', calories: 150, fiber: 4, protein: 5, description: 'Beta-glucan fiber slows glucose absorption', image: '🥣' },
  { id: 15, name: 'Quinoa', gi: 53, category: 'low', type: 'veg', calories: 222, fiber: 5, protein: 8, description: 'Complete protein grain with moderate GI', image: '🌾' },
];

export const avoidFoods = [
  { id: 101, name: 'White Rice', gi: 73, category: 'high', type: 'veg', calories: 206, fiber: 0.6, protein: 4.3, description: 'Refined grain with high glycemic index', image: '🍚', warning: 'Causes rapid glucose spikes' },
  { id: 102, name: 'White Sugar', gi: 100, category: 'high', type: 'veg', calories: 387, fiber: 0, protein: 0, description: 'Pure sucrose causes immediate glucose spikes', image: '🍬', warning: 'Highest GI possible' },
  { id: 103, name: 'White Bread', gi: 75, category: 'high', type: 'veg', calories: 265, fiber: 2.7, protein: 9, description: 'Refined flour with rapid glucose conversion', image: '🍞', warning: 'Rapidly converts to sugar' },
  { id: 104, name: 'Fruit Juice', gi: 68, category: 'high', type: 'veg', calories: 111, fiber: 0.2, protein: 0.5, description: 'Fiber-stripped sugar water from fruit', image: '🧃', warning: 'No fiber to slow absorption' },
  { id: 105, name: 'Sweetened Cereal', gi: 82, category: 'high', type: 'veg', calories: 379, fiber: 2, protein: 6, description: 'Refined grains with added high fructose corn syrup', image: '🥣', warning: 'Hidden sugar content' },
  { id: 106, name: 'Maida (Refined Flour)', gi: 85, category: 'high', type: 'veg', calories: 364, fiber: 2.7, protein: 10, description: 'Refined wheat flour stripped of all nutrients', image: '🌾', warning: 'Used in naan, roti made from this is harmful' },
  { id: 107, name: 'Potato Chips', gi: 70, category: 'high', type: 'veg', calories: 536, fiber: 4.4, protein: 7, description: 'Deep fried starchy snack with high GI', image: '🍟', warning: 'High in unhealthy fats too' },
  { id: 108, name: 'Soda/Cold Drinks', gi: 63, category: 'high', type: 'veg', calories: 140, fiber: 0, protein: 0, description: 'Liquid sugar with zero nutritional value', image: '🥤', warning: 'Spikes blood sugar rapidly' },
];

export const moderateFoods = [
  { id: 201, name: 'Idli', gi: 60, category: 'moderate', type: 'veg', calories: 39, fiber: 0.3, protein: 2, description: 'Limit to 2-3 pieces. Pair with fiber-rich sambar', image: '🫓' },
  { id: 202, name: 'Dosa', gi: 62, category: 'moderate', type: 'veg', calories: 133, fiber: 0.8, protein: 3.8, description: 'Use millet or ragi batter for lower GI', image: '🫓' },
  { id: 203, name: 'Banana (Ripe)', gi: 62, category: 'moderate', type: 'veg', calories: 89, fiber: 2.6, protein: 1.1, description: 'Limit to half. Choose less ripe bananas', image: '🍌' },
  { id: 204, name: 'Mango', gi: 56, category: 'moderate', type: 'veg', calories: 60, fiber: 1.6, protein: 0.8, description: 'Small portions only. Seasonal treat', image: '🥭' },
  { id: 205, name: 'Chapati (Wheat)', gi: 58, category: 'moderate', type: 'veg', calories: 120, fiber: 2, protein: 4, description: 'Limit to 2 per meal. Use multigrain atta', image: '🫓' },
  { id: 206, name: 'Sweet Potato', gi: 54, category: 'moderate', type: 'veg', calories: 86, fiber: 3, protein: 1.6, description: 'Better than white potato. Boil, do not fry', image: '🍠' },
];

export const foodSwaps = [
  { from: 'White Rice', to: 'Millet / Brown Rice', fromGI: 73, toGI: 50, benefit: 'Reduces glucose spike by 32%' },
  { from: 'Sugar Tea', to: 'Green Tea / Herbal Tea', fromGI: 65, toGI: 0, benefit: 'Eliminates added sugar intake' },
  { from: 'White Bread', to: 'Whole Grain Sourdough', fromGI: 75, toGI: 51, benefit: 'More fiber, slower absorption' },
  { from: 'Fruit Juice', to: 'Whole Fruit', fromGI: 68, toGI: 35, benefit: 'Fiber intact, natural sugars buffered' },
  { from: 'Maida Roti', to: 'Ragi / Bajra Roti', fromGI: 85, toGI: 45, benefit: 'Ancient grains with superior nutrition' },
  { from: 'Potato Chips', to: 'Roasted Makhana', fromGI: 70, toGI: 25, benefit: 'Low calorie, satisfying crunch' },
  { from: 'Soda', to: 'Lime Water / Buttermilk', fromGI: 63, toGI: 0, benefit: 'Zero sugar, adds electrolytes' },
  { from: 'Instant Oats', to: 'Steel Cut Oats', fromGI: 79, toGI: 42, benefit: 'Less processing, more fiber' },
];

export const weeklyMealPlan = [
  {
    day: 'Monday',
    focus: 'Stabilization',
    meals: {
      breakfast: { name: 'Ragi Porridge with Nuts', icon: 'nutrition', tag: 'Fiber High' },
      lunch: { name: 'Brown Rice + Sambar + Greens', icon: 'energy_savings_leaf', tag: 'Low GI' },
      dinner: { name: 'Moong Dal Soup + Roti', icon: 'fitness_center', tag: 'Protein Rich' },
      snack: { name: 'Handful of Almonds', icon: 'fitness_center', tag: 'Protein Rich' },
    },
    swap: 'White Rice → Millet',
    walkMins: 30,
  },
  {
    day: 'Tuesday',
    focus: 'Lean Protein',
    meals: {
      breakfast: { name: 'Egg White Omelette + Veggies', icon: 'fitness_center', tag: 'Protein Rich' },
      lunch: { name: 'Grilled Chicken + Quinoa Salad', icon: 'fitness_center', tag: 'Protein Rich' },
      dinner: { name: 'Palak Paneer + Millet Roti', icon: 'energy_savings_leaf', tag: 'Low GI' },
      snack: { name: 'Greek Yogurt', icon: 'nutrition', tag: 'Fiber High' },
    },
    swap: 'Sugar Tea → Green Tea',
    walkMins: 30,
  },
  {
    day: 'Wednesday',
    focus: 'High Fiber',
    meals: {
      breakfast: { name: 'Chia Seed Pudding', icon: 'nutrition', tag: 'Fiber High' },
      lunch: { name: 'Lentil & Kale Soup', icon: 'energy_savings_leaf', tag: 'Low GI' },
      dinner: { name: 'Millet Biryani + Raita', icon: 'nutrition', tag: 'Fiber High' },
      snack: { name: 'Cucumber + Hummus', icon: 'energy_savings_leaf', tag: 'Low GI' },
    },
    swap: 'White Bread → Sourdough',
    walkMins: 40,
  },
  {
    day: 'Thursday',
    focus: 'Omega-3',
    meals: {
      breakfast: { name: 'Smoked Salmon Omelette', icon: 'fitness_center', tag: 'Protein Rich' },
      lunch: { name: 'Fish Curry + Brown Rice', icon: 'energy_savings_leaf', tag: 'Low GI' },
      dinner: { name: 'Baked Cod & Asparagus', icon: 'fitness_center', tag: 'Protein Rich' },
      snack: { name: 'Apple + Almond Butter', icon: 'nutrition', tag: 'Fiber High' },
    },
    swap: 'Potato → Sweet Potato',
    walkMins: 30,
  },
  {
    day: 'Friday',
    focus: 'Plant-Based',
    meals: {
      breakfast: { name: 'Smoothie Bowl (Spinach+Berries)', icon: 'nutrition', tag: 'Fiber High' },
      lunch: { name: 'Rajma + Brown Rice', icon: 'energy_savings_leaf', tag: 'Low GI' },
      dinner: { name: 'Tofu Stir Fry + Millet', icon: 'fitness_center', tag: 'Protein Rich' },
      snack: { name: 'Roasted Makhana', icon: 'energy_savings_leaf', tag: 'Low GI' },
    },
    swap: 'Fruit Juice → Whole Orange',
    walkMins: 35,
  },
  {
    day: 'Saturday',
    focus: 'Recovery',
    meals: {
      breakfast: { name: 'Steel Cut Oats + Berries', icon: 'nutrition', tag: 'Fiber High' },
      lunch: { name: 'Chicken Salad Wrap', icon: 'fitness_center', tag: 'Protein Rich' },
      dinner: { name: 'Clear Soup + Grilled Veggies', icon: 'energy_savings_leaf', tag: 'Low GI' },
      snack: { name: 'Walnuts + Dark Chocolate', icon: 'fitness_center', tag: 'Protein Rich' },
    },
    swap: 'Instant Oats → Steel Cut Oats',
    walkMins: 45,
  },
  {
    day: 'Sunday',
    focus: 'Balance',
    meals: {
      breakfast: { name: 'Ragi Dosa + Coconut Chutney', icon: 'energy_savings_leaf', tag: 'Low GI' },
      lunch: { name: 'Biryani (Millet) + Raita', icon: 'nutrition', tag: 'Fiber High' },
      dinner: { name: 'Grilled Fish + Steamed Veggies', icon: 'fitness_center', tag: 'Protein Rich' },
      snack: { name: 'Mixed Seeds', icon: 'nutrition', tag: 'Fiber High' },
    },
    swap: 'Soda → Buttermilk',
    walkMins: 30,
  },
];

export const habits = [
  { id: 1, name: 'Walk 10 mins after meals', description: 'Post-meal metabolic boost', icon: 'directions_walk', color: 'primary', checked: false },
  { id: 2, name: 'Drink 2.5L water', description: 'Stay hydrated throughout the day', icon: 'water_drop', color: 'secondary', checked: false },
  { id: 3, name: 'Avoid added sugar', description: 'Zero added sugar intake', icon: 'block', color: 'tertiary', checked: false },
  { id: 4, name: 'Sleep by 10 PM', description: 'Quality rest for glucose regulation', icon: 'bedtime', color: 'primary', checked: false },
  { id: 5, name: 'Morning sunlight (15 min)', description: 'Vitamin D and circadian rhythm', icon: 'wb_sunny', color: 'secondary', checked: false },
  { id: 6, name: 'Take medicines on time', description: 'Never skip prescribed medication', icon: 'medication', color: 'tertiary', checked: false },
  { id: 7, name: 'Log sugar reading', description: 'Track your glucose levels daily', icon: 'monitor_heart', color: 'primary', checked: false },
  { id: 8, name: 'Eat 1 bitter gourd dish', description: 'Natural insulin sensitizer', icon: 'eco', color: 'secondary', checked: false },
];

export const dailyNudges = [
  "Walk 10 minutes after your next meal — it can reduce glucose spikes by 22%.",
  "Swap your afternoon chai for green tea today.",
  "Add a handful of almonds to your snack — zero GI, great nutrition.",
  "Drink a glass of warm water with methi seeds tonight.",
  "Try eating your vegetables first, then protein, then carbs.",
  "Get 7-8 hours of sleep — poor sleep raises blood sugar.",
  "Take the stairs today instead of the elevator.",
  "Avoid eating after 8 PM for better glucose control.",
];

export const emergencySteps = [
  { icon: 'water_drop', title: 'Drink water immediately', description: 'Stay hydrated to help your kidneys flush out excess sugar. Drink 2-3 glasses.' },
  { icon: 'directions_walk', title: 'Light walking (10 min)', description: 'A gentle stroll can help lower glucose levels safely. Avoid intense exercise.' },
  { icon: 'block', title: 'Avoid all carbs right now', description: 'No sugars, rice, bread, or fruits until levels stabilize below 200.' },
  { icon: 'medication', title: 'Take prescribed medication', description: 'If your doctor has prescribed insulin or tablets for high sugar, take as directed.' },
  { icon: 'call', title: 'Call your doctor if >350', description: 'If sugar stays above 350 mg/dL for more than 2 hours, seek medical help.' },
];
