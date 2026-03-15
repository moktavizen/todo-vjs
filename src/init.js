import { renderAll } from "./dom/all.js";
import { addTemplateListeners } from "./dom/template.js";
import { addTodoListListeners } from "./dom/todoList.js";
import { addReadTodoModalListeners } from "./dom/readTodoModal.js";
import { Todo, todoList } from "./logic/todo.js";

function init() {
  todoList.push(
    new Todo("John", "Doe", "2026-03-15T13:37", "Low"),
    new Todo("Jane", "Doe", "2026-03-16T13:37", "Medium"),
    new Todo("Joni", "Doe", "2026-03-17T13:37", "High"),
  );

  renderAll();

  addTemplateListeners();
  addTodoListListeners();
  addReadTodoModalListeners();
}

export { init };
