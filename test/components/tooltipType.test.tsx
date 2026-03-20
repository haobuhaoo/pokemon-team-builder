import { render, screen } from "@testing-library/react";

import type { TypeAnalysis } from "../../src/entities/types";
import TooltipType from "../../src/components/tooltipType";

import { Blissey, Bulbasaur, Gardevoir, Squirtle } from "../mockups/pokemon";
import { emptyTypeAnalysis } from "../mockups/typeAnalysis";

describe("TooltipType", () => {
    it("renders empty coverage tooltip correctly", () => {
        render(<TooltipType isStrong={true} type={""} value={emptyTypeAnalysis} />);
        expect(screen.getByText("Super Effective: None")).toBeInTheDocument();
    })

    it("renders non-empty coverage tooltip correctly", () => {
        const value: TypeAnalysis = { ...emptyTypeAnalysis, coveragePokemon: [Gardevoir.name, Blissey.name] };
        render(<TooltipType isStrong={true} type={""} value={value} />);
        expect(screen.getByText("Super Effective: gardevoir, blissey")).toBeInTheDocument();
    })

    it("renders empty defence tooltip correctly", () => {
        render(<TooltipType isStrong={false} type={"fire"} value={emptyTypeAnalysis} />);
        expect(screen.getByText("fire")).toBeInTheDocument();
        expect(screen.getByText("Weak: None")).toBeInTheDocument();
        expect(screen.getByText("Resist: None")).toBeInTheDocument();
        expect(screen.getByText("Immune: None")).toBeInTheDocument();
    })

    it("renders non-empty defence tooltip correctly", () => {
        const value: TypeAnalysis = {
            ...emptyTypeAnalysis,
            weakPokemon: [Bulbasaur.name],
            resistPokemon: [Squirtle.name],
            immunePokemon: [Gardevoir.name]
        };
        render(<TooltipType isStrong={false} type={"fire"} value={value} />);
        expect(screen.getByText("fire")).toBeInTheDocument();
        expect(screen.getByText("Weak: bulbasaur")).toBeInTheDocument();
        expect(screen.getByText("Resist: squirtle")).toBeInTheDocument();
        expect(screen.getByText("Immune: gardevoir")).toBeInTheDocument();
    })

    it("renders partial empty defence tooltip correctly", () => {
        const value: TypeAnalysis = {
            ...emptyTypeAnalysis,
            weakPokemon: [Bulbasaur.name]
        };
        render(<TooltipType isStrong={false} type={"fire"} value={value} />);
        expect(screen.getByText("fire")).toBeInTheDocument();
        expect(screen.getByText("Weak: bulbasaur")).toBeInTheDocument();
        expect(screen.getByText("Resist: None")).toBeInTheDocument();
        expect(screen.getByText("Immune: None")).toBeInTheDocument();
    })
})