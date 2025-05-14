"use client";
import { useEffect, useMemo, useState } from "react";
import { pathFinder } from "../utils/pathUtil";
import { colorClassMap, GridSpace, gridSpaceTypes, Color } from "../utils/gridSpaceTypes";
import { postGridSpaces, todaysGridExists } from "../utils/gridService";
import { generateNewGrid, loadExistingGrid } from "../utils/gridUtils";
import { useUser } from "../context/userContext";

export default function GameGrid() {
    const grid = 50;
    const path = useMemo(() => pathFinder(grid), [grid]);
    const [gridExists, setGridExists] = useState<boolean | null>(null);
    const [spaces, setSpaces] = useState<GridSpace[][]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [position, setPosition] = useState<[number, number]>([0, 0]);
    const [row, col] = position;
    const { updateHealth, updateMoves } = useUser();


    const keyInput = (event: KeyboardEvent) => {
        event.preventDefault();
        let newPos: [number, number] = [...position] as [number, number];

        switch (event.key) {
            case "ArrowUp":
                if (row > 0) newPos = [row - 1, col];
                break;
            case "ArrowDown":
                if (row < grid - 1) newPos = [row + 1, col];
                break;
            case "ArrowLeft":
                if (col > 0) newPos = [row, col - 1];
                break;
            case "ArrowRight":
                if (col < grid - 1) newPos = [row, col + 1];
                break;
            default:
                return;
        }

        if (newPos[0] !== row || newPos[1] !== col) {
            const updatedSpaces = [...spaces];
            //before setting to type a get the current space
            const currentSpace = updatedSpaces[newPos[0]][newPos[1]];
            const currentType = currentSpace.type;

            // Update health and moves based on the space values
            updateHealth(currentSpace.Health);
            updateMoves(currentSpace.Moves);

            //set the current position traversed to green. 
            //todo update type here so that the user only takes blank damage... 
            const updatedSpace: GridSpace = {
                ...currentSpace,
                Traversed: true,
                color: 'green' as Color,
                type: ""
            };
            updatedSpaces[newPos[0]][newPos[1]] = updatedSpace;
            setSpaces(updatedSpaces);
            setPosition(newPos);
        }
    };

    useEffect(() => {
        const handle = (event: KeyboardEvent) => keyInput(event);
        window.addEventListener("keydown", handle);
        return () => {
            window.removeEventListener("keydown", handle);
        };
    }, [row, col, spaces]);

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
        () => Array.from({ length: grid }, () => gridSpaceTypes["Blank"])
    );

    return (
        <>
            {position[0] === 49 && position[1] === 49 ? (
                <div className="flex items-center justify-center h-screen">
                    <div className="flex flex-col items-center text-center text-white space-y-6">
                        <div className="text-3xl">
                            You Win.
                        </div>
                        <button className="hover:text-gray-400" onClick={() => window.location.reload()}>
                            Play Again?
                        </button>
                    </div>
                </div>
            )
                : (
                    <div className="flex items-center justify-center h-screen w-screen bg-black overflow-auto">
                        <div className="grid bg-transparent grid-cols-50">
                            {displayGrid.flatMap((row, rowIndex) =>
                                row.map((space, colIndex) => (
                                    <div
                                        key={`${rowIndex}-${colIndex}`}
                                        className={`w-5 h-5 flex items-center justify-center text-xs border border-black ${colorClassMap[space.color]}
                            ${rowIndex === position[0] && colIndex === position[1] ? 'opacity-35' : ''}`}
                                    />
                                ))
                            )}
                        </div>
                    </div>
                )}

        </>

    );

}