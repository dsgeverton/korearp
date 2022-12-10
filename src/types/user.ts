export type User = {
    id?: string,
    contact: string,
    passport: Number,
    name: string,
    login: string,
    secret?: string,
    role: "USER" | "ADMIN"
}