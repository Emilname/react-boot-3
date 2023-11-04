import { $, Sorter, LocalStorage } from "./src/utils/index.js";

import { TodoList } from "./src/components/index.js";

const list = new TodoList(new LocalStorage(), new Sorter());

list.init();
