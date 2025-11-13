// 'use client'

// // React Imports
// import { useEffect, useState, useMemo } from 'react'

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
// import ViewBranch from './ViewBranch'
// import EditBranch from './EditBranch'
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
// import AddBranchDrawer from './AddBranchDrawer'
// import OptionMenu from '@core/components/option-menu'
// import TablePaginationComponent from '@components/TablePaginationComponent'
// import CustomTextField from '@core/components/mui/TextField'
// import CustomAvatar from '@core/components/mui/Avatar'

// // Util Imports
// import { getInitials } from '@/utils/getInitials'
// import { getLocalizedUrl } from '@/utils/i18n'
// import {editBranch,fetchBranches} from "../../../../app/server/actions"

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

// const BranchListTable = ({ tableData }) => {
//   console.log("AAJKADEBUG",tableData)
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
// const [selectedBranch, setSelectedBranch] = useState(null)

// const handleEditClick = branch => {
//   setSelectedBranch(branch)
//   setIsEditOpen(true)
// }

// // const handleUpdateBranch = updatedData => {
// //   console.log('Updated branch:', updatedData)
// //   editBranch(updatedData)
// // }

//   const refreshBranches = async () => {
//     const res = await fetchBranches()
//     setData(res)
//     setFilteredData(res)
//   }

// const handleUpdateBranch = async updatedData => {
//   try {
//     console.log('Updated branch:', updatedData)
//     const response = await editBranch(updatedData)
//     await refreshBranches()
//     return response
//   } catch (error) {
//     console.error('Error updating branch:', error)
//   }
// }


//   // Hooks
//   const { lang: locale } = useParams()

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
//       columnHelper.accessor('branchName', {
//         header: 'Name',
//         cell: ({ row }) => (
//           <div className='flex items-center gap-4'>
//             {/* {getAvatar({ avatar: row.original.avatar, fullName: row.original.fullName })} */}
//             <div className='flex flex-col'>
//               <Typography color='text.primary' className='font-medium'>
//                 {row.original.branchName}
//               </Typography>
//               {/* <Typography variant='body2'>{row.original.username}</Typography> */}
//             </div>
//           </div>
//         )
//       }),
//       columnHelper.accessor('address', {
//         header: 'Address',
//         cell: ({ row }) => (
//           <div className='flex items-center gap-2'>
//             {/* <Icon
//               className={userRoleObj[row.original.role].icon}
//               sx={{ color: `var(--mui-palette-${userRoleObj[row.original.role].color}-main)` }}
//             /> */}
//             <Typography className='capitalize' color='text.primary'>
//               {row.original.address}
//             </Typography>
//           </div>
//         )
//       }),
//       columnHelper.accessor('contact', {
//         header: 'Contact',
//         cell: ({ row }) => (
//           <Typography className='capitalize' color='text.primary'>
//             {row.original.contact}
//           </Typography>
//         )
//       }),
     
//       columnHelper.accessor('status', {
//         header: 'Status',
//         cell: ({ row }) => (
//           <div className='flex items-center gap-3'>
//             <Chip
//               variant='tonal'
//               label={row.original.status}
//               size='small'
//               color={userStatusObj[row.original.status]}
//               className='capitalize'
//             />
//           </div>
//         )
//       }),
   

//       columnHelper.accessor('createdAt', {
//   header: 'Created At',
//   enableSorting: true, // ✅ sorting enable
//   cell: ({ row }) => {
//     const formattedDate = new Date(row.original.createdAt).toLocaleDateString('en-GB', {
//       day: '2-digit',
//       month: 'short',
//       year: 'numeric'
//     })
//     return (
//       <Typography color="text.primary" className="capitalize">
//         {formattedDate}
//       </Typography>
//     )
//   }
// }),

//       columnHelper.accessor('action', {
//         header: 'Action',
//         cell: ({ row }) => (
//           <div className='flex items-center'>
        

// <IconButton
//   onClick={() => {
//     setSelectedBranch(row.original)  // 👈 branch ka data store karega
//     setViewOpen(true)                // 👈 drawer open karega
//   }}
// >
//   <i className='tabler-eye text-textSecondary' />
// </IconButton>

// <IconButton onClick={() => handleEditClick(row.original)}>
//   <i className='tabler-edit text-textSecondary' />
// </IconButton>


         

//           </div>
//         ),
//         enableSorting: false
//       })
//     ],
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     [data, filteredData]
//   )

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
//               placeholder='Search Branch'
//               className='max-sm:is-full'
//             />
          
//              <ExportButton filteredData={filteredDatas} />
//             <Button
//               variant='contained'
//               startIcon={<i className='tabler-plus' />}
//               onClick={() => setAddUserOpen(!addUserOpen)}
//               className='max-sm:is-full'
//             >
//               Add Branch
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
//       <AddBranchDrawer
//         open={addUserOpen}
//         handleClose={() => setAddUserOpen(!addUserOpen)}
//         userData={data}
//         setData={setData}
//       />


// <ViewBranch
//   open={viewOpen}
//   handleClose={() => setViewOpen(false)}
//   branchData={selectedBranch}
// />

// <EditBranch
//   open={isEditOpen}
//   handleClose={() => setIsEditOpen(false)}
//   selectedBranch={selectedBranch}
//   onSave={handleUpdateBranch}
// />

//     </>
//   )
// }

// export default BranchListTable


'use client'

// React Imports
import { useEffect, useState, useMemo } from 'react'

