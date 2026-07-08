'use client';

import { useInView } from 'react-intersection-observer';

const MODELS = [
  { name: 'EfficientNet-B4', task: 'Disease Detection', accuracy: 98.7, type: 'CNN', color: '#22c55e' },
  { name: 'ResNet50', task: 'Leaf Segmentation', accuracy: 96.3, type: 'CNN', color: '#4ade80' },
  { name: 'XGBoost Ensemble', task: 'Crop Recommendation', accuracy: 94.8, type: 'GBM', color: '#eab308' },
  { name: 'LSTM-128', task: 'Rain Prediction', accuracy: 91.2, type: 'RNN', color: '#3b82f6' },
  { name: 'Random Forest', task: 'Soil Analysis', accuracy: 93.5, type: 'Ensemble', color: '#a855f7' },
  { name: 'BERT Fine-tuned', task: 'Farming NLP', accuracy: 89.4, type: 'Transformer', color: '#f97316' },
];

export default function MLModelsSection() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 grid-bg opacity-15" />
      <div ref={ref} className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <span className="badge-green">AI/ML MODELS</span>
          <h2 className="font-display text-4xl font-bold mt-4 text-white">
            Production AI Models
          </h2>
          <p className="text-gray-400 mt-3 max-w-xl mx-auto">
            6 specialized models trained on Indian agricultural datasets
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {MODELS.map((m, i) => (
            <div
              key={m.name}
              className={`card-dark transition-all duration-500 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-display font-bold text-white">{m.name}</h3>
                  <p className="text-gray-500 text-sm">{m.task}</p>
                </div>
                <span
                  className="text-xs px-2 py-1 rounded-full font-mono border"
                  style={{
                    color: m.color,
                    borderColor: `${m.color}40`,
                    backgroundColor: `${m.color}15`,
                  }}
                >
                  {m.type}
                </span>
              </div>

              {/* Accuracy bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">Accuracy</span>
                  <span className="font-mono" style={{ color: m.color }}>{m.accuracy}%</span>
                </div>
                <div className="h-2 bg-dark-600 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-1000"
                    style={{
                      width: inView ? `${m.accuracy}%` : '0%',
                      backgroundColor: m.color,
                      boxShadow: `0 0 8px ${m.color}60`,
                      transitionDelay: `${i * 80 + 300}ms`,
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
