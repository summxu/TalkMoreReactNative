import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { TextInput as Input, useTheme } from 'react-native-paper'

export default function TextInput ({ errorText, description, ...props }) {
  const { colors } = useTheme()
  const styles = StyleSheet.create({
    container: {
      width: '100%',
      marginVertical: 12,
    },
    input: {
      backgroundColor: colors.surface,
    },
    description: {
      fontSize: 13,
      color: colors.secondary,
      paddingTop: 8,
    },
    error: {
      fontSize: 13,
      color: colors.error,
      paddingTop: 8,
    },
  })


  return (
    <View style={styles.container}>
      <Input
        style={styles.input}
        selectionColor={theme.colors.primary}
        underlineColor="transparent"
        mode="outlined"
        {...props}
      />
      {description && !errorText ? (
        <Text style={styles.description}>{description}</Text>
      ) : null}
      {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
    </View>
  )
}

