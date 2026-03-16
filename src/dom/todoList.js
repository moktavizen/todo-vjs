import { ELS, STATE } from "../globals.js";
import { deleteTodo, filterTodoList, findTargetTodoIndex, todoList } from "../logic/todo.js";
import { updateReadTodoModal } from "./readTodoModal.js";
import { todoBar } from "./todoBar.js";

function clearTodoList(todoListContainer) {
  todoListContainer.replaceChildren();
}

function renderTodoList(todoList, todoListContainer) {
  for (const todo of todoList) {
    todoBar(todo, todoListContainer);
  }
}

function updateTodoList(todoList, todoListContainer, startDate = "", endDate = "") {
  const filteredTodoList = filterTodoList(todoList, startDate, endDate);

  clearTodoList(todoListContainer);
  renderTodoList(filteredTodoList, todoListContainer);
}

function addTodoListListeners() {
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
        updateTodoList(todoList, ELS.content, STATE.startDate, STATE.endDate);
        break;
    }
  });
}

export { clearTodoList, renderTodoList, updateTodoList, addTodoListListeners };
