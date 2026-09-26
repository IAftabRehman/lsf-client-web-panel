import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/utils/cn';

export interface GlassCardProps extends Omit<HTMLMotionProps<'div'>, 'title'> {
  title?: React.ReactNode;
  subtitle?: string;
  badge?: React.ReactNode;
  action?: React.ReactNode;
  variant?: 'default' | 'elevated' | 'active' | 'alert' | 'critical';
  glow?: boolean;
  withCorners?: boolean;
  ledColor?: 'green' | 'orange' | 'cyan' | 'red' | 'none';
  children: React.ReactNode;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  title,
  subtitle,
  badge,
  action,
  variant = 'default',
  glow = false,
  withCorners = false,
  ledColor = 'none',
  children,
  className,
  ...props
}) => {
  const variantStyles = {
    default:
      'bg-charcoal/80 border-white/10 hover:border-white/20',
    elevated:
      'bg-charcoal-light/90 border-white/15 shadow-tactical-card',
    active:
      'bg-charcoal-light/90 border-primary-neon/40 shadow-neon-green-sm',
    alert:
      'bg-[#19100a]/80 border-secondary-neon/60 shadow-neon-orange animate-alert-pulse',
    critical:
      'bg-[#1e0a0a]/90 border-red-500/80 shadow-[0_0_20px_rgba(239,68,68,0.3)] animate-alert-pulse',
  };

  const ledColorMap = {
    green: 'bg-primary-neon shadow-[0_0_8px_#39FF14]',
    orange: 'bg-secondary-neon shadow-[0_0_8px_#FF5F1F]',
    cyan: 'bg-tertiary-neon shadow-[0_0_8px_#00F0FF]',
    red: 'bg-red-500 shadow-[0_0_8px_#EF4444]',
    none: '',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={cn(
        'relative rounded-md border backdrop-blur-md transition-all duration-300 overflow-hidden',
        variantStyles[variant],
        glow && 'hover:shadow-tactical-hover',
        className
      )}
      {...props}
    >
      {/* Optional Tactical Chamfer Corner Accents */}
      {withCorners && (
        <>
          <span className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-primary-neon/60 pointer-events-none" />
          <span className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-primary-neon/60 pointer-events-none" />
          <span className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-primary-neon/60 pointer-events-none" />
          <span className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-primary-neon/60 pointer-events-none" />
        </>
      )}

      {/* Card Header */}
      {(title || subtitle || badge || action) && (
        <div className="flex items-center justify-between border-b border-white/5 px-5 py-3.5 bg-black/30">
          <div className="flex items-center gap-2.5 min-w-0">
            {ledColor !== 'none' && (
              <span
                className={cn(
                  'w-2 h-2 rounded-full shrink-0',
                  ledColorMap[ledColor]
                )}
              />
            )}
            <div className="min-w-0">
              {title && (
                <div className="font-headline font-semibold text-sm text-white tracking-wide truncate">
                  {title}
                </div>
              )}
              {subtitle && (
                <div className="font-mono text-[10px] uppercase tracking-wider text-tactical-muted truncate">
                  {subtitle}
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {badge && <div>{badge}</div>}
            {action && <div>{action}</div>}
          </div>
        </div>
      )}

      {/* Card Body */}
      <div className="p-5">{children}</div>
    </motion.div>
  );
};
