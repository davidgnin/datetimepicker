'use strict';
import { PREFIX } from './utils';

let prepareContainer = function prepareContainer(config) {
  let container = document.createElement('span');
  container.className = PREFIX;
  container.id = `${PREFIX}-${config.id}`;

  let parent = config.input.parentNode;
  parent.insertBefore(container, config.input);
  parent.removeChild(config.input);
  container.appendChild(config.input);

  return container;
};

export default prepareContainer;
