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
import UserStore from "./stores/user";

interface AppMobxProps {
  settingsStore?: SettingsStore
  userStore?: UserStore
}

const AppMobx = inject('settingsStore', 'userStore')(observer(({ settingsStore, userStore }: AppMobxProps) => {
  const { languageTag, themeType } = settingsStore!
  const { userConf } = userStore!
  const colorScheme = useColorScheme();

  const statusBarColorGetter = (): 'dark' | 'light' => {
    if (!(userConf && userConf.apiKey)) {
      return 'dark'
    }
    return 'light'
  }

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
      <StatusBar style={statusBarColorGetter()} />
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
      </SafeAreaProvider>
    );
  }
}

export default App;
