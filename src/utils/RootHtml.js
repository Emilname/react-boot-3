import $ from "./$.js";

class RootHtml {
  static get sortByDoneButton() {
    return $(".todo__sort-button.done");
  }
  static get sortByTimeButton() {
    return $(".todo__sort-button.time");
  }
  static get todoTextInput() {
    return $(".todo__text-input");
  }
  static get todoTimeInput() {
    return $(".todo__time-input");
  }
  static get todoListContainer() {
    return $(".todo__list");
  }
  static get todoForm() {
    return $(".todo__form");
  }
  static get timeSum() {
    return $(".todo__time-sum");
  }
}

export default RootHtml;
