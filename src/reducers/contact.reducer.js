import { contactTypes } from '../constants/action.types'
import { combineReducers } from 'redux'
const contact = (state = {
    data: [], page: 1, totalpage: null
}, action) => {
    switch(action.type){
        case contactTypes.SET_CONTACT: {
            return {
                ...state, 
                data: action.data
            }
        }
        case contactTypes.SET_CONTACT_PAGE: {
            return {
                ...state,
                page: action.page
            }
        }
        case contactTypes.SET_CONTACT_TOTAL_PAGE: {
            return {
                ...state,
                totalpage: action.totalpage
            }
        }
        default: return state
    }
}
export default combineReducers({
    contact
})