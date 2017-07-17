import { applyMiddleware, createStore } from 'redux'
import AppReducer from './reducers/index';
import {createLogger} from 'redux-logger'

// Middleware
const middleware = () => {
    return applyMiddleware(createLogger())
}
const Store = createStore(AppReducer);

export default Store;

