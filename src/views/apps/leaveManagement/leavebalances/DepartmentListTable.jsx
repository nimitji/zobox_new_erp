



'use client'

// React Imports
import { useEffect, useState, useMemo } from 'react'
import { useSession } from 'next-auth/react'

// Next Imports
import Link from 'next/link'
import { useParams } from 'next/navigation'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import Checkbox from '@mui/material/Checkbox'
import IconButton from '@mui/material/IconButton'
import { styled } from '@mui/material/styles'
import TablePagination from '@mui/material/TablePagination'
import MenuItem from '@mui/material/MenuItem'

// Component Imports
import TablePaginationComponent from '@components/TablePaginationComponent'
import CustomTextField from '@core/components/mui/TextField'
import ExportButton from '../../../../@menu/components/tables/ExportButton'
import AddDepartmentDrawer from './AddDepartmentDrawer'
import ViewDepartment from './ViewDepartment'
import EditDepartment from './EditDepartment'
import tableStyles from '@core/styles/table.module.css'
import CustomAvatar from '@core/components/mui/Avatar'

// Util Imports
import { getInitials } from '@/utils/getInitials'
import { getLocalizedUrl } from '@/utils/i18n'

// ⭐ UPDATED — TOKEN SUPPORTED SERVER ACTIONS
import { updateLeaveBalance, fetchLeaveBalance } from "../../../../app/server/actions"

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

// Styled Components
const Icon = styled('i')({})

const fuzzyFilter = (row, columnId, value, addMeta) => {
  const itemRank = rankItem(row.getValue(columnId), value)
  addMeta({ itemRank })
  return itemRank.passed
}

const DebouncedInput = ({ value: initialValue, onChange, debounce = 500, ...props }) => {
  const [value, setValue] = useState(initialValue)

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])
  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value)
    }, debounce)

    return () => clearTimeout(timeout)
  }, [value])

  return <CustomTextField {...props} value={value} onChange={e => setValue(e.target.value)} />
}

const columnHelper = createColumnHelper()

