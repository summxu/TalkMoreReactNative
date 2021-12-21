import { inject, observer } from 'mobx-react'
import React from 'react'
import { StyleSheet } from 'react-native'
import HTMLView from 'react-native-htmlview'
import Background from './components/Background'
import Button from './components/Button'
import Header from './components/Header'
import Logo from './components/Logo'
import Paragraph from './components/Paragraph'

const styles = StyleSheet.create({
  p: {
    lineHeight: 25,
    textAlign: 'center',
    fontSize: 16
  }
})

const StartScreen = ({ navigation, talkMoreStore }) => {
  const { serverInfo } = talkMoreStore
  console.log(serverInfo)
  return (
    <Background navigation={navigation}>
      <Logo uri={serverInfo.realm_icon} />
      <Header>{serverInfo.realm_name}</Header>
      <Paragraph>
        <HTMLView stylesheet={styles} value={serverInfo.realm_description} />
      </Paragraph>
      <Button
        mode="contained"
        textColor="white"
        onPress={() => navigation.navigate('LoginScreen')}
      >
        登录
      </Button>
      <Button
        mode="outlined"
        onPress={() => navigation.navigate('RegisterScreen')}
      >
        注册
      </Button>
    </Background>
  )
}

export default inject('talkMoreStore')(observer(StartScreen))