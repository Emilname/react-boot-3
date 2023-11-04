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
          ${
            this.time ? `<span class="todo__item-time">${this.time}</span>` : ""
          }
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

export default Todo;
