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
    console.log(todoItems);
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
})


console.log("hello World")