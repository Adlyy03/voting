
import { View, Text, TextInput, StyleSheet } from 'react-native'
import React from 'react'

const FormField = ({ title, value, placeholder, handleChangeText, otherStyles, ...props }) => {
  return (
    <View style={[styles.container, otherStyles]}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.inputContainer}>
        <TextInput 
            style={styles.input}
            value={value}
            placeholder={placeholder}
            onChangeText={handleChangeText}
            {...props}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 10,
    },
    title: {
        fontSize: 16,
        marginBottom: 5,
        color: '#34495e'
    },
    inputContainer: {
        borderWidth: 1,
        borderColor: '#bdc3c7',
        borderRadius: 5,
        paddingHorizontal: 10,
        height: 50,
        justifyContent: 'center'
    },
    input: {
        flex: 1,
        color: '#2c3e50'
    }
})

export default FormField
