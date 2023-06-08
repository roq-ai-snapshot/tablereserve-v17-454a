import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { useRouter } from 'next/router';
import { createPreference } from 'apiSdk/preferences';
import { Error } from 'components/error';
import { preferenceValidationSchema } from 'validationSchema/preferences';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { UserInterface } from 'interfaces/user';
import { ReservationInterface } from 'interfaces/reservation';
import { getUsers } from 'apiSdk/users';
import { getReservations } from 'apiSdk/reservations';
import { PreferenceInterface } from 'interfaces/preference';

function PreferenceCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: PreferenceInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createPreference(values);
      resetForm();
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<PreferenceInterface>({
    initialValues: {
      preference_text: '',
      customer_id: (router.query.customer_id as string) ?? null,
      reservation_id: (router.query.reservation_id as string) ?? null,
    },
    validationSchema: preferenceValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Text as="h1" fontSize="2xl" fontWeight="bold">
        Create Preference
      </Text>
      <Box bg="white" p={4} rounded="md" shadow="md">
        {error && <Error error={error} />}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="preference_text" mb="4" isInvalid={!!formik.errors?.preference_text}>
            <FormLabel>Preference Text</FormLabel>
            <Input
              type="text"
              name="preference_text"
              value={formik.values?.preference_text}
              onChange={formik.handleChange}
            />
            {formik.errors.preference_text && <FormErrorMessage>{formik.errors?.preference_text}</FormErrorMessage>}
          </FormControl>
          <AsyncSelect<UserInterface>
            formik={formik}
            name={'customer_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={getUsers}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.email}
              </option>
            )}
          />
          <AsyncSelect<ReservationInterface>
            formik={formik}
            name={'reservation_id'}
            label={'Select Reservation'}
            placeholder={'Select Reservation'}
            fetcher={getReservations}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.customer_id}
              </option>
            )}
          />
          <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'preference',
  operation: AccessOperationEnum.CREATE,
})(PreferenceCreatePage);
