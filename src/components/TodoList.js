import Todo from "./Todo.js";
import RootHtml from "../utils/RootHtml.js";

const TODOS_DATA_KEY = "todo";

class TodoList {
  constructor(storage, sorter) {
    this.storage = storage;
    this.extractTodos();
    this.sorter = sorter;
  }

  init = () => {
    this.render();
    this.addSubmitListener();
    this.addDoneSortListener();
    this.addTimeSortListener();
  };

  addDoneSortListener = () => {
    RootHtml.sortByDoneButton.addEventListener("click", () => {
      this.sortByField("done");
    });
  };

  addTimeSortListener = () => {
    RootHtml.sortByTimeButton.addEventListener("click", () => {
      this.sortByField("time");
    });
  };

  sortByField = (key) => {
    this.todos = this.sorter.sortByField(key, this.todos);
    this.render();
  };

  addSubmitListener = () => {
    RootHtml.todoForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const todoText = RootHtml.todoTextInput.value;
      const todoTime = RootHtml.todoTimeInput.value;
      const trimmedText = todoText.trim();

      const todo = new Todo({
        text: trimmedText,
        time: todoTime,
      });

      if (trimmedText) {
        this.todos.push(todo);
        this.saveTodos();

        RootHtml.todoTextInput.value = "";
        RootHtml.todoTimeInput.value = "";
        RootHtml.todoTextInput.focus();
      }

      this.render();
    });
  };

  render = () => {
    RootHtml.todoListContainer.innerHTML = "";

    this.todos.forEach((todo) => {
      const todoElement = todo.render();
      todoElement.addEventListener("click", this.todoItemListener);
      RootHtml.todoListContainer.appendChild(todoElement);
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

    RootHtml.timeSum.textContent = timeSumNonCompletedTodos;
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

      this.render();
    } else if (isDoneButton) {
      this.todos.forEach((todo) => {
        if (todo.id === Number(parentNodeId)) {
          todo.done = !todo.done;
        }
      });

      this.render();
    }
  };

  extractTodos() {
    this.todos = this.storage.getData(TODOS_DATA_KEY) || [];
  }

  saveTodos() {
    this.storage.setData(this.todos);
  }
}

export default TodoList;
