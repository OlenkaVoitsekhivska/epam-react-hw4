import axios from 'axios';

export const getCourses = async () => {
	const { data } = await axios.get('http://localhost:4000/courses/all');
	return data.result;
};

export const addCourse = async (newCourse, token) => {
	const { data } = await axios.post(
		'http://localhost:4000/courses/add',
		newCourse,
		{
			headers: {
				Authorization: token,
			},
		}
	);
	return data.result;
};

export const editCourse = async (updatedCourse, token) => {
	const { data } = await axios.put(
		`http://localhost:4000/courses/${updatedCourse.id}`,
		updatedCourse,
		{
			headers: {
				Authorization: token,
			},
		}
	);
	return data.result;
};

export const deleteCourse = async (id, token) => {
	const { data } = await axios.delete(`http://localhost:4000/courses/${id}`, {
		headers: {
			Authorization: token,
		},
	});
	return data.result;
};

export const addAuthor = async (newAuthor, token) => {
	const { data } = await axios.post(
		'http://localhost:4000/authors/add',
		newAuthor,
		{
			headers: {
				Authorization: token,
			},
		}
	);
	return data.result;
};

export const deleteAuthor = async (author, token) => {
	const { data } = await axios.delete(
		`http://localhost:4000/authors/${author}`,
		{
			headers: {
				Authorization: token,
			},
		}
	);

	return data.result;
};

export const getAuthors = async () => {
	const { data } = await axios.get('http://localhost:4000/authors/all');
	return data.result;
};

export const loginCall = async (userData) => {
	const { data } = await axios({
		method: 'post',
		url: 'http://localhost:4000/login',
		data: userData,
	});
	return data;
};

export const logoutCall = async (token) => {
	const { status } = await axios.delete('http://localhost:4000/logout', {
		headers: {
			Authorization: token,
		},
	});
	return status;
};

export const getCurrentUser = async (token) => {
	const { data } = await axios.get('http://localhost:4000/users/me', {
		headers: {
			Authorization: token,
		},
	});
	return data.result;
};
