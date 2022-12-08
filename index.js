/**
 * @format
 */
import React from 'react';
import {AppRegistry} from 'react-native';
import AppContainer from './src/container/AppContainer';
import {name as appName} from './app.json';
import { Provider } from 'react-redux';
import configureStore from './src/redux/store';
const store = configureStore()

export default function Main() {
    return (
      <Provider store={store}>
        <AppContainer/>
      </Provider>
    );
  }
  
AppRegistry.registerComponent(appName, () => Main);
