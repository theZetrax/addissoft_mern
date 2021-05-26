import * as ActionTypes from './actionTypes'

export const createUserBegin = (): Action<UserPayload> => ({
    type: ActionTypes.CREATE_USER_BEGIN,
    payload: { loading: true, error: null },
})

export const createUserSuccess = (user: User): Action<UserPayload> => ({
    type: ActionTypes.CREATE_USER_SUCCESS,
    payload: { loading: false, error: null, instance: user },
})

export const createUserError = (): Action<UserPayload> => ({
    type: ActionTypes.CREATE_USER_ERROR,
    payload: { loading: false },
})
