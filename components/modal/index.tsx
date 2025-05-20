import { useEffect, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Modal as RNModal,
  ScrollView,
  StyleProp,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';
import { useTheme } from 'react-native-paper';

interface ModalProps {
  trigger?: React.ReactNode;
  triggerIcon?: React.ReactNode;
  triggerStyle?: StyleProp<ViewStyle>;
  children: React.ReactNode;
  transparent?: boolean;
  animationType?: 'none' | 'slide' | 'fade';
  modalStyle?: ViewStyle;
  isOpen?: boolean;
  setIsOpen?: (isOpen: boolean) => void;
}

export const Modal: React.FC<ModalProps> = ({
  trigger,
  triggerIcon,
  triggerStyle,
  children,
  transparent = true,
  animationType = 'fade',
  modalStyle = {},
  isOpen = false,
  setIsOpen,
}) => {
  const { colors, roundness } = useTheme();

  const [visible, setVisible] = useState(isOpen);

  const openModal = () => {
    if (setIsOpen) {
      setIsOpen(true);
    } else {
      setVisible(true);
    }
  };

  const closeModal = () => {
    if (setIsOpen) {
      setIsOpen(false);
    } else {
      setVisible(false);
    }
  };

  useEffect(() => {
    setVisible(isOpen);
  }, [isOpen]);
  return (
    <>
      <Pressable
        onPress={openModal}
        style={[styles.triggerDefault, triggerStyle]}
      >
        {triggerIcon}
        {trigger}
      </Pressable>

      <RNModal
        visible={visible}
        transparent={transparent}
        animationType={animationType}
        onRequestClose={closeModal}
      >
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={styles.backdrop} />
        </TouchableWithoutFeedback>

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.centeredView}
        >
          <View
            style={{
              ...styles.modalStyle,
              backgroundColor: colors.background,
              ...modalStyle,
            }}
          >
            <ScrollView style={{ flex: 1 }}>{children}</ScrollView>
          </View>
        </KeyboardAvoidingView>
      </RNModal>
    </>
  );
};

const styles = StyleSheet.create({
  triggerDefault: {
    padding: 4,
    backgroundColor: '#fff',
    borderRadius: 4,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 1,
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  centeredView: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalStyle: {
    width: '95%',
    height: '95%',
    borderRadius: 8,
    // padding: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
});
