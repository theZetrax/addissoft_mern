import axios, { AxiosResponse } from 'axios'
import { call, put, SagaReturnType, takeLatest } from '@redux-saga/core/effects'
import { ActionCreator } from '.'
import { fetchAllBegin } from '../fetchAllReducer/actionCreators'
import { ActionTypes } from '.'

type apiResposne = SagaReturnType<typeof updateUser>

const updateUser = async (user: User): Promise<AxiosResponse> => {
    if (user) {
        return await axios.put(
            `http://localhost:8081/users/${user.userId}`,
            user
        )
    }

    throw new Error('[Updating User]: User information not provided')
}

function* updateUserSaga(action: Action<UserActionPayload>) {
    if (action.payload.user) {
        try {
            const response: apiResposne = yield call(
                updateUser,
                action.payload.user
            )

            if (response.status === 201) {
                yield put(ActionCreator.updateSuccess())
                yield put(fetchAllBegin())
            }
        } catch (err) {
            put(ActionCreator.updateFail(err))
        }
    }
}

// eslint-disable-next-line
export default function* UpdateUserWatcher() {
    yield takeLatest(ActionTypes.UPDATE_BEGIN, updateUserSaga)
}
