import React from 'react'
import { connect } from 'react-redux'
import * as ActionTypes from './redux/reducers/actionTypes'

import logo from './logo.svg'
import './App.css'

interface Props {
    users: UserCollection
    loading: boolean
    error: string | null
    onRequestUsers: any
}

const App: React.FunctionComponent<Props> = (props: Props) => {
    const { onRequestUsers } = props

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Edit <code>src/App.tsx</code> and save to reload.
                </p>
                <button onClick={onRequestUsers}>Click</button>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer">
                    Learn React
                </a>
            </header>
        </div>
    )
}

const mapStateToProps = (state: RootState) => ({
    users: state.user.userCollection,
    loading: state.user.loading,
    error: state.user.error,
})

const mapDispatchToProps = (dispatch: DispatchType) => ({
    onRequestUsers: () =>
        dispatch({
            type: ActionTypes.FETCH_ALL_USERS_BEGIN,
        }),
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
