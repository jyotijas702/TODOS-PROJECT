const BASE_URL = "http://localhost:3000";
let todos = [];

const showTodos = () => {
  const todoListEl = document.querySelector("#todo-list");
  todoListEl.replaceChildren();

  todos
    .toSorted((a, b) => a.isDone - b.isDone)
    .forEach((todo) => {
      const todoEl = document.createElement("li");
      todoEl.className = `todo-item ${todo.isDone ? "finished-todo" : "pending-todo"}`;

      const todoTitleEl = document.createElement("p");
      todoTitleEl.innerText = todo.task;
      todoTitleEl.className = "todo-title";

      const actions = document.createElement("div");
      actions.className = "action-btns";

      const finishBtn = document.createElement("button");
      finishBtn.className = "finish-btn";
      finishBtn.innerHTML = `<span class="action-btn-text">Finish</span>✓`;
      finishBtn.onclick = () => finishTodo(todo.id);

      const undoBtn = document.createElement("button");
      undoBtn.className = "undo-btn";
      undoBtn.innerHTML = `<span class="action-btn-text">Undo</span>↩`;
      undoBtn.onclick = () => undoTodo(todo.id);

      const deleteBtn = document.createElement("button");
      deleteBtn.className = "delete-btn";
      deleteBtn.innerHTML = `<span class="action-btn-text">Delete</span>❌`;
      deleteBtn.onclick = () => deleteTodo(todo.id);

      if (todo.isDone) {
        actions.appendChild(undoBtn);
      } else {
        actions.appendChild(finishBtn);
      }
      actions.appendChild(deleteBtn);

      todoEl.appendChild(todoTitleEl);
      todoEl.appendChild(actions);
      todoListEl.appendChild(todoEl);
    });
};

const addTodo = (content) => {
  if (content === "") {
    alert("Content can not be blank!");
    return;
  }

  todos.push({
    task: content,
    isDone: false,
    createdAt: new Date(),
    id: "sample" + Math.random(),
  });

  showTodos();
};

const deleteTodo = (id) => {
  todos = todos.filter((todo) => todo.id !== id);
  showTodos();
};

const finishTodo = (id) => {
  targetTodo = todos.find((todo) => todo.id === id);
  targetTodo.isDone = true;
  showTodos();
};

const undoTodo = (id) => {
  targetTodo = todos.find((todo) => todo.id === id);
  targetTodo.isDone = false;
  showTodos();
};

const fetchTodos = async () => {
  try {
    const response = await fetch(BASE_URL + "/todos");
    return await response.json();
  } catch {
    alert("Unable to fetch todos!");
    return [];
  }
};

// initialization process
fetchTodos().then((fetchedTodos) => {
  todos = fetchedTodos;
  showTodos();
});

const input = document.querySelector("#todo-input");
input.addEventListener("keydown", (e) => {
  if (event.key !== "Enter") return;

  const content = e.target.value.trim();
  addTodo(content);
  input.value = "";
});
