import { combineReducers } from 'redux'
import {Allreducer,Onereducer,cartreducer, loginreducer, wishlistreducer} from './Reducer'
const Reducers=combineReducers({
    all:Allreducer,
    one:Onereducer,
    cart:cartreducer,
    login:loginreducer,
    wishlists:wishlistreducer
})
export default Reducers