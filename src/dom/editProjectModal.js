import { ELS, STATE } from "../globals.js";
import { deleteProject, editProject, getProject } from "../logic/project.js";
import { deleteTodoListProject, editTodoListProject } from "../logic/todo.js";
import { renderAll } from "./allPage.js";
import { renderProject } from "./projectPage.js";
import { renderCurrPageIndicator } from "./template.js";

function updateEditProjectModal({ title } = {}) {
  ELS.editProjectTitle.setAttribute("value", title);
}

function addEditProjectModalListeners() {
  ELS.confirmEditProjectBtn.addEventListener("click", (e) => {
    if (!ELS.editProjectForm.checkValidity()) return;
    e.preventDefault();

    const currProject = getProject(STATE.projectIndex);

    editProject(currProject, ELS.editProjectTitle.value);
    editTodoListProject(STATE.projectTitle, ELS.editProjectTitle.value);

    ELS.projectList.dispatchEvent(new CustomEvent("project-list-change"));

    renderProject(currProject);

    ELS.editProjectModal.close();
    ELS.editProjectForm.reset();
  });

  ELS.deleteProjectBtn.addEventListener("click", (e) => {
    e.preventDefault();

    deleteProject(STATE.projectIndex);
    deleteTodoListProject(STATE.projectTitle);

    ELS.projectList.dispatchEvent(
      new CustomEvent("project-list-change", {
        detail: {
          actionName: "delete-project",
        },
      }),
    );

    renderAll();
    renderCurrPageIndicator(ELS.allPageBtn);

    ELS.editProjectModal.close();
    ELS.editProjectForm.reset();
  });
}

export { updateEditProjectModal, addEditProjectModalListeners };
