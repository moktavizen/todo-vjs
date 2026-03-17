import { endOfYesterday, format } from "date-fns";
import { ELS, STATE } from "../globals.js";

function renderPast() {
  STATE.page = "Past";
  STATE.startDate = null;
  STATE.endDate = endOfYesterday();
  STATE.project = null;

  ELS.pageHeading.textContent = STATE.page;
  ELS.addTaskFormHeading.textContent = `Add Task: ${STATE.page}`;

  ELS.todoDateInput.removeAttribute("min");
  ELS.todoDateInput.setAttribute("max", format(STATE.endDate, "yyyy-MM-dd'T'HH:mm"));

  ELS.content.dispatchEvent(new CustomEvent("todo-list-change"));
}

export { renderPast };
