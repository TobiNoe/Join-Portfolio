/**
 * function call boardRenderStatusPreview for all categorys of tasks
 */
function boardRenderInit() {
    boardRenderStatusPreview(boardTasksToDo, 'board_task_category_todo');
    boardRenderStatusPreview(boardTasksProgress, 'board_task_category_progress');
    boardRenderStatusPreview(boardTasksFeedback, 'board_task_category_feedback');
    boardRenderStatusPreview(boardTasksDone, 'board_task_category_done');
}

/**
 * function call boardRenderStatusPreview for all categorys of tasks with search arrays
 */
function boardRenderSearch() {
    boardRenderStatusPreview(boardTasksToDoSearch, 'board_task_category_todo');
    boardRenderStatusPreview(boardTasksProgressSearch, 'board_task_category_progress');
    boardRenderStatusPreview(boardTasksFeedbackSearch, 'board_task_category_feedback');
    boardRenderStatusPreview(boardTasksDoneSearch, 'board_task_category_done');
}

/**
 * function checked if boardTasksArray is empty an call the right render function for placeholder or cards preview
 * @param {Array} boardTasksArray 
 * @param {string} tasksCategory 
 */
function boardRenderStatusPreview(boardTasksArray, tasksCategory) {
    if (boardTasksArray.length == 0) {
        boardRenderTasksPlaceholder(tasksCategory);
    } else {
        boardRenderTasksPreview(boardTasksArray, tasksCategory);
    }
}

/**
 * function render all preview cards of tasks
 * @param {Array} boardTasksArray 
 * @param {string} tasksCategory 
 */
function boardRenderTasksPreview(boardTasksArray, tasksCategory) {
    let tasksCategoryDiv = document.getElementById(tasksCategory);
    tasksCategoryDiv.innerHTML = '';

    for (let i = 0; i < boardTasksArray.length; i++) {
        const id = boardTasksArray[i];
        let tasksIndex = boardIndexOfJSON(tasks, id);
        tasksCategoryDiv.innerHTML += boardRenderTasksPreviewHTML(tasksIndex);
        boardRenderStoryline(`board_task_storyline_${tasksIndex}`, tasksIndex);
        boardSubtasksAvailablePreview(tasksIndex);
        boardRenderInitials(`board_task_preview_initials_${tasksIndex}`, tasksIndex);
        boardRenderImgPrio(`board-task-card-priority_${tasksIndex}`, tasksIndex);
    }
}

/**
 * function update preview of card after updating values in task (subtask or edit)
 * @param {*} tasksIndex index of task into tasks json
 */
function boardUpdateTasksPreview(tasksIndex) {
    let tasksCardDiv = document.getElementById('board_task_' + tasksIndex);/* card */
    tasksCardDiv.innerHTML = '';

    tasksCardDiv.innerHTML += boardUpdateTasksPreviewHTML(tasksIndex);
    boardRenderStoryline(`board_task_storyline_${tasksIndex}`, tasksIndex);
    boardSubtasksAvailablePreview(tasksIndex);
    boardRenderInitials(`board_task_preview_initials_${tasksIndex}`, tasksIndex);
    boardRenderImgPrio(`board-task-card-priority_${tasksIndex}`, tasksIndex);
}

/**
 * Render categoryTask from tasks-json
 * @param {number} tasksIndex 
 */
function boardRenderStoryline(id, tasksIndex) {
    let storyline;
    let cssClass;

    if (tasks[tasksIndex]['categoryTask'] == 1) {
        storyline = 'Technical Task';
        cssClass = 'board-technicaltask-color'
    } else {
        storyline = 'User Story';
        cssClass = 'board-userstory-color'
    }

    document.getElementById(id).innerHTML = '';
    document.getElementById(id).innerHTML = storyline;
    document.getElementById(id).classList.add(cssClass);
}

/**
 * function render progressbar and text into preview card
 * @param {string} subtasksCount count of all subtasks
 * @param {string} doneSubtasksCount count of done subtasks
 * @param {number} subtasksProgress progress as number between 0 - 100
 * @param {number} tasksIndex of current task
 */
