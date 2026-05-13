import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  LayoutAnimation,
  UIManager,
  Platform,
} from 'react-native';

type Props = {
  item: any;
  onPress: () => void;
  onAdd: () => void;
};

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

function PostItem({ item, onPress, onAdd }: Props) {
  const [expanded, setExpanded] = useState(false);

  const toggle = () => {
    LayoutAnimation.easeInEaseOut();
    setExpanded(!expanded);
  };

  return (
    <View
      style={{
        backgroundColor: '#fff',
        marginHorizontal: 16,
        marginVertical: 8,
        borderRadius: 12,
        padding: 16,
        elevation: 3,
      }}
    >
      <TouchableOpacity onPress={toggle}>
        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
          {item.title}
        </Text>

        {expanded && (
          <Text style={{ marginTop: 8, color: '#555' }}>
            {item.body}
          </Text>
        )}
      </TouchableOpacity>

      <View style={{ flexDirection: 'row', marginTop: 10 }}>
        <TouchableOpacity onPress={onPress}>
          <Text style={{ color: '#2F80ED', marginRight: 15 }}>
            Details
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={onAdd}>
          <Text style={{ color: '#27AE60' }}>
            Add
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default React.memo(PostItem);