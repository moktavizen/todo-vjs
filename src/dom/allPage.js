import { ELS, STATE } from "../globals.js";

function renderAll() {
  STATE.page = "All";
  STATE.startDate = null;
  STATE.endDate = null;
  STATE.projectTitle = null;

  ELS.pageHeading.textContent = STATE.page;
  ELS.editProjectBtn.style.display = "none";
  ELS.addTodoFormHeading.textContent = `Add Task: ${STATE.page}`;

  ELS.todoDateInput.removeAttribute("min");
  ELS.todoDateInput.removeAttribute("max");

  ELS.content.dispatchEvent(new CustomEvent("todo-list-change"));
}

export { renderAll };
