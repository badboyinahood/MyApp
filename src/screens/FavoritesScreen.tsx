import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useContext } from 'react';

import { removeFavorite } from '../store/favoritesSlice';
import { ThemeContext } from '../context/ThemeContext';
import { RootState } from '../store/store';

export default function FavoritesScreen() {
  const dispatch = useDispatch();

  const { theme } = useContext(ThemeContext);
  const isDark = theme === 'dark';

  const favorites = useSelector(
    (state: RootState) => state.favorites.items
  );

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDark ? '#121212' : '#fff' },
      ]}
    >
      <Text
        style={[
          styles.title,
          { color: isDark ? '#fff' : '#000' },
        ]}
      >
        Favorites
      </Text>

      {favorites.length === 0 ? (
        <Text style={{ color: isDark ? '#aaa' : '#000' }}>
          No favorites yet
        </Text>
      ) : (
        favorites.map((item) => (
          <View key={item.id} style={styles.row}>
            <Text style={{ color: isDark ? '#fff' : '#000' }}>
              {item.title}
            </Text>

            <TouchableOpacity
              onPress={() =>
                dispatch(removeFavorite(item.id))
              }
            >
              <Text style={styles.remove}>Remove</Text>
            </TouchableOpacity>
          </View>
        ))
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },

  remove: {
    color: 'red',
  },
});