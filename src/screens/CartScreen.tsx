import {
  SafeAreaView,
  FlatList,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useSelector } from 'react-redux';
import { useContext, useMemo } from 'react';

import { RootState } from '../store/store';
import { ThemeContext } from '../context/ThemeContext';
import CartItem from '../components/CartItem';

export default function CartScreen() {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === 'dark';

  const cart = useSelector((state: RootState) => state.cart.items);

  const { subtotal, shipping, total } = useMemo(() => {
    const subtotal = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const shipping = cart.length > 0 ? 10 : 0;

    return {
      subtotal,
      shipping,
      total: subtotal + shipping,
    };
  }, [cart]);

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: isDark ? '#121212' : '#F5F6FA' },
      ]}
    >
      <FlatList
        data={cart}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
            <CartItem item={item} isDark={isDark} />
        )}
        contentContainerStyle={[
            styles.list,
            cart.length === 0 && styles.emptyList,
        ]}
        ListEmptyComponent={
            <Text
            style={[
                styles.emptyText,
                { color: isDark ? '#aaa' : '#555' },
            ]}
            >
            Your cart is empty
            </Text>
        }
        />

      <View
        style={[
          styles.totalBox,
          {
            backgroundColor: isDark ? '#1E1E1E' : '#fff',
            borderTopColor: isDark ? '#333' : '#ddd',
            borderBottomColor: isDark ? '#333' : '#ddd',
          },
        ]}
      >
        <View style={styles.inner}>
          <View style={styles.row}>
            <Text
              style={[
                styles.label,
                { color: isDark ? '#fff' : '#000' },
              ]}
            >
              Subtotal
            </Text>
            <Text
              style={[
                styles.value,
                { color: isDark ? '#fff' : '#000' },
              ]}
            >
              ${subtotal}
            </Text>
          </View>

          <View style={styles.row}>
            <Text
              style={[
                styles.label,
                { color: isDark ? '#fff' : '#000' },
              ]}
            >
              Shipping
            </Text>
            <Text
              style={[
                styles.value,
                { color: isDark ? '#fff' : '#000' },
              ]}
            >
              ${shipping}
            </Text>
          </View>

          <View style={styles.row}>
            <Text
              style={[
                styles.totalText,
                { color: isDark ? '#fff' : '#000' },
              ]}
            >
              Total
            </Text>
            <Text
              style={[
                styles.totalText,
                { color: isDark ? '#fff' : '#000' },
              ]}
            >
              ${total}
            </Text>
          </View>

          <TouchableOpacity style={styles.checkout}>
            <Text style={styles.checkoutText}>
              PROCEED TO CHECKOUT
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: { flex: 1 },

    totalBox: {
        paddingVertical: 16,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        alignItems: 'center',
    },

    inner: {
        width: '90%',
    },

    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },

    label: {
        fontSize: 14,
    },

    value: {
        fontSize: 14,
    },

    totalText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 4,
    },

    checkout: {
        marginTop: 12,
        backgroundColor: '#3CB371',
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: 'center',
    },

    checkoutText: {
        color: '#fff',
        fontWeight: '600',
    },

    list: {
        padding: 16,
    },
    emptyList: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    emptyText: {
        fontSize: 16,
    },
});