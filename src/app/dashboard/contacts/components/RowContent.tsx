import { Fragment } from 'react'
import { TableCell } from '@mui/material'
import { columns } from '../utils/constants'
import { Data } from '../utils/types'

export const rowContent = (_index: number, row: Data) => (
  <Fragment>
    {columns.map((column) => (
      <TableCell
        key={column.dataKey}
        align={column.numeric || false ? 'right' : 'left'}
      >
        {row[column.dataKey]}
      </TableCell>
    ))}
  </Fragment>
)
