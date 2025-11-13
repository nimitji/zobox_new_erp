


// 'use client'

// import { useEffect, useState, useMemo } from 'react'
// import Link from 'next/link'
// import { useParams } from 'next/navigation'

// // MUI
// import {
//   Card,
//   Button,
//   Typography,
//   Chip,
//   Checkbox,
//   IconButton,
//   TablePagination,
//   MenuItem
// } from '@mui/material'
// import { styled } from '@mui/material/styles'

// // Third-party
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

// // Components
// import AddUserDrawer from './AddUserDrawer'
// import OptionMenu from '@core/components/option-menu'
// import TablePaginationComponent from '@components/TablePaginationComponent'
// import CustomTextField from '@core/components/mui/TextField'
// import CustomAvatar from '@core/components/mui/Avatar'
// import ExportButton from '../../../../../@menu/components/tables/ExportButton'


// // Utils
// import { getInitials } from '@/utils/getInitials'
// import { getLocalizedUrl } from '@/utils/i18n'
// import tableStyles from '@core/styles/table.module.css'

// // Styled
// const Icon = styled('i')({})

// // ====== Helpers ======

// const fuzzyFilter = (row, columnId, value, addMeta) => {
//   const itemRank = rankItem(row.getValue(columnId), value)
//   addMeta({ itemRank })
//   return itemRank.passed
// }

// const DebouncedInput = ({ value: initialValue, onChange, debounce = 500, ...props }) => {
//   const [value, setValue] = useState(initialValue)
//   useEffect(() => setValue(initialValue), [initialValue])
//   useEffect(() => {
//     const timeout = setTimeout(() => onChange(value), debounce)
//     return () => clearTimeout(timeout)
//   }, [value, debounce, onChange])
//   return <CustomTextField {...props} value={value} onChange={e => setValue(e.target.value)} />
// }

// const userStatusObj = {
//   Active: 'success',
//   active: 'success',
//   Pending: 'warning',
//   pending: 'warning',
//   Inactive: 'secondary',
//   inactive: 'secondary'
// }

// const columnHelper = createColumnHelper()

// // ====== Component ======

// const UserListTable = ({ tableData = [] }) => {
//   const [addUserOpen, setAddUserOpen] = useState(false)
//   const [rowSelection, setRowSelection] = useState({})
//   const [data, setData] = useState(Array.isArray(tableData) ? tableData : [])
//   const [filteredData, setFilteredData] = useState(data)
//   const [globalFilter, setGlobalFilter] = useState('')
//   const { lang: locale } = useParams()

//   // ====== Avatar Helper ======
//   const getAvatar = ({ avatar, fullName }) => {
//     const fallback = 'https://storage.googleapis.com/zobizproductphotos/banners/user.png'
//     const src = avatar || fallback
//     return <CustomAvatar src={src} size={34} alt={fullName || 'User'} />
//   }

//   // ====== Columns ======
//   const columns = useMemo(() => [
//     {
//       id: 'select',
//       header: ({ table }) => (
//         <Checkbox
//           checked={table.getIsAllRowsSelected()}
//           indeterminate={table.getIsSomeRowsSelected()}
//           onChange={table.getToggleAllRowsSelectedHandler()}
//         />
//       ),
//       cell: ({ row }) => (
//         <Checkbox
//           checked={row.getIsSelected()}
//           disabled={!row.getCanSelect()}
//           indeterminate={row.getIsSomeSelected()}
//           onChange={row.getToggleSelectedHandler()}
//         />
//       )
//     },
//     columnHelper.accessor('fullName', {
//       header: 'Employee Name',
//       cell: ({ row }) => {
//         const photoUrl =
//           Array.isArray(row?.original?.Photo) && row.original.Photo.length > 0
//             ? row.original.Photo[0]
//             : 'https://storage.googleapis.com/zobizproductphotos/banners/user.png'

