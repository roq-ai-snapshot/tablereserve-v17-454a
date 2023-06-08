import * as yup from 'yup';

export const preferenceValidationSchema = yup.object().shape({
  preference_text: yup.string().required(),
  customer_id: yup.string().nullable().required(),
  reservation_id: yup.string().nullable().required(),
});
