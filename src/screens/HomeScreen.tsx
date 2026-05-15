import {
  SafeAreaView,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React, {
  useEffect,
  useState,
  useContext,
  useCallback,
} from 'react';

import Header from '../components/Header';
import SearchInput from '../components/SearchInput';
import CategoryList from '../components/CategoryList';
import EventCard from '../components/EventCard';

import { fetchEvents } from '../api/api';
import { ThemeContext } from '../context/ThemeContext';

type EventType = {
  id: string;
  title: string;
  location: string;
  date: string;
  image: string;
};

export default function HomeScreen() {
  const navigation = useNavigation<any>();
  const { theme } = useContext(ThemeContext);

  const [events, setEvents] = useState<EventType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents()
      .then(data => setEvents(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const renderItem = useCallback(
    ({ item, index }: { item: EventType; index: number }) => {
      const parsedId = item.id
        ? parseInt(item.id)
        : index + 1;

      return (
        <EventCard
          id={parsedId}
          title={item.title}
          location={item.location}
          date={item.date}
          image={item.image}
          onPress={() =>
            navigation.navigate('Details', {
              event: item,
            })
          }
        />
      );
    },
    [navigation]
  );

  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          backgroundColor:
            theme === 'dark' ? '#1E1E1E' : '#F5F6FA',
        },
      ]}
    >
      {loading ? (
        <View style={styles.loader}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <FlatList
          data={events}
          keyExtractor={(item, index) =>
            item.id
              ? item.id.toString()
              : index.toString()
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
      )}
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
  },

  content: {
    padding: 16,
    paddingBottom: 80,
  },
});