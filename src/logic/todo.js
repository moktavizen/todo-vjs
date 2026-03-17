import { compareAsc, isAfter, isWithinInterval } from "date-fns";

const todoList = [];

class Todo {
  #id = crypto.randomUUID();
  #title;
  #description;
  #dueDate;
  #priority;
  #project;

  constructor(title, description, dueDate, priority, project) {
    this.#title = title;
    this.#description = description;
    this.#dueDate = dueDate;
    this.#priority = priority;
    this.#project = project;
  }

  get id() {
    return this.#id;
  }
  get project() {
    return this.#project;
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

function findTargetTodoIndex(todoList, targetId) {
  return todoList.findIndex((todo) => todo.id === targetId);
}

function processTodoList(todoList, startDate, endDate, project) {
  let filteredTodoList;
  if (!startDate && !endDate && !project) {
    filteredTodoList = todoList;
  } else if (!endDate && !project) {
    filteredTodoList = todoList.filter((todo) => isAfter(todo.dueDate, startDate));
  } else if (!startDate && !endDate && project) {
    filteredTodoList = todoList.filter((todo) => todo.project === project);
  } else {
    filteredTodoList = todoList.filter((todo) =>
      isWithinInterval(todo.dueDate, { start: startDate, end: endDate }),
    );
  }

  return filteredTodoList.sort((a, b) => compareAsc(a.dueDate, b.dueDate));
}

export { todoList, Todo, addTodo, editTodo, deleteTodo, findTargetTodoIndex, processTodoList };
