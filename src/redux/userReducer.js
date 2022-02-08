import {
    USER_DETAILS_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT,
    USER_REGISTER_FAIL,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_UPDATE_PROFILE_FAIL,
    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_SUCCESS,
    USER_DETAILS_RESET,
    USER_LIST_REQUEST,
    USER_LIST_SUCCESS,
    USER_LIST_FAIL,
    USER_LIST_RESET,
    USER_DELETE_FAIL,
    USER_DELETE_SUCCESS,
    USER_DELETE_REQUEST,
    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS,
    USER_UPDATE_FAIL
} from "../constants/userConstants"

const initialState = {
    userLogin: "",
    userInfo: {},
    userRegister: { username: "", fullname: "", password: "" }
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_LOGIN_SUCCESS: {
            action.payload.isAdmin ?
                localStorage.setItem('userLogin', "ADMIN")
                :
                localStorage.setItem('userLogin', "USER")
            const newState = { ...state }
            newState.userLogin = action.payload.isAdmin ? "ADMIN" : "USER"
            newState.userInfo = { ...action.payload }
            return { ...newState }
        }
        case USER_LOGOUT: {
            localStorage.setItem('userLogin', "LOGOUT")
            const newState = { ...state }
            newState.userLogin = "LOGOUT"
            newState.userInfo = {}
            return { ...newState }
        }
        case 'LOGINASADMIN': {
            const userLogin = "ADMIN"
            localStorage.setItem('userLogin', "ADMIN")
            return { ...state, userLogin }
        }
        case "DETAILS": {
            localStorage.setItem('userDetails', JSON.stringify(action.payload))
            return { ...state, userDetails: action.payload }
        }
        default: return state
    }
}

export default userReducer