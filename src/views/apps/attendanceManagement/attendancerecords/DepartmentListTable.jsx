// 'use client'

// // React Imports
// import { useEffect, useState, useMemo } from 'react'
// import { useSession } from 'next-auth/react'

// // Next Imports
// import Link from 'next/link'
// import { useParams } from 'next/navigation'

// // MUI Imports
// import Card from '@mui/material/Card'
// import CardHeader from '@mui/material/CardHeader'
// import Button from '@mui/material/Button'
// import Typography from '@mui/material/Typography'
// import Chip from '@mui/material/Chip'
// import Checkbox from '@mui/material/Checkbox'
// import IconButton from '@mui/material/IconButton'
// import { styled } from '@mui/material/styles'
// import TablePagination from '@mui/material/TablePagination'
// import MenuItem from '@mui/material/MenuItem'
// import ViewDepartment from './ViewDepartment'
// import EditDepartment from './EditDepartment'
// import ExportButton from '../../../../@menu/components/tables/ExportButton'



// // Third-party Imports
// import classnames from 'classnames'
// import { rankItem } from '@tanstack/match-sorter-utils'
// import {
//   createColumnHelper,
//   flexRender,
//   getCoreRowModel,
//   useReactTable,
//   getFilteredRowModel,
//   getFacetedRowModel,
//   getFacetedUniqueValues,
//   getFacetedMinMaxValues,
//   getPaginationRowModel,
//   getSortedRowModel
// } from '@tanstack/react-table'

// // Component Imports
// import TableFilters from './TableFilters'
// import AddDepartmentDrawer from './AddDepartmentDrawer'
// import OptionMenu from '@core/components/option-menu'
// import TablePaginationComponent from '@components/TablePaginationComponent'
// import CustomTextField from '@core/components/mui/TextField'
// import CustomAvatar from '@core/components/mui/Avatar'

// // Util Imports
// import { getInitials } from '@/utils/getInitials'
// import { getLocalizedUrl } from '@/utils/i18n'
// import {editAttendanceRecord,fetchAttendanceRecords} from "../../../../app/server/actions"

// // Style Imports
// import tableStyles from '@core/styles/table.module.css'

// // Styled Components
// const Icon = styled('i')({})

// const fuzzyFilter = (row, columnId, value, addMeta) => {
//   // Rank the item
//   const itemRank = rankItem(row.getValue(columnId), value)

//   // Store the itemRank info
//   addMeta({
//     itemRank
//   })

//   // Return if the item should be filtered in/out
//   return itemRank.passed
// }

// const DebouncedInput = ({ value: initialValue, onChange, debounce = 500, ...props }) => {
//   // States
//   const [value, setValue] = useState(initialValue)

//   useEffect(() => {
//     setValue(initialValue)
//   }, [initialValue])
//   useEffect(() => {
//     const timeout = setTimeout(() => {
//       onChange(value)
//     }, debounce)

//     return () => clearTimeout(timeout)
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [value])

//   return <CustomTextField {...props} value={value} onChange={e => setValue(e.target.value)} />
// }

// // Vars
// const userRoleObj = {
//   admin: { icon: 'tabler-crown', color: 'error' },
//   author: { icon: 'tabler-device-desktop', color: 'warning' },
//   editor: { icon: 'tabler-edit', color: 'info' },
//   maintainer: { icon: 'tabler-chart-pie', color: 'success' },
//   subscriber: { icon: 'tabler-user', color: 'primary' }
// }

// const userStatusObj = {
//   active: 'success',
//   pending: 'warning',
//   inactive: 'secondary'
// }

// // Column Definitions
// const columnHelper = createColumnHelper()

// const DepartmentListTable = ({ tableData }) => {
//   console.log("AAJKADEBUG",tableData)
//    const { data: session } = useSession()
//     const [data, setData] = useState(tableData)
//   // States
//   const [addUserOpen, setAddUserOpen] = useState(false)
//   const [rowSelection, setRowSelection] = useState({})
//   // const [data, setData] = useState(...[tableData])
//   const [filteredData, setFilteredData] = useState(data)
//   const [globalFilter, setGlobalFilter] = useState('')

//   //changes pooja
//   const [selectedUser, setSelectedUser] = useState(null)
// const [viewOpen, setViewOpen] = useState(false)