//         const fullName = row?.original?.EMPLOYEENAME || '—'
//         const empId = row?.original?.EMPLOYEEID || ''

//         return (
//           <div className='flex items-center gap-4'>
//             {getAvatar({ avatar: photoUrl, fullName })}
//             <div className='flex flex-col'>
//               <Typography color='text.primary' className='font-medium'>
//                 {fullName}
//               </Typography>
//               <Typography variant='body2'>{empId}</Typography>
//             </div>
//           </div>
//         )
//       }
//     }),
//     columnHelper.accessor('contact', {
//       header: 'Contact',
//       cell: ({ row }) => {
//         const email = row?.original?.EMAILID || '—'
//         const mobile = row?.original?.MOBILENUMBER || '—'
//         return (
//           <div className='flex flex-col'>
//             <Typography color='text.primary' className='font-medium'>{email}</Typography>
//             <Typography variant='body2'>{mobile}</Typography>
//           </div>
//         )
//       }
//     }),
//     columnHelper.accessor('department', {
//       header: 'Department',
//       cell: ({ row }) => (
//         <Typography className='capitalize' color='text.primary'>
//           {row?.original?.DEPARTMENT || '—'}
//         </Typography>
//       )
//     }),
//     columnHelper.accessor('designation', {
//       header: 'Designation',
//       cell: ({ row }) => (
//         <Typography className='capitalize' color='text.primary'>
//           {row?.original?.DESIGNATION || '—'}
//         </Typography>
//       )
//     }),
//     columnHelper.accessor('status', {
//       header: 'Status',
//       cell: ({ row }) => {
//         const status = row?.original?.status || 'Inactive'
//         const chipColor = userStatusObj[status] || 'secondary'
//         return (
//           <Chip
//             variant='tonal'
//             label={status}
//             size='small'
//             color={chipColor}
//             className='capitalize'
//           />
//         )
//       }
//     }),

//     columnHelper.accessor(
//   row => {
//     // Parse actual date value for internal sorting
//     const dateStr = row?.DATEOFJOINING
//     if (!dateStr) return null

//     // Support both DD-MM-YYYY or YYYY-MM-DD formats
//     const parts = dateStr.split('-')
//     const date =
//       parts[2]?.length === 4
//         ? new Date(parts[2], parts[1] - 1, parts[0]) // DD-MM-YYYY
//         : new Date(dateStr) // ISO or other format fallback

//     return isNaN(date.getTime()) ? null : date
//   },
//   {
//     id: 'dateOfJoining',
//     header: 'Joined',
//     enableSorting: true,
//     sortingFn: 'datetime',
//     cell: ({ getValue }) => {
//       const value = getValue()
//       const formattedDate = value
//         ? value.toLocaleDateString('en-GB', {
//             day: '2-digit',
//             month: 'short',
//             year: 'numeric'
//           })
//         : '—'

//       return (
//         <Typography color='text.primary' className='capitalize'>
//           {formattedDate}
//         </Typography>
//       )
//     }
//   }
// ),

//     columnHelper.accessor('action', {
//       header: 'Action',
//       enableSorting: false,
//       cell: ({ row }) => (
//         <div className='flex items-center'>
//           {/* <IconButton onClick={() => setData(data.filter(emp => emp._id !== row.original._id))}>
//             <i className='tabler-trash text-textSecondary' />
//           </IconButton> */}
//           {/* <IconButton>
//             <Link href={getLocalizedUrl(`/apps/user/view`, locale)} className='flex'>
//               <i className='tabler-eye text-textSecondary' />
//             </Link>
//           </IconButton> */}
//           <IconButton
//   onClick={() => {
//     localStorage.setItem('selectedUser', JSON.stringify(row.original))
//     window.location.href = getLocalizedUrl(`/apps/hrManagement/employees/view?_id=${row.original._id}`, locale)
//   }}
// >
//   <i className='tabler-eye text-textSecondary' />
// </IconButton>


