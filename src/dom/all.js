import { ELS } from "../globals.js";
import { todoList } from "../logic/todo.js";
import { renderTodoList } from "./todoList.js";

function renderAll() {
  ELS.pageHeading.textContent = "All";
  ELS.addTaskFormHeading.textContent = "Add Task: All";

  renderTodoList(todoList, ELS.content);
}

export { renderAll };
