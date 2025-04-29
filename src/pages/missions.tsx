import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import archetypesData from '@/data/archetypes.json';

export default function Missions() {
  const router = useRouter();
  const [userArchetype, setUserArchetype] = useState<string | null>(null);

  useEffect(() => {
    // Get user's archetype from sessionStorage
    const storedArchetype = sessionStorage.getItem('dominantArchetype');
    if (!storedArchetype) {
      router.push('/quiz');
    } else {
      setUserArchetype(storedArchetype);
    }
  }, [router]);

  const handleChamberClick = (path: string, isUnlocked: boolean) => {
    if (isUnlocked) {
      router.push(`/chamber/${path}`);
    }
  };

  return (
    <>
      <Head>
        <title>Sacred Chambers | Your Journey</title>
      </Head>
      <div className="min-h-screen bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-12">Sacred Chambers</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {archetypesData.chambers.map((chamber) => {
              const isUnlocked = chamber.path === userArchetype;
              return (
                <div
                  key={chamber.id}
                  onClick={() => handleChamberClick(chamber.path, isUnlocked)}
                  className={`
                    relative overflow-hidden rounded-lg p-6 cursor-pointer
                    transition-all duration-500 transform hover:scale-105
                    ${isUnlocked 
                      ? 'bg-gradient-to-r from-purple-600 to-indigo-600 animate-pulse'
                      : 'bg-gray-800 hover:bg-gray-700'}
                  `}
                >
                  <h2 className="text-2xl font-bold mb-2">{chamber.name}</h2>
                  <p className="text-gray-300 mb-4">{chamber.description}</p>
                  {!isUnlocked && (
                    <div className="absolute inset-0 bg-black bg-opacity-75 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                      <p className="text-center px-4 text-lg font-medium">
                        Unlock your Chamber: Reveal your Truths First
                      </p>
                    </div>
                  )}
                  {isUnlocked && (
                    <div className="mt-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-500 text-white">
                        Unlocked
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
} 