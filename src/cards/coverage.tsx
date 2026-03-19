import { useEffect, useState } from "react";

import type { Pokemon } from "../entities/pokemon";

import RoleCounter from "../components/roleCounter";
import TypeCounter from "../components/typeCounter";

type Props = {
    team: (Pokemon | null)[];
}

const Coverage: React.FC<Props> = ({ team }) => {
    const [pkmOnlyTeam, setPkmOnlyTeam] = useState<Pokemon[]>([]);

    const filteredTeam = (team: (Pokemon | null)[]): Pokemon[] => {
        return team.filter(p => p !== null);
    };

    useEffect(() => {
        setPkmOnlyTeam(filteredTeam(team));
    }, [team]);

    return (
        <div style={{ display: "flex", flexDirection: "column", width: "100%", gap: "24px" }}>
            <TypeCounter purpose="weak" team={pkmOnlyTeam} />
            <TypeCounter purpose="strong" team={pkmOnlyTeam} />
            <RoleCounter team={pkmOnlyTeam} />
        </div>
    )
}

export default Coverage