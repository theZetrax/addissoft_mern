// Gender Definition
enum Gender {
    Male = 'Male',
    Female = 'Female',
}

// User Data Type Definition
interface User {
    userId: string | null
    name: string
    birth_date: string
    gender: Gender
    salary: string
}

// User Collection Definition
type UserCollection = User[]

// State Definition
interface RootState {
    users: UserCollectionState
    create: CreateUserActionState
    update: UserActionState
    delete: UserActionState
}
interface UserCollectionState {
    users: UserCollection
    loading: boolean
    error: string | null
}

interface UserActionState {
    user?: User | null
    loading: boolean
    error: string | null
}

interface CreateUserActionState extends UserActionState {
    created: boolean
}

// Payload Definition
interface Payload<CollectionType, InstanceType> {
    loading: boolean
    error?: string | null
    collection?: CollectionType
    instance?: InstanceType
}

interface IPayload {
    error?: string | null
}

interface UserActionPayload extends IPayload {
    user?: User | null
}

interface UserCollectionPayload extends IPayload {
    users?: UserCollection
}

type UserPayload = Payload<UserCollection, User>

// Action Definition
type Action<PayloadType> = {
    type: string
    payload: PayloadType
}

// Dispatch Definition
type DispatchType = (args: Action) => Action
