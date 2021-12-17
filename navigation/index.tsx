/**
 * If you are not familiar with React Navigation, check out the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { Dashboard, LoginScreen, RegisterScreen, ResetPasswordScreen, StartScreen } from "@/screens/Authentication";
import UserStore from "@/stores/user";
import { Feather } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  DarkTheme, DefaultTheme, NavigationContainer, useNavigation
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { inject, observer } from "mobx-react";
import * as React from "react";
import {
  ColorSchemeName, Image, Pressable, Text, useWindowDimensions, View
} from "react-native";
import HomeScreen from "../screens/HomeScreen";
import NotFoundScreen from "../screens/NotFoundScreen";
import SettingsScreen from "../screens/Settings";
import { AuthParamList, BottomTabParamList, RootStackParamList } from "../types";

interface NavigationProps {
  userStore?: UserStore
}

const Navigation = ({
  colorScheme,
  userStore
}: {
  colorScheme: ColorSchemeName;
} & NavigationProps) => {
  return (
    <NavigationContainer
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <RootNavigator info={userStore.info} />
    </NavigationContainer>
  );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<RootStackParamList>();
const Auth = createStackNavigator<AuthParamList>();
const BottomTab = createBottomTabNavigator<BottomTabParamList>();

function RootNavigator({ info }: Partial<UserStore>) {
  return (
    !(info && info.apiKey) ? <AuthNavigator /> :
      <Stack.Navigator>
        <Stack.Screen
          name="BottomTab"
          component={BottomTabNavigator}
          options={{ headerTitle: HomeHeader }}
        />
        <Stack.Screen
          name="NotFound"
          component={NotFoundScreen}
          options={{ title: "Oops!" }}
        />
      </Stack.Navigator>
  );
}

function AuthNavigator() {
  return (
    <Auth.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Auth.Screen name="StartScreen" component={StartScreen} />
      <Auth.Screen name="LoginScreen" component={LoginScreen} />
      <Auth.Screen name="RegisterScreen" component={RegisterScreen} />
      <Auth.Screen name="Dashboard" component={Dashboard} />
      <Auth.Screen
        name="ResetPasswordScreen"
        component={ResetPasswordScreen}
      />
    </Auth.Navigator>
  )
}

function BottomTabNavigator() {
  return (
    <BottomTab.Navigator>
      <BottomTab.Screen name="Home" component={HomeScreen} />
      <BottomTab.Screen name="Settings" component={SettingsScreen} />
    </BottomTab.Navigator>
  );
}

const HomeHeader = (props: any) => {
  const { width } = useWindowDimensions();
  const navigation = useNavigation();

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        width,
        padding: 10,
        alignItems: "center",
      }}
    >
      <Image
        source={{
          uri: "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/vadim.jpg",
        }}
        style={{ width: 30, height: 30, borderRadius: 30 }}
      />
      <Text
        style={{
          flex: 1,
          textAlign: "center",
          marginLeft: 50,
          fontWeight: "bold",
        }}
      >
        Signal
      </Text>
      <Pressable onPress={() => navigation.navigate("Settings")}>
        <Feather
          name="settings"
          size={24}
          color="black"
          style={{ marginHorizontal: 10 }}
        />
      </Pressable>
      <Pressable onPress={() => navigation.navigate("UsersScreen")}>
        <Feather
          name="edit-2"
          size={24}
          color="black"
          style={{ marginHorizontal: 10 }}
        />
      </Pressable>
    </View>
  );
};

export default inject('userStore')(observer(Navigation))