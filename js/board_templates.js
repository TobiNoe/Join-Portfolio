/**
 * function return html code to render placeholder
 * @param {string} tasksCategoryStatus name of category
 * @returns html code to render placeholder
 */
function boardRenderTasksPlaceholderHTML(tasksCategoryStatus) {
    return /* html */`
    <div class="board-no-task-feedback">
        <span class="board-no-task-feedback-text">No tasks ${tasksCategoryStatus}</span>
    </div>
    `;
}

/**
 * function return html code to render preview card of tasks
 * @param {number} tasksIndex index of dataset into tasks array
 * @returns html code to render preview card
 */
function boardRenderTasksPreviewHTML(tasksIndex) {
    return /* html */`
    <div id="board_task_${tasksIndex}" id="board_card_${tasksIndex}" draggable="true" ondragstart="boardStartDragging(${tasksIndex})" onclick="boardRenderDetailCard(${tasksIndex})" class="board-task-card-preview"><!-- id="board_card_$" -->
        <div class="d-flex jc-between">
            <span id="board_task_storyline_${tasksIndex}" class="board-task-card-taskcategory"></span>
            <a id="board_task_nav_${tasksIndex}" href="javascript:void(0);" onclick="openCloseBoardMenuNav(${tasksIndex})">
                <svg class="board-menu" xmlns="./img/board/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M240-400q-33 0-56.5-23.5T160-480q0-33 23.5-56.5T240-560q33 0 56.5 23.5T320-480q0 33-23.5 56.5T240-400Zm240 0q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm240 0q-33 0-56.5-23.5T640-480q0-33 23.5-56.5T720-560q33 0 56.5 23.5T800-480q0 33-23.5 56.5T720-400Z"/></svg>
            </a>
        </div>
        <!-- Top Navigation Menu -->
        <div class="board-menu-nav"  id="board_menu_nav_${tasksIndex}">
            <div class="board-menu-nav-title">
                <span class="board-task-card-headline">Change Status:</span>
            </div>
            <div class="d-flex jc-between">
                <span>todo</span>
                <svg class="board-menu-nav-status" id="board_status_todo_${tasksIndex}" onclick="boardStatusCheckedSvg('todo', ${tasksIndex})" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="./img/board/svg">
                <rect x="4" y="4" width="16" height="16" rx="3" stroke="#2A3647" stroke-width="2"/>
                </svg>
            </div>
            <div class="d-flex jc-between">
                <span>in progress</span>
                <svg class="board-menu-nav-status" id="board_status_progress_${tasksIndex}" onclick="boardStatusCheckedSvg('progress', ${tasksIndex})" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="./img/board/svg">
                <rect x="4" y="4" width="16" height="16" rx="3" stroke="#2A3647" stroke-width="2"/>
                </svg>
            </div>
            <div class="d-flex jc-between">
                <span>await feedback</span>
                <svg class="board-menu-nav-status" id="board_status_feedback_${tasksIndex}" onclick="boardStatusCheckedSvg('feedback', ${tasksIndex})" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="./img/board/svg">
                <rect x="4" y="4" width="16" height="16" rx="3" stroke="#2A3647" stroke-width="2"/>
                </svg>
            </div>
            <div class="d-flex jc-between">
                <span>done</span>
                <svg class="board-menu-nav-status" id="board_status_done_${tasksIndex}" onclick="boardStatusCheckedSvg('done', ${tasksIndex})" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="./img/board/svg">
                <rect x="4" y="4" width="16" height="16" rx="3" stroke="#2A3647" stroke-width="2"/>
                </svg>
            </div> 
            <div class="d-flex jc-end board-menu-nav-button">
                <button id="board_button_cancel_${tasksIndex}" onclick="openCloseBoardMenuNav(${tasksIndex})">Close</button>
                <button id="board_button_ok_${tasksIndex}" onclick="openCloseBoardMenuNav(${tasksIndex})">OK</button>
            </div>
        </div>
        <span id="board_task_preview_title_${tasksIndex}" class="board-task-card-headline">${tasks[tasksIndex]['title']}</span>
        <span id="board_task_preview_description_${tasksIndex}" class="board-task-card-description board-line-clamp">${tasks[tasksIndex]['description']}</span>

        <div id="board_task_preview_subtasks_${tasksIndex}" class="board-task-card-progress-container">
        </div>

        <div id="board_task_preview_priority_${tasksIndex}" class="board-task-card-profile-priority">
            <div id="board_task_preview_initials_${tasksIndex}" class="board-task-card-profile-container">
            </div>
            <img id="board-task-card-priority_${tasksIndex}" class="board-task-card-priority" src="" alt="">
        </div>
    </div>
    `;
}

