

// 'use client'

// import { useEffect, useState, useMemo } from 'react'
// import { useSession } from 'next-auth/react'

// // 📦 MUI Imports
// import Card from '@mui/material/Card'
// import Button from '@mui/material/Button'
// import Typography from '@mui/material/Typography'
// import Chip from '@mui/material/Chip'
// import IconButton from '@mui/material/IconButton'
// import MenuItem from '@mui/material/MenuItem'
// import TablePagination from '@mui/material/TablePagination'
// import Checkbox from '@mui/material/Checkbox'   // ⭐ FIXED
// import { styled } from '@mui/material/styles'

// // 🧩 Custom Imports
// import TablePaginationComponent from '@components/TablePaginationComponent'
// import CustomTextField from '@core/components/mui/TextField'
// import ExportButton from '../../../../@menu/components/tables/ExportButton'
// import AddDepartmentDrawer from './AddDepartmentDrawer'
// import ViewDepartment from './ViewDepartment'
// import EditDepartment from './EditDepartment'
// import tableStyles from '@core/styles/table.module.css'

// // ⚙️ Server Actions
// import { fetchLeavePolicy, editLeavePolicy } from '../../../../app/server/actions'

// // 🧠 Table Utils
// import {
//   createColumnHelper,
//   flexRender,
//   getCoreRowModel,
//   useReactTable,
//   getPaginationRowModel,
//   getSortedRowModel,
//   getFilteredRowModel
// } from '@tanstack/react-table'

// // 🔍 Search
// import { rankItem } from '@tanstack/match-sorter-utils'

// // Helpers
// const Icon = styled('i')({})
// const columnHelper = createColumnHelper()

// // 🔍 Fuzzy Filter (search)
// const fuzzyFilter = (row, columnId, value, addMeta) => {
//   const itemRank = rankItem(row.getValue(columnId), value)
//   addMeta({ itemRank })
//   return itemRank.passed
// }

// // 🕐 Debounced Input
// const DebouncedInput = ({ value: initialValue, onChange, debounce = 500, ...props }) => {
//   const [value, setValue] = useState(initialValue)
//   useEffect(() => setValue(initialValue), [initialValue])
//   useEffect(() => {
//     const timeout = setTimeout(() => onChange(value), debounce)
//     return () => clearTimeout(timeout)
//   }, [value])
//   return <CustomTextField {...props} value={value} onChange={e => setValue(e.target.value)} />
// }

// const DepartmentListTable = ({ tableData }) => {
//   const { data: session } = useSession()
//   const [data, setData] = useState(tableData || [])
//   const [addDrawerOpen, setAddDrawerOpen] = useState(false)
//   const [viewOpen, setViewOpen] = useState(false)
//   const [editOpen, setEditOpen] = useState(false)
//   const [selectedShift, setSelectedShift] = useState(null)
//   const [globalFilter, setGlobalFilter] = useState('')

//   // 📌 Fetch Data
//   const fetchData = async () => {
//     try {
//       const res = await fetchLeavePolicy()
//       setData(res.data || res || [])
//     } catch (err) {
//       console.error('❌ Error fetching:', err)
//     }
//   }

//   const refreshShifts = async () => {
//     await fetchData()
//   }

//   // ✏️ Update Handler
//   const handleUpdate = async updatedData => {
//     try {
//       const res = await editLeavePolicy(updatedData)
//       await refreshShifts()
//       return res
//     } catch (err) {
//       console.error('❌ Error updating regularization:', err)
//     }
//   }

//   // ---------------------- TABLE COLUMNS ----------------------
//   const columns = useMemo(
//     () => [
//       // SELECT CHECKBOX
//       {
//         id: 'select',
//         header: ({ table }) => (
//           <Checkbox
//             checked={table.getIsAllRowsSelected()}
//             indeterminate={table.getIsSomeRowsSelected()}
//             onChange={table.getToggleAllRowsSelectedHandler()}
//           />
//         ),
//         cell: ({ row }) => (
//           <Checkbox
//             checked={row.getIsSelected()}
//             disabled={!row.getCanSelect()}
//             indeterminate={row.getIsSomeSelected()}
//             onChange={row.getToggleSelectedHandler()}
//           />
//         )
//       },

//       // POLICY NAME
//       columnHelper.accessor('policyName', {
//         header: 'Policy Name',
//         enableSorting: true,
//         cell: ({ row }) => (
//           <Typography fontWeight={600}>{row.original.policyName}</Typography>
//         )
//       }),

