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
import { Provider as PaperProvider } from 'react-native-paper';
import { theme } from "@/colors/theme";
import { RootSiblingParent } from 'react-native-root-siblings';

function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <PaperProvider theme={theme}>
          <Provider {...new RootStore()}>
            <ActionSheetProvider>
              <RootSiblingParent>
                <Navigation colorScheme={"light"} />
              </RootSiblingParent>
            </ActionSheetProvider>
            <StatusBar />
          </Provider>
        </PaperProvider>
      </SafeAreaProvider>
    );
  }
}

export default App;
