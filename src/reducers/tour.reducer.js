import { tourTypes } from '../constants/action.types'
import { combineReducers } from 'redux'

const province = (state = { data: []}, action) => {
    switch (action.type) {
        case tourTypes.SET_PROVINCE: {
            return {
                ...state,
                data: action.data
            }
        }
        default: return state
    }
}

const location = (state = { data: [], page: 1, totalpage: null, allLocation : [] }, action) => {
    switch (action.type) {
        case tourTypes.SET_LOCATION: {
            return {
                ...state,
                data: action.data
            }
        }
        case tourTypes.SET_ALL_LOCATION: {
            return {
                ...state,
                allLocation: action.allLocation
            }
        }
        case tourTypes.ADD_LOCATION_SUCCESS: {
            return {
                ...state,
                isadd: true
            }
        }
        case tourTypes.ADD_LOCATION_FAIL: {
            return {
                ...state,
                isadd: false
            }
        }
        case tourTypes.UPDATE_LOCATION_SUCCESS: {
            return {
                ...state,
                isupdate: true
            }
        }
        case tourTypes.UPDATE_LOCATION_FAIL: {
            return {
                ...state,
                isupdate: false
            }
        }
        case tourTypes.RESET_LOCATION: {
            return {
                ...state,
                isadd: null,
                isupdate: null
            }
        }
        case tourTypes.LOCATION_SET_PAGE: {
            return {
                ...state,
                page: action.page
            }
        }
        case tourTypes.LOCATION_SET_TOTAL_PAGE: {
            return {
                ...state,
                totalpage: action.totalpage
            }
        }
        default: return state
    }
}

const tourDesign = (state = { data: [], page: 1, totalpage: null }, action) => {
    switch (action.type) {
        case tourTypes.SET_TOUR_DESIGN: {
            return {
                ...state,
                data: action.data
            }
        }
        case tourTypes.ACCEPT_TOUR_DESIGN_SUCCESS: {
            return {
                ...state,
                isAccept: true
            }
        }
        case tourTypes.ACCEPT_TOUR_DESIGN_FAIL: {
            return {
                ...state,
                isAccept: false
            }
        }
        case tourTypes.RESET_TOUR_DESIGN: {
            return {
                ...state,
                isAccept: null,
            }
        }
        case tourTypes.TOUR_DESIGN_SET_PAGE: {
            return {
                ...state,
                page: action.page
            }
        }
        case tourTypes.TOUR_DESIGN_SET_TOTAL_PAGE: {
            return {
                ...state,
                totalpage: action.totalpage
            }
        }
        default: return state
    }
}

const tour = (state = { data: [], page: 1, totalpage: null}, action) => {
    switch (action.type) {
        case tourTypes.SET_TOUR: {
            return {
                ...state,
                data: action.data
            }
        }
        case tourTypes.ADD_TOUR_SUCCESS: {
            return {
                ...state,
                isadd: true
            }
        }
        case tourTypes.ADD_TOUR_FAIL: {
            return {
                ...state,
                isadd: false
            }
        }
        case tourTypes.UPDATE_TOUR_SUCCESS: {
            return {
                ...state,
                isupdate: true
            }
        }
        case tourTypes.UPDATE_TOUR_FAIL: {
            return {
                ...state,
                isupdate: false
            }
        }
        case tourTypes.RESET_TOUR: {
            return {
                ...state,
                isadd: null,
                isupdate: null
            }
        }
        case tourTypes.TOUR_SET_PAGE: {
            return {
                ...state,
                page: action.page
            }
        }
        case tourTypes.TOUR_SET_TOTAL_PAGE: {
            return {
                ...state,
                totalpage: action.totalpage
            }
        }
        default: return state
    }
}

const categoryTour = (state = { data: []}, action) => {
    switch (action.type) {
        case tourTypes.SET_CATEGORY_TOUR: {
            return {
                ...state,
                data: action.data
            }
        }
        default: return state
    }
}

export default combineReducers({
    province,
    location,
    tourDesign,
    tour,
    categoryTour
})