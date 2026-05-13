import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import { COLORS } from '../constants/colors';

type Props = {
  title: string;
  location: string;
  date: string;
  image: string;
  onPress: () => void;
};

function EventCard({
  title,
  location,
  date,
  image,
  onPress,
}: Props) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Image source={{ uri: image }} style={styles.image} />

      <View style={styles.info}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.location}>{location}</Text>
        <Text style={styles.date}>{date}</Text>
      </View>

      <View style={styles.button}>
        <Text style={styles.buttonText}>Buy Tickets</Text>
      </View>
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
    justifyContent: 'space-between',
  },

  title: {
    fontWeight: 'bold',
    fontSize: 16,
    color: COLORS.text,
  },

  location: {
    color: COLORS.subText,
    marginTop: 25,
  },

  date: {
    color: '#999',
    fontSize: 12,
    marginBottom: 25,
  },

  button: {
    alignSelf: 'flex-end',
    backgroundColor: COLORS.primary,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
  },

  buttonText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: '600',
  },
});