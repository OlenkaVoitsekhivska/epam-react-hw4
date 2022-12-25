import Logo from './components/Logo/Logo';
import Button from '../../common/Button/Button';
import './Header.css';
import { Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { logoutAsync } from '../../store/user/thunk';
import { user } from '../../store/selectors';
import { fetchTokenFromStorage } from '../../helpers/fetchTokenFromStorage';

const BTN__TEXT = {
	logout: 'Logout',
};

export default function Header() {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const userSelector = useSelector(user);

	const userNameFromStorage = () => {
		return userSelector.role === 'ADMIN' ? 'Admin' : userSelector.name;
	};

	const handleLogout = () => {
		const token = fetchTokenFromStorage();
		dispatch(logoutAsync(token));
		localStorage.removeItem('currentUser');
		navigate('/login');
	};
	return (
		<>
			<nav>
				<Logo></Logo>
				<div className='nav__block'>
					{fetchTokenFromStorage() && (
						<>
							<p>{userNameFromStorage()}</p>
							<Button
								buttonText={BTN__TEXT.logout}
								type='button'
								onClick={handleLogout}
							></Button>
						</>
					)}
				</div>
			</nav>
			<Outlet />
		</>
	);
}
