import React from 'react';
import { cn } from '@/utils/cn';

interface LsfShieldLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  withGlow?: boolean;
}

export const LsfShieldLogo: React.FC<LsfShieldLogoProps> = ({
  className,
  size = 'md',
  showText = true,
  withGlow = true,
}) => {
  const sizeMap = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10',
    xl: 'w-14 h-14',
  };

  return (
    <div className={cn('flex items-center gap-3 select-none', className)}>
      <div className="relative flex items-center justify-center">
        {/* Ambient Glow */}
        {withGlow && (
          <div
            className={cn(
              'absolute inset-0 rounded-full blur-md opacity-75 bg-primary-neon/30',
              sizeMap[size]
            )}
          />
        )}
        
        {/* Vector SVG Shield */}
        <svg
          viewBox="0 0 100 120"
          className={cn('relative z-10 transition-transform duration-300 hover:scale-105', sizeMap[size])}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Outer Chamfered Shield */}
          <path
            d="M50 4L90 20V56C90 85 50 114 50 114C50 114 10 85 10 56V20L50 4Z"
            stroke="currentColor"
            className="text-primary-neon"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Inner Cyber Armor Mesh */}
          <path
            d="M50 16L78 28V52C78 74 50 96 50 96C50 96 22 74 22 52V28L50 16Z"
            fill="#121212"
            stroke="rgba(255, 255, 255, 0.2)"
            strokeWidth="2"
          />

          {/* Core Central Crest (Stylized LSF Emblem) */}
          <path
            d="M38 38V76H62"
            stroke="currentColor"
            className="text-primary-neon"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M48 56H60"
            stroke="currentColor"
            className="text-secondary-neon"
            strokeWidth="4"
            strokeLinecap="round"
          />

          {/* Crosshair / HUD focal elements */}
          <circle cx="50" cy="56" r="3" fill="#00F0FF" />
          <line x1="50" y1="26" x2="50" y2="32" stroke="#00F0FF" strokeWidth="2" />
          <line x1="50" y1="80" x2="50" y2="86" stroke="#00F0FF" strokeWidth="2" />
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5 font-bold leading-tight text-white font-sans text-base">
            <span className="text-emerald-400 font-bold">LSF</span>
            <span>Security</span>
          </div>
          <span className="text-[11px] text-gray-400 font-sans">
            Personal Protection Services
          </span>
        </div>
      )}
    </div>
  );
};
