// Your code goes here!
const TODOS = [];

function update() {
    const $todoList = document.querySelector('.todo-list');
    $todoList.innerHTML = '';
    for (const item of TODOS) {
        const $li = document.createElement('li');
        // $li.innerHTML = item.title;
        $li.classList.add('completed');
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

    }
    document.querySelector('.main').style.display = 'block';
}

function onToggleTodo(id) {
    const todo = TODOS.find(todo => todo.id === id);
    todo.done = !todo.done;
    update();
}

function onNewTodo(e) {
    const title = e.target.value;
    // same as this line
    // document.querySelector('.new-todo').value;
    TODOS.push(title);
    TODOS.push({
        id: Date.now(),
        title, // Same as title: title,
        done: false
    });
    update();
    e.target.value = '';
}

// Select the new todo input field
const $newTodo = document.querySelector('.new-todo');
$newTodo.addEventListener('change', onNewTodo);


// Homework
// inline mark/unmark checked items
// number  of items with correct plural/singular
// FILTER active / completed sections
// FILTER clear completed function