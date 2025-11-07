


'use client'

// React Imports
import { useEffect, useState, useMemo } from 'react'

// MUI Imports
import {
  Card,
  Button,
  Typography,
  Chip,
  Checkbox,
  IconButton,
  MenuItem,
  TablePagination
} from '@mui/material'

// Third-party Imports
import classnames from 'classnames'
import { rankItem } from '@tanstack/match-sorter-utils'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFacetedMinMaxValues,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table'

// Component Imports
import TablePaginationComponent from '@components/TablePaginationComponent'
import CustomTextField from '@core/components/mui/TextField'
import ExportButton from '../../../../@menu/components/tables/ExportButton'
import AddDepartmentDrawer from './AddDepartmentDrawer' // 👉 your Add Resignation Drawer
import ViewDepartment from './ViewDepartment' // 👉 View Resignation Drawer
import EditDepartment from './EditDepartment' // 👉 Edit Resignation Drawer
import tableStyles from '@core/styles/table.module.css'

// Actions
import { updateResignation, fetchResignation } from '../../../../app/server/actions'

// Utils
const columnHelper = createColumnHelper()

// 🔍 Fuzzy search helper
const fuzzyFilter = (row, columnId, value, addMeta) => {
  const itemRank = rankItem(row.getValue(columnId), value)
  addMeta({ itemRank })
  return itemRank.passed
}

// ⏳ Debounced input for search
const DebouncedInput = ({ value: initialValue, onChange, debounce = 500, ...props }) => {
  const [value, setValue] = useState(initialValue)

  useEffect(() => setValue(initialValue), [initialValue])
  useEffect(() => {
    const timeout = setTimeout(() => onChange(value), debounce)
    return () => clearTimeout(timeout)
  }, [value])

  return <CustomTextField {...props} value={value} onChange={e => setValue(e.target.value)} />
}

