
'use client'

import { useEffect, useState, useMemo } from 'react'
import { useParams } from 'next/navigation'

// 📦 MUI Imports
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import Checkbox from '@mui/material/Checkbox'
import IconButton from '@mui/material/IconButton'
import MenuItem from '@mui/material/MenuItem'
import TablePagination from '@mui/material/TablePagination'
import { styled } from '@mui/material/styles'

// 🧩 Custom Imports
import TablePaginationComponent from '@components/TablePaginationComponent'
import CustomTextField from '@core/components/mui/TextField'
import ExportButton from '../../../../@menu/components/tables/ExportButton'
import AddDepartmentDrawer from './AddDepartmentDrawer'
import ViewDepartment from './ViewDepartment'
import EditDepartment from './EditDepartment'
import tableStyles from '@core/styles/table.module.css'

// ⚙️ Server Actions
import { fetchLeaveType, editLeaveType } from '../../../../app/server/actions'

// 🧠 Table Utils
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from '@tanstack/react-table'

// 🧱 Helper functions
const Icon = styled('i')({})
const columnHelper = createColumnHelper()

const userStatusObj = {
  Active: 'success',
  Inactive: 'secondary'
}

// 🔍 Fuzzy Search Function
import { rankItem } from '@tanstack/match-sorter-utils'

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

const DepartmentListTable = ({ tableData }) => {
  const [data, setData] = useState(tableData)
  const [addDrawerOpen, setAddDrawerOpen] = useState(false)
  const [viewOpen, setViewOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [selectedShift, setSelectedShift] = useState(null)
  const [globalFilter, setGlobalFilter] = useState('')

  const refreshShifts = async () => {
    const res = await fetchLeaveType()
    setData(res)
  }
   const openView = shift => {
    setSelectedShift(shift)
    setViewOpen(true)
  }

  const handleEdit = shift => {
    setSelectedShift(shift)
    setEditOpen(true)
  }

  const handleUpdate = async updatedData => {
    try {
      const response = await editLeaveType(updatedData)
      await refreshShifts()
      return response
    } catch (err) {
      console.error('Error updating shift:', err)
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
               disabled={!row.getCanSelect()}
               indeterminate={row.getIsSomeSelected()}
               onChange={row.getToggleSelectedHandler()}
             />
           )
         },

    // Leave Type Name
    
      columnHelper.accessor('leaveTypeName', {
      header: 'Name',
         enableSorting: true,
      cell: ({ row }) => (
        <Typography fontWeight={700}>
          {row.original.leaveTypeName}
        </Typography>
      )
    }),

    // Description
    columnHelper.accessor('description', {
      header: 'Description',
      cell: ({ row }) => (
        <Typography color="text.secondary">
          {row.original.description}
        </Typography>
      )
    }),

    // Max Days
    columnHelper.accessor('maxDays', {
      header: 'Max Days/Year',
      cell: ({ row }) => (
        <Typography className="font-medium">
          {row.original.maxDays}
        </Typography>
      )
    }),

    // Paid / Unpaid Type
    columnHelper.accessor('isPaidStatus', {   // IMPORTANT: Update spelling if needed
      header: 'Type',
      cell: ({ row }) => (
        <Chip
          label={row.original.isPaidStatus}
          size="small"
          variant="tonal"
          color={row.original.isPaidStatus === 'Paid' ? 'success' : 'error'}
        />
      )
    }),

    // Status
    columnHelper.accessor('status', {
      header: 'Status',
      cell: ({ row }) => (
        <Chip
          label={row.original.status}
          size="small"
          variant="tonal"
          color={row.original.status === 'Active' ? 'success' : 'error'}
        />
      )
    }),

    // Created At (formatted from API)
    columnHelper.accessor('createdAt', {
      header: 'Created At',
         enableSorting: true,
      cell: ({ row }) => (
        <Typography>{row.original.createdAt}</Typography>
      )
    }),

    // Actions
    columnHelper.display({
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <IconButton onClick={() => openView(row.original)}>
            <i className="tabler-eye text" />
          </IconButton>

          <IconButton onClick={() => handleEdit(row.original)}>
            <i className="tabler-edit text" />
          </IconButton>

         
        </div>
      )
    })
  ],
  []
)


  // 🧩 React Table setup with search support
  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter
    },
    filterFns: {
      fuzzy: fuzzyFilter
    },
    globalFilterFn: fuzzyFilter,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel()
  })

  const filteredRows = table.getFilteredRowModel().rows.map(r => r.original)

  return (
    <>
      <Card>
        {/* Header Controls */}
        <div className="flex justify-between flex-col items-start md:flex-row md:items-center p-6 border-bs gap-4">
          <CustomTextField
            select
            value={table.getState().pagination.pageSize}
            onChange={e => table.setPageSize(Number(e.target.value))}
            className="max-sm:is-full sm:is-[70px]"
          >
            <MenuItem value="10">10</MenuItem>
            <MenuItem value="25">25</MenuItem>
            <MenuItem value="50">50</MenuItem>
          </CustomTextField>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <DebouncedInput
              value={globalFilter ?? ''}
              onChange={v => setGlobalFilter(String(v))}
              placeholder="Search Shift"
              className="max-sm:is-full"
            />
            <ExportButton filteredData={filteredRows} />
            <Button
              variant="contained"
              startIcon={<i className="tabler-plus" />}
              onClick={() => setAddDrawerOpen(true)}
              className="max-sm:is-full"
            >
              Add Shift
            </Button>
          </div>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          <table className={tableStyles.table}>
            <thead>
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map(header => (
                    <th key={header.id}>
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.length > 0 ? (
                table.getRowModel().rows.map(row => (
                  <tr key={row.id}>
                    {row.getVisibleCells().map(cell => (
                      <td key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={columns.length} className="text-center">
                    No shifts available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <TablePagination
          component={() => <TablePaginationComponent table={table} />}
          count={table.getFilteredRowModel().rows.length}
          rowsPerPage={table.getState().pagination.pageSize}
          page={table.getState().pagination.pageIndex}
          onPageChange={(_, page) => table.setPageIndex(page)}
        />
      </Card>

      {/* Drawers */}
      <AddDepartmentDrawer
        open={addDrawerOpen}
        handleClose={() => setAddDrawerOpen(false)}
        userData={data}
        setData={setData}
        refreshDepartments={refreshShifts}
      />

      <ViewDepartment
        open={viewOpen}
        handleClose={() => setViewOpen(false)}
        departmentData={selectedShift}
      />

      <EditDepartment
        open={editOpen}
        handleClose={() => setEditOpen(false)}
        selectedDepartment={selectedShift}
        onSave={handleUpdate}
      />
    </>
  )
}

export default DepartmentListTable



