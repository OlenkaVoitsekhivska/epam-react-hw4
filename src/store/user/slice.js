import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	isAuth: false,
	name: '',
	email: '',
	token: '',
	role: '',
	error: false,
};

const userSlice = createSlice({
	name: 'user',
	initialState: initialState,
	reducers: {
		login: (state) => state,
		login_success: (_, { payload }) => {
			return {
				isAuth: true,
				name: payload.user.name,
				email: payload.user.email,
				token: payload.result,
				role: payload.role,
				error: false,
			};
		},
		login_error: (state, action) => ({ ...initialState, error: true }),
		logout: (state) => state,
		logout_success: (state, action) => initialState,
		get_user: (state) => state,
		get_user_success: (_, { payload }) => {
			return { ...payload, role: payload.role === 'user' ? 'USER' : 'ADMIN' };
		},
	},
});

export const {
	login,
	login_success,
	login_error,
	logout,
	logout_success,
	get_user,
	get_user_success,
} = userSlice.actions;

export const userReducer = userSlice.reducer;