//                 {/* <IconButton>
//             <Link href={getLocalizedUrl(`/apps/hrManagement/employees/edit?_id=${row.original._id}`, locale)} className='flex'>
//               <i className='tabler-edit' />
//             </Link>
//           </IconButton> */}
//           <IconButton
//   onClick={() => {
//     localStorage.setItem('selectedUser', JSON.stringify(row.original))

//     setTimeout(() => {
//       window.location.href = getLocalizedUrl(
//         `/apps/hrManagement/employees/edit?_id=${row.original._id}`,
//         locale
//       )
//     }, 10)
//   }}
// >
//   <i className='tabler-edit text-textSecondary' />
// </IconButton>

     
//         </div>
//       )
//     })
//   ], [data, filteredData])

//   // ====== React Table Config ======
//   const table = useReactTable({
//     data: filteredData,
//     columns,
//     filterFns: { fuzzy: fuzzyFilter },
//     state: { rowSelection, globalFilter },
//     initialState: { pagination: { pageSize: 10 } },
//     enableRowSelection: true,
//     globalFilterFn: fuzzyFilter,
//     onRowSelectionChange: setRowSelection,
//     onGlobalFilterChange: setGlobalFilter,
//     getCoreRowModel: getCoreRowModel(),
//     getFilteredRowModel: getFilteredRowModel(),
//     getSortedRowModel: getSortedRowModel(),
//     getPaginationRowModel: getPaginationRowModel(),
//     getFacetedRowModel: getFacetedRowModel(),
//     getFacetedUniqueValues: getFacetedUniqueValues(),
//     getFacetedMinMaxValues: getFacetedMinMaxValues()
//   })
//   const filteredDatas = table.getFilteredRowModel().rows.map(row => row.original)
//   // ====== Render ======
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
//               placeholder='Search User'
//               className='max-sm:is-full'
//             />
//             {/* <Button color='secondary' variant='tonal' startIcon={<i className='tabler-upload' />}>
//               Export
//             </Button> */}
//             <ExportButton filteredData={filteredDatas} />
//             <Button
//               variant='contained'
//               startIcon={<i className='tabler-plus' />}
//               onClick={() => setAddUserOpen(true)}
//             >
//               Add New User
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
//                       {!header.isPlaceholder && (
//                         <div
//                           className={classnames({
//                             'flex items-center': header.column.getIsSorted(),
//                             'cursor-pointer select-none': header.column.getCanSort()
//                           })}
//                           onClick={header.column.getToggleSortingHandler()}
//                         >
//                           {flexRender(header.column.columnDef.header, header.getContext())}
//                           {{
//                             asc: <i className='tabler-chevron-up text-xl' />,
//                             desc: <i className='tabler-chevron-down text-xl' />
//                           }[header.column.getIsSorted()] ?? null}
//                         </div>
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
//                   .map(row => (
//                     <tr key={row.id} className={classnames({ selected: row.getIsSelected() })}>
//                       {row.getVisibleCells().map(cell => (
//                         <td key={cell.id}>
//                           {flexRender(cell.column.columnDef.cell, cell.getContext())}
//                         </td>
//                       ))}
//                     </tr>
//                   ))}
//               </tbody>
//             )}
//           </table>
//         </div>

//         <TablePagination
//           component={() => <TablePaginationComponent table={table} />}
//           count={table.getFilteredRowModel().rows.length}
//           rowsPerPage={table.getState().pagination.pageSize}
//           page={table.getState().pagination.pageIndex}
//           onPageChange={(_, page) => table.setPageIndex(page)}
//         />
//       </Card>

//       <AddUserDrawer
//         open={addUserOpen}
//         handleClose={() => setAddUserOpen(false)}
//         userData={data}
//         setData={setData}
//       />
//     </>
//   )
// }

// export default UserListTable

// 'use client'

// import { useEffect, useState, useMemo } from 'react'
// import Link from 'next/link'
// import { useParams } from 'next/navigation'

