async function addTaskInit() {
  addTaskSetPrioMedium();
  addTaskGetToday();
  await loadTasks();
  await loadUsers();
  await loadContacts();
  renderSubTasks();
  loadCurrentUser();
  loadInitials();
}

let addTaskPrio = "medium";
let subtaskAddTask = [];
let categoryAddTask;
let dueDateAddTask;
let assignedToAddTask = [];
let descriptionAddTask;
let titleAddTask;
let statusSubtaskAddTask = [];
let selectUserBox;
let taskInput;
let prioMedium;
let prioMediumImg;
let task_status;
let arrowDownImage;

//Variablen für Suchergebisse
let resultInitials;
let resultId;
let resultNames;

/**
 * This function sets the priority medium style at onload
 */
function addTaskSetPrioMedium() {
  prioMedium = document.getElementById("add_task_prio_medium");
  prioMedium.classList.add("add-task-prio-medium-pressed-button");
  prioMediumImg = document.getElementById("add_task_img_prio_medium");
  prioMediumImg.src = "./img/add_task/add_task_prio_medium_white.svg";
}

/**
 * Check if all required input field are filled
 * Requiered fields: title, due date, category
 */
function addTaskCheckForm() {
  if (
    document.getElementById("add_task_title").value.length > 0 &&
    document.getElementById("add_task_due_date").value.length > 0 &&
    document.getElementById("add_task_category").textContent !=
      "Select Task category"
  ) {
    document.getElementById("add_task_button").classList.remove("d-none");
  } else {
    document.getElementById("add_task_button").classList.add("d-none");
  }
}

/**
 * input value from formular put in variable
 */
function addTaskToVar(param) {
  task_status = param;
  titleAddTask = document.getElementById("add_task_title").value;
  descriptionAddTask = document.getElementById("add_task_description").value;
  dueDateAddTask = document.getElementById("add_task_due_date").value;
  addTaskSave();
}

/**
 * put all informations from formular to tasks JSON array
 * and put it to backendstorage
 */
async function addTaskSave() {
  await loadTasks();
  tasks.push({
    id: Date.now(),
    autor: currentUser["userId"],
    title: titleAddTask,
    description: descriptionAddTask,
    assignedTo: assignedToAddTask,
    dueDate: dueDateAddTask,
    prio: addTaskPrio,
    categoryTask: categoryAddTask,
    subtask: subtaskAddTask,
    status_subtask: statusSubtaskAddTask,
    status: task_status,
  });

  await setItem("tasks", JSON.stringify(tasks));

  addTaskSaveCompleted();
}

/**
 * show message added done if save at backendstorage is complete
 */
function addTaskSaveCompleted() {
  document
    .getElementById("add_task_popup_container")
    .classList.remove("d-none");
  setTimeout(addTaskGoToBoard, 1000);
}

/**
 * redirects user to board page
 */
function addTaskGoToBoard() {
  window.location.href = "board.html";
}

/**
 * The class add-task-prio-low-pressed-button is added to the prio button low and the colored image is exchanged for a white one
 */
function addTaskSelectedPriority(priority) {
  const elements = {
    low: {
      element: document.getElementById("add_task_prio_low"),
      img: document.getElementById("add_task_img_prio_low"),
    },
    medium: {
      element: document.getElementById("add_task_prio_medium"),
      img: document.getElementById("add_task_img_prio_medium"),
    },
    high: {
      element: document.getElementById("add_task_prio_high"),
      img: document.getElementById("add_task_img_prio_high"),
    },
  };

  for (const key in elements) {
    if (Object.hasOwnProperty.call(elements, key)) {
      const el = elements[key];
      const isSelected = key === priority;
      el.element.classList.toggle(
        `add-task-prio-${key}-pressed-button`,
        isSelected
      );
      el.img.src = `./img/add_task/add_task_prio_${key}${
        isSelected ? "_white" : ""
      }.svg`;
    }
  }
  addTaskPrio =
    priority === "low" ? "low" : priority === "medium" ? "medium" : "urgent";
}

/**
 * set min attribut to input type date for due date form field
 */
function addTaskGetToday() {
  let today = new Date();
  let day = today.getDate();
  let month = today.getMonth() + 1;
  let year = today.getFullYear();
  if (day < 10) {
    day = "0" + day;
  }
  if (month < 10) {
    month = "0" + month;
  }
  today = year + "-" + month + "-" + day;

  document.getElementById("add_task_due_date").min = today;
}

/**
 *The red frame around the input field if there is no input is hidden
 */
function removeRedBorder(param) {
  let labelId = "add_task_label_" + param;
  let mistakeId = "add_task_mistake_" + param;
  document.getElementById(labelId).classList.remove("borderColorMistake");
  document.getElementById(mistakeId).classList.add("d-none");
}

/**
 * The search results are saved in variables after entering them into the search field and function addTaskRenderSeaarchName and markSelectedContacts  are called
 */
