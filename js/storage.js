const STORAGE_KEY = 'django-insecure-kj=pf$1c*$kk36@iy-riv1m7=tnos@e25m36)2my(dn(9km+bj';
const STORAGE_URL = "http://127.0.0.1:8000/api/";

let users = [];
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
 * loads the key with the value from backend
 * @param {string} item name of key in backend
 * @returns value of item
 */
async function getItem(item) {
  const url = `${STORAGE_URL}${item}/?key=${encodeURIComponent(STORAGE_KEY)}&format=json`;
  const response = await fetch(url, {
    headers: { 'Accept': 'application/json' }
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
    /* console.log('Kontakte:',contacts) */
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
  const url = `${STORAGE_URL}${item}/?key=${encodeURIComponent(STORAGE_KEY)}&format=json`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }

  //TODO: Optional: Wir können die Response als JSON parsen und zurückgeben
  /* const json = await response.json(); */
  /* return response; */
}

/**
 * update the key with the value to backend
 * @param {string} item name of key in backend
 * @param {string} data of key
 * @returns value of key as json
 */
async function editItem(item, id, data) {
  const url = `${STORAGE_URL}${item}/${id}/?key=${encodeURIComponent(STORAGE_KEY)}&format=json`;

  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }

  //TODO: Optional: Wir können die Response als JSON parsen und zurückgeben
  /* const json = await response.json(); */
  /* return response; */
}

async function updateItem(item, id, data) {
  const url = `${STORAGE_URL}${item}/${id}/?key=${encodeURIComponent(STORAGE_KEY)}&format=json`;

  const response = await fetch(url, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }

  //TODO: Optional: Wir können die Response als JSON parsen und zurückgeben
  /* const json = await response.json(); */
  /* return response; */
}

async function deleteItem(item, Id) {
  const url = `${STORAGE_URL}${item}/${Id}/?key=${encodeURIComponent(STORAGE_KEY)}&format=json`;

  const response = await fetch(url, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json'
    }
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }
}

/**
 * loads the users from backend
 */
/* async function loadUsers() {
  try {
    users = JSON.parse(await getItem("users"));
  } catch (e) {
    console.error("Loading error:", e);
  }
} */