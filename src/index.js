import "./styles/reset.css";
import "./styles/style.css";

const addProjectDialog = document.querySelector("#add-project-dialog");
const addProjectBtn = document.querySelector("#add-project-btn");

addProjectBtn.addEventListener("click", () => {
  addProjectDialog.showModal();
});
