// Define UI Variables

const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

//Load all event listeners
loadEventlisteners();

//Load all event listeners
function loadEventlisteners() {
  //add task event
  form.addEventListener("submit", addTask);
}

function addTask(e) {
  if (taskInput.value == "") {
    alert("Add a task");
  }

  //create LI element
  const li = document.createElement("li");
  //add class
  li.className = "collection-item";
  //create text node and append to li
  li.appendChild(document.createTextNode(taskInput.value));
  //Create new Link Element
  const link = document.createElement("a");
  //add class
  link.className = "delete-item secondary-content";
  //Icon Html
  link.innerHTML = "<i class='far fa-trash-alt'></i>";
  //append link to LI
  li.appendChild(link);

  //append LI to UL
  taskList.appendChild(li);

  //clear Input
  taskInput.value = "";
  e.preventDefault();
}
