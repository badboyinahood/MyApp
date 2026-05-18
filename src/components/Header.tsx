import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useContext } from 'react';
import { useNavigation } from '@react-navigation/native';

import { COLORS } from '../constants/colors';
import { ThemeContext } from '../context/ThemeContext';

type Props = {
  title: string;
  onBackPress?: () => void;
};

export default function Header({ title, onBackPress }: Props) {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const navigation = useNavigation<any>();

  const isDark = theme === 'dark';

  return (
        <View style={styles.container}>
      <View style={styles.side}>
        {onBackPress && (
          <TouchableOpacity onPress={onBackPress}>
            <Icon
              name="arrow-back"
              size={22}
              color={isDark ? '#fff' : '#000'}
            />
          </TouchableOpacity>
        )}
      </View>

      <Text
        style={[
          styles.title,
          {
            color: isDark ? '#fff' : COLORS.text,
          },
        ]}
      >
        {title}
      </Text>

      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.iconWrapper}
          onPress={() => navigation.navigate('Favorites')}
        >
          <Icon
            name="heart-outline"
            size={20}
            color={isDark ? '#fff' : '#000'}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.iconWrapper}
          onPress={toggleTheme}
        >
          <Icon
            name={isDark ? 'sunny' : 'moon'}
            size={20}
            color={isDark ? '#fff' : '#000'}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
  height: 50,
  justifyContent: 'center',
  alignItems: 'center', 
  marginBottom: 10,
  },

  side: {
    position: 'absolute',
    left: 0,
    width: 40,
    alignItems: 'flex-start',
  },

  title: {
    position: 'absolute',
    alignSelf: 'center',  
    fontSize: 18,
    fontWeight: '500',
  },

  actions: {
    position: 'absolute',
    right: 0,
    flexDirection: 'row',
  },

    iconWrapper: {
    width: 36,
    height: 36,
    justifyContent: 'center', 
    alignItems: 'center',
    marginLeft: 6,
  },
});