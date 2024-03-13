let boardTasksToDo = [];
let boardTasksProgress = [];
let boardTasksFeedback = [];
let boardTasksDone = [];
let boardTasksToDoSearch = [];
let boardTasksProgressSearch = [];
let boardTasksFeedbackSearch = [];
let boardTasksDoneSearch = [];
let boardCurrentDraggedTask;
let boardTaskStatus;
let boardTaskStatusValue;
let boardRenderDetail = true;

/**
 * function to initialize the board.html if it will load
 */
async function boardInit() {
    await includeHTML();
    loadCurrentUser();
    loadInitials();
    await loadTasks();
    await loadContacts();
    await boardReadTasks();
    boardRenderInit();
}

/**
 * clean all data in the sort arrays
 */
function boardCleanTaksArrays() {
    boardTasksToDo = [];
    boardTasksProgress = [];
    boardTasksFeedback = [];
    boardTasksDone = [];
}

/**
 * function clear the search arrays
 */
function boardCleanTaksArraysSearch() {
    boardTasksToDoSearch = [];
    boardTasksProgressSearch = [];
    boardTasksFeedbackSearch = [];
    boardTasksDoneSearch = [];
}

/**
 * function read tasks from tasks-json and start function boardSortTasks()
 */
async function boardReadTasks() {
    boardCleanTaksArrays();

    for (let i = 0; i < tasks.length; i++) {
        const task = tasks[i];
        boardSortTasks(task['id'], task['status'])
    }
}

/**
 * function to sort the tasks into arrays sortet by status. 
 * @param {number} id  task-id value tio push into sort-array
 * @param {string} status to decide to push in witch array
 */
function boardSortTasks(id, status) {
    switch (status) {
        case 'todo':
            boardTasksToDo.push(id);
            break;
        case 'progress':
            boardTasksProgress.push(id);
            break;
        case 'feedback':
            boardTasksFeedback.push(id);
            break;
        case 'done':
            boardTasksDone.push(id);
            break;
        default:
            console.warn = "Wrong status in tasksArray";
    }
}

/**
 * Function read index of the id into tasks json
 * @param {number} id 
 * @returns index of tasks array
 */
function boardIndexOfJSON(json, id) {

    for (let j = 0; j < json.length; j++) {
        const jsonRecord = json[j];

        if (jsonRecord['id'] == id) {
            return j;
        }
    }
}

/**
 * function return a stirng to render right name into placeholder if no task exist into any task category
 * @param {string} tasksCategory is the id of the category div
 * @returns Name of category as string
 */
function boardGetNameStatusCategory(tasksCategory) {
    switch (tasksCategory) {
        case 'board_task_category_todo':
            return 'To do'
            break;
        case 'board_task_category_progress':
            return 'In progress'
            break;
        case 'board_task_category_feedback':
            return 'Await feedback'
            break;
        case 'board_task_category_done':
            return 'Done'
            break;
        default:
            console.error('Wrong Category hand over in function board GetStatusCategory()')
            break;
    }
}

/**
 * store the index in variable boardCurrentDraggedTask if card will clicked an hold
 * @param {number} tasksIndex is a number of Index into the tasks array
 */
function boardStartDragging(tasksIndex) {
    boardCurrentDraggedTask = tasksIndex;
}

/**
 * 
 * @param {Event} ev 
 */
function allowDrop(ev) {
    ev.preventDefault();
}

/**
 * function change the status of the task to the droped category status (todo, progress, feedback or done) and call the render functions
 * @param {string} category 
 */
async function boardDrop(category) {
    tasks[boardCurrentDraggedTask]['status'] = category;
    await setItem('tasks', tasks);
    await boardReadTasks();
    boardRenderInit();
}

/**
 * set background-color to a div with called id
 * @param {string} id is a container id
 */
function boardAddBackgroundMoveTask(id) {
    document.getElementById(id).classList.add('board-drop-category-background');
}

/**
 * remove background-color to a div with called id
 * @param {string} id is a container id
 */
function boardRemoveBackgroundMoveTask(id) {
    document.getElementById(id).classList.remove('board-drop-category-background');
}

/**
 * Function set css classes to slide detail card out
 */
function boardCloseDetailCard() {
    let tasksDetailDiv = document.getElementById('board_task_detail_card');
    tasksDetailDiv.classList.remove('board-task-detail-card-in');
    tasksDetailDiv.classList.add('board-task-detail-card-out');
    setTimeout(boardCloseDetailCardHide, 900, tasksDetailDiv);
}

/**
 * Function set css classes to close detail card of selcted task
 */
function boardCloseDetailCardHide(tasksDetailDiv) {
    tasksDetailDiv.parentElement.classList.remove('d-flex');
    tasksDetailDiv.parentElement.classList.add('d-none');
}

/**
 * function remoce a tasks from tasks json and call functions to save changes in the backend and render new
 * @param {number} tasksIndex 
 */
