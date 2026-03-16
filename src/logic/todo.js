import { isAfter, isWithinInterval } from "date-fns";

const todoList = [];

class Todo {
  #id = crypto.randomUUID();
  #title;
  #description;
  #dueDate;
  #priority;

  constructor(title, description, dueDate, priority) {
    this.#title = title;
    this.#description = description;
    this.#dueDate = dueDate;
    this.#priority = priority;
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
}

function addTodo(title, description, dueDate, priority, todoList) {
  const newTodo = new Todo(title, description, dueDate, priority);
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

function filterTodoList(todoList, startDate = "", endDate = "") {
  if (!startDate && !endDate) return todoList;

  if (!endDate) return todoList.filter((todo) => isAfter(todo.dueDate, startDate));

  return todoList.filter((todo) =>
    isWithinInterval(todo.dueDate, {
      start: startDate,
      end: endDate,
    }),
  );
}

export { todoList, Todo, addTodo, editTodo, deleteTodo, findTargetTodoIndex, filterTodoList };
