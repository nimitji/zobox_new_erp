

// 'use client'

// import { useEffect, useState, useMemo } from 'react'
// import { useSession } from 'next-auth/react'
// import { useParams } from 'next/navigation'

// // 📦 MUI Imports
// import Card from '@mui/material/Card'
// import Button from '@mui/material/Button'
// import Typography from '@mui/material/Typography'
// import Chip from '@mui/material/Chip'
// import IconButton from '@mui/material/IconButton'
// import MenuItem from '@mui/material/MenuItem'
// import TablePagination from '@mui/material/TablePagination'
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
// import { fetchAttendanceRegularizations, updateAttendanceRegularization } from '../../../../app/server/actions'

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

// // 🧱 Helpers
// const Icon = styled('i')({})
// const columnHelper = createColumnHelper()

// const statusColor = {
//   Approved: 'success',
//   Rejected: 'error',
//   Pending: 'warning',
//   Cancelled: 'secondary'
// }

// // 🔍 Fuzzy Filter
// const fuzzyFilter = (row, columnId, value, addMeta) => {
//   const itemRank = rankItem(row.getValue(columnId), value)
//   addMeta({ itemRank })
//   return itemRank.passed
// }

// // 🕐 Debounced Search Input
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
//   const { data: session } = useSession() // ✅ access NextAuth session
//   const [data, setData] = useState(tableData || [])
//   const [addDrawerOpen, setAddDrawerOpen] = useState(false)
//   const [viewOpen, setViewOpen] = useState(false)
//   const [editOpen, setEditOpen] = useState(false)
//   const [selectedShift, setSelectedShift] = useState(null)
//   const [globalFilter, setGlobalFilter] = useState('')

//   // ✅ Fetch attendance regularizations from backend using session token
//   const fetchData = async (token) => {
//     try {
//       const res = await fetchAttendanceRegularizations(token)
//       setData(res)
//       console.log('✅ Attendance Regularizations fetched successfully:', res)
//     } catch (error) {
//       console.error('❌ Error fetching attendance data:', error)
//     }
//   }

//   // ✅ Initial Load
//   useEffect(() => {
//     const token = session?.user?.accessToken
//     if (token) fetchData(token)
//   }, [session])

//   // ✅ Refresh data (called after edits)
//   const refreshShifts = async () => {
//     const token = session?.user?.accessToken
//     if (!token) return console.warn('⚠️ Token missing on refresh.')
//     await fetchData(token)
//   }

//   const handleEdit = (shift) => {
//     setSelectedShift(shift)
//     setEditOpen(true)
//   }

//   // const handleUpdate = async (updatedData) => {
//   //   try {
//   //     const response = await updateAttendanceRegularization(updatedData)
//   //     await refreshShifts()
//   //     return response
//   //   } catch (err) {
//   //     console.error('Error updating shift:', err)
//   //   }
//   // }

//   // 🧾 Table Columns
  
//   const handleUpdate = async (updatedData) => {
//   try {
//     const token = session?.user?.accessToken // ✅ get token from NextAuth session
//     if (!token) {
//       console.warn('⚠️ No token found — cannot update regularization.')
//       return { success: false, message: 'Missing auth token' }
//     }

//     // ✅ Pass both payload + token to the server action
//     const response = await updateAttendanceRegularization(updatedData, token)

//     await refreshShifts()
//     return response
//   } catch (err) {
//     console.error('❌ Error updating regularization:', err)
//   }
// }

  
  
