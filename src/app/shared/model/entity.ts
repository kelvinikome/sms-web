export class Entity {
    id: number
    firstName: string
    middleName: string
    lastName: string
    username: string
    password: string
    email: string
    phoneNumber: string
    sex: string
    studentClass?: string
    teacherClass?: string[]
    admissionDate: string
    entityType: string
}

export enum EntityType {
        STUDENT = "STUDENT",
        TEACHER = "TEACHER",
        ADMIN = "ADMIN"
}