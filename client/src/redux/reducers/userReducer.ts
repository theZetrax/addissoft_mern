import * as ActionTypes from './actionTypes'

const initialState: UserState = {
    userCollection: [],
    loading: false,
    error: null,
    user: null,
}

const reducer = (
    state: UserState = initialState,
    action: Action<UserPayload>
): UserState => {
    switch (action.type) {
        // All Users
        case ActionTypes.FETCH_ALL_USERS_BEGIN:
            return {
                ...state,
                loading: true,
                error: null,
            }
        case ActionTypes.FETCH_ALL_USERS_SUCCESS:
            return {
                ...state,
                loading: false,
                userCollection: action.payload.collection,
            }
        case ActionTypes.FETCH_ALL_USERS_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
            }
        // Single User
        case ActionTypes.FETCH_SINGLE_USER_BEGIN:
            return {
                ...state,
                loading: true,
                error: null,
            }
        case ActionTypes.FETCH_SINGLE_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                user: action.payload.instance,
            }
        case ActionTypes.FETCH_SINGLE_USER_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
            }
        // Create User
        case ActionTypes.CREATE_SINGLE_USER_BEGIN:
            return {
                ...state,
                loading: true,
                error: null,
            }
        case ActionTypes.CREATE_SINGLE_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                user: action.payload.instance,
            }
        case ActionTypes.CREATE_SINGLE_USER_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
            }
        // Update User
        case ActionTypes.UPDATE_SINGLE_USER_BEGIN:
            return {
                ...state,
                loading: false,
                error: null,
            }
        case ActionTypes.UPDATE_SINGLE_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                user: action.payload.instance,
            }
        case ActionTypes.UPDATE_SINGLE_USER_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
            }
        default:
            return state
    }
}

const UserReducer = reducer
export default UserReducer
