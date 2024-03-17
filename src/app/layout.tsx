'use client'
import Head from 'next/head'
import ThemeRegistry from '@/ThemeRegistry'
import { ClerkProvider } from '@clerk/nextjs'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Notification } from '@/components/Notification'
import { NotificationContextProvider } from '@/components/Notification/utils'

const queryClient = new QueryClient()

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <QueryClientProvider client={queryClient}>
      <ClerkProvider>
        <NotificationContextProvider>
          <html lang="en">
            <Head>
              <title>Web Review Kit</title>
              <meta name="description" content="Reviews and More for Your Business" />
            </Head>
            <body>
              <ThemeRegistry>
                {children}
                <Notification />
              </ThemeRegistry>
            </body>
          </html>
        </NotificationContextProvider>
      </ClerkProvider>
    </QueryClientProvider>
  )
}
