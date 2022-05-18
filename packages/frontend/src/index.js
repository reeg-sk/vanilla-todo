import "./styles/App.css";
import "./styles/Header.css";
import "./styles/List.css";
import api from "./api/api";
import "@babel/polyfill";

let todos = [];

const todoForm = document.getElementById("new_todo_form");
const todoList = document.getElementById("todo_list");
const todoListItems = document.querySelectorAll(".list-item");
console.log(todoListItems);

todoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const newTodoInputValue = todoForm.elements.todo_input;
  api
    .post("/todos", {
      title: newTodoInputValue.value,
      isDone: 0,
    })
    .then(() => {
      renderTodos();
      newTodoInputValue.value = "";
    })
    .catch((err) => console.log(err));
});

async function renderTodos() {
  while (todoList.firstChild) {
    todoList.firstChild.remove();
  }
  await getAllTodos();
  todos.forEach((todo) => {
    addTodo(todo);
  });
}

function addTodo(newTodo) {
  const newTodoItem = document.createElement("li");
  newTodoItem.setAttribute("class", "list-item");
  newTodoItem.setAttribute("tabindex", "0");

  if (newTodo.isDone) newTodoItem.classList.add("list-item__done");

  const newTodoText = document.createElement("span");
  newTodoText.innerText = newTodo.title;

  const newTodoDelete = document.createElement("a");
  newTodoDelete.setAttribute("class", "list-delete");
  newTodoDelete.setAttribute("title", "Delete Todo");

  newTodoDelete.innerText = "X";

  todoList.appendChild(newTodoItem);
  newTodoItem.appendChild(newTodoText);
  newTodoItem.appendChild(newTodoDelete);

  newTodoItem.addEventListener("keyup", function (e) {
    switch(e.code) {
      case 'Space':
        updateTodo();
        break;
      case 'Delete':
        deleteTodo(e)
        break;

      default:
        break;
    }
  })

  newTodoItem.addEventListener("click", function () {
    updateTodo();
  });

  newTodoDelete.addEventListener("click", function (e) {
    deleteTodo(e);
  });

  function deleteTodo(e) {
    e.stopPropagation();
      const todoToDelete = todos.filter(
        (todo) => todo.title === newTodo.title
      )[0];
      api.delete(`/todo/${todoToDelete.id}`).then(() => renderTodos());
  }
  
  function updateTodo() {
    const todoToUpdate = todos.filter(
      (todo) => todo.title === newTodo.title
    )[0];
    let valueToUpdate;
    if (todoToUpdate.isDone === 0) valueToUpdate = 1;
    else valueToUpdate = 0;
    api
      .patch(`/todo/${todoToUpdate.id}/isdone`, {
        isDone: valueToUpdate,
      })
      .then(() => renderTodos());
  }
}

function getAllTodos() {
  return api.get("/todos").then((res) => {
    todos = res.data;
    console.log(todos);
  });
}

renderTodos();

// WITHOUT DB
// todoForm.addEventListener("submit", (e) => {
//   e.preventDefault();
//   const newTodoInputValue = todoForm.elements.todo_input;
//   addTodo(newTodoInputValue.value);
//   newTodoInputValue.value = "";
// });

// function addTodo(newTodo) {
//   const newTodoItem = document.createElement("li");
//   newTodoItem.setAttribute("class", "list-item");

//   const newTodoText = document.createElement("span");
//   newTodoText.innerText = newTodo;

//   todoList.appendChild(newTodoItem);
//   newTodoItem.appendChild(newTodoText);
// }
