const todos = [
  {
    task: "Go for walk",
    isDone: false,
    createdAt: new Date(),
    id: "1tsegfc",
  },
  {
    task: "Do Yoga",
    isDone: true,
    createdAt: new Date("2026-06-21"),
    id: "2hncg",
  },
  {
    task: "Drink Water",
    isDone: true,
    createdAt: new Date("2026-06-20"),
    id: "3vfredc",
  },
];

const showTodos = () => {
  const todoListEl = document.querySelector("#todo-list");
  todoListEl.replaceChildren();

  todos.forEach((todo) => {
    const todoEl = document.createElement("li");
    todoEl.className = `todo-item ${todo.isDone ? "finished-todo" : "pending-todo"}`;

    const todoTitleEl = document.createElement("p");
    todoTitleEl.innerText = todo.task;
    todoTitleEl.className = "todo-title";

    const actions = document.createElement("div");
    actions.className = "action-btns";

    const finishBtn = document.createElement("button");
    finishBtn.innerHTML = `<span class="finish-btn">Finish</span>✓`;
    finishBtn.dataset.todoId = todo.id;

    const undoBtn = document.createElement("button");
    undoBtn.innerHTML = `<span class="undo-btn">Undo</span>↩`;
    undoBtn.dataset.todoId = todo.id;

    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = `<span class="delete-btn">Delete</span>❌`;
    deleteBtn.dataset.todoId = todo.id;

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

showTodos();
