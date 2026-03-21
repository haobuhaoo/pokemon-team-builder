import { render, screen } from "@testing-library/react";

import RoleCounter from "../../src/components/roleCounter";

import { Charmander } from "../mockups/pokemon";

const rolesDist = {
    physicalAttacker: [Charmander],
    specialAttacker: [],
    physicalDefender: [],
    specialDefender: [],
    balance: []
};

describe("RoleCounter", () => {
    it("renders the title and role labels correctly", () => {
        render(<RoleCounter rolesDist={rolesDist} />);
        expect(screen.getByText("Distribution")).toBeInTheDocument();
        expect(screen.getByText("Physical Attacker:")).toBeInTheDocument();
        expect(screen.getByText("Special Attacker:")).toBeInTheDocument();
        expect(screen.getByText("Physical Defender:")).toBeInTheDocument();
        expect(screen.getByText("Special Defender:")).toBeInTheDocument();
        expect(screen.getByText("Balanced:")).toBeInTheDocument();
    })

    it("renders Pokemon images for roles with Pokemon", () => {
        render(<RoleCounter rolesDist={rolesDist} />);
        const img = screen.getByAltText("charmander") as HTMLImageElement;
        expect(img).toBeInTheDocument();
        expect(img.src).toContain(Charmander.sprites.front_default);
    })
})