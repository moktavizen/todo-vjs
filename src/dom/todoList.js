import { ELS, STATE } from "../globals.js";
import { deleteTodo, getTodo, getTodoIndex, getTodoList } from "../logic/todo.js";
import { updateReadTodoModal } from "./readTodoModal.js";
import { todoBar } from "./todoBar.js";

function clearTodoList() {
  ELS.content.replaceChildren();
}

function renderEmptyTodoList() {
  const emptyTodoListDiv = document.createElement("div");
  emptyTodoListDiv.classList = "empty-todo-list";
  emptyTodoListDiv.innerHTML =
    "There are no tasks ☹️<br />Add new task using button at the top right corner!";

  const contentNavHeight = ELS.contentNav.offsetHeight;
  const bottomPadding = 32;
  emptyTodoListDiv.style.height = `${window.innerHeight - contentNavHeight - bottomPadding}px`;

  ELS.content.appendChild(emptyTodoListDiv);
}

function renderTodoList(todoList) {
  if (!todoList.length) {
    renderEmptyTodoList();
  }

  for (const todo of todoList) {
    todoBar(todo);
  }
}

function updateTodoList(startDate, endDate, projectTitle) {
  const todoList = getTodoList(startDate, endDate, projectTitle);

  clearTodoList();
  renderTodoList(todoList);
}

function addTodoListListeners() {
  ELS.content.addEventListener("todo-list-change", () => {
    updateTodoList(STATE.startDate, STATE.endDate, STATE.projectTitle);
  });

  ELS.content.addEventListener("click", (e) => {
    if (e.target.tagName !== "BUTTON") return;

    STATE.todoIndex = getTodoIndex(e.target.dataset.todoId);
    const currTodo = getTodo([STATE.todoIndex]);

    switch (e.target.classList[1]) {
      case "expand":
        updateReadTodoModal(currTodo);
        ELS.readTodoModal.showModal();
        break;
      case "done":
        e.target.parentElement.classList.toggle("marked");
        break;
      case "delete":
        deleteTodo(STATE.todoIndex);
        ELS.content.dispatchEvent(new CustomEvent("todo-list-change"));
        break;
    }
  });
}

export { addTodoListListeners };
