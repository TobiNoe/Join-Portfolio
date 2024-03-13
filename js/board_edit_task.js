let taskRecordSet;
let taskIndex;
let editSelectUserBox;
let editTaskInput;
let editAssignedToAddTask = [];
let editSubtaskAddTask = [];
let editStatusSubtaskAddTask = [];
let changedPrio;

/**
 * function display edit task contex in board and call functions to editTaskLoadValues(tasksIndex) and editTaskFillInput()
 * @param {*} tasksIndex index of selcted task into tasks json
 */
function boardShowEditTask(tasksIndex) {
  editTaskLoadValues(tasksIndex);
  editTaskFillInput();
  document.getElementById('board_task_edit_task_main').classList.remove('d-none');
  document.getElementById('board_task_edit_task_main').classList.add('d-flex');
}

/**
 * function hide edit task contex in board
 */
function boardCloseEditTask() {
  document.getElementById('board_task_edit_task_main').classList.add('d-none');
  document.getElementById('board_task_edit_task_main').classList.remove('d-flex');
}

/**
 * Function load current values form current task
 * @param {index} tasksIndex Index of curretn task in tasks array
 */
function editTaskLoadValues(tasksIndex) {
  taskRecordSet = tasks[tasksIndex];
  taskIndex = tasksIndex;
}

/**
 * load assignedTo values of current task into editAssignedToAddTask an call render function
 */
function editReadSelectedContacts() {
  editAssignedToAddTask = taskRecordSet['assignedTo'];
  editRenderSelectedContactsFromTask();
}

/**
 * load subtasks from current task into editStatusSubtaskAddTask and editSubtaskAddTask and call render function
 */
function editReadCurrentSubtasks() {
  editSubtaskAddTask = taskRecordSet['subtask'];
  editStatusSubtaskAddTask = taskRecordSet['status_subtask'];
  editTaskRenderSubTasks()
}

/**
 * Function fill the input fields ans selections of edt window, with current values of current task
 */
function editTaskFillInput() {
  document.getElementById('edit_task_title').value = taskRecordSet['title'];
  document.getElementById('edit_task_description').value = taskRecordSet['description'];
  document.getElementById('edit_task_due_date').value = taskRecordSet['dueDate'];
  editTaskSelectedPrio(taskRecordSet['prio']);
  editReadSelectedContacts();
  editReadCurrentSubtasks();
}

/**
 * function read all editable values and overwrite old values
 */
async function editTaskUpdate() {
  tasks[taskIndex]['title'] = document.getElementById('edit_task_title').value;
  tasks[taskIndex]['description'] = document.getElementById('edit_task_description').value;
  tasks[taskIndex]['dueDate'] = document.getElementById('edit_task_due_date').value;
  tasks[taskIndex]['prio'] = changedPrio;
  tasks[taskIndex]['assignedTo'] = editAssignedToAddTask;
  tasks[taskIndex]['subtask'] = editSubtaskAddTask;
  tasks[taskIndex]['status_subtask'] = editStatusSubtaskAddTask;
  boardCloseEditTask();
  boardRenderDetailCard(taskIndex);
  boardUpdateTasksPreview(taskIndex);
  await setItem('tasks', tasks);
}

/**
 * Check if all required input field are filled
 * Requiered fields: title, due date, category
 */
function editTaskCheckForm() {
  if (
    document.getElementById("edit_task_title").value.length > 0 &&
    document.getElementById("edit_task_due_date").value.length > 0
  ) {
    /* document.getElementById("edit_task_button").classList.remove("d-none"); */
  } else {
    /* document.getElementById("edit_task_button").classList.add("d-none"); */
    editTaskShowMsg('title', document.getElementById("edit_task_title").value.length > 0);
    editTaskShowMsg('dueDate', document.getElementById("edit_task_due_date").value.length > 0);
  }
}

/**
 * If no entry is made, a red frame is placed around the text field and an error message is displayed
 * @param {title, dueDate, category} param
 */
function editTaskShowMsg(param, boolean) {
  if (!boolean) {
    let labelId = "edit_task_label_" + param;
    let mistakeId = "edit_task_mistake_" + param;
    document.getElementById(mistakeId).classList.remove("d-none");
    document.getElementById(labelId).classList.add("board-edit-borderColor-mistake");
  }
}