//       // LEAVE TYPE
//       columnHelper.display({
//         id: 'leaveType',
//         header: 'Leave Type',
//         cell: ({ row }) => (
//           <div className="flex items-center gap-2">
//             <span
//               className="w-3 h-3 rounded-full"
//               style={{ backgroundColor: row.original.color || '#3F51B5' }}
//             ></span>

//             <Typography>{row.original.leaveTypeName}</Typography>
//           </div>
//         )
//       }),

//       // ACCRUAL
//       columnHelper.display({
//         id: 'accural',
//         header: 'Accrual',
//         cell: ({ row }) => (
//           <Typography fontWeight={500}>
//             {Number(row.original.accuralRates).toFixed(2)} days/
//             {row.original.accuralType.toLowerCase()}
//           </Typography>
//         )
//       }),

//       // CARRY FORWARD
//       columnHelper.display({
//         id: 'carryForwardLimit',
//         header: 'Carry Forward',
//         cell: ({ row }) => (
//           <Typography fontWeight={500}>
//             {row.original.carryForwardLimit} days
//           </Typography>
//         )
//       }),

//       // APPROVAL REQUIRED
//       columnHelper.accessor('isRequired', {
//         header: 'Approval',
//         cell: ({ row }) => (
//           <Chip
//             label={row.original.isRequired}
//             size="small"
//             variant="outlined"
//             color={row.original.isRequired === 'Required' ? 'primary' : 'secondary'}
//           />
//         )
//       }),

//       // STATUS
//       columnHelper.accessor('status', {
//         header: 'Status',
//         cell: ({ row }) => (
//           <Chip
//             label={row.original.status}
//             size="small"
//             variant="tonal"
//             color={row.original.status === 'Active' ? 'success' : 'error'}
//           />
//         )
//       }),

//       // CREATED AT
//       columnHelper.accessor('createdAt', {
//         header: 'Created At',
//         enableSorting: true,
//         cell: ({ row }) => (
//           <Typography>{row.original.createdAt}</Typography>
//         )
//       }),

//       // ACTIONS
//       columnHelper.display({
//         id: 'actions',
//         header: 'Actions',
//         cell: ({ row }) => (
//           <div className="flex items-center gap-3">
//             <IconButton onClick={() => { setSelectedShift(row.original); setViewOpen(true) }}>
//               <i className="tabler-eye text" />
//             </IconButton>

//             <IconButton onClick={() => { setSelectedShift(row.original); setEditOpen(true) }}>
//               <i className="tabler-edit text" />
//             </IconButton>

//           </div>
//         )
//       })
//     ],
//     []
//   )

//   // ---------------------- TABLE INSTANCE ----------------------
//   const table = useReactTable({
//     data,
//     columns,
//     state: { globalFilter },
//     filterFns: { fuzzy: fuzzyFilter },
//     globalFilterFn: fuzzyFilter,
//     onGlobalFilterChange: setGlobalFilter,
//     getCoreRowModel: getCoreRowModel(),
//     getPaginationRowModel: getPaginationRowModel(),
//     getSortedRowModel: getSortedRowModel(),
//     getFilteredRowModel: getFilteredRowModel()
//   })

//   const filteredRows = table.getFilteredRowModel().rows.map(r => r.original)

//   return (
//     <>
//       <Card>
//         <div className="flex justify-between p-6 border-bs flex-col md:flex-row gap-4">
//           <CustomTextField
//             select
//             value={table.getState().pagination.pageSize}
//             onChange={e => table.setPageSize(Number(e.target.value))}
//             className="sm:is-[70px]"
//           >
//             <MenuItem value={10}>10</MenuItem>
//             <MenuItem value={25}>25</MenuItem>
//             <MenuItem value={50}>50</MenuItem>
//           </CustomTextField>

//           <div className="flex flex-col sm:flex-row gap-4">
//             <DebouncedInput
//               value={globalFilter ?? ''}
//               onChange={v => setGlobalFilter(String(v))}
//               placeholder="Search Leave Policies"
//             />

//             <ExportButton filteredData={filteredRows} />

//             <Button
//               variant="contained"
//               startIcon={<i className="tabler-plus" />}
//               onClick={() => setAddDrawerOpen(true)}
//             >
//               Add Leave Policy
//             </Button>
//           </div>
//         </div>

