'use strict';
import { PREFIX, generateHTML } from './utils';

let createGUI = function createGUI(config) {
  let picker = document.createElement('div');
  picker.className = `${PREFIX}-picker`;

  picker.innerHTML = generateHTML();
  config.container.appendChild(picker);

  let gui = {
    picker: picker
  };

  return gui;
};

export default createGUI;