function boardRenderSubtasksPreview(subtasksCount, doneSubtasksCount, subtasksProgress, tasksIndex) {
    let subtasksDiv = document.getElementById(`board_task_preview_subtasks_${tasksIndex}`);
    subtasksDiv.classList.add('board-task-card-progress-container');
    subtasksDiv.classList.remove('d-none');
    subtasksDiv.innerHTML = boardRenderSubtasksPreviewHTML(subtasksCount, doneSubtasksCount, tasksIndex);
    boardRenderSubtasksProgressbarPreview(subtasksProgress, tasksIndex);
}

/**
 * function change style propertys of progressbar
 * @param {string} subtasksProgress number of progress as string
 * @param {number} tasksIndex of current task
 */
function boardRenderSubtasksProgressbarPreview(subtasksProgress, tasksIndex) {
    let progressDiv = document.getElementById(`board_task_preview_subtasks_progress_${tasksIndex}`)
    progressDiv.style.width = subtasksProgress + "%";
}

/**
 * Render dueDate in short date format
 * @param {number} tasksIndex 
 */
function boardRenderDueDate(tasksIndex) {
    let dueDateDiv = document.getElementById('board_task_detail_duedate');

    let dueDate = tasks[tasksIndex]['dueDate'];
    let d = new Date(dueDate);
    let day = d.getDate();
    let month = d.getMonth() + 1;
    let year = d.getFullYear();
    if (day < 10) {
        day = "0" + day;
    }
    if (month < 10) {
        month = "0" + month;
    }
    dueDate = day + "." + month + "." + year;
    dueDateDiv.innerHTML = `${dueDate}`;
}

/**
 * function render prio image
 * @param {string} id 
 * @param {number} tasksIndex of current task
 */
function boardRenderImgPrio(id, tasksIndex) {
    let imgName = tasks[tasksIndex]['prio'];
    document.getElementById(id).src = `./img/board/board_task_${imgName}.svg`;
}

/**
 * function render prio text
 * @param {string} id 
 * @param {number} tasksIndex of current task
 */
function boardRenderPrioText(id, tasksIndex) {
    let prioText = tasks[tasksIndex]['prio'];
    prioText = prioText[0].toUpperCase() + prioText.slice(1);
    document.getElementById(id).innerHTML = `${prioText}`;
}

/**
 * Render assignedTo from tasks-json
 * @param {number} tasksIndex Index of task into tasks-json
 */
function boardRenderAssignedTo(tasksIndex) {
    let assignedToDiv = document.getElementById('board_task_detail_assignedto');
    /* assignedToDiv.innerHTML = /*html`
        <p class="board-task-card-detail-assignedto mb-8">Assigned To:</p>
    `; */

    for (let i = 0; i < tasks[tasksIndex]['assignedTo'].length; i++) {
        const id = tasks[tasksIndex]['assignedTo'][i];
        let contactsIndex = boardIndexOfJSON(contacts, id);
        let name = contacts[contactsIndex]['name'];
        let color = contacts[contactsIndex]['color'];
        let initials = contacts[contactsIndex]['initials'];

        assignedToDiv.innerHTML += boardRenderAssignedToHTML(name, initials, color);
    }
}

/**
 * Render initials from tasks-json
 * @param {number} tasksIndex Index of task into tasks-json
 */
function boardRenderInitials(id, tasksIndex) {
    let initialsDiv = document.getElementById(id);
    initialsDiv.innerHTML = '';

    for (let i = 0; i < tasks[tasksIndex]['assignedTo'].length && i < 7; i++) {

        if (i < 6) {
            const id = tasks[tasksIndex]['assignedTo'][i];
            let contactsIndex = boardIndexOfJSON(contacts, id);
            let color = contacts[contactsIndex]['color'];
            let initials = contacts[contactsIndex]['initials'];

            initialsDiv.innerHTML += boardRenderInitialsHTML(initials, color);
        } else {
            let color = '#2A3647';
            let count = tasks[tasksIndex]['assignedTo'].length - 6;
            let initials = '+' + count.toString();

            initialsDiv.innerHTML += boardRenderInitialsHTML(initials, color);
        }
    }
}

