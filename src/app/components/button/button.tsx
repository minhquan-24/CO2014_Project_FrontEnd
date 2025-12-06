'use client';

import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost';
  fullWidth?: boolean;
  disabled?: boolean;
  className?: string;
  icon?: React.ReactNode;
}

export default function Button({ 
  children, 
  onClick, 
  type = 'button',
  variant = 'primary',
  fullWidth = false,
  disabled = false,
  className = '',
  icon
}: ButtonProps) {

  const baseStyles = "relative flex items-center justify-center font-bold rounded-lg transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-70 active:scale-[0.98]";
  
  const sizeStyles = "py-3.5 px-6 text-base";

  const variants = {
    primary: "bg-gradient-to-r from-rose-500 to-rose-600 text-white hover:shadow-lg hover:from-rose-600 hover:to-rose-700 border border-transparent",
    secondary: "bg-white text-gray-800 border border-black hover:bg-gray-50 hover:shadow-sm",
    outline: "bg-transparent text-gray-700 border border-gray-400 hover:border-black hover:text-black",
    danger: "bg-red-500 text-white hover:bg-red-600",
    ghost: "bg-transparent text-gray-600 hover:bg-gray-100 hover:text-gray-900"
  };

  return (
    <button 
      type={type}
      onClick={onClick} 
      disabled={disabled}
      className={`
        ${baseStyles} 
        ${sizeStyles}
        ${variants[variant]} 
        ${fullWidth ? 'w-full' : ''} 
        ${className}
      `}
    >
      {disabled && (
        <span className="absolute left-4">
          <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </span>
      )}

      {icon && <span className="mr-2">{icon}</span>}

      {children}
    </button>
  );
}