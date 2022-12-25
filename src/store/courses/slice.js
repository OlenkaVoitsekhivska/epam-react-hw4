import { createSlice } from '@reduxjs/toolkit';

const coursesSlice = createSlice({
	name: 'courses',
	initialState: [],
	reducers: {
		get_courses: (state) => state,
		get_courses_success: (_, { payload }) => payload,
		delete_course: (state) => state,
		delete_course_success: (state, { payload }) => {
			return state.filter((course) => course.id !== payload);
		},
		add_course: (state) => state,
		add_course_success(state, { payload }) {
			return [...state, payload];
		},
		update_course: (state) => state,
		update_course_success: (state, { payload }) => {
			return state.map((course) =>
				course.id === payload.id ? payload : course
			);
		},
	},
});

export const {
	get_courses,
	get_courses_success,
	delete_course,
	delete_course_success,
	add_course,
	add_course_success,
	update_course,
	update_course_success,
} = coursesSlice.actions;

export const coursesReducer = coursesSlice.reducer;
