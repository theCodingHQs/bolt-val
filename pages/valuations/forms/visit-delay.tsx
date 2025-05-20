import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';

import {
  ControlledDatePicker,
  ControlledTextInput,
} from '@/components/ui/react-hook-form-controlled-fields';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useUpdatePropertyVisitDelay } from '../api-queries/property';
import { Property } from '../models';

const FormSchema = z.object({
  id: z.number(),

  visit_rescheduled_date: z.preprocess(
    (val) => {
      if (val instanceof Date && !isNaN(val.getTime())) {
        // Convert Date to required format
        return format(val, 'yyyy-MM-dd');
      }
      return val; // assume it's already a string
    },
    z
      .string()
      .nonempty('Reschedule Date and Time required.')
      .refine(
        (val) => {
          const inputDateTime = new Date(val);
          const currentDateTime = new Date();
          return inputDateTime >= currentDateTime;
        },
        {
          message:
            'Cannot select a time earlier than the current date and time.',
        }
      )
  ),

  visit_delay_reason: z.string().nonempty({ message: 'Delay Reason Required' }),
});

type FormData = z.infer<typeof FormSchema>;

export default function VisitDelayForm({
  property,
}: Readonly<{ property: Property }>) {
  const validation = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      id: property.id,
      visit_rescheduled_date: new Date(
        property.visit_rescheduled_date || new Date()
      ),
    },
  });
  console.log(property);
  const { mutate: onSubmitPropertyDelay } = useUpdatePropertyVisitDelay();

  const onSubmit = (data: FormData) => {
    onSubmitPropertyDelay(data);
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <ControlledDatePicker
          label="Reschedule Date"
          name="visit_rescheduled_date"
          validation={validation}
        />
        <ControlledTextInput
          label="Reason For Delay"
          name="visit_delay_reason"
          validation={validation}
          multiline
        />
      </View>

      <Button
        mode="contained"
        onPress={validation.handleSubmit(onSubmit)}
        style={styles.submitButton}
      >
        Submit
      </Button>
    </View>
  );
}

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
    gap: 5,
  },
  error: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
});
