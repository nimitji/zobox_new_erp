// 'use client'

// // React Imports
// import { useEffect, useState, useMemo } from 'react'

// // Next Imports
// import { useParams } from 'next/navigation'

// // MUI Imports
// import Card from '@mui/material/Card'
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
// import AddDepartmentDrawer from './AddDepartmentDrawer'
// import TablePaginationComponent from '@components/TablePaginationComponent'
// import CustomTextField from '@core/components/mui/TextField'

// // Util Imports
// import { editDepartment, fetchAnnouncements } from '../../../../app/server/actions'

// // Style Imports
// import tableStyles from '@core/styles/table.module.css'

// // Styled Components
// const Icon = styled('i')({})

// // 🔍 Fuzzy Filter
// const fuzzyFilter = (row, columnId, value, addMeta) => {
//   const itemRank = rankItem(row.getValue(columnId), value)
//   addMeta({ itemRank })
//   return itemRank.passed
// }

// // ⏳ Debounced Input
// const DebouncedInput = ({ value: initialValue, onChange, debounce = 500, ...props }) => {
//   const [value, setValue] = useState(initialValue)
//   useEffect(() => setValue(initialValue), [initialValue])
//   useEffect(() => {
//     const timeout = setTimeout(() => onChange(value), debounce)
//     return () => clearTimeout(timeout)
//   }, [value])
//   return <CustomTextField {...props} value={value} onChange={e => setValue(e.target.value)} />
// }

// const columnHelper = createColumnHelper()

// const DepartmentListTable = ({ tableData }) => {
//   console.log('AAJKADEBUG', tableData)
//   const [data, setData] = useState(tableData)
//   const [addUserOpen, setAddUserOpen] = useState(false)
//   const [rowSelection, setRowSelection] = useState({})
//   const [filteredData, setFilteredData] = useState(data)
//   const [globalFilter, setGlobalFilter] = useState('')
//   const [viewOpen, setViewOpen] = useState(false)
//   const [isEditOpen, setIsEditOpen] = useState(false)
//   const [selectedDepartment, setSelectedDepartment] = useState(null)

//   // 🧾 Fetch Transfers
//   const refreshWarnings = async () => {
//     try {
//       const res = await fetchAnnouncements()
//       if (res?.success && Array.isArray(res.data)) {
//         setData(res.data)
//         setFilteredData(res.data)
//       } else {
//         console.error('Invalid data format from API:', res)
//         setData([])
//         setFilteredData([])
//       }
//     } catch (err) {
//       console.error('Error fetching transfers:', err)
//       setData([])
//       setFilteredData([])
//     }
//   }

//   const refreshDepartments = refreshWarnings

//   useEffect(() => {
//     refreshWarnings()
//   }, [])

//   // 🧭 Missing handler fix
//   const handleView = transfer => {
//     setSelectedDepartment(transfer)
//     setViewOpen(true)
//   }

//   const handleViewDocument = transfer => {
//     if (transfer?.document && transfer.document !== 'NA') {
//       window.open(transfer.document, '_blank')
//     } else {
//       alert('No document available')
//     }
//   }

//   const handleUpdateDepartment = async updatedData => {
//     try {
//       const response = await editDepartment(updatedData)
//       await refreshDepartments()
//       return response
//     } catch (error) {
//       console.error('Error updating department:', error)
//     }
//   }

//   const { lang: locale } = useParams()
   
//   const columns = useMemo(
//   () => [
//     // ✅ Keep Select Checkbox Column
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

//     // 📰 Title
//     // columnHelper.accessor('title', {
//     //   header: 'Title',
//     //   cell: ({ row }) => (
//     //     <div>
//     //       <Typography color="text.primary" fontWeight={600}>
//     //         {row.original.title}
//     //       </Typography>
//     //       <div className="flex items-center gap-2 mt-1">
//     //         {row.original.featured && (
//     //           <Chip
//     //             label="Featured"
//     //             color="secondary"
//     //             variant="tonal"
//     //             size="small"
//     //           />
//     //         )}
//     //         {row.original.priority && (
//     //           <Chip
//     //             label={row.original.priority}
//     //             color="error"
//     //             variant="tonal"
//     //             size="small"
//     //           />
//     //         )}
//     //       </div>
//     //     </div>
//     //   )
//     // }),

