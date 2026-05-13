import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

import { COLORS } from '../constants/colors';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      {/* Avatar */}
      <Image
        source={{
          uri: 'https://i.pravatar.cc/150?img=12',
        }}
        style={styles.avatar}
      />

      {/* Name */}
      <Text style={styles.name}>Konstantin Pak</Text>
      <Text style={styles.email}>kostpak2002@gmail.com</Text>

      {/* Buttons */}
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
    backgroundColor: '#F5F6FA',
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
    color: COLORS.text
  },

  email: {
    color: '#666',
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