/**
 *The red frame around the input field if there is no input is hidden
 */
function editTaskRemoveRedBorder(param) {
  let labelId = "edit_task_label_" + param;
  let mistakeId = "edit_task_mistake_" + param;

  document.getElementById(labelId).classList.remove("board-edit-borderColor-mistake");
  document.getElementById(mistakeId).classList.add("d-none");
}

/**
 * function set slecetion of prio button from current task
 * @param {string} prioSelected prio value of current task
 */
function editTaskSelectedPrio(prioSelected) {
  const prioButton = document.getElementById('edit_task_prio_' + prioSelected);
  const prioButtonImg = document.getElementById('edit_task_img_prio_' + prioSelected);
  prioButton.classList.add('edit-task-prio-' + prioSelected + '-pressed-button');
  prioButtonImg.src = './img/board/prio_' + prioSelected + '_white.svg';
  editTaskRemoveSelectedPrio(prioSelected)
  changedPrio = prioSelected;
}

/**
 * function return a Array from non selected prio
 * @param {string} prioSelected current prio of current task
 * @returns Array from non selected prio
 */
function editTasksfindUnselectedPrio(prioSelected) {
  switch (prioSelected) {
    case 'urgent':
      return ['medium', 'low'];
      break;
    case 'medium':
      return ['urgent', 'low'];
      break;
    case 'low':
      return ['urgent', 'medium'];
      break;
    default:
      console.error('Wrong prio hand over in function board editTaskRemoveSelectedPrio()')
      break;
  }
}

/**
 * function remove prio highlight from non selcted prio button
 * @param {string} prioSelected current prio form current task
 */
function editTaskRemoveSelectedPrio(prioSelected) {
  let prioArr = editTasksfindUnselectedPrio(prioSelected);
  for (let i = 0; i < prioArr.length; i++) {
    const prioRemove = prioArr[i];
    const prioButton = document.getElementById('edit_task_prio_' + prioRemove);
    const prioButtonImg = document.getElementById('edit_task_img_prio_' + prioRemove);
    prioButton.classList.remove('edit-task-prio-' + prioRemove + '-pressed-button');
    prioButtonImg.src = './img/board/board_task_' + prioRemove + '.svg';
  }
}

/**
 * The search results are saved in variables after entering them into the search field and function addTaskRenderSeaarchName and markSelectedContacts  are called
 */
function editTaskSearchName() {
  let searchInput = document.getElementById('edit_task_assigned_to').value;
  searchInput = searchInput.toLowerCase();
  document.getElementById('edit_task_select_user_box').innerHTML = ``;
  for (let i = 0; i < contacts.length; i++) {
    if (contacts[i]["name"].toLowerCase().includes(searchInput)) {
      resultNames = contacts[i]["name"];
      resultId = contacts[i]["id"];
      resultInitials = contacts[i]["initials"];
      resultColor = contacts[i]["color"];
      let selectContact = editMarkSelectedContacts(resultId);
      editTaskRenderSearchName(selectContact);
    }
  }
}

/**
 * The list of contacts is rendered and output in the div container add_task_select_user_box_
 * @param {color in HEX of contact} color
 */
function editTaskRenderSearchName(color) {
  if (document.documentElement.clientWidth < 1300) {
    document.getElementById("rightContainer").classList.add("m-top270");
  }
  document.getElementById('edit_task_select_user_box').innerHTML += `                     
            <div class="edit-task-selectField" id="id${resultId}" onclick="editStyleToSelectedContact(${resultId})">
              <span class="edit-task-selectInitial dFlexAiCenterJcCenter" style="background-color:${resultColor}">${resultInitials}</span>
                <span class="edit-task-selectName">${resultNames}</span>
                  <img src="./img/board/rectangle.svg" id="editSelectContactBox${resultId}">
            </div>`;
  if (color) {
    document.getElementById(`id${resultId}`).classList.add("edit-selected-contact");
    document.getElementById("editSelectContactBox" + resultId).src =
      "./img/board/rectangle_check_white.svg";
  }
}

/**
* Function to open the select user box div
*/
function editTaskOpenContextMenuAssignedTo() {
  editSelectUserBox.classList.remove("d-none");
  document.getElementById("editAssigned_to_arrow_down").classList.add("d-none");
  document.getElementById("editAssigned_to_arrow_up").classList.remove("d-none");
}

