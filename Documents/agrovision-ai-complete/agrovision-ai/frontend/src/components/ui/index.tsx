'use client';

import { forwardRef } from 'react';

// ─── Card ─────────────────────────────────────────────────
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  animated?: boolean;
  glow?: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(({
  animated = false, glow = false, className = '', children, ...props
}, ref) => (
  <div
    ref={ref}
    className={`card-dark ${animated ? 'animated-border' : ''} ${glow ? 'glow-green' : ''} ${className}`}
    {...props}
  >
    {children}
  </div>
));
Card.displayName = 'Card';

// ─── Badge ────────────────────────────────────────────────
type BadgeVariant = 'green' | 'yellow' | 'blue' | 'red' | 'purple' | 'gray';
interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
}

const badgeVariants: Record<BadgeVariant, string> = {
  green: 'bg-primary-500/10 text-primary-400 border-primary-500/20',
  yellow: 'bg-accent-500/10 text-accent-400 border-accent-500/20',
  blue: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  red: 'bg-red-500/10 text-red-400 border-red-500/20',
  purple: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  gray: 'bg-gray-500/10 text-gray-400 border-gray-500/20',
};

export function Badge({ variant = 'green', children, className = '' }: BadgeProps) {
  return (
    <span className={`inline-flex items-center text-xs px-2.5 py-1 rounded-full border font-medium ${badgeVariants[variant]} ${className}`}>
      {children}
    </span>
  );
}

// ─── Input ────────────────────────────────────────────────
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({
  label, error, icon, className = '', ...props
}, ref) => (
  <div className="space-y-1.5">
    {label && <label className="text-xs text-gray-500 block">{label}</label>}
    <div className="relative">
      {icon && <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600">{icon}</span>}
      <input
        ref={ref}
        className={`w-full bg-dark-600 border rounded-xl py-2.5 text-sm text-white focus:border-primary-500/50 focus:outline-none placeholder-gray-700 transition-colors
          ${icon ? 'pl-9 pr-4' : 'px-4'}
          ${error ? 'border-red-500/40' : 'border-white/5'}
          ${className}`}
        {...props}
      />
    </div>
    {error && <p className="text-xs text-red-400">{error}</p>}
  </div>
));
Input.displayName = 'Input';

// ─── Select ───────────────────────────────────────────────
interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: { value: string; label: string }[];
  error?: string;
}

export function Select({ label, options, error, className = '', ...props }: SelectProps) {
  return (
    <div className="space-y-1.5">
      {label && <label className="text-xs text-gray-500 block">{label}</label>}
      <select
        className={`w-full bg-dark-600 border border-white/5 rounded-xl px-4 py-2.5 text-sm text-white focus:border-primary-500/50 focus:outline-none ${className}`}
        {...props}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}

// ─── Spinner ──────────────────────────────────────────────
export function Spinner({ size = 32 }: { size?: number }) {
  return (
    <div
      className="rounded-full border-2 border-primary-500/20 border-t-primary-400 animate-spin"
      style={{ width: size, height: size }}
    />
  );
}

// ─── Stat Card ────────────────────────────────────────────
interface StatCardProps {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
  change?: string;
  color?: string;
  bgColor?: string;
}

export function StatCard({ label, value, icon, change, color = 'text-primary-400', bgColor = 'bg-primary-500/10' }: StatCardProps) {
  return (
    <div className="card-dark">
      <div className="flex items-center justify-between mb-3">
        {icon && <div className={`w-9 h-9 rounded-lg ${bgColor} flex items-center justify-center ${color}`}>{icon}</div>}
        {change && <span className="text-xs text-gray-500 font-mono">{change}</span>}
      </div>
      <p className={`font-display text-2xl font-bold ${color}`}>{value}</p>
      <p className="text-xs text-gray-500 mt-1">{label}</p>
    </div>
  );
}
