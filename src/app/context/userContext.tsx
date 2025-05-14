"use client";

import {useContext, useState, ReactNode } from 'react';
import { UserContext } from '../utils/userTypes';



export function UserProvider({ children }: { children: ReactNode }) {
  const [health, setHealth] = useState(200);
  const [moves, setMoves] = useState(450);

  const updateHealth = (value: number) => {
    setHealth(prev => {
      const newHealth = prev + value;
      return Math.max(0, Math.min(newHealth, 200));
    });
  };

  const updateMoves = (value: number) => {
    setMoves(prev => {
      const newMoves = prev + value;
      return Math.max(0, Math.min(newMoves, 450));
    });
  };

  return (
    <UserContext.Provider value={{ health, moves, updateHealth, updateMoves }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
