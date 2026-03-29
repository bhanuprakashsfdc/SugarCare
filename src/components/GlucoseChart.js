'use client';

import { useId } from 'react';

export default function GlucoseChart({ data, height = 200 }) {
  const uniqueId = useId();
  const gradientId = `chartGradient-${uniqueId}`;

  if (!data || data.length === 0) return null;

  const maxVal = Math.max(...data.map(d => d.level));
  const minVal = Math.min(...data.map(d => d.level));
  const range = maxVal - minVal || 1;
  const padding = 20;
  const width = 400;
  const chartHeight = height - padding * 2;

  const points = data.map((d, i) => {
    const x = padding + (i / (data.length - 1)) * (width - padding * 2);
    const y = padding + (1 - (d.level - minVal) / range) * chartHeight;
    return { x, y, ...d };
  });

  const pathD = points.map((p, i) => {
    if (i === 0) return `M${p.x},${p.y}`;
    const prev = points[i - 1];
    const cpx1 = prev.x + (p.x - prev.x) / 3;
    const cpx2 = p.x - (p.x - prev.x) / 3;
    return `C${cpx1},${prev.y} ${cpx2},${p.y} ${p.x},${p.y}`;
  }).join(' ');

  const areaD = `${pathD} L${points[points.length - 1].x},${height - padding} L${points[0].x},${height - padding} Z`;

  const normalLineY = padding + (1 - (100 - minVal) / range) * chartHeight;
  const highLineY = padding + (1 - (200 - minVal) / range) * chartHeight;

  return (
    <div className="w-full" role="img" aria-label={`Glucose trend chart showing levels from ${minVal} to ${maxVal} mg/dL`}>
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full" style={{ height }}>
        <defs>
          <linearGradient id={gradientId} x1="0%" x2="0%" y1="0%" y2="100%">
            <stop offset="0%" stopColor="#22c55e" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
          </linearGradient>
        </defs>

        {minVal <= 100 && maxVal >= 100 && (
          <g>
            <line x1={padding} y1={normalLineY} x2={width - padding} y2={normalLineY} stroke="#22c55e" strokeWidth="1" strokeDasharray="4,4" opacity="0.3" />
            <text x={width - padding + 4} y={normalLineY + 4} fill="#22c55e" fontSize="8" opacity="0.6">100</text>
          </g>
        )}
        {maxVal >= 200 && (
          <g>
            <line x1={padding} y1={highLineY} x2={width - padding} y2={highLineY} stroke="#ff8b7c" strokeWidth="1" strokeDasharray="4,4" opacity="0.3" />
            <text x={width - padding + 4} y={highLineY + 4} fill="#9e4036" fontSize="8" opacity="0.6">200</text>
          </g>
        )}

        <path d={areaD} fill={`url(#${gradientId})`} />
        <path d={pathD} fill="none" stroke="#006e2f" strokeWidth="3" strokeLinecap="round" />

        {points.map((p, i) => (
          <g key={i}>
            {i === points.length - 1 ? (
              <g>
                <circle cx={p.x} cy={p.y} r="8" fill="#22c55e" opacity="0.2">
                  <animate attributeName="r" values="8;14;8" dur="2s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.2;0;0.2" dur="2s" repeatCount="indefinite" />
                </circle>
                <circle cx={p.x} cy={p.y} r="5" fill="#22c55e" />
              </g>
            ) : (
              <circle cx={p.x} cy={p.y} r="3" fill="#ffffff" stroke="#006e2f" strokeWidth="1.5" />
            )}
          </g>
        ))}

        {data.length > 0 && (
          <g>
            {points.filter((_, i) => i % Math.max(1, Math.floor(points.length / 6)) === 0 || i === points.length - 1).map((p, i) => (
              <text key={i} x={p.x} y={height - 4} fill="#6d7b6c" fontSize="7" textAnchor="middle" fontFamily="Inter">{p.date}</text>
            ))}
          </g>
        )}
      </svg>
    </div>
  );
}
