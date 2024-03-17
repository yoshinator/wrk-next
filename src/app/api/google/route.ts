import { auth, clerkClient } from '@clerk/nextjs'
import { NextResponse } from 'next/server'
import { google } from 'googleapis'

export async function GET(req: Request) {
  const { userId } = auth()
  if (!userId) {
    return new NextResponse('Unauthorized', { status: 401 })
  }

  const [OauthAccessToken] = await clerkClient.users.getUserOauthAccessToken(
    userId,
    'oauth_google'
  )
  const { token } = OauthAccessToken
  const client = await google.people({
    version: 'v1',
    headers: { Authorization: `Bearer ${token}` },
  })
  const response = await client.people.connections.list({
    resourceName: 'people/me',
    personFields: 'names,phoneNumbers,addresses,emailAddresses',
  })
  const data = response.data || []
  // get all the contacts using the next page token
  while (response.data.nextPageToken) {
    const nextPage = await client.people.connections.list({
      resourceName: 'people/me',
      personFields: 'names,phoneNumbers,addresses,emailAddresses',
      pageToken: response.data.nextPageToken,
    })
    data.connections?.push(...(nextPage?.data?.connections ?? []))
    response.data.nextPageToken = nextPage.data.nextPageToken
  }
  return new NextResponse(JSON.stringify(data))
}
