import { FC, Dispatch, SetStateAction } from 'react'
import { DialogTitle, IconButton } from '@mui/material'
import { Flex } from '@/components/Flex'
import { Close } from '@mui/icons-material'

interface Props {
  setOpen: Dispatch<SetStateAction<boolean>>
  title: string
}

export const AppDialogTitle: FC<Props> = ({ title, setOpen }) => (
  <Flex
    justifyContent="space-between"
    alignItems="center"
    borderBottom={'1px solid'}
    borderColor="ActiveBorder"
  >
    <DialogTitle>{title}</DialogTitle>
    <IconButton
      aria-label="close"
      onClick={() => setOpen(false)}
      sx={{ mr: 2, p: 1, height: '90%' }}
      size="small"
      title="close"
    >
      <Close />
    </IconButton>
  </Flex>
)
