import React from 'react';
import { AppView } from '../types';

interface SidebarProps {
  currentView: AppView;
  onViewChange: (view: AppView) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, onViewChange }) => {
  const menuItems: { id: AppView; label: string; icon: string }[] = [
    { id: 'home', label: 'Dashboard', icon: 'fa-home' },
    { id: 'notes', label: 'Lab Notes', icon: 'fa-book' },
    { id: 'quiz', label: 'MCQ Quiz', icon: 'fa-list-check' },
    { id: 'viva', label: 'Viva Prep', icon: 'fa-microphone' },
    { id: 'tutor', label: 'AI Tutor', icon: 'fa-robot' },
  ];

  return (
    <div className="flex flex-col h-full p-4">
      <div className="flex items-center gap-3 px-4 py-6 mb-4">
        <div className="w-8 h-8 rounded bg-gradient-to-br from-blue-500 to-emerald-500 flex items-center justify-center">
          <i className="fas fa-terminal text-white text-xs"></i>
        </div>
        <h1 className="font-bold text-xl tracking-tight">LinuxLab<span className="text-blue-400">Master</span></h1>
      </div>

      <nav className="space-y-2 flex-1">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onViewChange(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-200 ${
              currentView === item.id
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                : 'text-slate-400 hover:bg-slate-700/50 hover:text-white'
            }`}
          >
            <i className={`fas ${item.icon} w-5 text-center`}></i>
            {item.label}
          </button>
        ))}
      </nav>

      <div className="mt-auto px-4 py-4 border-t border-slate-700">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
          <span className="text-xs text-slate-400">System Online</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;