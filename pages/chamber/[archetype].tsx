import { useRouter } from 'next/router';
import React from 'react';

const Chamber: React.FC = () => {
  const router = useRouter();
  const { archetype } = router.query;

  return (
    <div>
      <h1>Chamber for {archetype}</h1>
    </div>
  );
};

export default Chamber;
