'use client';
import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, Zap } from 'lucide-react';

const FAQS = [
  { q: 'How accurate is the crop disease detection?', a: 'Our EfficientNet-B4 model achieves 98.7% accuracy on the PlantVillage + custom Indian crops dataset with 87 disease classes across 200+ crop varieties.' },
  { q: 'Which languages does the AI chatbot support?', a: 'The chatbot supports Hindi, Marathi, Kannada, Tamil, Telugu, Punjabi, Bengali, Gujarati, English, and Odia through multilingual NLP models.' },
  { q: 'How does the weather prediction work?', a: 'We use LSTM neural networks trained on 10 years of IMD data combined with real-time OpenWeatherMap API to predict rainfall, drought risks, and severe weather up to 14 days ahead.' },
  { q: 'Is the platform free for farmers?', a: 'Yes! The basic plan with disease detection, weather, and crop recommendations is completely free. Advanced analytics and IoT integration require a premium subscription.' },
  { q: 'Can I use it offline?', a: 'Yes, the platform is built as a Progressive Web App (PWA) with offline-first support for disease detection using cached models and local data sync.' },
  { q: 'How do I integrate IoT sensors?', a: 'We provide REST APIs and MQTT support for common sensors (DHT22, soil moisture, NPK sensors). See our IoT integration guide in documentation.' },
];

export function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="py-24 relative">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <span className="badge-green">FAQ</span>
          <h2 className="font-display text-4xl font-bold mt-4 text-white">Common Questions</h2>
        </div>
        <div className="space-y-3">
          {FAQS.map((faq, i) => (
            <div key={i} className="card-dark cursor-pointer" onClick={() => setOpen(open === i ? null : i)}>
              <div className="flex items-center justify-between gap-4">
                <h3 className="font-semibold text-white text-sm">{faq.q}</h3>
                <ChevronDown
                  size={18}
                  className={`text-primary-400 flex-shrink-0 transition-transform ${open === i ? 'rotate-180' : ''}`}
                />
              </div>
              {open === i && (
                <p className="text-gray-400 text-sm mt-3 pt-3 border-t border-white/5 leading-relaxed">{faq.a}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CTASection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-900/30 via-transparent to-accent-900/20" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl" />
      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <div className="animated-border p-1 rounded-3xl">
          <div className="card-dark rounded-[22px] py-12 px-8">
            <span className="badge-green mb-4 inline-block">START FOR FREE</span>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-white mb-4">
              Ready to Transform Your Farm?
            </h2>
            <p className="text-gray-400 text-lg mb-8 max-w-lg mx-auto">
              Join 52,000+ farmers already using AgroVision AI. No credit card required.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register" className="btn-primary flex items-center justify-center gap-2 text-base px-8 py-4">
                <Zap size={18} />
                Start Free — No Credit Card
              </Link>
              <Link href="/detect" className="btn-outline flex items-center justify-center gap-2 text-base px-8 py-4">
                Try Disease Detection
              </Link>
            </div>
            <p className="text-xs text-gray-600 mt-6">Free plan includes 50 analyses/month · No setup required · Works on mobile</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FAQSection;
