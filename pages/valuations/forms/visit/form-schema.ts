import { zodResolver } from '@hookform/resolvers/zod';
import { format, isAfter, isBefore, isEqual, startOfDay } from 'date-fns';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import {
  coerceUndefinedOrEmptyToNull,
  stringNotEmpty,
  undefinedOrEmptyToNull,
} from './validations';

const isNullOrEmpty = (data: any) => {
  return data === null || data === '';
};

const isConstructionCompleted = (stage: string) => {
  return stage === 'CP';
};

const isUnderConstruction = (stage: string) => {
  return stage === 'UC';
};

const isLocalityNegative = (yesNo: string | null) => {
  return yesNo === null || yesNo === undefined ? false : yesNo === 'Y';
};

const visitFormSchema = z
  .object({
    id: z.number().optional(),
    property_id: z.number(),
    visited_by: z.string(),
    visit_date: z.preprocess(
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
            const inputDate = startOfDay(new Date(val));
            const today = startOfDay(new Date());
            return isAfter(inputDate, today) || isEqual(inputDate, today);
          },
          {
            message:
              'Cannot select a time earlier than the current date and time.',
          }
        )
    ),
    project_name: undefinedOrEmptyToNull,
    building_name: undefinedOrEmptyToNull,
    flat_number: undefinedOrEmptyToNull,
    floor: undefinedOrEmptyToNull,
    survey_number: stringNotEmpty('Survey Number Required'),
    village_name: stringNotEmpty('Village Name Required'),
    landmark: undefinedOrEmptyToNull,
    pin_code: stringNotEmpty('Pin Code Required'),
    latitude: coerceUndefinedOrEmptyToNull,
    longitude: coerceUndefinedOrEmptyToNull,
    construction_stage: stringNotEmpty('Construction Stage Required'),
    construction_year: undefinedOrEmptyToNull,
    project_start_date: z.preprocess(
      (val) => {
        if (val instanceof Date && !isNaN(val.getTime())) {
          // Convert Date to required format
          return format(val, 'yyyy-MM-dd');
        }
        return val; // assume it's already a string
      },
      z
        .string()
        .nonempty('Project Start date is required.')

    ),
    project_end_date: z.preprocess(
      (val) => {
        if (val instanceof Date && !isNaN(val.getTime())) {
          // Convert Date to required format
          return format(val, 'yyyy-MM-dd');
        }
        return val; // assume it's already a string
      },
      z
        .string()
        .nonempty('Project Start date is required.')

    ),
    work_completed: undefinedOrEmptyToNull,
    property_type: stringNotEmpty('Property Type Required'),
    structure_type: stringNotEmpty('Structure Type Required'),
    property_condition: stringNotEmpty('Property Condition Required'),
    doors: stringNotEmpty('Doors Required'),
    windows: stringNotEmpty('Windows Required'),
    flooring: stringNotEmpty('Flooring Required'),
    kitchen_platform: stringNotEmpty('Kitchen Platform Required'),
    paint: stringNotEmpty('Paint Required'),
    electrification: stringNotEmpty('Electrification Required'),
    plumbing: stringNotEmpty('Plumbing Required'),
    amenities: z.array(z.string()).optional(),
    permitted_property_use: undefinedOrEmptyToNull,
    actual_property_use: undefinedOrEmptyToNull,
    no_of_lifts: coerceUndefinedOrEmptyToNull,
    no_of_tenements_per_floor: coerceUndefinedOrEmptyToNull,
    no_of_wings: coerceUndefinedOrEmptyToNull,
    no_of_ground_floors: coerceUndefinedOrEmptyToNull,
    no_of_stilt_floors: coerceUndefinedOrEmptyToNull,
    no_of_basements: coerceUndefinedOrEmptyToNull,
    no_of_podiums: coerceUndefinedOrEmptyToNull,
    no_of_upper_floors: coerceUndefinedOrEmptyToNull,
    site_floors: coerceUndefinedOrEmptyToNull,
    ground_floor_details: undefinedOrEmptyToNull,
    parking_alloted: undefinedOrEmptyToNull,
    no_of_open_parkings: coerceUndefinedOrEmptyToNull,
    no_of_closed_parkings: coerceUndefinedOrEmptyToNull,
    plot_area: coerceUndefinedOrEmptyToNull,
    area: coerceUndefinedOrEmptyToNull,
    terrace_area: coerceUndefinedOrEmptyToNull,
    surrounding_area: stringNotEmpty('Surrounding Area Required'),
    property_access: stringNotEmpty('Access To The Property Required'),
    locality_nature: stringNotEmpty('Nature of Locality Required'),
    locality_class: stringNotEmpty('Class Of Locality Required'),
    locality_negative: undefinedOrEmptyToNull,
    locality_negative_remark: undefinedOrEmptyToNull,
    easily_identifiable: undefinedOrEmptyToNull,
    identified_by_us: undefinedOrEmptyToNull,
    demarcated: undefinedOrEmptyToNull,
    accommodation_details: undefinedOrEmptyToNull,
    area_purpose: undefinedOrEmptyToNull,
    north: stringNotEmpty('North Boundry Required'),
    south: stringNotEmpty('South Boundry Required'),
    east: stringNotEmpty('East Boundry Required'),
    west: stringNotEmpty('West Boundry Required'),
    hospital_name: undefinedOrEmptyToNull,
    hospital_distance: coerceUndefinedOrEmptyToNull,
    railway_station_name: undefinedOrEmptyToNull,
    railway_station_distance: coerceUndefinedOrEmptyToNull,
    bus_stop_name: undefinedOrEmptyToNull,
    bus_stop_distance: coerceUndefinedOrEmptyToNull,
    road_name: undefinedOrEmptyToNull,
    road_width: coerceUndefinedOrEmptyToNull,
    market_rate_reference: undefinedOrEmptyToNull,
    rental_details: undefinedOrEmptyToNull,
    remarks: undefinedOrEmptyToNull,
  })
  .refine(
    (data) => {
      return !(
        isConstructionCompleted(data.construction_stage) &&
        isNullOrEmpty(data.construction_year)
      );
    },
    {
      message: 'Construction Year Required',
      path: ['construction_year'],
    }
  )
  .refine(
    (data) => {
      return !(
        isConstructionCompleted(data.construction_stage) &&
        data.construction_year != null &&
        Number(data.construction_year) < 1800
      );
    },
    {
      message: 'Construction Year Must Be Greater Than 1799',
      path: ['construction_year'],
    }
  )
  .refine(
    (data) => {
      return !(
        isConstructionCompleted(data.construction_stage) &&
        isNullOrEmpty(data.property_type)
      );
    },
    {
      message: 'Property Type Required',
      path: ['property_type'],
    }
  )
  .refine(
    (data) => {
      if (
        isConstructionCompleted(data.construction_stage) &&
        isNullOrEmpty(data.structure_type)
      ) {
        return false;
      }
      return true;
    },
    {
      message: 'Structure Type Required',
      path: ['structure_type'],
    }
  )
  .refine(
    (data) => {
      if (
        isConstructionCompleted(data.construction_stage) &&
        isNullOrEmpty(data.property_condition)
      ) {
        return false;
      }
      return true;
    },
    {
      message: 'Property Condition Required',
      path: ['property_condition'],
    }
  )
  .refine(
    (data) => {
      return !(
        data.construction_year !== null &&
        data.construction_year !== '' &&
        Number(data.construction_year) > new Date().getFullYear()
      );
    },
    {
      message: `Construction Year Must Be Less Than Or Equal To ${new Date().getFullYear()}`,
      path: ['construction_year'],
    }
  )
  .refine(
    (data) => {
      return !(
        isUnderConstruction(data.construction_stage) &&
        isNullOrEmpty(data.project_start_date)
      );
    },
    {
      message: 'Project Start Date Required',
      path: ['project_start_date'],
    }
  )
  .refine(
    (data) => {
      return !(
        isUnderConstruction(data.construction_stage) &&
        isNullOrEmpty(data.project_end_date)
      );
    },
    {
      message: 'Project End Date Required',
      path: ['project_end_date'],
    }
  )
  .refine(
    (data) => {
      return !(
        data.project_start_date != null &&
        data.project_end_date != null &&
        data.project_start_date > data.project_end_date
      );
    },
    {
      message: 'Project End Date Must Be Later Than Project Start Date',
      path: ['project_end_date'],
    }
  )
  .refine(
    (data) => {
      return !(
        isUnderConstruction(data.construction_stage) &&
        isNullOrEmpty(data.work_completed)
      );
    },
    {
      message: 'Construction Details Work Completed Required',
      path: ['work_completed'],
    }
  )
  .refine(
    (data) => {
      return !(
        isLocalityNegative(data.locality_negative) &&
        isNullOrEmpty(data.locality_negative_remark)
      );
    },
    {
      message: 'Details Required',
      path: ['locality_negative_remark'],
    }
  )
  .refine((data) => {
    // console.log("=======", data.project_name, data.project_name === undefined, data.project_name === null, data.project_name === '')
    return true;
  });

