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
  const checkPermission = async () => {
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
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn('Permission error:', err);
        return false;
      }
    }
    return true;
  };

  const dial = async (phoneNumber: string) => {
    if (!phoneNumber) {
      Alert.alert('Error', 'Phone number is required');
      return;
    }

    const hasPermission = await checkPermission();
    if (!hasPermission) {
      Alert.alert(
        'Permission denied',
        'Cannot make a phone call without permission.'
      );
      return;
    }

    const url = `tel:${phoneNumber}`;
    try {
      const supported = await Linking.canOpenURL(url);
      if (!supported) {
        Alert.alert('Error', 'Phone calls are not supported on this device');
        return;
      }

      await Linking.openURL(url);
    } catch (err) {
      console.error('Error making phone call:', err);
      Alert.alert('Error', 'Failed to make phone call');
    }
  };

  return { dial };
};