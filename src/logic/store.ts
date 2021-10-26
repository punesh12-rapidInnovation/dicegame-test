import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import walletReducer from './reducer/wallet.reducer';

const rootReducer = combineReducers({
	wallet: walletReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
