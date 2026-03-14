import { ELS } from "./globals.js";
import { addTodoToList } from "./logic/addTodo.js";
import { todoList } from "./logic/todo.js";

function init() {
  ELS.addTodoBtn.addEventListener("click", () => {
    ELS.addTodoDialog.showModal();
  });

  ELS.confirmAddTodoBtn.addEventListener("click", (e) => {
    if (!ELS.addTodoForm.checkValidity()) return;
    e.preventDefault();

    addTodoToList(
      ELS.todoTitleInput.value,
      ELS.todoDescriptionInput.value,
      ELS.todoDateInput.value,
      ELS.todoPrioritySelect.value,
    );

    console.log(todoList);

    ELS.addTodoForm.reset();
    ELS.addTodoDialog.close();
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
