import { Component } from 'react';
import { render } from '@rndm/render';
import firebase from 'firebase';
import { set } from 'lodash';
import Base from './Base';

class Element extends Base {

  onValue = (snap) => {
    const views = snap.val();
    if (views) this.setState({ views });
  };
  offValue = () => this.setState({ views: null });

  updateReference = () => {
    try {
      const { reference } = this.state;
      if (!reference) return;
      firebase.app(this.state.name).database().ref(reference).on('value', this.onValue);
    } catch (_) {
      this.offValue();
    }
  };

  render() {
    return render(this.state.views);
  }
}

export default Element;
