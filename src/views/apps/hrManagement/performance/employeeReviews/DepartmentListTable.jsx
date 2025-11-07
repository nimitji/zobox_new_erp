
// // 'use client'

// // // React Imports
// // import { useEffect, useState, useMemo } from 'react'
// // import { useRouter } from 'next/navigation';
// // const router = useRouter();


// // // MUI Imports
// // import Card from '@mui/material/Card'
// // import Button from '@mui/material/Button'
// // import Typography from '@mui/material/Typography'
// // import Chip from '@mui/material/Chip'
// // import Checkbox from '@mui/material/Checkbox'
// // import IconButton from '@mui/material/IconButton'
// // import MenuItem from '@mui/material/MenuItem'
// // import TablePagination from '@mui/material/TablePagination'
// // import { styled } from '@mui/material/styles'

// // // Third-party Imports
// // import classnames from 'classnames'
// // import { rankItem } from '@tanstack/match-sorter-utils'
// // import {
// //   createColumnHelper,
// //   flexRender,
// //   getCoreRowModel,
// //   useReactTable,
// //   getFilteredRowModel,
// //   getFacetedRowModel,
// //   getFacetedUniqueValues,
// //   getFacetedMinMaxValues,
// //   getPaginationRowModel,
// //   getSortedRowModel
// // } from '@tanstack/react-table'

// // // 🧱 Custom Component Imports
// // import AddEmployeeGoalDrawer from './AddDepartmentDrawer'
// // import ViewEmployeeGoal from './ViewDepartment'
// // import EditDepartment from './EditDepartment'
// // import ExportButton from '../../../../../@menu/components/tables/ExportButton'
// // import TablePaginationComponent from '@components/TablePaginationComponent'
// // import CustomTextField from '@core/components/mui/TextField'

// // // 🧠 API Actions
// // import { fetchEmployeeReviewCycle, editEmployeeGoal } from '../../../../../app/server/actions'

// // // 🖼️ Styles
// // import tableStyles from '@core/styles/table.module.css'

// // // 🔧 Styled
// // const Icon = styled('i')({})

// // // 🔍 Fuzzy Search Filter
// // const fuzzyFilter = (row, columnId, value, addMeta) => {
// //   const itemRank = rankItem(row.getValue(columnId), value)
// //   addMeta({ itemRank })
// //   return itemRank.passed
// // }

// // // 🔁 Debounced Input for Search
// // const DebouncedInput = ({ value: initialValue, onChange, debounce = 500, ...props }) => {
// //   const [value, setValue] = useState(initialValue)
// //   useEffect(() => setValue(initialValue), [initialValue])
// //   useEffect(() => {
// //     const timeout = setTimeout(() => onChange(value), debounce)
// //     return () => clearTimeout(timeout)
// //   }, [value])
// //   return <CustomTextField {...props} value={value} onChange={e => setValue(e.target.value)} />
// // }

// // // 🔘 Status Chip Colors
// // const statusColorMap = {
// //   'Not Started': 'secondary',
// //   'In Progress': 'warning',
// //   Completed: 'success'
// // }

// // // 🧾 Column Helper
// // const columnHelper = createColumnHelper()

// // const DepartmentListTable = ({ tableData }) => {
// //   // States
// //   const [data, setData] = useState(tableData)
// //   const [addOpen, setAddOpen] = useState(false)
// //   const [viewOpen, setViewOpen] = useState(false)
// //   const [editOpen, setEditOpen] = useState(false)
// //   const [selectedGoal, setSelectedGoal] = useState(null)
// //   const [rowSelection, setRowSelection] = useState({})
// //   const [globalFilter, setGlobalFilter] = useState('')

// //   // 🔄 Fetch latest data
// //   const refreshGoals = async () => {
// //     const res = await fetchEmployeeReviewCycle()
// //     if (res?.data) setData(res.data)
// //   }

// //   // 📝 Handle Edit Save
// //   const handleUpdateGoal = async updatedData => {
// //     try {
// //       const response = await editEmployeeGoal(updatedData)
// //       await refreshGoals()
// //       return response
// //     } catch (error) {
// //       console.error('Error updating goal:', error)
// //     }
// //   }

