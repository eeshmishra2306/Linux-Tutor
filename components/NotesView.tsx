import React, { useState } from 'react';
import { SYLLABUS } from '../constants';

const NotesView: React.FC = () => {
  const [activeExp, setActiveExp] = useState<number | null>(1);

  // Helper to render the markdown-like content from `details`
  const renderDetails = (text: string) => {
    const lines = text.split('\n');
    let inCodeBlock = false;
    
    return lines.map((line, idx) => {
      // Handle Code Blocks
      if (line.trim().startsWith('```')) {
        inCodeBlock = !inCodeBlock;
        return null;
      }
      if (inCodeBlock) {
        return (
          <div key={idx} className="font-mono text-sm bg-black/30 text-emerald-300 px-4 py-0.5 border-l-2 border-slate-700">
            {line}
          </div>
        );
      }

      // Handle Headers
      if (line.startsWith('# ')) {
        return <h4 key={idx} className="text-xl font-bold text-blue-400 mt-6 mb-3 border-b border-blue-500/30 pb-2">{line.replace('# ', '')}</h4>;
      }
      
      // Handle Table Rows (simple pipe check)
      if (line.trim().startsWith('|') && line.trim().endsWith('|')) {
        const cells = line.split('|').filter(c => c.trim() !== '');
        return (
            <div key={idx} className="grid grid-cols-2 gap-4 bg-slate-700/30 p-2 border-b border-slate-700/50 text-sm">
                {cells.map((c, i) => <div key={i} className={i===0 ? "font-mono font-bold text-amber-400" : "text-slate-300"}>{c.trim()}</div>)}
            </div>
        )
      }

      // Handle Bullets
      if (line.trim().startsWith('- ')) {
          return <li key={idx} className="ml-4 list-disc text-slate-300 text-sm mb-1">{line.replace('- ', '')}</li>
      }

      // Default Text
      if (line.trim() === '') return <br key={idx} />;

      return <p key={idx} className="text-slate-300 text-sm leading-relaxed mb-1">{line}</p>;
    });
  };

  return (
    <div className="max-w-4xl mx-auto pb-12">
      <header className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">Detailed Course Notes</h2>
        <p className="text-slate-400">Complete Study Material for CSEG1126</p>
      </header>

      <div className="space-y-4">
        {SYLLABUS.map((item) => (
          <div 
            key={item.experiment} 
            className={`bg-slate-800 rounded-xl border transition-all duration-300 ${
              activeExp === item.experiment ? 'border-blue-500 shadow-lg shadow-blue-500/10' : 'border-slate-700 hover:border-slate-600'
            }`}
          >
            <button
              onClick={() => setActiveExp(activeExp === item.experiment ? null : item.experiment)}
              className="w-full flex items-center justify-between p-5 text-left"
            >
              <div className="flex items-center gap-4">
                <span className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold ${
                  activeExp === item.experiment ? 'bg-blue-500 text-white' : 'bg-slate-700 text-slate-300'
                }`}>
                  {item.experiment}
                </span>
                <div>
                    <h3 className={`font-semibold text-lg ${activeExp === item.experiment ? 'text-white' : 'text-slate-300'}`}>
                    {item.title}
                    </h3>
                </div>
              </div>
              <i className={`fas fa-chevron-down transition-transform duration-300 ${activeExp === item.experiment ? 'rotate-180 text-blue-400' : 'text-slate-500'}`}></i>
            </button>

            {activeExp === item.experiment && (
              <div className="px-5 pb-6 border-t border-slate-700/50 animate-fade-in bg-slate-900/30">
                {/* Short Summary */}
                <div className="mb-6 mt-4 p-4 bg-blue-900/10 border border-blue-500/20 rounded-lg">
                    <h5 className="text-xs uppercase tracking-wider text-blue-400 font-bold mb-1">Quick Summary</h5>
                    <p className="text-sm text-slate-400 italic">{item.theory}</p>
                </div>

                {/* Detailed Content Renderer */}
                <div className="prose prose-invert max-w-none">
                    {item.details ? renderDetails(item.details) : <p className="text-slate-500">No detailed notes available.</p>}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotesView;