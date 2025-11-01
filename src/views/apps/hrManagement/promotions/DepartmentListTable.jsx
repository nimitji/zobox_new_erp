

// 'use client'

// import { useState, useEffect, useMemo } from 'react'

// // MUI Imports
// import Card from '@mui/material/Card'
// import Button from '@mui/material/Button'
// import Typography from '@mui/material/Typography'
// import Checkbox from '@mui/material/Checkbox'
// import IconButton from '@mui/material/IconButton'
// import Chip from '@mui/material/Chip'
// import MenuItem from '@mui/material/MenuItem'
// import TablePagination from '@mui/material/TablePagination'
// import { styled } from '@mui/material/styles'

// // Third-party Imports
// import classnames from 'classnames'
// import { rankItem } from '@tanstack/match-sorter-utils'
// import {
//   createColumnHelper,
//   flexRender,
//   getCoreRowModel,
//   useReactTable,
//   getFilteredRowModel,
//   getSortedRowModel,
//   getPaginationRowModel,
//   getFacetedRowModel,
//   getFacetedUniqueValues,
//   getFacetedMinMaxValues
// } from '@tanstack/react-table'

// // Component Imports
// import AddDepartmentDrawer from './AddDepartmentDrawer' // will be used for adding promotion
// import ViewDepartment from './ViewDepartment' // reuse for viewing promotion
// import ExportButton from '../../../../@menu/components/tables/ExportButton'
// import CustomTextField from '@core/components/mui/TextField'
// import TablePaginationComponent from '@components/TablePaginationComponent'

// // Style Imports
// import tableStyles from '@core/styles/table.module.css'

// // Server action (replace later if needed)
// import { fetchPromotions } from '../../../../app/server/actions'

// // Styled icon placeholder
// const Icon = styled('i')({})

// const fuzzyFilter = (row, columnId, value, addMeta) => {
//   const itemRank = rankItem(row.getValue(columnId), value)
//   addMeta({ itemRank })
//   return itemRank.passed
// }

// const DebouncedInput = ({ value: initialValue, onChange, debounce = 500, ...props }) => {
//   const [value, setValue] = useState(initialValue)

//   useEffect(() => {
//     setValue(initialValue)
//   }, [initialValue])

//   useEffect(() => {
//     const timeout = setTimeout(() => onChange(value), debounce)
//     return () => clearTimeout(timeout)
//   }, [value])

//   return <CustomTextField {...props} value={value} onChange={e => setValue(e.target.value)} />
// }

// const columnHelper = createColumnHelper()

// const DepartmentListTable = ({ tableData }) => {
//   const [data, setData] = useState(tableData || [])
//   const [filteredData, setFilteredData] = useState(data)
//   const [globalFilter, setGlobalFilter] = useState('')
//   const [rowSelection, setRowSelection] = useState({})
//   const [addOpen, setAddOpen] = useState(false)
//   const [viewOpen, setViewOpen] = useState(false)
//   const [selectedPromotion, setSelectedPromotion] = useState(null)

//   const refreshPromotions = async () => {
//     const res = await fetchPromotions()
//     setData(res?.data || [])
//     setFilteredData(res?.data || [])
//   }

//   const columns = useMemo(
//     () => [
//       // ✅ Select column
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

//       // 🧍 Employee
//       columnHelper.accessor('employee', {
//         header: 'Employee',
//         cell: ({ row }) => (
//           <Typography color='text.primary' className='font-medium'>
//             {row.original.employee}
//           </Typography>
//         )
//       }),

//       // 🪪 Designation change
//       columnHelper.accessor('previousDesignation', {
//         header: 'Designation Change',
//         cell: ({ row }) => (
//           <Typography color='text.primary'>
//             {row.original.previousDesignation} 
//           </Typography>
//         )
//       }),

//        columnHelper.accessor('newDesignation', {
//         header: 'Designation Change',
//         cell: ({ row }) => (
//           <Typography color='text.primary'>
//           {row.original.newDesignation}
//           </Typography>
//         )
//       }),

