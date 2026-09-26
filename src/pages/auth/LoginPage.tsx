import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAuthStore } from '@/store/useAuthStore';
import { LsfShieldLogo } from '@/components/common/LsfShieldLogo';
import { ToggleSwitch } from '@/components/widgets/ToggleSwitch';
import { Shield, Lock, KeyRound, UserCheck, ShieldCheck } from 'lucide-react';

const loginSchema = z.object({
  badgeOrEmail: z.string().min(3, 'Badge number or verified email required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  twoFactorPin: z.string().optional(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuthStore();
  const [useHardwareKey, setUseHardwareKey] = useState(false);
  const [selectedRole, setSelectedRole] = useState<'ADMIN' | 'CLIENT'>('ADMIN');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      badgeOrEmail: 'LSF-TAC-9901',
      password: 'password123',
      twoFactorPin: '994821',
    },
  });

  const handleRoleSelect = (role: 'ADMIN' | 'CLIENT') => {
    setSelectedRole(role);
    if (role === 'ADMIN') {
      setValue('badgeOrEmail', 'LSF-TAC-9901');
    } else {
      setValue('badgeOrEmail', 'e.rostova@aegis-corp.global');
    }
  };

  const onSubmit = async () => {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    login(selectedRole);
    setIsSubmitting(false);

    const from = (location.state as any)?.from?.pathname;
    if (from) {
      navigate(from, { replace: true });
    } else {
      navigate(selectedRole === 'ADMIN' ? '/admin/dashboard' : '/client/dashboard', {
        replace: true,
      });
    }
  };

  return (
    <div className="min-h-screen w-full bg-slate-900 flex flex-col items-center justify-center p-4 font-sans">
      <div className="w-full max-w-md space-y-6">
        {/* Brand Header */}
        <div className="flex flex-col items-center text-center">
          <LsfShieldLogo size="xl" showText={false} withGlow={false} />
          <h1 className="text-2xl font-bold text-white mt-3 font-sans">
            LSF Security
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Personal Protection & Defense Portal
          </p>
        </div>

        {/* 2-Column Role Selection Pills */}
        <div className="grid grid-cols-2 gap-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
          <button
            type="button"
            onClick={() => handleRoleSelect('ADMIN')}
            className={`py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
              selectedRole === 'ADMIN'
                ? 'bg-emerald-500 text-black shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <ShieldCheck size={15} />
            Admin Command
          </button>

          <button
            type="button"
            onClick={() => handleRoleSelect('CLIENT')}
            className={`py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
              selectedRole === 'CLIENT'
                ? 'bg-amber-400 text-black shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <UserCheck size={15} />
            Client Portal
          </button>
        </div>

        {/* Clean Login Box */}
        <div className="p-6 rounded-2xl bg-slate-800/95 border border-slate-700/80 shadow-2xl space-y-5">
          <div>
            <h2 className="text-base font-bold text-white">
              {selectedRole === 'ADMIN' ? 'Sign in to Command Center' : 'Sign in to Client Account'}
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Enter your credentials to access the secure portal.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-xs">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Operator ID or Email Address
              </label>
              <div className="relative">
                <Shield size={16} className="absolute left-3 top-3 text-slate-400" />
                <input
                  type="text"
                  placeholder="e.g. LSF-TAC-9901"
                  {...register('badgeOrEmail')}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-9 pr-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400"
                />
              </div>
              {errors.badgeOrEmail && (
                <p className="text-xs text-amber-400 mt-1">{errors.badgeOrEmail.message}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-3 text-slate-400" />
                <input
                  type="password"
                  placeholder="••••••••••••"
                  {...register('password')}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-9 pr-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400"
                />
              </div>
              {errors.password && (
                <p className="text-xs text-amber-400 mt-1">{errors.password.message}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Two-Factor Verification Code
              </label>
              <div className="relative">
                <KeyRound size={16} className="absolute left-3 top-3 text-slate-400" />
                <input
                  type="text"
                  placeholder="6-digit code"
                  {...register('twoFactorPin')}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-9 pr-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400"
                />
              </div>
            </div>

            <div className="pt-2 border-t border-slate-700">
              <ToggleSwitch
                checked={useHardwareKey}
                onChange={setUseHardwareKey}
                label="Hardware Key Challenge (FIDO2)"
                description="Require physical USB authentication"
                variant={selectedRole === 'ADMIN' ? 'neon-green' : 'neon-orange'}
                size="sm"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2.5 px-4 text-xs font-bold uppercase tracking-wider text-black bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors shadow-sm disabled:opacity-50"
              >
                {isSubmitting ? 'Authenticating...' : 'Sign In Now'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
