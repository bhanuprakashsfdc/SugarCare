import { glucoseTargets } from '@/data/healthData';

function generateId() {
  return `glu-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

function classifyReading(level, type) {
  const target = glucoseTargets[type === 'fasting' ? 'fasting' : 'postMeal'];
  if (!target) return { status: 'unknown', color: 'gray', alert: false };
  if (level < target.min) return { status: 'low', color: 'amber', alert: true, message: 'Below target range. Consider a small snack.' };
  if (level <= target.max) return { status: 'normal', color: 'green', alert: false };
  if (level <= target.max * 1.5) return { status: 'elevated', color: 'orange', alert: false, message: 'Slightly above target. Review recent meals.' };
  return { status: 'high', color: 'red', alert: true, message: 'Significantly elevated. Take corrective action.' };
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const days = parseInt(searchParams.get('days') || '30', 10);
  const mockData = generateMockReadings(days);
  return Response.json({ success: true, data: mockData, targets: glucoseTargets });
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { level, type, notes, mealType } = body;

    if (!level || !type) {
      return Response.json({ success: false, error: 'Level and type are required' }, { status: 400 });
    }

    const reading = {
      id: generateId(),
      level: parseFloat(level),
      type,
      mealType: mealType || null,
      notes: notes || '',
      timestamp: new Date().toISOString(),
      classification: classifyReading(parseFloat(level), type),
    };

    return Response.json({ success: true, reading }, { status: 201 });
  } catch {
    return Response.json({ success: false, error: 'Invalid request body' }, { status: 400 });
  }
}

function generateMockReadings(days) {
  const readings = [];
  const now = new Date();

  for (let i = days; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);

    const fastingBase = 335 - (i * 2.5) + (Math.random() * 30 - 15);
    const postMealBase = 450 - (i * 3.5) + (Math.random() * 40 - 20);

    readings.push({
      id: `glu-mock-${i}`,
      date: date.toISOString().split('T')[0],
      label: date.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' }),
      fasting: Math.round(Math.max(90, fastingBase)),
      postMeal: Math.round(Math.max(120, postMealBase)),
      postLunch: Math.round(Math.max(110, postMealBase - 30 + Math.random() * 20)),
      bedtime: Math.round(Math.max(100, fastingBase + 10 + Math.random() * 15)),
    });
  }

  return readings;
}
