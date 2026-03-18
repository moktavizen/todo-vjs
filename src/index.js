import "./styles/reset.css";
import "./styles/style.css";
import { renderAll } from "./dom/allPage.js";
import { addReadTodoModalListeners } from "./dom/readTodoModal.js";
import { addTemplateListeners, renderTemplate } from "./dom/template.js";
import { addTodoListListeners } from "./dom/todoList.js";
import { Todo, todoList } from "./logic/todo.js";
import { Project, projectList } from "./logic/project.js";
import { addEditProjectModalListeners } from "./dom/editProjectModal.js";

todoList.push(
  new Todo("John", "Doe", "2026-03-19T13:37", "Low"),
  new Todo("Jane", "Doe", "2026-03-17T13:37", "Medium"),
  new Todo("Joni", "", "2026-03-18T13:37", "High", "Library App"),
);

projectList.push(new Project("Library App"));

addTemplateListeners();
addTodoListListeners();
addReadTodoModalListeners();
addEditProjectModalListeners();

renderTemplate();
renderAll();
