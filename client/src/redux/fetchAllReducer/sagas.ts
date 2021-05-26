import { call, put, takeLatest, SagaReturnType } from '@redux-saga/core/effects'
import axios, { AxiosResponse } from 'axios'
import * as ActionTypes from './actionTypes'
import * as ActionCreators from './actionCreators'

type apiResponse = SagaReturnType<typeof fetchAll>

const fetchAll = async (): Promise<AxiosResponse> =>
    await axios.get('http://localhost:8081/users')

function* fetchAllUsersSaga() {
    try {
        const response: apiResponse = yield call(fetchAll)
        const userCollection: UserCollection = yield response.data.users

        yield put(ActionCreators.fetchAllSuccess(userCollection))
    } catch (err) {
        yield put(ActionCreators.fetchAllError(err))
    }
}

// eslint-disable-next-line
export default function* FetchAllWatcher() {
    yield takeLatest(ActionTypes.FETCH_ALL_BEGIN, fetchAllUsersSaga)
}
