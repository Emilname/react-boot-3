const $ = (selector) => document.querySelector(selector);

const sortByDoneButton = $(".todo__sort-button.done");
const sortByTimeButton = $(".todo__sort-button.time");
const todoTextInput = $(".todo__text-input");
const todoTimeInput = $(".todo__time-input");
const todoList = $(".todo__list");
const todoForm = $(".todo__form");
const timeValue = $(".todo__time-value");

const sortOrders = {
  ASC: "asc",
  DESC: "desc",
};

Object.freeze(sortOrders);

class Sorter {
  sortedFieldKey = null;
  sortOrder = sortOrders.ASC;

  constructor() {
    this.setDefaultSortOrder();
  }

  setDefaultSortOrder = () => {
    this.sortOrder = sortOrders.ASC;
  };

  sortAsc = (a, b) => {
    return Number(b[this.sortedFieldKey]) - Number(a[this.sortedFieldKey]);
  };
  sortDesc = (a, b) => {
    return Number(a[this.sortedFieldKey]) - Number(b[this.sortedFieldKey]);
  };

  switchSortOrder = () => {
    if (this.sortOrder == sortOrders.ASC) {
      this.sortOrder = sortOrders.DESC;
    } else {
      this.sortOrder = sortOrders.ASC;
    }
  };

  sortByField = (fieldKey, list) => {
    if (this.sortedFieldKey == fieldKey) {
      this.switchSortOrder();
    } else {
      this.setDefaultSortOrder();
    }
    this.sortedFieldKey = fieldKey;
    return list.sort(
      this.sortOrder == sortOrders.ASC ? this.sortAsc : this.sortDesc
    );
  };
}

class Todo {
  constructor({ id, text = "", done = false, time = "0" }) {
    this.id = id ?? Date.now();
    this.text = text;
    this.done = done;
    this.time = time;
  }

  render() {
    const liElement = document.createElement("li");

    liElement.id = this.id;
    liElement.classList.add("todo__item");

    if (this.done) {
      liElement.classList.add("done");
    }

    const todoTemplate = `
        <span class="todo__item-text">${this.text}</span>
        ${this.time ? `<span class="todo__item-time">${this.time}</span>` : ""}
        <div class="todo__controls">
          <button class="todo__done-button">Выполнено</button>
          <button class="todo__remove-button">Удалить</button>
        </div>
      `;

    liElement.innerHTML = todoTemplate;

    return liElement;
  }

  toString() {
    return JSON.stringify({ ...this });
  }
}

class LStorage {
  getTodos() {
    const todos = localStorage.getItem("todos");
    const parsedTodos = JSON.parse(todos).map((todo) => new Todo(todo));

    return parsedTodos;
  }

  setTodos(todos) {
    const todosString = JSON.stringify(todos);

    localStorage.setItem("todos", todosString);
  }
}

class TodoList {
  constructor(storage) {
    this.storage = storage;
    this.todos = this.storage.getTodos() || [];
    this.sorter = new Sorter();
  }

  init = () => {
    this.render();
    this.addSubmitListener();
    this.addDoneSortListener();
    this.addTimeSortListener();
  };

  addDoneSortListener = () => {
    sortByDoneButton.addEventListener("click", () => {
      this.sortByField("done");
    });
  };

  addTimeSortListener = () => {
    sortByTimeButton.addEventListener("click", () => {
      this.sortByField("time");
    });
  };

  sortByField = (key) => {
    this.todos = this.sorter.sortByField(key, this.todos);
    this.render();
  };

  addSubmitListener = () => {
    todoForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const todoText = todoTextInput.value;
      const todoTime = todoTimeInput.value;
      const trimmedText = todoText.trim();

      const todo = new Todo({
        text: trimmedText,
        time: todoTime,
      });

      if (trimmedText) {
        this.todos.push(todo);

        todoTextInput.value = "";
        todoTimeInput.value = "";
        todoTextInput.focus();
      }

      this.render();
    });
  };

  render = () => {
    todoList.innerHTML = "";

    this.todos.forEach((todo) => {
      const todoElement = todo.render();
      todoElement.addEventListener("click", this.todoItemListener);
      todoList.appendChild(todoElement);
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

    this.storage.setTodos(this.todos);

    timeValue.textContent = timeSumNonCompletedTodos;
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
}

const storage = new LStorage();

const list = new TodoList(storage);

list.init();
