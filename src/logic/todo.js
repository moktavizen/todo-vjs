const todoList = [];

class Todo {
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

  get title() {
    return this.#title;
  }
  get description() {
    return this.#description;
  }
  get dueDate() {
    return this.#dueDate;
  }
  get priority() {
    return this.#priority;
  }
}

function addTodo(title, description, dueDate, priority, arr) {
  const newTodo = new Todo(title, description, dueDate, priority);
  arr.push(newTodo);
}

export { todoList, Todo, addTodo };
