'use client'
import { FC, SyntheticEvent, useCallback } from 'react'

import { Alert, AlertTitle, Slide, SlideProps, Snackbar, Stack, Typography } from '@mui/material'

import { useNotificationContext } from './utils/NotificationContext'

const TransitionSlideLeft = (props: SlideProps) => <Slide {...props} direction="left" />

export const Notification: FC = () => {
  const { handleExited, isOpen, notification, setIsOpen } = useNotificationContext()

  const {
    title = '',
    maxNotificationWidth,
    message = '',
    autoHideDurationMs = 5000,
    severity = 'success',
  } = notification ?? {}

  const handleClose = useCallback(
    (_event?: SyntheticEvent | Event, reason?: string) => {
      if (reason === 'clickaway') {
        return
      }
      setIsOpen(false)
    },
    [setIsOpen]
  )

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      autoHideDuration={autoHideDurationMs}
      onClose={handleClose}
      open={isOpen}
      sx={{ maxWidth: maxNotificationWidth }}
      TransitionComponent={TransitionSlideLeft}
      TransitionProps={{ onExited: handleExited }}
    >
      <Alert severity={severity} onClose={handleClose} variant="filled">
        <Stack>
          <AlertTitle>{title}</AlertTitle>
          <Typography>{message}</Typography>
        </Stack>
      </Alert>
    </Snackbar>
  )
}
