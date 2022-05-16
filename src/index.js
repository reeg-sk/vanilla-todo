import "./styles/App.css";
import "./styles/Header.css";
import "./styles/List.css";

const todos = ["My first TODO", "My second TODO"];

function getInputValue(event) {
  let inputValue = event.target.value;
  console.log(inputValue);
}

todos.forEach(renderTodos);

function renderTodos(todo) {
  const list = document.getElementById("list");
  const listItem = document.createElement("li");
  list.appendChild(listItem);
  listItem.innerHTML = todo;
}

window.getInputValue = getInputValue;
