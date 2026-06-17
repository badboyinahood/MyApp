import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import { COLORS } from '../constants/colors';

type Props = {
  activeTab: 'home' | 'profile';
};

export default function BottomNav({ activeTab }: Props) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.tab}>
        <Text style={[styles.text, activeTab === 'home' && styles.active]}>
          Home123
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.tab}>
        <Text style={[styles.text, activeTab === 'profile' && styles.active]}>
          Profile
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',

    paddingVertical: 12,
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    shadowColor: COLORS.white,
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 10,
  },

  tab: {
    alignItems: 'center',
  },

  text: {
    fontSize: 12,
    color: '#888',
  },

  active: {
    color: '#2F80ED',
    fontWeight: '600',
  },
});