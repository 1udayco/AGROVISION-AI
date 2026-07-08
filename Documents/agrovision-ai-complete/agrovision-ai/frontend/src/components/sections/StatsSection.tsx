'use client';

import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';

const STATS = [
  { value: 98.7, suffix: '%', label: 'Disease Detection Accuracy', desc: 'CNN + EfficientNet ensemble' },
  { value: 52000, suffix: '+', label: 'Active Farmers', desc: 'Across 15 Indian states' },
  { value: 200, suffix: '+', label: 'Crop Varieties', desc: 'Supported in detection' },
  { value: 1.2, suffix: 'M+', label: 'Analyses Done', desc: 'Since platform launch' },
];

export default function StatsSection() {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });

  return (
    <section className="py-16 relative">
      <div className="absolute inset-0 bg-primary-900/10" />
      <div ref={ref} className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {STATS.map((s, i) => (
            <div
              key={s.label}
              className="text-center p-6 rounded-2xl glass border border-primary-500/10 hover:border-primary-500/25 transition-all"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <p className="font-display text-4xl font-bold text-primary-400 glow-text">
                {inView && (
                  <CountUp
                    end={s.value}
                    duration={2}
                    decimals={s.value % 1 !== 0 ? 1 : 0}
                  />
                )}
                <span className="text-2xl">{s.suffix}</span>
              </p>
              <p className="text-white font-semibold text-sm mt-2">{s.label}</p>
              <p className="text-gray-600 text-xs mt-1">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
