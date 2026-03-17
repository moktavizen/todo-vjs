import { endOfToday, startOfToday, startOfTomorrow } from "date-fns";
import { ELS, STATE } from "../globals.js";
import { addTodo, todoList } from "../logic/todo.js";
import { renderAll } from "./all.js";
import { renderToday } from "./today.js";
import { renderUpcoming } from "./upcoming.js";
import { updateTodoList } from "./todoList.js";
import { addProject, projectList } from "../logic/project.js";
import { projectButton } from "./projectButton.js";

function clearProjectList() {
  ELS.projectList.replaceChildren();
}

function renderProjectList(projectList) {
  for (const project of projectList) {
    projectButton(project);
  }
}

function updateProjectList(projectList) {
  clearProjectList();
  renderProjectList(projectList);
}

function renderTemplate() {
  updateProjectList(projectList);
}

function addTemplateListeners() {
  ELS.sidebarNav.addEventListener("click", (e) => {
    if (e.target.tagName !== "BUTTON") return;

    switch (e.target.id) {
      case "all-page-btn":
        if (STATE.page === "All") return;

        STATE.page = "All";
        STATE.startDate = null;
        STATE.endDate = null;

        ELS.todayPageBtn.classList = "";
        ELS.upcomingPageBtn.classList = "";
        ELS.allPageBtn.classList = "curr-page";

        renderAll();
        break;
      case "today-page-btn":
        if (STATE.page === "Today") return;

        STATE.page = "Today";
        STATE.startDate = startOfToday();
        STATE.endDate = endOfToday();

        ELS.allPageBtn.classList = "";
        ELS.upcomingPageBtn.classList = "";
        ELS.todayPageBtn.classList = "curr-page";

        renderToday();
        break;
      case "upcoming-page-btn":
        if (STATE.page === "Upcoming") return;

        STATE.page = "Upcoming";
        STATE.startDate = startOfTomorrow();
        STATE.endDate = null;

        ELS.allPageBtn.classList = "";
        ELS.todayPageBtn.classList = "";
        ELS.upcomingPageBtn.classList = "curr-page";

        renderUpcoming();
        break;
      case "add-project-btn":
        ELS.addProjectModal.showModal();
        break;
      case "confirm-add-project-btn":
        if (!ELS.addProjectForm.checkValidity()) return;
        e.preventDefault();

        addProject(ELS.projectTitleInput.value);

        updateProjectList(projectList);

        ELS.addProjectModal.close();
        ELS.addProjectForm.reset();
        break;
    }
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

    updateTodoList(todoList, STATE.startDate, STATE.endDate);

    ELS.addTodoModal.close();
    ELS.addTodoForm.reset();
  });
}

export { renderTemplate, addTemplateListeners };
