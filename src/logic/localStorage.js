import { addProject } from "./project.js";
import { addTodo } from "./todo.js";
import { endOfToday, endOfTomorrow, endOfYesterday, set } from "date-fns";

function saveListToStorage(listName, list) {
  localStorage.setItem(listName, JSON.stringify(list));
}

function getListFromStorage(listName) {
  return JSON.parse(localStorage.getItem(listName));
}

function initLocalStorage() {
  if (!localStorage.getItem("projectList") && !localStorage.getItem("todoList")) {
    addProject("Foo App");
    addProject("Bar App");

    addTodo(
      "Task for today",
      "Lorem ipsum dolor sit amet",
      set(endOfToday(), { hours: 7, minutes: 0 }),
      "Medium",
      "",
    );
    addTodo(
      "Task for upcoming days, for Foo App project",
      "Distinctio porro dolor cumque reprehenderit",
      set(endOfTomorrow(), { hours: 8, minutes: 0 }),
      "Low",
      "Foo App",
    );
    addTodo(
      "Task for past days",
      "Tempore praesentium ut explicabo neque!",
      set(endOfYesterday(), { hours: 6, minutes: 0 }),
      "High",
      "",
    );
  }
}

export { saveListToStorage, getListFromStorage, initLocalStorage };