//   const columns = useMemo(
//     () => [
//       columnHelper.accessor('serialNo', {
//         header: '#',
//         cell: ({ row }) => <Typography>{row.original.serialNo}</Typography>
//       }),
//       columnHelper.accessor('employee', {
//         header: 'Employee',
//         cell: ({ row }) => (
//           <Typography fontWeight={500}>{row.original.employee}</Typography>
//         )
//       }),
//       columnHelper.accessor('date', {
//         header: 'Date',
//         cell: ({ row }) => <Typography>{row.original.date}</Typography>
//       }),
//       // columnHelper.display({
//       //   id: 'originalTimes',
//       //   header: 'Original Times',
//       //   cell: ({ row }) => (
//       //     <div>
//       //       <Typography color="error">In: {row.original.originalClockIn}</Typography>
//       //       <Typography color="error">Out: {row.original.originalClockOut}</Typography>
//       //     </div>
//       //   )
//       // }),
//       columnHelper.display({
//   id: 'originalTimes',
//   header: 'Original Times',
//   cell: ({ row }) => (
//     <div>
//       <Typography sx={{ color: 'error.main', fontWeight: 500 }}>
//         In: {row.original.originalClockIn}
//       </Typography>
//       <Typography sx={{ color: 'error.main', fontWeight: 500 }}>
//         Out: {row.original.originalClockOut}
//       </Typography>
//     </div>
//   )
// }),

      
//       columnHelper.display({
//         id: 'requestedTimes',
//         header: 'Requested Times',
//         cell: ({ row }) => (
//           <div>
//             <Typography color="success.main">In: {row.original.requestedClockIn}</Typography>
//             <Typography color="success.main">Out: {row.original.requestedClockOut}</Typography>
//           </div>
//         )
//       }),
//       columnHelper.accessor('reason', {
//         header: 'Reason',
//         cell: ({ row }) => (
//           <Typography sx={{ maxWidth: 200 }} noWrap>
//             {row.original.reason}
//           </Typography>
//         )
//       }),
//       columnHelper.accessor('status', {
//         header: 'Status',
//         cell: ({ row }) => (
//           <Chip
//             label={row.original.status?.toLowerCase() || 'pending'}
//             color={statusColor[row.original.status] || 'warning'}
//             variant="tonal"
//             size="small"
//           />
//         )
//       }),
//       columnHelper.accessor('requestedOn', {
//         header: 'Requested On',
//         cell: ({ row }) => <Typography>{row.original.requestedOn}</Typography>
//       }),
//       columnHelper.display({
//         id: 'actions',
//         header: 'Actions',
//         cell: ({ row }) => (
//           <div className="flex items-center gap-2">
//             <IconButton onClick={() => { setSelectedShift(row.original); setViewOpen(true) }}>
//               <i className="tabler-eye text" />
//             </IconButton>
//             <IconButton onClick={() => handleEdit(row.original)}>
//               <i className="tabler-edit text" />
//             </IconButton>
//           </div>
//         )
//       })
//     ],
//     []
//   )

//   // 🧩 React Table Setup
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
//         {/* Header */}
//         <div className="flex justify-between flex-col md:flex-row items-start md:items-center p-6 border-bs gap-4">
//           <CustomTextField
//             select
//             value={table.getState().pagination.pageSize}
//             onChange={e => table.setPageSize(Number(e.target.value))}
//             className="max-sm:is-full sm:is-[70px]"
//           >
//             <MenuItem value="10">10</MenuItem>
//             <MenuItem value="25">25</MenuItem>
//             <MenuItem value="50">50</MenuItem>
//           </CustomTextField>

//           <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
//             <DebouncedInput
//               value={globalFilter ?? ''}
//               onChange={v => setGlobalFilter(String(v))}
//               placeholder="Search Attendance Regularization"
//               className="max-sm:is-full"
//             />
//             <ExportButton filteredData={filteredRows} />
//             <Button
//               variant="contained"
//               startIcon={<i className="tabler-plus" />}
//               onClick={() => setAddDrawerOpen(true)}
//               className="max-sm:is-full"
//             >
//               Add Attendance Regularization
//             </Button>
//           </div>
//         </div>

//         {/* Data Table */}
//         <div className="overflow-x-auto">
//           <table className={tableStyles.table}>
//             <thead>
//               {table.getHeaderGroups().map(headerGroup => (
//                 <tr key={headerGroup.id}>
//                   {headerGroup.headers.map(header => (
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

//         {/* Pagination */}
//         <TablePagination
//           component={() => <TablePaginationComponent table={table} />}
//           count={table.getFilteredRowModel().rows.length}
//           rowsPerPage={table.getState().pagination.pageSize}
//           page={table.getState().pagination.pageIndex}
//           onPageChange={(_, page) => table.setPageIndex(page)}
//         />
//       </Card>

//       {/* Drawers */}
//       <AddDepartmentDrawer
//         open={addDrawerOpen}
//         handleClose={() => setAddDrawerOpen(false)}
//         userData={data}
//         setData={setData}
//         refreshDepartments={refreshShifts}
//       />

//       <ViewDepartment
//         open={viewOpen}
//         handleClose={() => setViewOpen(false)}
//         departmentData={selectedShift}
//       />

//       <EditDepartment
//         open={editOpen}
//         handleClose={() => setEditOpen(false)}
//         selectedDepartment={selectedShift}
//         onSave={handleUpdate}
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
import {
  fetchAttendanceRegularizations,
  updateAttendanceRegularization
} from '../../../../app/server/actions'

// 🧠 Table Utils
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel
} from '@tanstack/react-table'

// 🔍 Search
import { rankItem } from '@tanstack/match-sorter-utils'

// 🧱 Helpers
const Icon = styled('i')({})
const columnHelper = createColumnHelper()

const statusColor = {
  Approved: 'success',
  Rejected: 'error',
  Pending: 'warning',
  Cancelled: 'secondary'
}

