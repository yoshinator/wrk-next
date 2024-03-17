'use client'
import { useEffect, useState } from 'react'
import Fuse from 'fuse.js'
import axios from 'axios'

import { Toolbar, Box, Button, TextField, Dialog } from '@mui/material'
import { useQuery } from '@tanstack/react-query'

import { ContactForm } from '@/components/ContactForm'
import { AppDialogTitle } from '@/components/AppDialogTitle'
import { Contact } from '@/types'

import { ReactVirtualizedTable } from './components/ReactVirtualizedTable'
import { FlexColumn, FlexRow } from '@/components/Flex'

const Contacts = () => {
  const [sortField, setSortField] = useState<keyof Contact | null>(null)
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState([] as Contact[])

  const {
    data: responseData,
    isLoading,
    isError,
    isSuccess,
  } = useQuery<Contact[]>({
    queryKey: ['contacts'],
    queryFn: async () => {
      const response = await axios.get('/api/contacts')
      return response.data
    },
  })

  const [open, setOpen] = useState(false)
  const [openImportDialog, setOpenImportDialog] = useState(false)

  useEffect(() => {
    if (responseData?.length && isSuccess) {
      setSearchResults(responseData as Contact[])
    }
  }, [isLoading, isError, isSuccess, responseData])

  useEffect(() => {
    if (searchTerm && responseData) {
      const fuse = new Fuse(responseData, {
        keys: Object.keys(responseData[0]),
        includeScore: true,
        threshold: 0.3,
      })
      setSearchResults(fuse.search(searchTerm).map((result) => result.item))
    } else {
      setSearchResults(responseData ?? [])
    }
  }, [searchTerm])

  const handleSort = (field: keyof Contact) => {
    setSortField(field)
    setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
  }

  const sortedRows = [...searchResults].sort((a, b) => {
    if (!sortField) return 0
    if ((a[sortField] ?? '') < (b[sortField] ?? '')) return sortDirection === 'asc' ? -1 : 1
    if ((a[sortField] ?? '') > (b[sortField] ?? '')) return sortDirection === 'asc' ? 1 : -1
    return 0
  })

  return (
    <div>
      <h1>Contacts</h1>
      <Toolbar
        sx={{
          justifyContent: 'space-between',
          gap: 2,
          my: 2,
          '@media (min-width: 600px)': {
            px: 0,
          },
        }}
      >
        <TextField
          aria-label="Search contacts"
          label="Search"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          sx={{ justifySelf: 'flex-start' }}
        />
        <Box display="flex" gap={2}>
          <Button
            aria-label="import contacts"
            onClick={() => setOpenImportDialog(true)}
            variant="contained"
          >
            import
          </Button>
          <Button aria-label="add new contact" onClick={() => setOpen(true)} variant="contained">
            add
          </Button>
        </Box>
      </Toolbar>
      <ReactVirtualizedTable
        rows={sortedRows}
        onSort={handleSort}
        sortDirection={sortDirection}
        sortField={sortField}
      />
      <Dialog open={openImportDialog} onClose={() => setOpenImportDialog(false)}>
        <AppDialogTitle setOpen={setOpen} title="Import Contacts" />
        <FlexColumn gap={2} p={2}>
          <Button variant="contained" onClick={() => {}}>
            Google
          </Button>
          <Button variant="contained">Hotmail / Outlook</Button>
          <Button variant="contained">Yahoo</Button>
          <Button variant="contained">CSV</Button>
        </FlexColumn>
        <FlexRow gap={2} p={2} ml="auto">
          <Button color="primary" onClick={() => setOpenImportDialog(false)} variant="contained">
            Cancel
          </Button>
        </FlexRow>
      </Dialog>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <AppDialogTitle setOpen={setOpen} title="Add Contact" />
        <ContactForm setOpen={setOpen} />
      </Dialog>
    </div>
  )
}
export default Contacts