// //   // 🧱 Columns
// //   const columns = useMemo(
// //     () => [
// //       {
// //         id: 'select',
// //         header: ({ table }) => (
// //           <Checkbox
// //             {...{
// //               checked: table.getIsAllRowsSelected(),
// //               indeterminate: table.getIsSomeRowsSelected(),
// //               onChange: table.getToggleAllRowsSelectedHandler()
// //             }}
// //           />
// //         ),
// //         cell: ({ row }) => (
// //           <Checkbox
// //             {...{
// //               checked: row.getIsSelected(),
// //               disabled: !row.getCanSelect(),
// //               indeterminate: row.getIsSomeSelected(),
// //               onChange: row.getToggleSelectedHandler()
// //             }}
// //           />
// //         )
// //       },


    
// //       columnHelper.accessor('employeeName', {
// //         header: 'Employee',
// //           enableSorting: true,
// //         cell: ({ row }) => (
// //           <Typography color='text.primary' className='font-medium'>
// //             {row.original.employeeName}
// //           </Typography>
// //         )
// //       }),

// //       columnHelper.accessor('reviewerName', {
// //         header: 'Reviewer',
// //           enableSorting: true,
// //         cell: ({ row }) => (
// //           <Typography color='text.primary' className='capitalize'>
// //             {row.original.reviewerName}
// //           </Typography>
// //         )
// //       }),

     

// //       columnHelper.accessor('reviewCycleName', {
// //         header: 'Review Cycle',
// //         enableSorting: true,
// //         cell: ({ row }) => (
// //           <Typography color='text.primary'>{row.original.reviewCycleName}</Typography>
// //         )
// //       }),

// //       columnHelper.accessor('reviewDate', {
// //         header: 'Review Date',
// //         enableSorting: true,
// //         cell: ({ row }) => (
// //           <Typography color='text.primary'>{row.original.reviewDate}</Typography>
// //         )
// //       }),
// //    columnHelper.accessor('rating', {
// //   header: 'Rating',
// //   enableSorting: true,
// //   cell: ({ row }) => {
// //     const rating = row.original.rating;
// //     return (
// //       <Typography color='text.primary'>
// //         {rating !== undefined && rating !== null && rating !== '' ? rating : '-'}
// //       </Typography>
// //     );
// //   }
// // }),

// //       columnHelper.accessor('status', {
// //         header: 'Status',
// //         enableSorting: true,
// //         cell: ({ row }) => (
// //           <Chip
// //             variant='tonal'
// //             label={row.original.status}
// //             size='small'
// //             color={statusColorMap[row.original.status] || 'default'}
// //             className='capitalize'
// //           />
// //         )
// //       }),

// //       columnHelper.accessor('createdAt', {
// //         header: 'Created At',
// //         enableSorting: true,
// //         cell: ({ row }) => {
// //           const formatted = new Date(row.original.createdAt).toLocaleDateString('en-GB', {
// //             day: '2-digit',
// //             month: 'short',
// //             year: 'numeric'
// //           })
// //           return <Typography color='text.primary'>{formatted}</Typography>
// //         }
// //       }),

// //       columnHelper.accessor('action', {
// //         header: 'Action',
// //         cell: ({ row }) => (
// //           <div className='flex items-center gap-2'>
// //             {/* <IconButton
// //               onClick={() => {
// //                 setSelectedGoal(row.original)
// //                 setViewOpen(true)
// //               }}
// //             >
// //               <i className='tabler-eye text-textSecondary' />
// //             </IconButton> */}
// //             <IconButton
// //   onClick={() => router.push(`/performance/employeeReviews/employeeReviewDetails/${row.original._id}`)}
// // >
// //   <i className='tabler-eye text-textSecondary' />
// // </IconButton>

// //             {/* <IconButton
// //               onClick={() => {
// //                 setSelectedGoal(row.original)
// //                 setEditOpen(true)
// //               }}
// //             >
// //               <i className='tabler-edit text-textSecondary' />
// //             </IconButton> */}
// //           </div>
// //         )
// //       })
// //     ],
// //     [data]
// //   )

