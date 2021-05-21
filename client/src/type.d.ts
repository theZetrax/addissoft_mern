enum Gender {
    Male = 1,
    Female = 0,
}

interface IUser {
    userId: string | null
    name: string
    birth_date: Date
    gender: Gender
    salary: string
}
