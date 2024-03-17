import { PropsWithChildren } from 'react'

import { NotificationContext, useNotificationContextValue } from './NotificationContext'

export const NotificationContextProvider = ({ children }: PropsWithChildren<{}>) => {
  return (
    <NotificationContext.Provider value={useNotificationContextValue()}>
      <>{children}</>
    </NotificationContext.Provider>
  )
}
