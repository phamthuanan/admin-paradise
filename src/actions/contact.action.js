import axios from 'axios'
import { contactTypes } from '../constants/action.types'

export const setContact = (data) => ({
    type: contactTypes.SET_CONTACT,
    data
})
export const getContact = () => async (dispatch, getState) => {
    let res
    try {
        res = await axios.get('http://localhost:8080/admin/contact/' + getState().contactReducers.contact.page)
    }
    catch (err) {
        console.log(err)
        return
    }
    dispatch(setContact(res.data.data))
    dispatch(setContactTotalPage(res.data.totalPage))

}
export const setContactTotalPage = (totalpage) => ({
    type: contactTypes.SET_CONTACT_TOTAL_PAGE,
    totalpage
})
export const setContactPage = (page) => ({
    type: contactTypes.SET_CONTACT_PAGE,
    page
})
export const nextPage = () => (dispatch, getState) => {
    let page = getState().contactReducers.contact.page
    let totalpage = getState().contactReducers.contact.totalpage
    if(page < totalpage) {
        dispatch(setContactPage(parseInt(page) + 1))
    }
}
export const backPage = () => (dispatch, getState) => {
    let page = getState().contactReducers.contact.page
    if(page > 1) {
        dispatch(setContactPage(parseInt(page) - 1))
    }
}
