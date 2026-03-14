import { Todo, todoList } from "./todo.js";

function addTodoToList(title, description, dueDate, priority) {
  const newTodo = new Todo(title, description, dueDate, priority);
  todoList.push(newTodo);
}

export { addTodoToList };
