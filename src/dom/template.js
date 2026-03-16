import { endOfToday, startOfToday, startOfTomorrow } from "date-fns";
import { ELS, STATE } from "../globals.js";
import { addTodo, todoList } from "../logic/todo.js";
import { renderAll } from "./all.js";
import { renderToday } from "./today.js";
import { renderUpcoming } from "./upcoming.js";
import { updateTodoList } from "./todoList.js";

function addTemplateListeners() {
  ELS.allPageBtn.addEventListener("click", () => {
    STATE.page = "All";
    STATE.startDate = null;
    STATE.endDate = null;

    ELS.todayPageBtn.classList = "";
    ELS.upcomingPageBtn.classList = "";
    ELS.allPageBtn.classList = "curr-page";

    renderAll();
  });

  ELS.todayPageBtn.addEventListener("click", () => {
    STATE.page = "Today";
    STATE.startDate = startOfToday();
    STATE.endDate = endOfToday();

    ELS.allPageBtn.classList = "";
    ELS.upcomingPageBtn.classList = "";
    ELS.todayPageBtn.classList = "curr-page";

    renderToday();
  });

  ELS.upcomingPageBtn.addEventListener("click", () => {
    STATE.page = "Upcoming";
    STATE.startDate = startOfTomorrow();
    STATE.endDate = null;

    ELS.allPageBtn.classList = "";
    ELS.todayPageBtn.classList = "";
    ELS.upcomingPageBtn.classList = "curr-page";

    renderUpcoming();
  });

  ELS.addProjectBtn.addEventListener("click", () => {
    ELS.addProjectDialog.showModal();
  });

  ELS.addTodoBtn.addEventListener("click", () => {
    ELS.addTodoModal.showModal();
  });

  ELS.confirmAddTodoBtn.addEventListener("click", (e) => {
    if (!ELS.addTodoForm.checkValidity()) return;
    e.preventDefault();

    addTodo(
      ELS.todoTitleInput.value,
      ELS.todoDescriptionInput.value,
      ELS.todoDateInput.value,
      ELS.todoPrioritySelect.value,
      todoList,
    );

    updateTodoList(todoList, ELS.content, STATE.startDate, STATE.endDate);

    ELS.addTodoModal.close();
    ELS.addTodoForm.reset();
  });
}

export { addTemplateListeners };
