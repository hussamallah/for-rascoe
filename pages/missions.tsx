import { useEffect, useState } from 'react';
import Link from 'next/link';
import archetypes from '../data/archetypes.json';
import { useRouter } from 'next/router';

const Missions = () => {
  const [dominant, setDominant] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const stored = sessionStorage.getItem('dominantArchetype');
    if (stored) {
      setDominant(stored);
    } else {
      router.push('/quiz');
    }
  }, []);

  if (!dominant) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container">
      <h1>The Seven Chambers Stand Before You</h1>
      <div className="grid">
        {Object.entries(archetypes).map(([key, value]) => (
          <div
            key={key}
            className={`card ${dominant === key ? 'unlocked' : 'locked'}`}
          >
            {dominant === key ? (
              <Link href={`/chamber/${key}`}>
                <div className="content">
                  <p className="arabic">{value.arabic}</p>
                  <p className="meaning">{value.meaning}</p>
                </div>
              </Link>
            ) : (
              <div className="content locked-content">
                <p className="locked-message">Unlock your Chamber: Reveal your Truths First</p>
              </div>
            )}
          </div>
        ))}
      </div>

      <style jsx>{\`
        .container {
          text-align: center;
          padding: 20px;
          font-family: sans-serif;
        }
        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 20px;
          margin-top: 30px;
        }
        .card {
          border: 2px solid #000;
          padding: 20px;
          border-radius: 10px;
          position: relative;
          transition: all 0.3s ease;
          height: 180px;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
        }
        .unlocked {
          background-color: #f0fff0;
          animation: pulse 2s infinite;
        }
        .locked {
          background-color: #f8f8f8;
          filter: grayscale(100%);
          cursor: not-allowed;
        }
        .content {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .arabic {
          font-family: 'Cairo', sans-serif;
          font-size: 24px;
          margin-bottom: 10px;
        }
        .meaning {
          font-size: 18px;
          color: #333;
        }
        .locked-content {
          opacity: 0;
        }
        .card.locked:hover .locked-content {
          opacity: 1;
          position: absolute;
          top: 0;
          left: 0;
          background: rgba(0,0,0,0.6);
          width: 100%;
          height: 100%;
          color: #fff;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 16px;
          border-radius: 10px;
        }
        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }
      \`}</style>
    </div>
  );
};

export default Missions;
