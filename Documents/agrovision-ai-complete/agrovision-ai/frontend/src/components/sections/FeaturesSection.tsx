'use client';

import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import {
  Microscope, Cloud, MessageCircle, BarChart2,
  Leaf, ShieldCheck, Zap, Globe2, ArrowRight
} from 'lucide-react';

const FEATURES = [
  {
    icon: <Microscope size={28} />,
    title: 'AI Disease Detection',
    desc: 'CNN + ResNet50 models analyze crop images in seconds. Grad-CAM heatmaps visualize infection zones with 98.7% accuracy.',
    tags: ['CNN', 'ResNet50', 'OpenCV'],
    href: '/detect',
    color: 'green',
  },
  {
    icon: <Leaf size={28} />,
    title: 'Smart Crop Recommendation',
    desc: 'XGBoost + Random Forest ensemble analyzes soil, climate, and market data to recommend optimal crops for maximum yield.',
    tags: ['XGBoost', 'RandomForest', 'GIS'],
    href: '/recommend',
    color: 'yellow',
  },
  {
    icon: <Cloud size={28} />,
    title: 'AI Weather Forecasting',
    desc: 'LSTM neural networks predict rainfall, drought, and flood risks up to 14 days ahead with real-time OpenWeather integration.',
    tags: ['LSTM', 'TimeSeriesAI', 'NASA'],
    href: '/weather',
    color: 'blue',
  },
  {
    icon: <MessageCircle size={28} />,
    title: 'Multilingual AI Chatbot',
    desc: 'NLP-powered farming assistant using Gemini API supporting Hindi, Marathi, Kannada and 10+ regional languages with voice input.',
    tags: ['Gemini', 'NLP', 'Voice AI'],
    href: '/chatbot',
    color: 'purple',
  },
  {
    icon: <BarChart2 size={28} />,
    title: 'Analytics Dashboard',
    desc: 'Real-time Supabase subscriptions deliver live disease maps, yield predictions, and IoT sensor data to interactive dashboards.',
    tags: ['Supabase RT', 'Charts', 'IoT'],
    href: '/dashboard',
    color: 'green',
  },
  {
    icon: <ShieldCheck size={28} />,
    title: 'Crop Insurance AI',
    desc: 'ML models assess risk based on satellite imagery, weather patterns, and historical data to recommend optimal insurance plans.',
    tags: ['Risk ML', 'Satellite', 'FinTech'],
    href: '/dashboard',
    color: 'yellow',
  },
  {
    icon: <Globe2 size={28} />,
    title: 'Satellite Monitoring',
    desc: 'NDVI analysis from NASA satellite data tracks crop health across entire regions with weekly automated reports.',
    tags: ['NDVI', 'NASA API', 'GIS'],
    href: '/dashboard',
    color: 'blue',
  },
  {
    icon: <Zap size={28} />,
    title: 'Smart Irrigation System',
    desc: 'IoT sensor integration with AI-optimized watering schedules saves 40% water usage while maintaining optimal soil moisture.',
    tags: ['IoT', 'AI Scheduler', 'Sensors'],
    href: '/dashboard',
    color: 'purple',
  },
];

const colorMap = {
  green: {
    icon: 'text-primary-400',
    bg: 'bg-primary-500/10',
    border: 'border-primary-500/20',
    tag: 'bg-primary-500/10 text-primary-400 border-primary-500/20',
    glow: 'hover:shadow-primary-500/10',
  },
  yellow: {
    icon: 'text-accent-400',
    bg: 'bg-accent-500/10',
    border: 'border-accent-500/20',
    tag: 'bg-accent-500/10 text-accent-400 border-accent-500/20',
    glow: 'hover:shadow-accent-500/10',
  },
  blue: {
    icon: 'text-blue-400',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/20',
    tag: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    glow: 'hover:shadow-blue-500/10',
  },
  purple: {
    icon: 'text-purple-400',
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/20',
    tag: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    glow: 'hover:shadow-purple-500/10',
  },
};

export default function FeaturesSection() {
  const { ref, inView } = useInView({ threshold: 0.05, triggerOnce: true });

  return (
    <section id="features" className="py-24 relative">
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div ref={ref} className={`text-center mb-16 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="badge-green">PLATFORM FEATURES</span>
          <h2 className="font-display text-4xl lg:text-5xl font-bold mt-4 text-white">
            Everything a Modern Farmer Needs
          </h2>
          <p className="text-gray-400 text-lg mt-4 max-w-2xl mx-auto">
            From AI disease detection to satellite monitoring — 15+ intelligent tools in a single platform
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {FEATURES.map((f, i) => {
            const c = colorMap[f.color as keyof typeof colorMap];
            return (
              <Link
                key={f.title}
                href={f.href}
                className={`card-dark group cursor-pointer transition-all duration-500 hover:shadow-xl ${c.glow}`}
                style={{ transitionDelay: inView ? `${i * 60}ms` : '0ms' }}
              >
                <div className={`w-12 h-12 rounded-xl ${c.bg} flex items-center justify-center ${c.icon} mb-4 group-hover:scale-110 transition-transform`}>
                  {f.icon}
                </div>
                <h3 className="font-display font-bold text-white text-lg mb-2 group-hover:text-primary-300 transition-colors">{f.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">{f.desc}</p>
                <div className="flex flex-wrap gap-1 mb-3">
                  {f.tags.map((tag) => (
                    <span key={tag} className={`text-xs px-2 py-0.5 rounded-full border ${c.tag}`}>
                      {tag}
                    </span>
                  ))}
                </div>
                <div className={`flex items-center gap-1 text-xs font-medium ${c.icon} opacity-0 group-hover:opacity-100 transition-all`}>
                  Explore feature <ArrowRight size={12} />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