/**
 * Function to close the select user box div
 */
function editTaskCloseContextMenuAssignedTo() {
  editSelectUserBox.classList.add("d-none");
  document.getElementById("editAssigned_to_arrow_up").classList.add("d-none");
  document.getElementById("editAssigned_to_arrow_down").classList.remove("d-none");
}

/**
 * Event listener for the input field and the image
 * @param {click} event
 */
function editTaskhandleOpenContextMenu(event) {
  event.stopPropagation();
  editTaskOpenContextMenuAssignedTo();
}

/**
 * Function to close the select user box div when clicked outside of itFunction to close the select user box div when clicked outside of it
 */
document.addEventListener("click", function (event) {
  if (!editSelectUserBox.contains(event.target) && event.target !== editTaskInput) {
    editTaskCloseContextMenuAssignedTo();
  }
});

/**
 * displays the selected contacts
 */
function editRenderSelectedContactsFromTask() {
  document.getElementById("editOutputSelectedContacts").innerHTML = ``;
  for (let i = 0; i < editAssignedToAddTask.length; i++) {
    for (let j = 0; j < contacts.length; j++) {
      if (editAssignedToAddTask[i] == contacts[j]["id"]) {
        document.getElementById(
          "editOutputSelectedContacts"
        ).innerHTML += `<div class="container edit-task-initialsOverview" style="background-color:${contacts[j]["color"]}">
                            <span onclick="editDeleteContactFromTask(${contacts[j]["id"]})">${contacts[j]["initials"]}</span>
                        </div>`;
      }
    }
  }
}

/**
 *The contacts that are selected are shown in color
 * @param {number} id
 * @returns boolean true
 */
function editMarkSelectedContacts(id) {
  if (editAssignedToAddTask.includes(id)) {
    return true;
  }
}

/**
 * style class is added to the contact and the selection box is checked
 * @param {number of contact} id
 */
function editStyleToSelectedContact(id) {
  let resultIdIsInAssignedToAddTask = editAssignedToAddTask.includes(id);
  if (!resultIdIsInAssignedToAddTask) {
    document.getElementById(`id${id}`).classList.add("edit-selected-contact");
    document.getElementById("editSelectContactBox" + id).src =
      "./img/board/rectangle_check_white.svg";
    editAddContactToTask(id);
  } else {
    document.getElementById(`id${id}`).classList.remove("edit-selected-contact");
    document.getElementById("editSelectContactBox" + id).src =
      "./img/board/rectangle.svg";
    editDeleteContactFromTask(id);
  }
}

/**
 *the selected contact is pushed in the array assignedTAddTask and the function renderSelectedContactsFromTask is executed
 * @param {number of contact} contactId
 */
function editAddContactToTask(contactId) {
  editAssignedToAddTask.push(contactId);
  editRenderSelectedContactsFromTask();
}

/**
 * Contact is deselected from the list of assigned to and the function renderSelectedContactsFromTask is called
 * @param {number of contact} contactId
 */
function editDeleteContactFromTask(contactId) {
  let resultIdToDelete = editAssignedToAddTask.indexOf(contactId);
  editAssignedToAddTask.splice(resultIdToDelete, 1);
  editRenderSelectedContactsFromTask();
}

/**
 * the created subtasks are output
 */
function editTaskRenderSubTasks() {
  let output = document.getElementById("edit_task_outputSubtasks");
  output.innerHTML = ``;
  for (let i = 0; i < editSubtaskAddTask.length; i++) {
    output.innerHTML += `                        
      <div ondblclick="editTaskEditSubTask(${i})"  class="cursorPointer edit-task-li" contenteditable="false">
        &#8226;<span id="edit_task_subtaskContent${i}" onkeyup="editCheckSubTaskEditInput(${i})" onblur="editCheckIfEditingIsEmpty(${i})"> ${editSubtaskAddTask[i]}</span>
          <div class="d-flex">
            <img id="edit_task_img_add_subtask_check${i}" src="./img/board/check.svg" onclick="editTaskSaveEditing(${i})" class="m-right20 cursorPointer d-none">
            <img id="edit_task_img_add_subtask${i}" src="./img/board/edit.svg" onclick="editTaskEditSubTask(${i})" class="m-right20 cursorPointer">
            <img src="./img/board/delete.svg" class="cursorPointer" onclick="editTaskDeleteSubtask(${i})">
          </div>
      </div>`;
  }
}

