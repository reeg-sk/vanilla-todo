import "./styles/App.css";
import "./styles/Header.css";
import "./styles/List.css";
import axios from "axios";
import "@babel/polyfill";

const getTodos = async () => {
  const result = await axios.get("http://localhost:3000/todos");
  result.data.map((todo) => todos.push(todo.Title));
  todos.forEach(renderTodos);
};

let todos = [];

function getInputValue(event) {
  let inputValue = event.target.value;
  console.log(inputValue);
}

function renderTodos(todo) {
  const list = document.getElementById("list");
  const listItem = document.createElement("li");
  list.appendChild(listItem);
  listItem.innerHTML = todo;
}

window.getInputValue = getInputValue;
getTodos();
