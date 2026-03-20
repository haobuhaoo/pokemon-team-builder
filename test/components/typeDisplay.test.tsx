import { render, screen } from "@testing-library/react";

import TypeDisplay from "../../src/components/typeDisplay";

describe("TypeDisplay", () => {
    it("renders type label correctly", () => {
        render(<TypeDisplay type="fire" />);
        const label = screen.getByText("FIRE");
        expect(label).toBeInTheDocument();
    })
})