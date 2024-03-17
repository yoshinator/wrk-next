import { FC } from 'react'
import { Autocomplete, Box, TextField } from '@mui/material'
import { MuiTelInput } from 'mui-tel-input'
import { Controller } from 'react-hook-form'
import { schema } from '../utils/cfFormSchema'
import { defaultValues, validCountries } from '../utils/constants'
import * as yup from 'yup'

interface Props {
  name: keyof typeof defaultValues
  label: string
  type: 'text' | 'tel' | 'email' | 'state'
  control: any
}

const states = [
  'AL',
  'AK',
  'AZ',
  'AR',
  'CA',
  'CO',
  'CT',
  'DE',
  'FL',
  'GA',
  'HI',
  'ID',
  'IL',
  'IN',
  'IA',
  'KS',
  'KY',
  'LA',
  'ME',
  'MD',
  'MA',
  'MI',
  'MN',
  'MS',
  'MO',
  'MT',
  'NE',
  'NV',
  'NH',
  'NJ',
  'NM',
  'NY',
  'NC',
  'ND',
  'OH',
  'OK',
  'OR',
  'PA',
  'RI',
  'SC',
  'SD',
  'TN',
  'TX',
  'UT',
  'VT',
  'VA',
  'WA',
  'WV',
  'WI',
  'WY',
]

export const ContactFormInputs: FC<Props> = ({ name, label, type, control }) => {
  return type === 'tel' ? (
    <Controller
      key={name}
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <MuiTelInput
          aria-label={label}
          error={fieldState.invalid}
          forceCallingCode
          defaultCountry={'US'}
          onlyCountries={validCountries}
          helperText={fieldState.invalid ? 'Invalid phone number' : null}
          label={label}
          {...field}
        />
      )}
    />
  ) : type === 'state' ? (
    <Controller
      key={name}
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Autocomplete
          options={states}
          renderInput={(params) => (
            <TextField
              {...params}
              {...field}
              aria-label={label}
              label={label}
              error={fieldState.invalid}
              required={!(schema.fields[field.name] as yup.ObjectSchema<any>)?.spec?.optional}
              InputLabelProps={{ shrink: true }}
            />
          )}
        />
      )}
    />
  ) : (
    <Controller
      key={name}
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <TextField
          error={fieldState.invalid}
          label={label}
          aria-label={label}
          required={!(schema.fields[field.name] as yup.ObjectSchema<any>)?.spec?.optional}
          InputLabelProps={{ shrink: true }}
          {...field}
        />
      )}
    />
  )
}
