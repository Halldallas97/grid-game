export interface GridSpace {
    Health: number;
    Moves: number;
    color: Color;
    type: string;
}

export type Color = 'green' | 'transparent' | 'brown' | 'red' | 'blue' | 'white' | 'gold';

export const gridSpaceTypes: Record<string, GridSpace> = {
    A: {
        Health: 0, Moves: 0, color: 'green',
        type: ""
    },
    B: {
        Health: 0, Moves: 0, color: 'transparent',
        type: ""
    },
    Blank: {
        Health: 0, Moves: -1, color: 'white',
        type: ""
    },
    Speeder: {
        Health: -5, Moves: 0, color: 'blue',
        type: ""
    },
    Lava: {
        Health: -50, Moves: -10, color: 'red',
        type: ""
    },
    Mud: {
        Health: -10, Moves: -5, color: 'brown',
        type: ""
    },
    Fruit: {
        Health: 50, Moves: 5, color: 'gold',
        type: ""
    },

};
export const types = ["Blank", "Speeder", "Lava", "Mud"];


export const colorClassMap: Record<Color, string> = {
    green: "bg-green-600",
    transparent: "bg-transparent",
    white: "bg-white",
    brown: "bg-yellow-900",
    red: "bg-red-600",
    blue: "bg-blue-400",
    gold: "bg-yellow-300"
};
