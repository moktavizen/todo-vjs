import { renderAll } from "./dom/all.js";
import { ELS } from "./globals.js";
import { updateTodoList } from "./dom/todoList.js";
import { addTodo, todoList } from "./logic/todo.js";

function init() {
  renderAll();

  ELS.addTodoBtn.addEventListener("click", () => {
    ELS.addTodoDialog.showModal();
  });

  ELS.confirmAddTodoBtn.addEventListener("click", (e) => {
    if (!ELS.addTodoForm.checkValidity()) return;
    e.preventDefault();

    addTodo(
      ELS.todoTitleInput.value,
      ELS.todoDescriptionInput.value,
      ELS.todoDateInput.value,
      ELS.todoPrioritySelect.value,
      todoList,
    );

    const todoListChangeEvent = new CustomEvent("todo-list-change");
    ELS.content.dispatchEvent(todoListChangeEvent);

    ELS.addTodoForm.reset();
    ELS.addTodoDialog.close();
  });

  ELS.content.addEventListener("todo-list-change", () => {
    updateTodoList(todoList, ELS.content);
  });

  ELS.content.addEventListener("click", (e) => {
    if (e.target.tagName !== "BUTTON") return;

    switch (e.target.classList[1]) {
      case "expand":
        console.log("expand");
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

export { init };
