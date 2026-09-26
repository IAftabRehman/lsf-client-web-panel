import React from 'react';
import { cn } from '@/utils/cn';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'secure' | 'alert' | 'critical' | 'cyan' | 'muted';
  size?: 'sm' | 'md';
  pulse?: boolean;
  icon?: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'secure',
  size = 'md',
  pulse = true,
  icon,
  className,
}) => {
  const sizeStyles = {
    sm: 'text-[9px] px-2 py-0.5 gap-1',
    md: 'text-[11px] px-2.5 py-1 gap-1.5',
  };

  const variantStyles = {
    secure: {
      container: 'bg-primary-dark/40 text-primary-neon border-primary-neon/40 shadow-sm',
      dot: 'bg-primary-neon shadow-[0_0_6px_#39FF14]',
    },
    alert: {
      container: 'bg-secondary-dark/40 text-secondary-neon border-secondary-neon/60 shadow-sm',
      dot: 'bg-secondary-neon shadow-[0_0_6px_#FF5F1F]',
    },
    critical: {
      container: 'bg-red-950/60 text-red-400 border-red-500/70 shadow-sm',
      dot: 'bg-red-500 shadow-[0_0_6px_#EF4444]',
    },
    cyan: {
      container: 'bg-tertiary-dark/40 text-tertiary-neon border-tertiary-neon/50 shadow-sm',
      dot: 'bg-tertiary-neon shadow-[0_0_6px_#00F0FF]',
    },
    muted: {
      container: 'bg-[#181818] text-tactical-muted border-white/10',
      dot: 'bg-tactical-muted',
    },
  };

  const currentVariant = variantStyles[variant];

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full font-mono font-medium tracking-wider uppercase border select-none',
        sizeStyles[size],
        currentVariant.container,
        className
      )}
    >
      {pulse && (
        <span className="relative flex h-2 w-2 shrink-0">
          <span
            className={cn(
              'animate-ping absolute inline-flex h-full w-full rounded-full opacity-75',
              currentVariant.dot
            )}
          />
          <span
            className={cn(
              'relative inline-flex rounded-full h-2 w-2',
              currentVariant.dot
            )}
          />
        </span>
      )}

      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
};
