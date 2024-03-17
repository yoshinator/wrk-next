import { auth } from '@clerk/nextjs'
import { NextResponse } from 'next/server'
import { createContact, getContacts } from '@/data-access/Contacts'

export async function GET(req: Request) {
  const { userId } = auth()
  if (!userId) {
    return new NextResponse('Unauthorized', { status: 401 })
  }
  try {
    const contacts = await getContacts(userId)
    const responseBody = JSON.stringify(contacts, null, 2)
    return new NextResponse(responseBody, { status: 200 })
  } catch (error) {
    return new NextResponse('Internal Server Error: ' + error, { status: 500 })
  }
}

export async function POST(req: Request) {
  const { userId } = auth()
  if (!userId) {
    return new NextResponse('Unauthorized', { status: 401 })
  }
  const data = await req.json()
  try {
    const contact = await createContact(userId, data)
    return new NextResponse(JSON.stringify(contact, null, 2), { status: 201 })
  } catch (error) {
    return new NextResponse('Internal Server Error: ' + error, { status: 500 })
  }
}

export async function PUT(req: Request) {}

export async function DELETE(req: Request) {}
