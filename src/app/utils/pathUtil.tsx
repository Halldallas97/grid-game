/**
 * I'll be honest, I used chatgpt to help with the functionality here to solve the issue of finding a path. 
 * I wasnt able to ensure that there would always be a path to the finish line with my implementation, and given 
 * time constraints and general sanity without a team for support I used their solution.
 */

export function pathFinder(grid: number): Set<string> {
    const path = new Set<string>();
    let row = 0;
    let col = 0;

    while (row < grid - 1 || col < grid - 1) {
        if (row === grid - 1) {
            col++;
        } else if (col === grid - 1) {
            row++;
        } else {
            Math.random() < 0.5 ? col++ : row++;
        }

        path.add(`${row}-${col}`);
    }

    path.add(`${grid - 1}-${grid - 1}`);

    return path;
}
/*
export function pathFinder(grid: number): Set<string> {
    const path = new Set<string>();
    let row = 0;
    let col = 0;
    path.add(`${row}-${col}`);
    let counter = 0;
    for (let i = 0; i < grid - 1; i++) {
        for (let j = 0; j < grid - 1; j++) {
            if (counter % 2 === 0 && col < grid - 1) {
                col++;
            } else if (row < grid - 1) {
                row++;
            }
            path.add(`${row}-${col}`);
            if (row === grid - 1 && col === grid - 1) {
                break;
            }
        }
        if (row === grid - 1 && col === grid - 1) {
            break;
        }
    }
    path.add(`${grid - 1}-${grid - 1}`);
    return path;
}
*/

export function deceivePathType(): string {
    //added weight here to make sure the path is not as easily identifiable. 
    const weight = [
        "Blank", "Blank", "Blank", "Blank", "Blank", "Blank", "Blank", "Blank", "Blank",
        "Speeder", "Mud"
    ];

    return weight[Math.floor(Math.random() * weight.length)];
}


