'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/sections/HeroSection';
import FeaturesSection from '@/components/sections/FeaturesSection';
import StatsSection from '@/components/sections/StatsSection';
import TechStackSection from '@/components/sections/TechStackSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import MLModelsSection from '@/components/sections/MLModelsSection';
import FAQSection from '@/components/sections/FAQSection';
import CTASection from '@/components/sections/CTASection';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-dark-900 overflow-hidden">
      <Navbar />
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <MLModelsSection />
      <TechStackSection />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
      <Footer />
    </main>
  );
}
