"use client";

import Link from "next/link";

export default function Header() {
    return (
        <div className="bg-purple-950 w-[100vw] p-4 flex flex-col justify-between h-auto">
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