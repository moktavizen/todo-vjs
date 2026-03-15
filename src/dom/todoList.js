import { ELS } from "../globals.js";
import { todoList } from "../logic/todo.js";
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

    const targetIndex = todoList.findIndex((todo) => todo.id === e.target.dataset.todoId);

    switch (e.target.classList[1]) {
      case "expand":
        updateReadTodoModal(todoList[targetIndex], targetIndex);
        ELS.readTodoModal.showModal();
        break;
      case "done":
        console.log("done");
        break;
      case "delete":
        console.log("delete");
        break;
    }
  });
}

export { clearTodoList, renderTodoList, updateTodoList, addTodoListListeners };