/**
 * function return html code to update preview card of tasks
 * @param {number} tasksIndex index of dataset into tasks array
 * @returns html code to render preview card
 */
function boardUpdateTasksPreviewHTML(tasksIndex) {
    return /* html */`
        <div class="d-flex jc-between">
            <span id="board_task_storyline_${tasksIndex}" class="board-task-card-taskcategory"></span>
            <a id="board_task_nav_${tasksIndex}" href="javascript:void(0);" onclick="openCloseBoardMenuNav(${tasksIndex})">
                <svg class="board-menu" xmlns="./img/board/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M240-400q-33 0-56.5-23.5T160-480q0-33 23.5-56.5T240-560q33 0 56.5 23.5T320-480q0 33-23.5 56.5T240-400Zm240 0q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm240 0q-33 0-56.5-23.5T640-480q0-33 23.5-56.5T720-560q33 0 56.5 23.5T800-480q0 33-23.5 56.5T720-400Z"/></svg>
            </a>
        </div>
        <!-- Top Navigation Menu -->
        <div class="board-menu-nav"  id="board_menu_nav_${tasksIndex}">
            <div class="board-menu-nav-title">
                <span class="board-task-card-headline">Change Status:</span>
            </div>
            <div class="d-flex jc-between">
                <span>todo</span>
                <svg class="board-menu-nav-status" id="board_status_todo_${tasksIndex}" onclick="boardStatusCheckedSvg('todo', ${tasksIndex})" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="./img/board/svg">
                <rect x="4" y="4" width="16" height="16" rx="3" stroke="#2A3647" stroke-width="2"/>
                </svg>
            </div>
            <div class="d-flex jc-between">
                <span>in progress</span>
                <svg class="board-menu-nav-status" id="board_status_progress_${tasksIndex}" onclick="boardStatusCheckedSvg('progress', ${tasksIndex})" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="./img/board/svg">
                <rect x="4" y="4" width="16" height="16" rx="3" stroke="#2A3647" stroke-width="2"/>
                </svg>
            </div>
            <div class="d-flex jc-between">
                <span>await feedback</span>
                <svg class="board-menu-nav-status" id="board_status_feedback_${tasksIndex}" onclick="boardStatusCheckedSvg('feedback', ${tasksIndex})" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="./img/board/svg">
                <rect x="4" y="4" width="16" height="16" rx="3" stroke="#2A3647" stroke-width="2"/>
                </svg>
            </div>
            <div class="d-flex jc-between">
                <span>done</span>
                <svg class="board-menu-nav-status" id="board_status_done_${tasksIndex}" onclick="boardStatusCheckedSvg('done', ${tasksIndex})" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="./img/board/svg">
                <rect x="4" y="4" width="16" height="16" rx="3" stroke="#2A3647" stroke-width="2"/>
                </svg>
            </div> 
            <div class="d-flex jc-end board-menu-nav-button">
                <button id="board_button_cancel_${tasksIndex}" onclick="openCloseBoardMenuNav(${tasksIndex})">Close</button>
                <button id="board_button_ok_${tasksIndex}" onclick="openCloseBoardMenuNav(${tasksIndex})">OK</button>
            </div>
        </div>
        <span id="board_task_preview_title_${tasksIndex}" class="board-task-card-headline">${tasks[tasksIndex]['title']}</span>
        <span id="board_task_preview_description_${tasksIndex}" class="board-task-card-description board-line-clamp">${tasks[tasksIndex]['description']}</span> 
        <div id="board_task_preview_subtasks_${tasksIndex}" class="board-task-card-progress-container">
        </div>  
        <div id="board_task_preview_priority_${tasksIndex}" class="board-task-card-profile-priority">
            <div id="board_task_preview_initials_${tasksIndex}" class="board-task-card-profile-container">
            </div>
            <img id="board-task-card-priority_${tasksIndex}" class="board-task-card-priority" src="" alt="">
        </div>
    `;
}

