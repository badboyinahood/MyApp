import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import Icon from 'react-native-vector-icons/Ionicons';
import { formatDate, formatTime } from '../utils/date';
import { COLORS } from '../constants/colors';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';

export default function DetailsScreen() {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === 'dark';

  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const dispatch = useDispatch();

  const event = route.params?.event;

  const handleAddToCart = () => {
    dispatch(addToCart(event));
  };

  const handleBuyNow = () => {
    dispatch(addToCart(event));
    navigation.navigate('Main', {
      screen: 'Cart',
    });
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDark ? '#1E1E1E' : '#fff' },
      ]}
    >
      {!event ? (
        <Text style={{ padding: 20, color: isDark ? '#fff' : '#000' }}>
          No event data
        </Text>
      ) : (
        <>
          <ScrollView contentContainerStyle={styles.scroll}>
            <View style={styles.imageWrapper}>
              <Image source={{ uri: event.image }} style={styles.image} />

              <View style={styles.overlay} />

              <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.goBack()}
              >
                <Icon name="arrow-back" size={24} color="#fff" />
              </TouchableOpacity>
            </View>

            <View
              style={[
                styles.content,
                { backgroundColor: isDark ? '#1E1E1E' : '#fff' },
              ]}
            >
              <Text
                style={[
                  styles.title,
                  { color: isDark ? '#fff' : COLORS.text },
                ]}
              >
                {event.title}
              </Text>

              <Text
                style={[
                  styles.text,
                  { color: isDark ? '#aaa' : COLORS.subText },
                ]}
              >
                {event.location}
              </Text>

              <Text
                style={[
                  styles.text,
                  { color: isDark ? '#aaa' : COLORS.subText },
                ]}
              >
                {formatDate(event.date)}
              </Text>

              <Text
                style={[
                  styles.text,
                  { color: isDark ? '#aaa' : COLORS.subText },
                ]}
              >
                {formatTime(event.date)}
              </Text>

              <Text
                style={[
                  styles.sectionTitle,
                  { color: isDark ? '#fff' : COLORS.text },
                ]}
              >
                About this event
              </Text>

              <Text
                style={[
                  styles.description,
                  { color: isDark ? '#aaa' : COLORS.subText },
                ]}
              >
                {event.description}
              </Text>

              <View style={styles.extra}>
                <View style={styles.grid}>
                  <View style={styles.cell}>
                    <Text style={styles.label}>Venue</Text>
                    <Text style={styles.value}>{event.venue}</Text>
                  </View>

                  <View style={[styles.cell, styles.right]}>
                    <Text style={styles.label}>Duration</Text>
                    <Text style={styles.value}>{event.duration}</Text>
                  </View>

                  <View style={styles.cell}>
                    <Text style={styles.label}>Age</Text>
                    <Text style={styles.value}>{event.age}</Text>
                  </View>

                  <View style={[styles.cell, styles.right]}>
                    <Text style={styles.label}>Tickets</Text>
                    <Text style={styles.value}>{event.ticketInfo}</Text>
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>

          <View
            style={[
              styles.footer,
              {
                backgroundColor: isDark ? '#1E1E1E' : '#fff',
                borderTopColor: isDark ? '#333' : '#ddd',
              },
            ]}
          >
            <View style={styles.buttons}>
              <TouchableOpacity
                style={styles.cartBtn}
                onPress={handleAddToCart}
              >
                <Text
                  style={[
                    styles.cartText,
                    { color: isDark ? '#fff' : '#000' },
                  ]}
                >
                  Add to cart
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.buyBtn}
                onPress={handleBuyNow}
              >
                <Text style={styles.buttonText}>Buy now</Text>
              </TouchableOpacity>
            </View>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  imageWrapper: {
    position: 'relative',
  },

  image: {
    width: '100%',
    height: 260,
  },

  overlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },

  backButton: {
    position: 'absolute',
    top: 50,
    left: 16,
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: 8,
    borderRadius: 20,
  },

  content: {
    marginTop: -20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  text: {
    marginBottom: 6,
  },

  sectionTitle: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: '600',
  },

  description: {
    marginTop: 10,
    lineHeight: 20,
  },

  extra: {
    marginTop: 20,
    padding: 16,
    backgroundColor: '#E6EEF7',
    borderRadius: 16,
  },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  cell: {
    width: '50%',
    marginBottom: 12,
  },

  right: {
    alignItems: 'flex-end',
  },

  label: {
    color: '#666',
    fontSize: 12,
  },

  value: {
    fontWeight: '500',
    marginTop: 4,
  },

  scroll: {
    paddingBottom: 120,
  },

  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderTopWidth: 1,
  },

  buttons: {
    flexDirection: 'row',
    gap: 10,
  },

  cartBtn: {
    flex: 1,
    backgroundColor: '#ccc',
    paddingVertical: 14,
    borderRadius: 25,
    alignItems: 'center',
  },

  buyBtn: {
    flex: 1,
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    borderRadius: 25,
    alignItems: 'center',
  },

  cartText: {
    fontWeight: '600',
  },

  buttonText: {
    color: COLORS.white,
    fontWeight: '600',
  },
});