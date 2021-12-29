/*
 * @Author: Chenxu
 * @Date: 2021-12-17 10:06:37
 * @LastEditTime: 2021-12-29 18:38:27
 * @Msg: Nothing
 */
import React from 'react'
import { StyleSheet } from 'react-native'
import { Text, useTheme } from 'react-native-paper'

export default function Header (props) {
  const { colors } = useTheme()
  const styles = StyleSheet.create({
    header: {
      fontSize: 21,
      color: colors.primary,
      fontWeight: 'bold',
      paddingVertical: 12,
    },
  })

  return <Text style={styles.header} {...props} />
}
