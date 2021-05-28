import * as ActionTypes from './actionTypes'

export const createUserBegin = (user: User): Action<UserActionPayload> => ({
    type: ActionTypes.CREATE_USER_BEGIN,
    payload: { user },
})

export const createUserSuccess = (): Action<UserActionPayload> => ({
    type: ActionTypes.CREATE_USER_SUCCESS,
    payload: {},
})

export const createUserError = (error: string): Action<UserActionPayload> => ({
    type: ActionTypes.CREATE_USER_ERROR,
    payload: { error },
})
