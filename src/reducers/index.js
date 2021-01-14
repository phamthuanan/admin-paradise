import { combineReducers } from 'redux'
import tourReducers from './tour.reducer'
import userReducers from './user.reducer'
import contactReducers from './contact.reducer'
import providerReducers from './provider.reducer'

export default combineReducers({
    tourReducers,
    userReducers,
    contactReducers,
    providerReducers
})