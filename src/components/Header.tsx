import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { COLORS } from '../constants/colors';

type Props = {
  title: string;
  onBackPress?: () => void;
};

export default function Header({ title, onBackPress }: Props) {
  return (
    <View style={styles.container}>
      {onBackPress ? (
        <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
          <Text style={styles.backText}>{'<'}</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.placeholder} />
      )}

      <Text style={styles.title}>{title}</Text>

      <View style={styles.placeholder} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },

  title: {
    fontSize: 18,
    fontWeight: '500',
    color: COLORS.text
  },

  backButton: {
    position: 'absolute',
    left: 0,
    padding: 10,
  },

  backText: {
    fontSize: 18,
  },

  placeholder: {
    position: 'absolute',
    right: 0,
    width: 40,
  },
});