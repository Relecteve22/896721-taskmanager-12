import {createMenuTemplate} from "./view/menu-site.js";
import {createFilterTemplate} from "./view/filter-site.js";
import {createBoardTemplate} from "./view/board-site.js";
import {createAddTaskTemplate} from "./view/add-task.js";
import {createTaskTemplate} from "./view/task.js";
import {createButtonLoadMore} from "./view/button-load-more.js";
import {render} from "./utils.js";

const TASK_NUMBERS = 3;

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

render(siteHeaderElement, createMenuTemplate(), `beforeend`);
render(siteHeaderElement, createFilterTemplate(), `afterend`);

const siteFilterElement = siteMainElement.querySelector(`.main__filter`);

render(siteFilterElement, createBoardTemplate(), `afterend`);

const siteBoardTasksElement = siteMainElement.querySelector(`.board__tasks`);

render(siteBoardTasksElement, createAddTaskTemplate(), `afterbegin`);

for (let i = 0; i < TASK_NUMBERS; i++) {
  render(siteBoardTasksElement, createTaskTemplate(), `beforeend`);
}

render(siteBoardTasksElement, createButtonLoadMore(), `afterend`);
