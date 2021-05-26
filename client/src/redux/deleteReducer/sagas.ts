import { call, put, SagaReturnType, takeLatest } from '@redux-saga/core/effects'
import axios, { AxiosResponse } from 'axios'
import * as ActionCreators from './actionCreators'
import * as ActionTypes from './actionTypes'

type apiResponse = SagaReturnType<typeof deleteUser>

const deleteUser = async (userId: string): Promise<AxiosResponse> => {
    return axios.delete(`localhost:8081/users/${userId}`)
}

function* deleteUserSaga(user: User) {
    try {
        if (user.userId) {
            const response: apiResponse = yield call(deleteUser, user.userId)

            if (response.status === 200) {
                put(ActionCreators.deleteSuccess(user))
            }

            throw new Error('User delete unsuccessful')
        }
    } catch (err) {
        put(ActionCreators.deleteError(err))
    }
}

// eslint-disable-next-line
export default function* DeleteUserWatcher(user: User) {
    yield takeLatest(ActionTypes.DELETE_BEGIN, deleteUserSaga, user)
}
