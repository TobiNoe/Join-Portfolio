const STORAGE_TOKEN = "ZE2UHDN0ZNZ1NK5SZMO83CGMAD73WG0SLNIZYU6W";
const STORAGE_URL = "https://remote-storage.developerakademie.org/item";

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
 * saves the key with the value to backend
 * @param {string} key name of key in backend
 * @param {string} value of key
 * @returns value of key as json
 */
async function setItem(key, value) {
  const payload = { key, value, token: STORAGE_TOKEN };
  return fetch(STORAGE_URL, {
    method: "POST",
    body: JSON.stringify(payload),
  }).then((res) => res.json());
}
/**
 * loads the key with the value from backend
 * @param {string} key name of key in backend
 * @returns value odf key
 */
async function getItem(key) {
  const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
  return fetch(url)
    .then((res) => res.json())
    .then((res) => {
      if (res.data) {
        return res.data.value;
      }
      throw `Could not find data with key "${key}".`;
    });
}

/**
 * loads the users from backend
 */
async function loadUsers() {
  try {
    users = JSON.parse(await getItem("users"));
  } catch (e) {
    console.error("Loading error:", e);
  }
}

/**
 * loads the tasks from backend
 */
async function loadTasks() {
  try {
    tasks = JSON.parse(await getItem("tasks"));
  } catch (e) {
    console.error("Loading error:", e);
  }
}

/**
 * loads the contacts from backend
 */
async function loadContacts() {
  try {
    contacts = JSON.parse(await getItem("contacts"));
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
