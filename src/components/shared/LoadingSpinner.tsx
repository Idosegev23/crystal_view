import { motion } from 'framer-motion';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  message?: string;
  color?: 'blue' | 'white' | 'gray';
  className?: string;
}

export default function LoadingSpinner({ 
  size = 'md', 
  message = 'טוען...',
  color = 'blue',
  className = ''
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  const colorClasses = {
    blue: 'border-blue-600 border-t-transparent',
    white: 'border-white border-t-transparent',
    gray: 'border-gray-600 border-t-transparent'
  };

  return (
    <div 
      className={`flex items-center justify-center space-x-2 ${className}`}
      role="status"
      aria-live="polite"
      aria-label={message}
    >
      <motion.div 
        className={`${sizeClasses[size]} border-2 ${colorClasses[color]} rounded-full`}
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear"
        }}
        aria-hidden="true"
      />
      <span className="sr-only">{message}</span>
      {message && (
        <span className="text-sm text-gray-600 mr-2" aria-hidden="true">
          {message}
        </span>
      )}
    </div>
  );
}
