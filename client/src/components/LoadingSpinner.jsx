import React from 'react';
import { Compass } from 'lucide-react';

export const LoadingSpinner = ({ text = 'Loading your travel plans...' }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[300px] p-8">
      <div className="relative">
        <div className="w-14 h-14 rounded-2xl bg-ocean-50 text-ocean-600 flex items-center justify-center animate-bounce shadow-md">
          <Compass className="w-8 h-8 animate-spin" style={{ animationDuration: '4s' }} />
        </div>
      </div>
      <p className="mt-4 text-sm font-medium text-slate-500 animate-pulse">{text}</p>
    </div>
  );
};
