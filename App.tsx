import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import { StatusBar } from "expo-status-bar";
import React from "react";
import "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import { Provider } from "mobx-react";
import RootStore from "@/stores";

function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Provider {...new RootStore()}>
          <ActionSheetProvider>
            <Navigation colorScheme={"light"} />
          </ActionSheetProvider>
          <StatusBar />
        </Provider>
      </SafeAreaProvider>
    );
  }
}

export default App;
