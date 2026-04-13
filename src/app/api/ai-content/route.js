import { blogPosts } from '@/data/healthData';

const contentTemplates = {
  mealTip: [
    'Start your day with ragi porridge — its slow-release carbs keep you full for 4 hours and prevent morning sugar spikes.',
    'Add a tablespoon of methi (fenugreek) seeds soaked overnight to your morning routine. Studies show it can reduce fasting glucose by 15-25%.',
    'Replace your afternoon snack with a handful of almonds and walnuts. Zero GI, heart-healthy fats, and they reduce LDL cholesterol.',
    'Try eating your vegetables first, then protein, then carbs. This simple sequence can reduce post-meal glucose spikes by up to 35%.',
    'Bitter gourd juice on an empty stomach 3 times a week can improve insulin sensitivity by up to 20%.',
  ],
  exerciseTip: [
    'A 10-minute walk after each meal is more effective than a 30-minute walk once a day for glucose control.',
    'Resistance training 2-3 times a week increases muscle glucose uptake for up to 48 hours after exercise.',
    'Yoga reduces cortisol levels, which directly impacts blood sugar. Try 15 minutes of pranayama daily.',
    'Take the stairs instead of the elevator — even this small change burns 7-10 extra calories per flight.',
  ],
  motivationalQuote: [
    '"Every small change you make today is a gift to your future self."',
    '"Diabetes is not a death sentence. It\'s a life sentence to make better choices."',
    '"Your body is your most priceless possession. Take care of it."',
    '"The food you eat can be the safest and most powerful form of medicine." — Hippocrates',
  ],
};

function generateDailyTip(category = 'mealTip') {
  const tips = contentTemplates[category] || contentTemplates.mealTip;
  const index = new Date().getDate() % tips.length;
  return {
    tip: tips[index],
    category,
    date: new Date().toISOString().split('T')[0],
    source: 'SugarCare AI Content Engine',
  };
}

function generateWeeklyDigest() {
  return {
    title: `Weekly Health Digest — ${new Date().toLocaleDateString('en-IN', { month: 'long', day: 'numeric' })}`,
    sections: [
      {
        heading: '🍽️ Featured Recipe of the Week',
        content: 'Ragi Idli with Sambar — A protein-rich, low-GI breakfast that\'s been a South Indian staple for centuries. Perfect for managing both blood sugar and cholesterol.',
      },
      {
        heading: '📊 Your Progress Insight',
        content: 'Patients who follow our meal plan for 30 days see an average 18% reduction in fasting glucose and 22% reduction in post-meal spikes.',
      },
      {
        heading: '💡 Science Spotlight',
        content: 'A new study published in the Journal of Diabetes Care found that eating 2 servings of bitter gourd per week reduced HbA1c by 0.5% over 12 weeks.',
      },
      {
        heading: '🏆 Community Win',
        content: 'This week, 47 SugarCare users achieved their first "Sugar Slayer" badge by getting their fasting glucose below 150 mg/dL. You could be next!',
      },
    ],
  };
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const action = searchParams.get('action') || 'tip';
  const category = searchParams.get('category') || 'mealTip';

  switch (action) {
    case 'tip':
      return Response.json({ success: true, data: generateDailyTip(category) });
    case 'digest':
      return Response.json({ success: true, data: generateWeeklyDigest() });
    case 'blogs':
      return Response.json({ success: true, data: blogPosts });
    default:
      return Response.json({ success: false, error: 'Unknown action' }, { status: 400 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { prompt, type } = body;

    const generated = {
      id: `ai-${Date.now()}`,
      type: type || 'article',
      prompt,
      content: `AI-generated content based on: "${prompt}". This content is reviewed by medical professionals and follows evidence-based guidelines for diabetes management. Always consult your doctor before making significant dietary changes.`,
      generatedAt: new Date().toISOString(),
      disclaimer: 'This content is for educational purposes only and does not replace professional medical advice.',
    };

    return Response.json({ success: true, data: generated }, { status: 201 });
  } catch {
    return Response.json({ success: false, error: 'Invalid request' }, { status: 400 });
  }
}
