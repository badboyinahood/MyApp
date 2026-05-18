import {
  SafeAreaView,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  View,
  Text,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React, {
  useEffect,
  useState,
  useContext,
  useCallback,
  useMemo,
} from 'react';

import Header from '../components/Header';
import SearchInput from '../components/SearchInput';
import CategoryList from '../components/CategoryList';
import EventCard from '../components/EventCard';

import { fetchEvents, EventType } from '../api/api';
import { ThemeContext } from '../context/ThemeContext';

export default function HomeScreen() {
  const navigation = useNavigation<any>();
  const { theme } = useContext(ThemeContext);
  const isDark = theme === 'dark';

  const [events, setEvents] = useState<EventType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [search, setSearch] = useState(''); // 🔥 добавили

  useEffect(() => {
    fetchEvents()
      .then(data => setEvents(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const filteredEvents = useMemo(() => {
    return events.filter(item => {
      const matchCategory =
        selectedCategory === 'All' ||
        item.category?.toLowerCase().trim() ===
          selectedCategory.toLowerCase().trim();

      const matchSearch =
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.location.toLowerCase().includes(search.toLowerCase());

      return matchCategory && matchSearch;
    });
  }, [events, selectedCategory, search]);

  const renderItem = useCallback(
    ({ item }: { item: EventType }) => (
      <EventCard
        id={item.id}
        title={item.title}
        location={item.location}
        date={item.date}
        image={item.image}
        description={item.description}
        price={item.price}
        onPress={() =>
          navigation.navigate('Details', { event: item })
        }
      />
    ),
    [navigation]
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.loader}>
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView
        style={[
          styles.loader,
          {
            backgroundColor:
              isDark ? '#1E1E1E' : '#F5F6FA',
          },
        ]}
      >
        <Text
          style={{
            color: isDark ? '#fff' : '#000',
            textAlign: 'center',
          }}
        >
          {error}
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          backgroundColor:
            isDark ? '#1E1E1E' : '#F5F6FA',
        },
      ]}
    >
      <FlatList
        data={filteredEvents}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        ListHeaderComponent={
          <>
            <Header title="All Events" />

            <SearchInput
              value={search}
              onChange={setSearch}
              isDark={isDark}
            />

            <CategoryList
              selected={selectedCategory}
              onSelect={setSelectedCategory}
            />
          </>
        }
        ListEmptyComponent={
          <Text
            style={{
              textAlign: 'center',
              marginTop: 40,
              color: isDark ? '#aaa' : '#555',
            }}
          >
            No events found
          </Text>
        }
        contentContainerStyle={styles.content}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  content: {
    padding: 16,
    paddingBottom: 80,
  },
});