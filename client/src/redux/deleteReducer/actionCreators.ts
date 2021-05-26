import * as ActionTypes from './actionTypes'

export const deleteBegin = (): Action<UserActionPayload> => ({
    type: ActionTypes.DELETE_BEGIN,
    payload: {},
})

export const deleteSuccess = (user: User): Action<UserActionPayload> => ({
    type: ActionTypes.DELETE_SUCCESS,
    payload: { user: user },
})

export const deleteError = (error: string): Action<UserActionPayload> => ({
    type: ActionTypes.DELETE_ERROR,
    payload: { error: error },
})
