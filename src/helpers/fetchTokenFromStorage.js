export const fetchTokenFromStorage = () => {
	const token = JSON.parse(localStorage.getItem('currentUser'))?.token;
	return token;
};
