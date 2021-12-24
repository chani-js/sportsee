import axios from 'axios';

const instance = axios.create({
	baseURL: 'http://localhost:3000/user',
});

/**
 * Gets user infosa partir de L'API
 *
 * @param {string} id User id
 * @returns {object} Response
 */
export const getUserInfos = async (id) => {
	try {
		const res = await instance.get(`/${id}`);
		return res.data;
	} catch (e) {
		console.log(e);
	}
};

/**
 * Gets user performance partir de L'API
 *
 * @param {string} id User id
 * @returns {object} Response
 */
export const getUserPerformance = async (id) => {
	try {
		const res = await instance.get(`/${id}/performance`);
		return res.data;
	} catch (e) {
		console.log(e);
	}
};

/**
 * Gets user activity partir de L'API
 *
 * @param {string} id User id
 * @returns {object} Response
 */
export const getUserActivity = async (id) => {
	try {
		const res = await instance.get(`/${id}/activity`);
		return res.data;
	} catch (e) {
		console.log(e);
	}
};

/**
 * Gets user average sessions partir de L'API
 *
 * @param {string} id User id
 * @returns {object} Response
 */
export const getUserAverageSessions = async (id) => {
	try {
		const res = await instance.get(`/${id}/average-sessions`);
		return res.data;
	} catch (e) {
		console.log(e);
	}
};
