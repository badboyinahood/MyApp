import { View, TextInput, StyleSheet } from 'react-native';
import { COLORS } from '../constants/colors';

type Props = {
  value?: string;
  onChange?: (text: string) => void;
};

export default function SearchInput({ value, onChange }: Props) {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search"
        placeholderTextColor="#999"
        value={value}
        onChangeText={onChange}
        style={styles.input}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#EDEFF3',
    borderRadius: 24,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginBottom: 16,
  },

  input: {
    fontSize: 14,
    color: COLORS.text,
  },
});