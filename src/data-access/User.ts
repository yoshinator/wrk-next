import { auth, clerkClient } from '@clerk/nextjs'
import prisma from '@/lib/prismadb'

export const userInit = async () => {
  const { userId } = auth()

  if (!userId) {
    return
  }
  const user = await clerkClient.users.getUser(userId)
  const firstName = user.firstName
  const lastName = user.lastName
  const email = user.emailAddresses[0]?.emailAddress
  const phoneNumber = user.phoneNumbers[0]?.phoneNumber

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    })
    if (!user) {
      await prisma.user.create({
        data: {
          id: userId,
          firstName,
          lastName,
          personalEmail: email,
          businessPhone: phoneNumber,
        },
      })
    }
    return user
  } catch (error) {
    console.log('[USER_INIT_ERROR]', error as string)
    throw new Error(error as string)
  }
}

export const getUsers = async () => {
  try {
    const users = await prisma.user.findMany()
    return users
  } catch (error) {
    console.log('[GET_USERS_ERROR]', error as string)
    throw new Error(error as string)
  }
}
