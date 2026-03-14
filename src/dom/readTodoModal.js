import { ELS } from "../globals.js";

function updateReadTodoModal({ title, description, dueDate, priority } = {}) {
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

export { updateReadTodoModal };