//       // 📅 Promotion Date
//       columnHelper.accessor('promotionDate', {
//         header: 'Promotion Date',
//         enableSorting: true,
//         cell: ({ row }) => {
//           const formatted = new Date(row.original.promotionDate).toLocaleDateString('en-GB', {
//             day: '2-digit',
//             month: 'short',
//             year: 'numeric'
//           })
//           return <Typography color='text.primary'>{formatted}</Typography>
//         }
//       }),

//       // 📅 Effective Date
//       columnHelper.accessor('effectiveDate', {
//         header: 'Effective Date',
//         enableSorting: true,
//         cell: ({ row }) => {
//           const formatted = new Date(row.original.effectiveDate).toLocaleDateString('en-GB', {
//             day: '2-digit',
//             month: 'short',
//             year: 'numeric'
//           })
//           return <Typography color='text.primary'>{formatted}</Typography>
//         }
//       }),

//       // 💰 Salary Adjustment
//       columnHelper.accessor('salaryAdjustment', {
//         header: 'Salary Adjustment',
//         cell: ({ row }) => (
//           <Typography color='text.primary'>₹ {row.original.salaryAdjustment}</Typography>
//         )
//       }),

     

//       // ⚙️ Status
//       columnHelper.accessor('status', {
//         header: 'Status',
//         cell: ({ row }) => (
//           <Chip
//             label={row.original.status}
//             variant='tonal'
//             size='small'
//             color={
//               row.original.status === 'Approved'
//                 ? 'success'
//                 : row.original.status === 'Pending'
//                 ? 'warning'
//                 : 'error'
//             }
//             className='capitalize'
//           />
//         )
//       }),
      
//         columnHelper.accessor('files', {
//         header: 'Files',
//         cell: ({ row }) => {
//           const { document } = row.original
      
//           // const handleDownload = (url, filename = 'file') => {
//           //   if (!url) return
      
//           //   try {
//           //     const link = document.createElement('a')
//           //     link.href = url
//           //     link.download = filename
//           //     link.target = '_blank' // ✅ works even for GCS public URLs
//           //     document.body.appendChild(link)
//           //     link.click()
//           //     document.body.removeChild(link)
//           //   } catch (error) {
//           //     console.error('Download failed:', error)
//           //     alert('Failed to download file.')
//           //   }
//           // }
//                const handleDownload = (url) => {
//           if (!url) return
//           const link = document.createElement('a')
//           link.href = url
//           link.setAttribute('download', '')
//           document.body.appendChild(link)
//           link.click()
//           document.body.removeChild(link)
//         }
      
//           return (
//             <div className='flex gap-2'>
//               {/* 📸 Photo Button */}
//               <Button
//                 variant='outlined'
//                 size='small'
//                 onClick={() => handleDownload(document, 'document')}
//                 sx={{
//                   textTransform: 'none',
//                   borderRadius: '8px',
//                   px: 2,
//                   minWidth: '80px',
//                   color: '#111',
//                   borderColor: '#111',
//                   fontWeight: 500
//                 }}
//               >
//                 Document
//               </Button>
      
            
//             </div>
//           )
//         }
//       }),
      
//       // 👁 Action
//       columnHelper.accessor('action', {
//         header: 'Action',
//         enableSorting: false,
//         cell: ({ row }) => (
//           <div className='flex items-center'>
//             <IconButton
//               onClick={() => {
//                 setSelectedPromotion(row.original)
//                 setViewOpen(true)
//               }}
//             >
//               <i className='tabler-eye text-textSecondary' />
//             </IconButton>
//           </div>
//         )
//       })
//     ],
//     [data, filteredData]
//   )

//   const table = useReactTable({
//     data,
//     columns,
//     filterFns: { fuzzy: fuzzyFilter },
//     state: { rowSelection, globalFilter },
//     onRowSelectionChange: setRowSelection,
//     onGlobalFilterChange: setGlobalFilter,
//     getCoreRowModel: getCoreRowModel(),
//     getFilteredRowModel: getFilteredRowModel(),
//     getSortedRowModel: getSortedRowModel(),
//     getPaginationRowModel: getPaginationRowModel(),
//     getFacetedRowModel: getFacetedRowModel(),
//     getFacetedUniqueValues: getFacetedUniqueValues(),
//     getFacetedMinMaxValues: getFacetedMinMaxValues(),
//     initialState: { pagination: { pageSize: 10 } }
//   })