//     columnHelper.accessor('title', {
//   header: 'Title',
//   cell: ({ row }) => {
//     const { title, featuredAnnouncements, highPriority } = row.original

//     return (
//       <div>
//         {/* 📌 Title */}
//         <Typography color="text.primary" fontWeight={600}>
//           {title || 'NA'}
//         </Typography>

//         {/* 🏷️ Chips Row */}
//         <div className="flex items-center gap-2 mt-1">
//           {/* 🟣 Featured Chip */}
//           {featuredAnnouncements === 'Yes' && (
//             <Chip
//               label="Featured"
//               color="secondary"
//               variant="tonal"
//               size="small"
//               sx={{
//                 fontSize: '0.75rem',
//                 fontWeight: 500,
//                 backgroundColor: 'rgba(168, 85, 247, 0.12)', // soft purple
//                 color: '#9333EA'
//               }}
//             />
//           )}

//           {/* 🔴 High Priority Chip */}
//           {highPriority === 'Yes' && (
//             <Chip
//               label="High Priority"
//               color="error"
//               variant="tonal"
//               size="small"
//               sx={{
//                 fontSize: '0.75rem',
//                 fontWeight: 500,
//                 backgroundColor: 'rgba(239, 68, 68, 0.12)', // soft red
//                 color: '#B91C1C'
//               }}
//             />
//           )}
//         </div>
//       </div>
//     )
//   }
// }),


//     // 🏷 Category
//     columnHelper.accessor('category', {
//       header: 'Category',
//       cell: ({ row }) => (
//         <Chip
//           label={row.original.category}
//           color="secondary"
//           variant="tonal"
//           size="small"
//           className="capitalize"
//         />
//       )
//     }),

//     // 📅 Date Range
//     // columnHelper.accessor('dateRange', {
//     //   header: 'Date Range',
//     //   enableSorting: true,
//     //   cell: ({ row }) => (
//     //     <div>
//     //       <Typography color="text.primary">
//     //         {row.original.startDate} – {row.original.endDate}
//     //       </Typography>
//     //       <Chip
//     //         label="Expired"
//     //         color="default"
//     //         variant="outlined"
//     //         size="small"
//     //         sx={{ mt: 0.5 }}
//     //       />
//     //     </div>
//     //   )
//     // }),

//     columnHelper.accessor('dateRange', {
//   header: 'Date Range',
//   enableSorting: true,
//   cell: ({ row }) => {
//     const { startDate, endDate, announcementStatus } = row.original

//     // 🟢 Decide color based on status
//     const getStatusColor = status => {
//       switch (status) {
//         case 'Active':
//           return 'success'
//         case 'Expired':
//           return 'error'
//         default:
//           return 'secondary'
//       }
//     }

//     return (
//       <div>
//         {/* 📅 Show start–end date */}
//         <Typography color="text.primary">
//           {startDate !== 'NA' && endDate !== 'NA'
//             ? `${startDate} – ${endDate}`
//             : 'NA'}
//         </Typography>
       

//         {/* 🏷️ Status Chip */}
//         {announcementStatus && announcementStatus !== 'NA' && (
//           <Chip
//             label={announcementStatus}
//             color={getStatusColor(announcementStatus)}
//             variant="tonal"
//             size="small"
//             sx={{ mt: 0.5, textTransform: 'capitalize' }}
//           />
//         )}
//       </div>
//     )
//   }
// }),


//     // 👥 Audience
//     columnHelper.accessor('audience', {
//       header: 'Audience',
//       cell: ({ row }) => (
//         <Chip
//           label={row.original.audience || 'Company-wide'}
//           color="primary"
//           variant="tonal"
//           size="small"
//           className="capitalize"
//         />
//       )
//     }),

//     // 📎 Attachments
//       columnHelper.accessor('attachments', {
//   header: 'Attachments',
//   cell: ({ row }) => {
//     const attachment = row.original.attachments

//     // 🟠 No file
//     if (!attachment || attachment === 'NA') {
//       return (
//         <Typography color="text.secondary" sx={{ fontSize: '0.9rem' }}>
//           -
//         </Typography>
//       )
//     }

