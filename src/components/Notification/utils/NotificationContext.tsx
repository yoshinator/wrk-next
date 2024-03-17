'use client'
import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from 'react'

import { AlertColor } from '@mui/material'

export type NotificationOptions = {
  autoHideDurationMs?: number
  maxNotificationWidth?: number
  message?: string
  severity?: AlertColor
  title?: string
}

export type NotificationParams = Record<AlertColor, NotificationOptions>

interface NotificationContextType {
  isOpen: boolean
  handleExited: () => void
  notification?: NotificationOptions
  setIsOpen: Dispatch<SetStateAction<boolean>>
  showNotification: (notification: NotificationOptions) => void
}

export const NotificationContext = createContext<NotificationContextType>({
  isOpen: false,
  handleExited: () => {},
  notification: undefined,
  setIsOpen: () => {},
  showNotification: () => {},
})

export const useNotificationContext = () => useContext(NotificationContext)

export const useNotificationContextValue = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [notificationStack, setNotificationStack] = useState<NotificationOptions[]>([])
  const [notification, setNotification] = useState<NotificationOptions>()

  const showNotification = (notification: NotificationOptions) => {
    setNotificationStack((prev) => [...prev, notification])
  }

  useEffect(() => {
    if (!isOpen && notificationStack.length && !notification) {
      // show the first notification in the stack if we don't have one open
      setNotification({ ...notificationStack[0] })
      setNotificationStack((prev) => prev.slice(1))
      setIsOpen(true)
    } else if (isOpen && notificationStack.length && notification && isOpen) {
      // closes the notification if a new one is added while the current one is open
      setIsOpen(false)
    }
  }, [notificationStack, notification, isOpen])

  return {
    isOpen,
    handleExited: () => setNotification(undefined),
    notification,
    setIsOpen,
    showNotification,
  }
}
