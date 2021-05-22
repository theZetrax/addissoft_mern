// Gender Definition
enum Gender {
    Male = 1,
    Female = 0,
}

// User Data Type Definition
interface User {
    userId: string | null
    name: string
    birth_date: Date
    gender: Gender
    salary: string
}

// User Collection Definition
type UserCollection = User[]

// State Definition
interface RootState {
    user: UserState
}
interface UserState {
    userCollection: UserCollection
    loading: boolean
    user: User | null
    error: string | null
}

// Payload Definition
interface Payload<CollectionType, InstanceType> {
    loading: boolean
    error: string | null
    collection: CollectionType
    instance: InstanceType
}

type UserPayload = Payload<UserCollection, User>

// Action Definition
type Action<T> = {
    type: string
    payload: T
}

// Dispatch Definition
type DispatchType = (args: Action) => Action
