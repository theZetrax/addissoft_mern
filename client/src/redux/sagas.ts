import { call, put, takeLatest, SagaReturnType } from '@redux-saga/core/effects'
import axios, { AxiosResponse } from 'axios'
import * as ActionTypes from './reducers/actionTypes'

// Response Types
type apiResponse = SagaReturnType<typeof fetchAllUsers>

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function* watcherSaga() {
    yield takeLatest(ActionTypes.FETCH_ALL_USERS_BEGIN, fetchAllUsersSaga)
}

const fetchAllUsers = async () => await axios.get('http://localhost:8081/users')

function* fetchAllUsersSaga() {
    try {
        const response: apiResponse = yield call(fetchAllUsers)
        const userCollection: UserCollection = yield response.data.users

        yield put({
            type: ActionTypes.FETCH_ALL_USERS_SUCCESS,
            payload: { collection: userCollection },
        } as Action<UserPayload>)
    } catch (err) {
        yield put({
            type: ActionTypes.FETCH_ALL_USERS_ERROR,
            payload: { error: err },
        } as Action<UserPayload>)
    }
}
