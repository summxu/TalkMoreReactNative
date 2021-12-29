import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import { StatusBar } from "expo-status-bar";
import React from "react";
import "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import { Provider, useLocalObservable } from "mobx-react";
import RootStore from "@/stores";
import { Provider as PaperProvider } from 'react-native-paper';
import { CombinedDefaultTheme } from "@/colors/theme";
import { RootSiblingParent } from 'react-native-root-siblings';

function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const store = useLocalObservable(() => ({
    secondsPassed: 0,
    increaseTimer() {
      this.secondsPassed++
    }
  }))

  console.log(colorScheme, store)

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Provider {...new RootStore()}>
          <PaperProvider theme={CombinedDefaultTheme}>
            <ActionSheetProvider>
              <RootSiblingParent>
                <Navigation colorScheme={"light"} />
              </RootSiblingParent>
            </ActionSheetProvider>
          </PaperProvider>
        </Provider>
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}

export default App;
