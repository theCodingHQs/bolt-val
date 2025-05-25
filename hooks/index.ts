import { Alert, Linking, PermissionsAndroid, Platform } from 'react-native';

export const accordionColorTrigger = (
  status: string
): { backgroundColor: string; color: string } => {
  const colorMap: Record<string, { backgroundColor: string; color: string }> = {
    VALUATION_NEW: {
      backgroundColor: '#bbdafa',
      color: '#3189e0',
    },
    VALUATION_DRAFT: {
      backgroundColor: '#fcf8d2',
      color: '#ab9d07',
    },
    READY_FOR_VISIT: {
      backgroundColor: '#dbebff',
      color: '#2563EB',
    },
    VISIT_DELAYED: {
      backgroundColor: '#fde1e1',
      color: '#B91C1C',
    },
    VISIT_COMPLETED: {
      backgroundColor: '#aff1f1',
      color: '#008080',
    },
    REPORT_DELAYED: {
      backgroundColor: '#f9e7c2',
      color: '#f1a200',
    },
    VALUATION_COMPLETED: {
      backgroundColor: '#93edbf',
      color: '#047857',
    },
    VALUATION_DELETED: {
      backgroundColor: '#ffb9b9',
      color: '#f97171',
    },
    VALUATION_CANCELLED: {
      backgroundColor: '#dadada',
      color: '#000000',
    },
  };

  return (
    colorMap[status] || {
      backgroundColor: '#15803D',
      color: 'black',
    }
  );
};

export const usePhoneDialer = () => {
  const dial = async (phoneNumber: string) => {
    const url = `tel:${phoneNumber}`;

    const supported = await Linking.canOpenURL(url);
    if (!supported) {
      Alert.alert('Phone call not supported on this device');
      return;
    }

    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CALL_PHONE,
          {
            title: 'Phone Call Permission',
            message: 'This app needs permission to make phone calls.',
            buttonPositive: 'OK',
            buttonNegative: 'Cancel',
          }
        );

        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          Alert.alert(
            'Permission denied',
            'Cannot make a phone call without permission.'
          );
          return;
        }
      } catch (err) {
        console.warn('Permission error:', err);
        Alert.alert(
          'Permission error',
          'Failed to request phone call permission.'
        );
        return;
      }
    }

    await Linking.openURL(url);
  };

  return { dial };
};
