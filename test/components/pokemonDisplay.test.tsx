import { vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

import PokemonDisplay from "../../src/components/pokemonDisplay";

import { Charmander } from "../mockups/pokemon";

vi.mock("../../src/components/searchPokemon", () => ({
    default: ({ setPokemon }: any) => (
        <button onClick={() => setPokemon(Charmander)}>
            Select Pokemon
        </button>
    )
}));

vi.mock("../../src/components/statsDisplay", () => ({
    default: () => <div>Stats</div>
}));

vi.mock("../../src/components/abilityDisplay", () => ({
    default: () => <div>Abilities List</div>
}));

vi.mock("../../src/components/typeDisplay", () => ({
    default: ({ type }: any) => <div>{type}</div>
}));

describe("PokemonDisplay", () => {
    it("renders EmptyDisplay initially", () => {
        render(<PokemonDisplay allPokemon={[]} addPokemon={vi.fn()} removePokemon={vi.fn()} />);
        expect(screen.queryByText("Charmander")).toBeNull();
    })

    it("renders Pokemon details after selection", () => {
        render(<PokemonDisplay allPokemon={[]} addPokemon={vi.fn()} removePokemon={vi.fn()} />);

        fireEvent.click(screen.getByText("Select Pokemon"));

        expect(screen.getByText("charmander")).toBeInTheDocument();
        expect(screen.getByText("fire")).toBeInTheDocument();
        expect(screen.getByText("Stats")).toBeInTheDocument();
        expect(screen.getByText("Abilities List")).toBeInTheDocument();
    })

    it("renders image with correct alt text", () => {
        render(<PokemonDisplay allPokemon={[]} addPokemon={vi.fn()} removePokemon={vi.fn()} />);

        fireEvent.click(screen.getByText("Select Pokemon"));

        const img = screen.getByAltText("charmander");
        expect(img).toBeInTheDocument();
        expect(img).toHaveAttribute("src", Charmander.sprites.front_default);
    })
})