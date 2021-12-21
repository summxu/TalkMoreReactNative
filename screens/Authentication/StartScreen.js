import React from 'react'
import Background from './components/Background'
import Logo from './components/Logo'
import Header from './components/Header'
import Button from './components/Button'
import Paragraph from './components/Paragraph'

export default function StartScreen ({ navigation }) {
  return (
    <Background navigation={navigation}>
      <Logo />
      <Header>多 嘴</Header>
      <Paragraph>
        可以完全控制和信任的通信平台，使团队能够实时聊天、文件共享和视频通话进行协作。
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
