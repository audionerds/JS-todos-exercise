//selects IDs and assigns to variables
const form = document.querySelector("#todo-form");
const input = document.querySelector("#new-todo");
const todoList = document.querySelector("#todo-list");

// input form for todos
form.addEventListener("submit", function (e) {
  e.preventDefault();
  const newToDo = document.createElement("li");
  const removeBtn = document.createElement("button");
  removeBtn.innerText = "Clear";

  newToDo.innerText = input.value;
  newToDo.appendChild(removeBtn);
  todoList.appendChild(newToDo);
  input.value = "";
  savedTodos();
});

//Toggles line through list item
todoList.addEventListener("click", function (e) {
  if (e.target.tagName === "BUTTON") {
    e.target.parentElement.remove();
  } else if (e.target.tagName === "LI") {
    e.target.classList.toggle("completed");
  }
  savedTodos();
});

//saves list itemss
function savedTodos() {
  const todos = [];
  for (let li of todoList.children) {
    let todo = {
      text: li.innerText.replace("Clear", "").trim(),
      checked: li.classList.contains("completed"),
    };
    todos.push(todo);
  }
  localStorage.setItem("todos", JSON.stringify(todos));
}

//loads saved list items
document.addEventListener("DOMContentLoaded", loadTodos);

function loadTodos() {
  const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
  for (const todo of savedTodos) {
    const newToDo = document.createElement("li");
    const removeBtn = document.createElement("button");
    removeBtn.innerText = "Clear";
    newToDo.innerText = todo.text;
    newToDo.appendChild(removeBtn);
    if (todo.checked) {
      newToDo.classList.add("completed");
    }
    todoList.appendChild(newToDo);
  }
}
