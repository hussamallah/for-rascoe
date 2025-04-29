import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import archetypesData from '@/data/archetypes.json';

export default function Chamber() {
  const router = useRouter();
  const { archetype } = router.query;
  const [userArchetype, setUserArchetype] = useState<string | null>(null);
  const [chamber, setChamber] = useState<any>(null);

  useEffect(() => {
    // Get user's archetype from sessionStorage
    const storedArchetype = sessionStorage.getItem('dominantArchetype');
    setUserArchetype(storedArchetype);

    // Find the chamber data
    if (archetype) {
      const foundChamber = archetypesData.chambers.find(
        (c) => c.path === archetype
      );
      setChamber(foundChamber);
    }
  }, [archetype]);

  useEffect(() => {
    // Redirect if trying to access unauthorized chamber
    if (userArchetype && archetype && userArchetype !== archetype) {
      router.push('/missions');
    }
  }, [userArchetype, archetype, router]);

  if (!chamber) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{chamber.name} Chamber | Sacred Journey</title>
      </Head>
      <div className="min-h-screen bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-4">{chamber.name}</h1>
            <p className="text-xl text-gray-300">{chamber.description}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column - Chamber Overview */}
            <div className="bg-gray-800 rounded-lg p-8 shadow-xl">
              <h2 className="text-2xl font-semibold mb-6">Chamber Overview</h2>
              <div className="space-y-6">
                <div className="bg-gray-700 rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-4">Core Attributes</h3>
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                      Wisdom and Knowledge
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                      Inner Strength
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                      Spiritual Growth
                    </li>
                  </ul>
                </div>
                
                <div className="bg-gray-700 rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-4">Sacred Symbols</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-gray-600 rounded-lg p-4 text-center">
                      <div className="text-3xl mb-2">⚡</div>
                      <p className="text-sm">Power</p>
                    </div>
                    <div className="bg-gray-600 rounded-lg p-4 text-center">
                      <div className="text-3xl mb-2">✨</div>
                      <p className="text-sm">Wisdom</p>
                    </div>
                    <div className="bg-gray-600 rounded-lg p-4 text-center">
                      <div className="text-3xl mb-2">🌙</div>
                      <p className="text-sm">Mystery</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Journey Path */}
            <div className="bg-gray-800 rounded-lg p-8 shadow-xl">
              <h2 className="text-2xl font-semibold mb-6">Your Journey Path</h2>
              <div className="space-y-6">
                <div className="bg-gray-700 rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-4">Current Stage</h3>
                  <div className="w-full bg-gray-600 rounded-full h-2 mb-4">
                    <div className="bg-purple-500 h-2 rounded-full" style={{ width: '25%' }}></div>
                  </div>
                  <p className="text-gray-300">You are at the beginning of your sacred journey. Each step forward brings new revelations and deeper understanding.</p>
                </div>

                <div className="bg-gray-700 rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-4">Next Steps</h3>
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                      Complete the initiation ritual
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                      Discover your sacred tools
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                      Connect with your spirit guide
                    </li>
                  </ul>
                </div>

                <button 
                  onClick={() => router.push('/missions')}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
                >
                  Return to Chambers
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 