import { Contact } from '@/types'
export interface ColumnData {
  dataKey: keyof Contact
  label: string
  numeric?: boolean
  width: number
}
