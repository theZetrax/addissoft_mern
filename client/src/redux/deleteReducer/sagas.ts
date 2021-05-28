import { call, put, SagaReturnType, takeEvery } from '@redux-saga/core/effects'
import axios, { AxiosResponse } from 'axios'
import * as ActionCreators from './actionCreators'
import * as ActionTypes from './actionTypes'
import { fetchAllBegin } from '../fetchAllReducer/actionCreators'

type apiResponse = SagaReturnType<typeof deleteUser>

const deleteUser = async (user: User): Promise<AxiosResponse> => {
    if (user) {
        return axios.delete(`http://localhost:8081/users/${user.userId}`)
    }

    throw new Error('Payload not correctly defined')
}

function* deleteUserSaga(action: Action<UserActionPayload>) {
    if (action.payload.user) {
        try {
            if (action.payload.user.userId) {
                const response: apiResponse = yield call(
                    deleteUser,
                    action.payload.user
                )

                if (response.status === 200) {
                    yield put(fetchAllBegin()) // Refresh List
                }

                throw new Error('User delete unsuccessful')
            }
        } catch (err) {
            put(ActionCreators.deleteError(err))
        }
    }
}

// eslint-disable-next-line
export default function* DeleteUserWatcher() {
    yield takeEvery(ActionTypes.DELETE_BEGIN, deleteUserSaga)
}
