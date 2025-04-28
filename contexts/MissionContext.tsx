import React, { createContext, useState } from 'react';

type MissionContextType = {
  missions: any[];
};

export const MissionContext = createContext<MissionContextType>({ missions: [] });

export const MissionProvider: React.FC = ({ children }) => {
  const [missions, setMissions] = useState([]);

  return (
    <MissionContext.Provider value={{ missions }}>
      {children}
    </MissionContext.Provider>
  );
};
