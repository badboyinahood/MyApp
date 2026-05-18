import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import { addToCart } from '../store/cartSlice';
import { COLORS } from '../constants/colors';
import { useDispatch, useSelector } from 'react-redux';
import {
  addFavorite,
  removeFavorite,
} from '../store/favoritesSlice';
import { RootState } from '../store/store';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

type Props = {
  id: number;
  title: string;
  location: string;
  date: string;
  image: string;
  description: string;
  price: number;
  onPress: () => void;
  isPast?: boolean;
};

function EventCard({
  id,
  title,
  location,
  date,
  image,
  description,
  price, 
  onPress,
  isPast = false,
}: Props) {
  const dispatch = useDispatch();

  const favorites = useSelector(
    (state: RootState) => state.favorites.items
  );

  const isFavorite = favorites.some(
    (f) => f.id === id
  );

  const handleFavorite = () => {
    LayoutAnimation.configureNext(
      LayoutAnimation.Presets.easeInEaseOut
    );

    if (isFavorite) {
      dispatch(removeFavorite(id));
    } else {
      dispatch(
        addFavorite({
          id,
          title,
          location,
          date,
          image,
          description,
          price, 
        })
      );
    }
  };

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const formatTime = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.8}
      disabled={isPast}
    >
      <Image source={{ uri: image }} style={styles.image} />

      <TouchableOpacity
        style={styles.heart}
        onPress={handleFavorite}
      >
        <Icon
          name={isFavorite ? 'heart' : 'heart-outline'}
          size={16}
          color={isFavorite ? '#E53935' : '#999'}
        />
      </TouchableOpacity>

      <View style={styles.info}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.location}>{location}</Text>

        <View style={styles.dateBlock}>
          <Text style={styles.dateText}>
            {formatDate(date)}
          </Text>
          <Text style={styles.dateText}>
            {formatTime(date)}
          </Text>
        </View>
      </View>

      {!isPast && (
        <TouchableOpacity
            style={styles.button}
            onPress={() =>
                dispatch(
                  addToCart({
                    id,
                    title,
                    location,
                    date,
                    image,
                    price, 
                  })
                )
              }
          >
            <Text style={styles.buttonText}>
              Add to cart
            </Text>
          </TouchableOpacity>
      )}

      {isPast && (
        <View style={styles.overlay}>
          <Text style={styles.overlayText}>
            Event unavailable
          </Text>
        </View>
      )}
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

  dateBlock: {
    marginTop: 10,
  },

  dateText: {
    color: '#777',
    fontSize: 12,
    marginTop: 2,
  },

  heart: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 4,
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

  overlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },

  overlayText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});