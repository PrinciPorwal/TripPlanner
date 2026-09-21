import React from 'react';
import { Compass, Calendar, DollarSign, Plus } from 'lucide-react';

export const EmptyState = ({
  icon: Icon = Compass,
  title = 'No items yet',
  description = 'Get started by creating your first item.',
  actionText,
  onAction,
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 sm:p-12 text-center bg-white/60 backdrop-blur-sm rounded-2xl border border-dashed border-slate-300">
      <div className="w-16 h-16 rounded-2xl bg-ocean-50 text-ocean-600 flex items-center justify-center mb-4 shadow-inner">
        <Icon className="w-8 h-8 stroke-[1.75]" />
      </div>
      <h3 className="text-lg font-bold text-slate-900">{title}</h3>
      <p className="mt-1.5 text-sm text-slate-500 max-w-sm leading-relaxed">{description}</p>
      {actionText && onAction && (
        <button
          onClick={onAction}
          className="mt-5 inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-ocean-600 hover:bg-ocean-700 rounded-xl shadow-sm hover:shadow-md transition-all transform active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>{actionText}</span>
        </button>
      )}
    </div>
  );
};
