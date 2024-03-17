import { Fragment } from 'react'

import { TableCell, TableRow } from '@mui/material'
import NorthIcon from '@mui/icons-material/North'
import SouthIcon from '@mui/icons-material/South'
import SwapVert from '@mui/icons-material/SwapVert'

import { Contact } from '@/types'
import { columns } from '../utils/constants'

export const fixedHeaderContent = (
  onSort: (field: keyof Contact) => void,
  sortField: keyof Contact | null,
  sortDirection: 'asc' | 'desc'
) => (
  <TableRow>
    {columns.map((column) => (
      <TableCell
        key={column.dataKey}
        variant="head"
        align={column.numeric || false ? 'right' : 'left'}
        style={{ width: column.width }}
        sx={{
          backgroundColor: 'background.paper',
          cursor:
            column.dataKey === 'firstName' ||
            column.dataKey === 'lastName' ||
            column.dataKey === 'email'
              ? 'pointer'
              : 'default',
        }}
        onClick={() => {
          if (
            column.dataKey === 'firstName' ||
            column.dataKey === 'lastName' ||
            column.dataKey === 'email'
          ) {
            onSort(column.dataKey)
          }
        }}
      >
        {column.label}
        {(column.dataKey === 'firstName' ||
          column.dataKey === 'lastName' ||
          column.dataKey === 'email') && (
          <Fragment>
            {sortField === column.dataKey ? (
              sortDirection === 'asc' ? (
                <NorthIcon />
              ) : (
                <SouthIcon />
              )
            ) : (
              <SwapVert sx={{ opacity: 0.5 }} />
            )}
          </Fragment>
        )}
      </TableCell>
    ))}
  </TableRow>
)
