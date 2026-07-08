'use client';

import { forwardRef } from 'react';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

const variantClasses = {
  primary: 'btn-primary',
  outline: 'btn-outline',
  ghost: 'text-gray-400 hover:text-primary-300 hover:bg-primary-500/10 rounded-xl px-4 py-2 transition-all',
  danger: 'border border-red-500/20 text-red-400 hover:bg-red-500/10 rounded-xl px-4 py-2 transition-all',
};

const sizeClasses = {
  sm: 'text-xs px-3 py-1.5',
  md: 'text-sm px-4 py-2.5',
  lg: 'text-base px-6 py-3.5',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  variant = 'primary',
  size = 'md',
  loading = false,
  icon,
  iconPosition = 'left',
  children,
  className = '',
  disabled,
  ...props
}, ref) => {
  return (
    <button
      ref={ref}
      disabled={disabled || loading}
      className={`flex items-center justify-center gap-2 font-medium transition-all ${variantClasses[variant]} ${sizeClasses[size]} disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      {...props}
    >
      {loading ? (
        <Loader2 size={16} className="animate-spin" />
      ) : (
        iconPosition === 'left' && icon
      )}
      {children}
      {!loading && iconPosition === 'right' && icon}
    </button>
  );
});

Button.displayName = 'Button';
