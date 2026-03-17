import { ELS, STATE } from "../globals.js";
import { deleteTodo, findTargetTodoIndex, processTodoList, todoList } from "../logic/todo.js";
import { updateReadTodoModal } from "./readTodoModal.js";
import { todoBar } from "./todoBar.js";

function clearTodoList() {
  ELS.content.replaceChildren();
}

function renderEmptyTodoList() {
  const emptyTodoListDiv = document.createElement("div");
  emptyTodoListDiv.classList = "empty-todo-list";
  emptyTodoListDiv.innerHTML =
    "There are no tasks in this category ☹️<br />Add new task using button at the top right corner!";

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

function updateTodoList(todoList, startDate, endDate, project) {
  const processedTodoList = processTodoList(todoList, startDate, endDate, project);

  clearTodoList();
  renderTodoList(processedTodoList);
}

function addTodoListListeners() {
  ELS.content.addEventListener("todo-list-change", () => {
    updateTodoList(todoList, STATE.startDate, STATE.endDate, STATE.project);
  });

  ELS.content.addEventListener("click", (e) => {
    if (e.target.tagName !== "BUTTON") return;

    const targetIndex = findTargetTodoIndex(todoList, e.target.dataset.todoId);

    switch (e.target.classList[1]) {
      case "expand":
        updateReadTodoModal(targetIndex, todoList[targetIndex]);
        ELS.readTodoModal.showModal();
        break;
      case "done":
        e.target.parentElement.classList.toggle("marked");
        break;
      case "delete":
        deleteTodo(todoList, targetIndex);
        ELS.content.dispatchEvent(new CustomEvent("todo-list-change"));
        break;
    }
  });
}

export { addTodoListListeners };
