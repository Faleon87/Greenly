import { StyleSheet, Platform } from 'react-native';

const globalStyles = StyleSheet.create({
  text: {
    fontFamily: Platform.OS === 'android' ? 'Manrope ExtraLight' : 'Manrope ExtraLight',
  },
});

export default globalStyles;