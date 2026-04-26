import * as React from 'react';
import { cn } from '../lib/cn';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
};

const variants = {
  primary: 'bg-cyan-400 text-slate-950 hover:bg-cyan-300',
  secondary: 'bg-sky-100 text-slate-950 hover:bg-sky-200',
  ghost: 'bg-transparent text-slate-800 hover:bg-slate-100',
  danger: 'bg-red-600 text-white hover:bg-red-700',
};

export function Button({ className, variant = 'primary', ...props }: ButtonProps) {
  return (
    <button
      className={cn('inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold transition disabled:opacity-50', variants[variant], className)}
      {...props}
    />
  );
}
