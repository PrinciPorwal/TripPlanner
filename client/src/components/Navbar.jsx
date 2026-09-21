import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Compass, Plus, MapPin, Sparkles } from 'lucide-react';

export const Navbar = () => {
  const location = useLocation();

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-ocean-600 to-coastal-teal flex items-center justify-center text-white shadow-md shadow-ocean-500/20 group-hover:scale-105 transition-transform">
              <Compass className="w-5 h-5 transition-transform group-hover:rotate-45 duration-300" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-slate-900 flex items-center gap-1.5">
                TripPlanner
                {/* <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-ocean-50 text-ocean-700 border border-ocean-200">
                  MVP
                </span> */}
              </span>
              <span className="text-xs text-slate-400 font-medium">Wanderlust & Itineraries</span>
            </div>
          </Link>

          {/* Navigation links & CTA */}
          <div className="flex items-center gap-3 sm:gap-4">
            <Link
              to="/"
              className={`px-3.5 py-2 text-sm font-semibold rounded-lg transition-colors ${location.pathname === '/' || location.pathname === '/trips'
                  ? 'text-ocean-700 bg-ocean-50/80'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                }`}
            >
              My Trips
            </Link>

            <Link
              to="/trips/new"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-terracotta-500 to-terracotta-600 hover:from-terracotta-600 hover:to-terracotta-700 rounded-xl shadow-sm hover:shadow-md hover:shadow-terracotta-500/25 transition-all transform active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>Plan Trip</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};
