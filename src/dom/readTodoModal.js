import { ELS, STATE } from "../globals.js";
import { editTodo, todoList } from "../logic/todo.js";
import { updateTodoList } from "./todoList.js";

function updateReadTodoModal(targetIndex, { title, description, dueDate, priority } = {}) {
  ELS.readTodoForm.dataset.targetTodoIndex = targetIndex;

  ELS.readTodoTitle.setAttribute("value", title);
  ELS.readTodoDescription.setAttribute("value", description);
  ELS.readTodoDate.setAttribute("value", dueDate);

  switch (priority) {
    case "Low":
      ELS.lowPriorityOption.setAttribute("selected", "");
      ELS.mediumPriorityOption.removeAttribute("selected");
      ELS.highPriorityOption.removeAttribute("selected");
      break;
    case "Medium":
      ELS.lowPriorityOption.removeAttribute("selected");
      ELS.mediumPriorityOption.setAttribute("selected", "");
      ELS.highPriorityOption.removeAttribute("selected");
      break;
    case "High":
      ELS.lowPriorityOption.removeAttribute("selected");
      ELS.mediumPriorityOption.removeAttribute("selected");
      ELS.highPriorityOption.setAttribute("selected", "");
      break;
  }
}

function resetReadTodoForm() {
  ELS.readTodoForm.reset();

  ELS.readTodoTitle.setAttribute("disabled", "");
  ELS.readTodoDescription.setAttribute("disabled", "");
  ELS.readTodoDate.setAttribute("disabled", "");
  ELS.readTodoPriority.setAttribute("disabled", "");

  ELS.confirmEditTodoBtn.setAttribute("id", "edit-read-task-btn");
  ELS.editReadTaskBtn.classList = "edit-btn";
  ELS.editReadTaskBtn.textContent = "Edit";

  ELS.cancelEditTaskBtn.setAttribute("id", "cancel-read-task-btn");
}

function addReadTodoModalListeners() {
  ELS.readTodoForm.addEventListener("click", (e) => {
    if (e.target.tagName !== "BUTTON") return;

    const targetIndex = e.currentTarget.dataset.targetTodoIndex;

    switch (e.target.id) {
      case "edit-read-task-btn":
        e.preventDefault();

        ELS.readTodoTitle.removeAttribute("disabled");
        ELS.readTodoDescription.removeAttribute("disabled");
        ELS.readTodoDate.removeAttribute("disabled");
        ELS.readTodoPriority.removeAttribute("disabled");

        ELS.readTodoTitle.focus();
        ELS.readTodoTitle.setSelectionRange(0, -1);

        ELS.editReadTaskBtn.setAttribute("id", "confirm-edit-task-btn");
        ELS.confirmEditTodoBtn = document.querySelector("#confirm-edit-task-btn");
        ELS.confirmEditTodoBtn.classList = "confirm-btn";
        ELS.confirmEditTodoBtn.textContent = "Confirm";

        ELS.cancelReadTaskBtn.setAttribute("id", "cancel-edit-task-btn");
        ELS.cancelEditTaskBtn = document.querySelector("#cancel-edit-task-btn");
        break;
      case "confirm-edit-task-btn":
        if (!ELS.readTodoForm.checkValidity()) return;
        e.preventDefault();

        editTodo(
          todoList[targetIndex],
          ELS.readTodoTitle.value,
          ELS.readTodoDescription.value,
          ELS.readTodoDate.value,
          ELS.readTodoPriority.value,
        );

        updateTodoList(todoList, ELS.content, STATE.startDate, STATE.endDate);

        ELS.readTodoModal.close();

        resetReadTodoForm();
        break;
      case "cancel-edit-task-btn":
        ELS.readTodoModal.close();

        resetReadTodoForm();
        break;
    }
  });

  document.addEventListener("keydown", (e) => {
    if (!ELS.confirmEditTodoBtn || e.key !== "Escape") return;
    e.preventDefault();

    ELS.readTodoModal.close();

    resetReadTodoForm();
  });
}

export { updateReadTodoModal, addReadTodoModalListeners };
