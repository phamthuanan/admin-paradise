import axios from 'axios'
import { tourTypes } from '../constants/action.types'

export const locationSetPage = (page) => ({
    type: tourTypes.LOCATION_SET_PAGE,
    page
})
export const locationSetTotalPage = (totalpage) => ({
    type: tourTypes.LOCATION_SET_TOTAL_PAGE,
    totalpage
})

export const getLocation = () => async (dispatch, getState) =>  {
    let res
    try {
        res = await axios.get('http://localhost:8080/location/getAllLocation/' + getState().tourReducers.location.page)
    }
    catch (err) {
        return
    }
    dispatch(setLocation(res.data.data))
    dispatch(locationSetTotalPage(res.data.totalPage))
}

export const setLocation = (data) => ({
    type: tourTypes.SET_LOCATION,
    data
})

export const addLocationSuccess = () =>({
    type: tourTypes.ADD_LOCATION_SUCCESS
})
export const addLocationFail = () => ({
    type: tourTypes.ADD_LOCATION_FAIL
})
export const updateLocationSuccess = () => ({
    type: tourTypes.UPDATE_LOCATION_SUCCESS
})
export const updateLocationFail = () => ({
    type: tourTypes.UPDATE_LOCATION_FAIL
})
export const resetLocation = () => ({
    type: tourTypes.RESET_LOCATION
})
export const addLocation =  (name, provinceId) => async (dispatch, getState) => {
    dispatch(resetLocation())
    let res
    try {
        res = await axios.post('http://localhost:8080/location/add', {
            name_location: name,
            province_id : provinceId
        })
    }
    catch(err) {
        dispatch(addLocationFail())
        return
    } 
    dispatch(addLocationSuccess())
    dispatch(getLocation())
}

export const updateLocation =  (id, name) => async (dispatch, getState) => {
    let res
    try {
        res = await axios.post('http://localhost:8080/location/update', {
            province_id: id,
            name_location: name
        })
    }
    catch(err) {
        dispatch(updateLocationFail())
        return
    } 
    dispatch(updateLocationSuccess())
    dispatch(getLocation())
}

export const deleteLocation = (id) => async (dispatch, getState) => {
    let res
    try {
        res = await axios.post('http://localhost:8080/location/delete',{
            id: id
        })
    }
    catch (err) {
        console.log(err)
        return
    }
    dispatch(getLocation())
}

export const locationBackPage = () => (dispatch, getState) => {
    let page = getState().tourReducers.location.page
    if(page > 1) {
        dispatch(locationSetPage(parseInt(page) - 1))
    }
}

export const locationNextPage = () => (dispatch, getState) => {
    let page = getState().tourReducers.location.page
    let totalpage = getState().tourReducers.location.totalpage
    if(page < totalpage) {
        dispatch(locationSetPage(parseInt(page) + 1))
    }
}

export const getProvince = () => async (dispatch, getState) =>  {
    let res
    try {
        res = await axios.get('http://localhost:8080/province/all')
    }
    catch (err) {
        return
    }
    dispatch(setProvince(res.data.data))
}

export const setProvince = (data) => ({
    type: tourTypes.SET_PROVINCE,
    data
})

export const getAllLocation = () => async (dispatch, getState) =>  {
    let res
    try {
        res = await axios.get('http://localhost:8080/location/all')
    }
    catch (err) {
        return
    }
    dispatch(setAllLocation(res.data.data))
}

export const setAllLocation = (allLocation) => ({
    type: tourTypes.SET_ALL_LOCATION,
    allLocation
})

export const getTourDesign = (id) => async (dispatch, getState) =>  {
    let res
    try {
        res = await axios.post('http://localhost:8080/provider/getAllTourDesign/' + getState().tourReducers.tourDesign.page, {
            id : id
        })
    }
    catch (err) {
        return
    }
    dispatch(setTourDesign(res.data.data))
    dispatch(tourDesignSetTotalPage(res.data.totalPage))
}

export const setTourDesign = (data) => ({
    type: tourTypes.SET_TOUR_DESIGN,
    data
})

export const tourDesignSetPage = (page) => ({
    type: tourTypes.TOUR_DESIGN_SET_PAGE,
    page
})
export const tourDesignSetTotalPage = (totalpage) => ({
    type: tourTypes.TOUR_DESIGN_SET_TOTAL_PAGE,
    totalpage
})

export const acceptTourDesignSuccess = () =>({
    type: tourTypes.ACCEPT_TOUR_DESIGN_SUCCESS
})
export const acceptTourDesignFail = () => ({
    type: tourTypes.ACCEPT_TOUR_DESIGN_FAIL
})
export const resetTourDesign = () => ({
    type: tourTypes.RESET_TOUR_DESIGN
})

export const acceptTourDesign =  (id, user_id, name_tour, provider_id,description, 
    time_start, time_end, price, place_depart, messages, route ) => async (dispatch, getState) => {
    dispatch(resetTourDesign())
    let res
    try {
        res = await axios.post('http://localhost:8080/provider/accepttourdesign', {
            id : id,
            user_id : user_id,
            name_tour: name_tour,
            provider_id : provider_id,
            description :description, 
            time_start : time_start,
            time_end : time_end,
            price : price,
            place_depart : place_depart,
            messages : messages,
            route : route
        })
    }
    catch(err) {
        dispatch(acceptTourDesignFail())
        return
    } 
    dispatch(acceptTourDesignSuccess())
    dispatch(getTourDesign(provider_id))
}

