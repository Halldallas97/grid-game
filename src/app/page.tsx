"use client";
import GameGrid from "./components/gameBoard";
import SideBar from "./components/sidebar";
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
              Try Again
            </button>
          </div>
        </div>

      ) : (
        <div className="flex flex-wrap h-screen w-screen bg-black overflow-auto">
          <div className="w-full md:w-1/3 flex items-center justify-center p-4">
            <div className="outline-1 rounded-lg text-white p-4">
              <SideBar />
            </div>
          </div>

          <div className="w-full md:w-2/3 h-full flex mt-16 items-center justify-center p-4">
            <GameGrid />
          </div>
        </div>
      )}
    </>
  );
}
