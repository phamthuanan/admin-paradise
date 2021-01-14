import axios from 'axios'
import { providerTypes } from '../constants/action.types'

export const setUserProvider = (userisprovider) => ({
    type: providerTypes.SET_USER_PROVIDER,
    userisprovider
})

export const getUserProvider = () => async (dispatch, getState) => {
    let res
    try {
        res = await axios.get('http://localhost:8080/admin/getalluserisprovider')
    }
    catch (err) {
        console.log(err)
        return
    }
    dispatch(setUserProvider(res.data.data))

}

export const setProvider = (data) => ({
    type: providerTypes.SET_PROVIDER,
    data
})

export const getProvider = () => async (dispatch, getState) => {
    let res
    try {
        res = await axios.get('http://localhost:8080/provider/all/' + getState().providerReducers.provider.page)
    }
    catch (err) {
        console.log(err)
        return
    }
    dispatch(setProvider(res.data.data))
    dispatch(setTotalPage(res.data.totalPage))

}
export const setTotalPage = (totalpage) => ({
    type: providerTypes.SET_PROVIDER_TOTAL_PAGE,
    totalpage
})
export const setPage = (page) => ({
    type: providerTypes.SET_PROVIDER_PAGE,
    page
})
export const nextPage = () => (dispatch, getState) => {
    let page = getState().providerReducers.provider.page
    let totalpage = getState().providerReducers.provider.totalpage
    if(page < totalpage) {
        dispatch(setPage(parseInt(page) + 1))
    }
}
export const backPage = () => (dispatch, getState) => {
    let page = getState().providerReducers.provider.page
    if(page > 1) {
        dispatch(setPage(parseInt(page) - 1))
    }
}

export const deleteProvider = (id) => async (dispatch, getState) => {
    let res
    try {
        res = await axios.post('http://localhost:8080/admin/deleteprovider',{
            id: id
        })
    }
    catch (err) {
        console.log(err)
        return
    }
    dispatch(getProvider())
}
export const addProviderSuccess = () => ({
    type: providerTypes.ADD_PROVIDER_SUCCESS
})
export const addProviderFail = () => ({
    type: providerTypes.ADD_PROVIDER_FAIL
})
export const updateProviderSuccess = () => ({
    type: providerTypes.UPDATE_PROVIDER_SUCCESS
})
export const updateProviderFail = () => ({
    type: providerTypes.UPDATE_PROVIDER_FAIL
})
export const resetProvider = () => ({
    type: providerTypes.RESET_PROVIDER
})

export const addProvider = (name, email, phone, address , fax, account_id, introduce, service, traveler, revenue, prize, files ) => async (dispatch, getState) => {
    dispatch(resetProvider())
    
    const data = new FormData()
    if(files !== null){
        for(var x = 0; x < files.length; x++) {
        data.append('files', files[x])
        }
    }
    else{
        data.append("files", files);
    }
    
    data.append("name", name);
    data.append("email", email);
    data.append("phone", phone);
    data.append("address", address);
    data.append("account_id", account_id);
    data.append("fax", fax);
    data.append("introduce", introduce);
    data.append("service", JSON.stringify(service));
    data.append("traveler", traveler);
    data.append("revenue", revenue);
    data.append("prize", JSON.stringify(prize));

    await axios.post('http://localhost:8080/admin/addprovider', data, {})
            .then(res =>{
                console.log(res.data)
                dispatch(addProviderSuccess())
                dispatch(getProvider()) 
            }).catch(err =>{
                console.log(err)
                dispatch(addProviderFail())
                return
            })
}
export const updateProvider = (name, email, phone, address , fax, account_id, introduce, service, traveler, revenue, prize, files, images) => async (dispatch, getState) => {
    
    const data = new FormData()
    if(files !== null){
        for(var x = 0; x < files.length; x++) {
        data.append('files', files[x])
        }
    }
    else{
        data.append("files", files);
    }
    data.append("name", name);
    data.append("email", email);
    data.append("phone", phone);
    data.append("address", address);
    data.append("account_id", account_id);
    data.append("fax", fax);
    data.append("introduce", introduce);
    data.append("service", JSON.stringify(service));
    data.append("traveler", traveler);
    data.append("revenue", revenue);
    data.append("prize", JSON.stringify(prize));
    data.append("images", JSON.stringify(images) );

    await axios.post('http://localhost:8080/admin/updateprovider', data, {})
            .then(res =>{
                console.log(res.data)
                dispatch(updateProviderSuccess())
                dispatch(getProvider())
            }).catch(err =>{
                console.log(err)
                dispatch(updateProviderFail())
                return
            })
}


export const getAllProvider = () => async (dispatch, getState) => {
    let res
    try {
        res = await axios.get('http://localhost:8080/provider')
    }
    catch (err) {
        console.log(err)
        return
    }
    dispatch(setAllProvider(res.data.data))

}

export const setAllProvider = (data) => ({
    type: providerTypes.SET_ALL_PROVIDER,
    data
})