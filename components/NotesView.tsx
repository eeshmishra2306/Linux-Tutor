import React, { useState } from 'react';
import { SYLLABUS } from '../constants';

const NotesView: React.FC = () => {
  const [activeExp, setActiveExp] = useState<number | null>(1);

  return (
    <div className="max-w-4xl mx-auto pb-12">
      <header className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">Detailed Notes</h2>
        <p className="text-slate-400">Complete syllabus coverage for CSEG1126</p>
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
                <h3 className={`font-semibold text-lg ${activeExp === item.experiment ? 'text-white' : 'text-slate-300'}`}>
                  {item.title}
                </h3>
              </div>
              <i className={`fas fa-chevron-down transition-transform duration-300 ${activeExp === item.experiment ? 'rotate-180 text-blue-400' : 'text-slate-500'}`}></i>
            </button>

            {activeExp === item.experiment && (
              <div className="px-5 pb-6 border-t border-slate-700/50 animate-fade-in">
                <div className="mt-4 space-y-4">
                  <div>
                    <h4 className="text-xs uppercase tracking-wider text-blue-400 font-semibold mb-2">Theory & Concepts</h4>
                    <p className="text-slate-300 text-sm leading-relaxed bg-slate-900/50 p-3 rounded border border-slate-700/50">
                      {item.theory}
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-xs uppercase tracking-wider text-emerald-400 font-semibold mb-2">Lab Tasks</h4>
                    <ul className="space-y-2">
                      {item.labTasks.map((task, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-sm text-slate-300">
                          <i className="fas fa-check text-emerald-500 mt-1"></i>
                          <span>{task}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Code snippets based on experiment content */}
                  {(item.title.toLowerCase().includes('script') || item.title.toLowerCase().includes('commands')) && (
                     <div className="mt-4">
                        <h4 className="text-xs uppercase tracking-wider text-amber-400 font-semibold mb-2">Key Commands / Syntax</h4>
                        <div className="bg-black/40 rounded-lg p-3 font-mono text-xs text-slate-300 overflow-x-auto border border-slate-700">
                           {item.experiment === 2 && "$ ls -la\n$ cp source dest\n$ chmod 755 file.sh"}
                           {item.experiment === 4 && "#!/bin/bash\necho 'Hello World'\nread -p 'Enter Name: ' name"}
                           {item.experiment === 5 && "if [ $num -eq 1 ]; then\n  echo 'True'\nelse\n  echo 'False'\nfi"}
                           {item.experiment === 6 && "for ((i=1; i<=10; i++))\ndo\n  echo $i\ndone"}
                           {item.experiment > 6 && "# Advanced functions\nfunction check_file() {\n  if [ -f \"$1\" ]; then echo 'Exists'; fi\n}"}
                        </div>
                     </div>
                  )}
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