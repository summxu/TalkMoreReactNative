import { inject, observer } from "mobx-react"
import React, { useState } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { Text, useTheme } from 'react-native-paper'
import Background from './components/Background'
import Button from './components/Button'
import Header from './components/Header'
import Logo from './components/Logo'
import TextInput from './components/TextInput'
import { emailValidator } from './helpers/emailValidator'
import { nameValidator } from './helpers/nameValidator'
import { passwordValidator } from './helpers/passwordValidator'

const RegisterScreen = ({ navigation, talkMoreStore }) => {
  const [name, setName] = useState({ value: '', error: '' })
  const [email, setEmail] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })
  const { serverInfo } = talkMoreStore
  const { colors } = useTheme()

  const styles = StyleSheet.create({
    row: {
      flexDirection: 'row',
      marginTop: 4,
    },
    link: {
      fontWeight: 'bold',
      color: colors.primary,
    },
  })

  const onSignUpPressed = () => {
    const nameError = nameValidator(name.value)
    const emailError = emailValidator(email.value)
    const passwordError = passwordValidator(password.value)
    if (emailError || passwordError || nameError) {
      setName({ ...name, error: nameError })
      setEmail({ ...email, error: emailError })
      setPassword({ ...password, error: passwordError })
      return
    }
    navigation.reset({
      index: 0,
      routes: [{ name: 'Dashboard' }],
    })
  }

  return (
    <Background navigation={navigation}>
      <Logo />
      <Header>注册 {serverInfo && serverInfo.realm_name}</Header>
      {/* <TextInput
        label="Name"
        returnKeyType="next"
        value={name.value}
        onChangeText={(text) => setName({ value: text, error: '' })}
        error={!!name.error}
        errorText={name.error}
      /> */}
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
      <Button
        mode="contained"
        textColor="white"
        onPress={onSignUpPressed}
        style={{ marginTop: 24 }}
      >
        注册
      </Button>
      <View style={styles.row}>
        <Text>已有账户? </Text>
        <TouchableOpacity onPress={() => navigation.replace('LoginScreen')}>
          <Text style={styles.link}>登录</Text>
        </TouchableOpacity>
      </View>
    </Background>
  )
}


export default inject('talkMoreStore')(observer(RegisterScreen))