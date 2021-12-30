import { CombinedDarkTheme, CombinedDefaultTheme } from "@/colors/theme";
import RootStore from "@/stores";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import { StatusBar } from "expo-status-bar";
import { inject, observer, Provider } from "mobx-react";
import React, { useEffect } from "react";
import "react-native-gesture-handler";
import { Provider as PaperProvider } from 'react-native-paper';
import { RootSiblingParent } from 'react-native-root-siblings';
import { SafeAreaProvider } from "react-native-safe-area-context";
import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import SettingsStore from "./stores/settings";

interface AppMobxProps {
  settingsStore?: SettingsStore
}

const AppMobx = inject('settingsStore')(observer(({ settingsStore }: AppMobxProps) => {
  const { languageTag, themeType } = settingsStore!
  const colorScheme = useColorScheme();

  const themeGetter = (payload: "light" | "dark" | "auto") => {
    if (payload === "light") {
      return CombinedDefaultTheme
    }
    if (payload === "dark") {
      return CombinedDarkTheme
    }
    if (payload === "auto") {
      themeGetter(colorScheme)
    }
    return CombinedDefaultTheme
  }

  return (
    <PaperProvider theme={themeGetter(themeType)}>
      <ActionSheetProvider>
        <RootSiblingParent>
          <Navigation key={languageTag} theme={themeGetter(themeType)} />
        </RootSiblingParent>
      </ActionSheetProvider>
    </PaperProvider>
  )
}))

function App() {
  const isLoadingComplete = useCachedResources();

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
