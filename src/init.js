import { renderAll } from "./dom/all.js";
import { addTemplateListeners } from "./dom/template.js";
import { addTodoListListeners } from "./dom/todoList.js";
import { addReadTodoModalListeners } from "./dom/readTodoModal.js";

function init() {
  renderAll();

  addTemplateListeners();
  addTodoListListeners();
  addReadTodoModalListeners();
}

export { init };
