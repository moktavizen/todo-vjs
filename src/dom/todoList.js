import { ELS, STATE } from "../globals.js";
import { deleteTodo, findTargetTodoIndex, processTodoList, todoList } from "../logic/todo.js";
import { updateReadTodoModal } from "./readTodoModal.js";
import { todoBar } from "./todoBar.js";

function clearTodoList() {
  ELS.content.replaceChildren();
}

function renderTodoList(todoList) {
  for (const todo of todoList) {
    todoBar(todo);
  }
}

function updateTodoList(todoList, startDate = "", endDate = "") {
  const processedTodoList = processTodoList(todoList, startDate, endDate);

  clearTodoList();
  renderTodoList(processedTodoList);
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
        updateTodoList(todoList, STATE.startDate, STATE.endDate);
        break;
    }
  });
}

export { updateTodoList, addTodoListListeners };
