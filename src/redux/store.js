import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { itemsReducer } from './reducers/itemsReducer';
import { settingsReducer } from './reducers/settingsReducer';

const rootReducer = combineReducers({
    dictionaryData: itemsReducer,
    dictionarySettings: settingsReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunk))