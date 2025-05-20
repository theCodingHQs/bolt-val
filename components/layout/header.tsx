import storage from '@/helpers/auth';
import { router, usePathname } from 'expo-router';
import { ArrowLeft, LogOut } from 'lucide-react-native';
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewProps,
} from 'react-native';

const getTitleAndBackStatus = (path: string) => {
  if (path.startsWith('/details')) return { title: 'Details', showBack: true };
  if (path === '/') return { title: '', showBack: false };
  return { title: 'App', showBack: false };
};

export default function Header({ children, ...props }: Readonly<ViewProps>) {
  const pathname = usePathname();
  const { title, showBack } = getTitleAndBackStatus(pathname || '/');

  const handleLogout = async () => {
    await storage.deleteItem('user');
    await storage.deleteItem('token');
    router.replace('/login');
  };

  return (
    <View {...props} style={styles.header}>
      <View style={{ display: 'flex', flexDirection: 'row' }}>
        {showBack && (
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backBtn}
          >
            <ArrowLeft size={24} color="#fff" />
          </TouchableOpacity>
        )}
        <Text style={styles.title}>{title}</Text>
      </View>
      <View
        style={{
          flex: 1,
          display: 'flex',
          justifyContent: 'flex-end',
          paddingHorizontal: 20,
        }}
      >
        {children}
      </View>
      <View>
        <Pressable
          style={{
            ...styles.menuItem,
            marginLeft: 'auto',
            backgroundColor: '#ffffff11',
            borderRadius: 5,
          }}
          onPress={handleLogout}
        >
          <LogOut size={20} color="#FF3B30" />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 56,
    backgroundColor: '#222',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#333',
  },
  backBtn: {
    marginRight: 12,
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  iconButton: {
    marginHorizontal: 8,
    padding: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  menuContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 8,
    height: '100%',
    // width: '100%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  menuItem: {
    padding: 8,
  },
  menuText: {
    marginRight: 12,
    fontSize: 16,
    color: '#333',
  },
  logoutText: {
    color: '#FF3B30',
  },
});
