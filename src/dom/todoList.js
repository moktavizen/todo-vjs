import { CE, ELS } from "../globals.js";
import { deleteTodo, findTargetTodoIndex, todoList } from "../logic/todo.js";
import { updateReadTodoModal } from "./readTodoModal.js";
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

function addTodoListListeners() {
  ELS.content.addEventListener("todo-list-change", () => {
    updateTodoList(todoList, ELS.content);
  });

  ELS.content.addEventListener("click", (e) => {
    if (e.target.tagName !== "BUTTON") return;

    const targetIndex = findTargetTodoIndex(todoList, e.target.dataset.todoId);

    switch (e.target.classList[1]) {
      case "expand":
        updateReadTodoModal(targetIndex, todoList[targetIndex]);
        ELS.readTodoModal.showModal();
        break;
      case "done":
        e.target.parentElement.classList.toggle("marked");
        break;
      case "delete":
        deleteTodo(todoList, targetIndex);
        ELS.content.dispatchEvent(CE.todoListChange);
        break;
    }
  });
}

export { clearTodoList, renderTodoList, updateTodoList, addTodoListListeners };