// 🔍 Fuzzy Filter
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

  // 🔄 FETCH DATA WITH TOKEN
  const fetchData = async (token) => {
    try {
      const res = await fetchAttendanceRegularizations(token)
      setData(res)
    } catch (err) {
      console.error('❌ Error fetching:', err)
    }
  }

  // 🔄 INITIAL LOAD
  useEffect(() => {
    const token = session?.user?.accessToken
    if (token) fetchData(token)
  }, [session])

  // 🔁 REFRESH FUNCTION (used on drawer close)
  const refreshShifts = async () => {
    const token = session?.user?.accessToken
    if (!token) return
    await fetchData(token)
  }

  // ✏️ UPDATE HANDLER
  const handleUpdate = async (updatedData) => {
    try {
      const token = session?.user?.accessToken
      if (!token) return

      const res = await updateAttendanceRegularization(updatedData, token)
      await refreshShifts()
      return res
    } catch (err) {
      console.error('❌ Error updating regularization:', err)
    }
  }

  // 📊 COLUMNS
  const columns = useMemo(
    () => [
      columnHelper.accessor('serialNo', {
        header: '#',
        cell: ({ row }) => <Typography>{row.original.serialNo}</Typography>
      }),

      columnHelper.accessor('employee', {
        header: 'Employee',
        cell: ({ row }) => (
          <Typography fontWeight={600}>{row.original.employee}</Typography>
        )
      }),

      columnHelper.accessor('date', {
        header: 'Date',
        cell: ({ row }) => <Typography>{row.original.date}</Typography>
      }),

      columnHelper.display({
        id: 'originalTimes',
        header: 'Original Times',
        cell: ({ row }) => (
          <div>
            <Typography sx={{ color: 'error.main', fontWeight: 600 }}>
              In: {row.original.originalClockIn}
            </Typography>
            <Typography sx={{ color: 'error.main', fontWeight: 600 }}>
              Out: {row.original.originalClockOut}
            </Typography>
          </div>
        )
      }),

      columnHelper.display({
        id: 'requestedTimes',
        header: 'Requested Times',
        cell: ({ row }) => (
          <div>
            <Typography color="success.main">In: {row.original.requestedClockIn}</Typography>
            <Typography color="success.main">Out: {row.original.requestedClockOut}</Typography>
          </div>
        )
      }),

      columnHelper.accessor('reason', {
        header: 'Reason',
        cell: ({ row }) => (
          <Typography sx={{ maxWidth: 200 }} noWrap>
            {row.original.reason}
          </Typography>
        )
      }),

      columnHelper.accessor('status', {
        header: 'Status',
        cell: ({ row }) => (
          <Chip
            label={row.original.status}
            color={statusColor[row.original.status] || 'warning'}
            variant="tonal"
            size="small"
          />
        )
      }),

      columnHelper.accessor('requestedOn', {
        header: 'Requested On',
        cell: ({ row }) => <Typography>{row.original.requestedOn}</Typography>
      }),

      columnHelper.display({
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
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

  // 📊 TABLE INSTANCE
  const table = useReactTable({
    data,
    columns,
    state: { globalFilter },
    filterFns: { fuzzy: fuzzyFilter },
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
        <div className="flex justify-between p-6 border-bs flex-col md:flex-row gap-4">
          <CustomTextField
            select
            value={table.getState().pagination.pageSize}
            onChange={e => table.setPageSize(Number(e.target.value))}
            className="sm:is-[70px]"
          >
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={25}>25</MenuItem>
            <MenuItem value={50}>50</MenuItem>
          </CustomTextField>

          <div className="flex flex-col sm:flex-row gap-4">
            <DebouncedInput
              value={globalFilter ?? ''}
              onChange={v => setGlobalFilter(String(v))}
              placeholder="Search Attendance Regularization"
            />

            <ExportButton filteredData={filteredRows} />

            <Button
              variant="contained"
              startIcon={<i className="tabler-plus" />}
              onClick={() => setAddDrawerOpen(true)}
            >
              Add Attendance Regularization
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

      {/* ⭐ DRAWERS — AUTO REFRESH FIXED 100% */}

      <AddDepartmentDrawer
        open={addDrawerOpen}
        handleClose={async () => {
          setAddDrawerOpen(false)
          await refreshShifts()     // ⭐ FIX — Auto Refresh
        }}
        userData={data}
        setData={setData}
      />

      <ViewDepartment
        open={viewOpen}
        handleClose={async () => {
          setViewOpen(false)
          await refreshShifts()
        }}
        departmentData={selectedShift}
      />

      <EditDepartment
        open={editOpen}
        selectedDepartment={selectedShift}
        onSave={handleUpdate}
        handleClose={async () => {
          setEditOpen(false)
          await refreshShifts()
        }}
      />
    </>
  )
}

export default DepartmentListTable





