import {
  SafeAreaView,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState, useContext } from 'react';

import Header from '../components/Header';
import SearchInput from '../components/SearchInput';
import CategoryList from '../components/CategoryList';
import EventCard from '../components/EventCard';

import { fetchEvents } from '../api/api';
import { ThemeContext } from '../context/ThemeContext';

export default function HomeScreen() {
  const navigation = useNavigation<any>();
  const { theme } = useContext(ThemeContext);

  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents()
      .then(data => setEvents(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          backgroundColor:
            theme === 'light' ? '#F5F6FA' : '#1E1E1E',
        },
      ]}
    >
      {loading ? (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <FlatList
          data={events}
          keyExtractor={(item, index) =>
            item.id ? item.id.toString() : index.toString()
          }
          renderItem={({ item, index }) => {
            const parsedId = item.id ? parseInt(item.id) : index + 1;

            return (
              <EventCard
                id={parsedId}
                title={item.title}
                location={item.location}
                date={item.date}
                image={item.image}
                onPress={() =>
                  navigation.navigate('Details', { event: item })
                }
              />
            );
          }}
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

  content: {
    padding: 16,
    paddingBottom: 80,
  },
});