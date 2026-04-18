
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import React from 'react';

const CustomButton = ({ title, handlePress, containerStyles, textStyles, isLoading }) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      style={[styles.button, containerStyles, isLoading ? styles.disabled : {}]}
      disabled={isLoading}
    >
      <Text style={[styles.text, textStyles]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#FF9C01', // Warna aksen
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    minHeight: 62,
  },
  text: {
    color: '#161622', // Warna latar belakang gelap untuk teks
    fontWeight: '600',
    fontSize: 18,
  },
  disabled: {
    opacity: 0.5,
  }
});

export default CustomButton;
