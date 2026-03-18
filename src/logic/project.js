import { getListFromStorage, saveListToStorage } from "./localStorage.js";

const projectList = getListFromStorage("projectList");

class Project {
  #id = crypto.randomUUID();
  #title;

  constructor(title) {
    this.#title = title;
  }

  get id() {
    return this.#id;
  }
  get title() {
    return this.#title;
  }
  set title(newTitle) {
    this.#title = newTitle;
  }
}

function addProject(title) {
  const newProject = new Project(title);
  projectList.push(newProject);

  saveListToStorage("projectList", projectList);
}

function editProject(project, newTitle) {
  project.title = newTitle;

  saveListToStorage("projectList", projectList);
}

function deleteProject(projectList, projectIndex) {
  projectList.splice(projectIndex, 1);

  saveListToStorage("projectList", projectList);
}

function getProjectIndex(projectList, projectId) {
  return projectList.findIndex((project) => project.id === projectId);
}

export { projectList, addProject, editProject, deleteProject, getProjectIndex };
