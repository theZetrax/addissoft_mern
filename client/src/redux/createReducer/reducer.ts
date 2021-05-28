import * as ActionTypes from './actionTypes'

const initialState: CreateUserActionState = {
    user: null,
    error: null,
    created: false,
    loading: false,
}

const CreateReducer = (
    state: CreateUserActionState = initialState,
    action: Action<UserActionPayload>
): CreateUserActionState => {
    switch (action.type) {
        case ActionTypes.CREATE_USER_BEGIN:
            if (action.payload.user) {
                return {
                    ...state,
                    loading: true,
                    error: null,
                    created: false,
                    user: action.payload.user,
                }
            }

            throw new Error('Payload does not contain required user data')
        case ActionTypes.CREATE_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                created: true,
            }
        case ActionTypes.CREATE_USER_ERROR:
            if (action.payload.error) {
                return {
                    ...state,
                    loading: false,
                    created: false,
                    error: action.payload.error,
                }
            }
            throw new Error('Payload does not contain required error data')
        default:
            return state
    }
}

export default CreateReducer
