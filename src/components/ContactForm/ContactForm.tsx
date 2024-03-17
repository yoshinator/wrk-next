'use client'
import { Dispatch, FC, useEffect } from 'react'
import axios from 'axios'
import { Accordion, AccordionDetails, AccordionSummary, Box, Button } from '@mui/material'
import { ExpandMore } from '@mui/icons-material'
import { useForm, Form } from 'react-hook-form'
import { FlexColumn } from '../Flex/Flex'
import { yupResolver } from '@hookform/resolvers/yup'
import { ContactFormInputs } from './components/ContactFormInputs'
import { defaultValues, fields, moreDetailsFields } from './utils/constants'
import { schema } from './utils/cfFormSchema'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Contact } from '@/types'
import { useNotificationContext } from '@/components/Notification/utils'

interface Props {
  setOpen: Dispatch<boolean>
}

export const ContactForm: FC<Props> = ({ setOpen }) => {
  const { control } = useForm({ defaultValues, resolver: yupResolver(schema) })
  const queryClient = useQueryClient()

  const { isError, isSuccess, mutate, error } = useMutation({
    mutationFn: (newContact: Omit<Contact, 'userId'>) => {
      return axios.post('/api/contacts', newContact)
    },
  })

  const { showNotification } = useNotificationContext()
  useEffect(() => {
    if (isSuccess) {
      showNotification({
        message: 'Contact Added Successfully',
        severity: 'success',
      })
      setOpen(false)
      queryClient.invalidateQueries({ queryKey: ['contacts'] })
    }
    if (isError) {
      showNotification({
        message: 'Error Adding Contact ' + error.message,
        severity: 'error',
      })
    }
  }, [isSuccess, isError])

  return (
    <Form
      onSubmit={({ data }) => {
        mutate({
          ...data,
          source: 'Other',
        })
      }}
      control={control}
    >
      <FlexColumn gap={2} p={2}>
        <Box display="grid" gap={2} sx={{ gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' } }}>
          {fields.map(({ name, label, type }) => (
            <ContactFormInputs key={name} control={control} name={name} label={label} type={type} />
          ))}
        </Box>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls="contact-panel-content"
            id="contact-panel-header"
          >
            Add More Contact Details
          </AccordionSummary>
          <AccordionDetails>
            <Box display="grid" gap={2} sx={{ gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' } }}>
              {moreDetailsFields.map(({ name, label, type }) => (
                <ContactFormInputs
                  key={name}
                  control={control}
                  name={name}
                  label={label}
                  type={type}
                />
              ))}
            </Box>
          </AccordionDetails>
        </Accordion>
        <Button size="large" type="submit" variant="contained">
          Add Contact
        </Button>
      </FlexColumn>
    </Form>
  )
}
