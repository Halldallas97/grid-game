"use client";

import { useEffect, useMemo, useState } from "react";
import { deceivePathType, pathFinder } from "../utils/pathHelper";
import { colorClassMap, GridSpace, gridSpaceTypes, types } from "../utils/gridSpaceTypes";
import { postGridSpaces, todaysGameBoard, todaysGridExists } from "../utils/gridService";

export default function GameGrid() {
    const grid = 50;
    const path = useMemo(() => pathFinder(grid), [grid]);
    //check if a grid was made today
    const [gridExists, setGridExists] = useState<boolean | null>(null);
    //todo something wrong here I think may also be in the backend. 
    const [spaces, setSpaces] = useState<GridSpace[][]>([]);

    useEffect(() => {
        const checkAndGenerateGrid = async () => {
            const exists = await todaysGridExists();
            setGridExists(exists);
            const newGrid: GridSpace[][] = [];

            if (!exists) {
                for (let row = 0; row < grid; row++) {
                    const rowArray: GridSpace[] = [];

                    for (let col = 0; col < grid; col++) {
                        let type: string;
                        //check for start
                        if (row === 0 && col === 0) {
                            type = "A";
                            //check for end
                        } else if (row === grid - 1 && col === grid - 1) {
                            type = "B";
                            //bonus health 
                        } else if (row === 25 && col === 25) {
                            type = "Fruit";
                            //use weight to decieve path
                        } else if (path.has(`${row}-${col}`)) {
                            type = deceivePathType();
                            //fill rest of spaces 
                        } else {
                            type = types[Math.floor(Math.random() * types.length)];
                        }

                        const base = gridSpaceTypes[type];
                        const space: GridSpace = { ...base, type };

                        rowArray.push(space);
                    }

                    newGrid.push(rowArray);
                }
                setSpaces(newGrid);
                await postGridSpaces(newGrid);
            } else {
                // Get the grid that was previously stored in the database.
                const data = await todaysGameBoard();
                setSpaces(data);
            }

        };

        checkAndGenerateGrid();
    }, [grid, path]);

    if (gridExists === null) return <div className="text-white">Loading...</div>;

    const displayGrid = spaces.length > 0 ? spaces : Array.from({ length: grid }, () =>
        Array.from({ length: grid }, () => gridSpaceTypes["Empty"]));

    return (
        <div className="flex items-center justify-center h-screen w-screen bg-black overflow-auto">
            <div className="grid bg-transparent grid-cols-50">
                {displayGrid.flatMap((row, rowIndex) =>
                    row.map((space, colIndex) => (
                        <div
                            key={`${rowIndex}-${colIndex}`}
                            className={`w-5 h-5 flex items-center justify-center text-xs border border-black ${colorClassMap[space.color]}`}
                        />
                    ))
                )}
            </div>
        </div>
    );
}