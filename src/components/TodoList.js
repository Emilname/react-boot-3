import Todo from "./Todo.js";

const TODOS_DATA_KEY = "todo";

class TodoList {
  constructor(storage, sorter, root) {
    this.storage = storage;
    this.extractTodos();
    this.sorter = sorter;
    this.root = root;
  }

  init = () => {
    this.render();
    this.addSubmitListener();
    this.addDoneSortListener();
    this.addTimeSortListener();
  };

  addDoneSortListener = () => {
    this.root.sortByDoneButton.addEventListener("click", () => {
      this.sortByField("done");
    });
  };

  addTimeSortListener = () => {
    this.root.sortByTimeButton.addEventListener("click", () => {
      this.sortByField("time");
    });
  };

  sortByField = (key) => {
    this.todos = this.sorter.sortByField(key, this.todos);
    this.render();
  };

  addSubmitListener = () => {
    this.root.todoForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const todoText = this.root.todoTextInput.value;
      const todoTime = this.root.todoTimeInput.value;
      const trimmedText = todoText.trim();

      const todo = new Todo({
        text: trimmedText,
        time: todoTime,
      });

      if (trimmedText) {
        this.todos.push(todo);
        this.saveTodos();

        this.root.todoTextInput.value = "";
        this.root.todoTimeInput.value = "";
        this.root.todoTextInput.focus();
      }

      this.render();
    });
  };

  render = () => {
    this.root.todoListContainer.innerHTML = "";

    this.todos.forEach((todo) => {
      const todoElement = todo.render();
      todoElement.addEventListener("click", this.todoItemListener);
      this.root.todoListContainer.appendChild(todoElement);
    });

    const timeSumNonCompletedTodos = this.todos.reduce(function (
      acc,
      curr,
      idx
    ) {
      if (!curr.done) {
        acc += Number(curr.time);
      }

      return acc;
    },
    0);

    this.root.timeSum.textContent = timeSumNonCompletedTodos;
  };

  todoItemListener = (event) => {
    const current = event.target;
    const parentNode = current.closest("li");
    const isDeleteButton = event.target.closest(".todo__remove-button");
    const isDoneButton = event.target.closest(".todo__done-button");
    const parentNodeId = parentNode.id;

    if (isDeleteButton) {
      this.todos = this.todos.filter((todo) => {
        return todo.id !== Number(parentNodeId);
      });
    } else if (isDoneButton) {
      this.todos.forEach((todo) => {
        if (todo.id === Number(parentNodeId)) {
          todo.done = !todo.done;
        }
      });
    }
    this.render();
  };

  extractTodos() {
    this.todos = (this.storage.getData(TODOS_DATA_KEY) || []).map(
      (todoData) => new Todo(todoData)
    );
  }

  saveTodos() {
    this.storage.setData(TODOS_DATA_KEY, this.todos);
  }
}

export default TodoList;