export const rejectTourDesign =  (id, provider_id) => async (dispatch, getState) => {
    dispatch(resetTourDesign())
    let res
    try {
        res = await axios.post('http://localhost:8080/provider/rejecttourdesign', {
            id : id
        })
    }       
    catch(err) {
        return
    }
    dispatch(getTourDesign(provider_id))
}

export const tourDesignBackPage = () => (dispatch, getState) => {
    let page = getState().tourReducers.tourDesign.page
    if(page > 1) {
        dispatch(tourDesignSetPage(parseInt(page) - 1))
    }
}

export const tourDesignNextPage = () => (dispatch, getState) => {
    let page = getState().tourReducers.tourDesign.page
    let totalpage = getState().tourReducers.tourDesign.totalpage
    if(page < totalpage) {
        dispatch(tourDesignSetPage(parseInt(page) + 1))
    }
}

export const tourSetPage = (page) => ({
    type: tourTypes.TOUR_SET_PAGE,
    page
})
export const tourSetTotalPage = (totalpage) => ({
    type: tourTypes.TOUR_SET_TOTAL_PAGE,
    totalpage
})

export const getTour = () => async (dispatch, getState) =>  {
    let res
    try {
        res = await axios.get('http://localhost:8080/admin/getAllTour/' + getState().tourReducers.tour.page)
    }
    catch (err) {
        return
    }
    dispatch(setTour(res.data.data))
    dispatch(tourSetTotalPage(res.data.totalPage))
}

export const getTourByProvider = (id) => async (dispatch, getState) =>  {
    let res
    try {
        res = await axios.post('http://localhost:8080/tourbyprovider/' + getState().tourReducers.tour.page, {
            provider_id : id
        }
        )
    }
    catch (err) {
        return
    }
    dispatch(setTour(res.data.data))
    dispatch(tourSetTotalPage(res.data.totalPage))
}

export const setTour = (data) => ({
    type: tourTypes.SET_TOUR,
    data
})

export const addTourSuccess = () =>({
    type: tourTypes.ADD_TOUR_SUCCESS
})
export const addTourFail = () => ({
    type: tourTypes.ADD_TOUR_FAIL
})
export const updateTourSuccess = () => ({
    type: tourTypes.UPDATE_TOUR_SUCCESS
})
export const updateTourFail = () => ({
    type: tourTypes.UPDATE_TOUR_FAIL
})
export const resetTour = () => ({
    type: tourTypes.RESET_TOUR
})
export const addTour =  (
    name_tour, price, time_start, time_end, description, id_discount, capacity,
     provider_id, category_tour_id, place_depart, route,img_cover,img_slider_1, img_slider_2, img_slider_3 ) => async (dispatch, getState) => {
    
    dispatch(resetTour())
    const data = new FormData()
    data.append("img_cover", img_cover);
    data.append("img_slider_1", img_slider_1);
    data.append("img_slider_2", img_slider_2);
    data.append("img_slider_3", img_slider_3);
    data.append("name_tour", name_tour);
    data.append("price", price);
    data.append("time_start", time_start);
    data.append("time_end", time_end);
    data.append("description", description);
    data.append("id_discount", id_discount);
    data.append("capacity", capacity);
    data.append("provider_id", provider_id);
    data.append("category_tour_id", category_tour_id);
    data.append("place_depart", place_depart);
    data.append("route", JSON.stringify(route));

    await axios.post('http://localhost:8080/admin/addtour', data,{})
    .then(res =>{
        console.log(res.data)
        dispatch(addTourSuccess())
        dispatch(getTour())
    }).catch(err =>{
        console.log(err)
        dispatch(addTourFail())
        return
    })
}

export const updateTour =  (
    id, name_tour, price, time_start, time_end, description, id_discount, capacity,
     provider_id, category_tour_id, place_depart,img_cover ) => async (dispatch, getState) => {
    
    const data = new FormData()
    data.append("id", id);
    data.append("img_cover", img_cover);
    data.append("name_tour", name_tour);
    data.append("price", price);
    data.append("time_start", time_start);
    data.append("time_end", time_end);
    data.append("description", description);
    data.append("id_discount", id_discount);
    data.append("capacity", capacity);
    data.append("provider_id", provider_id);
    data.append("category_tour_id", category_tour_id);
    data.append("place_depart", place_depart);

    await axios.post('http://localhost:8080/admin/updatetour', data,{})
    .then(res =>{
        console.log(res.data)
        dispatch(updateTourSuccess())
        dispatch(getTour())
    }).catch(err =>{
        console.log(err)
        dispatch(updateTourFail())
        return
    })
}

export const deleteTour = (id) => async (dispatch, getState) => {
    let res
    try {
        res = await axios.post('http://localhost:8080/admin/deletetour',{
            id: id
        })
    }
    catch (err) {
        console.log(err)
        return
    }
    dispatch(getTour())
}

export const tourBackPage = () => (dispatch, getState) => {
    let page = getState().tourReducers.tour.page
    if(page > 1) {
        dispatch(tourSetPage(parseInt(page) - 1))
    }
}

export const tourNextPage = () => (dispatch, getState) => {
    let page = getState().tourReducers.tour.page
    let totalpage = getState().tourReducers.tour.totalpage
    if(page < totalpage) {
        dispatch(tourSetPage(parseInt(page) + 1))
    }
}

export const getCategory = () => async (dispatch, getState) =>  {
    let res
    try {
        res = await axios.get('http://localhost:8080/category-tour')
    }
    catch (err) {
        return
    }
    dispatch(setCategory(res.data.data))
}

export const setCategory = (data) => ({
    type: tourTypes.SET_CATEGORY_TOUR,
    data
})