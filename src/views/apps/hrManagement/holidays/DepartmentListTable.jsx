'use client'

// React Imports
import { useEffect, useState, useMemo } from 'react'

// Next Imports
import { useParams } from 'next/navigation'

// MUI Imports
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import Checkbox from '@mui/material/Checkbox'
import IconButton from '@mui/material/IconButton'
import { styled } from '@mui/material/styles'
import TablePagination from '@mui/material/TablePagination'
import MenuItem from '@mui/material/MenuItem'
import ViewDepartment from './ViewDepartment'
import EditDepartment from './EditDepartment'
import ExportButton from '../../../../@menu/components/tables/ExportButton'

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

// Component Imports
import AddDepartmentDrawer from './AddDepartmentDrawer'
import TablePaginationComponent from '@components/TablePaginationComponent'
import CustomTextField from '@core/components/mui/TextField'

// Util Imports
import { editDepartment, fetchHolidays } from '../../../../app/server/actions'

// Style Imports
import tableStyles from '@core/styles/table.module.css'

// Styled Components
const Icon = styled('i')({})

// 🔍 Fuzzy Filter
const fuzzyFilter = (row, columnId, value, addMeta) => {
  const itemRank = rankItem(row.getValue(columnId), value)
  addMeta({ itemRank })
  return itemRank.passed
}