// const [isEditOpen, setIsEditOpen] = useState(false)
// const [selectedDepartment, setSelectedDepartment] = useState(null)

// const handleEditClick = department => {
//   setSelectedDepartment(department)
//   setIsEditOpen(true)
// }

// // const handleUpdateBranch = updatedData => {
// //   console.log('Updated branch:', updatedData)
// //   editBranch(updatedData)
// // }

//   const refreshDepartments = async () => {
//     const res = await fetchAttendanceRecords()
//     setData(res)
//     setFilteredData(res)
//   }

// const handleUpdateDepartment = async updatedData => {
//   try {
//     console.log('Updated branch:', updatedData)
//     //editDepartment
//     const response = await editAttendanceRecord(updatedData)
//     await refreshDepartments()
//     return response
//   } catch (error) {
//     console.error('Error updating department:', error)
//   }
// }


//   // Hooks
//   const { lang: locale } = useParams()


// const columns = useMemo(
//   () => [

//           {
//         id: 'select',
//         header: ({ table }) => (
//           <Checkbox
//             {...{
//               checked: table.getIsAllRowsSelected(),
//               indeterminate: table.getIsSomeRowsSelected(),
//               onChange: table.getToggleAllRowsSelectedHandler()
//             }}
//           />
//         ),
//         cell: ({ row }) => (
//           <Checkbox
//             {...{
//               checked: row.getIsSelected(),
//               disabled: !row.getCanSelect(),
//               indeterminate: row.getIsSomeSelected(),
//               onChange: row.getToggleSelectedHandler()
//             }}
//           />
//         )
//       },
//     columnHelper.accessor('employee', {
//       header: 'Employee',
//         enableSorting: true,
//       cell: ({ row }) => (
//         <Typography color='text.primary' className='font-medium'>
//           {row.original.employee || '-'}
//         </Typography>
//       )
//     }),
//     columnHelper.accessor('date', {
//       header: 'Date',
//         enableSorting: true,
//       cell: ({ row }) => (
//         <Typography color='text.primary'>
//           {row.original.date || '-'}
//         </Typography>
//       )
//     }),
//     columnHelper.accessor('shiftName', {
//       header: 'Shift',
//         enableSorting: true,
//       cell: ({ row }) => (
//         <Typography color='text.primary'>
//           {row.original.shiftName || '-'}
//         </Typography>
//       )
//     }),
//     columnHelper.accessor('clockIn', {
//       header: 'Clock In',
//         enableSorting: true,
//       cell: ({ row }) => (
//         <Typography color='success.main' fontWeight={600}>
//           {row.original.clockIn || '-'}
//         </Typography>
//       )
//     }),
//     columnHelper.accessor('clockOut', {
//       header: 'Clock Out',
//         enableSorting: true,
//       cell: ({ row }) => (
//         <Typography color='error.main' fontWeight={600}>
//           {row.original.clockOut || '-'}
//         </Typography>
//       )
//     }),
//     columnHelper.accessor('employeeWorkingHours', {
//       header: 'Total Hours',
//         enableSorting: true,
//       cell: ({ row }) => (
//         <Typography color='text.primary'>
//           {row.original.employeeWorkingHours || '-'}
//         </Typography>
//       )
//     }),

  
//     columnHelper.accessor('status', {
//       header: 'Status',
//         enableSorting: true,
//       cell: ({ row }) => (
//         <Chip
//           variant='tonal'
//           label={row.original.status}
//           color={
//             row.original.status === 'Present'
//               ? 'success'
//               : row.original.status === 'Absent'
//               ? 'error'
//               : 'warning'
//           }
//           size='small'
//         />
//       )
//     }),
  
//     columnHelper.accessor('action', {
//       header: 'Actions',
//       enableSorting: true,
//       cell: ({ row }) => (
//         <div className='flex items-center'>
//           <IconButton
//             onClick={() => {
//               setSelectedDepartment(row.original)
//               setViewOpen(true)
//             }}
//           >
//             <i className='tabler-eye text-textSecondary' />
//           </IconButton>
//           <IconButton onClick={() => handleEditClick(row.original)}>
//             <i className='tabler-edit text-textSecondary' />
//           </IconButton>
//         </div>
//       )
//     })
//   ],
//   []
// )


