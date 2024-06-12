
 
  // ../config/style.js
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  innerContainer: {
    width: '100%',
    maxWidth: 400,
    padding: 16,
  },
  input: {
    marginBottom: 12,
    backgroundColor: '#fff',
  },
  button: {
    marginTop: 12,
  },
  error: {
    color: 'red',
  },
});