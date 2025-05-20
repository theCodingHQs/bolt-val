import { useRef } from 'react';
import { StyleSheet, Animated, View } from 'react-native';
import { FAB } from 'react-native-paper';
import { RefreshCw } from 'lucide-react-native';
import { useQueryClient } from '@tanstack/react-query';

const QueriesInvalidatorButton = () => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const queryClient = useQueryClient();
  const onRefreshQueries = () => { queryClient.invalidateQueries() }
  const handlePress = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.8,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onRefreshQueries();
    });
  };

  return (
    <View style={styles.container}>
      <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
        <FAB
          icon={({ color, size }) => (
            <RefreshCw color={"#F0F0F0"} size={size} />
          )}
          style={styles.fab}
          onPress={handlePress}
          mode="elevated"
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    zIndex: 10,
  },
  fab: {
    backgroundColor: '#222222',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
});

export default QueriesInvalidatorButton;
