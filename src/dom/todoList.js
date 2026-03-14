import { todoBar } from "./todoBar.js";

function clearTodoList(todoListContainer) {
  todoListContainer.replaceChildren();
}

function renderTodoList(todoList, todoListContainer) {
  for (const todo of todoList) {
    todoBar(todo, todoListContainer);
  }
}

function updateTodoList(todoList, todoListContainer) {
  clearTodoList(todoListContainer);
  renderTodoList(todoList, todoListContainer);
}

export { clearTodoList, renderTodoList, updateTodoList };
