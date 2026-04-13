export const medications = [
  {
    id: 'med-1',
    name: 'Metformin 500mg',
    type: 'oral',
    dosage: '500mg',
    frequency: 'twice daily',
    timing: ['08:00', '20:00'],
    withFood: true,
    instructions: 'Take with meals to reduce stomach upset.',
    sideEffects: ['Nausea', 'Diarrhea', 'Metallic taste'],
    purpose: 'Reduces liver glucose production and improves insulin sensitivity.',
    color: 'primary',
  },
  {
    id: 'med-2',
    name: 'Glimepiride 2mg',
    type: 'oral',
    dosage: '2mg',
    frequency: 'once daily',
    timing: ['07:30'],
    withFood: true,
    instructions: 'Take 30 minutes before breakfast.',
    sideEffects: ['Hypoglycemia risk', 'Weight gain'],
    purpose: 'Stimulates insulin secretion from pancreas.',
    color: 'secondary',
  },
  {
    id: 'med-3',
    name: 'Atorvastatin 10mg',
    type: 'oral',
    dosage: '10mg',
    frequency: 'once daily',
    timing: ['21:00'],
    withFood: false,
    instructions: 'Take at bedtime for maximum cholesterol reduction.',
    sideEffects: ['Muscle pain', 'Liver enzyme elevation'],
    purpose: 'Lowers LDL cholesterol and reduces cardiovascular risk.',
    color: 'tertiary',
  },
  {
    id: 'med-4',
    name: 'Voglibose 0.3mg',
    type: 'oral',
    dosage: '0.3mg',
    frequency: 'thrice daily',
    timing: ['07:50', '12:50', '19:50'],
    withFood: true,
    instructions: 'Take just before each main meal.',
    sideEffects: ['Flatulence', 'Bloating'],
    purpose: 'Slows carbohydrate digestion to reduce post-meal glucose spikes.',
    color: 'primary',
  },
];

export const glucoseTargets = {
  fasting: { min: 70, max: 130, unit: 'mg/dL', label: 'Fasting' },
  postMeal: { min: 70, max: 180, unit: 'mg/dL', label: '2hr Post-Meal' },
  bedtime: { min: 100, max: 140, unit: 'mg/dL', label: 'Bedtime' },
  hba1c: { target: 7.0, unit: '%', label: 'HbA1c' },
};

export const patientProfile = {
  name: 'Patient',
  age: 45,
  location: 'Tirupati, Andhra Pradesh',
  diagnosis: 'Type 2 Diabetes',
  diagnosedDate: '2023-06-15',
  currentReadings: {
    fasting: 335,
    postMeal: 450,
    lastChecked: '2026-03-30',
  },
  cholesterol: {
    total: 248,
    ldl: 165,
    hdl: 38,
    triglycerides: 225,
    lastChecked: '2026-03-15',
    targets: {
      total: { current: 248, target: 200, unit: 'mg/dL' },
      ldl: { current: 165, target: 100, unit: 'mg/dL' },
      hdl: { current: 38, target: 50, unit: 'mg/dL' },
      triglycerides: { current: 225, target: 150, unit: 'mg/dL' },
    },
  },
  threeMonthGoals: {
    fastingTarget: 130,
    postMealTarget: 180,
    hba1cTarget: 7.0,
    weightTarget: 72,
    ldlTarget: 100,
  },
  allergies: [],
  dietaryPreference: 'non-vegetarian',
  activityLevel: 'moderate',
  bmi: 28.5,
  weight: 78,
  height: 166,
};

