/**
 * init function to load the inserted functions by onload
 */
async function summaryInit() {
  await loadTasks();
  await loadCurrentUser();
  showCurrentUserName();
  await loadCounts();
  showCurrentUserNameMobile();
  summaryGreetigAtDayTimeMobile();
}

/**
 * function to load inserted functions
 */
async function loadCounts() {
  summaryGreetigAtDayTime();
  summaryCountTasksAll();
  summaryCountTasks("status", "todo");
  summaryCountTasks("status", "done");
  summaryCountTasks("prio", "urgent");
  summaryCountTasks("status", "progress");
  summaryCountTasks("status", "feedback");
  summaryFindDueDate();
}

/**
 * gives a notification according to the time of day
 */
function summaryGreetigAtDayTime() {
  let today = new Date();
  let hours = today.getHours();

  if ((hours >= 17 && hours <= 23) || (hours >= 0 && hours <= 5)) {
    document.getElementById("greeting").innerHTML = `Good evening,`;
  } else if (hours >= 5 && hours <= 12) {
    document.getElementById("greeting").innerHTML = `Good morning,`;
  } else if (hours > 12 && hours <= 17) {
    document.getElementById("greeting").innerHTML = `Good afternoon,`;
  }
}

function summaryCountTasks(status, category) {
  let count = 0;
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i][status] == category) {
      count++;
    }
  }
  document.getElementById(
    "summary_" + category + "_sum"
  ).innerHTML = `${count}`;
}

/**
 * counts how many entries are present in the array tasks and outputs them
 */
function summaryCountTasksAll() {
  countTasks = tasks.length;

  document.getElementById(
    "summary_number_of_tasks"
  ).innerHTML = `${countTasks}`;
}

/**
 * is triggered by mouseover and replaces the corresponding image
 * @param {string} check, edit
 */
function summaryChangeImage(param) {
  if (param == "check") {
    document.getElementById("summary_images_check").src =
      "./img/summary/check_white.svg";
  }
  if (param == "edit") {
    document.getElementById("summary_images_edit").src =
      "./img/summary/edit_white.svg";
  }
}

/**
 * is triggered by mouseout and replaces the corresponding image back
 * @param {string} check, edit
 */
function summaryChangeImageBack(param) {
  if (param == "check") {
    document.getElementById("summary_images_check").src =
      "./img/summary/check_blue.svg";
  }
  if (param == "edit") {
    document.getElementById("summary_images_edit").src =
      "./img/summary/edit_blue.svg";
  }
}

/**
 * looks for the next due date where the priority is urgent and the status is not done
 */
function summaryFindDueDate() {
  let urgendDate = document.getElementById("summary_urgent_date");
  let closestDate = Infinity;

  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i]["prio"] == "urgent" && tasks[i]["status"] != "done") {
      let task = new Date(tasks[i]["dueDate"]);
      if (task < closestDate || closestDate === null) closestDate = task;
    }
  }
  if (closestDate == Infinity) return;
  else urgendDate.innerHTML = closestDate.toLocaleDateString();
}

/**
 * shows curent username in id welcomeName
 */
function showCurrentUserName() {
  document.getElementById("welcome_name").innerHTML = `${currentUser["name"]}`;
}

/**
 * shows curent username in id welcomeName
 */
function showCurrentUserNameMobile() {
  document.getElementById(
    "welcome_name_mobile"
  ).innerHTML = `${currentUser["name"]}`;
}

/**
 * gives a notification according to the time of day
 */
function summaryGreetigAtDayTimeMobile() {
  let today = new Date();
  let hours = today.getHours();

  if ((hours >= 17 && hours <= 23) || (hours >= 0 && hours <= 5)) {
    document.getElementById("greeting_mobile").innerHTML = `Good evening,`;
  } else if (hours >= 5 && hours <= 12) {
    document.getElementById("greeting_mobile").innerHTML = `Good morning,`;
  } else if (hours > 12 && hours <= 17) {
    document.getElementById("greeting_mobile").innerHTML = `Good afternoon,`;
  }
}
