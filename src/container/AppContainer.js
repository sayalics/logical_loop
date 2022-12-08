import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { Provider } from "react-redux";
import AppNavigatorContainer from "../navigation/AppNavigator";
import {Store} from '../redux/store';

function AppContainer() {

  return (
    <View style={{ flex: 1 }}>
      <AppNavigatorContainer />
    </View>
  );
}

export default AppContainer;