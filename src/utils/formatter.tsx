/**
 * Capitalises a Pokémon name.
 */
export function capitaliseName(text: string): string {
    return text.split("-")
        .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
        .join("-");
}