export type VisitFormProps = z.infer<typeof visitFormSchema>;

export const useVisitForm = (defaultValues = {}) => {
  return useForm<VisitFormProps>({
    resolver: zodResolver(visitFormSchema),
    // defaultValues: defaultValues,
    values: defaultValues,
    mode: 'all'
  });
};

const isOccupied = (occupancy_status) => {
  return occupancy_status === 'OC';
};

const visitOccupancyFormSchema = z
  .object({
    id: z.number().optional(),
    occupancy_status: z.string(),
    occupant_relation: undefinedOrEmptyToNull,
    occupied_since: undefinedOrEmptyToNull,
    occupied_by: undefinedOrEmptyToNull,
    person_on_site_name: undefinedOrEmptyToNull,
    relation_with_applicant: undefinedOrEmptyToNull,
    person_on_site_contact_number: undefinedOrEmptyToNull,
    person_on_site_relation_with_applicant: undefinedOrEmptyToNull,
    nameplate: undefinedOrEmptyToNull,
  })
  .refine(
    (data) => {
      //return !(isOccupied(data.occupancy_status) && isNullOrEmpty(data.occupant_relation))
      return true;
    },
    {
      message: 'Relation With Applicant Required',
      path: ['occupant_relation'],
    }
  )
  .refine((data) => {
    console.log(data);
    return true;
  });

export type VisitOccupancyFormProps = z.infer<typeof visitOccupancyFormSchema>;

export const useVisitOccupancyForm = (defaultValues = {}) => {
  return useForm<VisitOccupancyFormProps>({
    resolver: zodResolver(visitOccupancyFormSchema),
    values: defaultValues,
  });
};
// .refine((data) => {
//     //return !(isOccupied(data.occupancy_status) && isNullOrEmpty(data.occupant_relation))
//     return true
// }, {
//     message: 'Relation With Applicant Required',
//     path: ['occupant_relation'],
// }).refine((data) => {
//     console.log(data)
//     return true
// })

const visitDocumentFormSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  image_url: z.string(),
  rotation: z.number(),
});

export type VisitDocumentFormProps = z.infer<typeof visitDocumentFormSchema>;

export const useVisitDocumentForm = (defaultValues = {}) => {
  return useForm<VisitDocumentFormProps>({
    resolver: zodResolver(visitDocumentFormSchema),
    values: defaultValues,
  });
};
