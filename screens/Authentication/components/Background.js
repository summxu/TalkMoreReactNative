import { theme } from '@/colors/theme'
import React, { useState, useEffect } from 'react'
import { ImageBackground, StyleSheet, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import BackButton from "./BackButton";

export default function Background ({ children, navigation }) {

  const [index, setIndex] = useState(0)

  useEffect(() => {
    const setIndexHandle = () => {
      const { index } = navigation.getState()
      setIndex(index)
    }
    setIndexHandle()
  }, [])

  return (
    <ImageBackground
      source={require('../assets/background_dot.png')}
      resizeMode="repeat"
      style={styles.background}
    >
      {!!index && <BackButton goBack={navigation.goBack} />}
      <KeyboardAwareScrollView >
        <View style={styles.container}>
          {children}
        </View>
      </KeyboardAwareScrollView>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    backgroundColor: theme.colors.surface,
  },
  container: {
    flex: 1,
    marginTop: 150,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
})
