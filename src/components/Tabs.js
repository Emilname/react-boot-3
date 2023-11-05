class Tabs {
  activeTabKey = null;
  constructor(root) {
    this.root = root;
  }

  get tabs() {
    return this.root.tabs;
  }
  get tabsContainer() {
    return this.root.tabsContainer;
  }

  get tabPanelsContainer() {
    return this.root.tabPanelsContainer;
  }

  get tabPanels() {
    return this.root.tabPanels;
  }

  setActiveTab = (newActiveTab) => {
    const newActiveTabKey = newActiveTab.dataset.tabkey;
    if (this.activeTabKey !== newActiveTabKey) {
      [...this.tabs].forEach((tab) =>
        tab === newActiveTab
          ? (tab.dataset.active = "true")
          : delete tab.dataset.active
      );
      this.chageTabPanel(newActiveTabKey);
    }
    this.activeTabKey = newActiveTabKey;
  };

  chageTabPanel = (tabKey) => {
    [...this.tabPanels].forEach((tabPanel) => {
      console.log(tabPanel, tabPanel.dataset.tabkey);
      if (tabKey !== tabPanel.dataset.tabkey) {
        delete tabPanel.dataset.active;
      } else {
        tabPanel.dataset.active = "true";
      }
    });
  };

  init = () => {
    [...this.tabs].forEach((tab, i) => {
      tab.addEventListener("click", (e) => this.setActiveTab(e.target));
      if (tab.dataset.tabkey == null) {
        tab.dataset.tabkey = i;
      }
      if (tab.dataset.active || tab.classList.contains("active")) {
        this.setActiveTab(tab);
      }
    });
  };
}

export default Tabs;
