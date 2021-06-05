import * as ActionTypes from './actionTypes'

export const deleteBegin = (user: User): Action<UserActionPayload> => ({
    type: ActionTypes.DELETE_BEGIN,
    payload: { user },
})

export const deleteSuccess = (): Action<UserActionPayload> => ({
    type: ActionTypes.DELETE_SUCCESS,
    payload: {},
})

export const deleteError = (error: string): Action<UserActionPayload> => ({
    type: ActionTypes.DELETE_ERROR,
    payload: { error },
})
