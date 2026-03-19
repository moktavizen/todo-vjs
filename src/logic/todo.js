import { compareAsc, isAfter, isBefore, isWithinInterval } from "date-fns";
import { getListFromStorage, saveListToStorage } from "./localStorage.js";

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

  toJSON() {
    return {
      id: this.#id,
      title: this.#title,
      description: this.#description,
      dueDate: this.#dueDate,
      priority: this.#priority,
      projectTitle: this.#projectTitle,
    };
  }
}

const todoList = getListFromStorage("todoList") || [];

function addTodo(title, description, dueDate, priority, projectTitle) {
  const newTodo = new Todo(title, description, dueDate, priority, projectTitle);
  todoList.push(newTodo);

  saveListToStorage("todoList", todoList);
}

function getTodoList(startDate, endDate, projectTitle) {
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

function getTodoIndex(todoId) {
  return todoList.findIndex((todo) => todo.id === todoId);
}

function getTodo(todoIndex) {
  return todoList[todoIndex];
}

function editTodo(todo, newTitle, newDescription, newDueDate, newPriority) {
  todo.title = newTitle;
  todo.description = newDescription;
  todo.dueDate = newDueDate;
  todo.priority = newPriority;

  saveListToStorage("todoList", todoList);
}

function editTodoListProject(currProjectTitle, newProjectTitle) {
  for (const todo of todoList) {
    if (todo.projectTitle !== currProjectTitle) continue;
    todo.projectTitle = newProjectTitle;
  }

  saveListToStorage("todoList", todoList);
}

function deleteTodo(todoIndex) {
  todoList.splice(todoIndex, 1);

  saveListToStorage("todoList", todoList);
}

function deleteTodoListProject(currProjectTitle) {
  let index = 0;
  for (const todo of todoList) {
    if (todo.projectTitle === currProjectTitle) {
      todoList.splice(index, 1);
    }
    index++;
  }

  saveListToStorage("todoList", todoList);
}

export {
  addTodo,
  getTodoList,
  getTodoIndex,
  getTodo,
  editTodo,
  editTodoListProject,
  deleteTodo,
  deleteTodoListProject,
};
