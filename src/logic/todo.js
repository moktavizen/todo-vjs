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

function addTodo(title, description, dueDate, priority, arr) {
  const newTodo = new Todo(title, description, dueDate, priority);
  arr.push(newTodo);
}

function editTodo(todo, newTitle, newDescription, newDueDate, newPriority) {
  todo.title = newTitle;
  todo.description = newDescription;
  todo.dueDate = newDueDate;
  todo.priority = newPriority;
}

function findTargetTodoIndex(todoList, targetId) {
  return todoList.findIndex((todo) => todo.id === targetId);
}

export { todoList, Todo, addTodo, editTodo, findTargetTodoIndex };