export const challenges = [
  {
    id: 'ch-1',
    title: '7-Day Sugar Detox',
    description: 'Eliminate all added sugars for 7 days. Track your progress and share your journey.',
    duration: 7,
    icon: '🏆',
    difficulty: 'medium',
    points: 500,
    participants: 234,
    category: 'diet',
    milestones: [
      { day: 1, title: 'Day 1 - The Start', reward: '🌱' },
      { day: 3, title: 'Day 3 - Cravings Peak', reward: '💪' },
      { day: 5, title: 'Day 5 - Finding Rhythm', reward: '⚡' },
      { day: 7, title: 'Day 7 - Champion!', reward: '🏆' },
    ],
  },
  {
    id: 'ch-2',
    title: '30-Day Walking Challenge',
    description: 'Walk at least 30 minutes every day for 30 days. Log your steps and see your glucose improve.',
    duration: 30,
    icon: '🚶',
    difficulty: 'easy',
    points: 1000,
    participants: 567,
    category: 'exercise',
    milestones: [
      { day: 7, title: 'Week 1 Warrior', reward: '🥾' },
      { day: 14, title: 'Halfway Hero', reward: '🏅' },
      { day: 21, title: 'Three-Week Thunder', reward: '⚡' },
      { day: 30, title: '30-Day Legend', reward: '👑' },
    ],
  },
  {
    id: 'ch-3',
    title: 'Millet Monday',
    description: 'Replace all grains with millets every Monday for 4 weeks. Discover the ancient superfood.',
    duration: 28,
    icon: '🌾',
    difficulty: 'easy',
    points: 300,
    participants: 189,
    category: 'diet',
    milestones: [
      { day: 7, title: 'First Millet Meal', reward: '🌾' },
      { day: 14, title: 'Millet Explorer', reward: '🗺️' },
      { day: 28, title: 'Millet Master', reward: '👨‍🍳' },
    ],
  },
  {
    id: 'ch-4',
    title: 'Glucose Guardian',
    description: 'Log your blood sugar at least twice daily for 14 days. Build the tracking habit.',
    duration: 14,
    icon: '📊',
    difficulty: 'easy',
    points: 400,
    participants: 412,
    category: 'monitoring',
    milestones: [
      { day: 3, title: 'Consistent Logger', reward: '📝' },
      { day: 7, title: 'Data Detective', reward: '🔍' },
      { day: 14, title: 'Glucose Guardian', reward: '🛡️' },
    ],
  },
  {
    id: 'ch-5',
    title: 'Bitter Gourd Champion',
    description: 'Include bitter gourd in your meals at least 3 times this week. Your pancreas will thank you.',
    duration: 7,
    icon: '🥒',
    difficulty: 'hard',
    points: 600,
    participants: 98,
    category: 'diet',
    milestones: [
      { day: 2, title: 'First Bitter Bite', reward: '😬' },
      { day: 5, title: 'Acquired Taste', reward: '😌' },
      { day: 7, title: 'Bitter Gourd Champion', reward: '🥇' },
    ],
  },
];

export const communityPosts = [
  {
    id: 'post-1',
    author: 'Ravi K.',
    location: 'Tirupati',
    avatar: '👨',
    title: 'My HbA1c dropped from 9.2 to 6.8 in 6 months!',
    content: 'Started following the SugarCare meal plan and walking 30 mins daily. The ragi idli recipe became my family\'s favorite. Key changes: replaced white rice with millet, added bitter gourd 3x/week, and never skipped morning walks.',
    likes: 234,
    replies: 45,
    tags: ['success-story', 'meal-plan', 'walking'],
    timestamp: '2026-03-28T14:30:00',
    verified: true,
  },
  {
    id: 'post-2',
    author: 'Lakshmi P.',
    location: 'Chennai',
    avatar: '👩',
    title: 'Best low-GI snacks for office workers?',
    content: 'I work 10-hour shifts and struggle with snacking. What are your go-to diabetic-friendly snacks that don\'t need refrigeration?',
    likes: 89,
    replies: 32,
    tags: ['question', 'snacks', 'work-life'],
    timestamp: '2026-03-29T09:15:00',
    verified: false,
  },
  {
    id: 'post-3',
    author: 'Dr. Suresh M.',
    location: 'Tirupati',
    avatar: '👨‍⚕️',
    title: 'Why walking after meals is more effective than before',
    content: 'Research shows that a 15-minute walk after meals can reduce glucose spikes by 22%. The muscles you use during walking actively absorb glucose from your blood, acting like a natural insulin. I recommend this to all my diabetic patients.',
    likes: 567,
    replies: 78,
    tags: ['expert-advice', 'exercise', 'science'],
    timestamp: '2026-03-27T16:00:00',
    verified: true,
  },
  {
    id: 'post-4',
    author: 'Krishna D.',
    location: 'Hyderabad',
    avatar: '👨',
    title: 'Telugu diabetic recipe: Pesarattu with upma',
    content: 'Sharing my grandmother\'s pesarattu recipe adapted for diabetes. Made with whole green moong, minimal oil, served with upma made from oats instead of rava. My fasting sugar dropped 40 points in 2 weeks!',
    likes: 156,
    replies: 23,
    tags: ['recipe', 'telugu', 'success-story'],
    timestamp: '2026-03-29T11:00:00',
    verified: false,
  },
];