const DepartmentListTable = ({ tableData }) => {

  // ⭐ Token Access
  const { data: session } = useSession()
  const token = session?.user?.accessToken

  const [data, setData] = useState(tableData)
  const [addUserOpen, setAddUserOpen] = useState(false)
  const [rowSelection, setRowSelection] = useState({})
  const [filteredData, setFilteredData] = useState(data)
  const [globalFilter, setGlobalFilter] = useState('')

  // View + Edit
  const [selectedUser, setSelectedUser] = useState(null)
  const [viewOpen, setViewOpen] = useState(false)

  const [isEditOpen, setIsEditOpen] = useState(false)
  const [selectedDepartment, setSelectedDepartment] = useState(null)
  
  
   const openView = department => {
  setSelectedDepartment(department)
  setViewOpen(true)
}

  const handleEdit = department => {
    setSelectedDepartment(department)
    setIsEditOpen(true)
  }

  // ⭐ FETCH with TOKEN
  const refreshDepartments = async () => {
    if (!token) return console.warn("⚠️ Token missing")
    const res = await fetchLeaveBalance(token)
    setData(res)
    setFilteredData(res)
  }

  // ⭐ UPDATE with TOKEN
  const handleUpdateDepartment = async updatedData => {
    try {
      if (!token) {
        console.warn("⚠️ Token missing")
        return
      }

      const response = await updateLeaveBalance(updatedData, token)
      await refreshDepartments()
      return response

    } catch (error) {
      console.error('Error updating department:', error)
    }
  }

  // Load using token
  useEffect(() => {
    if (token) refreshDepartments()
  }, [token])

  const { lang: locale } = useParams()


  

  const columns = useMemo(
  () => [
    // ✅ SR NO
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

    // ✅ EMPLOYEE
    columnHelper.accessor('employeeName', {
      header: 'Employee',
      cell: ({ row }) => (
        <Typography fontWeight={500}>
          {row.original.employeeName || '-'}
        </Typography>
      )
    }),

    // ✅ LEAVE TYPE
    columnHelper.accessor('leaveTypeName', {
      header: 'Leave Type',
      cell: ({ row }) => (
        <div className='flex items-center gap-2'>

          <Typography>
            {row.original.leaveTypeName || '-'}
          </Typography>
        </div>
      )
    }),

 
    // ✅ END DATE
    columnHelper.accessor('year', {
      header: 'Year',
       enableSorting: true,
      cell: ({ row }) => row.original.year
    }),

  
      columnHelper.accessor('allocatedDays', {
  header: 'Allocated',
  enableSorting: true,
  cell: ({ row }) => {
    const value = row.original.allocatedDays
    return value !== 'NA' && value !== null && value !== undefined
      ? Number(value).toFixed(2)   // ✅ 9 → 9.00
      : 'NA'
  }
}),

  
      columnHelper.accessor('used', {
  header: 'Used',
  enableSorting: true,
  cell: ({ row }) => {
    const value = row.original.used
    return value !== 'NA' && value !== null && value !== undefined
      ? Number(value).toFixed(2)   // ✅ 9 → 9.00
      : 'NA'
  }
}),
 
      columnHelper.accessor('remaining', {
  header: 'Remaining',
  enableSorting: true,
  cell: ({ row }) => {
    const value = row.original.remaining
    return value !== 'NA' && value !== null && value !== undefined
      ? Number(value).toFixed(2)   // ✅ 9 → 9.00
      : 'NA'
  }
}),
     columnHelper.accessor('carriedForwardDays', {
  header: 'Carried Forward',
  enableSorting: true,
  cell: ({ row }) => {
    const value = row.original.carriedForwardDays
    return value !== 'NA' && value !== null && value !== undefined
      ? Number(value).toFixed(2)   // ✅ 9 → 9.00
      : 'NA'
  }
}),
    columnHelper.accessor('manualAdustment', {
  header: 'Adjustment',
  enableSorting: true,
  cell: ({ row }) => {
    const value = row.original.manualAdustment
    return value !== 'NA' && value !== null && value !== undefined
      ? Number(value).toFixed(2)   // ✅ 9 → 9.00
      : 'NA'
  }
}),

   
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

  const table = useReactTable({
    data,
    columns,
    state: {
      rowSelection,
      globalFilter
    },
    filterFns: { fuzzy: fuzzyFilter },
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
              placeholder='Search Leave Balance'
              className='max-sm:is-full'
            />

            <ExportButton filteredData={filteredDatas} />

            <Button
              variant='contained'
              startIcon={<i className='tabler-plus' />}
              onClick={() => setAddUserOpen(!addUserOpen)}
              className='max-sm:is-full'
            >
              Add Leave Balance
            </Button>
          </div>
        </div>

        {/* TABLE BODY */}
        

          <div className='overflow-x-auto'>
          <table className={tableStyles.table}>
            <thead>
              {table.getHeaderGroups().map(hg => (
                <tr key={hg.id}>
                  {hg.headers.map(h => (
                    <th
                      key={h.id}
                      onClick={h.column.getToggleSortingHandler()}
                      style={{ cursor: h.column.getCanSort() ? 'pointer' : 'default' }}
                    >
                      {flexRender(h.column.columnDef.header, h.getContext())}
                      {{
                        asc: '',
                        desc: ''
                      }[h.column.getIsSorted()] ?? ''}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>

            <tbody>
              {table.getRowModel().rows.map(row => (
                <tr key={row.id} className={classnames({ selected: row.getIsSelected() })}>
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
          await refreshDepartments()
        }}
        userData={data}
        setData={setData}
      />

      <ViewDepartment
        open={viewOpen}
        handleClose={() => setViewOpen(false)}
        departmentData={selectedDepartment}
      />

      <EditDepartment
        open={isEditOpen}
        handleClose={async () => {
          setIsEditOpen(false)
          await refreshDepartments()
        }}
        selectedDepartment={selectedDepartment}
        onSave={handleUpdateDepartment}
      />
    </>
  )
}

export default DepartmentListTable




