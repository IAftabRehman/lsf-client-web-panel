import React, { useState, forwardRef } from 'react';
import { cn } from '@/utils/cn';
import { Eye, EyeOff } from 'lucide-react';

export interface SecureInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  icon?: React.ReactNode;
  isPassword?: boolean;
  monospaced?: boolean;
}

export const SecureInput = forwardRef<HTMLInputElement, SecureInputProps>(
  (
    {
      label,
      error,
      helperText,
      icon,
      isPassword = false,
      monospaced = false,
      className,
      type = 'text',
      id,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const inputId = id || (label ? `input-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);

    const resolvedType = isPassword ? (showPassword ? 'text' : 'password') : type;

    return (
      <div className="w-full flex flex-col space-y-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="flex items-center justify-between text-xs font-mono uppercase tracking-wider text-tactical-muted"
          >
            <span>{label}</span>
            {props.required && (
              <span className="text-secondary-neon text-[10px]">*REQUIRED</span>
            )}
          </label>
        )}

        <div className="relative flex items-center">
          {icon && (
            <div className="absolute left-3 text-tactical-muted flex items-center pointer-events-none">
              {icon}
            </div>
          )}

          <input
            id={inputId}
            ref={ref}
            type={resolvedType}
            className={cn(
              'w-full bg-[#0a0a0a] border rounded px-3.5 py-2.5 text-sm text-white placeholder-tactical-dim transition-all duration-200 outline-none',
              icon ? 'pl-10' : 'pl-3.5',
              isPassword ? 'pr-10' : 'pr-3.5',
              monospaced && 'font-mono tracking-wider',
              error
                ? 'border-secondary-neon shadow-[0_0_8px_rgba(255,95,31,0.3)] focus:border-secondary-neon'
                : 'border-white/10 hover:border-white/20 focus:border-primary-neon focus:shadow-[0_0_10px_rgba(57,255,20,0.25)]',
              className
            )}
            {...props}
          />

          {isPassword && (
            <button
              type="button"
              tabIndex={-1}
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 text-tactical-muted hover:text-white transition-colors focus:outline-none"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          )}
        </div>

        {error && (
          <p className="text-xs font-mono text-secondary-neon flex items-center gap-1 mt-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary-neon" />
            {error}
          </p>
        )}

        {!error && helperText && (
          <p className="text-[11px] font-mono text-tactical-dim">{helperText}</p>
        )}
      </div>
    );
  }
);

SecureInput.displayName = 'SecureInput';
