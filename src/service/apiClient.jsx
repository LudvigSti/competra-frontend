import { API_URL } from "./constants";

// CUSTOM FUNCTIONS

//USER

async function logInUser(data){
    const res = await post('user/login', data);
    return res;
}

async function registerUser(data){
    const res = await post('user/register', data);
    return res;
}

//USER GROUP
async function getUserGroupByUserId(userId){
  const res = await get(`usergroup/${userId}/`);
  return res;
}

async function joinGroup(data){
  const res = await post('usergroup', data);
  return res;
}

async function leaveGroup(userId, groupId){
  const res = await del(`usergroup/${userId}/${groupId}`);
  return res;
}

//GROUP

async function getActiveGroups(userId){
  const res = await get(`group/${userId}`);
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
        'Content-Type': 'application/json'
      },
      method
    };
  
    if (method.toUpperCase() !== 'GET') {
      opts.body = JSON.stringify(data);
    }
  
    if (auth) {
      opts.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
    }
  
    const response = await fetch(`${API_URL}/${endpoint}`, opts);
  
    if (!response.ok) {
      console.error(`HTTP error! status: ${response.status}, response:`, response);
      throw new Error(response.message || response || `HTTP error! status: ${response.status}`);
    }
  
    // Check if the response has content before parsing
    const text = await response.text();
    return text ? JSON.parse(text) : {};
  }

  export {
    logInUser,
    registerUser,
    getUserGroupByUserId,
    joinGroup,
    leaveGroup,
    getActiveGroups
  }
