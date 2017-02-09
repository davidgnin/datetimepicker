'use strict';
import prepareConfig from './prepare_config';
import prepareContainer from './prepare_container';
import createGUI from './create_gui';

let datetimepicker = function datetimepicker(params = {}) {
  let config = prepareConfig(params);
  config.container = prepareContainer(config);
  config.gui = createGUI(config);
};

export default datetimepicker;
