import React from 'react'
import { UserList, AddUser } from './components'

const App: React.FunctionComponent = () => {
    return (
        <>
            <AddUser />
            <UserList />
        </>
    )
}

export default App
