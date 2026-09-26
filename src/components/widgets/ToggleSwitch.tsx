import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';

export interface ToggleSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  description?: string;
  disabled?: boolean;
  size?: 'sm' | 'md';
  variant?: 'neon-green' | 'neon-orange' | 'cyan';
  statusLabels?: {
    active: string;
    inactive: string;
  };
  className?: string;
}

export const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  checked,
  onChange,
  label,
  description,
  disabled = false,
  size = 'md',
  variant = 'neon-green',
  statusLabels,
  className,
}) => {
  const isSm = size === 'sm';

  const trackWidth = isSm ? 'w-9 h-5' : 'w-11 h-6';
  const thumbSize = isSm ? 'w-3.5 h-3.5' : 'w-4 h-4';
  const translateDistance = isSm ? (checked ? 16 : 3) : (checked ? 22 : 4);

  const variantMap = {
    'neon-green': {
      activeTrack: 'bg-primary-neon/20 border-primary-neon',
      activeThumb: 'bg-primary-neon shadow-[0_0_10px_#39FF14]',
      badgeColor: 'text-primary-neon',
    },
    'neon-orange': {
      activeTrack: 'bg-secondary-neon/20 border-secondary-neon',
      activeThumb: 'bg-secondary-neon shadow-[0_0_10px_#FF5F1F]',
      badgeColor: 'text-secondary-neon',
    },
    cyan: {
      activeTrack: 'bg-tertiary-neon/20 border-tertiary-neon',
      activeThumb: 'bg-tertiary-neon shadow-[0_0_10px_#00F0FF]',
      badgeColor: 'text-tertiary-neon',
    },
  };

  const currentVariant = variantMap[variant];

  return (
    <div
      className={cn(
        'flex items-center justify-between gap-4 select-none',
        disabled && 'opacity-40 cursor-not-allowed',
        className
      )}
    >
      {(label || description) && (
        <div className="flex flex-col">
          {label && (
            <span className="font-mono text-xs font-semibold text-white tracking-wide">
              {label}
            </span>
          )}
          {description && (
            <span className="font-sans text-[11px] text-tactical-muted">
              {description}
            </span>
          )}
        </div>
      )}

      <div className="flex items-center gap-2">
        {statusLabels && (
          <span
            className={cn(
              'font-mono text-[10px] uppercase tracking-wider',
              checked ? currentVariant.badgeColor : 'text-tactical-dim'
            )}
          >
            {checked ? statusLabels.active : statusLabels.inactive}
          </span>
        )}

        <button
          type="button"
          role="switch"
          aria-checked={checked}
          disabled={disabled}
          onClick={() => !disabled && onChange(!checked)}
          className={cn(
            'relative inline-flex items-center rounded-full border transition-colors duration-200 cursor-pointer focus:outline-none focus:ring-1 focus:ring-primary-neon/50',
            trackWidth,
            checked
              ? currentVariant.activeTrack
              : 'bg-[#181818] border-white/10 hover:border-white/20'
          )}
        >
          <motion.span
            animate={{ x: translateDistance }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            className={cn(
              'inline-block rounded-full transition-shadow duration-200',
              thumbSize,
              checked
                ? currentVariant.activeThumb
                : 'bg-tactical-muted'
            )}
          />
        </button>
      </div>
    </div>
  );
};
