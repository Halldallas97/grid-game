export interface GridSpace {
    Traversed: boolean; 
    Health: number;
    Moves: number;
    color: Color;
    type: string;
}

export type Color = 'green' | 'transparent' | 'brown' | 'red' | 'blue' | 'white' | 'gold';

export const gridSpaceTypes: Record<string, GridSpace> = {
    A: {
        Health: 0, Moves: 0, color: 'green',
        type: "Blank",
        Traversed: false
    },
    B: {
        Health: 0, Moves: 0, color: 'gold',
        type: "",
        Traversed: false
    },
    Blank: {
        Health: 0, Moves: -1, color: 'white',
        type: "Blank",
        Traversed: false
    },
    Speeder: {
        Health: -5, Moves: 0, color: 'blue',
        type: "",
        Traversed: false
    },
    Lava: {
        Health: -50, Moves: -10, color: 'red',
        type: "",
        Traversed: false
    },
    Mud: {
        Health: -10, Moves: -5, color: 'brown',
        type: "",
        Traversed: false
    },
};
export const types = ["Blank", "Speeder", "Lava", "Mud"];


export const colorClassMap: Record<Color, string> = {
    green: "bg-green-600",
    transparent: "bg-transparent",
    white: "bg-white",
    brown: "bg-yellow-700",
    red: "bg-red-600",
    blue: "bg-blue-400",
    gold: "bg-yellow-300"
};

export type ReturnedGrid = GridSpace & {
    row: number;
    col: number;
};