//   const filteredRows = table.getFilteredRowModel().rows.map(r => r.original)

//   return (
//     <>
//       <Card>
//         {/* 🔹 Header */}
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
//               placeholder='Search Promotion'
//               className='max-sm:is-full'
//             />
//             <ExportButton filteredData={filteredRows} />
//             <Button
//               variant='contained'
//               startIcon={<i className='tabler-plus' />}
//               onClick={() => setAddOpen(true)}
//               className='max-sm:is-full'
//             >
//               Add Promotion
//             </Button>
//           </div>
//         </div>

//         {/* 🔹 Table */}
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
//                   <td colSpan={columns.length} className='text-center'>
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

//       {/* 🔹 Drawer Components */}
//       <AddDepartmentDrawer
//         open={addOpen}
//         handleClose={() => setAddOpen(false)}
//         refreshDepartments={refreshPromotions}
//       />

//       <ViewDepartment
//         open={viewOpen}
//         handleClose={() => setViewOpen(false)}
//         departmentData={selectedPromotion}
//       />
//     </>
//   )
// }

// export default DepartmentListTable

'use client'

import { useState, useEffect, useMemo } from 'react'

// 📦 MUI Imports
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Checkbox from '@mui/material/Checkbox'
import IconButton from '@mui/material/IconButton'
import Chip from '@mui/material/Chip'
import MenuItem from '@mui/material/MenuItem'
import TablePagination from '@mui/material/TablePagination'
import { styled } from '@mui/material/styles'

// 🧩 Third-party Imports
import classnames from 'classnames'
import { rankItem } from '@tanstack/match-sorter-utils'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFacetedMinMaxValues
} from '@tanstack/react-table'

// 🧱 Component Imports
import AddDepartmentDrawer from './AddDepartmentDrawer' // for adding promotions
import ViewDepartment from './ViewDepartment' // for viewing promotions
import ExportButton from '../../../../@menu/components/tables/ExportButton'
import CustomTextField from '@core/components/mui/TextField'
import TablePaginationComponent from '@components/TablePaginationComponent'

// 🎨 Style Imports
import tableStyles from '@core/styles/table.module.css'

// 🖥️ Server action
import { fetchPromotions } from '../../../../app/server/actions'

// 🧱 Styled icon placeholder
const Icon = styled('i')({})

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

const columnHelper = createColumnHelper()

