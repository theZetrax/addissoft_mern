import { combineReducers } from 'redux'
// import UserReducer from './reducers/userReducer'
import { CreateReducer } from './createReducer'
import { FetchAllReducer } from './fetchAllReducer'
import { DeleteReducer } from './deleteReducer'
import { UpdateReducer } from './updateReducer'

const rootReducer = combineReducers({
    users: FetchAllReducer,
    create: CreateReducer,
    update: UpdateReducer,
    delete: DeleteReducer,
})

export default rootReducer