// //   // 📊 Table Setup
// //   const table = useReactTable({
// //     data,
// //     columns,
// //     filterFns: { fuzzy: fuzzyFilter },
// //     state: { rowSelection, globalFilter },
// //     initialState: { pagination: { pageSize: 10 } },
// //     enableRowSelection: true,
// //     globalFilterFn: fuzzyFilter,
// //     onRowSelectionChange: setRowSelection,
// //     onGlobalFilterChange: setGlobalFilter,
// //     getCoreRowModel: getCoreRowModel(),
// //     getFilteredRowModel: getFilteredRowModel(),
// //     getSortedRowModel: getSortedRowModel(),
// //     getPaginationRowModel: getPaginationRowModel(),
// //     getFacetedRowModel: getFacetedRowModel(),
// //     getFacetedUniqueValues: getFacetedUniqueValues(),
// //     getFacetedMinMaxValues: getFacetedMinMaxValues()
// //   })

// //   const filteredRows = table.getFilteredRowModel().rows.map(r => r.original)

// //   // 🖥️ UI Render
// //   return (
// //     <>
// //       <Card>
// //         {/* Header */}
// //         <div className='flex justify-between flex-col items-start md:flex-row md:items-center p-6 border-bs gap-4'>
// //           <CustomTextField
// //             select
// //             value={table.getState().pagination.pageSize}
// //             onChange={e => table.setPageSize(Number(e.target.value))}
// //             className='max-sm:is-full sm:is-[70px]'
// //           >
// //             <MenuItem value='10'>10</MenuItem>
// //             <MenuItem value='25'>25</MenuItem>
// //             <MenuItem value='50'>50</MenuItem>
// //           </CustomTextField>

// //           <div className='flex flex-col sm:flex-row max-sm:is-full items-start sm:items-center gap-4'>
// //             <DebouncedInput
// //               value={globalFilter ?? ''}
// //               onChange={value => setGlobalFilter(String(value))}
// //               placeholder='Search Employee Review Cycle'
// //               className='max-sm:is-full'
// //             />

// //             <ExportButton filteredData={filteredRows} />

// //             <Button
// //               variant='contained'
// //               startIcon={<i className='tabler-plus' />}
// //               onClick={() => setAddOpen(true)}
// //               className='max-sm:is-full'
// //             >
// //               Add Employee Review Cycle
// //             </Button>
// //           </div>
// //         </div>

// //         {/* Table */}
// //         <div className='overflow-x-auto'>
// //           <table className={tableStyles.table}>
// //             <thead>
// //               {table.getHeaderGroups().map(headerGroup => (
// //                 <tr key={headerGroup.id}>
// //                   {headerGroup.headers.map(header => (
// //                     <th key={header.id}>
// //                       {!header.isPlaceholder && (
// //                         <div
// //                           className={classnames({
// //                             'flex items-center': header.column.getIsSorted(),
// //                             'cursor-pointer select-none': header.column.getCanSort()
// //                           })}
// //                           onClick={header.column.getToggleSortingHandler()}
// //                         >
// //                           {flexRender(header.column.columnDef.header, header.getContext())}
// //                           {{
// //                             asc: <i className='tabler-chevron-up text-xl' />,
// //                             desc: <i className='tabler-chevron-down text-xl' />
// //                           }[header.column.getIsSorted()] ?? null}
// //                         </div>
// //                       )}
// //                     </th>
// //                   ))}
// //                 </tr>
// //               ))}
// //             </thead>

// //             {table.getFilteredRowModel().rows.length === 0 ? (
// //               <tbody>
// //                 <tr>
// //                   <td colSpan={table.getVisibleFlatColumns().length} className='text-center'>
// //                     No employee review cycle found
// //                   </td>
// //                 </tr>
// //               </tbody>
// //             ) : (
// //               <tbody>
// //                 {table.getRowModel().rows.map(row => (
// //                   <tr key={row.id} className={classnames({ selected: row.getIsSelected() })}>
// //                     {row.getVisibleCells().map(cell => (
// //                       <td key={cell.id}>
// //                         {flexRender(cell.column.columnDef.cell, cell.getContext())}
// //                       </td>
// //                     ))}
// //                   </tr>
// //                 ))}
// //               </tbody>
// //             )}
// //           </table>
// //         </div>

// //         {/* Pagination */}
// //         <TablePagination
// //           component={() => <TablePaginationComponent table={table} />}
// //           count={table.getFilteredRowModel().rows.length}
// //           rowsPerPage={table.getState().pagination.pageSize}
// //           page={table.getState().pagination.pageIndex}
// //           onPageChange={(_, page) => table.setPageIndex(page)}
// //         />
// //       </Card>

