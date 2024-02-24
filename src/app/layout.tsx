'use client'
import Head from 'next/head'
import ThemeRegistry from '@/ThemeRegistry'
import { ClerkProvider } from '@clerk/nextjs'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <Head>
          <title>Web Review Kit</title>
          <meta
            name="description"
            content="Reviews and More for Your Business"
          />
        </Head>
        <body>
          <ThemeRegistry>{children}</ThemeRegistry>
        </body>
      </html>
    </ClerkProvider>
  )
}
