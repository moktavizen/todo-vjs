import { format, startOfTomorrow } from "date-fns";
import { ELS, STATE } from "../globals.js";

function renderUpcoming() {
  STATE.page = "Upcoming";
  STATE.startDate = startOfTomorrow();
  STATE.endDate = null;
  STATE.project = null;

  ELS.pageHeading.textContent = STATE.page;
  ELS.editProjectBtn.style.display = "none";
  ELS.addTaskFormHeading.textContent = `Add Task: ${STATE.page}`;

  ELS.todoDateInput.setAttribute("min", format(STATE.startDate, "yyyy-MM-dd'T'HH:mm"));
  ELS.todoDateInput.removeAttribute("max");

  ELS.content.dispatchEvent(new CustomEvent("todo-list-change"));
}

export { renderUpcoming };
