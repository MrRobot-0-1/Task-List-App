const taskListNode = document.querySelector("#tasks")
const completedTaskListNode = document.querySelector("#completed-tasks")
const newTaskAlertNode = document.querySelector(".new-task-bg")

const newTaskBtnNode = document.querySelector("#new-task-btn")
const addTaskBtnNode = document.querySelector("#add-task-btn")

const inputNameNode = document.querySelector("#new-task-name")
const inputDateNode = document.querySelector("#new-task-date")

let tasksArr = [];
let completedTasksArr = [];

// Дописать onclick!
function getTask(card, isCompleted) {
    return `
    <div class="task-card">
        <input type="checkbox" id="task${card.id}" onclick="${isCompleted ? `uncompleteTask(${card.id})` : `completeTask(${card.id})`}" ${isCompleted ? "checked" : ""}>
        <label for="task${card.id}" class="task-content">
            <span class="task-title">${card.name}</span>
            <span class="task-time">До ${card.date}</span>
        </label>
    </div>
    `
}

function renderTasks() {
    result = "";

    for (task of tasksArr) {
        result += getTask(task, false)
    }

    taskListNode.innerHTML = result;
}

function renderCompletedTasks() {
    result = "";

    for (task of completedTasksArr) {
        result += getTask(task, true)
    }

    completedTaskListNode.innerHTML = result;
}

function completeTask(id) {
    const currentTask = tasksArr.find(el => el.id == id)

    tasksArr = tasksArr.filter(el => el.id != id)
    completedTasksArr.push(currentTask)

    renderTasks()
    renderCompletedTasks()
}

function uncompleteTask(id) {
    const currentTask = completedTasksArr.find(el => el.id == id)

    completedTasksArr = completedTasksArr.filter(el => el.id != id)
    tasksArr.push(currentTask)

    renderTasks()
    renderCompletedTasks()
}

newTaskBtnNode.addEventListener("click", () => {
    newTaskAlertNode.classList.remove("hidden")
})

addTaskBtnNode.addEventListener("click", () => {
    if (inputNameNode.value.trim() === "") {
        inputNameNode.style.borderColor = 'red';

        return;
    }

    inputNameNode.style.borderColor = '';

    tasksArr.push({
        id: Date.now(),
        name: inputNameNode.value,
        date: inputDateNode.value,
    })

    renderTasks()
    newTaskAlertNode.classList.add("hidden")

    inputNameNode.value = "";
    inputDateNode.value = "";
})