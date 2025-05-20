import { useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { FAB, TextInput, useTheme } from 'react-native-paper';

export default function SearchButtonInput({
  value,
  onChangeText,
}: {
  value: string;
  onChangeText: (value: string) => void;
}) {
  const [searchVisible, setSearchVisible] = useState(false);

  const widthAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(widthAnim, {
      toValue: searchVisible ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [searchVisible]);

  const { colors, roundness } = useTheme();

  const animatedWidth = widthAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '80%'],
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.inputContainer, { width: animatedWidth }]}>
        {searchVisible && (
          <TextInput
            mode="outlined"
            placeholder="Search..."
            value={value}
            onChangeText={onChangeText}
            style={styles.input}
            dense
          />
        )}
      </Animated.View>

      <FAB
        size="small"
        icon={searchVisible ? 'close' : 'magnify'}
        style={{ backgroundColor: colors.background }}
        onPress={() => {
          if (searchVisible) {
            onChangeText('');
          }
          setSearchVisible(!searchVisible);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputContainer: {
    marginRight: 12,
  },
  input: {
    height: 40,
    backgroundColor: '#fff',
  },
});
