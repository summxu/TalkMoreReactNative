/*
 * @Author: Chenxu
 * @Date: 2021-12-28 11:20:27
 * @LastEditTime: 2022-01-05 09:30:54
 * @Msg: Nothing
 */
import RootStore from "@/stores";
import { RootStackParamList } from "@/types/navigatorTypes";
import { StackScreenProps } from "@react-navigation/stack";
import { inject, observer } from "mobx-react";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Button, RadioButton, useTheme } from "react-native-paper";

const DarkModeScreen: React.FC<StackScreenProps<RootStackParamList> & RootStore> = ({ settingsStore, navigation }) => {
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

      <Button onPress={() => navigation.navigate('LanguageScreen')}>跳转</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  }
})

export default inject('settingsStore')(observer(DarkModeScreen))