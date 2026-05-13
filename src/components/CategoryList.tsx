import { ScrollView, StyleSheet } from 'react-native';
import CategoryChip from './CategoryChip';

export default function CategoryList() {
  const categories = ['ALL EVENTS', 'CONCERTS', 'TECHNOLOGY'];

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.container}
    >
      {categories.map((item, index) => (
        <CategoryChip
          key={item}
          title={item}
          active={index === 0}
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