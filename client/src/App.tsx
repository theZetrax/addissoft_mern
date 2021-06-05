import React from 'react'
import { UserList, AddUser } from './components'
import styled from 'styled-components'

const MainDiv = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    > * {
    }
`

const App: React.FunctionComponent = () => {
    return (
        <MainDiv>
            <AddUser />
            <UserList />
        </MainDiv>
    )
}

export default App
