import { createStore, applyMiddleware, compose } from 'redux';
import Thunk from 'redux-thunk';
import RootReducers from './reducers/rootreducers';

const initialStore = {};

const middleWare = [Thunk];

const store = createStore(RootReducers, initialStore, compose(
    applyMiddleware(...middleWare),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)
);

export default store;