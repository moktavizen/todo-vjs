import "./styles/reset.css";
import "./styles/style.css";
import { init } from "./init.js";

init();

// TODO: Add switch page logic

const addProjectDialog = document.querySelector("#add-project-dialog");
const addProjectBtn = document.querySelector("#add-project-btn");

addProjectBtn.addEventListener("click", () => {
  addProjectDialog.showModal();
});
