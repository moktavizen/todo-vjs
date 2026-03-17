import { ELS, STATE } from "../globals.js";
import { addTodo, todoList } from "../logic/todo.js";
import { renderAll } from "./all.js";
import { renderToday } from "./today.js";
import { renderUpcoming } from "./upcoming.js";
import { addProject, findTargetProjectIndex, projectList } from "../logic/project.js";
import { projectButton } from "./projectButton.js";
import { renderProject } from "./project.js";

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

function renderCurrPageIndicator(btnEl) {
  const pageBtns = document.querySelectorAll(".page-btn");
  for (const btn of pageBtns) {
    btn.classList.remove("curr-page");
  }

  btnEl.classList.add("curr-page");
}

function addTemplateListeners() {
  ELS.sidebarNav.addEventListener("click", (e) => {
    if (e.target.tagName !== "BUTTON") return;

    switch (e.target.id) {
      case "all-page-btn":
        if (STATE.page === "All") return;
        renderCurrPageIndicator(ELS.allPageBtn);
        renderAll();
        break;
      case "today-page-btn":
        if (STATE.page === "Today") return;
        renderCurrPageIndicator(ELS.todayPageBtn);
        renderToday();
        break;
      case "upcoming-page-btn":
        if (STATE.page === "Upcoming") return;
        renderCurrPageIndicator(ELS.upcomingPageBtn);
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

  ELS.projectList.addEventListener("click", (e) => {
    if (e.target.id !== "project-page-btn") return;

    const targetIndex = findTargetProjectIndex(projectList, e.target.dataset.projectId);

    if (STATE.page === projectList[targetIndex].title) return;
    renderCurrPageIndicator(e.target);
    renderProject(projectList[targetIndex]);
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
      STATE.project,
      todoList,
    );

    ELS.content.dispatchEvent(new CustomEvent("todo-list-change"));

    ELS.addTodoModal.close();
    ELS.addTodoForm.reset();
  });
}

export { renderTemplate, addTemplateListeners };