//   const table = useReactTable({
//     data,
//     // data: filteredData,
//     columns,
//     filterFns: {
//       fuzzy: fuzzyFilter
//     },
//     state: {
//       rowSelection,
//       globalFilter
//     },
//     initialState: {
//       pagination: {
//         pageSize: 10
//       }
//     },
//     enableRowSelection: true, //enable row selection for all rows
//     // enableRowSelection: row => row.original.age > 18, // or enable row selection conditionally per row
//     globalFilterFn: fuzzyFilter,
//     onRowSelectionChange: setRowSelection,
//     getCoreRowModel: getCoreRowModel(),
//     onGlobalFilterChange: setGlobalFilter,
//     getFilteredRowModel: getFilteredRowModel(),
//     getSortedRowModel: getSortedRowModel(),
//     getPaginationRowModel: getPaginationRowModel(),
//     getFacetedRowModel: getFacetedRowModel(),
//     getFacetedUniqueValues: getFacetedUniqueValues(),
//     getFacetedMinMaxValues: getFacetedMinMaxValues()
//   })
//   const filteredDatas = table.getFilteredRowModel().rows.map(row => row.original)
//   const getAvatar = params => {
//     const { avatar, fullName } = params

//     if (avatar) {
//       return <CustomAvatar src={avatar} size={34} />
//     } else {
//       return <CustomAvatar size={34}>{getInitials(fullName)}</CustomAvatar>
//     }
//   }

//   return (
//     <>
//       <Card>
    
//         <div className='flex justify-between flex-col items-start md:flex-row md:items-center p-6 border-bs gap-4'>
//           <CustomTextField
//             select
//             value={table.getState().pagination.pageSize}
//             onChange={e => table.setPageSize(Number(e.target.value))}
//             className='max-sm:is-full sm:is-[70px]'
//           >
//             <MenuItem value='10'>10</MenuItem>
//             <MenuItem value='25'>25</MenuItem>
//             <MenuItem value='50'>50</MenuItem>
//           </CustomTextField>
//           <div className='flex flex-col sm:flex-row max-sm:is-full items-start sm:items-center gap-4'>
//             <DebouncedInput
//               value={globalFilter ?? ''}
//               onChange={value => setGlobalFilter(String(value))}
//               placeholder='Search Attendance Records'
//               className='max-sm:is-full'
//             />
          
//              <ExportButton filteredData={filteredDatas} />
//             <Button
//               variant='contained'
//               startIcon={<i className='tabler-plus' />}
//               onClick={() => setAddUserOpen(!addUserOpen)}
//               className='max-sm:is-full'
//             >
//               Add Attendance Records
//             </Button>
//           </div>
//         </div>
//         <div className='overflow-x-auto'>
//           <table className={tableStyles.table}>
//             <thead>
//               {table.getHeaderGroups().map(headerGroup => (
//                 <tr key={headerGroup.id}>
//                   {headerGroup.headers.map(header => (
//                     <th key={header.id}>
//                       {header.isPlaceholder ? null : (
//                         <>
//                           <div
//                             className={classnames({
//                               'flex items-center': header.column.getIsSorted(),
//                               'cursor-pointer select-none': header.column.getCanSort()
//                             })}
//                             onClick={header.column.getToggleSortingHandler()}
//                           >
//                             {flexRender(header.column.columnDef.header, header.getContext())}
//                             {{
//                               asc: <i className='tabler-chevron-up text-xl' />,
//                               desc: <i className='tabler-chevron-down text-xl' />
//                             }[header.column.getIsSorted()] ?? null}
//                           </div>
//                         </>
//                       )}
//                     </th>
//                   ))}
//                 </tr>
//               ))}
//             </thead>
//             {table.getFilteredRowModel().rows.length === 0 ? (
//               <tbody>
//                 <tr>
//                   <td colSpan={table.getVisibleFlatColumns().length} className='text-center'>
//                     No data available
//                   </td>
//                 </tr>
//               </tbody>
//             ) : (
//               <tbody>
//                 {table
//                   .getRowModel()
//                   .rows.slice(0, table.getState().pagination.pageSize)
//                   .map(row => {
//                     return (
//                       <tr key={row.id} className={classnames({ selected: row.getIsSelected() })}>
//                         {row.getVisibleCells().map(cell => (
//                           <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
//                         ))}
//                       </tr>
//                     )
//                   })}
//               </tbody>
//             )}
//           </table>
//         </div>
//         <TablePagination
//           component={() => <TablePaginationComponent table={table} />}
//           count={table.getFilteredRowModel().rows.length}
//           rowsPerPage={table.getState().pagination.pageSize}
//           page={table.getState().pagination.pageIndex}
//           onPageChange={(_, page) => {
//             table.setPageIndex(page)
//           }}
//         />
//       </Card>
//       <AddDepartmentDrawer
//         open={addUserOpen}
//         handleClose={() => setAddUserOpen(!addUserOpen)}
//         userData={data}
//         setData={setData}
//          refreshDepartments={refreshDepartments}
//       />


