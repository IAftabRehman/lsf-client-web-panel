import React from 'react';
import { LsfShieldLogo } from './LsfShieldLogo';

export const TacticalLoader: React.FC<{ message?: string }> = ({
  message = 'DECRYPTING TACTICAL HUD STREAM...',
}) => {
  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center space-y-4">
      <div className="relative">
        <LsfShieldLogo size="lg" showText={false} withGlow={true} />
        <span className="absolute -inset-2 rounded-full border border-primary-neon/40 animate-ping opacity-40 pointer-events-none" />
      </div>
      <div className="flex flex-col items-center space-y-1">
        <span className="font-mono text-xs tracking-widest text-primary-neon font-semibold animate-pulse">
          {message}
        </span>
        <span className="font-mono text-[10px] text-tactical-dim uppercase">
          LSF Security // Level-3 Clearance Active
        </span>
      </div>
    </div>
  );
};
