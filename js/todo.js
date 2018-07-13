let TODOS = [];

function update() {
    const $todoList = document.querySelector('.todo-list');
    $todoList.innerHTML = '';
    for (const item of TODOS) {
        const $li = document.createElement('li');
        $li.setAttribute('item-id', item.id);
        if (item.done) {
            $li.classList.add('completed');
        }
        $todoList.appendChild($li);

        // Toggle btn
        const $toggle = document.createElement('input');
        $toggle.className = 'toggle';
        $toggle.setAttribute('type', 'checkbox');
        if (item.done) {
            $toggle.setAttribute('checked', 'checked');
        }
        $toggle.addEventListener('change', onToggleTodo.bind(null, item.id));
        $li.appendChild($toggle);

        // Label
        const $label = document.createElement('label');
        $label.innerHTML = item.title;
        $li.appendChild($label);

        // Delete
        const $button = document.createElement('button');
        $button.className = 'destroy';
        $li.appendChild($button);
        $button.addEventListener('click', onDeleteItem.bind(null, item.id));
    }

    // Filter !done TODOS
    const $notDoneTodos = TODOS.filter(item => !item.done).length;
    // Output on singular || prular !done TODOS
    const $todoCount = document.querySelector('.todo-count');
    if ($notDoneTodos === 1) {
        $todoCount.innerHTML = $notDoneTodos + ' item left';
    } else {
        $todoCount.innerHTML = $notDoneTodos + ' items left';
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
        document.querySelector('.main').style.display = 'none';
    } else {
        document.querySelector('.main').style.display = 'block';
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

function onDeleteItem(id) {
    TODOS = TODOS.filter(item => item.id !== id);
    update();
}

function onClearCompleted() {
    TODOS = TODOS.filter(item => !item.done);
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
    e.target.value = '';
}

// Select the new todo input field
const $newTodo = document.querySelector('.new-todo');
$newTodo.addEventListener('change', onNewTodo);
const $clearCompleted = document.querySelector('.clear-completed');
$clearCompleted.addEventListener("click", onClearCompleted);

// END OF HW