// Next Imports
import Link from 'next/link'
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

// Component Imports
import ViewBranch from './ViewBranch'
import EditBranch from './EditBranch'
import AddBranchDrawer from './AddBranchDrawer'
import ExportButton from '../../../../@menu/components/tables/ExportButton'
import TablePaginationComponent from '@components/TablePaginationComponent'
import CustomTextField from '@core/components/mui/TextField'
import CustomAvatar from '@core/components/mui/Avatar'

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

// Utils
import { getInitials } from '@/utils/getInitials'
import { editBranch, fetchBranches } from "../../../../app/server/actions"

// Styles
import tableStyles from '@core/styles/table.module.css'

// Styled Component
const Icon = styled('i')({})

// Fuzzy search
const fuzzyFilter = (row, columnId, value, addMeta) => {
  const itemRank = rankItem(row.getValue(columnId), value)
  addMeta({ itemRank })
  return itemRank.passed
}

// Debounced Input
const DebouncedInput = ({ value: initialValue, onChange, debounce = 500, ...props }) => {
  const [value, setValue] = useState(initialValue)

  useEffect(() => setValue(initialValue), [initialValue])

  useEffect(() => {
    const timeout = setTimeout(() => onChange(value), debounce)
    return () => clearTimeout(timeout)
  }, [value])

  return <CustomTextField {...props} value={value} onChange={e => setValue(e.target.value)} />
}

const userStatusObj = {
  active: 'success',
  pending: 'warning',
  inactive: 'secondary'
}

// Column helper
const columnHelper = createColumnHelper()

const BranchListTable = ({ tableData }) => {
  const [data, setData] = useState(tableData)
  const [rowSelection, setRowSelection] = useState({})
  const [globalFilter, setGlobalFilter] = useState('')
  const [viewOpen, setViewOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [addUserOpen, setAddUserOpen] = useState(false)
  const [selectedBranch, setSelectedBranch] = useState(null)

  // Refresh function
  const refreshBranches = async () => {
    const res = await fetchBranches()
    setData(res)
  }

  // Update handler
  const handleUpdateBranch = async updatedData => {
    try {
      const response = await editBranch(updatedData)
      await refreshBranches()       // Auto Refresh (EDIT)
      return response
    } catch (error) {
      console.error('Error updating branch:', error)
    }
  }

  // Table Columns
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
      columnHelper.accessor('branchName', {
        header: 'Name',
        cell: ({ row }) => (
          <Typography color='text.primary' className='font-medium'>
            {row.original.branchName}
          </Typography>
        )
      }),
      columnHelper.accessor('address', {
        header: 'Address',
        cell: ({ row }) => (
          <Typography color='text.primary' className='capitalize'>
            {row.original.address}
          </Typography>
        )
      }),
      columnHelper.accessor('contact', {
        header: 'Contact',
        cell: ({ row }) => (
          <Typography color='text.primary' className='capitalize'>
            {row.original.contact}
          </Typography>
        )
      }),
      columnHelper.accessor('status', {
        header: 'Status',
        cell: ({ row }) => (
          <Chip
            variant='tonal'
            label={row.original.status}
            size='small'
            color={userStatusObj[row.original.status]}
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
          return <Typography color="text.primary">{formatted}</Typography>
        }
      }),
      columnHelper.accessor('action', {
        header: 'Action',
        enableSorting: false,
        cell: ({ row }) => (
          <div className='flex items-center'>
            <IconButton
              onClick={() => {
                setSelectedBranch(row.original)
                setViewOpen(true)
              }}
            >
              <i className='tabler-eye text-textSecondary' />
            </IconButton>

            <IconButton onClick={() => {
              setSelectedBranch(row.original)
              setIsEditOpen(true)
            }}>
              <i className='tabler-edit text-textSecondary' />
            </IconButton>
          </div>
        )
      })
    ],
    [data]
  )

  // Table Config
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

  const filteredDatas = table.getFilteredRowModel().rows.map(r => r.original)

  return (
    <>
      <Card>
        <div className='flex justify-between flex-col md:flex-row p-6 border-bs gap-4'>
          {/* Page Size */}
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

          {/* Search + Add */}
          <div className='flex flex-col sm:flex-row gap-4'>
            <DebouncedInput
              value={globalFilter ?? ''}
              onChange={value => setGlobalFilter(String(value))}
              placeholder='Search Branch'
            />

            <ExportButton filteredData={filteredDatas} />

            <Button
              variant='contained'
              startIcon={<i className='tabler-plus' />}
              onClick={() => setAddUserOpen(true)}
            >
              Add Branch
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
                      {header.isPlaceholder ? null : (
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
                        <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                      ))}
                    </tr>
                  ))
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

      {/* Add Branch Drawer (Auto Refresh Added) */}
      <AddBranchDrawer
        open={addUserOpen}
        handleClose={() => setAddUserOpen(false)}
        userData={data}
        setData={setData}
        refreshBranches={refreshBranches}     // ⭐ Auto Refresh On Add
      />

      {/* View Branch */}
      <ViewBranch
        open={viewOpen}
        handleClose={() => setViewOpen(false)}
        branchData={selectedBranch}
      />

      {/* Edit Branch */}
      <EditBranch
        open={isEditOpen}
        handleClose={() => setIsEditOpen(false)}
        selectedBranch={selectedBranch}
        onSave={handleUpdateBranch}            // ⭐ Auto Refresh On Edit
      />
    </>
  )
}

export default BranchListTable



