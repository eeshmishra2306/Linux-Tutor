import React, { useState } from 'react';
import { VivaQuestion } from '../types';
import { INITIAL_VIVA } from '../constants';
import { generateVivaQuestions } from '../services/geminiService';

const VivaView: React.FC = () => {
  const [questions, setQuestions] = useState<VivaQuestion[]>(INITIAL_VIVA);
  const [isGenerating, setIsGenerating] = useState(false);
  const [revealedIds, setRevealedIds] = useState<number[]>([]);

  const toggleReveal = (id: number) => {
    if (revealedIds.includes(id)) {
      setRevealedIds(revealedIds.filter(rid => rid !== id));
    } else {
      setRevealedIds([...revealedIds, id]);
    }
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    const newQs = await generateVivaQuestions(10);
     const startId = questions.length > 0 ? Math.max(...questions.map(q => q.id)) + 1 : 1;
    const processedQs = newQs.map((q, i) => ({...q, id: startId + i}));
    setQuestions([...questions, ...processedQs]);
    setIsGenerating(false);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-bold text-white">Viva Voce Prep</h2>
          <p className="text-slate-400">Master the oral exam questions.</p>
        </div>
        <button
          onClick={handleGenerate}
          disabled={isGenerating}
          className="bg-purple-600 hover:bg-purple-500 text-white px-5 py-2.5 rounded-lg font-medium transition-all shadow-lg shadow-purple-500/20 flex items-center gap-2 w-fit"
        >
          {isGenerating ? <i className="fas fa-spinner fa-spin"></i> : <i className="fas fa-magic"></i>}
          Generate More (AI)
        </button>
      </header>

      <div className="grid md:grid-cols-2 gap-6">
        {questions.map((q) => {
          const isRevealed = revealedIds.includes(q.id);
          return (
            <div 
              key={q.id}
              className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden flex flex-col hover:border-slate-600 transition-colors"
            >
              <div className="p-5 flex-1">
                <div className="flex justify-between items-start mb-3">
                  <span className={`px-2 py-1 rounded text-xs font-bold uppercase tracking-wider ${
                    q.category === 'Basic' ? 'bg-blue-500/20 text-blue-400' :
                    q.category === 'Intermediate' ? 'bg-amber-500/20 text-amber-400' :
                    'bg-red-500/20 text-red-400'
                  }`}>
                    {q.category}
                  </span>
                  <span className="text-slate-500 text-xs font-mono">#{q.id}</span>
                </div>
                <h3 className="text-lg font-medium text-slate-100 mb-4">{q.question}</h3>
                
                {isRevealed && (
                  <div className="pt-4 border-t border-slate-700/50 animate-fade-in">
                    <p className="text-slate-300 text-sm leading-relaxed">{q.answer}</p>
                  </div>
                )}
              </div>
              
              <button
                onClick={() => toggleReveal(q.id)}
                className={`w-full py-3 text-sm font-medium transition-colors ${
                  isRevealed 
                    ? 'bg-slate-700/50 text-slate-400 hover:bg-slate-700' 
                    : 'bg-slate-700 text-white hover:bg-slate-600'
                }`}
              >
                {isRevealed ? 'Hide Answer' : 'Show Answer'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default VivaView;