/**
 * function return html code to render initials into detail card
 * @param {string} name 
 * @param {string} initials 
 * @param {string} color 
 * @returns 
 */
function boardRenderAssignedToHTML(name, initials, color) {
    return /* html */`
    <div class="board-task-card-detail-profile d-flex ai-center">
        <div class="board-task-card-detail-initals">
            <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="./img/board/board_ellipse_initials.svg">
                <circle cx="21" cy="21" r="20" fill="${color}" stroke="white" stroke-width="2"/>
            </svg>
            <span class="board-task-card-detail-profile-text">${initials}</span>
        </div>
        <p>${name}</p>  
    </div>
    `;
}

/**
 * function return html code to render initials into preview card
 * @param {string} initials 
 * @param {string} color 
 * @returns 
 */
function boardRenderInitialsHTML(initials, color) {
    return /* html */`
    <div class="board-task-card-profile">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="./img/board/board_ellipse_initials.svg">
            <circle id="Ellipse 5" cx="16" cy="16" r="15.5" fill="${color}" stroke="white"/>
        </svg>
        <span class="board-task-card-profile-text">${initials}</span>
    </div>
    `;
}

/**
 * function return html code to render task detail card
 * @param {number} tasksIndex of current task
 * @returns 
 */
function boardRenderDetailCardHTML(tasksIndex) {
    return  /* html */`
        <div class="board-task-card-detail-storyline d-flex jc-between ai-center">
            <span id="board_task_storyline_detail" class="board-task-card-detail-taskcategory"></span>
            <div class="board-task-card-detail-close d-flex jc-center ai-center" onclick="boardCloseDetailCard()">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="./img/board/board_detail_clos.svg">
                <path d="M6.99999 8.40005L2.09999 13.3C1.91665 13.4834 1.68332 13.575 1.39999 13.575C1.11665 13.575 0.883321 13.4834 0.699988 13.3C0.516654 13.1167 0.424988 12.8834 0.424988 12.6C0.424988 12.3167 0.516654 12.0834 0.699988 11.9L5.59999 7.00005L0.699988 2.10005C0.516654 1.91672 0.424988 1.68338 0.424988 1.40005C0.424988 1.11672 0.516654 0.883382 0.699988 0.700049C0.883321 0.516715 1.11665 0.425049 1.39999 0.425049C1.68332 0.425049 1.91665 0.516715 2.09999 0.700049L6.99999 5.60005L11.9 0.700049C12.0833 0.516715 12.3167 0.425049 12.6 0.425049C12.8833 0.425049 13.1167 0.516715 13.3 0.700049C13.4833 0.883382 13.575 1.11672 13.575 1.40005C13.575 1.68338 13.4833 1.91672 13.3 2.10005L8.39999 7.00005L13.3 11.9C13.4833 12.0834 13.575 12.3167 13.575 12.6C13.575 12.8834 13.4833 13.1167 13.3 13.3C13.1167 13.4834 12.8833 13.575 12.6 13.575C12.3167 13.575 12.0833 13.4834 11.9 13.3L6.99999 8.40005Z" fill="#2A3647"/>
            </svg>
            </div>
        </div>
        <div class="board-task-detail-content"><!--  -->
            <h1 class="board-task-card-detail-headline">${tasks[tasksIndex]['title']}</h1>
            <p class="board-task-card-detail-description">${tasks[tasksIndex]['description']}</p>
            <div class="d-flex ai-center mb-24"><p class="board-task-card-detail-duedate">Due date:</p><p id="board_task_detail_duedate"></p></div>
            <div class="d-flex ai-center mb-24">
                <p class="board-task-card-detail-priority">Priority:</p>
                <p id="board-task-card-priority-text">Priority-Funktion schreiben</p>
                <img id="board-task-card-priority-img" src="" alt="Prio Image">
            </div>
            <div>
                <p class="board-task-card-detail-assignedto mb-8">Assigned To:</p>
                <div id="board_task_detail_assignedto" class="board-task-card-detail-assignedto-container d-flex flex-d-col mb-24"></div>
            </div>
            <div id="board_task_detail_subtasks" class="d-flex flex-d-col mb-24"></div>
        </div><!--  -->
        <div class="d-flex jc-end">
            <div class="board-task-card-detail-delete d-flex ai-center" onclick="boardDeleteTask(${tasksIndex})">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="./img/board/board_tasks_delete.svg">
                    <mask id="mask0_133737_4270" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                    <rect width="24" height="24" fill="#D9D9D9"/>
                    </mask>
                    <g mask="url(#mask0_133737_4270)">
                    <path d="M7 21C6.45 21 5.97917 20.8042 5.5875 20.4125C5.19583 20.0208 5 19.55 5 19V6C4.71667 6 4.47917 5.90417 4.2875 5.7125C4.09583 5.52083 4 5.28333 4 5C4 4.71667 4.09583 4.47917 4.2875 4.2875C4.47917 4.09583 4.71667 4 5 4H9C9 3.71667 9.09583 3.47917 9.2875 3.2875C9.47917 3.09583 9.71667 3 10 3H14C14.2833 3 14.5208 3.09583 14.7125 3.2875C14.9042 3.47917 15 3.71667 15 4H19C19.2833 4 19.5208 4.09583 19.7125 4.2875C19.9042 4.47917 20 4.71667 20 5C20 5.28333 19.9042 5.52083 19.7125 5.7125C19.5208 5.90417 19.2833 6 19 6V19C19 19.55 18.8042 20.0208 18.4125 20.4125C18.0208 20.8042 17.55 21 17 21H7ZM7 6V19H17V6H7ZM9 16C9 16.2833 9.09583 16.5208 9.2875 16.7125C9.47917 16.9042 9.71667 17 10 17C10.2833 17 10.5208 16.9042 10.7125 16.7125C10.9042 16.5208 11 16.2833 11 16V9C11 8.71667 10.9042 8.47917 10.7125 8.2875C10.5208 8.09583 10.2833 8 10 8C9.71667 8 9.47917 8.09583 9.2875 8.2875C9.09583 8.47917 9 8.71667 9 9V16ZM13 16C13 16.2833 13.0958 16.5208 13.2875 16.7125C13.4792 16.9042 13.7167 17 14 17C14.2833 17 14.5208 16.9042 14.7125 16.7125C14.9042 16.5208 15 16.2833 15 16V9C15 8.71667 14.9042 8.47917 14.7125 8.2875C14.5208 8.09583 14.2833 8 14 8C13.7167 8 13.4792 8.09583 13.2875 8.2875C13.0958 8.47917 13 8.71667 13 9V16Z" fill="#2A3647"/>
                    </g>
                </svg>
                <p class="board-task-card-detail-edit-text">delete</p>
            </div>
            <svg width="2" height="24" viewBox="0 0 2 24" fill="none" xmlns="./img/board/board_tasks_vector.svg">
                <path d="M1 0V24" stroke="#D1D1D1"/>
            </svg>
            <div class="board-task-card-detail-edit d-flex ai-center" onclick="boardShowEditTask(${tasksIndex})">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="./img/board/board_tasks_edit.svg">
                    <mask id="mask0_133737_4276" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                    <rect width="24" height="24" fill="#D9D9D9"/>
                    </mask>
                    <g mask="url(#mask0_133737_4276)">
                    <path d="M5 19H6.4L15.025 10.375L13.625 8.975L5 17.6V19ZM19.3 8.925L15.05 4.725L16.45 3.325C16.8333 2.94167 17.3042 2.75 17.8625 2.75C18.4208 2.75 18.8917 2.94167 19.275 3.325L20.675 4.725C21.0583 5.10833 21.2583 5.57083 21.275 6.1125C21.2917 6.65417 21.1083 7.11667 20.725 7.5L19.3 8.925ZM17.85 10.4L7.25 21H3V16.75L13.6 6.15L17.85 10.4Z" fill="#2A3647"/>
                    </g>
                </svg>
                <p class="board-task-card-detail-edit-text">edit</p>
            </div> 
        </div>
    `;
}

