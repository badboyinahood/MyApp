import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

import { COLORS } from '../constants/colors';

export default function ProfileScreen() {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === 'dark';

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDark ? '#121212' : '#F5F6FA' },
      ]}
    >
      <Image
        source={{
          uri: 'https://i.pravatar.cc/150?img=12',
        }}
        style={styles.avatar}
      />

      <Text
        style={[
          styles.name,
          { color: isDark ? '#fff' : COLORS.text },
        ]}
      >
        Konstantin Pak
      </Text>

      <Text
        style={[
          styles.email,
          { color: isDark ? '#aaa' : '#666' },
        ]}
      >
        kostpak2002@gmail.com
      </Text>

      <View style={styles.buttons}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Settings</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.logout]}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 60,
  },

  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
  },

  name: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  email: {
    marginBottom: 30,
  },

  buttons: {
    width: '80%',
  },

  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 12,
  },

  logout: {
    backgroundColor: '#EB5757',
  },

  buttonText: {
    color: COLORS.white,
    fontWeight: '600',
  },
});