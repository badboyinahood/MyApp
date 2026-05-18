import { View, TextInput, StyleSheet } from 'react-native';
import { COLORS } from '../constants/colors';

type Props = {
  value: string;
  onChange: (text: string) => void;
  isDark?: boolean;
};

export default function SearchInput({
  value,
  onChange,
  isDark,
}: Props) {
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: isDark ? '#2A2A2A' : '#EDEFF3',
        },
      ]}
    >
      <TextInput
        placeholder="Search events"
        placeholderTextColor={isDark ? '#888' : '#999'}
        value={value}
        onChangeText={onChange}
        style={[
          styles.input,
          { color: isDark ? '#fff' : COLORS.text },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 24,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginBottom: 16,
  },

  input: {
    fontSize: 14,
  },
});