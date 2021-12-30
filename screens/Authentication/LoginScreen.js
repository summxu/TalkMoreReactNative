import { inject, observer } from "mobx-react"
import React, { useState } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { Text, useTheme } from 'react-native-paper'
import Toast from 'react-native-root-toast'
import Background from './components/Background'
import Button from './components/Button'
import Header from './components/Header'
import Logo from './components/Logo'
import TextInput from './components/TextInput'
import { emailValidator } from './helpers/emailValidator'
import { passwordValidator } from './helpers/passwordValidator'

const LoginScreen = ({ navigation, talkMoreStore, settingsStore }) => {
  const [email, setEmail] = useState({ value: 'chenxu4012@foxmail.com', error: '' })
  const [password, setPassword] = useState({ value: '123123.', error: '' })
  const [loading, setLoading] = useState(false)
  const { serverInfo } = talkMoreStore
  const { colors } = useTheme()

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
      color: colors.secondary,
    },
    link: {
      fontWeight: 'bold',
      color: colors.primary,
    },
  })

  const initTalkMoreSDK = async () => {
    setLoading(true)
    try {
      await talkMoreStore.initTalkMoreSDK({
        username: email.value,
        password: password.value
      })
      settingsStore.setThemeType('light')
    } catch (error) {
      Toast.show(error.message, {
        duration: Toast.durations.LONG,
        position: Toast.positions.CENTER,
      });
    }
    setLoading(false)
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
      <Header>登录 {serverInfo && serverInfo.realm_name}</Header>
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
      <Button
        textColor="white"
        disabled={loading} loading={loading} mode="contained" onPress={onLoginPressed}>
        登录
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

export default inject('talkMoreStore', 'settingsStore')(observer(LoginScreen))