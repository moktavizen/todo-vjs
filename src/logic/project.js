const projectList = [];

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
}

function editProject(project, newTitle) {
  project.title = newTitle;
}

function findTargetProjectIndex(projectList, targetId) {
  return projectList.findIndex((project) => project.id === targetId);
}

export { Project, projectList, addProject, editProject, findTargetProjectIndex };
