import { format } from "date-fns";
import { ELS, STATE } from "../globals.js";
import { todoList } from "../logic/todo.js";
import { updateTodoList } from "./todoList.js";

function renderUpcoming() {
  ELS.pageHeading.textContent = STATE.page;
  ELS.addTaskFormHeading.textContent = `Add Task: ${STATE.page}`;

  ELS.todoDateInput.setAttribute("min", format(STATE.startDate, "yyyy-MM-dd'T'HH:mm"));
  ELS.todoDateInput.removeAttribute("max");

  updateTodoList(todoList, STATE.startDate, STATE.endDate);
}

export { renderUpcoming };