/**
 * function check if subtasks ar created
 * @param {number} tasksIndex of current task
 * @returns status if subtasks ar created
 */
function boardSubtasksAvailable(tasksIndex) {
    if (tasks[tasksIndex]['subtask'].length != 0) {
        return true;
    } else {
        return false;
    }
}

/**
 * count occurrences values in arrays
 * @param {Array} arr 
 * @param {string} value 
 * @returns count of occurrences values
 */
function countOccurrences(arr, value) {
    return arr.filter(item => item === value).length;
}

/**
 * function call render function for subtasks in preview card
 * @param {number} tasksIndex of current task
 */
function boardSubtasksAvailablePreview(tasksIndex) {
    tasksAvailable = boardSubtasksAvailable(tasksIndex);
    if (tasksAvailable == true) {
        let subtasksCount = tasks[tasksIndex]['subtask'].length;
        let doneSubtasksCount = countOccurrences(tasks[tasksIndex]['status_subtask'], 'done');
        let subtasksProgress = doneSubtasksCount / subtasksCount * 100
        boardRenderSubtasksPreview(subtasksCount, doneSubtasksCount, subtasksProgress, tasksIndex);
    } else {
        let subtasksDiv = document.getElementById(`board_task_preview_subtasks_${tasksIndex}`)
        subtasksDiv.classList.remove('board-task-card-progress-container');
        subtasksDiv.classList.add('d-none');
    }
}

/**
 * function call render function for subtasks in detail card
 * @param {number} tasksIndex of current task
 */
function boardSubtasksAvailableDetail(tasksIndex) {
    tasksAvailable = boardSubtasksAvailable(tasksIndex);
    if (tasksAvailable == true) {
        let subtasks = tasks[tasksIndex]['subtask'];
        let subtasksStatus = tasks[tasksIndex]['status_subtask'];
        boardRenderSubtasksDetail(subtasks, subtasksStatus, tasksIndex);
    } else {
        boardNoSubtasksRemoveMargin('board_task_detail_subtasks');
    }
}

/**
 * function remove class mb-24 if no subtask is created
 * @param {string} id 
 */
function boardNoSubtasksRemoveMargin(id) {
    let subtasksDiv = document.getElementById(id);
    subtasksDiv.classList.remove('mb-24');
}

/**
 * function change status of clicked subtask
 * @param {string} id 
 * @param {number} tasksIndex of current task
 * @param {number} subtasksIndex of current subtask
 */
async function boardSubtaskChangeStatus(id, tasksIndex, subtasksIndex) {
    let subtaskStatus = tasks[tasksIndex]['status_subtask'];
    if (subtaskStatus[subtasksIndex] == 'do') {
        subtaskStatus[subtasksIndex] = 'done';
    } else {
        subtaskStatus[subtasksIndex] = 'do';
    }

    await setItem('tasks', tasks);
    boardRenderSubtaskChangeStatus(id, subtaskStatus[subtasksIndex]);
    boardSubtasksAvailablePreview(tasksIndex);
}

/**
 * function render right svg tag after changed status of subtask
 * @param {string} id 
 * @param {string} status of subtask
 */
function boardRenderSubtaskChangeStatus(id, status) {
    let svgDiv = document.getElementById(id);

    if (status == 'do') {
        svgDiv.innerHTML = /* html */`
        <rect x="4" y="4" width="16" height="16" rx="3" stroke="#2A3647" stroke-width="2"/>
        `;
    } else {
        svgDiv.innerHTML = /* html */`
        <path d="M20 11V17C20 18.6569 18.6569 20 17 20H7C5.34315 20 4 18.6569 4 17V7C4 5.34315 5.34315 4 7 4H15" stroke="#2A3647" stroke-width="2" stroke-linecap="round"/>
        <path d="M8 12L12 16L20 4.5" stroke="#2A3647" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        `;
    }
}

