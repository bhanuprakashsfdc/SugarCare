'use client';

import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, LineChart, Line, CartesianGrid } from 'recharts';
import { useSugar } from '@/context/SugarContext';
import { useMemo } from 'react';
import { glucoseTargets, patientProfile } from '@/data/healthData';

export default function AnalyticsDashboard() {
  const { sugarHistory, currentSugar, projectionData } = useSugar();
  
  const chartData = useMemo(() => {
    return sugarHistory.slice(-30).map((entry, index) => ({
      date: entry.date,
      fasting: entry.fasting,
      postMeal: entry.postMeal,
    }));
  }, [sugarHistory]);

  const weeklyAvgData = useMemo(() => {
    const weeks = [];
    for (let i = 0; i < 4; i++) {
      const weekData = sugarHistory.slice(-(i+1)*7, -i*7 || undefined);
      if (weekData.length > 0) {
        const avgFasting = weekData.reduce((sum, entry) => sum + entry.fasting, 0) / weekData.length;
        const avgPostMeal = weekData.reduce((sum, entry) => sum + entry.postMeal, 0) / weekData.length;
        weeks.push({
          week: `Week ${4-i}`,
          fasting: Math.round(avgFasting),
          postMeal: Math.round(avgPostMeal),
        });
      }
    }
    return weeks.reverse();
  }, [sugarHistory]);

  const cholesterolData = useMemo(() => {
    return [
      { name: 'Total Cholesterol', value: patientProfile.cholesterol.total.current, max: 240 },
      { name: 'LDL Cholesterol', value: patientProfile.cholesterol.ldl.current, max: 190 },
      { name: 'HDL Cholesterol', value: patientProfile.cholesterol.hdl.current, max: 60, reverse: true },
      { name: 'Triglycerides', value: patientProfile.cholesterol.triglycerides.current, max: 150 },
    ];
  }, [patientProfile]);

  const getStatusColor = (value, target, reverse = false) => {
    if (reverse) {
      // For HDL, higher is better
      if (value >= target) return '#10b981'; // green
      if (value >= target * 0.8) return '#f59e0b'; // yellow
      return '#ef4444'; // red
    } else {
      // For others, lower is better
      if (value <= target) return '#10b981'; // green
      if (value <= target * 1.2) return '#f59e0b'; // yellow
      return '#ef4444'; // red
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-surface-container-lowest rounded-xl p-6 shadow-sm border border-outline-variant/10">
        <h3 className="font-headline font-bold text-xl mb-4 flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">monitoring</span>
          Glucose Trends (Last 30 Days)
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" tick={{ fontSize: 12 }} />
            <YAxis 
              label={{ value: 'Glucose (mg/dL)', angle: -90, position: 'insideLeft' }}
              domain={[0, Math.max(500, Math.max(...chartData.map(d => Math.max(d.fasting, d.postMeal)) * 1.1))]} 
              tick={{ fontSize: 12 }}
            />
            <Tooltip 
              formatter={(value) => `${value} mg/dL`}
              separator={': '}
              contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '4px', padding: '8px' }}
            />
            <Legend verticalAlign="top" height={36} />
            <Line type="monotone" dataKey="fasting" stroke="#006e2f" strokeWidth={2} dot={{ r: 4 }} />
            <Line type="monotone" dataKey="postMeal" stroke="#dc2626" strokeWidth={2} dot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-surface-container-lowest rounded-xl p-6 shadow-sm border border-outline-variant/10">
          <h3 className="font-headline font-bold text-lg mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">show_chart</span>
            Weekly Averages
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={weeklyAvgData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="week" tick={{ fontSize: 12 }} />
              <YAxis 
                label={{ value: 'Glucose (mg/dL)', angle: -90, position: 'insideLeft' }}
                domain={[0, 300]}
                tick={{ fontSize: 12 }}
              />
              <Tooltip 
                formatter={(value) => `${value} mg/dL`}
                separator={': '}
                contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '4px', padding: '8px' }}
              />
              <Legend verticalAlign="top" height={36} />
              <Bar dataKey="fasting" barSize="20" fill="#006e2f" radius={[6, 6, 0, 0]} />
              <Bar dataKey="postMeal" barSize="20" fill="#dc2626" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-surface-container-lowest rounded-xl p-6 shadow-sm border border-outline-variant/10">
          <h3 className="font-headline font-bold text-lg mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">favorite</span>
            Cholesterol Levels
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={cholesterolData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis 
                label={{ value: 'Level (mg/dL)', angle: -90, position: 'insideLeft' }}
                domain={[0, 250]}
                tick={{ fontSize: 12 }}
              />
              <Tooltip 
                formatter={(value) => `${value} mg/dL`}
                separator={': '}
                contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '4px', padding: '8px' }}
              />
              {cholesterolData.map((entry, index) => (
                <Bar 
                  key={index} 
                  dataKey="value" 
                  barSize="20" 
                  fill={getStatusColor(entry.value, entry.max, entry.reverse)}
                  radius={[6, 6, 0, 0]}
                  data={[{ name: entry.name, value: entry.value }]}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-surface-container-lowest rounded-xl p-6 shadow-sm border border-outline-variant/10">
          <h3 className="font-headline font-bold text-lg mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">timeline</span>
            3-Month Projection
          </h3>
          <div className="space-y-4">
            {[
              { label: 'Current', value: currentSugar, target: glucoseTargets.fasting.max, color: '#dc2626' },
              { label: 'Month 1', value: projectionData[30]?.level || 0, target: glucoseTargets.fasting.max, color: '#f59e0b' },
              { label: 'Month 2', value: projectionData[60]?.level || 0, target: glucoseTargets.fasting.max, color: '#f59e0b' },
              { label: 'Month 3', value: projectionData[90]?.level || 0, target: glucoseTargets.fasting.max, color: '#10b981' },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between px-4 py-3 bg-surface-container-low rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[${item.color}]/20 flex items-center justify-center">
                    <span className="material-symbols-outlined text-[${item.color}]">{index === 0 ? 'monitor_heart' : index === 3 ? 'check_circle' : 'timer'}</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-on-surface">{item.label}</p>
                    <p className="text-xs text-on-surface-variant">Target: {'<'} 130 mg/dL</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-2xl text-on-surface">{item.value}</p>
                  <p className="text-xs text-on-surface-variant">mg/dL</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
