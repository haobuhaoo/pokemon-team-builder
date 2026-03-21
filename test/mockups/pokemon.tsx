import type { Pokemon } from "../../src/entities/pokemon";

export const Bulbasaur: Pokemon = {
    id: 1,
    name: "bulbasaur",
    sprites: { front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png" },
    types: [{ type: { name: "grass" } }, { type: { name: "poison" } }],
    abilities: [
        { ability: { name: "overgrow" }, is_hidden: false },
        { ability: { name: "chlorophyll" }, is_hidden: true }
    ],
    stats: [
        { base_stat: 45, stat: { name: "hp" } },
        { base_stat: 49, stat: { name: "attack" } },
        { base_stat: 49, stat: { name: "defense" } },
        { base_stat: 65, stat: { name: "special-attack" } },
        { base_stat: 65, stat: { name: "special-defense" } },
        { base_stat: 45, stat: { name: "speed" } }
    ]
};

export const Charmander: Pokemon = {
    id: 4,
    name: "charmander",
    sprites: { front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png" },
    types: [{ type: { name: "fire" } }],
    abilities: [
        { ability: { name: "blaze" }, is_hidden: false },
        { ability: { name: "solar-power" }, is_hidden: true }
    ],
    stats: [
        { base_stat: 39, stat: { name: "hp" } },
        { base_stat: 52, stat: { name: "attack" } },
        { base_stat: 43, stat: { name: "defense" } },
        { base_stat: 60, stat: { name: "special-attack" } },
        { base_stat: 50, stat: { name: "special-defense" } },
        { base_stat: 65, stat: { name: "speed" } }
    ]
};

export const Squirtle: Pokemon = {
    id: 7,
    name: "squirtle",
    sprites: { front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png" },
    types: [{ type: { name: "water" } }],
    abilities: [
        { ability: { name: "torrent" }, is_hidden: false },
        { ability: { name: "rain-dish" }, is_hidden: true }
    ],
    stats: [
        { base_stat: 44, stat: { name: "hp" } },
        { base_stat: 48, stat: { name: "attack" } },
        { base_stat: 65, stat: { name: "defense" } },
        { base_stat: 50, stat: { name: "special-attack" } },
        { base_stat: 64, stat: { name: "special-defense" } },
        { base_stat: 43, stat: { name: "speed" } }
    ]
};

export const Cloyster: Pokemon = {
    id: 91,
    name: "cloyster",
    sprites: { front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/91.png" },
    types: [{ type: { name: "water" } }, { type: { name: "ice" } }],
    abilities: [
        { ability: { name: "shell-armor" }, is_hidden: false },
        { ability: { name: "skill-link" }, is_hidden: false },
        { ability: { name: "overcoat" }, is_hidden: true }
    ],
    stats: [
        { base_stat: 50, stat: { name: "hp" } },
        { base_stat: 95, stat: { name: "attack" } },
        { base_stat: 180, stat: { name: "defense" } },
        { base_stat: 85, stat: { name: "special-attack" } },
        { base_stat: 45, stat: { name: "special-defense" } },
        { base_stat: 70, stat: { name: "speed" } }
    ]
};

export const Dragonite: Pokemon = {
    id: 149,
    name: "dragonite",
    sprites: { front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/149.png" },
    types: [{ type: { name: "dragon" } }, { type: { name: "flying" } }],
    abilities: [
        { ability: { name: "inner-focus" }, is_hidden: false },
        { ability: { name: "multiscale" }, is_hidden: true }
    ],
    stats: [
        { base_stat: 91, stat: { name: "hp" } },
        { base_stat: 134, stat: { name: "attack" } },
        { base_stat: 95, stat: { name: "defense" } },
        { base_stat: 100, stat: { name: "special-attack" } },
        { base_stat: 100, stat: { name: "special-defense" } },
        { base_stat: 80, stat: { name: "speed" } }
    ]
};

export const Mew: Pokemon = {
    id: 151,
    name: "mew",
    sprites: { front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/151.png" },
    types: [{ type: { name: "psychic" } }],
    abilities: [
        { ability: { name: "synchronize" }, is_hidden: false }
    ],
    stats: [
        { base_stat: 100, stat: { name: "hp" } },
        { base_stat: 100, stat: { name: "attack" } },
        { base_stat: 100, stat: { name: "defense" } },
        { base_stat: 100, stat: { name: "special-attack" } },
        { base_stat: 100, stat: { name: "special-defense" } },
        { base_stat: 100, stat: { name: "speed" } }
    ]
};

export const Blissey: Pokemon = {
    id: 242,
    name: "blissey",
    sprites: { front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/242.png" },
    types: [{ type: { name: "normal" } }],
    abilities: [
        { ability: { name: "nature-cure" }, is_hidden: false },
        { ability: { name: "serene-grace" }, is_hidden: false },
        { ability: { name: "healer" }, is_hidden: true }
    ],
    stats: [
        { base_stat: 255, stat: { name: "hp" } },
        { base_stat: 10, stat: { name: "attack" } },
        { base_stat: 10, stat: { name: "defense" } },
        { base_stat: 75, stat: { name: "special-attack" } },
        { base_stat: 135, stat: { name: "special-defense" } },
        { base_stat: 55, stat: { name: "speed" } }
    ]
};

export const Gardevoir: Pokemon = {
    id: 282,
    name: "gardevoir",
    sprites: { front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/282.png" },
    types: [{ type: { name: "psychic" } }, { type: { name: "fairy" } }],
    abilities: [
        { ability: { name: "synchronize" }, is_hidden: false },
        { ability: { name: "trace" }, is_hidden: false },
        { ability: { name: "telepathy" }, is_hidden: true }
    ],
    stats: [
        { base_stat: 68, stat: { name: "hp" } },
        { base_stat: 65, stat: { name: "attack" } },
        { base_stat: 65, stat: { name: "defense" } },
        { base_stat: 125, stat: { name: "special-attack" } },
        { base_stat: 115, stat: { name: "special-defense" } },
        { base_stat: 80, stat: { name: "speed" } }
    ]
};
