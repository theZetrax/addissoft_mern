import * as ActionTypes from './actionTypes'

const initialState: UserActionState = {
    user: null,
    error: null,
    loading: false,
}

const CreateReducer = (
    state: UserActionState = initialState,
    action: Action<UserActionPayload>
): UserActionState => {
    switch (action.type) {
        case ActionTypes.CREATE_USER_BEGIN:
            return {
                ...state,
                loading: true,
                error: null,
            }
        case ActionTypes.CREATE_USER_SUCCESS:
            if (action.payload.user) {
                return {
                    ...state,
                    user: action.payload.user,
                    loading: false,
                }
            }
            throw new Error('Payload does not contain required user data')
        case ActionTypes.CREATE_USER_ERROR:
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

export default CreateReducer