export const expertQnA = [
  {
    id: 'qa-1',
    question: 'My fasting sugar is 335 mg/dL. Is this an emergency?',
    askedBy: 'Anonymous',
    answeredBy: 'Dr. Priya Reddy, Endocrinologist',
    answer: 'A fasting glucose of 335 mg/dL is severely elevated and requires immediate medical attention. Normal fasting is 70-100 mg/dL. At this level, you risk diabetic ketoacidosis. Please consult your doctor immediately. Meanwhile, drink plenty of water, avoid all carbohydrates, and take your prescribed medication. Light walking can help, but don\'t overexert. This level needs medication adjustment, likely insulin.',
    tags: ['emergency', 'high-glucose', 'medication'],
    timestamp: '2026-03-25T10:00:00',
    upvotes: 156,
    helpful: 89,
  },
  {
    id: 'qa-2',
    question: 'Which millet is best for diabetes in Andhra Pradesh?',
    askedBy: 'Ramesh T.',
    answeredBy: 'Dr. Anitha Rao, Nutritionist',
    answer: 'For Andhra Pradesh, the best millets for diabetes management are: 1) Ragi (Finger Millet) - highest calcium, lowest GI (30), 2) Korra (Foxtail Millet) - rich in iron, GI of 50, 3) Sama (Little Millet) - high fiber, GI of 52. I recommend rotating between these three. Ragi mudde for breakfast, korra biyyam for lunch, and sama for dinner gives variety while maintaining low glycemic load throughout the day.',
    tags: ['nutrition', 'millets', 'andhra'],
    timestamp: '2026-03-26T14:30:00',
    upvotes: 234,
    helpful: 178,
  },
  {
    id: 'qa-3',
    question: 'How to reduce cholesterol along with diabetes management?',
    askedBy: 'Venkat S.',
    answeredBy: 'Dr. Kumar Swamy, Cardiologist',
    answer: 'Managing both diabetes and cholesterol requires a dual approach: 1) Diet: Include oats (beta-glucan), almonds, garlic, and bitter gourd daily. Avoid fried foods and red meat. 2) Exercise: 150 min/week moderate activity. 3) Medications: Statins are safe with most diabetes medications. 4) Specific foods: Fenugreek seeds soaked overnight, flaxseeds, and fish 2-3x/week. Your LDL target should be <100 mg/dL with diabetes. With consistent effort, you can see 20-30% reduction in 3 months.',
    tags: ['cholesterol', 'heart-health', 'diet'],
    timestamp: '2026-03-27T09:00:00',
    upvotes: 189,
    helpful: 145,
  },
];

