"use client";

import { useMemo } from "react";
import deceivePath, { pathFinder } from "../utils/pathHelper";
import {colorClassMap, GridSpace, gridSpaceTypes, types } from "../utils/gridSpaceTypes";

export default function GameGrid() {
    const grid = 50;
    const path = useMemo(() => pathFinder(grid), [grid]);

    return (
        <div className="flex items-center justify-center h-screen w-screen bg-black overflow-auto">
            <div
                className="grid bg-transparent grid-cols-50">
                {Array.from({ length: grid * grid }, (_, i) => {
                    const row = Math.floor(i / grid);
                    const col = i % grid;

                    let space: GridSpace;
                    // check for starting point
                    if (row === 0 && col === 0) {
                        space = gridSpaceTypes["A"]
                    }
                    // check for end point
                    else if (row === grid - 1 && col === grid - 1) {
                        space = gridSpaceTypes["B"]
                    }
                    //Fruit in the middle of the grid to motivate players to keep going if they're low on health or stamina.
                    else if (row === 25 && col === 25) {
                        space = gridSpaceTypes["Fruit"]
                    }
                    else if (path.has(`${row}-${col}`)) {
                        space = deceivePath(gridSpaceTypes)
                    }
                    // we need to set the color to signify to the user what will happen if the user goes to that location. 
                    else {
                        //call external function to generate a winning path..
                        const randomType = types[Math.floor(Math.random() * types.length)];
                        space = gridSpaceTypes[randomType];
                    }
                    return (
                        <div
                            key={`${row}-${col}`}
                            className={`w-5 h-5 flex items-center justify-center text-xs border border-black ${colorClassMap[space.color]}`}
                        >
                        </div>
                    );
                })}
            </div>
        </div>
    );
}