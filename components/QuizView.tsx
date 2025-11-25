import React, { useState } from 'react';
import { Question } from '../types';
import { INITIAL_MCQS, SYLLABUS } from '../constants';
import { generateMoreQuestions } from '../services/geminiService';

const QuizView: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>(INITIAL_MCQS);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  
  // Custom Quiz State
  const [selectedTopic, setSelectedTopic] = useState<string>('');
  const [showConfigModal, setShowConfigModal] = useState(false);

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
    const newQs = await generateMoreQuestions(10, selectedTopic || undefined);
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

  const startNewQuiz = async () => {
    setIsGenerating(true);
    const newQs = await generateMoreQuestions(10, selectedTopic || undefined);
    const processedQs = newQs.map((q, i) => ({...q, id: i + 1}));
    
    setQuestions(processedQs);
    setScore(0);
    setCurrentIndex(0);
    setSelectedOption(null);
    setShowResult(false);
    setQuizCompleted(false);
    setIsGenerating(false);
    setShowConfigModal(false);
  };

  const TopicSelector = () => (
    <div className="space-y-2 text-left">
      <label className="block text-sm font-medium text-slate-400">Select Topic</label>
      <select 
        value={selectedTopic}
        onChange={(e) => setSelectedTopic(e.target.value)}
        className="w-full bg-slate-700 border border-slate-600 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
      >
        <option value="">All Topics (General)</option>
        {SYLLABUS.map((exp) => (
          <option key={exp.experiment} value={exp.title}>
            Exp {exp.experiment}: {exp.title}
          </option>
        ))}
      </select>
    </div>
  );

  // Configuration Modal
  if (showConfigModal) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
        <div className="bg-slate-800 rounded-2xl border border-slate-700 w-full max-w-md p-6 shadow-2xl">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-white">Create Custom Quiz</h3>
            <button onClick={() => setShowConfigModal(false)} className="text-slate-400 hover:text-white">
              <i className="fas fa-times"></i>
            </button>
          </div>
          
          <div className="space-y-6">
            <TopicSelector />
            
            <div className="bg-blue-900/20 border border-blue-500/20 rounded-lg p-4">
              <p className="text-sm text-blue-300">
                <i className="fas fa-info-circle mr-2"></i>
                This will generate 10 fresh AI questions based on your selection.
              </p>
            </div>

            <div className="flex gap-3">
              <button 
                onClick={() => setShowConfigModal(false)}
                className="flex-1 px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-200 font-medium transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={startNewQuiz}
                disabled={isGenerating}
                className="flex-1 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium transition-colors flex items-center justify-center gap-2"
              >
                {isGenerating ? <i className="fas fa-spinner fa-spin"></i> : <i className="fas fa-play"></i>}
                Start Quiz
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

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

          <div className="space-y-4">
             <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700">
                <h4 className="text-sm font-bold text-slate-300 mb-3 uppercase tracking-wider">Continue Practice</h4>
                <TopicSelector />
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
                Restart Current
              </button>
              <button 
                onClick={loadMoreQuestions}
                disabled={isGenerating}
                className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 rounded-lg font-medium text-white transition-colors flex items-center gap-2"
              >
                {isGenerating ? <i className="fas fa-spinner fa-spin"></i> : <i className="fas fa-plus"></i>}
                Generate 10 More
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (questions.length === 0) return (
      <div className="flex items-center justify-center h-full text-slate-400 gap-3">
          <i className="fas fa-spinner fa-spin text-2xl"></i>
          <span>Loading Questions...</span>
      </div>
  );

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
            <h2 className="text-2xl font-bold">MCQ Practice</h2>
            <p className="text-xs text-slate-400 mt-1">
                {selectedTopic ? `Topic: ${selectedTopic}` : 'Topic: General / Mixed'}
            </p>
        </div>
        <div className="flex items-center gap-3">
            <button 
                onClick={() => setShowConfigModal(true)}
                className="bg-slate-800 hover:bg-slate-700 text-blue-400 px-3 py-1.5 rounded-lg border border-slate-700 text-sm font-medium transition-colors"
            >
                <i className="fas fa-sliders-h mr-2"></i>New Quiz
            </button>
            <div className="bg-slate-800 px-4 py-2 rounded-full text-sm font-mono border border-slate-700">
            Q: {currentIndex + 1} / {questions.length} | Score: {score}
            </div>
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