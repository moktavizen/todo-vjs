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
}

function addProject(title) {
  const newProject = new Project(title);
  projectList.push(newProject);
}

function findTargetProjectIndex(projectList, targetId) {
  return projectList.findIndex((project) => project.id === targetId);
}

export { Project, projectList, addProject, findTargetProjectIndex };
