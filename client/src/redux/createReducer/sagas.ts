import { call, put, SagaReturnType, takeEvery } from '@redux-saga/core/effects'
import axios, { AxiosResponse } from 'axios'
import { ActionCreators, ActionTypes } from './'
import { fetchAllBegin } from '../fetchAllReducer/actionCreators'

type apiResposne = SagaReturnType<typeof createUser>

const createUser = async (user: User): Promise<AxiosResponse> => {
    console.log('saga:creating', user)

    if (user) {
        return await axios.post('http://localhost:8081/users', user)
    }

    throw new Error('')
}

function* createUserSaga(action: Action<UserActionPayload>) {
    console.log({ action })
    if (action.payload.user) {
        try {
            const response: apiResposne = yield call(
                createUser,
                action.payload.user
            )

            if (response.status === 201) {
                yield put(ActionCreators.createUserSuccess())
                yield put(fetchAllBegin())
            }
        } catch (err) {
            put(ActionCreators.createUserError(err))
        }
    }
}

// eslint-disable-next-line
export default function* CreateUserWatcher() {
    yield takeEvery(ActionTypes.CREATE_USER_BEGIN, createUserSaga)
}
