import React, { createContext, useState, PropsWithChildren } from 'react';

type MissionContextType = {
  missions: any[];
};

export const MissionContext = createContext<MissionContextType>({ missions: [] });

export const MissionProvider = ({ children }: PropsWithChildren<{}>) => {
  const [missions, setMissions] = useState([]);

  return (
    <MissionContext.Provider value={{ missions }}>
      {children}
    </MissionContext.Provider>
  );
};
