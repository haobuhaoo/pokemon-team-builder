import { TypeColors, type TypeAnalysis } from "../entities/types";

/**
 * Returns the hex color associated with a Pokémon type.
 *
 * The default color is "#eee" if type not found.
 */
export function typeColor(t: string): string {
    const color = TypeColors[t.toLowerCase() as keyof typeof TypeColors] ?? "eee";
    return "#" + color;
}

/**
 * Determines a color based on how well the team fair.
 *
 * Colors:
 * - Green: strong coverage or favorable defense
 * - Red: weak coverage or poor defense
 * - Black: neutral
 */
export function setColor(teamSize: number, isStrong: boolean, value: TypeAnalysis): string {
    const red = "#ff2020";
    const green = "#00d03b";
    const black = "#000";
    const normalised = isStrong ? value.coverageCount / teamSize : value.defenceScore / teamSize;
    if (isStrong) {
        if (normalised >= 0.5) return green;
        else if (normalised > 0) return black;
        else return red;
    } else {
        if (normalised >= 0.2) return red;
        else if (normalised > -0.2) return black;
        else return green;
    }
}
