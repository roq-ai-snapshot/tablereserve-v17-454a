import * as yup from 'yup';
import { preferenceValidationSchema } from 'validationSchema/preferences';

export const reservationValidationSchema = yup.object().shape({
  reservation_time: yup.date().required(),
  customer_id: yup.string().nullable().required(),
  table_id: yup.string().nullable().required(),
  preference: yup.array().of(preferenceValidationSchema),
});
