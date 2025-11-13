


'use client'

import { useEffect, useState, useMemo } from 'react'
import { useRouter, useParams } from 'next/navigation'

// MUI Imports
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import Checkbox from '@mui/material/Checkbox'
import IconButton from '@mui/material/IconButton'
import MenuItem from '@mui/material/MenuItem'
import TablePagination from '@mui/material/TablePagination'
import { styled } from '@mui/material/styles'

// Utils
import { getLocalizedUrl } from '@/utils/i18n'

// Third-party Imports
import classnames from 'classnames'
import { rankItem } from '@tanstack/match-sorter-utils'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFacetedMinMaxValues,
  getPaginationRowModel,
  getSortedRowModel
} from '@tanstack/react-table'

// 🧱 Custom Components
import AddEmployeeGoalDrawer from './AddDepartmentDrawer'
import ViewEmployeeGoal from './ViewDepartment'
import EditDepartment from './EditDepartment'
import ExportButton from '../../../../../@menu/components/tables/ExportButton'
import TablePaginationComponent from '@components/TablePaginationComponent'
import CustomTextField from '@core/components/mui/TextField'

// 🧠 API Actions
import { fetchEmployeeReviewCycle, editEmployeeGoal } from '../../../../../app/server/actions'

// 🖼️ Styles
import tableStyles from '@core/styles/table.module.css'

// Styled
const Icon = styled('i')({})

// 🔍 Fuzzy Filter
const fuzzyFilter = (row, columnId, value, addMeta) => {
  const itemRank = rankItem(row.getValue(columnId), value)
  addMeta({ itemRank })
  return itemRank.passed
}

// 🔁 Debounced Input
const DebouncedInput = ({ value: initialValue, onChange, debounce = 500, ...props }) => {
  const [value, setValue] = useState(initialValue)

  useEffect(() => setValue(initialValue), [initialValue])

  useEffect(() => {
    const timeout = setTimeout(() => onChange(value), debounce)
    return () => clearTimeout(timeout)
  }, [value])

  return <CustomTextField {...props} value={value} onChange={e => setValue(e.target.value)} />
}

// Column Helper
const columnHelper = createColumnHelper()

const statusColorMap = {
  'Not Started': 'secondary',
  'In Progress': 'warning',
  Completed: 'success'
}

