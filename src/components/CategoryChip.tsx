import { TouchableOpacity, Text, StyleSheet } from 'react-native';

import { COLORS } from '../constants/colors';

type Props = {
  title: string;
  active?: boolean;
};

export default function CategoryChip({ title, active }: Props) {
  return (
    <TouchableOpacity
      style={[styles.chip, active && styles.activeChip]}
      activeOpacity={0.8}
    >
      <Text style={[styles.text, active && styles.activeText]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
    chip: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 24,
    backgroundColor: '#EDEFF3',
    marginRight: 10,

    alignSelf: 'flex-start',
    },

  activeChip: {
    backgroundColor: '#2F80ED',
  },

  text: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },

  activeText: {
    color: COLORS.white,
  },
});