/**
 * function return html code to render unchecked svg tag for subtasks
 * @param {string} subtask tesxt description of current subtask
 * @param {number} tasksIndex of current task
 * @param {*} i index of current subtask
 * @returns 
 */
function boardRenderSubtasksDetailUncheckedSvgHTML(subtask, tasksIndex, i) {
    return /* html */`
        <div class="board-task-card-detail-tasks d-flex ai-center">
            <svg id="subtask_${i}" onclick="boardSubtaskChangeStatus('subtask_${i}', ${tasksIndex}, ${i})" class="board_task_detail_subtasks_checked" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="./img/board/svg">
                <rect x="4" y="4" width="16" height="16" rx="3" stroke="#2A3647" stroke-width="2"/>
            </svg>
            <p class="board-task-card-detail-tasks-text">${subtask}</p>  
        </div>
    `;
}

/**
 * function return html code to render checked svg tag for subtasks
 * @param {string} subtask tesxt description of current subtask
 * @param {number} tasksIndex of current task
 * @param {*} i index of current subtask
 * @returns 
 */
function boardRenderSubtasksDetailCheckedSvgHTML(subtask, tasksIndex, i) {
    return /* html */`
        <div class="board-task-card-detail-tasks d-flex ai-center">
            <svg id="subtask_${i}" onclick="boardSubtaskChangeStatus('subtask_${i}', ${tasksIndex}, ${i})" class="board_task_detail_subtasks_checked" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="./img/board/svg">
                <path d="M20 11V17C20 18.6569 18.6569 20 17 20H7C5.34315 20 4 18.6569 4 17V7C4 5.34315 5.34315 4 7 4H15" stroke="#2A3647" stroke-width="2" stroke-linecap="round"/>
                <path d="M8 12L12 16L20 4.5" stroke="#2A3647" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <p class="board-task-card-detail-tasks-text">${subtask}</p>  
        </div>
    `;
}

