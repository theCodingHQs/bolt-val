import { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { DatePickerModal } from 'react-native-paper-dates';
import {
  CalendarDate,
  SingleChange,
} from 'react-native-paper-dates/lib/typescript/Date/Calendar';

const DatePicker = ({
  date,
  onChangeOrConfirm,
}: {
  date: CalendarDate;
  onChangeOrConfirm: SingleChange;
}) => {
  const { colors, roundness } = useTheme();
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);

  const toggleDatePicker = () => {
    setIsDatePickerVisible(!isDatePickerVisible);
  };

  const handleDateSelect = (params: { date: CalendarDate | undefined }) => {
    toggleDatePicker();
    onChangeOrConfirm(params);
  };

  return (
    <View
      style={{
        backgroundColor: colors.background,
        borderRadius: roundness,
        borderWidth: 1,
        borderColor: colors.outline,
        marginTop: 2,
        height: 35,
        justifyContent: 'center',
      }}
    >
      <TouchableOpacity onPress={toggleDatePicker}>
        <Text
          style={{
            paddingHorizontal: 10,
            paddingVertical: 6,
            color: colors.onBackground,
          }}
        >
          {date ? date.toDateString?.() ?? 'Select Date' : 'Select Date'}
        </Text>
      </TouchableOpacity>

      <DatePickerModal
        locale="en"
        mode="single"
        visible={isDatePickerVisible}
        date={date}
        onDismiss={toggleDatePicker}
        onConfirm={handleDateSelect}
        onChange={handleDateSelect}
      />
    </View>
  );
};

export default DatePicker;
