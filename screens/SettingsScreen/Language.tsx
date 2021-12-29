/*
 * @Author: Chenxu
 * @Date: 2021-12-28 11:20:27
 * @LastEditTime: 2021-12-29 17:35:44
 * @Msg: Nothing
 */
import React from "react";
import { StyleSheet, View } from "react-native";
import { RadioButton, useTheme } from "react-native-paper";

const LanguageScreen: React.FC = () => {
  const [checked, setChecked] = React.useState('first');
  const { colors } = useTheme()
  console.log(colors)
  const styles = StyleSheet.create({
    container: {
      marginTop: 10,
      backgroundColor: colors.surface
    }
  })

  return (
    <View style={styles.container}>
      {/* <RadioButton
        value="first"
        status={checked === 'first' ? 'checked' : 'unchecked'}
        onPress={() => setChecked('first')}
      />
      <RadioButton
        value="second"
        status={checked === 'second' ? 'checked' : 'unchecked'}
        onPress={() => setChecked('second')}
      /> */}

      <RadioButton.Group onValueChange={value => setChecked(value)} value={checked}>
        <RadioButton.Item label="First item" value="first" />
        <RadioButton.Item label="Second item" value="second" />
      </RadioButton.Group>
    </View>
  );
}

export default LanguageScreen