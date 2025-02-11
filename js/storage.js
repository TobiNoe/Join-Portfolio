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
  
  // Wenn json ein Array ist, nutze es direkt:
  if (Array.isArray(json)) {
    return json;
  }
  
  // Falls json ein Objekt mit data-Eigenschaft ist:
  if (json.data) {
    return json.data.value;
  }
  
  throw new Error('Could not find data with key.');
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
 * @param {string} key name of key in backend
 * @param {string} value of key
 * @returns value of key as json
 */
/* async function setItem(key, value) {
  const payload = { key, value, token: STORAGE_TOKEN };
  return fetch(STORAGE_URL, {
    method: "POST",
    body: JSON.stringify(payload),
  }).then((res) => res.json());
} */



/* async function getItem(key) {
  const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
  return fetch(url)
    .then((res) => res.json())
    .then((res) => {
      if (res.data) {
        return res.data.value;
      }
      throw `Could not find data with key "${key}".`;
    });
} */

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