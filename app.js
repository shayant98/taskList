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
  //DOM Load Event
  document.addEventListener("DOMContentLoaded", getTasks);
  //add task event
  form.addEventListener("submit", addTask);
  //remove task event
  taskList.addEventListener("click", removeTask);
  //clear task event
  clearBtn.addEventListener("click", clearTasks);
  //filter task event
  filter.addEventListener("keyup", filterTasks);
}

// get tasks from LS
function getTasks() {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(task => {
    //create LI element
    const li = document.createElement("li");
    //add class
    li.className = "collection-item";
    //create text node and append to li
    li.appendChild(document.createTextNode(task));
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
  });
}

//insert tasks
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

  //store in ls
  storeTaskInLocalStorage(taskInput.value);

  //clear Input
  taskInput.value = "";
  e.preventDefault();
}

//store in ls
function storeTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.push(task);

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

//remove task
function removeTask(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    if (confirm("are you sure!")) {
      e.target.parentElement.parentElement.remove();
      // remove from ls
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach((task, index) => {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

//clear tasks
function clearTasks() {
  // taskList.innerHTML = "";
  //faster

  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }

  clearFromLocalStorage();
}

//clear tasks from LS
function clearFromLocalStorage() {
  localStorage.clear();
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
