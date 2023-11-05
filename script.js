import { $, Sorter, LocalStorage } from "./src/utils/index.js";

import { TodoList, Tabs } from "./src/components/index.js";
import RootHtml from "./src/utils/RootHtml.js";

const root = new RootHtml();

const list = new TodoList(new LocalStorage(), new Sorter(), root);
const tabs = new Tabs(root);

list.init();
tabs.init();
