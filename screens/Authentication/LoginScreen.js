import React, { useState } from 'react'
import { TouchableOpacity, StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'
import Background from './components/Background'
import Logo from './components/Logo'
import Header from './components/Header'
import Button from './components/Button'
import TextInput from './components/TextInput'
import BackButton from './components/BackButton'
import { theme } from '@/colors/theme'
import { emailValidator } from './helpers/emailValidator'
import { passwordValidator } from './helpers/passwordValidator'
import { inject, observer } from "mobx-react";
const LoginScreen = ({ navigation, talkMoreStore }) => {
  const [email, setEmail] = useState({ value: 'chenxu4012@foxmail.com', error: '' })
  const [password, setPassword] = useState({ value: '123123', error: '' })
  const [loding, setLoding] = useState(false)
  const initTalkMoreSDK = async () => {
    try {
      setLoding(true)
      const res = await talkMoreStore.initTalkMoreSDK({
        username: email,
        password: password
      })
    } catch (error) {
      console.log(global.$Toast)
      console.log(error)
    }
      setLoding(false)
  }

  const onLoginPressed = () => {
    const emailError = emailValidator(email.value)
    const passwordError = passwordValidator(password.value)
    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError })
      setPassword({ ...password, error: passwordError })
      return
    }
    initTalkMoreSDK()
  }

  return (
    <Background navigation={navigation}>
      <Logo />
      <Header>登录 TalkMore</Header>
      <TextInput
        label="电子邮箱"
        returnKeyType="next"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      <TextInput
        label="登录密码"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
      <View style={styles.forgotPassword}>
        <TouchableOpacity
          onPress={() => navigation.navigate('ResetPasswordScreen')}
        >
          <Text style={styles.forgot}>忘记密码？</Text>
        </TouchableOpacity>
      </View>
      <Button loding={loding} mode="contained" onPress={onLoginPressed}>
        登 录
      </Button>
      <View style={styles.row}>
        <Text>还没有账户? </Text>
        <TouchableOpacity onPress={() => navigation.replace('RegisterScreen')}>
          <Text style={styles.link}>注册</Text>
        </TouchableOpacity>
      </View>
    </Background>
  )
}

const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  forgot: {
    fontSize: 13,
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
})

export default inject('talkMoreStore')(observer(LoginScreen))