import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'

import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import createSagaMiddleware from 'redux-saga'

import rootReducer from './redux/rootReducer'
import rootSaga from './redux/sagas'

const sagaMiddleware = createSagaMiddleware() // Saga Middleware

const composeEnhancer =
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE_ || compose

// Configuring Store
const store = createStore(
    rootReducer,
    composeEnhancer(applyMiddleware(sagaMiddleware))
)

// Running Saga(s)
sagaMiddleware.run(rootSaga)

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
