import { combineReducers, createStore, applyMiddleware, compose } from "redux";
import thunk from 'redux-thunk'

// Reducers Importing 

import userReducer from './userReducer'
// import register from './register'

const rootReducer = combineReducers({
    userReducer: userReducer,
})

const userDetailsFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
const userLoginFromStorage = localStorage.getItem('userLogin') ? localStorage.getItem('userLogin') : null

const initialState = {
    userReducer: {
        userInfo: userDetailsFromStorage,
        userLogin: userLoginFromStorage
    },
}

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middleware = [thunk]

const store = createStore(rootReducer, initialState, composeEnhancer(applyMiddleware(...middleware)))

export default store

