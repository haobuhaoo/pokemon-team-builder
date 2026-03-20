import { useMemo } from "react";

import type { Pokemon } from "../entities/pokemon";

import Recommendation from "../components/recomendation";
import RoleCounter from "../components/roleCounter";
import TypeCounter from "../components/typeCounter";

import { calcTeamRoleDistribution } from "../utils/roleDistribution";
import { calcTeamTypeSplit } from "../utils/typeCoverage";

type Props = {
    team: Pokemon[];
}

const Coverage: React.FC<Props> = ({ team }) => {
    const statistics = useMemo(() => calcTeamTypeSplit(team), [team]);
    const rolesDist = useMemo(() => calcTeamRoleDistribution(team), [team]);

    return (
        <div style={{ display: "flex", flexDirection: "column", width: "100%", gap: "24px" }}>
            <TypeCounter purpose="weak" team={team} statistics={statistics} />
            <TypeCounter purpose="strong" team={team} statistics={statistics} />
            <RoleCounter rolesDist={rolesDist} />
            <Recommendation team={team} statistics={statistics} rolesDist={rolesDist} />
        </div>
    )
}

export default Coverage