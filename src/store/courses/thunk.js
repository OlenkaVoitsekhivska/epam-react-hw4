import {
	getCourses,
	addCourse,
	deleteCourse,
	editCourse,
} from '../../services';
import {
	get_courses,
	get_courses_success,
	add_course,
	add_course_success,
	delete_course,
	delete_course_success,
	update_course,
	update_course_success,
} from './slice';

export const getCoursesAsync = () => async (dispatch) => {
	dispatch(get_courses());
	try {
		const courses = await getCourses();
		dispatch(get_courses_success(courses));
	} catch (err) {
		console.log(err);
	}
};

export const addCourseAsync = (newCourse, token) => async (dispatch) => {
	dispatch(add_course());
	try {
		const newCourseRes = await addCourse(newCourse, token);
		dispatch(add_course_success(newCourseRes));
	} catch (err) {
		console.log(err);
	}
};

export const updateCourseAsync = (updatedCourse, token) => async (dispatch) => {
	dispatch(update_course());
	try {
		const editedCourse = await editCourse(updatedCourse, token);
		dispatch(update_course_success(editedCourse));
	} catch (err) {
		console.log(err);
	}
};

export const deleteCourseAsync = (id, token) => async (dispatch) => {
	dispatch(delete_course());
	try {
		const deleteCourseRes = await deleteCourse(id, token);
		dispatch(delete_course_success(id));
	} catch (err) {
		console.log(err);
	}
};
