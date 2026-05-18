import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useDispatch } from 'react-redux';
import {
  increase,
  decrease,
  removeFromCart,
} from '../store/cartSlice';

import { formatDate, formatTime } from '../utils/date';

export default function CartItem({ item, isDark }: any) {
  const dispatch = useDispatch();

  const total = item.price * item.quantity;

  return (
    <View
      style={styles.container}
    >
      <View pointerEvents="none">
        <Image source={{ uri: item.image }} style={styles.image} />
      </View>

      <TouchableOpacity
        style={styles.remove}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        onPress={() => dispatch(removeFromCart(item.id))}
        >
        <Icon name="trash-outline" size={18} color="red" />
      </TouchableOpacity>

      <View style={styles.info}>
        <Text style={styles.title}>
            {item.title}
        </Text>

        <Text style={{ color: '#888', marginTop: 4 }}>
          {item.location}
        </Text>

        <Text style={{ color: '#888', marginTop: 6 }}>
          {formatDate(item.date)}
        </Text>

        <Text style={{ color: '#888' }}>
          {formatTime(item.date)}
        </Text>
      </View>

      <Text style={styles.price}>${total}</Text>
      <View style={styles.counter}>
        <TouchableOpacity
          onPress={() => dispatch(decrease(item.id))}
        >
          <Text style={styles.btn}>◀</Text>
        </TouchableOpacity>

        <Text style={styles.qty}>{item.quantity}</Text>

        <TouchableOpacity
          onPress={() => dispatch(increase(item.id))}
        >
          <Text style={styles.btn}>▶</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
    marginBottom: 16,
    borderRadius: 16,
    padding: 12,
    flexDirection: 'row',
    position: 'relative',
    elevation: 4,
    backgroundColor: '#fff',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 12,
  },

  info: {
    flex: 1,
    marginLeft: 12,
  },

  title: {
  fontSize: 16,
  fontWeight: 'bold',
  color: '#000', 
  },

  remove: {
  position: 'absolute',
  top: 6,
  right: 6,
  width: 24,
  height: 24,
  borderRadius: 18,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#fff',

  zIndex: 999,       
  elevation: 10,      
},

  price: {
    position: 'absolute',
    right: 12,
    top: '45%',
    fontWeight: 'bold',
    fontSize: 16,
  },

  counter: {
    position: 'absolute',
    right: 12,
    bottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },

  btn: {
    fontSize: 18,
    paddingHorizontal: 8,
  },

  qty: {
    fontSize: 14,
    marginHorizontal: 6,
  },
});