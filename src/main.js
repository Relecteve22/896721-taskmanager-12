import {createMenuTemplate} from "./view/menu-site.js";
import {createFilterTemplate} from "./view/filter-site.js";
import {createBoardTemplate} from "./view/board-site.js";
import {createAddTaskTemplate} from "./view/add-task.js";
import {createTaskEditTemplate} from "./view/edit-task.js";
import {createTaskTemplate} from "./view/task.js";
import {createButtonLoadMore} from "./view/button-load-more.js";
import {render} from "./utils.js";
import {generateTask} from "./mock/task.js";
import {generateFilter} from "./mock/filter.js";

const TASK_NUMBERS = 37;
const TASK_COUNT_PER_STEP = 8;

const tasks = new Array(TASK_NUMBERS).fill().map(generateTask);
const filters = generateFilter(tasks);

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

render(siteHeaderElement, createMenuTemplate(), `beforeend`);
render(siteHeaderElement, createFilterTemplate(filters), `afterend`);

const siteFilterElement = siteMainElement.querySelector(`.main__filter`);

render(siteFilterElement, createBoardTemplate(), `afterend`);

const siteBoardTasksElement = siteMainElement.querySelector(`.board__tasks`);

// render(siteBoardTasksElement, createAddTaskTemplate(), `afterbegin`);
render(siteBoardTasksElement, createTaskEditTemplate(tasks[0]), `afterbegin`);

for (let i = 0; i < Math.min(tasks.length, TASK_COUNT_PER_STEP); i++) {
  render(siteBoardTasksElement, createTaskTemplate(tasks[i]), `beforeend`);
}

if (tasks.length > TASK_COUNT_PER_STEP) {
  let renderedTaskCount = TASK_COUNT_PER_STEP;

  render(siteBoardTasksElement, createButtonLoadMore(), `afterend`);

  const loadMoreButton = siteMainElement.querySelector(`.load-more`);

  loadMoreButton.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    tasks
      .slice(renderedTaskCount, renderedTaskCount + TASK_COUNT_PER_STEP)
      .forEach((task) => render(siteBoardTasksElement, createTaskTemplate(task), `beforeend`));

    renderedTaskCount += TASK_COUNT_PER_STEP;

    if (renderedTaskCount >= tasks.length) {
      loadMoreButton.remove();
    }
  });
}
