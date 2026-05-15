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

import { COLORS } from '../constants/colors';

export default function DetailsScreen() {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === 'dark';

  const navigation = useNavigation<any>();
  const route = useRoute<any>();

  const event = route.params?.event;

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDark ? '#121212' : '#fff' },
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
                {event.date}
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
            </View>
          </ScrollView>

          <View style={styles.footer}>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Buy tickets</Text>
            </TouchableOpacity>
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

  scroll: {
    paddingBottom: 120,
  },

  footer: {
    position: 'absolute',
    bottom: 20,
    left: 16,
    right: 16,
  },

  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    borderRadius: 25,
    alignItems: 'center',
    elevation: 5,
  },

  buttonText: {
    color: COLORS.white,
    fontWeight: '600',
  },
});