// //       {/* ➕ Add Goal Drawer */}
// //       <AddEmployeeGoalDrawer
// //         open={addOpen}
// //         handleClose={() => setAddOpen(false)}
// //         refreshDepartments={refreshGoals}
// //       />

// //       {/* 👁️ View Goal Drawer */}
// //       <ViewEmployeeGoal
// //         open={viewOpen}
// //         handleClose={() => setViewOpen(false)}
// //         goalData={selectedGoal}
// //       />

// //       {/* ✏️ Edit Goal Drawer (optional) */}
// //       <EditDepartment
// //         open={editOpen}
// //         handleClose={() => setEditOpen(false)}
// //         selectedDepartment={selectedGoal}
// //         onSave={handleUpdateGoal}
// //       />
// //     </>
// //   )
// // }

// // export default DepartmentListTable

// 'use client'

// import { useEffect, useState, useMemo } from 'react'
// import { useRouter } from 'next/navigation'

// // MUI Imports
// import Card from '@mui/material/Card'
// import Button from '@mui/material/Button'
// import Typography from '@mui/material/Typography'
// import Chip from '@mui/material/Chip'
// import Checkbox from '@mui/material/Checkbox'
// import IconButton from '@mui/material/IconButton'
// import MenuItem from '@mui/material/MenuItem'
// import TablePagination from '@mui/material/TablePagination'
// import { styled } from '@mui/material/styles'
// import { getLocalizedUrl } from '@/utils/i18n'
// import { useParams } from 'next/navigation'

// // inside your component
// const { lang: locale } = useParams()

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

// // 🧱 Custom Component Imports
// import AddEmployeeGoalDrawer from './AddDepartmentDrawer'
// import ViewEmployeeGoal from './ViewDepartment'
// import EditDepartment from './EditDepartment'
// import ExportButton from '../../../../../@menu/components/tables/ExportButton'
// import TablePaginationComponent from '@components/TablePaginationComponent'
// import CustomTextField from '@core/components/mui/TextField'

// // 🧠 API Actions
// import { fetchEmployeeReviewCycle, editEmployeeGoal } from '../../../../../app/server/actions'

// // 🖼️ Styles
// import tableStyles from '@core/styles/table.module.css'

// // 🔧 Styled
// const Icon = styled('i')({})

// // 🔍 Fuzzy Search Filter
// const fuzzyFilter = (row, columnId, value, addMeta) => {
//   const itemRank = rankItem(row.getValue(columnId), value)
//   addMeta({ itemRank })
//   return itemRank.passed
// }

// // 🔁 Debounced Input for Search
// const DebouncedInput = ({ value: initialValue, onChange, debounce = 500, ...props }) => {
//   const [value, setValue] = useState(initialValue)
//   useEffect(() => setValue(initialValue), [initialValue])
//   useEffect(() => {
//     const timeout = setTimeout(() => onChange(value), debounce)
//     return () => clearTimeout(timeout)
//   }, [value])
//   return <CustomTextField {...props} value={value} onChange={e => setValue(e.target.value)} />
// }

// // 🔘 Status Chip Colors
// const statusColorMap = {
//   'Not Started': 'secondary',
//   'In Progress': 'warning',
//   Completed: 'success'
// }

// // 🧾 Column Helper
// const columnHelper = createColumnHelper()

// const DepartmentListTable = ({ tableData }) => {
//   const router = useRouter() // ✅ Moved here inside component

//   // States
//   const [data, setData] = useState(tableData)
//   const [addOpen, setAddOpen] = useState(false)
//   const [viewOpen, setViewOpen] = useState(false)
//   const [editOpen, setEditOpen] = useState(false)
//   const [selectedGoal, setSelectedGoal] = useState(null)
//   const [rowSelection, setRowSelection] = useState({})
//   const [globalFilter, setGlobalFilter] = useState('')

//   // 🔄 Fetch latest data
//   const refreshGoals = async () => {
//     const res = await fetchEmployeeReviewCycle()
//     if (res?.data) setData(res.data)
//   }

//   // 📝 Handle Edit Save
//   const handleUpdateGoal = async updatedData => {
//     try {
//       const response = await editEmployeeGoal(updatedData)
//       await refreshGoals()
//       return response
//     } catch (error) {
//       console.error('Error updating goal:', error)
//     }
//   }

