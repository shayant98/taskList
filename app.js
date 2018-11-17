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
  //remove task event
  taskList.addEventListener("click", removeTask);
  //clear task event
  clearBtn.addEventListener("click", clearTasks);
  //filter task event
  filter.addEventListener("keyup", filterTasks);
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

//remove task
function removeTask(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    if (confirm("are you sure!")) {
      e.target.parentElement.parentElement.remove();
    }
  }
}

//clear tasks
function clearTasks() {
  // taskList.innerHTML = "";
  //faster

  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }
}

function filterTasks(e) {
  let text = e.target.value.toLowerCase();
  console.log(text);

  document.querySelectorAll(".collection-item").forEach(task => {
    item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
}
