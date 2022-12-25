import './App.css';
import Header from './components/Header/Header';
import Courses from './components/Courses/Courses';
import CourseForm from './components/CourseForm/CourseForm';
import React, { useState } from 'react';
import { Context } from './Context';
import { mockedAuthorsList } from './constants';
import Login from './components/Login/Login';
import { Routes, Route } from 'react-router-dom';
import Registration from './components/Registration/Registration';
import CourseInfo from './components/CourseInfo/CourseInfo';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

function App() {
	const [context, setContext] = useState({
		authors: mockedAuthorsList,
		filter: '',
	});

	return (
		<Context.Provider value={[context, setContext]}>
			<div className='App'>
				<Routes>
					<Route path='/' element={<Header />}>
						<Route index element={<Login />} />
						<Route path='register' element={<Registration />} />
						<Route path='login' element={<Login />} />
						<Route path='courses' element={<Courses />} />
						<Route path='courses/:courseId' element={<CourseInfo />} />

						<Route element={<PrivateRoute />}>
							<Route path='courses/add' element={<CourseForm />} />
							<Route path='courses/update/:courseId' element={<CourseForm />} />
						</Route>
					</Route>
				</Routes>
			</div>
		</Context.Provider>
	);
}

export default App;
