import { Image } from "./image";

interface Person {
    id: number;
    name: string;
    image?: Image;
}

interface Character {
    name: string;
}

export interface CastMember {
    person: Person;
    character: Character;
}
