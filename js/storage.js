const STORAGE_URL = "http://127.0.0.1:8000/api/";
const SIGN_UP_URL = "http://127.0.0.1:8000/api/auth/registration/";
const LOGIN_URL = "http://127.0.0.1:8000/api/auth/login/";

let tasks = [];
let contacts = [];
let currentUser = [];
let allColors = [
  "#FF7A00",
  "#FF5EB3",
  "#6E52FF",
  "#9327FF",
  "#00BEE8",
  "#1FD7C1",
  "#FF745E",
  "#FFA35E",
  "#FC71FF",
  "#FFC701",
  "#0038FF",
  "#C3FF2B",
  "#FFE62B",
  "#FF4646",
  "#FFBB2B",
];

/**
 * Registers a new user and stores the authentication token.
 *
 * Sends user data to the signup endpoint and saves the returned token in localStorage.
 *
 * @async
 * @function signUpUser
 * @param {Object} data - User registration data.
 * @returns {Promise<Object>} Server response containing user info and token.
 * @throws {Error} If the registration fails (status !== 201).
 */
async function signUpUser(data) {
  const url = SIGN_UP_URL;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(data)
  });

  const responseData = await response.json();

  if (response.status !== 201) {
    throw new Error(JSON.stringify(responseData));
  } 

  localStorage.setItem("authToken", responseData.token);
  return responseData;
}

/**
 * Logs in a user and stores the authentication token.
 *
 * Sends login credentials to the backend and saves the returned token in localStorage.
 *
 * @async
 * @function loginUser
 * @param {Object} data - User login credentials.
 * @returns {Promise<Object>} Server response containing user info and token.
 * @throws {Error} If the login fails (status !== 200).
 */
async function loginUser(data) {
  const url = LOGIN_URL;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(data)
  });

  const responseData = await response.json();

  if (response.status !== 200) {
    throw new Error(JSON.stringify(responseData));
  }
  
  localStorage.setItem("authToken", responseData.token);
  return responseData;
}

/**
 * loads the key with the value from backend
 * @param {string} item name of key in backend
 * @returns value of item
 */
async function getItem(item) {
  const url = `${STORAGE_URL}${item}/?format=json`;
  const token = localStorage.getItem("authToken");

  const response = await fetch(url, {
   headers: {
      'Accept': 'application/json',
      ...(token && { 'Authorization': `Token ${token}` })
    }
  });

  const json = await response.json();
  
  if (!response.ok) {
    throw new Error(`Error ${response.status}: Could not find data with key.`);
  }

  if (Array.isArray(json)) {
    return json;
  }

  if (json.data) {
    return json.data.value;
  }

  throw new Error('Could not find data structure in response.');
}

/**
 * loads the contacts from backend
 */
async function loadContacts() {
  try {
    contacts = await getItem("contacts");
  } catch (e) {
    console.error("Loading error:", e);
  }
}

/**
 * loads the tasks from backend
 */
async function loadTasks() {
  try {
    tasks = await getItem("tasks");
  } catch (e) {
    console.error("Loading error:", e);
  }
}

/**
* loads the current user from localStorage
* query built into loadCurrentUser so that users who are not logged in are automatically redirected back to the index.html page
*/
function loadCurrentUser() {
  let currentUserJSONTOText = localStorage.getItem("currentUser");
  currentUser = JSON.parse(currentUserJSONTOText);
  if (!currentUser) {
    window.location.href = "index.html";
  }
}

/**
 * saves the key with the value to backend
 * @param {string} item name of key in backend
 * @param {string} data of key
 * @returns value of key as json
 */
async function postItem(item, data) {
  const url = `${STORAGE_URL}${item}/?format=json`;
  const token = localStorage.getItem("authToken");

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...(token && { 'Authorization': `Token ${token}` })
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }
}

/**
 * update the key with the value to backend
 * @param {string} item name of key in backend
 * @param {string} data of key
 * @returns value of key as json
 */
async function editItem(item, id, data) {
  const url = `${STORAGE_URL}${item}/${id}/?format=json`;
  const token = localStorage.getItem("authToken");

  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...(token && { 'Authorization': `Token ${token}` })
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }
}

/**
 * Updates a specific item on the backend using PATCH.
 *
 * Sends updated data for a given item ID and includes an auth token if available.
 *
 * @async
 * @function updateItem
 * @param {string} item - Resource name (e.g. "contacts").
 * @param {number} id - ID of the item to update.
 * @param {Object} data - Data to be patched.
 * @throws {Error} If the request fails.
 */
async function updateItem(item, id, data) {
  const url = `${STORAGE_URL}${item}/${id}/?format=json`;
  const token = localStorage.getItem("authToken");

  const response = await fetch(url, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...(token && { 'Authorization': `Token ${token}` })
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }
}

/**
 * Deletes a specific item from the backend by ID.
 *
 * Includes an auth token if available for authorization.
 *
 * @async
 * @function deleteItem
 * @param {string} item - Resource name (e.g. "contacts").
 * @param {number} id - ID of the item to delete.
 * @throws {Error} If the request fails.
 */
async function deleteItem(item, id) {
  const url = `${STORAGE_URL}${item}/${id}/?format=json`;
  const token = localStorage.getItem("authToken");

  const response = await fetch(url, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      ...(token && { 'Authorization': `Token ${token}` })
    }
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }
}