// 🌟 Main Component
const DepartmentListTable = () => {
  const [data, setData] = useState([])
  const [rowSelection, setRowSelection] = useState({})
  const [globalFilter, setGlobalFilter] = useState('')
  const [addDrawerOpen, setAddDrawerOpen] = useState(false)
  const [viewOpen, setViewOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [selectedDepartment, setSelectedDepartment] = useState(null)

  /* 🧩 Fetch resignations */
  const loadResignations = async () => {
    try {
      const res = await fetchResignation()
      if (Array.isArray(res)) setData(res)
      else if (res?.success && Array.isArray(res.data)) setData(res.data)
    } catch (err) {
      console.error('❌ Error fetching resignations:', err)
    }
  }

  useEffect(() => {
    loadResignations()
  }, [])

  /* ✏️ Handle Edit Click */
  const handleEditClick = resignation => {
    setSelectedDepartment(resignation)
    setIsEditOpen(true)
  }

  /* 💾 Handle Update Save */
  const handleUpdateDepartment = async updatedData => {
    try {
      console.log('Updating resignation:', updatedData)
      const res = await updateResignation(updatedData)
      await loadResignations()
      return res
    } catch (error) {
      console.error('Error updating resignation:', error)
    }
  }

  /* 🧩 Columns Definition */
  const columns = useMemo(
    () => [
      {
        id: 'select',
        header: ({ table }) => (
          <Checkbox
            {...{
              checked: table.getIsAllRowsSelected(),
              indeterminate: table.getIsSomeRowsSelected(),
              onChange: table.getToggleAllRowsSelectedHandler()
            }}
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            {...{
              checked: row.getIsSelected(),
              disabled: !row.getCanSelect(),
              indeterminate: row.getIsSomeSelected(),
              onChange: row.getToggleSelectedHandler()
            }}
          />
        )
      },
      columnHelper.accessor('employeeName', {
        header: 'Employee Name',
        cell: ({ row }) => (
          <Typography color='text.primary' className='font-medium'>
            {row.original.employeeName || '-'}
          </Typography>
        )
      }),
      columnHelper.accessor('resignationDate', {
        header: 'Resignation Date',
        cell: ({ row }) => {
          const date = row.original.resignationDate
            ? new Date(row.original.resignationDate).toISOString().split('T')[0]
            : '-'
          return <Typography color='text.primary'>{date}</Typography>
        }
      }),
      columnHelper.accessor('lastWorkingDay', {
        header: 'Last Working Day',
        cell: ({ row }) => {
          const date = row.original.lastWorkingDay
            ? new Date(row.original.lastWorkingDay).toISOString().split('T')[0]
            : '-'
          return <Typography color='text.primary'>{date}</Typography>
        }
      }),
      columnHelper.accessor('noticePeriod', {
        header: 'Notice Period',
        cell: ({ row }) => (
          <Typography color='text.primary'>{row.original.noticePeriod || '-'}</Typography>
        )
      }),
      columnHelper.accessor('reason', {
        header: 'Reason',
        cell: ({ row }) => (
          <Typography color='text.primary'>{row.original.reason || '-'}</Typography>
        )
      }),
      columnHelper.accessor('status', {
        header: 'Status',
        cell: ({ row }) => {
          const status = row.original.status
          const color =
            status === 'Approved'
              ? 'success'
              : status === 'Rejected'
              ? 'error'
              : 'warning'
          return (
            <Chip
              variant='tonal'
              label={status || 'Pending'}
              size='small'
              color={color}
              className='capitalize'
            />
          )
        }
      }),
      columnHelper.accessor('document', {
        header: 'Document',
        cell: ({ row }) =>
          row.original.document ? (
            <Button
              variant='outlined'
              size='small'
              color='primary'
              href={row.original.document}
              target='_blank'
            >
              View
            </Button>
          ) : (
            <Typography color='text.secondary'>No Document</Typography>
          )
      }),
      columnHelper.accessor('createdAt', {
        header: 'Created At',
        enableSorting: true,
        cell: ({ row }) => {
          const formatted = row.original.createdAt
            ? new Date(row.original.createdAt).toISOString().split('T')[0]
            : '-'
          return <Typography color='text.primary'>{formatted}</Typography>
        }
      }),
      columnHelper.accessor('action', {
        header: 'Action',
        enableSorting: false,
        cell: ({ row }) => (
          <div className='flex items-center'>
            <IconButton
              onClick={() => {
                setSelectedDepartment(row.original)
                setViewOpen(true)
              }}
            >
              <i className='tabler-eye text-textSecondary' />
            </IconButton>

            <IconButton onClick={() => handleEditClick(row.original)}>
              <i className='tabler-edit text-textSecondary' />
            </IconButton>
          </div>
        )
      })
    ],
    []
  )

  /* 🧩 Table setup */
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

  const filteredDatas = table.getFilteredRowModel().rows.map(row => row.original)

  return (
    <>
      <Card>
        {/* 🔹 Top Controls */}
        <div className='flex justify-between flex-col items-start md:flex-row md:items-center p-6 border-bs gap-4'>
          <CustomTextField
            select
            value={table.getState().pagination.pageSize}
            onChange={e => table.setPageSize(Number(e.target.value))}
            className='max-sm:is-full sm:is-[70px]'
          >
            <MenuItem value='10'>10</MenuItem>
            <MenuItem value='25'>25</MenuItem>
            <MenuItem value='50'>50</MenuItem>
          </CustomTextField>

          <div className='flex flex-col sm:flex-row max-sm:is-full items-start sm:items-center gap-4'>
            <DebouncedInput
              value={globalFilter ?? ''}
              onChange={value => setGlobalFilter(String(value))}
              placeholder='Search Resignation'
              className='max-sm:is-full'
            />

            <ExportButton filteredData={filteredDatas} />

            <Button
              variant='contained'
              startIcon={<i className='tabler-plus' />}
              onClick={() => setAddDrawerOpen(true)}
              className='max-sm:is-full'
            >
              Add Resignation
            </Button>
          </div>
        </div>

        {/* 🔹 Table */}
        <div className='overflow-x-auto'>
          <table className={tableStyles.table}>
            <thead>
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map(header => (
                    <th key={header.id}>
                      {header.isPlaceholder ? null : (
                        <div
                          className={classnames({
                            'flex items-center': header.column.getIsSorted(),
                            'cursor-pointer select-none': header.column.getCanSort()
                          })}
                          onClick={header.column.getToggleSortingHandler()}
                        >
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          {{
                            asc: <i className='tabler-chevron-up text-xl' />,
                            desc: <i className='tabler-chevron-down text-xl' />
                          }[header.column.getIsSorted()] ?? null}
                        </div>
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getFilteredRowModel().rows.length === 0 ? (
                <tr>
                  <td colSpan={table.getVisibleFlatColumns().length} className='text-center'>
                    No data available
                  </td>
                </tr>
              ) : (
                table
                  .getRowModel()
                  .rows.slice(0, table.getState().pagination.pageSize)
                  .map(row => (
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

        {/* 🔹 Pagination */}
        <TablePagination
          component={() => <TablePaginationComponent table={table} />}
          count={table.getFilteredRowModel().rows.length}
          rowsPerPage={table.getState().pagination.pageSize}
          page={table.getState().pagination.pageIndex}
          onPageChange={(_, page) => table.setPageIndex(page)}
        />
      </Card>

      {/* 🟢 View Drawer */}
      <ViewDepartment
        open={viewOpen}
        handleClose={() => setViewOpen(false)}
        departmentData={selectedDepartment}
      />

      {/* 🟡 Edit Drawer */}
      {/* <EditDepartment
        open={isEditOpen}
        handleClose={() => setIsEditOpen(false)}
        selectedDepartment={selectedDepartment}
        onSave={handleUpdateDepartment}
      /> */}

<EditDepartment
  open={isEditOpen}
  handleClose={() => setIsEditOpen(false)}
  selectedDepartment={selectedDepartment}
  onSave={handleUpdateDepartment}
  refreshList={loadResignations} // ✅ this is correct
/>


      {/* 🟣 Add Drawer */}
      <AddDepartmentDrawer
        open={addDrawerOpen}
        handleClose={() => setAddDrawerOpen(!addDrawerOpen)}
        refreshDepartments={loadResignations}
      />
    </>
  )
}

export default DepartmentListTable




