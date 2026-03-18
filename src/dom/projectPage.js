import { ELS, STATE } from "../globals.js";

function renderProject({ title } = {}) {
  STATE.page = title;
  STATE.startDate = null;
  STATE.endDate = null;
  STATE.project = title;

  ELS.pageHeading.textContent = STATE.page;
  ELS.editProjectBtn.style.display = "inline-flex";
  ELS.addTodoFormHeading.textContent = `Add Task: ${STATE.page}`;

  ELS.todoDateInput.removeAttribute("min");
  ELS.todoDateInput.removeAttribute("max");

  ELS.content.dispatchEvent(new CustomEvent("todo-list-change"));
}

export { renderProject };
