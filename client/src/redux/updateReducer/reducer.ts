import * as ActionTypes from './actionTypes'

const initialState: UserActionState = {
    user: null,
    loading: false,
    success: false,
    error: null,
}

const UpdateReducer = (
    state: UserActionState = initialState,
    action: Action<UserActionPayload>
): UserActionState => {
    switch (action.type) {
        case ActionTypes.UPDATE_BEGIN:
            return {
                ...state,
                loading: true,
                error: null,
                success: false,
            } as UserActionState
        case ActionTypes.UPDATE_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
            } as UserActionState
        case ActionTypes.UPDATE_FAIL:
            if (action.payload.error) {
                return {
                    ...state,
                    loading: false,
                    success: false,
                    error: action.payload.error,
                } as UserActionState
            }

            throw new Error('Payload does not contain required error data.')
        default:
            return state
    }
}

export default UpdateReducer
