import { useSelector } from 'react-redux';
import { user } from '../../store/selectors';
import { Outlet, Navigate } from 'react-router-dom';

function PrivateRoute() {
	const userSelector = useSelector(user);
	const isAuthenticated = () => {
		return userSelector.role === 'ADMIN';
	};

	return isAuthenticated() ? <Outlet /> : <Navigate to='/login' />;
}

export default PrivateRoute;
