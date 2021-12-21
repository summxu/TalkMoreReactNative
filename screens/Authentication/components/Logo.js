/*
 * @Author: Chenxu
 * @Date: 2021-12-17 10:06:37
 * @LastEditTime: 2021-12-21 20:17:09
 * @Msg: Nothing
 */
import React from 'react'
import { Image, StyleSheet } from 'react-native'

export default function Logo (props) {
  return <Image source={{ uri: props.uri }} style={styles.image} />
}

const styles = StyleSheet.create({
  image: {
    width: 110,
    height: 110,
    marginBottom: 8,
  },
})
