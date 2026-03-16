import { ELS, STATE } from "../globals.js";
import { todoList } from "../logic/todo.js";
import { updateTodoList } from "./todoList.js";

function renderToday() {
  ELS.pageHeading.textContent = STATE.page;
  ELS.addTaskFormHeading.textContent = `Add Task: ${STATE.page}`;

  updateTodoList(todoList, ELS.content, STATE.startDate, STATE.endDate);
}

export { renderToday };
