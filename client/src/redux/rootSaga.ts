import { all } from '@redux-saga/core/effects'

import { FetchAllWatcher } from './fetchAllReducer'
import { DeleteUserWatcher } from './deleteReducer'
import { CreateUserWatcher } from './createReducer'

// eslint-disable-next-line
export default function* rootSaga() {
    yield all([FetchAllWatcher(), DeleteUserWatcher(), CreateUserWatcher()])
}
