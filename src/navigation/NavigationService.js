import React from 'react';

export const navigationRef = React.createRef();

function navigate(routeName, params) {
  navigationRef.current && navigationRef.current.navigate(routeName, params);
}

function goBack() {
  navigationRef.current && navigationRef.current.goBack();
}

export default {
  navigate,
  goBack,
};