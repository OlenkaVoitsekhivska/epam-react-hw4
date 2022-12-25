import Button from '../../../../common/Button/Button';
import { pipeDuration } from '../../../../helpers/pipeDuration';
import { dateGenerator } from '../../../../helpers/dateGeneratop';

import s from './CourseCard.module.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authors as getAuthors } from '../../../../store/selectors';
import { deleteCourseAsync } from '../../../../store/courses/thunk';
import { user } from '../../../../store/selectors';
import { useEffect } from 'react';
import { getUserAsync } from '../../../../store/user/thunk';
import { fetchTokenFromStorage } from '../../../../helpers/fetchTokenFromStorage';

const BTN__TEXT = {
	showCourse: 'Show course',
};

export default function CourseCard({ course }) {
	const { id, title, description, authors, duration, creationDate } = course;
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const authorsSelector = useSelector(getAuthors);
	const currentUserSelector = useSelector(user);

	useEffect(() => {
		const token = fetchTokenFromStorage();
		dispatch(getUserAsync(token));
	}, [dispatch]);

	const findAuthorById = (id) => {
		const author = authorsSelector.find((author) => author.id === id);
		return author.name;
	};

	const listAuthorsString = (ids) => {
		return ids.map((id) => findAuthorById(id)).join(', ');
	};

	return (
		<div className={s.card__container}>
			<div className={s.card__left}>
				<h2>{title}</h2>
				<p className={s.course__description}>{description}</p>
			</div>
			<div className={s.card__right}>
				<p className={s.card__authors}>
					<b>Authors: </b>
					{authorsSelector && listAuthorsString(authors)}
				</p>
				<p>
					<b>Duration: </b>
					{`${pipeDuration(duration)} hours`}
				</p>
				<p>
					<b>Created: </b>
					{dateGenerator(creationDate)}
				</p>
				{currentUserSelector.role === 'ADMIN' ? (
					<div className={s.btn__group}>
						<Button
							buttonText={BTN__TEXT.showCourse}
							type='button'
							onClick={() => navigate(`/courses/${id}`)}
						></Button>
						<Button
							buttonText='edit'
							onClick={() => navigate(`/courses/update/${id}`)}
						></Button>
						<Button
							buttonText='delete'
							onClick={() =>
								dispatch(deleteCourseAsync(id, fetchTokenFromStorage()))
							}
						></Button>
					</div>
				) : (
					<Button
						buttonText={BTN__TEXT.showCourse}
						type='button'
						onClick={() => navigate(`/courses/${id}`)}
					></Button>
				)}
			</div>
		</div>
	);
}
