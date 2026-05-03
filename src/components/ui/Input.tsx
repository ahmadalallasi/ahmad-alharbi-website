import { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, className = '', id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="text-xs font-light tracking-widest text-ink/70 uppercase"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={[
            'w-full px-4 py-3 bg-transparent border text-sm font-light',
            'transition-colors duration-200 outline-none',
            'placeholder:text-muted/60',
            error
              ? 'border-red-400 focus:border-red-500'
              : 'border-border focus:border-teal',
            className,
          ].join(' ')}
          {...props}
        />
        {error && (
          <p className="text-xs text-red-500 font-light">{error}</p>
        )}
        {hint && !error && (
          <p className="text-xs text-muted font-light">{hint}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
