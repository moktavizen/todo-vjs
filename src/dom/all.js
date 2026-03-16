import { ELS, STATE } from "../globals.js";
import { todoList } from "../logic/todo.js";
import { updateTodoList } from "./todoList.js";

function renderAll() {
  ELS.pageHeading.textContent = STATE.page;
  ELS.addTaskFormHeading.textContent = `Add Task: ${STATE.page}`;

  ELS.todoDateInput.removeAttribute("min");
  ELS.todoDateInput.removeAttribute("max");

  updateTodoList(todoList);
}

export { renderAll };
