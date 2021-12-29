/*
 * @Author: Chenxu
 * @Date: 2021-12-29 16:24:12
 * @LastEditTime: 2021-12-29 17:01:46
 * @Msg: Nothing
 */

import LanguageScreen from "@/screens/SettingsScreen/Language";
import * as React from "react";
import { Stack } from "./index";

export const LanguageStack: React.FC = () => {
  return (
    <Stack.Screen
      name="LanguageScreen"
      component={LanguageScreen}
    />
  );
}
