import { render, screen } from "@testing-library/react";

import Recommendation from "../../src/components/recomendation";
import { getRec } from "../../src/utils/getRecommendation";

vi.mock("../../src/utils/getRecommendation", () => ({
    getRec: vi.fn()
}));

vi.mock("../../src/utils/typeCoverage", () => ({
    unpackStats: vi.fn(() => ({}))
}));

vi.mock("../../src/utils/roleDistribution", () => ({
    unpackRoles: vi.fn(() => ({}))
}));

describe("Recommendation", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    })

    it("renders recommendations", () => {
        (getRec as any).mockReturnValue([
            "Major weakness: Fire",
            "Too few physical attackers."
        ]);

        render(<Recommendation team={[]} statistics={{}} rolesDist={{}} />);

        expect(screen.getByText("- Major weakness: Fire")).toBeInTheDocument();
        expect(screen.getByText("- Too few physical attackers.")).toBeInTheDocument();
    })

    it("renders multiple recommendations", () => {
        (getRec as any).mockReturnValue(["Rec 1", "Rec 2", "Rec 3"]);

        render(<Recommendation team={[]} statistics={{}} rolesDist={{}} />);

        expect(screen.getAllByText(/-/)).toHaveLength(3);
    })

    it("renders no list when no recommendations", () => {
        (getRec as any).mockReturnValue([]);

        render(<Recommendation team={[]} statistics={{}} rolesDist={{}} />);

        expect(screen.getByText("Recommendation")).toBeInTheDocument();
        expect(screen.queryByText(/-/)).toBeNull();
    })
})