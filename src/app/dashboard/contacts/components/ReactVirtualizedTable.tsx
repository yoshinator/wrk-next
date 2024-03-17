import { Paper, Table, TableBody, TableContainer, TableHead, TableRow } from '@mui/material'
import { TableComponents, TableVirtuoso } from 'react-virtuoso'
import { Contact } from '@/types'
import { fixedHeaderContent } from './FixedHeaderContent'
import { rowContent } from './RowContent'
import { forwardRef } from 'react'

export const ReactVirtualizedTable = ({
  rows,
  onSort,
  sortField,
  sortDirection,
}: {
  rows: Contact[]
  onSort: (field: keyof Contact) => void
  sortField: keyof Contact | null
  sortDirection: 'asc' | 'desc'
}) => (
  <Paper style={{ height: '600px', width: '100%' }}>
    <TableVirtuoso
      data={rows}
      components={VirtuosoTableComponents}
      fixedHeaderContent={() => fixedHeaderContent(onSort, sortField, sortDirection)}
      itemContent={rowContent}
    />
  </Paper>
)

const VirtuosoTableComponents: TableComponents<Contact> = {
  Scroller: forwardRef<HTMLDivElement>((props, ref) => (
    <TableContainer component={Paper} {...props} ref={ref} />
  )),
  Table: (props) => <Table {...props} sx={{ borderCollapse: 'separate', tableLayout: 'fixed' }} />,
  TableHead,
  TableRow: ({ item: _item, ...props }) => <TableRow {...props} />,
  TableBody: forwardRef<HTMLTableSectionElement>((props, ref) => (
    <TableBody {...props} ref={ref} />
  )),
}
