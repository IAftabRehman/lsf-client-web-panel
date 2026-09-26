import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/utils/cn';

export interface NeonButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'tertiary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isPulse?: boolean;
  isLoading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
}

export const NeonButton: React.FC<NeonButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isPulse = false,
  isLoading = false,
  icon,
  iconPosition = 'left',
  fullWidth = false,
  className,
  disabled,
  ...props
}) => {
  const baseStyles =
    'relative inline-flex items-center justify-center font-mono font-semibold tracking-wider uppercase transition-colors duration-200 select-none cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 overflow-hidden';

  const sizeStyles = {
    sm: 'text-xs px-3 py-1.5 rounded-sm gap-1.5',
    md: 'text-xs px-4 py-2 rounded gap-2',
    lg: 'text-sm px-6 py-3 rounded-md gap-2.5',
  };

  const variantStyles = {
    primary:
      'bg-primary-neon text-black font-bold shadow-neon-green-sm hover:shadow-neon-green hover:bg-[#32e012] border border-primary-neon',
    secondary:
      'bg-secondary-dark/40 text-secondary-neon border border-secondary-neon/70 shadow-sm hover:shadow-neon-orange hover:bg-secondary-dark/70',
    tertiary:
      'bg-tertiary-dark/30 text-tertiary-neon border border-tertiary-neon/70 hover:shadow-neon-cyan hover:bg-tertiary-dark/60',
    ghost:
      'bg-transparent text-tactical-muted border border-white/10 hover:text-white hover:border-white/30 hover:bg-white/5',
    danger:
      'bg-red-950/60 text-red-400 border border-red-500/80 hover:bg-red-900/80 hover:shadow-[0_0_15px_rgba(239,68,68,0.5)]',
  };

  const pulseAnimation = isPulse
    ? {
        boxShadow: [
          '0 0 4px rgba(255, 95, 31, 0.4)',
          '0 0 20px rgba(255, 95, 31, 0.8)',
          '0 0 4px rgba(255, 95, 31, 0.4)',
        ],
        transition: {
          duration: 1.8,
          repeat: Infinity,
          ease: 'easeInOut',
        },
      }
    : {};

  return (
    <motion.button
      whileHover={disabled || isLoading ? undefined : { scale: 1.02 }}
      whileTap={disabled || isLoading ? undefined : { scale: 0.98 }}
      animate={pulseAnimation}
      disabled={disabled || isLoading}
      className={cn(
        baseStyles,
        sizeStyles[size],
        variantStyles[variant],
        fullWidth && 'w-full',
        className
      )}
      {...props}
    >
      {/* Loading tactical indicator */}
      {isLoading && (
        <svg
          className="animate-spin h-4 w-4 mr-2 text-current"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8H4z"
          />
        </svg>
      )}

      {!isLoading && icon && iconPosition === 'left' && (
        <span className="inline-flex shrink-0">{icon}</span>
      )}

      <span>{children}</span>

      {!isLoading && icon && iconPosition === 'right' && (
        <span className="inline-flex shrink-0">{icon}</span>
      )}
    </motion.button>
  );
};
