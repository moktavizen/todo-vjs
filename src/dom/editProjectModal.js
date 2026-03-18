import { ELS, STATE } from "../globals.js";
import { editProject, projectList } from "../logic/project.js";
import { editTodoListProject } from "../logic/todo.js";
import { renderProject } from "./projectPage.js";

function updateEditProjectModal() {
  const selectedProject = projectList[STATE.selectedProjectIndex];
  const { title } = selectedProject;

  ELS.editProjectTitle.setAttribute("value", title);
}

function addEditProjectModalListeners() {
  ELS.confirmEditProjectBtn.addEventListener("click", (e) => {
    if (!ELS.editProjectForm.checkValidity()) return;
    e.preventDefault();

    const selectedProject = projectList[STATE.selectedProjectIndex];

    editProject(selectedProject, ELS.editProjectTitle.value);
    editTodoListProject(STATE.project, ELS.editProjectTitle.value);

    ELS.projectList.dispatchEvent(new CustomEvent("project-list-change"));

    renderProject(selectedProject);

    ELS.editProjectModal.close();
    ELS.editProjectForm.reset();
  });
}

export { updateEditProjectModal, addEditProjectModalListeners };
