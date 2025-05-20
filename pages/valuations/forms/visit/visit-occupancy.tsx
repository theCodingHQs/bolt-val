import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';

import {
  ControlledDropDownMenu,
  ControlledTextInput,
} from '@/components/ui/react-hook-form-controlled-fields';
import { useUpdatePropertyVisit } from '../../api-queries/property-visit';
import { PropertyVisit, PropertyVisitOptions } from '../../models';
import { useVisitOccupancyForm } from './form-schema';

interface PropertyVisitProps {
  propertyVisit?: PropertyVisit;
  propertyVisitOptions?: PropertyVisitOptions;
}

const VisitOccupancy = ({
  propertyVisit,
  propertyVisitOptions,
}: PropertyVisitProps) => {
  const validation = useVisitOccupancyForm({
    ...propertyVisit,
  });

  const { mutate: updatePropertyVisit } = useUpdatePropertyVisit();
  const onSubmit = (data) => {
    updatePropertyVisit({ ...data });
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <ControlledDropDownMenu
          label="Occupancy Status"
          name="occupancy_status"
          validation={validation}
          list={propertyVisitOptions?.occupancy_status ?? []}
        />
        <ControlledDropDownMenu
          label="Relation With Applicant"
          name="relation_with_applicant"
          validation={validation}
          list={propertyVisitOptions?.occupant_relation ?? []}
        />

        <ControlledTextInput
          label="Occupied since"
          name="occupied_since"
          validation={validation}
        />

        <ControlledTextInput
          label="Occupied By"
          name="occupied_by"
          validation={validation}
        />
        <ControlledTextInput
          label="Name of person met at site"
          name="person_on_site_name"
          validation={validation}
        />
        <ControlledTextInput
          label="Person on site relation with applicant"
          name="person_on_site_relation_with_applicant"
          validation={validation}
        />
        <ControlledTextInput
          label="Contact number of person met at site"
          name="person_on_site_contact_number"
          validation={validation}
        />
        <ControlledTextInput
          label="Name on society board / plate"
          name="nameplate"
          validation={validation}
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
};

export default VisitOccupancy;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 16,
    // justifyContent: 'center',
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
