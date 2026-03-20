import { render, screen } from "@testing-library/react";

import type { Pokemon } from "../../src/entities/pokemon";
import type { TypeAnalysis } from "../../src/entities/types";

import TypeCounter from "../../src/components/typeCounter";

import { Bulbasaur, Charmander, Squirtle } from "../mockups/pokemon";
import { fairyTypeAnalysis, fireTypeAnalysis, psychicTypeAnalysis } from "../mockups/typeAnalysis";

const sampleStats: Record<string, TypeAnalysis> = {
    fire: fireTypeAnalysis, psychic: psychicTypeAnalysis, fairy: fairyTypeAnalysis
};

const sampleTeam: Pokemon[] = [Bulbasaur, Charmander, Squirtle];

describe("TypeCounter", () => {
    it("renders the title for strong purpose", () => {
        render(<TypeCounter purpose="strong" team={sampleTeam} statistics={sampleStats} />);
        expect(screen.getByText("Coverage")).toBeInTheDocument();
    })

    it("renders all type labels and numbers", () => {
        render(<TypeCounter purpose="strong" team={sampleTeam} statistics={sampleStats} />);
        expect(screen.getByText("FIRE")).toBeInTheDocument();
        expect(screen.getByText("PSYCHIC")).toBeInTheDocument();
        expect(screen.getByText("FAIRY")).toBeInTheDocument();
        expect(screen.getAllByText("1")).toHaveLength(2);
        expect(screen.getByText("0")).toBeInTheDocument();
    })

    it("renders the title for weak purpose", () => {
        render(<TypeCounter purpose="weak" team={sampleTeam} statistics={sampleStats} />);
        expect(screen.getByText("Weakness")).toBeInTheDocument();
    })

    it("renders defenceScore numbers when purpose is weak", () => {
        render(<TypeCounter purpose="weak" team={sampleTeam} statistics={sampleStats} />);
        expect(screen.getByText("1")).toBeInTheDocument();
        expect(screen.getByText("0")).toBeInTheDocument();
        expect(screen.getByText("-1")).toBeInTheDocument();
    })
})