// ======================
// ✅ MAIN COMPONENT
// ======================
const DepartmentListTable = ({ tableData }) => {
  const [data, setData] = useState(tableData || [])
  const [filteredData, setFilteredData] = useState(data)
  const [globalFilter, setGlobalFilter] = useState('')
  const [rowSelection, setRowSelection] = useState({})
  const [addOpen, setAddOpen] = useState(false)
  const [viewOpen, setViewOpen] = useState(false)
  const [selectedPromotion, setSelectedPromotion] = useState(null)

  const refreshPromotions = async () => {
    const res = await fetchPromotions()
    setData(res?.data || [])
    setFilteredData(res?.data || [])
  }

  // ======================
  // 🧱 TABLE COLUMNS
  // ======================
  const columns = useMemo(
    () => [
      // ✅ Selection column
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

      // 🧍 Employee
      columnHelper.accessor('employee', {
        header: 'Employee',
        cell: ({ row }) => (
          <Typography color='text.primary' className='font-medium'>
            {row.original.employee}
          </Typography>
        )
      }),

      // 🪪 Designation Change
      columnHelper.accessor('previousDesignation', {
        header: 'Previous Designation',
        cell: ({ row }) => (
          <Typography color='text.primary'>
            {row.original.previousDesignation}
          </Typography>
        )
      }),

         columnHelper.accessor('newDesignation', {
        header: 'New Designation',
        cell: ({ row }) => (
          <Typography color='text.primary'>
          {row.original.newDesignation}
          </Typography>
        )
      }),

      // 📅 Promotion Date
      columnHelper.accessor('promotionDate', {
        header: 'Promotion Date',
        cell: ({ row }) => {
          const formatted = new Date(row.original.promotionDate).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
          })
          return <Typography color='text.primary'>{formatted}</Typography>
        }
      }),

      // 📅 Effective Date
      columnHelper.accessor('effectiveDate', {
        header: 'Effective Date',
        cell: ({ row }) => {
          const formatted = new Date(row.original.effectiveDate).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
          })
          return <Typography color='text.primary'>{formatted}</Typography>
        }
      }),

      // 💰 Salary Adjustment
      columnHelper.accessor('salaryAdjustment', {
        header: 'Salary Adjustment',
        cell: ({ row }) => (
          <Typography color='text.primary'>
            ₹ {row.original.salaryAdjustment || 0}
          </Typography>
        )
      }),

      // 🧾 Document Column (✅ FIXED)
      columnHelper.accessor('document', {
        header: 'Document',
        cell: ({ row }) => {
          const url = row.original.document

          if (!url) {
            return (
              <Typography
                variant='body2'
                color='text.secondary'
                sx={{ fontStyle: 'italic' }}
              >
                No document
              </Typography>
            )
          }

          // Detect if file is image or pdf
          const isPDF = /\.pdf$/i.test(url)
          const label = isPDF ? 'View Document' : 'View Document'

          const handleDownload = link => {
            try {
              const a = document.createElement('a')
              a.href = link
              a.target = '_blank'
              a.download = ''
              document.body.appendChild(a)
              a.click()
              document.body.removeChild(a)
            } catch (err) {
              console.error('Download failed:', err)
            }
          }

          return (
            <Button
              variant='outlined'
              size='small'
              onClick={() => handleDownload(url)}
              sx={{
                textTransform: 'none',
                borderRadius: '8px',
                px: 2,
                minWidth: '100px',
                color: '#111',
                borderColor: '#111',
                fontWeight: 500
              }}
            >
              {label}
            </Button>
          )
        }
      }),

      // ⚙️ Status
      columnHelper.accessor('status', {
        header: 'Status',
        cell: ({ row }) => (
          <Chip
            label={row.original.status}
            variant='tonal'
            size='small'
            color={
              row.original.status === 'Approved'
                ? 'success'
                : row.original.status === 'Pending'
                ? 'warning'
                : 'error'
            }
            className='capitalize'
          />
        )
      }),

      // 👁️ Action (View Drawer)
      columnHelper.accessor('action', {
        header: 'Action',
        enableSorting: false,
        cell: ({ row }) => (
          <div className='flex items-center'>
            <IconButton
              onClick={() => {
                setSelectedPromotion(row.original)
                setViewOpen(true)
              }}
            >
              <i className='tabler-eye text-textSecondary' />
            </IconButton>
          </div>
        )
      })
    ],
    [data]
  )

  // ======================
  // ⚙️ TABLE CONFIG
  // ======================
  const table = useReactTable({
    data,
    columns,
    filterFns: { fuzzy: fuzzyFilter },
    state: { rowSelection, globalFilter },
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    initialState: { pagination: { pageSize: 10 } }
  })

  const filteredRows = table.getFilteredRowModel().rows.map(r => r.original)

  // ======================
  // 🧱 RENDER
  // ======================
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
              placeholder='Search Promotion'
              className='max-sm:is-full'
            />
            <ExportButton filteredData={filteredRows} />
            <Button
              variant='contained'
              startIcon={<i className='tabler-plus' />}
              onClick={() => setAddOpen(true)}
              className='max-sm:is-full'
            >
              Add Promotion
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
                  <td colSpan={columns.length} className='text-center'>
                    No data available
                  </td>
                </tr>
              </tbody>
            ) : (
              <tbody>
                {table
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
      <AddDepartmentDrawer
        open={addOpen}
        handleClose={() => setAddOpen(false)}
        refreshDepartments={refreshPromotions}
      />

      <ViewDepartment
        open={viewOpen}
        handleClose={() => setViewOpen(false)}
        departmentData={selectedPromotion}
      />
    </>
  )
}

export default DepartmentListTable