// // MUI Imports
// import {
//   Card,
//   Button,
//   Typography,
//   Chip,
//   Checkbox,
//   IconButton,
//   TablePagination,
//   MenuItem
// } from '@mui/material'

// import { styled } from '@mui/material/styles'

// // Third-party
// import classnames from 'classnames'
// import { fetchEmployeeData } from '@/app/server/actions'
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

// // Components
// import AddUserDrawer from './AddUserDrawer'
// import TablePaginationComponent from '@components/TablePaginationComponent'
// import CustomTextField from '@core/components/mui/TextField'
// import CustomAvatar from '@core/components/mui/Avatar'
// import ExportButton from '../../../../../@menu/components/tables/ExportButton'

// // Utils
// import { getInitials } from '@/utils/getInitials'
// import { getLocalizedUrl } from '@/utils/i18n'
// import tableStyles from '@core/styles/table.module.css'

// // Styled
// const Icon = styled('i')({})

// // === Helpers ===
// const fuzzyFilter = (row, columnId, value, addMeta) => {
//   const itemRank = rankItem(row.getValue(columnId), value)
//   addMeta({ itemRank })
//   return itemRank.passed
// }

// const DebouncedInput = ({ value: initialValue, onChange, debounce = 500, ...props }) => {
//   const [value, setValue] = useState(initialValue)
//   useEffect(() => setValue(initialValue), [initialValue])

//   useEffect(() => {
//     const timeout = setTimeout(() => onChange(value), debounce)
//     return () => clearTimeout(timeout)
//   }, [value])

//   return <CustomTextField {...props} value={value} onChange={e => setValue(e.target.value)} />
// }

// const userStatusObj = {
//   Active: 'success',
//   active: 'success',
//   Pending: 'warning',
//   pending: 'warning',
//   Inactive: 'secondary',
//   inactive: 'secondary'
// }

// const columnHelper = createColumnHelper()

// // ===== Component =====

// const UserListTable = ({ tableData = [] }) => {
//   const [addUserOpen, setAddUserOpen] = useState(false)
//   const [rowSelection, setRowSelection] = useState({})
//   const [data, setData] = useState(Array.isArray(tableData) ? tableData : [])
//   const [filteredData, setFilteredData] = useState(data)
//   const [globalFilter, setGlobalFilter] = useState('')

//   const { lang: locale } = useParams()

//   // ===============================
//   // ⭐⭐⭐ Auto Refresh Function ⭐⭐⭐
//   // ===============================
//   const refreshUsers = async () => {
//     try {
// const json = await fetchEmployeeData()      
// // const json = await res.json()
//       setData(json)
//       setFilteredData(json)
//     } catch (err) {
//       console.error("User refresh error:", err)
//     }
//   }

//   // Avatar helper
//   const getAvatar = ({ avatar, fullName }) => {
//     const fallback = 'https://storage.googleapis.com/zobizproductphotos/banners/user.png'
//     const src = avatar || fallback
//     return <CustomAvatar src={src} size={34} alt={fullName || 'User'} />
//   }

//   const columns = useMemo(
//     () => [
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
//       columnHelper.accessor('fullName', {
//         header: 'Employee Name',
//         cell: ({ row }) => {
//           const photoUrl =
//             Array.isArray(row.original?.Photo) && row.original.Photo.length > 0
//               ? row.original.Photo[0]
//               : 'https://storage.googleapis.com/zobizproductphotos/banners/user.png'

//           const fullName = row.original?.EMPLOYEENAME || '—'
//           const empId = row.original?.EMPLOYEEID || ''

//           return (
//             <div className='flex items-center gap-4'>
//               {getAvatar({ avatar: photoUrl, fullName })}
//               <div className='flex flex-col'>
//                 <Typography color='text.primary' className='font-medium'>
//                   {fullName}
//                 </Typography>
//                 <Typography variant='body2'>{empId}</Typography>
//               </div>
//             </div>
//           )
//         }
//       }),

