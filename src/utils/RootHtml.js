import $ from "./$.js";

class RootHtml {
  get sortByDoneButton() {
    return $(".todo__sort-button.done");
  }
  get sortByTimeButton() {
    return $(".todo__sort-button.time");
  }
  get todoTextInput() {
    return $(".todo__text-input");
  }
  get todoTimeInput() {
    return $(".todo__time-input");
  }
  get todoListContainer() {
    return $(".todo__list");
  }
  get todoForm() {
    return $(".todo__form");
  }
  get timeSum() {
    return $(".todo__time-sum");
  }
  get tabsContainer() {
    return $(".tabs");
  }
  get tabPanelsContainer() {
    return $(".tab-panels");
  }
  get tabs() {
    return $.all(".tab", this.tabsContainer);
  }
  get tabPanels() {
    return $.all(".tab-panel", this.tabPanelsContainer);
  }
  get profileForm() {
    return $(".profile-form");
  }
  get profileFormInputs() {
    return $.all("input, select", this.profileForm);
  }
}

export default RootHtml;
