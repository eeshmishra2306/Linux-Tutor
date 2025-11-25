import React, { useState } from 'react';
import { AppView } from './types';
import Sidebar from './components/Sidebar';
import NotesView from './components/NotesView';
import QuizView from './components/QuizView';
import VivaView from './components/VivaView';
import TutorView from './components/TutorView';
import { COURSE_INFO } from './constants';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>('home');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const renderView = () => {
    switch (currentView) {
      case 'home':
        return <HomeView onNavigate={setCurrentView} />;
      case 'notes':
        return <NotesView />;
      case 'quiz':
        return <QuizView />;
      case 'viva':
        return <VivaView />;
      case 'tutor':
        return <TutorView />;
      default:
        return <HomeView onNavigate={setCurrentView} />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-900 text-slate-100 overflow-hidden">
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-30 w-64 bg-slate-800 border-r border-slate-700 transform transition-transform duration-300 md:relative md:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <Sidebar currentView={currentView} onViewChange={(view) => {
            setCurrentView(view);
            setIsSidebarOpen(false);
        }} />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Mobile Header */}
        <header className="md:hidden flex items-center p-4 bg-slate-800 border-b border-slate-700">
          <button onClick={() => setIsSidebarOpen(true)} className="p-2 text-slate-300 hover:text-white">
            <i className="fas fa-bars text-xl"></i>
          </button>
          <span className="ml-4 font-bold text-lg">{COURSE_INFO.name}</span>
        </header>

        {/* View Container */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 relative">
          {renderView()}
        </main>
      </div>
    </div>
  );
};

const HomeView: React.FC<{ onNavigate: (view: AppView) => void }> = ({ onNavigate }) => {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      <div className="text-center space-y-4 pt-10">
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent pb-2">
          {COURSE_INFO.name}
        </h1>
        <p className="text-xl text-slate-400 font-mono">{COURSE_INFO.code} | {COURSE_INFO.units} Units</p>
        <div className="flex justify-center gap-4 mt-6">
          <div className="bg-slate-800 p-4 rounded-lg border border-slate-700 text-center w-32">
            <div className="text-3xl font-bold text-emerald-400">10</div>
            <div className="text-xs text-slate-400 uppercase tracking-wider mt-1">Target CGPA</div>
          </div>
          <div className="bg-slate-800 p-4 rounded-lg border border-slate-700 text-center w-32">
            <div className="text-3xl font-bold text-blue-400">12</div>
            <div className="text-xs text-slate-400 uppercase tracking-wider mt-1">Experiments</div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mt-12">
        <DashboardCard 
          title="Study Notes" 
          icon="fa-book-open" 
          desc="Comprehensive notes for all 12 experiments." 
          onClick={() => onNavigate('notes')}
          color="blue"
        />
        <DashboardCard 
          title="MCQ Quiz" 
          icon="fa-list-check" 
          desc="Test your knowledge with 50+ questions." 
          onClick={() => onNavigate('quiz')}
          color="emerald"
        />
        <DashboardCard 
          title="Viva Prep" 
          icon="fa-microphone" 
          desc="Prepare for oral exams with flashcards." 
          onClick={() => onNavigate('viva')}
          color="purple"
        />
        <DashboardCard 
          title="AI Tutor" 
          icon="fa-robot" 
          desc="Get instant help with scripts and commands." 
          onClick={() => onNavigate('tutor')}
          color="amber"
        />
      </div>

      <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700 mt-8">
        <h3 className="text-lg font-semibold mb-4 text-slate-200">Course Outcomes</h3>
        <ul className="space-y-3 text-slate-400 text-sm">
          <li className="flex items-start gap-3">
            <span className="bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded text-xs font-mono mt-0.5">CO1</span>
            <span>Understand functionality and purpose of file operations, user management, and system commands.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded text-xs font-mono mt-0.5">CO2</span>
            <span>Apply appropriate commands to navigate, manage files, and gather system info.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded text-xs font-mono mt-0.5">CO3</span>
            <span>Analyze and identify issues in shell scripts (logic, structure, performance).</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

const DashboardCard: React.FC<{title: string, icon: string, desc: string, onClick: () => void, color: string}> = ({ title, icon, desc, onClick, color }) => {
  const colorClasses: Record<string, string> = {
    blue: "hover:border-blue-500/50 hover:bg-blue-500/10 group-hover:text-blue-400",
    emerald: "hover:border-emerald-500/50 hover:bg-emerald-500/10 group-hover:text-emerald-400",
    purple: "hover:border-purple-500/50 hover:bg-purple-500/10 group-hover:text-purple-400",
    amber: "hover:border-amber-500/50 hover:bg-amber-500/10 group-hover:text-amber-400",
  };
  
  const iconColor: Record<string, string> = {
    blue: "text-blue-400",
    emerald: "text-emerald-400",
    purple: "text-purple-400",
    amber: "text-amber-400",
  }

  return (
    <button 
      onClick={onClick}
      className={`group flex flex-col items-start p-6 bg-slate-800 border border-slate-700 rounded-xl transition-all duration-300 text-left ${colorClasses[color]}`}
    >
      <div className={`p-3 rounded-lg bg-slate-900 mb-4 ${iconColor[color]} shadow-lg`}>
        <i className={`fas ${icon} text-xl`}></i>
      </div>
      <h3 className="text-xl font-bold text-slate-100 mb-2">{title}</h3>
      <p className="text-slate-400 text-sm">{desc}</p>
    </button>
  );
}

export default App;