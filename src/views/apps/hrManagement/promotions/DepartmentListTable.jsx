

'use client'

import { useState, useEffect, useMemo } from 'react'

// 📦 MUI Imports
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Checkbox from '@mui/material/Checkbox'
import IconButton from '@mui/material/IconButton'
import Chip from '@mui/material/Chip'
import MenuItem from '@mui/material/MenuItem'
import TablePagination from '@mui/material/TablePagination'
import { styled } from '@mui/material/styles'

// 🧩 Third-party Imports
import classnames from 'classnames'
import { rankItem } from '@tanstack/match-sorter-utils'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
  getSortedRowModel,
  getPaginationRowModel
} from '@tanstack/react-table'

// 🧱 Component Imports
import AddDepartmentDrawer from './AddDepartmentDrawer'
import ViewDepartment from './ViewDepartment'
import ExportButton from '../../../../@menu/components/tables/ExportButton'
import CustomTextField from '@core/components/mui/TextField'
import TablePaginationComponent from '@components/TablePaginationComponent'

// 🎨 Style Imports
import tableStyles from '@core/styles/table.module.css'

// 🖥️ Server action
import { fetchPromotions } from '../../../../app/server/actions'

const Icon = styled('i')({})

const fuzzyFilter = (row, columnId, value, addMeta) => {
  const itemRank = rankItem(row.getValue(columnId), value)
  addMeta({ itemRank })
  return itemRank.passed
}

const DebouncedInput = ({ value: initialValue, onChange, debounce = 500, ...props }) => {
  const [value, setValue] = useState(initialValue)

  useEffect(() => setValue(initialValue), [initialValue])

  useEffect(() => {
    const timeout = setTimeout(() => onChange(value), debounce)
    return () => clearTimeout(timeout)
  }, [value])

  return <CustomTextField {...props} value={value} onChange={e => setValue(e.target.value)} />
}

const columnHelper = createColumnHelper()

