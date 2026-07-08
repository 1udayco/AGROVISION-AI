'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Leaf, BarChart3, Cloud, MessageSquare, Users,
  ShoppingBag, Menu, X, ChevronDown, Zap
} from 'lucide-react';

const navLinks = [
  { href: '/', label: 'Home' },
  {
    label: 'AI Tools',
    dropdown: [
      { href: '/detect', label: 'Crop Disease AI', icon: <Leaf size={16} /> },
      { href: '/recommend', label: 'Crop Recommendation', icon: <BarChart3 size={16} /> },
      { href: '/weather', label: 'Weather Dashboard', icon: <Cloud size={16} /> },
      { href: '/chatbot', label: 'AI Assistant', icon: <MessageSquare size={16} /> },
    ],
  },
  { href: '/dashboard', label: 'Analytics' },
  { href: '/community', label: 'Community' },
  { href: '/marketplace', label: 'Marketplace' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'py-3 glass-strong shadow-lg shadow-black/20'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="relative w-9 h-9 flex items-center justify-center rounded-xl bg-primary-500/10 border border-primary-500/30 group-hover:bg-primary-500/20 transition-all">
            <Leaf size={18} className="text-primary-400" />
            <div className="absolute inset-0 rounded-xl bg-primary-500/20 animate-pulse-glow opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <span className="font-display font-bold text-lg">
            <span className="text-primary-400">Agro</span>
            <span className="text-white">Vision</span>
            <span className="text-accent-400 text-xs ml-1 font-mono align-super">AI</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) =>
            link.dropdown ? (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => setActiveDropdown(link.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className="flex items-center gap-1 px-4 py-2 text-sm text-gray-300 hover:text-primary-300 rounded-lg hover:bg-primary-500/10 transition-all">
                  {link.label}
                  <ChevronDown size={14} className={`transition-transform ${activeDropdown === link.label ? 'rotate-180' : ''}`} />
                </button>
                {activeDropdown === link.label && (
                  <div className="absolute top-full left-0 mt-2 w-52 glass-strong rounded-xl overflow-hidden shadow-xl shadow-black/40 border border-primary-500/20">
                    {link.dropdown.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="flex items-center gap-3 px-4 py-3 text-sm text-gray-300 hover:text-primary-300 hover:bg-primary-500/10 transition-all"
                      >
                        <span className="text-primary-400">{item.icon}</span>
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href!}
                className={`px-4 py-2 text-sm rounded-lg transition-all ${
                  pathname === link.href
                    ? 'text-primary-300 bg-primary-500/10'
                    : 'text-gray-300 hover:text-primary-300 hover:bg-primary-500/10'
                }`}
              >
                {link.label}
              </Link>
            )
          )}
        </div>

        {/* CTA Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <Link href="/login" className="text-sm text-gray-300 hover:text-primary-300 transition-colors px-4 py-2">
            Sign In
          </Link>
          <Link
            href="/register"
            className="btn-primary text-sm flex items-center gap-2"
          >
            <Zap size={14} />
            Get Started Free
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-primary-500/10 transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={22} className="text-primary-400" /> : <Menu size={22} className="text-gray-300" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden glass-strong border-t border-primary-500/10 mt-2">
          <div className="px-4 py-3 space-y-1">
            {navLinks.map((link) =>
              link.dropdown ? (
                <div key={link.label}>
                  <p className="text-xs font-mono text-primary-500 uppercase tracking-widest px-3 pt-3 pb-1">{link.label}</p>
                  {link.dropdown.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-3 px-3 py-2.5 text-sm text-gray-300 hover:text-primary-300 rounded-lg hover:bg-primary-500/10"
                    >
                      <span className="text-primary-400">{item.icon}</span>
                      {item.label}
                    </Link>
                  ))}
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href!}
                  onClick={() => setMobileOpen(false)}
                  className="block px-3 py-2.5 text-sm text-gray-300 hover:text-primary-300 rounded-lg hover:bg-primary-500/10"
                >
                  {link.label}
                </Link>
              )
            )}
            <div className="pt-3 pb-1 space-y-2">
              <Link href="/login" onClick={() => setMobileOpen(false)} className="block text-center btn-outline text-sm">Sign In</Link>
              <Link href="/register" onClick={() => setMobileOpen(false)} className="block text-center btn-primary text-sm">Get Started Free</Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
