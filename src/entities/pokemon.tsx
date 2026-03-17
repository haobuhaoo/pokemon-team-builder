export interface Sprite {
    front_default: string;
}

export interface Types {
    type: { name: string };
}

export interface Abilities {
    ability: { name: string };
    is_hidden: boolean;
}

export interface Stats {
    base_stat: number;
    effort: number;
    stat: { name: string };
}

export interface Pokemon {
    id: number;
    name: string;
    sprites: Sprite,
    types: Types[];
    abilities: Abilities[];
    stats: Stats[];
}