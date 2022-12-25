import { loginCall, logoutCall, getCurrentUser } from '../../services';
import {
	get_user,
	get_user_success,
	login,
	login_success,
	logout,
	logout_success,
	login_error,
} from './slice';

const ADMIN_CREDENTIALS = {
	email: 'admin@email.com',
	password: 'admin123',
};
const ROLES = {
	ADMIN: 'ADMIN',
	USER: 'USER',
};

const checkCredentials = (email, password) => {
	return email === ADMIN_CREDENTIALS.email &&
		password === ADMIN_CREDENTIALS.password
		? ROLES.ADMIN
		: ROLES.USER;
};

export const loginAsync = (userData) => async (dispatch) => {
	dispatch(login());
	try {
		const userLog = await loginCall(userData);

		dispatch(
			login_success({
				...userLog,
				role: checkCredentials(userLog.user.email, userData.password),
			})
		);

		localStorage.setItem(
			'currentUser',
			JSON.stringify({ token: userLog.result })
		);
	} catch (err) {
		alert('Wrong email or password!');
		dispatch(login_error());
	}
};

export const logoutAsync = (token) => async (dispatch) => {
	dispatch(logout());
	try {
		const logoutRes = await logoutCall(token);
		if (logoutRes === 200) {
			dispatch(logout_success());
		}
	} catch (err) {
		console.log(err);
	}
};

export const getUserAsync = (token) => async (dispatch) => {
	dispatch(get_user());
	try {
		const getUserRes = await getCurrentUser(token);
		dispatch(get_user_success(getUserRes));
	} catch (err) {
		console.log(err);
	}
};
