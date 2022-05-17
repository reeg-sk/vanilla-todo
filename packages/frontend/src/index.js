import "./styles/App.css";
import "./styles/Header.css";
import "./styles/List.css";
import axios from "axios";
import "@babel/polyfill";

const todoForm = document.getElementById("new_todo_form");
const todoList = document.getElementById("todo_list");

todoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const newTodoInputValue = todoForm.elements.todo_input;
  axios
    .post("http://localhost:3000/todos", {
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
  const todos = await getAllTodos();
  todos.forEach((todo) => {
    addTodo(todo.title);
  });
}

function addTodo(newTodo) {
  const newTodoItem = document.createElement("li");
  newTodoItem.setAttribute("class", "list-item");

  const newTodoText = document.createElement("span");
  newTodoText.innerText = newTodo;

  todoList.appendChild(newTodoItem);
  newTodoItem.appendChild(newTodoText);
}

function getAllTodos() {
  return axios.get("http://localhost:3000/todos").then((res) => res.data);
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
