import { todaysGameBoard } from "./gridService";
import { GridSpace, gridSpaceTypes, ReturnedGrid, types } from "./gridSpaceTypes";
import { deceivePathType } from "./pathUtil";

export const generateNewGrid = (gridSize: number, pathSet: Set<string>): GridSpace[][] => {
    const newGrid: GridSpace[][] = [];

    for (let row = 0; row < gridSize; row++) {
        const rowArray: GridSpace[] = [];
        for (let col = 0; col < gridSize; col++) {
            let type: string;

            // Check for start
            if (row === 0 && col === 0) {
                type = "A";
                // Check for end
            } else if (row === gridSize - 1 && col === gridSize - 1) {
                type = "B";
                // Use weight to deceive path
            } else if (pathSet.has(`${row}-${col}`)) {
                type = deceivePathType();
                // Fill rest of spaces
            } else {
                type = types[Math.floor(Math.random() * types.length)];
            }

            const base = gridSpaceTypes[type];
            const space: GridSpace = { ...base, type };
            rowArray.push(space);
        }
        newGrid.push(rowArray);
    }

    return newGrid;
};

export const loadExistingGrid = async (gridSize: number): Promise<GridSpace[][]> => {
    const data = await todaysGameBoard();
    console.log("Getting game created on: " + data.games.createdDate);

    if (Array.isArray(data.games.gridList)) {
        // Check if it's already a 2D array
        if (Array.isArray(data.games.gridList[0])) {
            return data.games.gridList;
        } else {
            // It's a flat array with row/col properties - convert to 2D
            const newGrid: GridSpace[][] = Array(gridSize).fill(null).map(() =>
                Array(gridSize).fill(null).map(() => ({ ...gridSpaceTypes["Empty"] }))
            );

            // Populate with the data we have
            (data.games.gridList as ReturnedGrid[]).forEach((space) => {
                if (typeof space.row === 'number' && typeof space.col === 'number') {
                    // Get the base properties for this type if available
                    const baseSpace = gridSpaceTypes[space.type] || gridSpaceTypes["Empty"];

                    // Create the grid space with proper properties
                    newGrid[space.row][space.col] = {
                        ...baseSpace,
                        type: space.type,
                        color: space.color || baseSpace.color
                    };
                }
            });

            return newGrid;
        }
    } else {
        console.error("Invalid grid data format:", data.games.gridList);
        // Return an empty grid as fallback
        return Array(gridSize).fill(null).map(() =>
            Array(gridSize).fill(null).map(() => ({ ...gridSpaceTypes["Empty"] }))
        );
    }
};
