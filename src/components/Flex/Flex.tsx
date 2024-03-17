import { forwardRef } from 'react'

import { Box, BoxProps } from '@mui/material'
import { ref } from 'yup'

interface Props extends Omit<BoxProps, 'ref'> {
  fullWidth?: boolean
}

export const Flex = forwardRef<HTMLDivElement, Props>(
  ({ children, fullWidth, ...props }, ref) => (
    <Box
      {...props}
      ref={ref}
      sx={{ ...props.sx, display: 'flex', width: fullWidth ? 1 : undefined }}
    >
      {children}
    </Box>
  )
)

export const FlexRow = forwardRef<HTMLDivElement, Props>((props, ref) => (
  <Flex {...props} ref={ref} flexDirection="row" />
))

export const FlexColumn = forwardRef<HTMLDivElement, Props>((props, ref) => (
  <Flex {...props} ref={ref} flexDirection="column" />
))