//     // 🧾 PDF Preview
//     if (attachment.endsWith('.pdf')) {
//       return (
//         <div className="flex items-center gap-2">
//           <i className="tabler-file-description text-textSecondary text-lg" />
//           <Typography
//             color="primary"
//             sx={{ cursor: 'pointer', fontSize: '0.9rem' }}
//             onClick={() => window.open(attachment, '_blank')}
//           >
//             View PDF
//           </Typography>
//         </div>
//       )
//     }

//     // 🖼 Image Preview
//     return (
//       <Box
//         component="img"
//         src={attachment}
//         alt="Attachment"
//         sx={{
//           width: 40,
//           height: 40,
//           borderRadius: '6px',
//           objectFit: 'cover',
//           cursor: 'pointer',
//           border: '1px solid #E0E0E0',
//           '&:hover': { opacity: 0.8 }
//         }}
//         onClick={() => window.open(attachment, '_blank')}
//       />
//     )
//   }
// }),

//     // ⚙️ Actions
//     columnHelper.display({
//       id: 'actions',
//       header: 'Actions',
//       enableSorting: false,
//       cell: ({ row }) => (
//         <div className="flex items-center gap-2">
//           {/* 👁 View */}
//           <IconButton onClick={() => handleView(row.original)}>
//             <i className="tabler-eye text" />
//           </IconButton>

//           {/* ✏️ Edit */}
//           {/* <IconButton onClick={() => handleEdit(row.original)}>
//             <i className="tabler-edit text" />
//           </IconButton> */}

        

         
//         </div>
//       )
//     })
//   ],
//   []
// )


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

//   const filteredDatas = table.getFilteredRowModel().rows.map(row => row.original)

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
//               placeholder='Search Transfer'
//               className='max-sm:is-full'
//             />
//             <ExportButton filteredData={filteredDatas} />
//             <Button
//               variant='contained'
//               startIcon={<i className='tabler-plus' />}
//               onClick={() => setAddUserOpen(!addUserOpen)}
//               className='max-sm:is-full'
//             >
//               Add Transfer
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

//       <AddDepartmentDrawer
//         open={addUserOpen}
//         handleClose={() => setAddUserOpen(!addUserOpen)}
//         userData={data}
//         setData={setData}
//         refreshDepartments={refreshDepartments}
//       />

//       <ViewDepartment
//         open={viewOpen}
//         handleClose={() => setViewOpen(false)}
//         departmentData={selectedDepartment}
//       />

//       <EditDepartment
//         open={isEditOpen}
//         handleClose={() => setIsEditOpen(false)}
//         selectedDepartment={selectedDepartment}
//         onSave={handleUpdateDepartment}
//       />
//     </>
//   )
// }