//   // 🧱 Columns
//   const columns = useMemo(
//     () => [
//       {
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
//       columnHelper.accessor('employeeName', {
//         header: 'Employee',
//         enableSorting: true,
//         cell: ({ row }) => (
//           <Typography color='text.primary' className='font-medium'>
//             {row.original.employeeName}
//           </Typography>
//         )
//       }),
//       columnHelper.accessor('reviewerName', {
//         header: 'Reviewer',
//         enableSorting: true,
//         cell: ({ row }) => (
//           <Typography color='text.primary'>{row.original.reviewerName}</Typography>
//         )
//       }),
//       columnHelper.accessor('reviewCycleName', {
//         header: 'Review Cycle',
//         enableSorting: true,
//         cell: ({ row }) => (
//           <Typography color='text.primary'>{row.original.reviewCycleName}</Typography>
//         )
//       }),
//       columnHelper.accessor('reviewDate', {
//         header: 'Review Date',
//         enableSorting: true,
//         cell: ({ row }) => (
//           <Typography color='text.primary'>{row.original.reviewDate}</Typography>
//         )
//       }),
//       columnHelper.accessor('rating', {
//         header: 'Rating',
//         enableSorting: true,
//         cell: ({ row }) => (
//           <Typography color='text.primary'>
//             {row.original.rating !== undefined && row.original.rating !== null && row.original.rating !== ''
//               ? row.original.rating
//               : '-'}
//           </Typography>
//         )
//       }),
//       columnHelper.accessor('status', {
//         header: 'Status',
//         enableSorting: true,
//         cell: ({ row }) => (
//           <Chip
//             variant='tonal'
//             label={row.original.status}
//             size='small'
//             color={statusColorMap[row.original.status] || 'default'}
//             className='capitalize'
//           />
//         )
//       }),
//       columnHelper.accessor('createdAt', {
//         header: 'Created At',
//         enableSorting: true,
//         cell: ({ row }) => {
//           const formatted = new Date(row.original.createdAt).toLocaleDateString('en-GB', {
//             day: '2-digit',
//             month: 'short',
//             year: 'numeric'
//           })
//           return <Typography color='text.primary'>{formatted}</Typography>
//         }
//       }),
//       columnHelper.accessor('action', {
//         header: 'Action',
//         cell: ({ row }) => (
//           <div className='flex items-center gap-2'>
//             <IconButton
//   onClick={() => {
//     // save row data for detail page
//     localStorage.setItem('selectedReview', JSON.stringify(row.original))

//     // navigate to detail view with localized URL
//     window.location.href = getLocalizedUrl(
//       `/apps/hrManagement/performance/employeeReviews/view?_id=${row.original._id}`,
//       locale
//     )
//   }}
// >
//   <i className='tabler-eye text-textSecondary' />
// </IconButton>

//           </div>
//         )
//       })
//     ],
//     [data]
//   )

//   // 📊 Table Setup
//   const table = useReactTable({
//     data,
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

//   const filteredRows = table.getFilteredRowModel().rows.map(r => r.original)

//   // 🖥️ UI Render
//   return (
//     <>
//       <Card>
//         {/* Header */}
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
//               placeholder='Search Employee Review Cycle'
//               className='max-sm:is-full'
//             />

//             <ExportButton filteredData={filteredRows} />

//             <Button
//               variant='contained'
//               startIcon={<i className='tabler-plus' />}
//               onClick={() => setAddOpen(true)}
//               className='max-sm:is-full'
//             >
//               Add Employee Review Cycle
//             </Button>
//           </div>
//         </div>

//         {/* Table */}
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
//                     No employee review cycle found
//                   </td>
//                 </tr>
//               </tbody>
//             ) : (
//               <tbody>
//                 {table.getRowModel().rows.map(row => (
//                   <tr key={row.id} className={classnames({ selected: row.getIsSelected() })}>
//                     {row.getVisibleCells().map(cell => (
//                       <td key={cell.id}>
//                         {flexRender(cell.column.columnDef.cell, cell.getContext())}
//                       </td>
//                     ))}
//                   </tr>
//                 ))}
//               </tbody>
//             )}
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

//       {/* ➕ Add Drawer */}
//       <AddEmployeeGoalDrawer
//         open={addOpen}
//         handleClose={() => setAddOpen(false)}
//         refreshDepartments={refreshGoals}
//       />

//       {/* 👁️ View Drawer */}
//       <ViewEmployeeGoal
//         open={viewOpen}
//         handleClose={() => setViewOpen(false)}
//         goalData={selectedGoal}
//       />

