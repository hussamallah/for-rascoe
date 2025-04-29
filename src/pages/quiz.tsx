import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

const questions = [
  { id: 1, text: "I prefer to...", options: ["Analyze deeply", "Take action", "Create something", "Help others", "Explore new things", "Take charge", "Transform situations"] },
  { id: 2, text: "My greatest strength is...", options: ["Wisdom", "Courage", "Innovation", "Empathy", "Freedom", "Leadership", "Vision"] },
  { id: 3, text: "In a group, I usually...", options: ["Share knowledge", "Lead the charge", "Generate ideas", "Support others", "Seek new experiences", "Organize the team", "See possibilities"] },
  { id: 4, text: "When facing challenges, I...", options: ["Seek understanding", "Confront directly", "Find creative solutions", "Offer support", "Explore alternatives", "Take control", "Transform the situation"] },
  { id: 5, text: "My ideal environment is...", options: ["A library or study", "A battlefield or gym", "A studio or workshop", "A healing space", "The great outdoors", "A boardroom", "A sacred space"] },
  { id: 6, text: "I value most...", options: ["Knowledge", "Strength", "Creativity", "Compassion", "Freedom", "Power", "Transformation"] },
  { id: 7, text: "My approach to problems is...", options: ["Analyze thoroughly", "Tackle head-on", "Think outside the box", "Consider others' needs", "Explore all options", "Take command", "See the bigger picture"] },
  { id: 8, text: "I'm most comfortable when...", options: ["Learning", "Taking action", "Creating", "Helping", "Exploring", "Leading", "Transforming"] },
  { id: 9, text: "My friends see me as...", options: ["Wise", "Brave", "Creative", "Caring", "Adventurous", "Authoritative", "Mystical"] },
  { id: 10, text: "I'm drawn to...", options: ["Ancient wisdom", "Heroic tales", "Artistic expression", "Healing practices", "New horizons", "Power structures", "Mystical experiences"] },
  { id: 11, text: "My energy is most like...", options: ["A deep well", "A blazing fire", "A flowing river", "A warm hearth", "A gusting wind", "A mighty mountain", "A shifting mist"] },
  { id: 12, text: "I believe in...", options: ["The power of knowledge", "The strength of will", "The magic of creation", "The healing of love", "The freedom of exploration", "The order of leadership", "The mystery of transformation"] },
  { id: 13, text: "My dreams are about...", options: ["Understanding mysteries", "Overcoming obstacles", "Creating masterpieces", "Helping others", "Exploring new worlds", "Building empires", "Transforming reality"] },
  { id: 14, text: "I'm most inspired by...", options: ["Ancient texts", "Heroic deeds", "Artistic works", "Acts of kindness", "New discoveries", "Great leaders", "Mystical experiences"] },
  { id: 15, text: "My life's purpose is to...", options: ["Seek truth", "Protect others", "Create beauty", "Heal wounds", "Explore possibilities", "Lead effectively", "Transform consciousness"] }
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
      <div className="min-h-screen bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">Discover Your Archetype</h1>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div 
                className="bg-purple-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              ></div>
            </div>
            <p className="text-gray-300 mt-2">
              Question {currentQuestion + 1} of {questions.length}
            </p>
          </div>

          <div className="bg-gray-800 rounded-lg p-8 shadow-xl">
            <h2 className="text-2xl font-semibold text-center mb-8">
              {questions[currentQuestion].text}
            </h2>
            <div className="grid gap-4">
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  className="w-full p-4 text-left rounded-lg border border-gray-700 hover:border-purple-500 hover:bg-gray-700 transition-all duration-200"
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