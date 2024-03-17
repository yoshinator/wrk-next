import prisma from '@/lib/prismadb'
import { Contact } from '@prisma/client'

export const getContacts = async (userId: string) => {
  try {
    const contacts = await prisma.contact.findMany({
      where: {
        userId,
      },
    })
    return contacts
  } catch (error) {
    console.log('[GET_CONTACTS_ERROR]', error as string)
    throw new Error(error as string)
  }
}

export const createContact = async (userId: string, data: Contact) => {
  try {
    const contact = await prisma.contact.create({
      data: {
        ...data,
        userId,
      },
    })
    return contact
  } catch (error) {
    console.log('[CREATE_CONTACT_ERROR]', error as string)
    throw new Error(error as string)
  }
}

export const updateContact = async (id: string, data: Contact) => {
  try {
    const contact = await prisma.contact.update({
      where: {
        id,
      },
      data,
    })
    return contact
  } catch (error) {
    console.log('[UPDATE_CONTACT_ERROR]', error as string)
    throw new Error(error as string)
  }
}

export const deleteContact = async (id: string) => {
  try {
    const contact = await prisma.contact.delete({
      where: {
        id,
      },
    })
    return contact
  } catch (error) {
    console.log('[DELETE_CONTACT_ERROR]', error as string)
    throw new Error(error as string)
  }
}
