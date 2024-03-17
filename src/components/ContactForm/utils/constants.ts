interface ContactFormField {
  name: keyof typeof defaultValues
  label: string
  type: 'text' | 'tel' | 'email' | 'state'
}
export const defaultValues = {
  firstName: '',
  lastName: '',
  displayName: '',
  middleName: '',
  street: '',
  city: '',
  state: '',
  zip: '',
  cellPhone: '',
  workPhone: '',
  homePhone: '',
  email: '',
}

export const fields: ContactFormField[] = [
  { name: 'firstName', label: 'First Name', type: 'text' },
  { name: 'lastName', label: 'Last Name', type: 'text' },
  { name: 'cellPhone', label: 'Cell Phone', type: 'tel' },
  { name: 'email', label: 'Email', type: 'email' },
]
export const moreDetailsFields: ContactFormField[] = [
  { name: 'displayName', label: 'Display Name', type: 'text' },
  { name: 'middleName', label: 'Middle Name', type: 'text' },
  { name: 'street', label: 'Street', type: 'text' },
  { name: 'city', label: 'City', type: 'text' },
  { name: 'state', label: 'State', type: 'state' },
  { name: 'zip', label: 'Zip', type: 'text' },
  { name: 'workPhone', label: 'Work Phone', type: 'tel' },
  { name: 'homePhone', label: 'Home Phone', type: 'tel' },
]

export const validCountries: 'US'[] = ['US']
