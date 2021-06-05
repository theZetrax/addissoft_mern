import * as ActionTypes from './actionTypes'

const initialState: UserActionState = {
    user: null,
    error: null,
    success: false,
    loading: false,
}

const CreateReducer = (
    state: UserActionState = initialState,
    action: Action<UserActionPayload>
): UserActionState => {
    switch (action.type) {
        case ActionTypes.CREATE_USER_BEGIN:
            if (action.payload.user) {
                return {
                    ...state,
                    loading: true,
                    error: null,
                    success: false,
                    user: action.payload.user,
                }
            }

            throw new Error('Payload does not contain required user data')
        case ActionTypes.CREATE_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
            }
        case ActionTypes.CREATE_USER_ERROR:
            if (action.payload.error) {
                return {
                    ...state,
                    loading: false,
                    success: false,
                    error: action.payload.error,
                }
            }
            throw new Error('Payload does not contain required error data')
        default:
            return state
    }
}

export default CreateReducer