//       {/* ✏️ Edit Drawer */}
//       <EditDepartment
//         open={editOpen}
//         handleClose={() => setEditOpen(false)}
//         selectedDepartment={selectedGoal}
//         onSave={handleUpdateGoal}
//       />
//     </>
//   )
// }

// export default DepartmentListTable


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

// 🔧 Styled
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

// 🧾 Column Helper
const columnHelper = createColumnHelper()

// 🔘 Status Chip Colors
const statusColorMap = {
  'Not Started': 'secondary',
  'In Progress': 'warning',
  Completed: 'success'
}

const DepartmentListTable = ({ tableData }) => {
  const router = useRouter()
  const { lang: locale } = useParams() // ✅ Hook inside component body

  // State
  const [data, setData] = useState(tableData)
  const [addOpen, setAddOpen] = useState(false)
  const [viewOpen, setViewOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [selectedGoal, setSelectedGoal] = useState(null)
  const [rowSelection, setRowSelection] = useState({})
  const [globalFilter, setGlobalFilter] = useState('')

  // 🔄 Refresh Data
  const refreshGoals = async () => {
    const res = await fetchEmployeeReviewCycle()
    if (res?.data) setData(res.data)
  }

  // 📝 Handle Edit
  const handleUpdateGoal = async updatedData => {
    try {
      const response = await editEmployeeGoal(updatedData)
      await refreshGoals()
      return response
    } catch (error) {
      console.error('Error updating goal:', error)
    }
  }

  // 🧱 Columns
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
        cell: ({ row }) => <Typography color='text.primary'>{row.original.employeeName}</Typography>
      }),
      columnHelper.accessor('reviewerName', {
        header: 'Reviewer',
        enableSorting: true,
        cell: ({ row }) => <Typography color='text.primary'>{row.original.reviewerName}</Typography>
      }),
      columnHelper.accessor('reviewCycleName', {
        header: 'Review Cycle',
        enableSorting: true,
        cell: ({ row }) => <Typography color='text.primary'>{row.original.reviewCycleName}</Typography>
      }),
      columnHelper.accessor('reviewDate', {
        header: 'Review Date',
        enableSorting: true,
        cell: ({ row }) => <Typography color='text.primary'>{row.original.reviewDate}</Typography>
      }),
      columnHelper.accessor('rating', {
        header: 'Rating',
        enableSorting: true,
        cell: ({ row }) => (
          <Typography color='text.primary'>
            {row.original.rating ? row.original.rating : '-'}
          </Typography>
        )
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
          const formatted = new Date(row.original.createdAt).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
          })
          return <Typography color='text.primary'>{formatted}</Typography>
        }
      }),
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
             {/* <IconButton
              onClick={() => {
                localStorage.setItem('selectedReview', JSON.stringify(row.original))
                window.location.href = getLocalizedUrl(
                  `/apps/hrManagement/performance/employeeReviews/edit?_id=${row.original._id}`,
                  locale
                )
              }}
            >
              <i className='tabler-edit text-textSecondary' />
            </IconButton> */}
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

  // 📊 Table Setup
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
        {/* Header */}
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
              placeholder='Search Employee Review Cycle'
              className='max-sm:is-full'
            />

            <ExportButton filteredData={filteredRows} />

            <Button
              variant='contained'
              startIcon={<i className='tabler-plus' />}
              onClick={() => setAddOpen(true)}
              className='max-sm:is-full'
            >
              Add Employee Review Cycle
            </Button>
          </div>
        </div>

        {/* Table */}
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

            {table.getFilteredRowModel().rows.length === 0 ? (
              <tbody>
                <tr>
                  <td colSpan={table.getVisibleFlatColumns().length} className='text-center'>
                    No employee review cycle found
                  </td>
                </tr>
              </tbody>
            ) : (
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
            )}
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
      <AddEmployeeGoalDrawer open={addOpen} handleClose={() => setAddOpen(false)} refreshDepartments={refreshGoals} />
      <ViewEmployeeGoal open={viewOpen} handleClose={() => setViewOpen(false)} goalData={selectedGoal} />
      <EditDepartment open={editOpen} handleClose={() => setEditOpen(false)} selectedDepartment={selectedGoal} onSave={handleUpdateGoal} />
    </>
  )
}

export default DepartmentListTable