//       columnHelper.accessor('contact', {
//         header: 'Contact',
//         cell: ({ row }) => {
//           const email = row.original?.EMAILID || '—'
//           const mobile = row.original?.MOBILENUMBER || '—'
//           return (
//             <div className='flex flex-col'>
//               <Typography color='text.primary'>{email}</Typography>
//               <Typography variant='body2'>{mobile}</Typography>
//             </div>
//           )
//         }
//       }),

//       columnHelper.accessor('department', {
//         header: 'Department',
//         cell: ({ row }) => (
//           <Typography className='capitalize' color='text.primary'>
//             {row.original?.DEPARTMENT || '—'}
//           </Typography>
//         )
//       }),

//       columnHelper.accessor('designation', {
//         header: 'Designation',
//         cell: ({ row }) => (
//           <Typography className='capitalize' color='text.primary'>
//             {row.original?.DESIGNATION || '—'}
//           </Typography>
//         )
//       }),

//       columnHelper.accessor('status', {
//         header: 'Status',
//         cell: ({ row }) => {
//           const status = row.original?.status || 'Inactive'
//           const chipColor = userStatusObj[status] || 'secondary'
//           return (
//             <Chip
//               variant='tonal'
//               label={status}
//               size='small'
//               color={chipColor}
//               className='capitalize'
//             />
//           )
//         }
//       }),

//       // Date of Joining Sorting
//       columnHelper.accessor(
//         row => {
//           const dateStr = row.DATEOFJOINING
//           if (!dateStr) return null

//           const parts = dateStr.split('-')
//           const date =
//             parts[2]?.length === 4
//               ? new Date(parts[2], parts[1] - 1, parts[0])
//               : new Date(dateStr)

//           return isNaN(date.getTime()) ? null : date
//         },
//         {
//           id: 'dateOfJoining',
//           header: 'Joined',
//           enableSorting: true,
//           sortingFn: 'datetime',
//           cell: ({ getValue }) => {
//             const value = getValue()
//             const formattedDate = value
//               ? value.toLocaleDateString('en-GB', {
//                   day: '2-digit',
//                   month: 'short',
//                   year: 'numeric'
//                 })
//               : '—'
//             return <Typography color='text.primary'>{formattedDate}</Typography>
//           }
//         }
//       ),

//       // Action
//       columnHelper.accessor('action', {
//         header: 'Action',
//         enableSorting: false,
//         cell: ({ row }) => (
//           <div className='flex items-center'>

//             {/* View */}
//             <IconButton
//               onClick={() => {
//                 localStorage.setItem('selectedUser', JSON.stringify(row.original))
//                 window.location.href = getLocalizedUrl(
//                   `/apps/hrManagement/employees/view?_id=${row.original._id}`,
//                   locale
//                 )
//                 setTimeout(() => {
//                   refreshUsers()     // 🔥 Auto refresh after view/edit navigation
//                 }, 300)
//               }}
//             >
//               <i className='tabler-eye text-textSecondary' />
//             </IconButton>

//             {/* Edit */}
//             <IconButton
//               onClick={() => {
//                 localStorage.setItem('selectedUser', JSON.stringify(row.original))
//                 setTimeout(() => {
//                   window.location.href = getLocalizedUrl(
//                     `/apps/hrManagement/employees/edit?_id=${row.original._id}`,
//                     locale
//                   )
//                   refreshUsers()     // 🔥 Auto refresh after edit
//                 }, 10)
//               }}
//             >
//               <i className='tabler-edit text-textSecondary' />
//             </IconButton>
//           </div>
//         )
//       })
//     ],
//     [data]
//   )

