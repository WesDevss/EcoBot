import React from 'react';
import { useApp } from '../../context/AppContext';

function polarToCartesian(cx, cy, r, angleDeg) {
  const angleRad = (Math.PI * (angleDeg - 180)) / 180;
  return {
    x: cx + r * Math.cos(angleRad),
    y: cy + r * Math.sin(angleRad),
  };
}

function describeArc(cx, cy, r, startAngle, endAngle) {
  const start = polarToCartesian(cx, cy, r, endAngle);
  const end = polarToCartesian(cx, cy, r, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';
  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`;
}

function SustainabilityScoreChart({ score = 0 }) {
  const { theme } = useApp();
  const isDark = theme === 'dark';
  const normalizedScore = Math.min(100, Math.max(0, score));
  const cx = 140;
  const cy = 130;
  const radius = 100;
  const stroke = 18;

  // Segmentos: vermelho, laranja, amarelo, verde-claro, verde
  const segments = [
    { start: 180, end: 216, color: '#ef4444' },
    { start: 216, end: 252, color: '#f97316' },
    { start: 252, end: 288, color: '#eab308' },
    { start: 288, end: 324, color: '#84cc16' },
    { start: 324, end: 360, color: '#22c55e' },
  ];

  const scoreAngle = 180 + (normalizedScore / 100) * 180;

  const getScoreColor = (v) => {
    if (v >= 80) return '#22c55e';
    if (v >= 60) return '#84cc16';
    if (v >= 40) return '#eab308';
    if (v >= 20) return '#f97316';
    return '#ef4444';
  };

  // Marcadores
  const ticks = [0, 25, 50, 75, 100];

  return (
    <div style={{ width: '100%', maxWidth: 320, margin: '0 auto' }}>
      <svg viewBox="0 0 280 175" style={{ width: '100%', height: 'auto', display: 'block' }}>
        {/* Fundo cinza */}
        <path
          d={describeArc(cx, cy, radius, 180, 360)}
          fill="none"
          stroke={isDark ? '#374151' : '#e5e7eb'}
          strokeWidth={stroke}
          strokeLinecap="round"
        />

        {/* Segmentos coloridos com gap */}
        {segments.map((seg, i) => (
          <path
            key={i}
            d={describeArc(cx, cy, radius, seg.start + 2, seg.end - 2)}
            fill="none"
            stroke={seg.color}
            strokeWidth={stroke}
            strokeLinecap="butt"
          />
        ))}

        {/* Marcadores de escala */}
        {ticks.map((t) => {
          const angle = 180 + (t / 100) * 180;
          const inner = polarToCartesian(cx, cy, radius - stroke / 2 - 6, angle);
          const outer = polarToCartesian(cx, cy, radius + stroke / 2 + 4, angle);
          return (
            <g key={t}>
              <line
                x1={inner.x}
                y1={inner.y}
                x2={outer.x}
                y2={outer.y}
                stroke={isDark ? '#6b7280' : '#9ca3af'}
                strokeWidth={2}
              />
              <text
                x={polarToCartesian(cx, cy, radius + 26, angle).x}
                y={polarToCartesian(cx, cy, radius + 26, angle).y}
                textAnchor="middle"
                dominantBaseline="central"
                fill={isDark ? '#9ca3af' : '#6b7280'}
                fontSize="12"
                fontWeight="600"
              >
                {t}
              </text>
            </g>
          );
        })}

        {/* Agulha */}
        <g>
          <circle cx={cx} cy={cy} r={6} fill={isDark ? '#f3f4f6' : '#374151'} />
          <line
            x1={cx}
            y1={cy}
            x2={polarToCartesian(cx, cy, radius - 10, scoreAngle).x}
            y2={polarToCartesian(cx, cy, radius - 10, scoreAngle).y}
            stroke={isDark ? '#f9fafb' : '#111827'}
            strokeWidth={3}
            strokeLinecap="round"
          />
          <circle
            cx={polarToCartesian(cx, cy, radius - 10, scoreAngle).x}
            cy={polarToCartesian(cx, cy, radius - 10, scoreAngle).y}
            r={4}
            fill={getScoreColor(normalizedScore)}
          />
        </g>
      </svg>

      {/* Texto central abaixo do SVG */}
      <div style={{ textAlign: 'center', marginTop: -4 }}>
        <div
          style={{
            fontSize: '40px',
            fontWeight: 800,
            color: getScoreColor(normalizedScore),
            lineHeight: 1,
          }}
        >
          {normalizedScore}
        </div>
        <div
          style={{
            fontSize: '12px',
            fontWeight: 500,
            color: isDark ? '#9ca3af' : '#6b7280',
            marginTop: 6,
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
          }}
        >
          Índice ESG Atual
        </div>
      </div>
    </div>
  );
}

export default SustainabilityScoreChart;
