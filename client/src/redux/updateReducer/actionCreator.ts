import * as ActionTypes from './actionTypes'

export const updateBegin = (user: User): Action<UserActionPayload> => ({
    type: ActionTypes.UPDATE_BEGIN,
    payload: { user },
})

export const updateSuccess = (): Action<UserActionPayload> => ({
    type: ActionTypes.UPDATE_SUCCESS,
    payload: {},
})

export const updateFail = (error: string): Action<UserActionPayload> => ({
    type: ActionTypes.UPDATE_FAIL,
    payload: { error },
})