//         {/* TABLE */}
//         <div className="overflow-x-auto">
//           <table className={tableStyles.table}>
//             <thead>
//               {table.getHeaderGroups().map(group => (
//                 <tr key={group.id}>
//                   {group.headers.map(header => (
//                     <th key={header.id}>
//                       {flexRender(header.column.columnDef.header, header.getContext())}
//                     </th>
//                   ))}
//                 </tr>
//               ))}
//             </thead>

//             <tbody>
//               {table.getRowModel().rows.length > 0 ? (
//                 table.getRowModel().rows.map(row => (
//                   <tr key={row.id}>
//                     {row.getVisibleCells().map(cell => (
//                       <td key={cell.id}>
//                         {flexRender(cell.column.columnDef.cell, cell.getContext())}
//                       </td>
//                     ))}
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan={columns.length} className="text-center py-4">
//                     No records available
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>

//         <TablePagination
//           component={() => <TablePaginationComponent table={table} />}
//           count={filteredRows.length}
//           rowsPerPage={table.getState().pagination.pageSize}
//           page={table.getState().pagination.pageIndex}
//           onPageChange={(_, p) => table.setPageIndex(p)}
//         />
//       </Card>

//       {/* DRAWERS */}
//       <AddDepartmentDrawer
//         open={addDrawerOpen}
//         handleClose={async () => {
//           setAddDrawerOpen(false)
//           await refreshShifts()
//         }}
//         userData={data}
//         setData={setData}
//       />

//       <ViewDepartment
//         open={viewOpen}
//         handleClose={async () => {
//           setViewOpen(false)
//           await refreshShifts()
//         }}
//         departmentData={selectedShift}
//       />

//       <EditDepartment
//         open={editOpen}
//         selectedDepartment={selectedShift}
//         onSave={handleUpdate}
//         handleClose={async () => {
//           setEditOpen(false)
//           await refreshShifts()
//         }}
//       />
//     </>
//   )
// }

// export default DepartmentListTable

'use client'

import { useEffect, useState, useMemo } from 'react'
import { useSession } from 'next-auth/react'

// 📦 MUI Imports
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import IconButton from '@mui/material/IconButton'
import MenuItem from '@mui/material/MenuItem'
import TablePagination from '@mui/material/TablePagination'
import Checkbox from '@mui/material/Checkbox'
import { styled } from '@mui/material/styles'

// 🧩 Custom Imports
import TablePaginationComponent from '@components/TablePaginationComponent'
import CustomTextField from '@core/components/mui/TextField'
import ExportButton from '../../../../@menu/components/tables/ExportButton'
import AddDepartmentDrawer from './AddDepartmentDrawer'
import ViewDepartment from './ViewDepartment'
import EditDepartment from './EditDepartment'
import tableStyles from '@core/styles/table.module.css'

// ⚙ Server Actions
import { fetchLeavePolicy, editLeavePolicy } from '../../../../app/server/actions'

// 🔥 Tanstack Table
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel
} from '@tanstack/react-table'

import { rankItem } from '@tanstack/match-sorter-utils'

const Icon = styled('i')({})
const columnHelper = createColumnHelper()

// 🔍 Fuzzy filter
const fuzzyFilter = (row, columnId, value, addMeta) => {
  const itemRank = rankItem(row.getValue(columnId), value)
  addMeta({ itemRank })
  return itemRank.passed
}

