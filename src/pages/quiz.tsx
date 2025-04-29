import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

const questions = [
  { id: 1, text: "I prefer to...", options: ["Analyze deeply", "Take action", "Create something", "Help others", "Explore new things", "Take charge", "Transform situations"] },
  { id: 2, text: "My greatest strength is...", options: ["Wisdom", "Courage", "Innovation", "Empathy", "Freedom", "Leadership", "Vision"] },
  // Add more questions here...
];

type ArchetypeScores = {
  sage: number;
  warrior: number;
  creator: number;
  caregiver: number;
  explorer: number;
  ruler: number;
  magician: number;
};

export default function Quiz() {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState<ArchetypeScores>({
    sage: 0,
    warrior: 0,
    creator: 0,
    caregiver: 0,
    explorer: 0,
    ruler: 0,
    magician: 0
  });

  const archetypes = ['sage', 'warrior', 'creator', 'caregiver', 'explorer', 'ruler', 'magician'];

  const handleAnswer = (optionIndex: number) => {
    const newScores = { ...scores };
    newScores[archetypes[optionIndex] as keyof ArchetypeScores] += 1;
    setScores(newScores);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Find dominant archetype
      const dominantArchetype = Object.entries(scores).reduce((a, b) => 
        a[1] > b[1] ? a : b
      )[0];

      // Store in sessionStorage
      sessionStorage.setItem('dominantArchetype', dominantArchetype);
      
      // Redirect to missions page
      router.push('/missions');
    }
  };

  return (
    <>
      <Head>
        <title>Discover Your Archetype | Quiz</title>
      </Head>
      <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-xl p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-center mb-2">Discover Your Archetype</h1>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              ></div>
            </div>
            <p className="text-center mt-2 text-gray-600">
              Question {currentQuestion + 1} of {questions.length}
            </p>
          </div>

          <div className="space-y-8">
            <h2 className="text-xl font-semibold text-center">
              {questions[currentQuestion].text}
            </h2>
            <div className="grid gap-4">
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  className="w-full p-4 text-left rounded-lg border border-gray-300 hover:border-blue-500 hover:bg-blue-50 transition-all duration-200"
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 