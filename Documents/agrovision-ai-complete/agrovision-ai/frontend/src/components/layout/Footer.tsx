'use client';

import Link from 'next/link';
import { Leaf, Github, Twitter, Linkedin, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-primary-500/10 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-primary-500/10 border border-primary-500/30 flex items-center justify-center">
                <Leaf size={16} className="text-primary-400" />
              </div>
              <span className="font-display font-bold">
                <span className="text-primary-400">Agro</span>
                <span className="text-white">Vision</span>
                <span className="text-accent-400 text-xs ml-1 font-mono">AI</span>
              </span>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
              Revolutionizing Indian agriculture with AI-powered tools for disease detection, smart recommendations, and real-time analytics.
            </p>
            <div className="flex items-center gap-3 mt-4">
              {[
                { icon: <Github size={16} />, href: 'https://github.com' },
                { icon: <Twitter size={16} />, href: '#' },
                { icon: <Linkedin size={16} />, href: '#' },
                { icon: <Mail size={16} />, href: 'mailto:hello@agrovision.ai' },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg glass border border-white/5 flex items-center justify-center text-gray-500 hover:text-primary-400 hover:border-primary-500/30 transition-all"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {[
            {
              title: 'Platform',
              links: [
                { label: 'Disease Detection', href: '/detect' },
                { label: 'Crop Recommendation', href: '/recommend' },
                { label: 'Weather AI', href: '/weather' },
                { label: 'AI Chatbot', href: '/chatbot' },
                { label: 'Analytics', href: '/dashboard' },
              ],
            },
            {
              title: 'Community',
              links: [
                { label: 'Farmer Forum', href: '/community' },
                { label: 'Marketplace', href: '/marketplace' },
                { label: 'Scholarships', href: '#' },
                { label: 'Government Schemes', href: '#' },
              ],
            },
            {
              title: 'Developers',
              links: [
                { label: 'API Docs', href: '/docs/api' },
                { label: 'GitHub', href: 'https://github.com' },
                { label: 'ML Models', href: '#' },
                { label: 'IoT Integration', href: '#' },
              ],
            },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-4">{col.title}</h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm text-gray-500 hover:text-primary-300 transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/5 pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-600">
            © {new Date().getFullYear()} AgroVision AI. Built for Indian Farmers 🌾
          </p>
          <div className="flex items-center gap-4">
            <Link href="#" className="text-xs text-gray-600 hover:text-gray-400 transition-colors">Privacy Policy</Link>
            <Link href="#" className="text-xs text-gray-600 hover:text-gray-400 transition-colors">Terms of Service</Link>
            <Link href="#" className="text-xs text-gray-600 hover:text-gray-400 transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