// 🕐 Debounced Input
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
  const { data: session } = useSession()

  const [data, setData] = useState(tableData || [])
  const [addDrawerOpen, setAddDrawerOpen] = useState(false)
  const [viewOpen, setViewOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [selectedShift, setSelectedShift] = useState(null)

  const [globalFilter, setGlobalFilter] = useState('')
  const [sorting, setSorting] = useState([])   // ⭐ REQUIRED

  // Fetch Data
  const fetchData = async () => {
    try {
      const res = await fetchLeavePolicy()
      setData(res.data || res || [])
    } catch (err) {
      console.error('❌ Error fetching:', err)
    }
  }

  const refreshShifts = async () => await fetchData()

  // Update Handler
  const handleUpdate = async updatedData => {
    try {
      const res = await editLeavePolicy(updatedData)
      await refreshShifts()
      return res
    } catch (err) {
      console.error('❌ Error updating:', err)
    }
  }

  // ------------------ COLUMNS ---------------------
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

      columnHelper.accessor('policyName', {
        header: 'Policy Name',
        enableSorting: true,
        cell: ({ row }) => <Typography fontWeight={600}>{row.original.policyName}</Typography>
      }),

      columnHelper.display({
        id: 'leaveType',
        header: 'Leave Type',
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full" style={{ background: row.original.color || '#3F51B5' }} />
            <Typography>{row.original.leaveTypeName}</Typography>
          </div>
        )
      }),

      columnHelper.display({
        id: 'accural',
        header: 'Accrual',
        cell: ({ row }) => (
          <Typography fontWeight={500}>
            {Number(row.original.accuralRates).toFixed(2)} days/{row.original.accuralType.toLowerCase()}
          </Typography>
        )
      }),

      columnHelper.accessor('carryForwardLimit', {
        header: 'Carry Forward',
        cell: ({ row }) => <Typography>{row.original.carryForwardLimit} days</Typography>
      }),

      columnHelper.accessor('isRequired', {
        header: 'Approval',
        cell: ({ row }) => (
          <Chip
            label={row.original.isRequired}
            size="small"
            variant="outlined"
            color={row.original.isRequired === 'Required' ? 'primary' : 'secondary'}
          />
        )
      }),

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

      columnHelper.accessor('createdAt', {
        header: 'Created At',
        enableSorting: true,
        cell: ({ row }) => <Typography>{row.original.createdAt}</Typography>
      }),

      columnHelper.display({
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => (
          <div className="flex items-center gap-3">
            <IconButton onClick={() => { setSelectedShift(row.original); setViewOpen(true) }}>
              <i className="tabler-eye text" />
            </IconButton>
            <IconButton onClick={() => { setSelectedShift(row.original); setEditOpen(true) }}>
              <i className="tabler-edit text" />
            </IconButton>
          </div>
        )
      })
    ],
    []
  )

  // ------------------ TABLE INSTANCE ---------------------
  const table = useReactTable({
    data,
    columns,
    state: { globalFilter, sorting },       // ⭐ ADD sorting
    onSortingChange: setSorting,            // ⭐ Sorting handler
    filterFns: { fuzzy: fuzzyFilter },
    globalFilterFn: fuzzyFilter,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(), // ⭐ Required
    getFilteredRowModel: getFilteredRowModel()
  })

  const filteredRows = table.getFilteredRowModel().rows.map(r => r.original)

  return (
    <>
      <Card>
        <div className="flex justify-between p-6 border-bs flex-col md:flex-row gap-4">
          
          {/* Page Size */}
          <CustomTextField
            select
            value={table.getState().pagination.pageSize}
            onChange={e => table.setPageSize(Number(e.target.value))}
          >
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={25}>25</MenuItem>
            <MenuItem value={50}>50</MenuItem>
          </CustomTextField>

          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <DebouncedInput
              value={globalFilter ?? ''}
              onChange={v => setGlobalFilter(String(v))}
              placeholder="Search Leave Policies"
            />

            {/* Export */}
            <ExportButton filteredData={filteredRows} />

            {/* Add Button */}
            <Button variant="contained" startIcon={<i className="tabler-plus" />} onClick={() => setAddDrawerOpen(true)}>
              Add Leave Policy
            </Button>
          </div>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className={tableStyles.table}>
            <thead>
              {table.getHeaderGroups().map(group => (
                <tr key={group.id}>
                  {group.headers.map(header => (
                    <th
                      key={header.id}
                      onClick={header.column.getToggleSortingHandler()}
                      style={{
                        cursor: header.column.getCanSort() ? 'pointer' : 'default'
                      }}
                    >
                      <div className="flex items-center gap-1">
                        {flexRender(header.column.columnDef.header, header.getContext())}

                        {/* Sorting arrows */}
                        {{
                          asc: '▲',
                          desc: '▼'
                        }[header.column.getIsSorted()] || ''}
                      </div>
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
                  <td colSpan={columns.length} className="text-center py-4">
                    No records available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <TablePagination
          component={() => <TablePaginationComponent table={table} />}
          count={filteredRows.length}
          rowsPerPage={table.getState().pagination.pageSize}
          page={table.getState().pagination.pageIndex}
          onPageChange={(_, p) => table.setPageIndex(p)}
        />
      </Card>

      {/* DRAWERS */}
      <AddDepartmentDrawer open={addDrawerOpen} handleClose={async () => { setAddDrawerOpen(false); await refreshShifts() }} setData={setData} />

      <ViewDepartment open={viewOpen} handleClose={async () => { setViewOpen(false); await refreshShifts() }} departmentData={selectedShift} />

      <EditDepartment open={editOpen} selectedDepartment={selectedShift} onSave={handleUpdate} handleClose={async () => { setEditOpen(false); await refreshShifts() }} />
    </>
  )
}

export default DepartmentListTable





