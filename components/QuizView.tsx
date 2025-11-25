import React, { useState, useEffect } from 'react';
import { Question } from '../types';
import { INITIAL_MCQS } from '../constants';
import { generateMoreQuestions } from '../services/geminiService';

const QuizView: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>(INITIAL_MCQS);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const currentQuestion = questions[currentIndex];

  const handleOptionSelect = (index: number) => {
    if (selectedOption !== null) return; // Prevent change after selection
    setSelectedOption(index);
    setShowResult(true);
    if (index === currentQuestion.correctAnswer) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedOption(null);
      setShowResult(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const loadMoreQuestions = async () => {
    setIsGenerating(true);
    const newQs = await generateMoreQuestions(10);
    // Add unique IDs
    const startId = questions.length > 0 ? Math.max(...questions.map(q => q.id)) + 1 : 1;
    const processedQs = newQs.map((q, i) => ({...q, id: startId + i}));
    
    setQuestions([...questions, ...processedQs]);
    setIsGenerating(false);
    setQuizCompleted(false);
    // Don't reset score, keep building
    if (questions.length === 0) setCurrentIndex(0);
    else setCurrentIndex(currentIndex + 1);
    
    setSelectedOption(null);
    setShowResult(false);
  };

  if (quizCompleted) {
    return (
      <div className="flex flex-col items-center justify-center h-full max-w-2xl mx-auto text-center space-y-6 animate-fade-in">
        <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700 shadow-xl w-full">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-3xl font-bold text-white mb-2">Quiz Completed!</h2>
          <p className="text-slate-400 mb-6">You scored <span className="text-emerald-400 font-bold text-xl">{score}</span> out of <span className="text-white">{questions.length}</span></p>
          
          <div className="w-full bg-slate-700 h-4 rounded-full overflow-hidden mb-8">
            <div 
              className="bg-gradient-to-r from-blue-500 to-emerald-500 h-full transition-all duration-1000"
              style={{ width: `${(score / questions.length) * 100}%` }}
            ></div>
          </div>

          <div className="flex gap-4 justify-center">
            <button 
              onClick={() => {
                setScore(0);
                setCurrentIndex(0);
                setQuizCompleted(false);
                setSelectedOption(null);
                setShowResult(false);
              }}
              className="px-6 py-3 bg-slate-700 hover:bg-slate-600 rounded-lg font-medium transition-colors"
            >
              Restart
            </button>
            <button 
              onClick={loadMoreQuestions}
              disabled={isGenerating}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-lg font-medium text-white transition-colors flex items-center gap-2"
            >
              {isGenerating ? <i className="fas fa-spinner fa-spin"></i> : <i className="fas fa-plus"></i>}
              Generate 10 More (AI)
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (questions.length === 0) return <div>Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">MCQ Practice</h2>
        <div className="bg-slate-800 px-4 py-2 rounded-full text-sm font-mono border border-slate-700">
          Q: {currentIndex + 1} / {questions.length} | Score: {score}
        </div>
      </div>

      <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden shadow-xl">
        {/* Progress Bar */}
        <div className="w-full h-1 bg-slate-900">
          <div 
            className="h-full bg-blue-500 transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
          ></div>
        </div>

        <div className="p-8">
          <p className="text-xl font-medium text-slate-100 mb-8 leading-relaxed">
            {currentQuestion.question}
          </p>

          <div className="space-y-3">
            {currentQuestion.options.map((option, idx) => {
              let btnClass = "bg-slate-700/50 hover:bg-slate-700 border-slate-600";
              if (selectedOption !== null) {
                if (idx === currentQuestion.correctAnswer) {
                  btnClass = "bg-emerald-500/20 border-emerald-500 text-emerald-400";
                } else if (idx === selectedOption) {
                  btnClass = "bg-red-500/20 border-red-500 text-red-400";
                } else {
                  btnClass = "opacity-50 border-transparent";
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleOptionSelect(idx)}
                  disabled={selectedOption !== null}
                  className={`w-full text-left p-4 rounded-xl border transition-all duration-200 flex items-center gap-4 ${btnClass}`}
                >
                  <span className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-xs font-mono border border-slate-700 shrink-0">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span>{option}</span>
                  {selectedOption !== null && idx === currentQuestion.correctAnswer && (
                    <i className="fas fa-check text-emerald-500 ml-auto"></i>
                  )}
                  {selectedOption !== null && idx === selectedOption && idx !== currentQuestion.correctAnswer && (
                    <i className="fas fa-times text-red-500 ml-auto"></i>
                  )}
                </button>
              );
            })}
          </div>

          {showResult && (
            <div className="mt-6 p-4 bg-slate-900/50 rounded-lg border border-slate-700/50 animate-fade-in">
              <p className="text-sm text-slate-400">
                <span className="font-bold text-slate-300">Explanation:</span> {currentQuestion.explanation}
              </p>
              <div className="mt-4 flex justify-end">
                <button 
                  onClick={nextQuestion}
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
                >
                  Next Question <i className="fas fa-arrow-right"></i>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizView;