import * as ActionTypes from './actionTypes'

const initialState: UserCollectionState = {
    users: [],
    loading: false,
    error: null,
}

const FetchAllReducer = (
    state: UserCollectionState = initialState,
    action: Action<UserCollectionPayload>
): UserCollectionState => {
    switch (action.type) {
        case ActionTypes.FETCH_ALL_BEGIN:
            return {
                ...state,
                loading: true,
                error: null,
            }
        case ActionTypes.FETCH_ALL_SUCCESS:
            if (action.payload.users) {
                return {
                    ...state,
                    loading: false,
                    users: action.payload.users,
                }
            }
            throw new Error('Payload does not contain required user data')
        case ActionTypes.FETCH_ALL_ERROR:
            if (action.payload.error) {
                return {
                    ...state,
                    loading: false,
                    error: action.payload.error,
                }
            }
            throw new Error('Payload does not contain required error data')
        default:
            return state
    }
}

export default FetchAllReducer
