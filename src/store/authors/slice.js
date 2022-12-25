import { createSlice } from '@reduxjs/toolkit';

const authorsSlice = createSlice({
	name: 'authors',
	initialState: [],
	reducers: {
		get_authors: (state) => state,
		get_authors_success: (_, { payload }) => payload,
		add_author: (state) => state,
		add_author_success: (state, { payload }) => [...state, payload],
		delete_author: (state) => state,
		delete_author_success: (state, { payload }) => {
			return state.filter((author) => author.id !== payload);
		},
	},
});

export const {
	get_authors,
	get_authors_success,
	add_author,
	add_author_success,
	delete_author,
	delete_author_success,
} = authorsSlice.actions;

export const authorsReducer = authorsSlice.reducer;