// export default DepartmentListTable

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
import Box from '@mui/material/Box' // ✅ FIXED: added missing import
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
import { editDepartment, fetchAnnouncements } from '../../../../app/server/actions'

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

  // 🧾 Fetch Announcements
  const refreshWarnings = async () => {
    try {
      const res = await fetchAnnouncements()
      if (res?.success && Array.isArray(res.data)) {
        setData(res.data)
        setFilteredData(res.data)
      } else {
        console.error('Invalid data format from API:', res)
        setData([])
        setFilteredData([])
      }
    } catch (err) {
      console.error('Error fetching announcements:', err)
      setData([])
      setFilteredData([])
    }
  }

  const refreshDepartments = refreshWarnings

  useEffect(() => {
    refreshWarnings()
  }, [])

  // 🧭 View Handler
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
      // ✅ Select Checkbox Column
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

      // 📰 Title
      columnHelper.accessor('title', {
        header: 'Title',
        cell: ({ row }) => {
          const { title, featuredAnnouncements, highPriority } = row.original

          return (
            <div>
              <Typography color="text.primary" fontWeight={600}>
                {title || 'NA'}
              </Typography>
              <div className="flex items-center gap-2 mt-1">
                {featuredAnnouncements === 'Yes' && (
                  <Chip
                    label="Featured"
                    color="secondary"
                    variant="tonal"
                    size="small"
                    sx={{
                      fontSize: '0.75rem',
                      fontWeight: 500,
                      backgroundColor: 'rgba(168, 85, 247, 0.12)',
                      color: '#9333EA'
                    }}
                  />
                )}
                {highPriority === 'Yes' && (
                  <Chip
                    label="High Priority"
                    color="error"
                    variant="tonal"
                    size="small"
                    sx={{
                      fontSize: '0.75rem',
                      fontWeight: 500,
                      backgroundColor: 'rgba(239, 68, 68, 0.12)',
                      color: '#B91C1C'
                    }}
                  />
                )}
              </div>
            </div>
          )
        }
      }),

      // 🏷 Category
      columnHelper.accessor('category', {
        header: 'Category',
        cell: ({ row }) => (
          <Chip
            label={row.original.category}
            color="secondary"
            variant="tonal"
            size="small"
            className="capitalize"
          />
        )
      }),

      // 📅 Date Range + Status
      columnHelper.accessor('dateRange', {
        header: 'Date Range',
        enableSorting: true,
        cell: ({ row }) => {
          const { startDate, endDate, announcementStatus } = row.original

          const getStatusColor = status => {
            switch (status) {
              case 'Active':
                return 'success'
              case 'Expired':
                return 'error'
              default:
                return 'secondary'
            }
          }

          return (
            <div>
              <Typography color="text.primary">
                {startDate !== 'NA' && endDate !== 'NA'
                  ? `${startDate} – ${endDate}`
                  : 'NA'}
              </Typography>
              {announcementStatus && announcementStatus !== 'NA' && (
                <Chip
                  label={announcementStatus}
                  color={getStatusColor(announcementStatus)}
                  variant="tonal"
                  size="small"
                  sx={{ mt: 0.5, textTransform: 'capitalize' }}
                />
              )}
            </div>
          )
        }
      }),

      // 👥 Audience
      // columnHelper.accessor('audience', {
      //   header: 'Audience',
      //   cell: ({ row }) => (
      //     <Chip
      //       label={row.original.audience || 'Company-wide'}
      //       color="primary"
      //       variant="tonal"
      //       size="small"
      //       className="capitalize"
      //     />
      //   )
      // }),

//       columnHelper.accessor('audience', {
//   header: 'Audience',
//   cell: ({ row }) => {
//     const { companyWideAnnouncements, departmentName, branchName } = row.original

//     // 🟦 Company-wide
//     if (companyWideAnnouncements === 'Yes') {
//       return (
//         <Chip
//           label="Company-wide"
//           color="primary"
//           variant="tonal"
//           size="small"
//           sx={{
//             fontWeight: 500,
//             fontSize: '0.75rem',
//             backgroundColor: 'rgba(59,130,246,0.12)', // soft blue
//             color: '#2563EB'
//           }}
//         />
//       )
//     }

//     // 🏢 Department & Branch Chips
//     const chips = []

//     // ✅ Department Chip
//     if (departmentName && departmentName !== 'NA') {
//       chips.push(
//         <Chip
//           key="department"
//           label="1 Departments"
//           color="success"
//           variant="tonal"
//           size="small"
//           sx={{
//             fontWeight: 500,
//             fontSize: '0.75rem',
//             backgroundColor: 'rgba(34,197,94,0.12)', // green tint
//             color: '#16A34A'
//           }}
//         />
//       )
//     }

//     // ✅ Branch Chip
//     if (branchName && branchName !== 'NA') {
//       chips.push(
//         <Chip
//           key="branch"
//           label="1 Branches"
//           color="warning"
//           variant="tonal"
//           size="small"
//           sx={{
//             fontWeight: 500,
//             fontSize: '0.75rem',
//             backgroundColor: 'rgba(251,191,36,0.12)', // orange tint
//             color: '#D97706'
//           }}
//         />
//       )
//     }

//     // ✅ If both are NA → show dash
//     if (chips.length === 0) {
//       return (
//         <Typography variant="body2" color="text.secondary">
//           -
//         </Typography>
//       )
//     }

//     return <div className="flex items-center gap-1 flex-wrap">{chips}</div>
//   }
// }),

