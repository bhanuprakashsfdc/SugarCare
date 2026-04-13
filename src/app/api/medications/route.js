import { medications } from '@/data/healthData';

function generateId() {
  return `med-log-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

export async function GET() {
  const now = new Date();
  const todayStr = now.toISOString().split('T')[0];

  const schedule = medications.map(med => {
    const nextTiming = med.timing.find(t => {
      const [h, m] = t.split(':').map(Number);
      const timingDate = new Date(now);
      timingDate.setHours(h, m, 0, 0);
      return timingDate > now;
    });

    return {
      ...med,
      todayLog: med.timing.map(t => ({
        time: t,
        taken: false,
        takenAt: null,
      })),
      nextDose: nextTiming || med.timing[0],
      isOverdue: !nextTiming && med.timing.every(t => {
        const [h, m] = t.split(':').map(Number);
        const timingDate = new Date(now);
        timingDate.setHours(h, m, 0, 0);
        return timingDate < now;
      }),
    };
  });

  return Response.json({
    success: true,
    data: schedule,
    date: todayStr,
    summary: {
      total: medications.reduce((acc, m) => acc + m.timing.length, 0),
      taken: 0,
      pending: medications.reduce((acc, m) => acc + m.timing.length, 0),
    },
  });
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { medicationId, time, taken } = body;

    const log = {
      id: generateId(),
      medicationId,
      time,
      taken,
      timestamp: new Date().toISOString(),
    };

    return Response.json({ success: true, log }, { status: 201 });
  } catch {
    return Response.json({ success: false, error: 'Invalid request' }, { status: 400 });
  }
}