async function boardDeleteTask(tasksIndex) {
    tasks.splice(tasksIndex, 1);
    await setItem('tasks', tasks);
    await boardReadTasks();
    boardRenderInit();
    boardCloseDetailCard();
}

/**
 * function read value from search input field
 */
function readInputSearch() {
    let boardSearchString = document.getElementById('board_input_search_field').value.toLowerCase();
    if (boardSearchString === " ") {
        console.log('Eingabe besteht aus Leerzeichen');
    }
    boardCleanTaksArraysSearch();
    fillSearchArray(boardTasksToDo, boardSearchString, boardTasksToDoSearch);
    fillSearchArray(boardTasksProgress, boardSearchString, boardTasksProgressSearch);
    fillSearchArray(boardTasksFeedback, boardSearchString, boardTasksFeedbackSearch);
    fillSearchArray(boardTasksDone, boardSearchString, boardTasksDoneSearch);
    boardRenderSearch();
}

/**
 * array fill the search arrays after reading input of search field
 * @param {*} arr array of status category
 * @param {*} boardSearchString value from search inputfield
 * @param {*} arrSearch array of result from search of status category
 */
function fillSearchArray(arr, boardSearchString, arrSearch) {
    for (let i = 0; i < arr.length; i++) {
        const taskID = arr[i];
        let taskIndex = boardIndexOfJSON(tasks, taskID);
        let task = tasks[taskIndex];
        let taskDescription = tasks[taskIndex]['description'].toLowerCase();
        let taskTitle = tasks[taskIndex]['title'].toLowerCase();

        if (taskDescription.indexOf(boardSearchString) != -1 || taskTitle.indexOf(boardSearchString) != -1) {
            arrSearch.push(task['id']);
        }
    }
}

/**
 * function open and close edit view of status change by clicked menu on preview card and call function to store changes
 * @param {number} tasksIndex index into tasks json
 */
function openCloseBoardMenuNav(tasksIndex) {
    boardHideElementsPrevieCard(tasksIndex);
    
    boardRenderDetail = false;
    let previewCard = document.getElementById(`board_task_${tasksIndex}`);
    let menuButton = document.getElementById(`board_task_nav_${tasksIndex}`);
    let menuNav = document.getElementById(`board_menu_nav_${tasksIndex}`);
    if (menuNav.style.display === "block") {
        menuNav.style.display = "none";
        boardShowElementsPrevieCard(tasksIndex)
        boardSetStatusPrevieCard(boardTaskStatusValue, tasksIndex);
    } else {
        boardStatusCheckedSvg(tasks[tasksIndex]['status'], tasksIndex);
        menuNav.style.display = "block";
        previewCard.style.pointerEvents = "none";
        menuButton.style.pointerEvents = "auto";
        menuNav.style.pointerEvents = "auto";
    }
}

/**
 * function hide elements on preview card
 * @param {number} tasksIndex index into tasks json
 */
function boardHideElementsPrevieCard(tasksIndex) {
    document.getElementById(`board_task_preview_title_${tasksIndex}`).style.display = "none";
    document.getElementById(`board_task_preview_description_${tasksIndex}`).style.display = "none";
    document.getElementById(`board_task_preview_subtasks_${tasksIndex}`).style.display = "none";
    document.getElementById(`board_task_preview_priority_${tasksIndex}`).style.display = "none";
}

/**
 * function show elements on preview card
 * @param {number} tasksIndex index into tasks json
 */
function boardShowElementsPrevieCard(tasksIndex) {
    document.getElementById(`board_menu_nav_${tasksIndex}`).style.display = "none";
    document.getElementById(`board_task_preview_title_${tasksIndex}`).style.display = "block";
    document.getElementById(`board_task_preview_description_${tasksIndex}`).style.display = "block";
    document.getElementById(`board_task_preview_subtasks_${tasksIndex}`).style.display = "flex";
    document.getElementById(`board_task_preview_priority_${tasksIndex}`).style.display = "flex";
    let previewCard = document.getElementById(`board_task_${tasksIndex}`);
    previewCard.style.pointerEvents = "auto";
}

/**
 * function render button cancel or ok if status is changed or not
 * @param {string} status status of selected status into menu to select status in mobile nav
 * @param {number} taskIndex index into tasks json
 */
function changeButtonPreviewCard(status, taskIndex) {
     if (tasks[taskIndex]['status'] == status) {
        document.getElementById(`board_button_cancel_${taskIndex}`).style.display = "block";
        document.getElementById(`board_button_ok_${taskIndex}`).style.display = "none";
     } else {
        document.getElementById(`board_button_cancel_${taskIndex}`).style.display = "none";
        document.getElementById(`board_button_ok_${taskIndex}`).style.display = "block";
     }
}

/**
* function change the status of the task to the droped category status (todo, progress, feedback or done) and call the render functions
* @param {string} category 
*/
async function boardSetStatusPrevieCard(status, tasksIndex) {
    tasks[tasksIndex]['status'] = status;
    await setItem('tasks', tasks);
    await boardReadTasks();
    boardRenderInit();
    boardRenderDetail = true;
}