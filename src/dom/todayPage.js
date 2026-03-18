import { endOfToday, format, startOfToday } from "date-fns";
import { ELS, STATE } from "../globals.js";

function renderToday() {
  STATE.page = "Today";
  STATE.startDate = startOfToday();
  STATE.endDate = endOfToday();
  STATE.projectTitle = null;

  ELS.pageHeading.textContent = STATE.page;
  ELS.editProjectBtn.style.display = "none";
  ELS.addTodoFormHeading.textContent = `Add Task: ${STATE.page}`;

  ELS.todoDateInput.setAttribute("min", format(STATE.startDate, "yyyy-MM-dd'T'HH:mm"));
  ELS.todoDateInput.setAttribute("max", format(STATE.endDate, "yyyy-MM-dd'T'HH:mm"));

  ELS.content.dispatchEvent(new CustomEvent("todo-list-change"));
}

export { renderToday };
