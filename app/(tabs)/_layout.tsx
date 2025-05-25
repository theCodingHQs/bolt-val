import { useSearchStore } from '@/store/search';
import { Tabs } from 'expo-router';
import { List, MoreVerticalIcon } from 'lucide-react-native';

export default function TabLayout() {
  const setQuery = useSearchStore((state) => state.setQuery);

  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        tabBarShowLabel: true,
        headerSearchBarOptions: {
          autoFocus: true,
          onChangeText(e) {
            setQuery(e.nativeEvent.text);
          },
        },
        tabBarActiveTintColor: '#007AFF',
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Valuations',
          tabBarIcon: ({ color, size }) => <List size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'More',
          tabBarIcon: ({ color, size }) => (
            <MoreVerticalIcon size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}