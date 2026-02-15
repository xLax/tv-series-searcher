import React from "react"
import { CastMember } from "../types/castMember"

const CastItem: React.FC<{ cast: CastMember }> = ({ cast }) => {
    const { person, character } = cast;

    return <li className="cast-item">
        <img src={person.image?.medium} alt={person.name} className="cast-thumb" />
        <span>{person.name} {character ? `as ${character.name}` : ''}</span>
    </li>
}

export default CastItem;