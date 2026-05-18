import { ScrollView, StyleSheet } from 'react-native';
import CategoryChip from './CategoryChip';

type Props = {
  selected: string;
  onSelect: (category: string) => void;
};

const categories = ['All', 'Music', 'Tech', 'Business', 'Festival'];

export default function CategoryList({
  selected,
  onSelect,
}: Props) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.container}
    >
      {categories.map(item => (
        <CategoryChip
          key={item}
          title={item}
          active={selected === item}
          onPress={() => onSelect(item)}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
});