// <ViewDepartment
//   open={viewOpen}
//   handleClose={() => setViewOpen(false)}
//   departmentData={selectedDepartment}
// />

// <EditDepartment
//   open={isEditOpen}
//   handleClose={() => setIsEditOpen(false)}
//   selectedDepartment={selectedDepartment}
//   onSave={handleUpdateDepartment}
// />

//     </>
//   )
// }

// export default DepartmentListTable


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
import { editAttendanceRecord, fetchAttendanceRecords } from "../../../../app/server/actions"

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

  const handleEditClick = department => {
    setSelectedDepartment(department)
    setIsEditOpen(true)
  }

  // ⭐ FETCH with TOKEN
  const refreshDepartments = async () => {
    if (!token) return console.warn("⚠️ Token missing")
    const res = await fetchAttendanceRecords(token)
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

      const response = await editAttendanceRecord(updatedData, token)
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

      columnHelper.accessor('employee', {
        header: 'Employee',
        cell: ({ row }) => (
          <Typography color='text.primary' className='font-medium'>
            {row.original.employee || '-'}
          </Typography>
        )
      }),

      columnHelper.accessor('date', {
        header: 'Date',
        cell: ({ row }) => (
          <Typography color='text.primary'>
            {row.original.date || '-'}
          </Typography>
        )
      }),

      columnHelper.accessor('shiftName', {
        header: 'Shift',
        cell: ({ row }) => (
          <Typography color='text.primary'>
            {row.original.shiftName || '-'}
          </Typography>
        )
      }),

      columnHelper.accessor('clockIn', {
        header: 'Clock In',
        cell: ({ row }) => (
          <Typography color='success.main' fontWeight={600}>
            {row.original.clockIn || '-'}
          </Typography>
        )
      }),

      columnHelper.accessor('clockOut', {
        header: 'Clock Out',
        cell: ({ row }) => (
          <Typography color='error.main' fontWeight={600}>
            {row.original.clockOut || '-'}
          </Typography>
        )
      }),

      columnHelper.accessor('employeeWorkingHours', {
        header: 'Total Hours',
        cell: ({ row }) => (
          <Typography color='text.primary'>
            {row.original.employeeWorkingHours || '-'}
          </Typography>
        )
      }),

      columnHelper.accessor('status', {
        header: 'Status',
        cell: ({ row }) => (
          <Chip
            variant='tonal'
            label={row.original.status}
            color={
              row.original.status === 'Present'
                ? 'success'
                : row.original.status === 'Absent'
                ? 'error'
                : 'warning'
            }
            size='small'
          />
        )
      }),

      columnHelper.accessor('action', {
        header: 'Actions',
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
              placeholder='Search Attendance Records'
              className='max-sm:is-full'
            />

            <ExportButton filteredData={filteredDatas} />

            <Button
              variant='contained'
              startIcon={<i className='tabler-plus' />}
              onClick={() => setAddUserOpen(!addUserOpen)}
              className='max-sm:is-full'
            >
              Add Attendance Records
            </Button>
          </div>
        </div>

        {/* TABLE BODY */}
        <div className='overflow-x-auto'>
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
              {table.getFilteredRowModel().rows.length === 0 ? (
                <tr>
                  <td colSpan={table.getVisibleFlatColumns().length} className='text-center'>
                    No data available
                  </td>
                </tr>
              ) : (
                table.getRowModel().rows
                  .slice(0, table.getState().pagination.pageSize)
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



