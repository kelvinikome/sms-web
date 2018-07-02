import { Subject } from "./subject-entity";
import { Entity } from "./entity";

export class ClassEntity {
    id: number
    className: string
    description: string
    subjectEntities: Subject[]
    classList: ClassEntity[]
    classAdmin: string
  }