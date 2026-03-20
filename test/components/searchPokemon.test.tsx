import { vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

import type { PokemonList } from "../../src/entities/pokemon";

import SearchPokemon from "../../src/components/searchPokemon";
import { fetchByUrl } from "../../src/services/fetchPokemon";

import { Charmander } from "../mockups/pokemon";

const mockPokemonList: PokemonList[] = [
    { name: "bulbasaur", url: "url-1" },
    { name: "charmander", url: "url-2" },
    { name: "pikachu", url: "url-3" },
];

vi.mock("../../src/services/fetchPokemon", () => ({
    fetchByUrl: vi.fn()
}));

describe("SearchPokemon", () => {
    const setPokemon = vi.fn();
    const addPokemon = vi.fn();
    const removePokemon = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("renders search input", () => {
        render(
            <SearchPokemon
                allPokemon={mockPokemonList}
                setPokemon={setPokemon}
                addPokemon={addPokemon}
                removePokemon={removePokemon}
            />
        );

        expect(screen.getByLabelText("Search Pokémon")).toBeInTheDocument();
    })

    it("filters options based on input", async () => {
        render(
            <SearchPokemon
                allPokemon={mockPokemonList}
                setPokemon={setPokemon}
                addPokemon={addPokemon}
                removePokemon={removePokemon}
            />
        );

        const input = screen.getByLabelText("Search Pokémon");
        fireEvent.change(input, { target: { value: "pika" } });

        await waitFor(() => {
            expect(screen.getByText("pikachu")).toBeInTheDocument();
        });
    })

    it("selects a Pokemon and calls addPokemon", async () => {
        const mockedFetch = vi.mocked(fetchByUrl);
        mockedFetch.mockResolvedValue(Charmander);

        render(
            <SearchPokemon
                allPokemon={mockPokemonList}
                setPokemon={setPokemon}
                addPokemon={addPokemon}
                removePokemon={removePokemon}
            />
        );

        const input = screen.getByLabelText("Search Pokémon");
        fireEvent.change(input, { target: { value: "charmander" } });

        await waitFor(() => screen.getByText("charmander"));
        fireEvent.click(screen.getByText("charmander"));

        await waitFor(() => {
            expect(fetchByUrl).toHaveBeenCalledWith("url-2");
            expect(setPokemon).toHaveBeenCalled();
            expect(addPokemon).toHaveBeenCalledWith(Charmander);
        });
    })

    it("removes Pokemon when delete button is clicked", () => {
        render(
            <SearchPokemon
                allPokemon={mockPokemonList}
                setPokemon={setPokemon}
                addPokemon={addPokemon}
                removePokemon={removePokemon}
            />
        );

        const button = screen.getByTestId("DeleteIcon");
        fireEvent.click(button);

        expect(removePokemon).toHaveBeenCalled();
        expect(setPokemon).toHaveBeenCalledWith(null);
    })
})