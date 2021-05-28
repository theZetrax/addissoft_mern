import * as ActionTypes from './actionTypes'

const initialState: UserActionState = {
    error: null,
    loading: false,
}

const DeleteReducer = (
    state: UserActionState = initialState,
    action: Action<UserActionPayload>
): UserActionState => {
    switch (action.type) {
        case ActionTypes.DELETE_BEGIN:
            return {
                ...state,
                loading: true,
                error: null,
            }
        case ActionTypes.DELETE_ERROR:
            if (action.payload.error) {
                return {
                    ...state,
                    loading: false,
                    error: action.payload.error,
                }
            }

            throw new Error('Payload does not contain required error data.')
        default:
            return state
    }
}

export default DeleteReducer
