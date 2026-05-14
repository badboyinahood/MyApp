import {
  SafeAreaView,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Text,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';

import Header from '../components/Header';
import SearchInput from '../components/SearchInput';
import CategoryList from '../components/CategoryList';
import EventCard from '../components/EventCard';

import { fetchEvents } from '../api/api';

export default function HomeScreen() {
  const navigation = useNavigation<any>();

  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchEvents()
      .then(data => setEvents(data))
      .catch(() => setError('Failed to load events'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <ActivityIndicator size="large" />
        </View>
      ) : error ? (
        <Text style={{ padding: 20 }}>{error}</Text>
      ) : (
        <FlatList
          data={events}
          keyExtractor={(item, index) =>
            item.id ? item.id.toString() : index.toString()
          }
          renderItem={({ item }) => (
            <EventCard
              title={item.title}
              location={item.location}
              date={item.date}
              image={item.image}
              onPress={() =>
                navigation.navigate('Details', { event: item })
              }
            />
          )}
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
    backgroundColor: '#F5F6FA',
  },
  content: {
    padding: 16,
    paddingBottom: 80,
  },
});