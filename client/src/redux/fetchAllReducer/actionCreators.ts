import * as ActionTypes from './actionTypes'

export const fetchAllBegin = (): Action<UserCollectionPayload> => ({
    type: ActionTypes.FETCH_ALL_BEGIN,
    payload: {},
})

export const fetchAllSuccess = (
    users: UserCollection
): Action<UserCollectionPayload> => ({
    type: ActionTypes.FETCH_ALL_SUCCESS,
    payload: { users: users },
})

export const fetchAllError = (
    error: string
): Action<UserCollectionPayload> => ({
    type: ActionTypes.FETCH_ALL_BEGIN,
    payload: { error: error },
})
