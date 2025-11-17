

'use client'

import { useEffect, useState, useMemo } from 'react'
import { useSession } from 'next-auth/react'

// MUI
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import Checkbox from '@mui/material/Checkbox'
import IconButton from '@mui/material/IconButton'
import TablePagination from '@mui/material/TablePagination'
import MenuItem from '@mui/material/MenuItem'
import Box from '@mui/material/Box'

// Components
import TablePaginationComponent from '@components/TablePaginationComponent'
import CustomTextField from '@core/components/mui/TextField'
import ExportButton from '../../../../@menu/components/tables/ExportButton'
import AddDepartmentDrawer from './AddDepartmentDrawer'
import ViewDepartment from './ViewDepartment'
import EditDepartment from './EditDepartment'
import tableStyles from '@core/styles/table.module.css'

// API
import { fetchSalaryAdvanceRequest, updateAdvanceSalaryRequest } from "../../../../app/server/actions"

// Tanstack
import { rankItem } from '@tanstack/match-sorter-utils'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table'

const columnHelper = createColumnHelper()

// Search filter
const fuzzyFilter = (row, columnId, value, addMeta) => {
  const itemRank = rankItem(row.getValue(columnId), value)
  addMeta({ itemRank })
  return itemRank.passed
}

const DebouncedInput = ({ value: init, onChange, debounce = 500, ...props }) => {
  const [value, setValue] = useState(init)

  useEffect(() => setValue(init), [init])

  useEffect(() => {
    const timeout = setTimeout(() => onChange(value), debounce)
    return () => clearTimeout(timeout)
  }, [value])

  return <CustomTextField {...props} value={value} onChange={e => setValue(e.target.value)} />
}

// =====================================================================================
// MAIN COMPONENT
// =====================================================================================
const DepartmentListTable = () => {
  const { data: session } = useSession()
  const token = session?.user?.accessToken

  const [data, setData] = useState([])
  const [rowSelection, setRowSelection] = useState({})
  const [globalFilter, setGlobalFilter] = useState('')
  const [addUserOpen, setAddUserOpen] = useState(false)
  const [viewOpen, setViewOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [selectedSalary, setSelectedSalary] = useState(null)

  // Load / Refresh data from API
  const refreshSalary = async () => {
    if (!token) return

    const res = await fetchSalaryAdvanceRequest(token)

    const cleaned = (res?.data || []).map(item => ({
      ...item,

      // 🔥 FIXED: employeeName directly from API (not nested)
      employeeName: item.employeeName || "-",  

    }))

    setData(cleaned)
  }

  useEffect(() => {
    if (session?.user?.accessToken) refreshSalary()
  }, [session])

  useEffect(() => {
    if (token) refreshSalary()
  }, [token])

  const handleUpdateSalary = async updatedData => {
    const result =  await updateAdvanceSalaryRequest(updatedData, token)
    await refreshSalary()
     return result
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

      columnHelper.accessor('serialNo', {
        header: "#",
        cell: info => info.getValue()
      }),

      // EMPLOYEE NAME
      columnHelper.accessor('employeeName', {
        header: "Employee",
        cell: ({ row }) => <Typography fontWeight={700}>{row.original.employeeName}</Typography>
      }),
        columnHelper.accessor('requestedAmount', {
        header: "Requested Amount",
        cell: ({ row }) => (
          <Typography color="success.main" fontWeight={700}>
            ₹ {Number(row.original.requestedAmount).toLocaleString('en-IN')}
          </Typography>
        )
      }),
        columnHelper.accessor('requestedDate', {
        header: "Requested Date",
        cell: ({ row }) => (
          <Typography  fontWeight={700}>
            {row.original.requestedDate}
          </Typography>
        )
      }),

        columnHelper.accessor('approvedBy', {
        header: "Approved By",
        cell: ({ row }) => (
          <Typography  fontWeight={700}>
            {row.original.approvedBy}
          </Typography>
        )
      }),

           columnHelper.accessor('approvedDate', {
        header: "Approved Date",
        cell: ({ row }) => (
          <Typography  fontWeight={700}>
            {row.original.approvedDate}
          </Typography>
        )
      }),

           columnHelper.accessor('rejectedDate', {
        header: "Rejected Date",
        cell: ({ row }) => (
          <Typography  fontWeight={700}>
            {row.original.rejectedDate}
          </Typography>
        )
      }),

     

      columnHelper.accessor('status', {
        header: "Status",
        cell: ({ row }) => (
          <Chip
            label={row.original.status}
            color={row.original.status === "Active" ? "success" : "error"}
            variant="tonal"
            size="small"
          />
        )
      }),

      columnHelper.accessor('createdAt', {
        header: "Created At",
        cell: ({ row }) => row.original.createdAt
      }),

      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
          <div className="flex gap-2">
            <IconButton onClick={() => { setSelectedSalary(row.original); setViewOpen(true) }}>
              <i className="tabler-eye text" />
            </IconButton>

            <IconButton onClick={() => { setSelectedSalary(row.original); setIsEditOpen(true) }}>
              <i className="tabler-edit text" />
            </IconButton>
          </div>
        )
      }
    ],
    [data]
  )

  const table = useReactTable({
    data,
    columns,
    state: { rowSelection, globalFilter },
    filterFns: { fuzzy: fuzzyFilter },
    globalFilterFn: fuzzyFilter,
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel()
  })

  const filteredRows = table.getFilteredRowModel().rows.map(r => r.original)

  return (
    <>
      <Card>
        {/* HEADER */}
        <div className="flex justify-between flex-col md:flex-row p-6 gap-4">

          <CustomTextField
            select
            value={table.getState().pagination.pageSize}
            onChange={e => table.setPageSize(Number(e.target.value))}
          >
            <MenuItem value='10'>10</MenuItem>
            <MenuItem value='25'>25</MenuItem>
            <MenuItem value='50'>50</MenuItem>
          </CustomTextField>

          <div className="flex flex-col sm:flex-row gap-4">
            <DebouncedInput
              value={globalFilter ?? ""}
              onChange={v => setGlobalFilter(String(v))}
              placeholder="Search Salary Advance Request"
            />

            <ExportButton filteredData={filteredRows} />

            <Button
              variant="contained"
              startIcon={<i className="tabler-plus" />}
              onClick={() => setAddUserOpen(true)}
            >
              Add Salary Advance Request
            </Button>
          </div>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className={tableStyles.table}>
            <thead>
              {table.getHeaderGroups().map(hg => (
                <tr key={hg.id}>
                  {hg.headers.map(header => (
                    <th key={header.id}>
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>

            <tbody>
              {table.getRowModel().rows.map(row => (
                <tr key={row.id}>
                  {row.getVisibleCells().map(cell => (
                    <td key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
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

      {/* DRAWERS */}
      <AddDepartmentDrawer
        open={addUserOpen}
        handleClose={async () => {
          setAddUserOpen(false)
          await refreshSalary()
        }}
      />

      <ViewDepartment
        open={viewOpen}
        handleClose={() => setViewOpen(false)}
        departmentData={selectedSalary}
      />

      <EditDepartment
        open={isEditOpen}
        handleClose={async () => {
          setIsEditOpen(false)
          await refreshSalary()
        }}
        selectedDepartment={selectedSalary}
        onSave={handleUpdateSalary}
      />
    </>
  )
}

export default DepartmentListTable








