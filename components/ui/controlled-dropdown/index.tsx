import { Modal } from '@/components/modal';
import { CheckIcon, ChevronDownIcon } from 'lucide-react-native';
import { useState } from 'react';
import { Platform, Pressable, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';

interface DropDownMenuProps {
  list: any[];
  label: string;
  value: any;
  valueField?: string;
  labelField?: string;
  onChange: (value: any) => void;
}

const DropDownMenu = ({
  list,
  label,
  value,
  valueField = 'code_value',
  labelField = 'code_desc',
  onChange,
}: DropDownMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectedItem = list.find((item) => item[valueField] == value);
  const { colors, roundness, fonts } = useTheme();

  const isWeb = Platform.OS == 'web';
  const toggleModal = (is: boolean) => {
    setIsOpen(is);
  };

  const getIsSelected = (item: any) =>
    selectedItem?.[valueField] === item[valueField];

  const onSelectItem = (item: any) => {
    onChange?.(item[valueField]);
    toggleModal(false);
  };

  return (
    <Modal
      isOpen={isOpen}
      setIsOpen={toggleModal}
      modalStyle={{
        width: 300,
        height: Math.min(list.length * 40 + 50, 400),
        backgroundColor: 'white',
      }}
      triggerStyle={{ padding: 0, backgroundColor: 'transparent' }}
      triggerIcon={
        <View
          style={{
            display: 'flex',
            position: 'relative',
            flexDirection: selectedItem ? 'column' : 'row',
            justifyContent: 'space-between',
            alignItems: selectedItem ? 'flex-start' : 'center',
            minWidth: 227,
            height: 35,
            borderWidth: 1,
            borderColor: colors.outline,
            borderRadius: roundness,
            padding: 8,
          }}
        >
          {selectedItem ? (
            <>
              <Text
                style={{
                  color: colors.onBackground,
                  backgroundColor: colors.background,
                  position: 'absolute',
                  transform: isWeb
                    ? 'translateY(-110%)'
                    : [{ translateY: -10 }, { translateX: 10 }],
                  fontSize: fonts.labelMedium.fontSize,
                }}
              >
                {label}
              </Text>
              <Text style={{ color: colors.onBackground }}>
                {selectedItem[labelField]}
              </Text>
            </>
          ) : (
            <>
              <Text style={{ color: colors.onBackground }}>{label}</Text>
              <ChevronDownIcon size={18} color="#444" />
            </>
          )}
        </View>
      }
    >
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
          padding: 10,
        }}
      >
        {list.map((item) => (
          <Pressable
            key={item[valueField]}
            style={{
              width: '100%',
            }}
            onPress={() => onSelectItem(item)}
          >
            <View
              style={{
                borderRadius: roundness,
                overflow: 'hidden',
                backgroundColor: getIsSelected(item)
                  ? colors.primary
                  : '#f0f0f0',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingRight: 10,
              }}
            >
              <Text
                style={{
                  // width: '100%',
                  flexGrow: 1,
                  height: '100%',
                  padding: 6,
                  color: getIsSelected(item) ? colors.inversePrimary : '#444',
                }}
              >
                {item[labelField]}
              </Text>
              {selectedItem?.[valueField] === item[valueField] && (
                <Text>
                  <CheckIcon size={18} color="#444" />
                </Text>
              )}
            </View>
          </Pressable>
        ))}
      </View>
    </Modal>
  );
};

export default DropDownMenu;
