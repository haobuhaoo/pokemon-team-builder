import { render, screen } from "@testing-library/react";

import StatsDisplay from "../../src/components/statsDisplay";

import { Bulbasaur } from "../mockups/pokemon";

describe("StatsDisplay", () => {
    it("renders stats chart with total stats correctly", () => {
        render(<StatsDisplay stats={Bulbasaur.stats} />);
        expect(screen.getByText("HP")).toBeInTheDocument();
        expect(screen.getByText("Attack")).toBeInTheDocument();
        expect(screen.getByText("Defense")).toBeInTheDocument();
        expect(screen.getByText("Sp. Atk")).toBeInTheDocument();
        expect(screen.getByText("Sp. Def")).toBeInTheDocument();
        expect(screen.getByText("Speed")).toBeInTheDocument();
        expect(screen.getAllByText(/45/)).toHaveLength(2);
        expect(screen.getAllByText(/49/)).toHaveLength(2);
        expect(screen.getAllByText(/65/)).toHaveLength(2);
        expect(screen.getByText("Base Stats Total: 318")).toBeInTheDocument();
    })
})