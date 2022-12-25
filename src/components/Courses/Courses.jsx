import CourseCard from './components/CourseCard/CourseCard';
import SearchBar from './components/SearchBar/SearchBar';
import Button from '../../common/Button/Button';
import { useContext, useEffect } from 'react';
import { Context } from '../../Context';
import s from './Courses.module.css';
import { useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { courses, user } from '../../store/selectors';
import { getCoursesAsync } from '../../store/courses/thunk';
import { getAuthorsAsync } from '../../store/authors/thunk';

const BTN__TEXT = {
	addNewCourse: 'Add new course',
};

export default function Courses() {
	const [context, setContext] = useContext(Context);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const coursesSelector = useSelector(courses);
	const currentUserSelector = useSelector(user);

	const searchItems = (query) => {
		setContext((prevState) => ({ ...prevState, filter: query }));
	};

	const courseList = () => {
		const { filter } = context;
		if (filter) {
			const filteredList = coursesSelector.filter(
				(course) =>
					course.title.toLowerCase().includes(filter.toLowerCase()) ||
					course.id.includes(filter)
			);
			if (!filteredList.length) {
				alert("Sorry, we didn't find anything matching your request");
				return coursesSelector;
			}
			return filteredList;
		}
		return coursesSelector;
	};
	useEffect(() => {
		dispatch(getCoursesAsync());
		dispatch(getAuthorsAsync());
	}, [dispatch]);

	return (
		<div className='courses'>
			<div className={s.searchCourse__wrapper}>
				<div className={s.searchCourse__input}>
					<SearchBar searchItems={searchItems}></SearchBar>
					{currentUserSelector.role === 'ADMIN' && (
						<Button
							buttonText={BTN__TEXT.addNewCourse}
							type='button'
							onClick={() => navigate('add')}
						></Button>
					)}
				</div>
			</div>
			{courseList().map((course) => (
				<CourseCard course={course} key={course.id}></CourseCard>
			))}
		</div>
	);
}
