/*
 * @Author: Chenxu
 * @Date: 2021-12-28 11:20:27
 * @LastEditTime: 2021-12-30 12:32:51
 * @Msg: Nothing
 */
import RootStore from "@/stores";
import { inject, observer } from "mobx-react";
import React from "react";
import { StyleSheet, View } from "react-native";
import { RadioButton, useTheme } from "react-native-paper";

const DarkModeScreen: React.FC<RootStore> = ({ settingsStore }) => {
  const { themeType, setThemeType } = settingsStore
  const { colors } = useTheme()

  return (
    <View style={{
      ...styles.container,
      backgroundColor: colors.surface
    }}>
      <RadioButton.Group onValueChange={(value: any) => setThemeType(value)} value={themeType}>
        <RadioButton.Item label="跟随系统" value="auto" />
        <RadioButton.Item label="正常模式" value="light" />
        <RadioButton.Item label="暗黑模式" value="dark" />
      </RadioButton.Group>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  }
})

export default inject('settingsStore')(observer(DarkModeScreen))