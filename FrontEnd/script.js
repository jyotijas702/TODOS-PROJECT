const BASE_URL = "http://localhost:3000";
let TODOS = [];

const showTodos = () => {
  const todoListEl = document.querySelector("#todo-list");
  todoListEl.replaceChildren();

  TODOS.toSorted((a, b) => a.isDone - b.isDone).forEach((todo) => {
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
    deleteBtn.innerHTML = `<span class="action-btn-text">Delete</span>⌫`;
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

const addTodo = async (content) => {
  if (content === "") {
    alert("Content can not be blank!");
    return;
  }

  const response = await fetch(BASE_URL + "/todos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ task: content }),
  });
  const newTodo = await response.json();

  TODOS.push(newTodo);
  showTodos();
};

const deleteTodo = async (id) => {
  const response = await fetch(`${BASE_URL}/todos/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    alert("Failed to delete todo!");
    return;
  }

  TODOS = TODOS.filter((todo) => todo.id !== id);
  showTodos();
};

const finishTodo = async (id) => {
  const response = await fetch(`${BASE_URL}/todos/${id}/finish`, {
    method: "PATCH",
  });

  if (!response.ok) {
    alert("Failed to finish todo!");
    return;
  }
  targetTodo = TODOS.find((todo) => todo.id === id);
  targetTodo.isDone = true;
  showTodos();
};

const undoTodo = async (id) => {
  const response = await fetch(`${BASE_URL}/todos/${id}/undo`, {
    method: "PATCH",
  });

  if (!response.ok) {
    alert("Failed to undo todo!");
    return;
  }
  targetTodo = TODOS.find((todo) => todo.id === id);
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
  TODOS = fetchedTodos;
  showTodos();
});

const input = document.querySelector("#todo-input");
input.addEventListener("keydown", (e) => {
  if (event.key !== "Enter") return;

  const content = e.target.value.trim();
  addTodo(content);
  input.value = "";
});
