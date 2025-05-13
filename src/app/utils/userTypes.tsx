import { createContext } from "react";

export interface UserContextType {
  health: number;
  moves: number;
  updateHealth: (value: number) => void;
  updateMoves: (value: number) => void;
}

export const UserContext = createContext<UserContextType>({
  health: 200,
  moves: 450,
  updateHealth: () => {},
  updateMoves: () => {},
});