function addTaskSearchName() {
  let searchInput = document.getElementById("add_task_assigned_to").value;
  searchInput = searchInput.toLowerCase();
  document.getElementById("add_task_select_user_box").innerHTML = ``;
  for (let i = 0; i < contacts.length; i++) {
    if (contacts[i]["name"].toLowerCase().includes(searchInput)) {
      resultNames = contacts[i]["name"];
      resultId = contacts[i]["id"];
      resultInitials = contacts[i]["initials"];
      resultColor = contacts[i]["color"];
      let itsMyAccount = itsMe(resultId);
      let selectContact = markSelectedContacts(resultId);
      addTaskRenderSearchName(selectContact, itsMyAccount);
    }
  }
}

/**
 *tests whether the logged in user and the user in the list are identical. If this is the case, "(You)" is returned
 * @param {number} id
 * @returns string (You)
 */
function itsMe(id) {
  if (id == currentUser["userId"]) {
    return "(You)";
  } else {
    return "";
  }
}

/**
 *The contacts that are selected are shown in color
 * @param {number} id
 * @returns boolean true
 */
function markSelectedContacts(id) {
  if (assignedToAddTask.includes(id)) {
    return true;
  }
}

/**
 * If no entry is made, a red frame is placed around the text field and an error message is displayed
 * @param {title, dueDate, category} param
 */
function addTaskShowMsg(param) {
  let labelId = "add_task_label_" + param;
  let mistakeId = "add_task_mistake_" + param;
  document.getElementById(mistakeId).classList.remove("d-none");
  document.getElementById(labelId).classList.add("borderColorMistake");
}

/**
 * style class is added to the contact and the selection box is checked
 * @param {number of contact} id
 */
function addStyleToSelectedContact(id) {
  let resultIdIsInAssignedToAddTask = assignedToAddTask.includes(id);
  if (!resultIdIsInAssignedToAddTask) {
    document.getElementById(id).classList.add("selectedContact");
    document.getElementById("selectContactBox" + id).src =
      "./img/add_task/rectangle_check_white.svg";
    addContactToTask(id);
  } else {
    document.getElementById(id).classList.remove("selectedContact");
    document.getElementById("selectContactBox" + id).src =
      "./img/add_task/rectangle.svg";
    deleteContactFromTask(id);
  }
}

/**
 *the selected contact is pushed in the array assignedTAddTask and the function renderSelectedContactsFromTask is executed
 * @param {number of contact} contactId
 */
function addContactToTask(contactId) {
  assignedToAddTask.push(contactId);
  renderSelectedContactsFromTask();
}

/**
 * Contact is deselected from the list of assigned to and the function renderSelectedContactsFromTask is called
 * @param {number of contact} contactId
 */
function deleteContactFromTask(contactId) {
  let resultIdToDelete = assignedToAddTask.indexOf(contactId);
  assignedToAddTask.splice(resultIdToDelete, 1);
  renderSelectedContactsFromTask();
}

/**
 * Function to open the select user box div
 */
function addTaskOpenContextMenuAssignedTo() {
  selectUserBox.classList.remove("d-none");
  document.getElementById("assigned_to_arrow_down").classList.add("d-none");
  document.getElementById("assigned_to_arrow_up").classList.remove("d-none");
}

/**
 * Function to close the select user box div
 */
function addTaskCloseContextMenuAssignedTo() {
  selectUserBox.classList.add("d-none");
  document.getElementById("assigned_to_arrow_up").classList.add("d-none");
  document.getElementById("assigned_to_arrow_down").classList.remove("d-none");
}

/**
 * Event listener for the input field and the image
 * @param {click} event
 */
function handleOpenContextMenu(event) {
  event.stopPropagation();
  addTaskOpenContextMenuAssignedTo();
}

/**
 * Event listener for clicking on the arrow_down image
 */
function handleArrowDownClick(event) {
  event.stopPropagation();
  addTaskOpenContextMenuAssignedTo();
}

/**
 * The function runs when the DOM is fully loaded and adds event listeners to handle clicks on specific elements, stopping the event from propagating for one of them.
 */
document.addEventListener("DOMContentLoaded", function () {
  selectUserBox = document.getElementById("add_task_select_user_box");
  taskInput = document.getElementById("add_task_assigned_to");
  taskInput.addEventListener("click", handleOpenContextMenu);

  selectUserBox.addEventListener("click", function (event) {
    event.stopPropagation();
  });

  arrowDownImage = document.getElementById("assigned_to_arrow_down");
  arrowDownImage.addEventListener("click", handleArrowDownClick);

  /**
   * Event listener to close the select user box when clicked outside of it
   */
  document.addEventListener("click", function (event) {
    if (
      !selectUserBox.contains(event.target) &&
      event.target !== taskInput &&
      event.target !== arrowDownImage
    ) {
      addTaskCloseContextMenuAssignedTo();
    }
  });
});

/**
 * resets the category to the default value
 */
function resetCategory() {
  document.getElementById(
    "add_task_category"
  ).innerHTML = `Select Task category`;
}