//   const table = useReactTable({
//     data: filteredData,
//     columns,
//     filterFns: { fuzzy: fuzzyFilter },
//     state: { rowSelection, globalFilter },
//     initialState: { pagination: { pageSize: 10 } },
//     enableRowSelection: true,
//     globalFilterFn: fuzzyFilter,
//     onRowSelectionChange: setRowSelection,
//     onGlobalFilterChange: setGlobalFilter,
//     getCoreRowModel: getCoreRowModel(),
//     getFilteredRowModel: getFilteredRowModel(),
//     getSortedRowModel: getSortedRowModel(),
//     getPaginationRowModel: getPaginationRowModel(),
//     getFacetedRowModel: getFacetedRowModel(),
//     getFacetedUniqueValues: getFacetedUniqueValues(),
//     getFacetedMinMaxValues: getFacetedMinMaxValues()
//   })

//   const filteredDatas = table.getFilteredRowModel().rows.map(row => row.original)

//   return (
//     <>
//       <Card>

//         <div className='flex justify-between flex-col md:flex-row p-6 border-bs gap-4'>
//           <CustomTextField
//             select
//             value={table.getState().pagination.pageSize}
//             onChange={e => table.setPageSize(Number(e.target.value))}
//             className='sm:is-[70px]'
//           >
//             <MenuItem value='10'>10</MenuItem>
//             <MenuItem value='25'>25</MenuItem>
//             <MenuItem value='50'>50</MenuItem>
//           </CustomTextField>

//           <div className='flex flex-col sm:flex-row gap-4'>
//             <DebouncedInput
//               value={globalFilter ?? ''}
//               onChange={value => setGlobalFilter(String(value))}
//               placeholder='Search User'
//             />

//             <ExportButton filteredData={filteredDatas} />

//             <Button
//               variant='contained'
//               startIcon={<i className='tabler-plus' />}
//               onClick={() => setAddUserOpen(true)}
//             >
//               Add New User
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
//                       {!header.isPlaceholder && (
//                         <div
//                           className={classnames({
//                             'flex items-center': header.column.getIsSorted(),
//                             'cursor-pointer select-none': header.column.getCanSort()
//                           })}
//                           onClick={header.column.getToggleSortingHandler()}
//                         >
//                           {flexRender(header.column.columnDef.header, header.getContext())}
//                           {{
//                             asc: <i className='tabler-chevron-up text-xl' />,
//                             desc: <i className='tabler-chevron-down text-xl' />
//                           }[header.column.getIsSorted()] ?? null}
//                         </div>
//                       )}
//                     </th>
//                   ))}
//                 </tr>
//               ))}
//             </thead>

//             <tbody>
//               {table.getFilteredRowModel().rows.length === 0 ? (
//                 <tr>
//                   <td colSpan={table.getVisibleFlatColumns().length} className='text-center'>
//                     No data available
//                   </td>
//                 </tr>
//               ) : (
//                 table
//                   .getRowModel()
//                   .rows.slice(0, table.getState().pagination.pageSize)
//                   .map(row => (
//                     <tr key={row.id} className={classnames({ selected: row.getIsSelected() })}>
//                       {row.getVisibleCells().map(cell => (
//                         <td key={cell.id}>
//                           {flexRender(cell.column.columnDef.cell, cell.getContext())}
//                         </td>
//                       ))}
//                     </tr>
//                   ))
//               )}
//             </tbody>
//           </table>
//         </div>

//         <TablePagination
//           component={() => <TablePaginationComponent table={table} />}
//           count={table.getFilteredRowModel().rows.length}
//           rowsPerPage={table.getState().pagination.pageSize}
//           page={table.getState().pagination.pageIndex}
//           onPageChange={(_, page) => table.setPageIndex(page)}
//         />
//       </Card>

//       {/* ⭐ AUTO REFRESH added here */}
//       <AddUserDrawer
//         open={addUserOpen}
//         handleClose={() => {
//           setAddUserOpen(false)
//           refreshUsers()    // 🔥 Refresh after adding user
//         }}
//         userData={data}
//         setData={setData}
//         refreshUsers={refreshUsers}   // pass for internal refresh also
//       />
//     </>
//   )
// }

