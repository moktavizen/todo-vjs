import "./styles/reset.css";
import "./styles/style.css";

const addProjectDialog = document.querySelector("#add-project-dialog");
const addProjectBtn = document.querySelector("#add-project-btn");

addProjectBtn.addEventListener("click", () => {
  addProjectDialog.showModal();
});

const addTaskDialog = document.querySelector("#add-task-dialog");
const addTaskBtn = document.querySelector("#add-task-btn");

addTaskBtn.addEventListener("click", () => {
  addTaskDialog.showModal();
});

const readTaskDialog = document.querySelector("#read-task-dialog");
const readTaskBtn = document.querySelector("#todo-bar");

readTaskBtn.addEventListener("click", () => {
  readTaskDialog.showModal();
});
