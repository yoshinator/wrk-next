import * as yup from 'yup'
import { matchIsValidTel } from 'mui-tel-input'
import { validCountries } from './constants'

export const schema = yup.object({
  firstName: yup.string().required(),
  lastName: yup.string(),
  cellPhone: yup
    .string()
    .required()
    .test('is-valid-tel', 'Invalid phone number', (value) =>
      matchIsValidTel(value ?? '', {
        onlyCountries: validCountries,
      })
    ),
  email: yup.string().email('Invalid email address'),
  displayName: yup.string(),
  middleName: yup.string(),
  street: yup.string(),
  city: yup.string(),
  state: yup.string(),
  zip: yup.string(),
  workPhone: yup.string().test(
    'is-valid-tel',
    'Invalid phone number',
    (value) =>
      value?.length === 0 ||
      value === '+1' ||
      matchIsValidTel(value ?? '', {
        onlyCountries: validCountries,
      })
  ),
  homePhone: yup.string().test(
    'is-valid-tel',
    'Invalid phone number',
    (value) =>
      value?.length === 0 ||
      value === '+1' ||
      matchIsValidTel(value ?? '', {
        onlyCountries: validCountries,
      })
  ),
})
