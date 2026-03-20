import { render, screen } from "@testing-library/react";

import AbilityDisplay from "../../src/components/abilityDisplay";

import { Squirtle } from "../mockups/pokemon";

describe("AbilityDisplay", () => {
    it("renders abilities in indexed format", () => {
        render(<AbilityDisplay ability={Squirtle.abilities} />);
        expect(screen.getByText("1. torrent")).toBeInTheDocument();
        expect(screen.getByText("2. rain-dish (hidden)")).toBeInTheDocument();
    })
})