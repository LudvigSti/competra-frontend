import { API_URL } from './constants';

// CUSTOM FUNCTIONS

//USER

async function logInUser(data) {
	const res = await post('user/login', data);
	return res;
}

async function registerUser(data) {
	const res = await post('user/register', data);
	return res;
}

async function getAllUsers() {
	const res = await get('user/');
	return res;
}

//USER GROUP
async function getUserGroupByUserId(userId) {
	const res = await get(`usergroup/${userId}/`);
	return res;
}

async function joinGroup(data) {
	const res = await post('usergroup', data);
	return res;
}

async function leaveGroup(userId, groupId) {
	const res = await del(`usergroup/${userId}/${groupId}`);
	return res;
}

//GROUP

async function getActiveGroups(userId) {
	const res = await get(`group/unjoined/${userId}`);
	return res;
}

async function getGroupByGroupId(groupId) {
	const res = await get(`group/${groupId}`);
	return res;
}

//MATCH

async function createMatch(data) {
	const res = await post('match', data);
	return res;
}

async function getMatchHistoryByUserIdAndActivityId(activityId, userId) {
	const res = await get(`match/${activityId}/${userId}`);
	return res;
}

async function getMatchHistoryByUserId(userId) {
	const res = await get(`match/${userId}`);
	return res;
}

async function getMatchHistoryByActivityId(activityId) {
	const res = await get(`match/activity/${activityId}`);
	return res;
}

// ACTIVITIES
async function getLeaderboardByActivityId(activityId) {
	const res = await get(`activity/leaderboard/${activityId}`);
	return res;
}

async function getActivitiesByGroupId(groupId) {
	const res = await get(`activity/${groupId}`);
	return res;
}

// USER ACTIVITIES

async function getAllUserActivities() {
	const res = await get('useractivity/');
	return res;
}

async function checkIfUserIsInActivity(activityId, userId) {
	const res = await get(`UserActivity/IfInActivity/${activityId}/${userId}`);
	return res;
}

async function joinUserActivity(data) {
	const res = await post('useractivity', data);
	return res;
}

async function leaveUserActivity(activityId, userId) {
  const res = await del(`UserActivity/${activityId}/${userId}`);
  return res;
}

async function getUserActivitiesByUserId(userId) {
	const res = await get(`UserActivity/${userId}`);
	console.log(res ,"hei");
	return res;
}

// CRUD FUNCTIONS
async function post(endpoint, data, auth = false) {
	return await request('POST', endpoint, data, auth);
}

async function get(endpoint, auth = false) {
	return await request('GET', endpoint, null, auth);
}

async function patch(endpoint, data, auth = false) {
	return await request('PATCH', endpoint, data, auth);
}

async function put(endpoint, data, auth = false) {
	return await request('PUT', endpoint, data, auth);
}

async function del(endpoint, auth = false) {
	return await request('DELETE', endpoint, null, auth);
}

async function request(method, endpoint, data, auth = true) {
	const opts = {
		headers: {
			'Content-Type': 'application/json',
		},
		method,
	};

	if (method.toUpperCase() !== 'GET') {
		opts.body = JSON.stringify(data);
	}

	if (auth) {
		opts.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
	}

	const response = await fetch(`${API_URL}/${endpoint}`, opts);

	if (!response.ok) {
		console.error(
			`HTTP error! status: ${response.status}, response:`,
			response
		);
		throw new Error(
			response.message || response || `HTTP error! status: ${response.status}`
		);
	}

	// Check if the response has content before parsing
	const text = await response.text();
	return text ? JSON.parse(text) : {};
}

export {
	logInUser,
	registerUser,
	getUserGroupByUserId,
	getAllUserActivities,
	getAllUsers,
	joinGroup,
	leaveGroup,
	getActiveGroups,
	getActivitiesByGroupId,
	getLeaderboardByActivityId,
	createMatch,
	checkIfUserIsInActivity,
	joinUserActivity,
	getGroupByGroupId,
  	leaveUserActivity,
	getMatchHistoryByUserIdAndActivityId,
	getMatchHistoryByUserId,
	getMatchHistoryByActivityId,
	getUserActivitiesByUserId,
};
