import { ELS, STATE } from "../globals.js";
import { editProject, projectList } from "../logic/project.js";
import { editTodoListProject } from "../logic/todo.js";
import { renderProject } from "./projectPage.js";

function updateEditProjectModal() {
  const currProject = projectList[STATE.projectIndex];
  const { title } = currProject;

  ELS.editProjectTitle.setAttribute("value", title);
}

function addEditProjectModalListeners() {
  ELS.confirmEditProjectBtn.addEventListener("click", (e) => {
    if (!ELS.editProjectForm.checkValidity()) return;
    e.preventDefault();

    const currProject = projectList[STATE.projectIndex];

    editProject(currProject, ELS.editProjectTitle.value);
    editTodoListProject(STATE.projectTitle, ELS.editProjectTitle.value);

    ELS.projectList.dispatchEvent(new CustomEvent("project-list-change"));

    renderProject(currProject);

    ELS.editProjectModal.close();
    ELS.editProjectForm.reset();
  });
}

export { updateEditProjectModal, addEditProjectModalListeners };
