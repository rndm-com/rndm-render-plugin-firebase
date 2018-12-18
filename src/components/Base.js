import { Component } from 'react';
import firebase from 'firebase';
import { noop } from 'lodash';

class Base extends Component {
  constructor(props) {
    super(props);
    this.state = props;
  }

  componentDidMount() {
    (this.updateReference || noop)();
  }

  componentWillReceiveProps(props) {
    if (Object.keys(props).reduce((o, i) => props[i] === this.state[i] && o, true)) {
      if (props.name !== this.state.name) firebase.app(this.state.name).database().ref(this.state.reference).off('value', (this.offValue || noop));
      this.setState(props, (this.updateReference || noop));
    }
  }
}

export default Base;
