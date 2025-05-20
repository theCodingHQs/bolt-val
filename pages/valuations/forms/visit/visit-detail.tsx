import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';

import {
  ControlledDatePicker,
  ControlledDropDownMenu,
  ControlledTextInput,
} from '@/components/ui/react-hook-form-controlled-fields';
import { formatDateymd } from '@/helpers/utils';
import { useUpdatePropertyVisit } from '../../api-queries/property-visit';
import { Property, PropertyVisit, PropertyVisitOptions } from '../../models';
import { useVisitForm } from './form-schema';

interface PropertyVisitProps {
  property: Property;
  propertyVisit?: PropertyVisit;
  propertyVisitOptions?: PropertyVisitOptions;
  orgUsers?: any[];
  addPropertyVisit: Function;
}

const VisitDetail = ({
  addPropertyVisit,
  property,
  propertyVisit,
  orgUsers,
  propertyVisitOptions,
}: PropertyVisitProps) => {
  const validation = useVisitForm({
    ...propertyVisit,
    property_id: property?.id,
    visit_date: propertyVisit?.visit_date || formatDateymd(new Date()),
  });

  const { mutate: updatePropertyVisit } = useUpdatePropertyVisit();

  const onSubmit = (data) => {
    if (propertyVisit?.id) {
      updatePropertyVisit({ ...data });
    } else {
      addPropertyVisit({ ...data, amenities: [] });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <ControlledDropDownMenu
          label="Visited By"
          name="visited_by"
          labelField="full_name"
          valueField="id"
          validation={validation}
          list={orgUsers ?? []}
        />

        <ControlledDatePicker
          label="Visited Date"
          name="visit_date"
          validation={validation}
        />
        <ControlledTextInput
          label="Project Name"
          name="project_name"
          validation={validation}
        />
        <ControlledTextInput
          label="Building Name"
          name="building_name"
          validation={validation}
        />
        <ControlledTextInput
          label="Flat Number"
          name="flat_number"
          validation={validation}
        />
        <ControlledTextInput
          label="Survey Number"
          name="survey_number"
          validation={validation}
        />
        <ControlledTextInput
          label="Floor"
          name="floor"
          validation={validation}
        />
        <ControlledTextInput
          label="Village Name"
          name="village_name"
          validation={validation}
        />
        <ControlledTextInput
          label="Landmark"
          name="landmark"
          validation={validation}
        />
        <ControlledTextInput
          label="Pin Code"
          name="pin_code"
          validation={validation}
        />
        <ControlledTextInput
          label="Latitude"
          name="latitude"
          validation={validation}
        />
        <ControlledTextInput
          label="Longitude"
          name="longitude"
          validation={validation}
        />

        <ControlledDropDownMenu
          label="Construction Stage"
          name="construction_stage"
          validation={validation}
          list={propertyVisitOptions?.construction_stage ?? []}
        />
        <ControlledTextInput
          label="Construction Year"
          name="construction_year"
          validation={validation}
        />
        <ControlledDatePicker
          label="Project Start Date"
          name="project_start_date"
          validation={validation}
        />
        <ControlledDatePicker
          label="Project End Date"
          name="project_end_date"
          validation={validation}
        />
        <ControlledTextInput
          label="If under construction, give details of work completed"
          name="work_completed"
          validation={validation}
          multiline
        />

        <ControlledDropDownMenu
          label="Property Type"
          name="property_type"
          validation={validation}
          list={propertyVisitOptions?.property_type ?? []}
        />
        <ControlledDropDownMenu
          label="Structure Type"
          name="structure_type"
          validation={validation}
          list={propertyVisitOptions?.structure_type ?? []}
        />
        <ControlledDropDownMenu
          label="Property Condition"
          name="property_condition"
          validation={validation}
          list={propertyVisitOptions?.property_condition ?? []}
        />
        <ControlledDropDownMenu
          label="Doors"
          name="doors"
          validation={validation}
          list={propertyVisitOptions?.doors ?? []}
        />
        <ControlledDropDownMenu
          label="Windows"
          name="windows"
          validation={validation}
          list={propertyVisitOptions?.windows ?? []}
        />
        <ControlledDropDownMenu
          label="Flooring"
          name="flooring"
          validation={validation}
          list={propertyVisitOptions?.flooring ?? []}
        />
        <ControlledDropDownMenu
          label="Kitchen Platform"
          name="kitchen_platform"
          validation={validation}
          list={propertyVisitOptions?.kitchen_platform ?? []}
        />
        <ControlledDropDownMenu
          label="Paint"
          name="paint"
          validation={validation}
          list={propertyVisitOptions?.paint ?? []}
        />
        <ControlledDropDownMenu
          label="Electrification"
          name="electrification"
          validation={validation}
          list={propertyVisitOptions?.electrification ?? []}
        />
        <ControlledDropDownMenu
          label="Plumbing"
          name="plumbing"
          validation={validation}
          list={propertyVisitOptions?.plumbing ?? []}
        />

        <ControlledTextInput
          label="Pertmitted use of property"
          name="permitted_property_use"
          validation={validation}
        />
        <ControlledTextInput
          label="Actual use of property"
          name="actual_property_use"
          validation={validation}
        />
        <ControlledTextInput
          label="Lifts"
          name="no_of_lifts"
          validation={validation}
        />
        <ControlledTextInput
          label="Tenaments / Floor"
          name="no_of_tenements_per_floor"
          validation={validation}
        />
        <ControlledTextInput
          label="Wings / Buildings"
          name="no_of_wings"
          validation={validation}
        />
        <ControlledTextInput
          label="Number of Ground Floors"
          name="no_of_ground_floors"
          validation={validation}
        />
        <ControlledTextInput
          label="Number of Stilt Floors"
          name="no_of_stilt_floors"
          validation={validation}
        />
        <ControlledTextInput
          label="Number of Basements"
          name="no_of_basements"
          validation={validation}
        />
        <ControlledTextInput
          label="Number of Podiums"
          name="no_of_podiums"
          validation={validation}
        />
        <ControlledTextInput
          label="Number of Upper Floors"
          name="no_of_upper_floors"
          validation={validation}
        />
        <ControlledTextInput
          label="Number of Floors On Site"
          name="site_floors"
          validation={validation}
        />

        <ControlledDropDownMenu
          label="Ground floor details"
          name="ground_floor_details"
          validation={validation}
          list={propertyVisitOptions?.ground_floor_details ?? []}
        />
        <ControlledDropDownMenu
          label="Parking Alloted"
          name="parking_alloted"
          validation={validation}
          list={propertyVisitOptions?.parking_alloted ?? []}
        />

        <ControlledTextInput
          label="No of Open Parkings"
          name="no_of_open_parkings"
          validation={validation}
        />
        <ControlledTextInput
          label="No of Closed Parkings"
          name="no_of_closed_parkings"
          validation={validation}
        />
        <ControlledTextInput
          label="Plot Area"
          name="plot_area"
          validation={validation}
        />
        <ControlledTextInput label="Area" name="area" validation={validation} />
        <ControlledTextInput
          label="Terrace Area"
          name="terrace_area"
          validation={validation}
        />

        <ControlledDropDownMenu
          label="Surrounding Area"
          name="surrounding_area"
          validation={validation}
          list={propertyVisitOptions?.surrounding_area ?? []}
        />
        <ControlledDropDownMenu
          label="Access to the property"
          name="property_access"
          validation={validation}
          list={propertyVisitOptions?.property_access ?? []}
        />
        <ControlledDropDownMenu
          label="Nature of locality"
          name="locality_nature"
          validation={validation}
          list={propertyVisitOptions?.locality_nature ?? []}
        />
        <ControlledDropDownMenu
          label="Class of locality"
          name="locality_class"
          validation={validation}
          list={propertyVisitOptions?.locality_class ?? []}
        />
        <ControlledDropDownMenu
          label="Any negatives to locality?"
          name="locality_negative"
          validation={validation}
          list={propertyVisitOptions?.locality_negative ?? []}
        />

        <ControlledTextInput
          label="Details"
          name="locality_negative_remark"
          validation={validation}
          multiline
        />

        <ControlledDropDownMenu
          label="Property easily identifiable"
          name="easily_identifiable"
          validation={validation}
          list={propertyVisitOptions?.easily_identifiable ?? []}
        />
        <ControlledDropDownMenu
          label="Property identified on our own?"
          name="identified_by_us"
          validation={validation}
          list={propertyVisitOptions?.identified_by_us ?? []}
        />
        <ControlledDropDownMenu
          label="Demarcated?"
          name="demarcated"
          validation={validation}
          list={propertyVisitOptions?.demarcated ?? []}
        />

        <ControlledTextInput
          label="Floorwise Accommodation Details"
          name="accommodation_details"
          validation={validation}
          multiline
        />
        <ControlledTextInput
          label="Property Mixed Use, Area Being Used For Purpose"
          name="area_purpose"
          validation={validation}
          multiline
        />

        <ControlledTextInput
          label="North Boundary"
          name="north"
          validation={validation}
        />
        <ControlledTextInput
          label="South Boundary"
          name="south"
          validation={validation}
        />
        <ControlledTextInput
          label="East Boundary"
          name="east"
          validation={validation}
        />
        <ControlledTextInput
          label="West Boundary"
          name="west"
          validation={validation}
        />
        <ControlledTextInput
          label="Nearest hospital name"
          name="hospital_name"
          validation={validation}
        />
        <ControlledTextInput
          label="Hospital Distance (in km)"
          name="hospital_distance"
          validation={validation}
        />
        <ControlledTextInput
          label="Nearest railway station name"
          name="railway_station_name"
          validation={validation}
        />
        <ControlledTextInput
          label="Railway Station Distance (in km)"
          name="railway_station_distance"
          validation={validation}
        />
        <ControlledTextInput
          label="Nearest bus stop name"
          name="bus_stop_name"
          validation={validation}
        />
        <ControlledTextInput
          label="Bus stop distance (in km)"
          name="bus_stop_distance"
          validation={validation}
        />
        <ControlledTextInput
          label="Road Name"
          name="road_name"
          validation={validation}
        />
        <ControlledTextInput
          label="Road Width (in ft)"
          name="road_width"
          validation={validation}
        />
        <ControlledTextInput
          label="Market rate reference"
          name="market_rate_reference"
          validation={validation}
        />
        <ControlledTextInput
          label="Market rate reference"
          name="market_rate_reference"
          validation={validation}
          multiline
        />
        <ControlledTextInput
          label="Rental Details"
          name="rental_details"
          validation={validation}
          multiline
        />
        <ControlledTextInput
          label="remarks"
          name="remarks"
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
};

export default VisitDetail;

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
