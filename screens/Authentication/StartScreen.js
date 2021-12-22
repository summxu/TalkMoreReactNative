import { inject, observer } from 'mobx-react'
import React from 'react'
import { Text } from 'react-native'
import HTMLView from 'react-native-htmlview'
import Background from './components/Background'
import Button from './components/Button'
import Header from './components/Header'
import Logo from './components/Logo'
import { theme } from "@/colors/theme";

const renderNode = (node, index, siblings, parent, defaultRenderer) => {
  if (node.name == 'p') {
    return (
      <Text key={index} style={{
        lineHeight: 25,
        fontSize: 16,
        textAlignVertical: "center",
        textAlign: "center"
      }}>
        {defaultRenderer(node.children, parent)}
      </Text>
    )
  }
}

const StartScreen = ({ navigation, talkMoreStore }) => {
  const { serverInfo } = talkMoreStore
  return (
    <Background navigation={navigation}>
      {serverInfo && <>
        <Logo uri={serverInfo.realm_icon} />
        <Header>{serverInfo.realm_name}</Header>
        <HTMLView renderNode={renderNode} value={serverInfo.realm_description} />
      </>}

      <Button
        mode="contained"
        textColor="white"
        onPress={() => navigation.navigate('LoginScreen')}
      >
        登录
      </Button>
      <Button
        mode="outlined"
        textColor={theme.colors.text}
        onPress={() => navigation.navigate('RegisterScreen')}
      >
        注册
      </Button>
    </Background>
  )
}

export default inject('talkMoreStore')(observer(StartScreen))