export const blogPosts = [
  {
    id: 'blog-1',
    title: 'The Tirupati Diabetic Diet: Local Foods That Heal',
    excerpt: 'Discover the traditional Tirupati and Rayalaseema foods that naturally manage blood sugar. From ragi mudde to usiri kaya, these ancient foods are your best allies.',
    content: `Living in Tirupati gives you access to some of the most diabetes-friendly foods in India. The Rayalaseema region has traditionally relied on millets, lentils, and bitter vegetables - all of which are excellent for blood sugar management.

**Ragi (Finger Millet): The Star Grain**
Ragi has been a staple in Tirupati for centuries. With a glycemic index of just 30, it releases glucose slowly into your bloodstream. One ragi mudde for lunch can keep you full for 4-5 hours without any sugar spike.

**Bitter Gourd (Kakarakaya): Nature's Insulin**
Every Telugu household knows about bitter gourd's medicinal properties. The compound charantin in bitter gourd works similarly to insulin, helping your cells absorb glucose more effectively.

**Curry Leaves: The Cholesterol Fighter**
Fresh curry leaves, easily available in Tirupati markets, contain compounds that reduce LDL cholesterol. Add 10-12 leaves to your morning tea or temper every dal with them.

**Local Market Guide**
- Tirupati Municipal Market: Best for fresh vegetables and greens
- Leela Mahal Center: Millets and organic produce
- Local farmers: Seasonal bitter gourd and drumstick

Start with one change this week - replace white rice with ragi for one meal.`,
    author: 'Dr. Anitha Rao',
    date: '2026-03-25',
    readTime: '6 min',
    category: 'nutrition',
    tags: ['tirupati', 'local-food', 'millets'],
    image: '🌾',
  },
  {
    id: 'blog-2',
    title: 'Understanding Your Numbers: Fasting 335, Post-Meal 450',
    excerpt: 'A detailed guide to what your current glucose readings mean, why they\'re dangerous, and a step-by-step plan to bring them to safe levels within 3 months.',
    content: `Your current readings of 335 mg/dL fasting and 450 mg/dL post-meal indicate poorly controlled diabetes that requires urgent intervention.

**What These Numbers Mean**
- Normal fasting: 70-100 mg/dL
- Your fasting: 335 mg/dL (3.3x normal)
- Normal post-meal: <140 mg/dL
- Your post-meal: 450 mg/dL (3.2x normal)

At these levels, your body is experiencing significant glucose toxicity, meaning high blood sugar itself damages your insulin-producing cells, creating a vicious cycle.

**The 3-Month Recovery Plan**

Month 1 (Target: Fasting <250, Post-meal <350):
- Strict medication adherence
- Zero white rice, sugar, maida
- Walk 20 mins after each meal
- Blood sugar monitoring 4x daily

Month 2 (Target: Fasting <180, Post-meal <250):
- Introduce millet-based meals
- Add bitter gourd 3x/week
- Increase walking to 30 mins
- Begin strength training 2x/week

Month 3 (Target: Fasting <130, Post-meal <180):
- Full SugarCare meal plan
- Regular exercise routine
- Cholesterol management foods
- HbA1c retest

**Warning Signs to Watch For**
- Blurred vision
- Excessive thirst
- Frequent urination
- Slow wound healing
- Numbness in extremities

If any of these worsen, consult your doctor immediately.`,
    author: 'Dr. Priya Reddy',
    date: '2026-03-20',
    readTime: '8 min',
    category: 'education',
    tags: ['glucose-management', 'recovery-plan', 'education'],
    image: '📊',
  },
  {
    id: 'blog-3',
    title: 'Cholesterol & Diabetes: The Deadly Duo and How to Beat It',
    excerpt: 'Why diabetes doubles your heart disease risk, and the specific foods, exercises, and habits that can reduce your cholesterol by 20-30% in 90 days.',
    content: `If you have diabetes, your risk of heart disease is 2-4 times higher than someone without diabetes. High cholesterol compounds this risk dramatically.

**The Connection**
High blood sugar damages blood vessel walls, making it easier for cholesterol to build up as plaque. This leads to atherosclerosis, heart attacks, and strokes.

**Your Cholesterol Numbers Explained**
- Total Cholesterol: Your 248 mg/dL (Target: <200)
- LDL (Bad): Your 165 mg/dL (Target: <100)
- HDL (Good): Your 38 mg/dL (Target: >50)
- Triglycerides: Your 225 mg/dL (Target: <150)

**Foods That Lower Cholesterol Naturally**

1. Oats: 3g of beta-glucan daily reduces LDL by 5-10%
2. Almonds: 30g daily lowers LDL by 5%
3. Garlic: 2-3 cloves daily reduces total cholesterol
4. Fish (Omega-3): 2-3 servings weekly raises HDL
5. Fenugreek: Soaked seeds reduce LDL and triglycerides

**The 90-Day Cholesterol Challenge**
- Week 1-4: Dietary changes (oats, almonds, fish)
- Week 5-8: Add daily exercise (30 min walking)
- Week 9-12: Full lifestyle integration

Expected results: 15-25% reduction in LDL, 10-15% increase in HDL.`,
    author: 'Dr. Kumar Swamy',
    date: '2026-03-18',
    readTime: '7 min',
    category: 'heart-health',
    tags: ['cholesterol', 'heart-health', 'prevention'],
    image: '❤️',
  },
];

export const achievementBadges = [
  { id: 'badge-1', name: 'First Reading', icon: '📝', description: 'Logged your first blood sugar reading', earned: true },
  { id: 'badge-2', name: '7-Day Streak', icon: '🔥', description: 'Maintained a 7-day logging streak', earned: true },
  { id: 'badge-3', name: 'Millet Master', icon: '🌾', description: 'Tried 5 different millet recipes', earned: false },
  { id: 'badge-4', name: 'Walking Warrior', icon: '🚶', description: 'Walked 30 minutes for 14 consecutive days', earned: false },
  { id: 'badge-5', name: 'Sugar Slayer', icon: '⚔️', description: 'Brought fasting sugar below 150 mg/dL', earned: false },
  { id: 'badge-6', name: 'Community Helper', icon: '🤝', description: 'Answered 10 community questions', earned: false },
  { id: 'badge-7', name: 'Recipe Explorer', icon: '👨‍🍳', description: 'Tried 10 different recipes', earned: false },
  { id: 'badge-8', name: '30-Day Champion', icon: '🏆', description: 'Completed a 30-day challenge', earned: false },
  { id: 'badge-9', name: 'Health Score 80+', icon: '💯', description: 'Achieved a health score above 80', earned: false },
  { id: 'badge-10', name: 'Cholesterol Crusher', icon: '❤️', description: 'Reduced LDL by 20%', earned: false },
];