const DepartmentListTable = ({ tableData }) => {
  const router = useRouter()
  const { lang: locale } = useParams()

  const [data, setData] = useState(tableData)
  const [addOpen, setAddOpen] = useState(false)
  const [viewOpen, setViewOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [selectedGoal, setSelectedGoal] = useState(null)
  const [rowSelection, setRowSelection] = useState({})
  const [globalFilter, setGlobalFilter] = useState('')

  // 🔄 ⭐ FIXED refresh function
  const refreshGoals = async () => {
    const res = await fetchEmployeeReviewCycle()
    setData(res || [])   // <--- FIX HERE
  }

  // 📝 Edit Handler
  const handleUpdateGoal = async updatedData => {
    try {
      const response = await editEmployeeGoal(updatedData)
      await refreshGoals()
      return response
    } catch (error) {
      console.error('Error updating goal:', error)
    }
  }

  // Columns
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
            disabled={!row.getCanSelect()}
            indeterminate={row.getIsSomeSelected()}
            onChange={row.getToggleSelectedHandler()}
          />
        )
      },
      columnHelper.accessor('employeeName', {
        header: 'Employee',
        enableSorting: true,
        cell: ({ row }) => <Typography>{row.original.employeeName}</Typography>
      }),
      columnHelper.accessor('reviewerName', {
        header: 'Reviewer',
        enableSorting: true,
        cell: ({ row }) => <Typography>{row.original.reviewerName}</Typography>
      }),
      columnHelper.accessor('reviewCycleName', {
        header: 'Review Cycle',
        enableSorting: true,
        cell: ({ row }) => <Typography>{row.original.reviewCycleName}</Typography>
      }),
      columnHelper.accessor('reviewDate', {
        header: 'Review Date',
        enableSorting: true,
        cell: ({ row }) => <Typography>{row.original.reviewDate}</Typography>
      }),
      columnHelper.accessor('rating', {
        header: 'Rating',
        enableSorting: true,
        cell: ({ row }) => <Typography>{row.original.rating || '-'}</Typography>
      }),
      columnHelper.accessor('status', {
        header: 'Status',
        enableSorting: true,
        cell: ({ row }) => (
          <Chip
            variant='tonal'
            label={row.original.status}
            size='small'
            color={statusColorMap[row.original.status] || 'default'}
            className='capitalize'
          />
        )
      }),
      columnHelper.accessor('createdAt', {
        header: 'Created At',
        enableSorting: true,
        cell: ({ row }) => {
          const dateFormatted = new Date(row.original.createdAt).toLocaleDateString('en-GB')
          return <Typography>{dateFormatted}</Typography>
        }
      }),

      // Actions
      columnHelper.accessor('action', {
        header: 'Action',
        cell: ({ row }) => (
          <div className='flex items-center gap-2'>
            <IconButton
              onClick={() => {
                localStorage.setItem('selectedReview', JSON.stringify(row.original))
                window.location.href = getLocalizedUrl(
                  `/apps/hrManagement/performance/employeeReviews/view?_id=${row.original._id}`,
                  locale
                )
              }}
            >
              <i className='tabler-eye text-textSecondary' />
            </IconButton>

            {row.original.status !== 'Completed' && (
              <IconButton
                onClick={() => {
                  localStorage.setItem('selectedReview', JSON.stringify(row.original))
                  window.location.href = getLocalizedUrl(
                    `/apps/hrManagement/performance/employeeReviews/edit?_id=${row.original._id}`,
                    locale
                  )
                }}
              >
                <i className='tabler-edit text-textSecondary' />
              </IconButton>
            )}
          </div>
        )
      })
    ],
    [data, locale]
  )

  // Table Setup
  const table = useReactTable({
    data,
    columns,
    filterFns: { fuzzy: fuzzyFilter },
    state: { rowSelection, globalFilter },
    initialState: { pagination: { pageSize: 10 } },
    enableRowSelection: true,
    globalFilterFn: fuzzyFilter,
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues()
  })

  const filteredRows = table.getFilteredRowModel().rows.map(r => r.original)

  return (
    <>
      <Card>

        {/* HEADER */}
        <div className='flex justify-between p-6 border-bs flex-col md:flex-row gap-4'>
          <CustomTextField
            select
            className='sm:is-[70px]'
            value={table.getState().pagination.pageSize}
            onChange={e => table.setPageSize(Number(e.target.value))}
          >
            <MenuItem value='10'>10</MenuItem>
            <MenuItem value='25'>25</MenuItem>
            <MenuItem value='50'>50</MenuItem>
          </CustomTextField>

          <div className='flex flex-col sm:flex-row gap-4'>
            <DebouncedInput
              value={globalFilter ?? ''}
              onChange={val => setGlobalFilter(String(val))}
              placeholder='Search Employee Review Cycle'
            />

            <ExportButton filteredData={filteredRows} />

            <Button
              variant='contained'
              startIcon={<i className='tabler-plus' />}
              onClick={() => setAddOpen(true)}
            >
              Add Employee Review Cycle
            </Button>
          </div>
        </div>

        {/* TABLE */}
        <div className='overflow-x-auto'>
          <table className={tableStyles.table}>
            <thead>
              {table.getHeaderGroups().map(group => (
                <tr key={group.id}>
                  {group.headers.map(header => (
                    <th key={header.id}>
                      <div
                        className={classnames({
                          'cursor-pointer flex items-center': header.column.getCanSort()
                        })}
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                      </div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>

            <tbody>
              {filteredRows.length === 0 ? (
                <tr>
                  <td colSpan={columns.length} className='text-center'>
                    No employee review cycle found
                  </td>
                </tr>
              ) : (
                table.getRowModel().rows.map(row => (
                  <tr key={row.id} className={classnames({ selected: row.getIsSelected() })}>
                    {row.getVisibleCells().map(cell => (
                      <td key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <TablePagination
          component={() => <TablePaginationComponent table={table} />}
          count={filteredRows.length}
          rowsPerPage={table.getState().pagination.pageSize}
          page={table.getState().pagination.pageIndex}
          onPageChange={(_, page) => table.setPageIndex(page)}
        />
      </Card>

      {/* ⭐ DRAWERS (AUTO REFRESH FIXED) */}

      <AddEmployeeGoalDrawer
        open={addOpen}
        handleClose={async () => {
          setAddOpen(false)
          await refreshGoals()   // ✔ auto refresh
        }}
      />

      <ViewEmployeeGoal
        open={viewOpen}
        goalData={selectedGoal}
        handleClose={async () => {
          setViewOpen(false)
          await refreshGoals()   // ✔ auto refresh
        }}
      />

      <EditDepartment
        open={editOpen}
        selectedDepartment={selectedGoal}
        onSave={handleUpdateGoal}
        handleClose={async () => {
          setEditOpen(false)
          await refreshGoals()   // ✔ auto refresh
        }}
      />
    </>
  )
}

export default DepartmentListTable









