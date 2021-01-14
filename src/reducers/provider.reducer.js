import { providerTypes } from '../constants/action.types'
import { combineReducers } from 'redux'

const allProvider = (state = {data: []}, action) => {
    switch(action.type) {
        case providerTypes.SET_ALL_PROVIDER: {
            return {
                ...state,
                data: action.data
            }
        }
        default: return state
    }
}

const provider = (state = {
    data: [], page: 1, totalpage: null, userisprovider : []
}, action) => {
    switch(action.type){
        case providerTypes.SET_PROVIDER: {
            return {
                ...state, 
                data: action.data
            }
        }
        case providerTypes.SET_USER_PROVIDER: {
            return {
                ...state, 
                userisprovider: action.userisprovider
            }
        }
        case providerTypes.ADD_PROVIDER_SUCCESS: {
            return {
                ...state,
                isadd: true
            }
        }
        case providerTypes.ADD_PROVIDER_FAIL: {
            return {
                ...state,
                isadd: false
            }
        }
        case providerTypes.UPDATE_PROVIDER_SUCCESS: {
            return {
                ...state,
                isupdate: true
            }
        }
        case providerTypes.UPDATE_PROVIDER_FAIL: {
            return {
                ...state,
                isupdate: false
            }
        }
        case providerTypes.RESET_PROVIDER: {
            return {
                ...state,
                isadd: null,
                isupdate: null
            }
        }
        case providerTypes.SET_PROVIDER_PAGE: {
            return {
                ...state,
                page: action.page
            }
        }
        case providerTypes.SET_PROVIDER_TOTAL_PAGE: {
            return {
                ...state,
                totalpage: action.totalpage
            }
        }
        default: return state
    }
}
export default combineReducers({
    provider,
    allProvider
})