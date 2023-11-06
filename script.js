import { $, Sorter, LocalStorage } from "./src/utils/index.js";

import { TodoList, Tabs, ProfileForm } from "./src/components/index.js";
import RootHtml from "./src/utils/RootHtml.js";

const root = new RootHtml();
const storage = new LocalStorage();

const list = new TodoList(storage, new Sorter(), root);
const tabs = new Tabs(root);
const profileForm = new ProfileForm(storage, root);

list.init();
tabs.init();
profileForm.init();
