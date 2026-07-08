'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import { ArrowRight, Activity, Thermometer, Droplets, Wind } from 'lucide-react';

const PARTICLES = Array.from({ length: 50 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 3 + 1,
  duration: Math.random() * 8 + 4,
  delay: Math.random() * 4,
}));

const TYPING_TEXTS = [
  'Artificial Intelligence',
  'Deep Learning Models',
  'Computer Vision',
  'Precision Agriculture',
  'Smart Farming',
];

export default function HeroSection() {
  const [typingIndex, setTypingIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  // Typing animation
  useEffect(() => {
    const current = TYPING_TEXTS[typingIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && displayText === current) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayText === '') {
      setIsDeleting(false);
      setTypingIndex((i) => (i + 1) % TYPING_TEXTS.length);
    } else {
      timeout = setTimeout(() => {
        setDisplayText(
          isDeleting
            ? current.slice(0, displayText.length - 1)
            : current.slice(0, displayText.length + 1)
        );
      }, isDeleting ? 40 : 80);
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, typingIndex]);

  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden">
      {/* Animated mesh background */}
      <div className="absolute inset-0 bg-mesh-gradient" />
      
      {/* Grid overlay */}
      <div className="absolute inset-0 grid-bg opacity-30" />

      {/* Floating particles */}
      {PARTICLES.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-primary-400 opacity-20"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animation: `float ${p.duration}s ease-in-out infinite`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}

      {/* Radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary-500/5 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div ref={ref} className={`space-y-8 ${inView ? 'animate-slide-up' : 'opacity-0'}`}>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary-500/20">
              <span className="w-2 h-2 rounded-full bg-primary-400 animate-pulse" />
              <span className="text-xs font-mono text-primary-300 tracking-wider">AI-POWERED AGRICULTURE PLATFORM v2.0</span>
            </div>

            {/* Headline */}
            <div className="space-y-2">
              <h1 className="font-display text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
                <span className="text-white">Revolutionizing</span>
                <br />
                <span className="text-white">Agriculture with</span>
                <br />
                <span className="text-primary-400 glow-text relative">
                  {displayText}
                  <span className="animate-pulse text-primary-300">|</span>
                </span>
              </h1>
              <p className="text-gray-400 text-lg max-w-xl leading-relaxed mt-4">
                AgroVision AI combines cutting-edge deep learning, computer vision, and real-time data analytics to help farmers maximize yields, detect crop diseases instantly, and make data-driven decisions.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <Link href="/detect" className="btn-primary flex items-center gap-2 text-base group">
                Detect Crop Disease
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/recommend" className="btn-outline flex items-center gap-2 text-base">
                Smart Recommendation
              </Link>
            </div>

            {/* Quick action pills */}
            <div className="flex flex-wrap gap-2">
              {[
                { label: 'Live Weather', href: '/weather', icon: <Thermometer size={13} /> },
                { label: 'AI Assistant', href: '/chatbot', icon: <Activity size={13} /> },
                { label: 'Analytics', href: '/dashboard', icon: <Wind size={13} /> },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-gray-400 hover:text-primary-300 glass hover:border-primary-500/30 border border-transparent transition-all"
                >
                  <span className="text-primary-500">{item.icon}</span>
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Right — Stats + Live Data cards */}
          <div className="hidden lg:block relative">
            {/* Main card */}
            <div className="animated-border">
              <div className="card-dark space-y-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-primary-400 tracking-widest">LIVE FIELD ANALYTICS</span>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary-400 animate-pulse" />
                    <span className="text-xs text-gray-500">Real-time</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: 'Disease Detections Today', value: 1284, unit: '', color: 'text-primary-400' },
                    { label: 'Model Accuracy', value: 98.7, unit: '%', color: 'text-accent-400' },
                    { label: 'Farmers Active', value: 52340, unit: '', color: 'text-primary-400' },
                    { label: 'Crops Monitored', value: 189, unit: 'k', color: 'text-accent-400' },
                  ].map((stat) => (
                    <div key={stat.label} className="p-4 rounded-xl bg-dark-600/50 border border-white/5">
                      <p className="text-xs text-gray-500 mb-1">{stat.label}</p>
                      <p className={`font-display text-2xl font-bold ${stat.color}`}>
                        {inView && (
                          <CountUp end={stat.value} duration={2.5} decimals={stat.unit === '%' ? 1 : 0} />
                        )}
                        <span className="text-sm">{stat.unit}</span>
                      </p>
                    </div>
                  ))}
                </div>

                {/* Weather mini strip */}
                <div className="p-4 rounded-xl border border-primary-500/10 bg-primary-500/5">
                  <p className="text-xs font-mono text-gray-500 mb-3">CURRENT CONDITIONS — PUNE, MH</p>
                  <div className="flex items-center justify-between">
                    {[
                      { icon: <Thermometer size={14} />, label: 'Temp', value: '31°C' },
                      { icon: <Droplets size={14} />, label: 'Humidity', value: '68%' },
                      { icon: <Wind size={14} />, label: 'Wind', value: '12 km/h' },
                      { icon: <Activity size={14} />, label: 'UV Index', value: '7' },
                    ].map((item) => (
                      <div key={item.label} className="text-center">
                        <div className="flex items-center justify-center text-primary-400 mb-1">{item.icon}</div>
                        <p className="data-value text-sm">{item.value}</p>
                        <p className="text-xs text-gray-600">{item.label}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Disease alert */}
                <div className="flex items-center gap-3 p-3 rounded-lg border border-yellow-500/20 bg-yellow-500/5">
                  <div className="w-8 h-8 rounded-lg bg-yellow-500/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-yellow-400 text-sm">⚠</span>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-yellow-300">Blight Alert — Nashik Region</p>
                    <p className="text-xs text-gray-500">AI detected 87% probability of late blight in tomato crops</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating badges */}
            <div className="absolute -top-6 -right-6 glass border border-primary-500/20 rounded-2xl px-4 py-2.5 animate-float">
              <p className="text-xs text-gray-400">Model Accuracy</p>
              <p className="font-display text-xl font-bold text-primary-400">98.7%</p>
            </div>
            <div className="absolute -bottom-6 -left-6 glass border border-accent-500/20 rounded-2xl px-4 py-2.5 animate-float" style={{ animationDelay: '2s' }}>
              <p className="text-xs text-gray-400">Crops Supported</p>
              <p className="font-display text-xl font-bold text-accent-400">200+</p>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <span className="text-xs font-mono text-gray-600">SCROLL</span>
          <div className="w-0.5 h-8 bg-gradient-to-b from-primary-500/50 to-transparent rounded" />
        </div>
      </div>
    </section>
  );
}
