// Your code goes here!
let TODOS = [];

function update() {
    const $todoList = document.querySelector('.todo-list');
    $todoList.innerHTML = '';
    for (const item of TODOS) {
        console.log(item);
        const $li = document.createElement('li');
        $li.innerHTML = item;
        $todoList.appendChild($li);
    }
    document.querySelector('.main').style.display = 'block';
}

function onNewTodo(e) {
    const title = e.target.value;
    console.log(title);
    // same as this line
    // document.querySelector('.new-todo').value;
    TODOS.push(title);
    update();
}

// Select the new todo input field
const $newTodo = document.querySelector('.new-todo');
$newTodo.addEventListener('change', onNewTodo);