import * as ActionTypes from './actionTypes'

export const fetchAllUsersBegin = (): Action<UserPayload | null> => ({
    type: ActionTypes.FETCH_ALL_USERS_BEGIN,
    payload: null,
})
