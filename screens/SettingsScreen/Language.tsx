/*
 * @Author: Chenxu
 * @Date: 2021-12-28 11:20:27
 * @LastEditTime: 2021-12-30 14:12:17
 * @Msg: Nothing
 */
import RootStore from "@/stores";
import { inject, observer } from "mobx-react";
import React from "react";
import { StyleSheet, View } from "react-native";
import { RadioButton, useTheme } from "react-native-paper";

const LanguageScreen: React.FC<RootStore> = ({ settingsStore }) => {
  const { languageTag, setI18nConfig } = settingsStore
  const { colors } = useTheme()

  return (
    <View style={{
      ...styles.container,
      backgroundColor: colors.surface
    }}>
      <RadioButton.Group onValueChange={value => setI18nConfig(value)} value={languageTag}>
        <RadioButton.Item label="跟随系统" value="auto" />
        <RadioButton.Item label="简体中文" value="zh-CN" />
        <RadioButton.Item label="繁体中文" value="zh-TW" />
        <RadioButton.Item label="English" value="en" />
      </RadioButton.Group>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  }
})

export default inject('settingsStore')(observer(LanguageScreen))