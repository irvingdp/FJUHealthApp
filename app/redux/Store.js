import {applyMiddleware, createStore} from 'redux'
import AppReducer from './AppReducer';
import {createLogger} from 'redux-logger'
import ReduxThunk from 'redux-thunk'

// Middleware
const middleware = () => {
    return applyMiddleware(ReduxThunk, createLogger())
};
const Store = createStore(AppReducer, middleware());

export default Store;

