import { CE, ELS } from "../globals.js";
import { addTodo, todoList } from "../logic/todo.js";

function addTemplateListeners() {
  // TODO: Add switch page logic

  ELS.addProjectBtn.addEventListener("click", () => {
    ELS.addProjectDialog.showModal();
  });

  ELS.addTodoBtn.addEventListener("click", () => {
    ELS.addTodoModal.showModal();
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

    ELS.content.dispatchEvent(CE.todoListChange);

    ELS.addTodoModal.close();
    ELS.addTodoForm.reset();
  });
}

export { addTemplateListeners };
