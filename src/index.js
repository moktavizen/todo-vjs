import "./styles/reset.css";
import "./styles/style.css";
import { renderAll } from "./dom/all.js";
import { addReadTodoModalListeners } from "./dom/readTodoModal.js";
import { addTemplateListeners } from "./dom/template.js";
import { addTodoListListeners } from "./dom/todoList.js";
import { Todo, todoList } from "./logic/todo.js";

todoList.push(
  new Todo("John", "Doe", "2026-03-18T13:37", "Low"),
  new Todo("Jane", "Doe", "2026-03-16T13:37", "Medium"),
  new Todo("Joni", "Doe", "2026-03-17T13:37", "High"),
);

renderAll();

addTemplateListeners();
addTodoListListeners();
addReadTodoModalListeners();
