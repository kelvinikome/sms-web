export class Subject {
    id: number;
    subjectCode: string;
    subjectName: string;
    coefficient: number;
    lecturer: string;
    subjectType: SubjectType;
}

export enum SubjectType {
    MANDATORY = "MANDATORY",
    COMPOSARY = "COMPOSARY",
    REQUIRED = "REQUIRED"
}