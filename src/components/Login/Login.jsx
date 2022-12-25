import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getUserAsync, loginAsync } from '../../store/user/thunk';
import { fetchTokenFromStorage } from '../../helpers/fetchTokenFromStorage';
import { user } from '../../store/selectors';
import { useSelector } from 'react-redux';

const INPUT__TEXT = {
	email: {
		label: 'Email',
		placeholder: 'Enter email',
		name: 'email',
	},
	password: {
		label: 'Password',
		placeholder: 'Enter password',
		name: 'password',
	},
};

const BTN__TEXT = {
	login: 'Login',
};

export default function Login() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [form, setForm] = useState({
		email: '',
		password: '',
	});
	const userSelector = useSelector(user);

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!form.email || !form.password) {
			return;
		}
		dispatch(loginAsync(form));
		dispatch(getUserAsync(fetchTokenFromStorage()));
		!userSelector.error && navigate('/courses');
	};
	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	return (
		<div className='form__auth'>
			<form onSubmit={handleSubmit}>
				<h2 style={{ textAlign: 'center' }}>Login</h2>
				<div className='form__auth--input-wrapper'>
					<Input
						onChange={handleChange}
						placeholderText={INPUT__TEXT.email.placeholder}
						type='email'
						labelText={INPUT__TEXT.email.label}
						value={form.email}
						name={INPUT__TEXT.email.name}
					></Input>
				</div>
				<div className='form__auth--input-wrapper'>
					<Input
						onChange={handleChange}
						placeholderText={INPUT__TEXT.password.placeholder}
						type='password'
						labelText={INPUT__TEXT.password.label}
						value={form.password}
						name={INPUT__TEXT.password.name}
					></Input>
				</div>
				<Button buttonText={BTN__TEXT.login} type='submit' />
				<p className='form__auth--txt'>
					Don't have an account yet? Click{' '}
					<Link to={'/register'}>
						<span>here </span>
					</Link>
					to sign up
				</p>
			</form>
		</div>
	);
}