// export default UserListTable


'use client'

import { useEffect, useState, useMemo } from 'react'
import { useParams } from 'next/navigation'

// MUI Imports
import {
  Card,
  Button,
  Typography,
  Chip,
  Checkbox,
  IconButton,
  TablePagination,
  MenuItem
} from '@mui/material'

import { styled } from '@mui/material/styles'

// Third-party
import classnames from 'classnames'
import { fetchEmployeeData } from '@/app/server/actions'
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

// Components
import AddUserDrawer from './AddUserDrawer'
import TablePaginationComponent from '@components/TablePaginationComponent'
import CustomTextField from '@core/components/mui/TextField'
import CustomAvatar from '@core/components/mui/Avatar'
import ExportButton from '../../../../../@menu/components/tables/ExportButton'

// Utils
import tableStyles from '@core/styles/table.module.css'
import { getLocalizedUrl } from '@/utils/i18n'

// Styled
const Icon = styled('i')({})

// === Helpers ===
const fuzzyFilter = (row, columnId, value, addMeta) => {
  const itemRank = rankItem(row.getValue(columnId), value)
  addMeta({ itemRank })
  return itemRank.passed
}

// ⭐ FIXED VERSION — NO MORE WARNINGS
const DebouncedInput = ({ value: initialValue, onChange, debounce = 500, ...props }) => {
  const [value, setValue] = useState(initialValue)

  useEffect(() => setValue(initialValue), [initialValue])

  useEffect(() => {
    const timeout = setTimeout(() => onChange(value), debounce)
    return () => clearTimeout(timeout)
  }, [value, onChange, debounce]) // ⭐ FIXED DEPENDENCIES

  return <CustomTextField {...props} value={value} onChange={e => setValue(e.target.value)} />
}

const userStatusObj = {
  Active: 'success',
  active: 'success',
  Pending: 'warning',
  pending: 'warning',
  Inactive: 'secondary',
  inactive: 'secondary'
}

const columnHelper = createColumnHelper()

// ===== Component =====

