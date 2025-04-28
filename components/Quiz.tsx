import React, { useState } from 'react';
import quizQuestions from '../data/quizQuestions.json';

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
  const [answers, setAnswers] = useState<{ [archetype: string]: number }>({});

  const handleSelect = (archetype: string) => {
    setAnswers(prev => ({
      ...prev,
      [archetype]: (prev[archetype] || 0) + 1,
    }));
  };

  return (
    <div>
      <h1>Quiz</h1>
      { (quizQuestions as Question[]).map(q => (
        <div key={q.id}>
          <p>{q.question}</p>
          {Object.entries(q.options).map(([key, opt]) => (
            <button key={key} onClick={() => handleSelect(opt.archetype)}>
              {opt.label}
            </button>
          ))}
        </div>
      )) }
      <pre>{JSON.stringify(answers, null, 2)}</pre>
    </div>
  );
};

export default Quiz;