const DepartmentListTable = ({ tableData }) => {
  const [data, setData] = useState(tableData || [])
  const [globalFilter, setGlobalFilter] = useState('')
  const [rowSelection, setRowSelection] = useState({})
  const [addOpen, setAddOpen] = useState(false)
  const [viewOpen, setViewOpen] = useState(false)
  const [selectedPromotion, setSelectedPromotion] = useState(null)

  /* 🚀 REAL FIX - ALWAYS SET `res` DIRECTLY */
  const refreshPromotions = async () => {
    try {
      const res = await fetchPromotions()   // <-- res = array
      setData(res || [])                    // <-- FIXED ⭐
    } catch (err) {
      console.error("Refresh error:", err)
    }
  }

  const columns = useMemo(
    () => [
      {
        id: 'select',
        header: ({ table }) => (
          <Checkbox
            checked={table.getIsAllRowsSelected()}
            indeterminate={table.getIsSomeRowsSelected()}
            onChange={table.getToggleAllRowsSelectedHandler()}
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            indeterminate={row.getIsSomeSelected()}
            onChange={row.getToggleSelectedHandler()}
          />
        )
      },

      columnHelper.accessor('employee', {
        header: 'Employee',
        cell: ({ row }) => (
          <Typography className='font-medium' color='text.primary'>
            {row.original.employee}
          </Typography>
        )
      }),

      columnHelper.accessor('previousDesignation', {
        header: 'Previous Designation',
        cell: ({ row }) => (
          <Typography color='text.primary'>
            {row.original.previousDesignation}
          </Typography>
        )
      }),

      columnHelper.accessor('newDesignation', {
        header: 'New Designation',
        cell: ({ row }) => (
          <Typography color='text.primary'>
            {row.original.newDesignation}
          </Typography>
        )
      }),

      columnHelper.accessor('promotionDate', {
        header: 'Promotion Date',
        cell: ({ row }) => {
          const formatted = new Date(row.original.promotionDate).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
          })
          return <Typography color='text.primary'>{formatted}</Typography>
        }
      }),

      columnHelper.accessor('effectiveDate', {
        header: 'Effective Date',
        cell: ({ row }) => {
          const formatted = new Date(row.original.effectiveDate).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
          })
          return <Typography color='text.primary'>{formatted}</Typography>
        }
      }),

      columnHelper.accessor('salaryAdjustment', {
        header: 'Salary Adjustment',
        cell: ({ row }) => (
          <Typography color='text.primary'>
            ₹ {row.original.salaryAdjustment || 0}
          </Typography>
        )
      }),

      columnHelper.accessor('document', {
        header: 'Document',
        cell: ({ row }) => {
          const url = row.original.document

          if (!url)
            return <Typography color='text.secondary' sx={{ fontStyle: 'italic' }}>No document</Typography>

          return (
            <Button variant='outlined' size='small' onClick={() => window.open(url, '_blank')}>
              View Document
            </Button>
          )
        }
      }),

      columnHelper.accessor('status', {
        header: 'Status',
        cell: ({ row }) => (
          <Chip
            label={row.original.status}
            variant='tonal'
            size='small'
            color={
              row.original.status === 'Approved'
                ? 'success'
                : row.original.status === 'Pending'
                ? 'warning'
                : 'error'
            }
          />
        )
      }),

      columnHelper.accessor('action', {
        header: 'Action',
        enableSorting: false,
        cell: ({ row }) => (
          <IconButton
            onClick={() => {
              setSelectedPromotion(row.original)
              setViewOpen(true)
            }}
          >
            <i className='tabler-eye text-textSecondary' />
          </IconButton>
        )
      })
    ],
    [data]
  )

  const table = useReactTable({
    data,
    columns,
    filterFns: { fuzzy: fuzzyFilter },
    state: { rowSelection, globalFilter },
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: fuzzyFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 10 } }
  })

  const filteredRows = table.getFilteredRowModel().rows.map(r => r.original)

  return (
    <>
      <Card>

        {/* Top Controls */}
        <div className='flex justify-between flex-col md:flex-row p-6 border-bs gap-4'>
          <CustomTextField
            select
            value={table.getState().pagination.pageSize}
            onChange={e => table.setPageSize(Number(e.target.value))}
            className='sm:is-[70px]'
          >
            <MenuItem value='10'>10</MenuItem>
            <MenuItem value='25'>25</MenuItem>
            <MenuItem value='50'>50</MenuItem>
          </CustomTextField>

          <div className='flex flex-col sm:flex-row gap-4'>
            <DebouncedInput
              value={globalFilter ?? ''}
              onChange={v => setGlobalFilter(String(v))}
              placeholder='Search Promotion'
            />

            <ExportButton filteredData={filteredRows} />

            <Button
              variant='contained'
              startIcon={<i className='tabler-plus' />}
              onClick={() => setAddOpen(true)}
            >
              Add Promotion
            </Button>
          </div>
        </div>

        {/* Table */}
        <div className='overflow-x-auto'>
          <table className={tableStyles.table}>
            <thead>
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map(header => (
                    <th key={header.id}>
                      {!header.isPlaceholder && (
                        <div
                          className={classnames({
                            'flex items-center': header.column.getIsSorted(),
                            'cursor-pointer select-none': header.column.getCanSort()
                          })}
                          onClick={header.column.getToggleSortingHandler()}
                        >
                          {flexRender(header.column.columnDef.header, header.getContext())}
                        </div>
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>

            {filteredRows.length === 0 ? (
              <tbody>
                <tr><td colSpan={columns.length} className='text-center'>No data available</td></tr>
              </tbody>
            ) : (
              <tbody>
                {table.getRowModel().rows
                  .slice(0, table.getState().pagination.pageSize)
                  .map(row => (
                    <tr key={row.id}>
                      {row.getVisibleCells().map(cell => (
                        <td key={cell.id}>
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                      ))}
                    </tr>
                  ))}
              </tbody>
            )}
          </table>
        </div>

        <TablePagination
          component={() => <TablePaginationComponent table={table} />}
          count={filteredRows.length}
          rowsPerPage={table.getState().pagination.pageSize}
          page={table.getState().pagination.pageIndex}
          onPageChange={(_, page) => table.setPageIndex(page)}
        />
      </Card>

      {/* Drawer: Add */}
      <AddDepartmentDrawer
        open={addOpen}
        handleClose={() => {
          setAddOpen(false)
          refreshPromotions()   // AFTER ADD → REFRESH
        }}
      />

      {/* Drawer: View */}
      <ViewDepartment
        open={viewOpen}
        handleClose={() => {
          setViewOpen(false)
          refreshPromotions()   // AFTER VIEW → REFRESH
        }}
        departmentData={selectedPromotion}
      />
    </>
  )
}

export default DepartmentListTable


