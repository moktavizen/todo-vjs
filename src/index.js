import "./styles/reset.css";
import "./styles/style.css";
import "./styles/fonts.css";
import { renderAll } from "./dom/allPage.js";
import { addReadTodoModalListeners } from "./dom/readTodoModal.js";
import { addTemplateListeners, renderTemplate } from "./dom/template.js";
import { addTodoListListeners } from "./dom/todoList.js";
import { addEditProjectModalListeners } from "./dom/editProjectModal.js";
import { initLocalStorage } from "./logic/localStorage.js";

initLocalStorage();

addTemplateListeners();
addTodoListListeners();
addReadTodoModalListeners();
addEditProjectModalListeners();

renderTemplate();
renderAll();
