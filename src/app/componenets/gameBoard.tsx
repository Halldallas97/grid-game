"use client";
import { useEffect, useMemo, useState } from "react";
import { pathFinder } from "../utils/pathUtil";
import { colorClassMap, GridSpace, gridSpaceTypes } from "../utils/gridSpaceTypes";
import { postGridSpaces, todaysGridExists } from "../utils/gridService";
import { generateNewGrid, loadExistingGrid } from "../utils/gridUtils"; 

export default function GameGrid() {
    const grid = 50;
    const path = useMemo(() => pathFinder(grid), [grid]);
    const [gridExists, setGridExists] = useState<boolean | null>(null);
    const [spaces, setSpaces] = useState<GridSpace[][]>([]);
    const [isLoading, setIsLoading] = useState(true);

/**
 * Use effect to render the gameboard 
 * first it checks to see if there was already a board created for the day 
 * if not then we generate a board that goes to the backend (written in Java) 
 * now each everyone plays the same game. This can be useful for daily leaderboards etc. 
 */
    useEffect(() => {
        const checkAndGenerateGrid = async () => {
            setIsLoading(true);
            try {
                //check that their is a grid in the db, if not we will create it 
                const exists = await todaysGridExists();
                setGridExists(exists);

                if (!exists) {
                    // create a new grid if one doesn't exist
                    const newGrid = generateNewGrid(grid, path);
                    setSpaces(newGrid);
                    await postGridSpaces(newGrid);
                } else {
                    // Get the grid that was previously stored in the database
                    const loadedGrid = await loadExistingGrid(grid);
                    setSpaces(loadedGrid);
                }
            } catch (error) {
                console.error("Error loading or generating grid:", error);
            } finally {
                setIsLoading(false);
            }
        };

        checkAndGenerateGrid();
    }, [grid, path]);

    //loading text while getting or creating grid
    if (isLoading || gridExists === null) {
        return <div className="text-white">Loading...</div>;
    }

    const displayGrid = spaces.length > 0 ? spaces : Array.from(
        { length: grid },
        () => Array.from({ length: grid }, () => gridSpaceTypes["Empty"])
    );

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