/**
 * function read status of subtasks and call the right render function for status 'done' or 'do'
 * @param {Array} subtasks text description of subtasks
 * @param {Array} subtasksStatus status of subtusks
 * @param {number} tasksIndex 
 */
function boardRenderSubtasksDetail(subtasks, subtasksStatus, tasksIndex) {
    let subtasksDiv = document.getElementById('board_task_detail_subtasks')
    subtasksDiv.classList.add('mb-24');
    subtasksDiv.innerHTML += /* html */`
    <p class="board-task-card-detail-subtasks mb-8">Subtasks</p>
    `;

    for (let i = 0; i < subtasks.length; i++) {
        const subtask = subtasks[i];
        const subtaskStatus = subtasksStatus[i];

        if (subtaskStatus == 'do') {
            subtasksDiv.innerHTML += boardRenderSubtasksDetailUncheckedSvgHTML(subtask, tasksIndex, i);
        } else {
            subtasksDiv.innerHTML += boardRenderSubtasksDetailCheckedSvgHTML(subtask, tasksIndex, i);
        }
    }
}

/**
 * function render placeholder if no tasks exist into category
 * @param {string} tasksCategory 
 */
function boardRenderTasksPlaceholder(tasksCategory) {
    let tasksCategoryDiv = document.getElementById(tasksCategory); /*'board_task_category_todo'*/
    tasksCategoryDiv.innerHTML = '';
    let tasksCategoryStatus = boardGetNameStatusCategory(tasksCategory);
    tasksCategoryDiv.innerHTML = boardRenderTasksPlaceholderHTML(tasksCategoryStatus);
}

/**
 * function render detail card of clicked task and call subfunctions for render details into card (Storyline, DueDate, ImgPrio, AssignedTo, AvailableDetail and PrioText)
 * @param {number} tasksIndex 
 */
function boardRenderDetailCard(tasksIndex) {
    if (boardRenderDetail) {
        let tasksCategoryDiv = document.getElementById('board_task_detail_card');
        tasksCategoryDiv.classList.remove('board-task-detail-card-out');
        tasksCategoryDiv.classList.add('board-task-detail-card-in');
        tasksCategoryDiv.parentElement.classList.remove('d-none');
        tasksCategoryDiv.parentElement.classList.add('d-flex');
        tasksCategoryDiv.innerHTML = '';
        tasksCategoryDiv.innerHTML = boardRenderDetailCardHTML(tasksIndex);
    
        boardRenderStoryline(`board_task_storyline_detail`, tasksIndex);
        boardRenderDueDate(tasksIndex);
        boardRenderImgPrio('board-task-card-priority-img', tasksIndex);
        boardRenderAssignedTo(tasksIndex);
        boardSubtasksAvailableDetail(tasksIndex);
        boardRenderPrioText('board-task-card-priority-text', tasksIndex);   
    } else {
        return;
    }
}

/**
 * render checked svg on selected status
 * @param {string} status value of selected status
 * @param {number} taskIndex index into tasks json
 */
function boardStatusCheckedSvg(status, taskIndex) {
    boardTaskStatusValue = status;
    document.getElementById(`board_status_todo_${taskIndex}`).innerHTML = boardRenderStatusUncheckedSvgHTML();
    document.getElementById(`board_status_progress_${taskIndex}`).innerHTML = boardRenderStatusUncheckedSvgHTML();
    document.getElementById(`board_status_feedback_${taskIndex}`).innerHTML = boardRenderStatusUncheckedSvgHTML();
    document.getElementById(`board_status_done_${taskIndex}`).innerHTML = boardRenderStatusUncheckedSvgHTML();
    document.getElementById(`board_status_${status}_${taskIndex}`).innerHTML = boardRenderStatusCheckedSvgHTML();
    changeButtonPreviewCard(status, taskIndex);
}