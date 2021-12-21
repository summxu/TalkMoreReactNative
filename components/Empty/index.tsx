/*
 * @Author: Chenxu
 * @Date: 2021-12-21 21:51:51
 * @LastEditTime: 2021-12-21 21:56:16
 * @Msg: Nothing
 */

import React from "react"
import { Image, View } from "react-native"
import { Subheading } from "react-native-paper"

const Empty: React.FC = () => {
  return (
    <View>
      <Image source={require('./empty-image-default.png')} />
      <Subheading>Subheading</Subheading>
    </View>
  )
}

export default Empty