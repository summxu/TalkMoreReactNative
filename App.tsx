import { CombinedDefaultTheme } from "@/colors/theme";
import RootStore from "@/stores";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import { StatusBar } from "expo-status-bar";
import { inject, observer, Provider } from "mobx-react";
import React from "react";
import "react-native-gesture-handler";
import { Provider as PaperProvider } from 'react-native-paper';
import { RootSiblingParent } from 'react-native-root-siblings';
import { SafeAreaProvider } from "react-native-safe-area-context";
import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import LanguageStore from "./stores/language";

interface AppMobxProps {
  languageStore?: LanguageStore
}

const AppMobx = inject('languageStore')(observer(({ languageStore }: AppMobxProps) => {
  return (
    <PaperProvider theme={CombinedDefaultTheme}>
      <ActionSheetProvider>
        <RootSiblingParent>
          <Navigation colorScheme={"light"} />
        </RootSiblingParent>
      </ActionSheetProvider>
    </PaperProvider>
  )
}))

function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Provider {...new RootStore()}>
          <AppMobx />
        </Provider>
        <StatusBar style="dark" />
      </SafeAreaProvider>
    );
  }
}

export default App;
