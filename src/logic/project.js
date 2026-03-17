const projectList = [];

class Project {
  #title;

  constructor(title) {
    this.#title = title;
  }

  get title() {
    return this.#title;
  }
}

function addProject(title) {
  const newProject = new Project(title);
  projectList.push(newProject);
}

export { Project, projectList, addProject };
