"use client";

import Link from "next/link";
import { useUser } from "./context/userContext";


export default function Header() {
    const { health, moves } = useUser();

    return (
        <div className="bg-gradient-to-b from-gray-700 to-black  w-full p-4 flex flex-col justify-between h-auto relative">
            <div className="absolute top-4 right-4 flex gap-4 text-white">
                <div className="flex items-center">
                    <span className="mr-2">Health: {health}</span>
                </div>
                <div className="flex items-center">
                    <span className="mr-2">Moves: {moves}</span>
                </div>
            </div>

            <div className="text-white text-2xl font-bold text-center mb-4" aria-label="Game name">
                <Link href="/">Grid-Game</Link>
            </div>
            <div className="flex gap-4 justify-center items-center text-white mt-auto flex-row">

                <div className="flex items-center hover:text-gray-400" aria-label="Go to home page">
                    <Link href="/">Home</Link>
                </div>
                <div className="flex items-center hover:text-gray-400" aria-label="Returing users login here">
                    <Link href="/" onClick={(e) => {window.alert("Function not implemented")}}>Login</Link>
                </div>

            </div>
        </div>
    );
}