// ⏳ Debounced Input
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
  console.log('AAJKADEBUG', tableData)
  const [data, setData] = useState(tableData)
  const [addUserOpen, setAddUserOpen] = useState(false)
  const [rowSelection, setRowSelection] = useState({})
  const [filteredData, setFilteredData] = useState(data)
  const [globalFilter, setGlobalFilter] = useState('')
  const [viewOpen, setViewOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [selectedDepartment, setSelectedDepartment] = useState(null)

  // 🧾 Fetch Transfers
  const refreshWarnings = async () => {
    try {
      const res = await fetchHolidays()
      if (res?.success && Array.isArray(res.data)) {
        setData(res.data)
        setFilteredData(res.data)
      } else {
        console.error('Invalid data format from API:', res)
        setData([])
        setFilteredData([])
      }
    } catch (err) {
      console.error('Error fetching transfers:', err)
      setData([])
      setFilteredData([])
    }
  }

  const refreshDepartments = refreshWarnings

  useEffect(() => {
    refreshWarnings()
  }, [])

  // 🧭 Missing handler fix
  const handleView = transfer => {
    setSelectedDepartment(transfer)
    setViewOpen(true)
  }

  const handleViewDocument = transfer => {
    if (transfer?.document && transfer.document !== 'NA') {
      window.open(transfer.document, '_blank')
    } else {
      alert('No document available')
    }
  }

  const handleUpdateDepartment = async updatedData => {
    try {
      const response = await editDepartment(updatedData)
      await refreshDepartments()
      return response
    } catch (error) {
      console.error('Error updating department:', error)
    }
  }

  const { lang: locale } = useParams()

 const columns = useMemo(
  () => [
    // ✅ Checkbox Column (keep this)
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

    // 🎉 Holiday Name
    columnHelper.accessor('holidayName', {
      header: 'Holiday Name',
      cell: ({ row }) => (
        <Typography color="text.primary" fontWeight={600}>
          {row.original.holidayName}
        </Typography>
      )
    }),

    // 📅 Date
    columnHelper.accessor('startDate', {
      header: 'Date',
      enableSorting: true,
      cell: ({ row }) => (
        <Typography color="text.primary">
          {new Date(row.original.startDate).toLocaleDateString('en-CA')}
        </Typography>
      )
    }),

    // 🏷️ Category
    columnHelper.accessor('category', {
      header: 'Category',
      cell: ({ row }) => (
        <Chip
          variant="tonal"
          label={row.original.category}
          color="secondary"
          size="small"
          className="capitalize"
        />
      )
    }),

    // 🏢 Branches
     columnHelper.accessor('branchNames', {
  header: 'Branches',
  cell: ({ row }) => {
    const branches = row.original.branchNames || []

    if (branches.length === 0) {
      return (
        <Typography variant="body2" color="text.secondary">
          NA
        </Typography>
      )
    }

    return (
      <div className="flex items-center gap-1 flex-wrap">
        {/* 🏢 First branch chip */}
        <Chip
          label={branches[0] || 'Main Office'}
          variant="outlined"
          size="small"
          sx={{
            fontSize: '0.75rem',
            fontWeight: 500,
            borderColor: '#E0E0E0',
            color: '#333',
            backgroundColor: '#fff',
            borderRadius: '8px',
            height: '26px',
            '& .MuiChip-label': { px: 1.5, py: 0.25 }
          }}
        />

        {/* ➕ "+N more" chip */}
        {branches.length > 1 && (
          <Chip
            label={`+${branches.length - 1} more`}
            variant="outlined"
            size="small"
            sx={{
              fontSize: '0.75rem',
              fontWeight: 500,
              borderColor: '#E0E0E0',
              color: '#333',
              backgroundColor: '#fff',
              borderRadius: '8px',
              height: '26px',
              '& .MuiChip-label': { px: 1.5, py: 0.25 }
            }}
          />
        )}
      </div>
    )
  }
}),


    // 🔁 Type (Recurring, Paid)
    // columnHelper.accessor('type', {
    //   header: 'Type',
    //   cell: ({ row }) => (
    //     <div className="flex items-center gap-2">
    //       <Chip
    //         label={row.original.type?.recurrence || 'Recurring'}
    //         color="primary"
    //         variant="tonal"
    //         size="small"
    //       />
    //       <Chip
    //         label={row.original.type?.payType || 'Paid'}
    //         color="success"
    //         variant="tonal"
    //         size="small"
    //       />
    //     </div>
    //   )
    // }),

    columnHelper.accessor('type', {
  header: 'Type',
  cell: ({ row }) => {
    const { recurringAnnualHoliday, paidHoliday, halfDay } = row.original

    return (
      <div className="flex items-center gap-2 flex-wrap">
        {/* 🟣 Recurring */}
        {recurringAnnualHoliday === 'Yes' && (
          <Chip
            label="Recurring"
            color="primary"
            variant="tonal"
            size="small"
            sx={{
              fontSize: '0.75rem',
              fontWeight: 500,
              backgroundColor: 'rgba(99, 102, 241, 0.12)', // soft blue
              color: '#4F46E5'
            }}
          />
        )}

        {/* 🟠 Half Day */}
        {halfDay === 'Yes' && (
          <Chip
            label="Half Day"
            color="error"
            variant="tonal"
            size="small"
            sx={{
              fontSize: '0.75rem',
              fontWeight: 500,
              backgroundColor: 'rgba(239, 68, 68, 0.12)', // soft red
              color: '#B91C1C'
            }}
          />
        )}

        {/* 🟢 Paid */}
        {paidHoliday === 'Yes' && (
          <Chip
            label="Paid"
            color="success"
            variant="tonal"
            size="small"
            sx={{
              fontSize: '0.75rem',
              fontWeight: 500,
              backgroundColor: 'rgba(34, 197, 94, 0.12)', // soft green
              color: '#16A34A'
            }}
          />
        )}
      </div>
    )
  }
}),


    // 📝 Description
    columnHelper.accessor('description', {
      header: 'Description',
      cell: ({ row }) => (
        <Typography color="text.primary">
          {row.original.description}
        </Typography>
      )
    }),

    // ⚙️ Actions
    columnHelper.display({
      id: 'actions',
      header: 'Actions',
      enableSorting: false,
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          {/* 👁 View */}
          <IconButton onClick={() => handleView(row.original)}>
            <i className="tabler-eye text" />
          </IconButton>

          {/* ✏️ Edit */}
          {/* <IconButton onClick={() => handleEdit(row.original)}>
            <i className="tabler-edit text-warning" />
          </IconButton> */}

        
        </div>
      )
    })
  ],
  []
)

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
              placeholder='Search Holiday'
              className='max-sm:is-full'
            />
            <ExportButton filteredData={filteredDatas} />
            <Button
              variant='contained'
              startIcon={<i className='tabler-plus' />}
              onClick={() => setAddUserOpen(!addUserOpen)}
              className='max-sm:is-full'
            >
              Add Holiday
            </Button>
          </div>
        </div>

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

        <TablePagination
          component={() => <TablePaginationComponent table={table} />}
          count={table.getFilteredRowModel().rows.length}
          rowsPerPage={table.getState().pagination.pageSize}
          page={table.getState().pagination.pageIndex}
          onPageChange={(_, page) => table.setPageIndex(page)}
        />
      </Card>

      <AddDepartmentDrawer
        open={addUserOpen}
        handleClose={() => setAddUserOpen(!addUserOpen)}
        userData={data}
        setData={setData}
        refreshDepartments={refreshDepartments}
      />

      <ViewDepartment
        open={viewOpen}
        handleClose={() => setViewOpen(false)}
        departmentData={selectedDepartment}
      />

      <EditDepartment
        open={isEditOpen}
        handleClose={() => setIsEditOpen(false)}
        selectedDepartment={selectedDepartment}
        onSave={handleUpdateDepartment}
      />
    </>
  )
}

export default DepartmentListTable




