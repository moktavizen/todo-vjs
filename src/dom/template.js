import { ELS } from "../globals.js";
import { addTodo, todoList } from "../logic/todo.js";

function addTemplateListeners() {
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

    const todoListChangeEvent = new CustomEvent("todo-list-change");
    ELS.content.dispatchEvent(todoListChangeEvent);

    ELS.addTodoModal.close();
    ELS.addTodoForm.reset();
  });
}

export { addTemplateListeners };
