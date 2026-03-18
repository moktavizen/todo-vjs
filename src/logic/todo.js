import { compareAsc, isAfter, isBefore, isWithinInterval } from "date-fns";

const todoList = [];

class Todo {
  #id = crypto.randomUUID();
  #title;
  #description;
  #dueDate;
  #priority;
  #projectTitle;

  constructor(title, description, dueDate, priority, projectTitle) {
    this.#title = title;
    this.#description = description;
    this.#dueDate = dueDate;
    this.#priority = priority;
    this.#projectTitle = projectTitle;
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
  get description() {
    return this.#description;
  }
  set description(newDescription) {
    this.#description = newDescription;
  }
  get dueDate() {
    return this.#dueDate;
  }
  set dueDate(newDueDate) {
    this.#dueDate = newDueDate;
  }
  get priority() {
    return this.#priority;
  }
  set priority(newPriority) {
    this.#priority = newPriority;
  }
  get projectTitle() {
    return this.#projectTitle;
  }
  set projectTitle(newProjectTitle) {
    this.#projectTitle = newProjectTitle;
  }
}

function addTodo(title, description, dueDate, priority, project, todoList) {
  const newTodo = new Todo(title, description, dueDate, priority, project);
  todoList.push(newTodo);
}

function editTodo(todo, newTitle, newDescription, newDueDate, newPriority) {
  todo.title = newTitle;
  todo.description = newDescription;
  todo.dueDate = newDueDate;
  todo.priority = newPriority;
}

function deleteTodo(todoList, todoIndex) {
  todoList.splice(todoIndex, 1);
}

function getTodoIndex(todoList, todoId) {
  return todoList.findIndex((todo) => todo.id === todoId);
}

function processTodoList(todoList, startDate, endDate, projectTitle) {
  let filteredTodoList;
  if (!startDate && !endDate && !projectTitle) {
    filteredTodoList = todoList;
  } else if (!endDate && !projectTitle) {
    filteredTodoList = todoList.filter((todo) => isAfter(todo.dueDate, startDate));
  } else if (!startDate && !projectTitle) {
    filteredTodoList = todoList.filter((todo) => isBefore(todo.dueDate, endDate));
  } else if (!startDate && !endDate && projectTitle) {
    filteredTodoList = todoList.filter((todo) => todo.projectTitle === projectTitle);
  } else {
    filteredTodoList = todoList.filter((todo) =>
      isWithinInterval(todo.dueDate, { start: startDate, end: endDate }),
    );
  }

  return filteredTodoList.sort((a, b) => compareAsc(a.dueDate, b.dueDate));
}

function editTodoListProject(currProjectTitle, newProjectTitle) {
  for (const todo of todoList) {
    if (todo.projectTitle !== currProjectTitle) continue;
    todo.projectTitle = newProjectTitle;
  }
}

export {
  todoList,
  Todo,
  addTodo,
  editTodo,
  deleteTodo,
  getTodoIndex,
  processTodoList,
  editTodoListProject,
};
