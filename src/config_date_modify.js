'use strict';
import { getWeekDay1, PREFIX } from './utils';

let configDateModify = function configDateModify(config) {
  let beforeClicked = function beforeClicked() {
    if (config.date.month === 0) {
      config.date.month = 11;
      config.date.year -= 1;
    } else {
      config.date.month -= 1;
    }
    config.date.weekDay1 = getWeekDay1(config.date.year, config.date.month);
    config.updateDate(config);
  };
  let afterClicked = function afterClicked() {
    if (config.date.month === 11) {
      config.date.month = 0;
      config.date.year += 1;
    } else {
      config.date.month += 1;
    }
    config.date.weekDay1 = getWeekDay1(config.date.year, config.date.month);
    config.updateDate(config);
  };
  let daysClicked = function daysClicked(e) {
    if (e.target.className === `${PREFIX}-day`) {
      let previousActive =
        config.gui.days.querySelectorAll(`.${PREFIX}-day.${PREFIX}-active`);
      if (typeof previousActive === 'object' &&
        typeof previousActive.length === 'number') {
        for (let i = 0, length = previousActive.length; i < length; i++) {
          previousActive[i].classList.remove(`${PREFIX}-active`);
        }
      }
      e.target.classList.add(`${PREFIX}-active`);
      config.date.day = parseInt(e.target.innerText, 10);
    }
  };

  config.gui.before.addEventListener('click', beforeClicked);
  config.gui.after.addEventListener('click', afterClicked);
  config.gui.days.addEventListener('click', daysClicked);

  let oldRemoveInstance = config.removeInstance;
  config.removeInstance = function removeDateModify() {
    config.gui.before.removeEventListener('click', beforeClicked);
    config.gui.after.removeEventListener('click', afterClicked);
    config.gui.days.removeEventListener('click', daysClicked);
    oldRemoveInstance();
  };
};

export default configDateModify;
