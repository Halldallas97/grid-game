//handler for all api calls
import { GridSpace } from "./gridSpaceTypes";

export async function todaysGridExists() {
    try {
        const response = await fetch(`http://localhost:8080/api/server/game/exists`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error checking if grid exists:", error);
        return false;
    }
}

export async function todaysGameBoard() {
    try {
        const response = await fetch(`http://localhost:8080/api/server/game/saved-board`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error checking if grid exists:", error);
        return false;
    }
}

export async function postGridSpaces(spaces: GridSpace[][]) {
    try {
        const response = await fetch(`http://localhost:8080/api/server/game/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(spaces),
        });

        if (!response.ok) {
            throw new Error(`Server error: ${response.status}`);
        }
    } catch (error) {
        console.error("Error posting grid:", error);
        return false;
    }
}