const UserListTable = ({ tableData = [] }) => {
  const [addUserOpen, setAddUserOpen] = useState(false)
  const [rowSelection, setRowSelection] = useState({})
  const [data, setData] = useState(Array.isArray(tableData) ? tableData : [])
  const [filteredData, setFilteredData] = useState(data)
  const [globalFilter, setGlobalFilter] = useState('')

  const { lang: locale } = useParams()

  // ===============================
  // ⭐⭐⭐ Auto Refresh Function ⭐⭐⭐
  // ===============================
  const refreshUsers = async () => {
    try {
      const json = await fetchEmployeeData()
      setData(json)
      setFilteredData(json)
    } catch (err) {
      console.error("User refresh error:", err)
    }
  }

  // Avatar helper
  const getAvatar = ({ avatar, fullName }) => {
    const fallback = 'https://storage.googleapis.com/zobizproductphotos/banners/user.png'
    const src = avatar || fallback
    return <CustomAvatar src={src} size={34} alt={fullName || 'User'} />
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
      columnHelper.accessor('fullName', {
        header: 'Employee Name',
        cell: ({ row }) => {
          const photoUrl =
            Array.isArray(row.original?.Photo) && row.original.Photo.length > 0
              ? row.original.Photo[0]
              : 'https://storage.googleapis.com/zobizproductphotos/banners/user.png'

          const fullName = row.original?.EMPLOYEENAME || '—'
          const empId = row.original?.EMPLOYEEID || ''

          return (
            <div className='flex items-center gap-4'>
              {getAvatar({ avatar: photoUrl, fullName })}
              <div className='flex flex-col'>
                <Typography color='text.primary' className='font-medium'>
                  {fullName}
                </Typography>
                <Typography variant='body2'>{empId}</Typography>
              </div>
            </div>
          )
        }
      }),

      columnHelper.accessor('contact', {
        header: 'Contact',
        cell: ({ row }) => {
          const email = row.original?.EMAILID || '—'
          const mobile = row.original?.MOBILENUMBER || '—'
          return (
            <div className='flex flex-col'>
              <Typography color='text.primary'>{email}</Typography>
              <Typography variant='body2'>{mobile}</Typography>
            </div>
          )
        }
      }),

      columnHelper.accessor('department', {
        header: 'Department',
        cell: ({ row }) => (
          <Typography className='capitalize' color='text.primary'>
            {row.original?.DEPARTMENT || '—'}
          </Typography>
        )
      }),

      columnHelper.accessor('designation', {
        header: 'Designation',
        cell: ({ row }) => (
          <Typography className='capitalize' color='text.primary'>
            {row.original?.DESIGNATION || '—'}
          </Typography>
        )
      }),

      columnHelper.accessor('status', {
        header: 'Status',
        cell: ({ row }) => {
          const status = row.original?.status || 'Inactive'
          const chipColor = userStatusObj[status] || 'secondary'
          return (
            <Chip
              variant='tonal'
              label={status}
              size='small'
              color={chipColor}
              className='capitalize'
            />
          )
        }
      }),

      // Date of joining sorting
      columnHelper.accessor(
        row => {
          const dateStr = row.DATEOFJOINING
          if (!dateStr) return null

          const parts = dateStr.split('-')
          const date =
            parts[2]?.length === 4
              ? new Date(parts[2], parts[1] - 1, parts[0])
              : new Date(dateStr)

          return isNaN(date.getTime()) ? null : date
        },
        {
          id: 'dateOfJoining',
          header: 'Joined',
          enableSorting: true,
          sortingFn: 'datetime',
          cell: ({ getValue }) => {
            const value = getValue()
            const formattedDate = value
              ? value.toLocaleDateString('en-GB', {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric'
                })
              : '—'
            return <Typography color='text.primary'>{formattedDate}</Typography>
          }
        }
      ),

      // Action
      columnHelper.accessor('action', {
        header: 'Action',
        enableSorting: false,
        cell: ({ row }) => (
          <div className='flex items-center'>
            {/* View */}
            <IconButton
              onClick={() => {
                localStorage.setItem('selectedUser', JSON.stringify(row.original))
                window.location.href = getLocalizedUrl(
                  `/apps/hrManagement/employees/view?_id=${row.original._id}`,
                  locale
                )
                setTimeout(() => refreshUsers(), 300)
              }}
            >
              <i className='tabler-eye text-textSecondary' />
            </IconButton>

            {/* Edit */}
            <IconButton
              onClick={() => {
                localStorage.setItem('selectedUser', JSON.stringify(row.original))
                setTimeout(() => {
                  window.location.href = getLocalizedUrl(
                    `/apps/hrManagement/employees/edit?_id=${row.original._id}`,
                    locale
                  )
                  refreshUsers()
                }, 10)
              }}
            >
              <i className='tabler-edit text-textSecondary' />
            </IconButton>
          </div>
        )
      })
    ],
    [data]
  )

  const table = useReactTable({
    data: filteredData,
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
              onChange={value => setGlobalFilter(String(value))}
              placeholder='Search User'
            />

            <ExportButton filteredData={filteredDatas} />

            <Button
              variant='contained'
              startIcon={<i className='tabler-plus' />}
              onClick={() => setAddUserOpen(true)}
            >
              Add New User
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
                          }[
                            header.column.getIsSorted()
                          ] ?? null}
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

      <AddUserDrawer
        open={addUserOpen}
        handleClose={() => {
          setAddUserOpen(false)
          refreshUsers()    // 🔥 Refresh after adding user
        }}
        userData={data}
        setData={setData}
        refreshUsers={refreshUsers}
      />
    </>
  )
}

export default UserListTable







