import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

import { COLORS } from '../constants/colors';
import { useDispatch, useSelector } from 'react-redux';
import {
  addFavorite,
  removeFavorite,
} from '../store/favoritesSlice';
import { RootState } from '../store/store';

type Props = {
  id: number;
  title: string;
  location: string;
  date: string;
  image: string;
  onPress: () => void;
};

function EventCard({
  id,
  title,
  location,
  date,
  image,
  onPress,
}: Props) {
  const dispatch = useDispatch();

  const favorites = useSelector(
    (state: RootState) => state.favorites.items
  );

  const isFavorite = favorites.some(
    (f) => f.id === id
  );

  const handleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFavorite(id));
    } else {
      dispatch(addFavorite({ id, title }));
    }
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Image source={{ uri: image }} style={styles.image} />

      {/* ❤️ ИЗБРАННОЕ */}
      <TouchableOpacity
        style={styles.heart}
        onPress={handleFavorite}
      >
        <Icon
          name={isFavorite ? 'heart' : 'heart-outline'}
          size={16} // 🔥 уменьшили
          color={isFavorite ? '#E53935' : '#999'}
        />
      </TouchableOpacity>

      <View style={styles.info}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.location}>{location}</Text>
        <Text style={styles.date}>{date}</Text>
      </View>

      {/* 🛒 КОРЗИНА */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Add to cart</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

export default React.memo(EventCard);

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    marginBottom: 16,
    borderRadius: 16,
    padding: 12,
    flexDirection: 'row',
    position: 'relative',
    elevation: 4,
  },

  image: {
    width: 120,
    height: 120,
    borderRadius: 12,
  },

  info: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },

  title: {
    fontWeight: 'bold',
    fontSize: 16,
    color: COLORS.text,
  },

  location: {
    color: COLORS.subText,
    marginTop: 8,
  },

  date: {
    color: '#999',
    fontSize: 12,
    marginTop: 4,
  },

  heart: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 4, // 🔥 уменьшили
    elevation: 3,
  },

  button: {
    position: 'absolute',
    right: 12,
    bottom: 12,
    backgroundColor: COLORS.primary,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },

  buttonText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: '600',
  },
});