/**
 * function return html to render subtasks view into preview card
 * @param {number} subtasksCount count of subtasks
 * @param {number} doneSubtasksCount count of done subtasks
 * @param {number} tasksIndex index into tasks json
 * @returns 
 */
function boardRenderSubtasksPreviewHTML(subtasksCount, doneSubtasksCount, tasksIndex) {
    return /* html */`
        <div class="board-task-card-progressbar">
            <div id="board_task_preview_subtasks_progress_${tasksIndex}" class="board-task-card-progress"></div>
        </div>
        <span class="board-task-card-progress-text">${doneSubtasksCount}/${subtasksCount} Subtasks</span>
    `;
}

/**
 * function return html code to render checked svg tag for status
 * @returns 
 */
function boardRenderStatusCheckedSvgHTML() {
    return /* html */`
        <path d="M20 11V17C20 18.6569 18.6569 20 17 20H7C5.34315 20 4 18.6569 4 17V7C4 5.34315 5.34315 4 7 4H15" stroke="#2A3647" stroke-width="2" stroke-linecap="round"/>
        <path d="M8 12L12 16L20 4.5" stroke="#2A3647" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    `;
}

/**
 * function return html code to render unchecked svg tag for status
 * @returns 
 */
function boardRenderStatusUncheckedSvgHTML() {
    return /* html */`
        <rect x="4" y="4" width="16" height="16" rx="3" stroke="#2A3647" stroke-width="2"/>
    `;
}