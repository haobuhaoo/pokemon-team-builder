import { TypeColors } from "../entities/types";

export const typeColor = (t: string): string => {
    const color = TypeColors[t.toLocaleLowerCase() as keyof typeof TypeColors] ?? "eee";
    return "#" + color;
};
