import { getAuthors, addAuthor, deleteAuthor } from '../../services';
import {
	get_authors,
	get_authors_success,
	add_author,
	add_author_success,
	delete_author,
	delete_author_success,
} from './slice';

export const getAuthorsAsync = () => async (dispatch) => {
	dispatch(get_authors());
	try {
		const authors = await getAuthors();
		dispatch(get_authors_success(authors));
	} catch (err) {
		console.log(err);
	}
};

export const addAuthorAsync = (newAuthor, token) => async (dispatch) => {
	dispatch(add_author());
	try {
		const addedAuthor = await addAuthor(newAuthor, token);
		dispatch(add_author_success(addedAuthor));
	} catch (err) {
		console.log(err);
	}
};

export const deleteAuthorAsync = (author, token) => async (dispatch) => {
	dispatch(delete_author());
	try {
		const deletedAuthor = await deleteAuthor(author, token);
		dispatch(delete_author_success(author));
	} catch (err) {
		console.log(err);
	}
};
