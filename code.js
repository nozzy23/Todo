function renderTodo(todo){
    localStorage.setItem('todoItemsRef',JSON.stringify(todoItems));
    const list= document.querySelector('.js-todo-list');
    const item = document.querySelector(`[data-key='${todo.id}']`)

    if (todo.deleted) {
        item.remove();
        return
    }


    // creating a if else statement making sure todocheck is true
    const isChecked = todo.checked ? 'done' : '';
    //this is creating a li list
    const node = document.createElement("li");
    // this set the class attribution of the li we are creating 
    node.setAttribute('class', `todo-item ${isChecked}`);
    node.setAttribute('data-key', todo.id);
    // content of the li is set using the innerhtml method 
    node.innerHTML = `
    <input id="${todo.id}" type="checkbox"/>
    <label for = "${todo.id}" class="tick js-tick"></label>
    <span>${todo.text}</span>
    <button class="delete-todo js-delete-todo">
    <svg><use href="#delete-icon"></use></svg>
    </button>
    `;

    if(item){
        list.replaceChild(node, item)
    } else {
        list.append(node);
    }
    list.append(node);
}




// Initial array where the user puts task from text input

let todoItems =[];

// This function creates a new object from the text field and pushes it into the todoItems array 

function addTodo(text) {
    //this is the object
    const todo = {
        text,
        checked: false,
        id: Date.now(),
    };

    todoItems.push(todo);
    renderTodo(todo);
}

function toggleDone(key) {
    const index = todoItems.findIndex(item => item.id === Number(key));
    todoItems[index].checked = !todoItems[index].checked;
    renderTodo(todoItems[index]);
}

// Element coming from the form in my HTML
const form = document.querySelector('.js-form');
//added the listener basically paying attention to when it gets clicked
form.addEventListener('submit', event => {
    //this stopes the page from refreshing when the customer submits a new todo
    event.preventDefault();
    // this will select the text input
    const input = document.querySelector('.js-todo-input');
    // this will get the value of what is in the field and remove white space with trim function
    const text = input.value.trim();
    if (text !== '') {
        addTodo(text);
        input.value='';
        input.focus();
    }
});


function deleteTodo(key){
    const index= todoItems.findIndex(item => item.id === Number(key));
    const todo ={
        deleted:true,
        ...todoItems[index] 
    };
    todoItems = todoItems.filter(item => item.id !== Number(key));
    renderTodo(todo);
}

const list = document.querySelector('.js-todo-list');
    list.addEventListener('click', event => {
        if (event.target.classList.contains('js-tick')){
            const itemKey = event.target.parentElement.dataset.key;
            toggleDone(itemKey);
        }

        if(event.target.classList.contains('js-delete-todo')){
            const itemKey = event.target.parentElement.dataset.key;
            deleteTodo(itemKey);
        }
    });

    document.addEventListener('DOMcontentLoaded', () => {
        const ref= localStorage.getItem('todoItemsRef');
        if (ref) {
            todoItems = JSON.parse(ref);
            todoItems.forEach(t =>{
                renderTodo(t);
            })
        }
    })

console.log("hello World")