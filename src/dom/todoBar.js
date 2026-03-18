import { format } from "date-fns";
import { ELS } from "../globals.js";

function todoBar({ id, title, dueDate, priority } = {}) {
  const todoBarDiv = document.createElement("div");

  todoBarDiv.classList = `todo-bar ${priority.toLowerCase()}-priority`;
  todoBarDiv.innerHTML = `
    <span class="due-date">${format(dueDate, "dd/MM-kk:mm")}</span><span class="title">${title}</span
    ><button class="todo-btn expand" data-todo-id="${id}">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="lucide lucide-maximize2-icon lucide-maximize-2"
      >
        <path d="M15 3h6v6" />
        <path d="m21 3-7 7" />
        <path d="m3 21 7-7" />
        <path d="M9 21H3v-6" />
      </svg>
    </button>
    <button class="todo-btn done" data-todo-id="${id}">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="lucide lucide-check-icon lucide-check"
      >
        <path d="M20 6 9 17l-5-5" />
      </svg>
    </button>
    <button class="todo-btn delete" data-todo-id="${id}">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="lucide lucide-x-icon lucide-x"
      >
        <path d="M18 6 6 18" />
        <path d="m6 6 12 12" />
      </svg>
    </button>
  `;

  ELS.content.appendChild(todoBarDiv);
}

export { todoBar };
