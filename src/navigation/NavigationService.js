import React from 'react';
import { StackActions } from '@react-navigation/native';

export const navigationRef = React.createRef();

function navigate(routeName, params) {
  navigationRef.current && navigationRef.current.navigate(routeName, params);
}

function push(routeName, params) {
  const pushAction = StackActions.push(routeName, params);
  navigationRef.current && navigationRef.current.dispatch(pushAction);
}

function replace(routeName, params) {
  navigationRef.current &&
    navigationRef.current.dispatch(StackActions.replace(routeName, params));
}

function goBack() {
  navigationRef.current && navigationRef.current.goBack();
}

export default {
  navigate,
  push,
  replace,
  goBack,
};