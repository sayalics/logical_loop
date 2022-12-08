import React, { useState, useEffect } from "react";
import { View } from "react-native";
import AppNavigatorContainer from "../navigation/AppNavigator";

function AppContainer() {
  return (
    <View style={{ flex: 1 }}>
      <AppNavigatorContainer />
    </View>
  );
}

export default AppContainer;