import {
  SafeAreaView,
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import { useSelector } from 'react-redux';
import { useContext, useState, useMemo } from 'react';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

import { RootState } from '../store/store';
import { ThemeContext } from '../context/ThemeContext';
import EventCard from '../components/EventCard';

export default function FavoritesScreen() {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === 'dark';

  const navigation = useNavigation<any>();

  const [showPast, setShowPast] = useState(false);

  const favorites = useSelector(
    (state: RootState) => state.favorites.items
  );

  const { activeEvents, pastEvents } = useMemo(() => {
    const now = new Date();

    const activeEvents = favorites.filter(item => {
      const parsed = new Date(item.date);
      return isNaN(parsed.getTime()) || parsed >= now;
    });

    const pastEvents = favorites.filter(item => {
      const parsed = new Date(item.date);
      return !isNaN(parsed.getTime()) && parsed < now;
    });

    return { activeEvents, pastEvents };
  }, [favorites]);

  const data = showPast ? pastEvents : activeEvents;

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: isDark ? '#121212' : '#F5F6FA' },
      ]}
    >
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
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
            isPast={showPast}
          />
        )}
        ListHeaderComponent={
          <>
            <View style={styles.header}>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={styles.backBtn}
              >
                <Icon
                  name="arrow-back"
                  size={22}
                  color={isDark ? '#fff' : '#000'}
                />
              </TouchableOpacity>

              <Text
                style={[
                  styles.headerTitle,
                  { color: isDark ? '#fff' : '#000' },
                ]}
              >
                Favorites
              </Text>

              <View style={{ width: 40 }} />
            </View>

            <View style={styles.switch}>
              <TouchableOpacity
                style={[
                  styles.tab,
                  !showPast && styles.activeTab,
                ]}
                onPress={() => setShowPast(false)}
              >
                <Text
                  style={[
                    styles.tabText,
                    !showPast && styles.activeText,
                  ]}
                >
                  Active ({activeEvents.length})
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.tab,
                  showPast && styles.activeTab,
                ]}
                onPress={() => setShowPast(true)}
              >
                <Text
                  style={[
                    styles.tabText,
                    showPast && styles.activeText,
                  ]}
                >
                  Past ({pastEvents.length})
                </Text>
              </TouchableOpacity>
            </View>
          </>
        }
        ListEmptyComponent={
          <Text
            style={[
              styles.empty,
              { color: isDark ? '#aaa' : '#333' },
            ]}
          >
            No events here
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

  content: {
    padding: 16,
    paddingBottom: 80,
  },

  header: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },

  backBtn: {
    position: 'absolute',
    left: 0,
    padding: 10,
  },

  switch: {
    flexDirection: 'row',
    marginBottom: 16,
  },

  tab: {
    flex: 1,
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#ddd',
    marginHorizontal: 4,
    alignItems: 'center',
  },

  activeTab: {
    backgroundColor: '#000',
  },

  tabText: {
    color: '#000',
  },

  activeText: {
    color: '#fff',
    fontWeight: 'bold',
  },

  empty: {
    textAlign: 'center',
    marginTop: 40,
  },
});