/**
 * a subtask is added to the task and then the functions clearSubTaskInput and renderSubTasks are executed
 */
function editTaskAddSubtask() {
  let subtaskInput = document.getElementById("edit_task_subtask").value;
  if (subtaskInput.length > 0) {
    editSubtaskAddTask.push(subtaskInput);
    editStatusSubtaskAddTask.push("do");
    editTaskClearSubTaskInput();
    editTaskRenderSubTasks();
  }
}

/**
 * subtask can be edited, subtask is set in focus and the div container is set editable
 * @param {number f subtask} index
 */
function editTaskEditSubTask(index) {
  let editContent = document.getElementById(`edit_task_subtaskContent${index}`);
  editContent.contentEditable = true;
  editContent.focus();
  editTaskChangeImagesByEditingSubtask(index);
}

/**
 *Images for editing and deleting the subtask are exchanged
 * @param {number of subtask} index
 */
function editTaskChangeImagesByEditingSubtask(index) {
  document
    .getElementById(`edit_task_img_add_subtask_check${index}`)
    .classList.remove("d-none");
  document.getElementById(`edit_task_img_add_subtask${index}`).classList.add("d-none");
}

/**
 * The edited subtask is saved and the images are reset again
 * @param {number of subtasks} index
 */
function editTaskSaveEditing(index) {
  let output = document.getElementById(`edit_task_subtaskContent${index}`).innerHTML;
  if (output.length == 0) {
    document
      .getElementById(`edit_task_img_add_subtask_check${index}`)
      .classList.add("d-none");
  }
  editSubtaskAddTask[index] = output;
  document
    .getElementById(`edit_task_img_add_subtask_check${index}`)
    .classList.add("d-none");
  document.getElementById(`edit_task_img_add_subtask${index}`).classList.remove("d-none");
  editTaskRenderSubTasks();
}

/**
 * check if editfield foor subtasks is empty or not
 * id empty save button not visibil
 * @param {number} index
 */
function editCheckSubTaskEditInput(index) {
  let output = document.getElementById(`edit_task_subtaskContent${index}`).innerHTML;
  if (output.length == 0) {
    document
      .getElementById(`edit_task_img_add_subtask_check${index}`)
      .classList.add("d-none");
  } else {
    document
      .getElementById(`edit_task_img_add_subtask_check${index}`)
      .classList.remove("d-none");
  }
}

/**
 * the input field for the subtasks is cleared
 */
function editTaskClearSubTaskInput() {
  document.getElementById("edit_task_subtask").value = ``;
  editTaskChangeSubTaskImg();
}
/**
 * The images in the subtask input fled are changed after a text is entered
 */
function editTaskChangeSubTaskImg() {
  if (document.getElementById("edit_task_subtask").value.length > 0) {
    document.getElementById("edit_task_subtask_img").src =
      "./img/board/check.svg";
    document
      .getElementById("edit_task_subtask_img")
      .classList.add("edit-subtask-img");
  } else {
    document.getElementById("edit_task_subtask_img").src =
      "./img/board/plus.svg";
    document
      .getElementById("edit_task_subtask_img")
      .classList.add("edit-subtask-img");
  }
}

/**
 * If you click on the body when changing a subtask, the new content is saved; if the new content has a length of 0, the subtask is deleted
 * @param {number} index
 */
function editCheckIfEditingIsEmpty(index) {
  let output = document.getElementById(`edit_task_subtaskContent${index}`).innerHTML;
  if (output.length == 0) {
    editTaskDeleteSubtask(index);
  } else {
    editTaskSaveEditing(index);
  }
}

/**
 * the subtask is deleted
 * @param {number of subtask} index
 */
function editTaskDeleteSubtask(index) {
  editSubtaskAddTask.splice(index, 1);
  editStatusSubtaskAddTask.splice(index, 1);
  editTaskRenderSubTasks();
}

/**
 * Event listener for clicking on the arrow_down image
 */
function editHandleArrowDownClick(event) {
  event.stopPropagation();
  editTaskOpenContextMenuAssignedTo();
}