columnHelper.accessor('audience', {
  header: 'Audience',
  cell: ({ row }) => {
    const { companyWideAnnouncements, departmentName, branchName } = row.original

    const chips = []

    // 🟦 Company-wide Chip
    if (companyWideAnnouncements === 'Yes') {
      chips.push(
        <Chip
          key="companyWide"
          label="Company-wide"
          color="primary"
          variant="tonal"
          size="small"
          sx={{
            fontWeight: 500,
            fontSize: '0.75rem',
            backgroundColor: 'rgba(59,130,246,0.12)', // soft blue
            color: '#2563EB'
          }}
        />
      )
    }

    // 🟩 Department Chip
    if (
      departmentName &&
      departmentName !== 'NA' &&
      departmentName !== '' &&
      departmentName !== null
    ) {
      chips.push(
        <Chip
          key="department"
          label="1 Departments"
          color="success"
          variant="tonal"
          size="small"
          sx={{
            fontWeight: 500,
            fontSize: '0.75rem',
            backgroundColor: 'rgba(34,197,94,0.12)', // soft green
            color: '#16A34A'
          }}
        />
      )
    }

    // 🟧 Branch Chip
    if (
      branchName &&
      branchName !== 'NA' &&
      branchName !== '' &&
      branchName !== null
    ) {
      chips.push(
        <Chip
          key="branch"
          label="1 Branches"
          color="warning"
          variant="tonal"
          size="small"
          sx={{
            fontWeight: 500,
            fontSize: '0.75rem',
            backgroundColor: 'rgba(251,191,36,0.12)', // soft orange
            color: '#D97706'
          }}
        />
      )
    }

    // 🔹 If no valid data
    if (chips.length === 0) {
      return (
        <Typography variant="body2" color="text.secondary">
          -
        </Typography>
      )
    }

    // 🔹 Show all chips in one row
    return <div className="flex items-center gap-1 flex-wrap">{chips}</div>
  }
}),




      // 📎 Attachments
      columnHelper.accessor('attachments', {
        header: 'Attachments',
        cell: ({ row }) => {
          const attachment = row.original.attachments
          if (!attachment || attachment === 'NA') {
            return (
              <Typography color="text.secondary" sx={{ fontSize: '0.9rem' }}>
                -
              </Typography>
            )
          }

          if (attachment.endsWith('.pdf')) {
            return (
              <div className="flex items-center gap-2">
                <i className="tabler-file-description text-textSecondary text-lg" />
                <Typography
                  color="primary"
                  sx={{ cursor: 'pointer', fontSize: '0.9rem' }}
                  onClick={() => window.open(attachment, '_blank')}
                >
                  View PDF
                </Typography>
              </div>
            )
          }

          return (
            <Box
              component="img"
              src={attachment}
              alt="Attachment"
              sx={{
                width: 40,
                height: 40,
                borderRadius: '6px',
                objectFit: 'cover',
                cursor: 'pointer',
                border: '1px solid #E0E0E0',
                '&:hover': { opacity: 0.8 }
              }}
              onClick={() => window.open(attachment, '_blank')}
            />
          )
        }
      }),

      // ⚙️ Actions
      columnHelper.display({
        id: 'actions',
        header: 'Actions',
        enableSorting: false,
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <IconButton onClick={() => handleView(row.original)}>
              <i className="tabler-eye text" />
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

          <div className="flex flex-col sm:flex-row max-sm:is-full items-start sm:items-center gap-4">
            <DebouncedInput
              value={globalFilter ?? ''}
              onChange={value => setGlobalFilter(String(value))}
              placeholder="Search Announcement"
              className="max-sm:is-full"
            />
            <ExportButton filteredData={filteredDatas} />
            <Button
              variant="contained"
              startIcon={<i className="tabler-plus" />}
              onClick={() => setAddUserOpen(!addUserOpen)}
              className="max-sm:is-full"
            >
              Add Announcement
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
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
                            asc: <i className="tabler-chevron-up text-xl" />,
                            desc: <i className="tabler-chevron-down text-xl" />
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
                  <td
                    colSpan={table.getVisibleFlatColumns().length}
                    className="text-center"
                  >
                    No data available
                  </td>
                </tr>
              ) : (
                table
                  .getRowModel()
                  .rows.slice(0, table.getState().pagination.pageSize)
                  .map(row => (
                    <tr
                      key={row.id}
                      className={classnames({ selected: row.getIsSelected() })}
                    >
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





