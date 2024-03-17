import { useQuery } from '@tanstack/react-query'
// import { people_v1 } from 'googleapis'

import axios from 'axios'

const fetchGoogleContacts = async () => {
  const response = await axios.get('/api/google')

  return response.data
}

export const useGoogleContacts = () => {
  return useQuery({
    queryKey: ['googleContacts'],
    queryFn: fetchGoogleContacts,
  })
}
// const connections: people_v1.Schema$Person[] | undefined = data ? data.connections : []

// const contacts = useMemo(
//   () =>
//     connections?.map((contact) => ({
//       firstName: contact.names?.[0].givenName ?? '',
//       lastName: contact.names?.[0].familyName ?? '',
//       displayName: contact.names?.[0].displayName ?? '',
//       middleName: contact.names?.[0].middleName ?? '',
//       street: contact.addresses?.[0].streetAddress ?? '',
//       city: contact.addresses?.[0].city ?? '',
//       state: contact.addresses?.[0].region ?? '',
//       zip: contact.addresses?.[0].postalCode ?? '',
//       cell: contact.phoneNumbers?.find((phone) => phone.type === 'mobile')?.value ?? '',
//       work: contact.phoneNumbers?.find((phone) => phone.type === 'work')?.value ?? '',
//       home: contact.phoneNumbers?.find((phone) => phone.type === 'home')?.value ?? '',
//       email: contact.emailAddresses?.[0].value ?? '',
//     })),
//   [connections]
// )
