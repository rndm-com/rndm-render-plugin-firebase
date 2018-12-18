import { Component } from 'react';
import { use } from '@rndm/render';
import { set, noop } from 'lodash';
import components from './components';
import Base from './components/Base';

const plugin = {
  key: 'Firebase',
  components,
};

use(plugin);

export {
  Base,
}

export default plugin;
