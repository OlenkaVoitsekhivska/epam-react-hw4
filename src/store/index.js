import { configureStore } from '@reduxjs/toolkit';

import { authorsReducer } from './authors/slice';
import { coursesReducer } from './courses/slice';
import { userReducer } from './user/slice';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import { combineReducers } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

const persistConfig = {
	key: 'root',
	storage,
	blacklist: ['user'],
};

const rootReeducer = combineReducers({
	user: userReducer,
	authors: authorsReducer,
	courses: coursesReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReeducer);

export const store = configureStore({
	reducer: persistedReducer,
	middleware: [thunk],
});

export const persistor = persistStore(store);
