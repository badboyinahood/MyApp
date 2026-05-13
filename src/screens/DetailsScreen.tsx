import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

import { COLORS } from '../constants/colors';

export default function DetailsScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();

  const event = route.params?.event;

  if (!event) {
    return <Text>No event data</Text>;
  }

  return (
    <View style={styles.container}>
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

        <View style={styles.content}>
          <Text style={styles.title}>{event.title}</Text>
          <Text style={styles.text}>{event.location}</Text>
          <Text style={styles.text}>{event.date}</Text>

          <Text style={styles.sectionTitle}>
            About this event
          </Text>

          <Text style={styles.description}>
            {event.description}
          </Text>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>
            Buy tickets
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
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
    backgroundColor: COLORS.white,
    marginTop: -20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: COLORS.text,
  },

  text: {
    color: COLORS.subText,
    marginBottom: 6,
  },

  sectionTitle: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
  },

  description: {
    marginTop: 10,
    color: COLORS.subText,
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