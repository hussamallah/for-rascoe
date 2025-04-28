import React, { useState } from 'react';
import quizQuestions from '../data/quizQuestions.json';
import { useRouter } from 'next/router';

type Option = {
  label: string;
  archetype: string;
};

type Question = {
  id: number;
  question: string;
  options: { [key: string]: Option };
};

const Quiz: React.FC = () => {
  const questions = quizQuestions as Question[];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [archetype: string]: number }>({});
  const router = useRouter();

  const currentQuestion = questions[currentIndex];

  const handleSelect = (archetype: string) => {
    setAnswers(prev => ({
      ...prev,
      [archetype]: (prev[archetype] || 0) + 1,
    }));
    const next = currentIndex + 1;
    if (next < questions.length) {
      setCurrentIndex(next);
    } else {
      // For now, redirect to missions or show results
      router.push('/missions');
    }
  };

  return (
    <div className="container">
      <div className="loader">
        <div className="ball" />
      </div>
      <div className="question-box">
        <p className="question-text">{currentQuestion.question}</p>
        <div className="options">
          {Object.entries(currentQuestion.options).map(([key, opt]) => (
            <button
              key={key}
              className="option-button"
              onClick={() => handleSelect(opt.archetype)}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 40px 20px;
          font-family: sans-serif;
        }
        .loader {
          width: 50px;
          height: 50px;
          border: 2px solid #000;
          border-radius: 50%;
          position: relative;
          margin-bottom: 20px;
        }
        .ball {
          width: 12px;
          height: 12px;
          background: #000;
          border-radius: 50%;
          position: absolute;
          left: calc(50% - 6px);
          animation: bounce 0.3s infinite ease-in-out;
        }
        @keyframes bounce {
          0%, 100% { top: 0; }
          50% { top: 38px; }
        }
        .question-box {
          max-width: 600px;
          width: 100%;
        }
        .question-text {
          font-size: 1.2rem;
          margin-bottom: 16px;
        }
        .options {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .option-button {
          padding: 12px 20px;
          font-size: 1rem;
          border: 2px solid #000;
          background: transparent;
          cursor: pointer;
          border-radius: 4px;
        }
        .option-button:hover {
          background: #f0f0f0;
        }
      `}</style>
    </div>
  );
};

export default Quiz;
