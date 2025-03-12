const taskInput = document.getElementById("task-input");
const addTaskButton = document.getElementById("add-task");
const pendingTasks = document.getElementById("pending-tasks");
const completedTasks = document.getElementById("completed-tasks");

function getFormattedDateTime() {
    return new Date().toLocaleString();
}

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    const taskItem = document.createElement("li");
    taskItem.innerHTML = `
        <div class="task-content">
            <span class="task-text">${taskText}</span>
            <input type="text" class="edit-input" value="${taskText}" style="display: none;">
            <div class="button-group">
                <button class="edit-btn">✎</button>
                <button class="save-btn" style="display: none;">💾</button>
                <button class="complete-btn">✔</button>
                <button class="delete-btn">✖</button>
            </div>
        </div>
        <small class="task-time">Created: ${getFormattedDateTime()}</small>
    `;

    taskItem.querySelector(".edit-btn").addEventListener("click", () => enableEditing(taskItem));
    taskItem.querySelector(".save-btn").addEventListener("click", () => saveEdit(taskItem));
    taskItem.querySelector(".complete-btn").addEventListener("click", () => completeTask(taskItem));
    taskItem.querySelector(".delete-btn").addEventListener("click", () => deleteTask(taskItem));

    pendingTasks.appendChild(taskItem);
    taskInput.value = "";
}

function completeTask(taskItem) {
    taskItem.querySelector(".complete-btn").remove();
    const timeElement = document.createElement("small");
    timeElement.classList.add("task-time");
    timeElement.innerText = `Completed: ${getFormattedDateTime()}`;
    taskItem.appendChild(timeElement);
    completedTasks.appendChild(taskItem);
}

function enableEditing(taskItem) {
    const taskText = taskItem.querySelector(".task-text");
    const inputField = taskItem.querySelector(".edit-input");
    const editBtn = taskItem.querySelector(".edit-btn");
    const saveBtn = taskItem.querySelector(".save-btn");

    taskText.style.display = "none";
    inputField.style.display = "block";
    inputField.focus();

    editBtn.style.display = "none";
    saveBtn.style.display = "inline-block";

    disableOtherTasks(taskItem, true);
    inputField.addEventListener("blur", () => saveEdit(taskItem));
}

function saveEdit(taskItem) {
    const taskText = taskItem.querySelector(".task-text");
    const inputField = taskItem.querySelector(".edit-input");
    const editBtn = taskItem.querySelector(".edit-btn");
    const saveBtn = taskItem.querySelector(".save-btn");

    if (inputField.value.trim() === "") {
        alert("Task cannot be empty!");
        inputField.focus();
        return;
    }

    taskText.innerText = inputField.value.trim();
    taskText.style.display = "block";
    inputField.style.display = "none";

    editBtn.style.display = "inline-block";
    saveBtn.style.display = "none";

    disableOtherTasks(taskItem, false);
}

function disableOtherTasks(activeTask, disable) {
    document.querySelectorAll("li").forEach((task) => {
        if (task !== activeTask) {
            task.style.pointerEvents = disable ? "none" : "auto";
            task.style.opacity = disable ? "0.5" : "1";
        }
    });
}

function deleteTask(taskItem) {
    taskItem.remove();
}

addTaskButton.addEventListener("click", addTask);
