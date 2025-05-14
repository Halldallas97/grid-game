"use client";
import GameGrid from "./components/gameBoard";
import { useUser } from "./context/userContext";

export default function Home() {
  const { health, moves } = useUser();
  const isDead = health === 0 || moves === 0;
  return (
    <>
      {isDead ? (
        <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col items-center text-center text-white space-y-6">
          <div className="text-3xl">
            You Died, Better Luck Next Time.
          </div>
          <button className="hover:text-gray-400" onClick={() => window.location.reload()}>
            Restart
          </button>
        </div>
      </div>

      ) : (
        <div className="transition-opacity">
          <GameGrid />
        </div>
      )}
    </>
  );
}
