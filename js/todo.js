let TODOS = [];

let FILTER = "all";

let EDITING_ID = null;

function update() {
  const $todoList = document.querySelector(".todo-list");
  $todoList.innerHTML = "";
  let filteredItems = TODOS;
  if (FILTER === "active") {
    filteredItems = TODOS.filter(item => !item.done);
  } else if (FILTER === "completed") {
    filteredItems = TODOS.filter(item => item.done);
  }
  filteredItems.forEach(({
    id,
    title,
    done
  }) => {
    const $li = document.createElement("li");
    $li.setAttribute("item-id", id);
    $li.addEventListener("dblclick", onStartEditing.bind(null, id));
    if (EDITING_ID === id) {
      $li.classList.add("editing");
    }
    if (done) {
      $li.classList.add("completed");
    }
    $todoList.appendChild($li);

    // Toggle btn
    const $toggle = document.createElement("input");
    $toggle.className = "toggle";
    $toggle.setAttribute("type", "checkbox");
    if (done) {
      $toggle.setAttribute("checked", "checked");
    }
    $toggle.addEventListener("change", onToggleTodo.bind(null, id));
    $li.appendChild($toggle);

    // Label
    const $label = document.createElement("label");
    $label.innerHTML = title;
    $li.appendChild($label);

    // Delete
    const $button = document.createElement("button");
    $button.className = "destroy";
    $li.appendChild($button);
    $button.addEventListener("click", onDeleteItem.bind(null, id));

    // Edit
    if (EDITING_ID === id) {
      const $input = document.createElement("input");
      $input.setAttribute("class", "edit");
      $input.addEventListener("change", onEndEditing.bind(null, id));
      $li.appendChild($input);
      $input.value = title;
    }
  });

  // Filter !done TODOS
  const $notDoneTodos = TODOS.filter(item => !item.done).length;
  // Output on singular || plural !done TODOS
  const $todoCount = document.querySelector(".todo-count");
  if ($notDoneTodos === 1) {
    $todoCount.innerHTML = $notDoneTodos + " item left";
  } else {
    $todoCount.innerHTML = $notDoneTodos + " items left";
  }

  // Clear Completed
  const $doneTodos = TODOS.filter(item => item.done).length;
  if ($doneTodos > 0) {
    $clearCompleted.style.display = "block";
  } else {
    $clearCompleted.style.display = "none";
  }

  // Hide display when all todos are deleted
  if (TODOS.length === 0) {
    document.querySelector(".main").style.display = "none";
  } else {
    document.querySelector(".main").style.display = "block";
  }
}

function onToggleTodo(id) {
  const item = TODOS.find(item => item.id === id);
  //SAME AS: TODOS.find(function(item) { return item.id === id; });
  // .find forEach item the item id that match the same (parameter) id we toggled
  item.done = !item.done; // reverse the state of item whether it was true || false
  // SAME AS: if (item.done) {
  //              item.done = false;
  //          } else {
  //              item.done = true;
  //          }
  update();
}

function onNewTodo(e) {
  const title = e.target.value;
  // SAME AS: document.querySelector('.new-todo').value;
  TODOS.push({
    id: Date.now(),
    title, // SAME AS=> title: title,
    done: false
  });
  update();
  e.target.value = "";
}

function onDeleteItem(id) {
  TODOS = TODOS.filter(item => item.id !== id);
  update();
}

function onClearCompleted() {
  TODOS = TODOS.filter(item => !item.done);
  update();
}

// Add class .selected on active filte
//https://stackoverflow.com/questions/46175432/add-active-class-to-current-element-with-js-not-jquery?noredirect=1&lq=1
function onChangeFilter(filter, event) {
  FILTER = filter;
  const anchor = document.getElementsByClassName("selected");
  anchor[0].className = anchor[0].className.replace(/selected/g, "");
  event.target.className += "selected";
  update();
}

// editing todo based on id
function onStartEditing(id) {
  EDITING_ID = id;
  update();
}

// Finish editing
function onEndEditing(id, e) {
  const item = TODOS.find(todo => todo.id === id);
  item.title = e.target.value.trim();
  EDITING_ID = null;
  update();
}

// Select and addEventListener to new todo input field and cleared & filters todos
const $newTodo = document.querySelector(".new-todo");
$newTodo.addEventListener("change", onNewTodo);
const $clearCompleted = document.querySelector(".clear-completed");
$clearCompleted.addEventListener("click", onClearCompleted);
const $all = document.querySelectorAll(".filters a")[0];
const $active = document.querySelectorAll(".filters a")[1];
const $completed = document.querySelectorAll(".filters a")[2];
$all.addEventListener("click", onChangeFilter.bind(null, "all"));
$active.addEventListener("click", onChangeFilter.bind(null, "active"));
$completed.addEventListener("click", onChangeFilter.bind(null, "completed"));
// END OF HW
