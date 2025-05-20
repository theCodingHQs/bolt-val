import {
  Controller,
  ControllerFieldState,
  ControllerRenderProps,
  UseFormReturn,
  UseFormStateReturn,
} from 'react-hook-form';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { TextInput, useTheme } from 'react-native-paper';
import DropDownMenu from '../controlled-dropdown';
import DatePicker from '../date-picker';

const ControlledErrorMessage = ({
  validation,
  name,
}: {
  validation: UseFormReturn;
  name: string;
}) =>
  validation.formState.errors[name] && (
    <Text style={styles.error}>
      {validation.formState.errors[name].message as string}
    </Text>
  );
export const ControlledDropDownMenu = ({
  validation,
  name,
  list,
  label,
  valueField,
  labelField,
}: {
  name: string;
  validation: UseFormReturn<any, any, any>;
  list: any[];
  label: string;
  valueField?: string;
  labelField?: string;
}) => {
  return (
    <ControllerView name={name} validation={validation}>
      {({ field: { onChange, value } }) => (
        <DropDownMenu
          list={list}
          label={label}
          value={value}
          valueField={valueField}
          labelField={labelField}
          onChange={onChange}
        />
      )}
    </ControllerView>
  );
};

export const ControlledTextInput = ({
  validation,
  name,
  label,
  multiline,
}: {
  validation: UseFormReturn<any, any, any>;
  name: string;
  label: string;
  multiline?: boolean;
}) => {
  return (
    <ControllerView name={name} validation={validation} multiline={multiline}>
      {({ field: { onChange, value } }) => (
        <TextInput
          label={label}
          value={value}
          onChangeText={onChange}
          mode="outlined"
          style={{ height: multiline ? 80 : 35 }}
          multiline={multiline}
          numberOfLines={multiline ? 0 : undefined}
        />
      )}
    </ControllerView>
  );
};

export const ControlledDatePicker = ({
  validation,
  name,
  label,
  multiline,
}: {
  validation: UseFormReturn<any, any, any>;
  name: string;
  label: string;
  multiline?: boolean;
}) => {
  const { colors, roundness, fonts } = useTheme();
  const isWeb = Platform.OS == 'web';

  return (
    <ControllerView name={name} validation={validation} multiline={multiline}>

      {({ field: { onChange, value } }) => (
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
          <DatePicker
            date={new Date(value)}
            onChangeOrConfirm={(params) => onChange(params.date!)}
          />
        </>
      )}
    </ControllerView>
  );
};

const ControllerView = ({
  name,
  validation,
  multiline,
  children,
}: {
  validation: UseFormReturn<any, any, any>;
  name: string;
  multiline?: boolean;
  children: ({
    field,
    fieldState,
    formState,
  }: {
    field: ControllerRenderProps<any, string>;
    fieldState: ControllerFieldState;
    formState: UseFormStateReturn<any>;
  }) => React.ReactNode;
}) => (
  <Controller
    control={validation.control}
    name={name}
    render={(...args) => (
      <View
        style={{
          marginBottom: 1,
          marginTop: 1,
          minWidth: 230,
          width: multiline || Platform.OS !== 'web' ? '100%' : 'auto',
        }}
      >
        {children?.(...args)}
        <ControlledErrorMessage validation={validation} name={name} />
      </View>
    )}
  />
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 16,
    justifyContent: 'center',
  },
  submitButton: {
    marginTop: 20,
  },
  form: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'baseline',
    gap: 5,
  },
  error: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
});
