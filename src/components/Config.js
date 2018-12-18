import { Component } from 'react';
import firebase from 'firebase';

class Config extends Component {
  componentWillMount() {
    const { name, config = {} } = this.props;
    const current = firebase.apps.find(app => app.name === name || (app.name === '[DEFAULT]' && !name));
    if (!current) firebase.initializeApp(config, name);
  }

  render() {
    return this.props.children;
  }
}

export default Config;
