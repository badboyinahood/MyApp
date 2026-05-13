import {
  SafeAreaView,
  StyleSheet,
  FlatList,
  Text,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React, {
  useEffect,
  useState,
  useMemo,
  useCallback,
} from 'react';

import Header from '../components/Header';
import SearchInput from '../components/SearchInput';
import CategoryList from '../components/CategoryList';
import EventCard from '../components/EventCard';

import { fetchEvents } from '../api/api';

export default function HomeScreen() {
  const navigation = useNavigation<any>();

  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    fetchEvents().then(data => setEvents(data));
  }, []);

  // оптимизация
  const visibleEvents = useMemo(() => {
    return events.slice(0, 20);
  }, [events]);

  const handlePress = useCallback(
    (event: any) => {
      navigation.navigate('Details', { event });
    },
    [navigation]
  );

  const renderItem = useCallback(
    ({ item }: any) => (
      <EventCard
        title={item.title}
        location={item.location}
        date={item.date}
        image={item.image}
        onPress={() => handlePress(item)}
      />
    ),
    [handlePress]
  );

  if (!visibleEvents.length) {
    return <Text style={{ padding: 20 }}>Loading...</Text>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={visibleEvents}
        keyExtractor={(item, index) =>
          item.id ? item.id.toString() : index.toString()
        }
        renderItem={renderItem}
        ListHeaderComponent={
          <>
            <Header title="All Events" />
            <SearchInput />
            <CategoryList />
          </>
        }
        contentContainerStyle={styles.content}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F6FA',
  },
  content: {
    padding: 16,
    paddingBottom: 80,
  },
});