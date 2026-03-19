import { getListFromStorage, saveListToStorage } from "./localStorage.js";

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

  toJSON() {
    return {
      id: this.#id,
      title: this.#title,
    };
  }
}

const projectList = getListFromStorage("projectList");

function addProject(title) {
  const newProject = new Project(title);
  projectList.push(newProject);

  saveListToStorage("projectList", projectList);
}

function getProjectList() {
  return projectList;
}

function getProjectIndex(projectId) {
  return projectList.findIndex((project) => project.id === projectId);
}

function getProject(projectIndex) {
  return projectList[projectIndex];
}

function editProject(project, newTitle) {
  project.title = newTitle;

  saveListToStorage("projectList", projectList);
}

function deleteProject(projectIndex) {
  projectList.splice(projectIndex, 1);

  saveListToStorage("projectList", projectList);
}

export { addProject, getProjectList, getProjectIndex, getProject, editProject, deleteProject };
