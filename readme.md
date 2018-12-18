# RNDM Render Plugin: Firebase

## About

This plugin provides functionality for [RNDM Render package](https://github.com/rndm-com/rndm-render) when integrating into Firebase as an API provider.

## Installation

If you have not already done so, then please ensure you have installed the [RNDM Render](https://github.com/rndm-com/rndm-render) and [RNDM Plugin: Core](https://github.com/rndm-com/rndm-render-plugin-core) package.

### From NPM

```sh
npm install --save @rndm/render-plugin-firebase
```

### Post Installation

In order to allow this plugin to work, it must first be included in your project. You can do this inside yout main index file:

```javascript
import '@rndm/render-plugin-firebase';
```

## Usage

The Firebase Plugin includes a number of Components to be accessed within your application. Some of these components are JSON describables, whilst others are created to allow integration with the Firebase system.

### Components

### Config

The Config Component is a Higher Order Component, used for initialising a Firebase Application.

**Example**

```javascript
{
  "type": "Firebase.Wrapper.Config",
  "props": {
    "config": {
      "databaseURL": "https://rndm-com.firebaseio.com"
    },
    "children": {
      "type": "react-native.Text",
      "props": {
        "children": "Hello World"
      }
    }
  }
}
```

The above example, when run through the renderer, will initialise an application using the https://rndm-com.firebaseio.com url. However, the child element 'react-native.Text' will be displayed on the screen.

### Element

Once the Firebase application has been initilised, it is possible to render further API information supplied by a reference.

**Example**

```javascript
{
  "type": "Firebase.Wrapper.Config",
  "props": {
    "config": {
      "databaseURL": "https://rndm-com.firebaseio.com"
    },
    "children": {
      "type": "Firebase.Element",
      "props": {
        "reference": "example"
      }
    }
  }
}
```

#### Base

The Base Component is a special component created in order to be subclassed by any component that may want to handle Firebase integrations themselves.

Any Component that extends the Base Component expects at least two props:

- *name*: This is the name of the Firebase application that will be used
- *reference*: This is the reference to the database path that the instance will listen to

Any Component that extends the Base Component should have three methods:

- *updateReference()*: This method tells the Component what to do should the reference or name be updated
- *onValue()*: This method will tell the Component what it should do upon an update to the reference data
- *offValue()*: This method will tell the Component what it should do upon stopping listenting to the reference

**Example**

```javascript
import React from 'react';
import { Text } from 'react-native';
import { Base } from '@rndm/render-plugin-firebase;

class FirebaseNotifier extends Base {
    constructor(props) {
        super(props)
        this.state.isConnected = false;
    }

    onValue = () => {
        this.setState({ isConnected: true });
    }

    offValue = () => {
        this.setState({ isConnected: false });
    }

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
          return (
            <Text>{this.state.isConnected ? 'Connected' : 'Not Connected'}</Text>
          );
      }

}
```
