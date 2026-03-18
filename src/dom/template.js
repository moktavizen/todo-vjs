import { ELS, STATE } from "../globals.js";
import { addTodo, todoList } from "../logic/todo.js";
import { renderAll } from "./allPage.js";
import { renderToday } from "./todayPage.js";
import { renderUpcoming } from "./upcomingPage.js";
import { addProject, getProjectIndex, projectList } from "../logic/project.js";
import { projectButton } from "./projectButton.js";
import { renderProject } from "./projectPage.js";
import { renderPast } from "./pastPage.js";
import { updateEditProjectModal } from "./editProjectModal.js";

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
  ELS.projectList.dispatchEvent(new CustomEvent("project-list-change"));
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
      case "past-page-btn":
        if (STATE.page === "Past") return;
        renderCurrPageIndicator(ELS.pastPageBtn);
        renderPast();
        break;
      case "add-project-btn":
        ELS.addProjectModal.showModal();
        break;
      case "confirm-add-project-btn":
        if (!ELS.addProjectForm.checkValidity()) return;
        e.preventDefault();

        addProject(ELS.projectTitleInput.value);

        ELS.projectList.dispatchEvent(new CustomEvent("project-list-change"));

        ELS.addProjectModal.close();
        ELS.addProjectForm.reset();
        break;
    }
  });

  ELS.projectList.addEventListener("project-list-change", (e) => {
    updateProjectList(projectList);

    // After `projectList` update, `curr-page` class gets removed from the project button
    // We have to add it again.
    if (STATE.projectIndex === null || e.detail) return;
    ELS.projectList.childNodes[STATE.projectIndex].classList.add("curr-page");
  });

  ELS.projectList.addEventListener("click", (e) => {
    if (e.target.id !== "project-page-btn") return;

    STATE.projectIndex = getProjectIndex(projectList, e.target.dataset.projectId);
    const currProject = projectList[STATE.projectIndex];

    if (STATE.page === currProject.title) return;
    renderCurrPageIndicator(e.target);
    renderProject(currProject);
  });

  ELS.editProjectBtn.addEventListener("click", () => {
    updateEditProjectModal();

    ELS.editProjectModal.showModal();

    ELS.editProjectTitle.focus();
    ELS.editProjectTitle.setSelectionRange(0, -1);
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
      STATE.projectTitle,
      todoList,
    );

    ELS.content.dispatchEvent(new CustomEvent("todo-list-change"));

    ELS.addTodoModal.close();
    ELS.addTodoForm.reset();
  });
}

export { renderTemplate, renderCurrPageIndicator, addTemplateListeners };
