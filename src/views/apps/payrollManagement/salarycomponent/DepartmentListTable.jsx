

// 'use client'

// import { useEffect, useState, useMemo } from 'react'

// // 📦 Next Imports
// import { useParams } from 'next/navigation'

// // 🧱 MUI Imports
// import Card from '@mui/material/Card'
// import Button from '@mui/material/Button'
// import Typography from '@mui/material/Typography'
// import Chip from '@mui/material/Chip'
// import Checkbox from '@mui/material/Checkbox'
// import IconButton from '@mui/material/IconButton'
// import { styled } from '@mui/material/styles'
// import TablePagination from '@mui/material/TablePagination'
// import MenuItem from '@mui/material/MenuItem'

// // 📋 Custom Imports
// import ViewDepartment from './ViewDepartment'
// import EditDepartment from './EditDepartment'
// import AddDepartmentDrawer from './AddDepartmentDrawer'
// import ExportButton from '../../../../@menu/components/tables/ExportButton'
// import TablePaginationComponent from '@components/TablePaginationComponent'
// import CustomTextField from '@core/components/mui/TextField'

// // 📊 Third-party Imports
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

// // 🧠 Utils & API
// import { editSararyComponent, fetchSalaryComponent } from '../../../../app/server/actions'
// import tableStyles from '@core/styles/table.module.css'

// // 🧱 Styled Components
// const Icon = styled('i')({})

// // 🧮 Fuzzy Filter
// const fuzzyFilter = (row, columnId, value, addMeta) => {
//   const itemRank = rankItem(row.getValue(columnId), value)
//   addMeta({ itemRank })
//   return itemRank.passed
// }

// // 🕓 Debounced Search Input
// const DebouncedInput = ({ value: initialValue, onChange, debounce = 500, ...props }) => {
//   const [value, setValue] = useState(initialValue)
//   useEffect(() => setValue(initialValue), [initialValue])
//   useEffect(() => {
//     const timeout = setTimeout(() => onChange(value), debounce)
//     return () => clearTimeout(timeout)
//   }, [value])
//   return <CustomTextField {...props} value={value} onChange={e => setValue(e.target.value)} />
// }

// // 🟢 Status Mapping
// const userStatusObj = {
//   Active: 'success',
//   Inactive: 'secondary'
// }

// const columnHelper = createColumnHelper()

// const DepartmentListTable = ({ tableData }) => {
//   const [data, setData] = useState(tableData)
//   const [addDrawerOpen, setAddDrawerOpen] = useState(false)
//   const [editDrawerOpen, setEditDrawerOpen] = useState(false)
//   const [viewOpen, setViewOpen] = useState(false)
//   const [selectedDepartment, setSelectedDepartment] = useState(null)
//   const [globalFilter, setGlobalFilter] = useState('')
//   const [rowSelection, setRowSelection] = useState({})

//   const { lang: locale } = useParams()

//   // ✅ Fetch latest salary components from backend
//   const refreshDepartments = async () => {
//     try {
//       const res = await fetchSalaryComponent()
//       if (res) {
//         setData(res)
//       }
//     } catch (error) {
//       console.error('❌ Error refreshing salary components:', error)
//     }
//   }

//   // ✅ Handle Edit Save
//   const handleUpdateDepartment = async updatedData => {
//     try {
//       const response = await editSararyComponent(updatedData)
//       await refreshDepartments()
//       return response
//     } catch (error) {
//       console.error('Error updating salary component:', error)
//     }
//   }

//   // ✅ Table Columns
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
//             onChange={row.getToggleSelectedHandler()}
//           />
//         )
//       },
//       columnHelper.accessor('componentName', {
//         header: 'Component Name',
//         enableSorting: true,
//         cell: ({ row }) => (
//           <Typography color='text.primary' className='font-medium'>
//             {row.original.componentName}
//           </Typography>
//         )
//       }),
//       columnHelper.accessor('type', {
//         header: 'Type',
//         enableSorting: true,
//         cell: ({ row }) => {
//           const type = row.original.type
//           return (
//             <Chip
//               label={type}
//               variant='outlined'
//               size='small'
//               sx={{
//                 color: type === 'Earning' ? '#0A8837' : '#D32F2F',
//                 borderColor: type === 'Earning' ? '#0A8837' : '#D32F2F',
//                 backgroundColor: type === 'Earning' ? 'rgba(10,136,55,0.08)' : 'rgba(211,47,47,0.08)',
//                 fontWeight: 600
//               }}
//             />
//           )
//         }
//       }),
//       columnHelper.accessor('calculationType', {
//         header: 'Calculation',
//         enableSorting: true,
//         cell: ({ row }) => {
//           const type = row.original.calculationType?.toLowerCase()
//           const isPercentage = type?.includes('percentage')
//           const label = isPercentage ? 'Percentage' : 'Fixed'
//           const chipStyle = {
//             borderRadius: '6px',
//             fontWeight: 500,
//             backgroundColor: isPercentage ? '#f3e8ff' : '#e0f2ff',
//             color: isPercentage ? '#9333ea' : '#0284c7',
//             border: `1px solid ${isPercentage ? '#e9d5ff' : '#bae6fd'}`,
//             padding: '2px 6px',
//             fontSize: '0.75rem'
//           }
//           return <Chip label={label} size='small' sx={chipStyle} />
//         }
//       }),
//       columnHelper.accessor('percentageOfBasic', {
//         header: 'Percentage',
//         enableSorting: true,
//         cell: ({ row }) => (
//           <Typography color='text.primary'>
//             {row.original.percentageOfBasic ? `${row.original.percentageOfBasic}%` : '-'}
//           </Typography>
//         )
//       }),
//       columnHelper.accessor('isTaxable', {
//         header: 'Taxable',
//         enableSorting: true,
//         cell: ({ row }) => (
//           <Typography color='text.primary'>{row.original.isTaxable === 'Yes' ? 'Yes' : 'No'}</Typography>
//         )
//       }),
//       columnHelper.accessor('isMandatory', {
//         header: 'Mandatory',
//         enableSorting: true,
//         cell: ({ row }) => (
//           <Typography color='text.primary'>{row.original.isMandatory === 'Yes' ? 'Yes' : 'No'}</Typography>
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
//             color={userStatusObj[row.original.status] || 'secondary'}
//             className='capitalize'
//           />
//         )
//       }),
//       columnHelper.accessor('action', {
//         header: 'Action',
//         enableSorting: false,
//         cell: ({ row }) => (
//           <div className='flex items-center'>
//             <IconButton
//               onClick={() => {
//                 setSelectedDepartment(row.original)
//                 setViewOpen(true)
//               }}
//             >
//               <i className='tabler-eye text-textSecondary' />
//             </IconButton>

//             <IconButton
//               onClick={() => {
//                 setSelectedDepartment(row.original)
//                 setEditDrawerOpen(true)
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

//   // ✅ React Table Setup
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
//               placeholder='Search Salary Component'
//               className='max-sm:is-full'
//             />

//             <ExportButton filteredData={filteredDatas} />

//             <Button
//               variant='contained'
//               startIcon={<i className='tabler-plus' />}
//               onClick={() => setAddDrawerOpen(true)}
//               className='max-sm:is-full'
//             >
//               Add Salary Component
//             </Button>
//           </div>
//         </div>

//         {/* ✅ Table */}
//         <div className='overflow-x-auto'>
//           <table className={tableStyles.table}>
//             <thead>
//               {table.getHeaderGroups().map(headerGroup => (
//                 <tr key={headerGroup.id}>
//                   {headerGroup.headers.map(header => (
//                     <th key={header.id}>
//                       {header.isPlaceholder ? null : (
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
//                 {table.getRowModel().rows.map(row => (
//                   <tr key={row.id} className={classnames({ selected: row.getIsSelected() })}>
//                     {row.getVisibleCells().map(cell => (
//                       <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
//                     ))}
//                   </tr>
//                 ))}
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

//       {/* ✅ Add Drawer */}
//       <AddDepartmentDrawer
//         open={addDrawerOpen}
//         handleClose={() => setAddDrawerOpen(false)}
//         refreshDepartments={refreshDepartments}
//       />

//       {/* ✅ View Drawer */}
//       <ViewDepartment open={viewOpen} handleClose={() => setViewOpen(false)} departmentData={selectedDepartment} />

//       {/* ✅ Edit Drawer */}
//       <EditDepartment
//         open={editDrawerOpen}
//         handleClose={() => setEditDrawerOpen(false)}
//         selectedDepartment={selectedDepartment}
//         onSave={handleUpdateDepartment}
//       />
//     </>
//   )
// }

// export default DepartmentListTable


'use client'

import { useEffect, useState, useMemo } from 'react'
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

// Custom Components
import ViewDepartment from './ViewDepartment'
import EditDepartment from './EditDepartment'
import AddDepartmentDrawer from './AddDepartmentDrawer'
import ExportButton from '../../../../@menu/components/tables/ExportButton'
import TablePaginationComponent from '@components/TablePaginationComponent'
import CustomTextField from '@core/components/mui/TextField'

// Third-party imports
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

// API
import { editSararyComponent, fetchSalaryComponent } from '../../../../app/server/actions'

// Styles
import tableStyles from '@core/styles/table.module.css'

// Styled
const Icon = styled('i')({})

// Fuzzy search filter
const fuzzyFilter = (row, columnId, value, addMeta) => {
  const itemRank = rankItem(row.getValue(columnId), value)
  addMeta({ itemRank })
  return itemRank.passed
}

// Debounced input component
const DebouncedInput = ({ value: initialValue, onChange, debounce = 500, ...props }) => {
  const [value, setValue] = useState(initialValue)

  useEffect(() => setValue(initialValue), [initialValue])

  useEffect(() => {
    const timeout = setTimeout(() => onChange(value), debounce)
    return () => clearTimeout(timeout)
  }, [value])

  return <CustomTextField {...props} value={value} onChange={e => setValue(e.target.value)} />
}

// Status chip colors
const userStatusObj = {
  Active: 'success',
  Inactive: 'secondary'
}

const columnHelper = createColumnHelper()

const DepartmentListTable = ({ tableData }) => {
  const [data, setData] = useState(tableData)
  const [addDrawerOpen, setAddDrawerOpen] = useState(false)
  const [editDrawerOpen, setEditDrawerOpen] = useState(false)
  const [viewOpen, setViewOpen] = useState(false)
  const [selectedDepartment, setSelectedDepartment] = useState(null)
  const [globalFilter, setGlobalFilter] = useState('')
  const [rowSelection, setRowSelection] = useState({})

  const { lang: locale } = useParams()

  // REFRESH function
  const refreshDepartments = async () => {
    try {
      const res = await fetchSalaryComponent()
      if (res) setData(res)
    } catch (err) {
      console.error('❌ Error refreshing:', err)
    }
  }

  // Handle edit save
  const handleUpdateDepartment = async updatedData => {
    try {
      const response = await editSararyComponent(updatedData)
      await refreshDepartments()
      return response
    } catch (err) {
      console.error('❌ Error updating:', err)
    }
  }

  // TABLE columns
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
            onChange={row.getToggleSelectedHandler()}
          />
        )
      },

      columnHelper.accessor('componentName', {
        header: 'Component Name',
        enableSorting: true,
        cell: ({ row }) => (
          <Typography color="text.primary" className="font-medium">
            {row.original.componentName}
          </Typography>
        )
      }),

      columnHelper.accessor('type', {
        header: 'Type',
        enableSorting: true,
        cell: ({ row }) => {
          const type = row.original.type
          return (
            <Chip
              label={type}
              variant="outlined"
              size="small"
              sx={{
                color: type === 'Earning' ? '#0A8837' : '#D32F2F',
                borderColor: type === 'Earning' ? '#0A8837' : '#D32F2F',
                backgroundColor: type === 'Earning' ? 'rgba(10,136,55,0.08)' : 'rgba(211,47,47,0.08)',
                fontWeight: 600
              }}
            />
          )
        }
      }),

      columnHelper.accessor('calculationType', {
        header: 'Calculation',
        enableSorting: true,
        cell: ({ row }) => {
          const type = row.original.calculationType?.toLowerCase()
          const isPercentage = type?.includes('percentage')
          return (
            <Chip
              label={isPercentage ? 'Percentage' : 'Fixed'}
              size="small"
              sx={{
                backgroundColor: isPercentage ? '#f3e8ff' : '#e0f2ff',
                color: isPercentage ? '#9333ea' : '#0284c7',
                border: `1px solid ${isPercentage ? '#e9d5ff' : '#bae6fd'}`
              }}
            />
          )
        }
      }),

      columnHelper.accessor('percentageOfBasic', {
        header: 'Percentage',
        enableSorting: true,
        cell: ({ row }) => (
          <Typography>
            {row.original.percentageOfBasic ? `${row.original.percentageOfBasic}%` : '-'}
          </Typography>
        )
      }),

      columnHelper.accessor('isTaxable', {
        header: 'Taxable',
        enableSorting: true,
        cell: ({ row }) => <Typography>{row.original.isTaxable === 'Yes' ? 'Yes' : 'No'}</Typography>
      }),

      columnHelper.accessor('isMandatory', {
        header: 'Mandatory',
        enableSorting: true,
        cell: ({ row }) => <Typography>{row.original.isMandatory === 'Yes' ? 'Yes' : 'No'}</Typography>
      }),

      columnHelper.accessor('status', {
        header: 'Status',
        cell: ({ row }) => (
          <Chip
            label={row.original.status}
            size="small"
            color={userStatusObj[row.original.status] || 'secondary'}
            variant="tonal"
            className="capitalize"
          />
        )
      }),

      columnHelper.accessor('action', {
        header: 'Action',
        enableSorting: false,
        cell: ({ row }) => (
          <div className="flex gap-2">
            <IconButton
              onClick={() => {
                setSelectedDepartment(row.original)
                setViewOpen(true)
              }}
            >
              <i className="tabler-eye text-textSecondary" />
            </IconButton>

            <IconButton
              onClick={() => {
                setSelectedDepartment(row.original)
                setEditDrawerOpen(true)
              }}
            >
              <i className="tabler-edit text-textSecondary" />
            </IconButton>
          </div>
        )
      })
    ],
    [data]
  )

  // REACT TABLE
  const table = useReactTable({
    data,
    columns,
    state: { rowSelection, globalFilter },
    filterFns: { fuzzy: fuzzyFilter },
    globalFilterFn: fuzzyFilter,
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    initialState: { pagination: { pageSize: 10 } },
    enableRowSelection: true,
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
        {/* HEADER */}
        <div className="flex justify-between items-start md:items-center p-6 border-bs gap-4 flex-col md:flex-row">
          <CustomTextField
            select
            value={table.getState().pagination.pageSize}
            onChange={e => table.setPageSize(Number(e.target.value))}
            className="sm:is-[70px]"
          >
            <MenuItem value="10">10</MenuItem>
            <MenuItem value="25">25</MenuItem>
            <MenuItem value="50">50</MenuItem>
          </CustomTextField>

          <div className="flex gap-4 flex-col sm:flex-row">
            <DebouncedInput
              value={globalFilter ?? ''}
              onChange={value => setGlobalFilter(String(value))}
              placeholder="Search Salary Component"
            />

            <ExportButton filteredData={filteredDatas} />

            <Button
              variant="contained"
              onClick={() => setAddDrawerOpen(true)}
              startIcon={<i className="tabler-plus" />}
            >
              Add Salary Component
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
                      {!header.isPlaceholder && (
                        <div
                          onClick={header.column.getToggleSortingHandler()}
                          className={classnames({
                            'flex items-center': header.column.getIsSorted(),
                            'cursor-pointer select-none': header.column.getCanSort()
                          })}
                        >
                          {flexRender(header.column.columnDef.header, header.getContext())}
                        </div>
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>

            <tbody>
              {table.getFilteredRowModel().rows.length ? (
                table.getRowModel().rows.map(row => (
                  <tr key={row.id} className={classnames({ selected: row.getIsSelected() })}>
                    {row.getVisibleCells().map(cell => (
                      <td key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={columns.length} className="text-center">
                    No data available
                  </td>
                </tr>
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

      {/* ADD Drawer */}
      <AddDepartmentDrawer
        open={addDrawerOpen}
        handleClose={async () => {
          setAddDrawerOpen(false)
          await refreshDepartments() // 🔥 Auto refresh fixed
        }}
      />

      {/* VIEW Drawer */}
      <ViewDepartment
        open={viewOpen}
        handleClose={() => setViewOpen(false)}
        departmentData={selectedDepartment}
      />

      {/* EDIT Drawer */}
      <EditDepartment
        open={editDrawerOpen}
        handleClose={async () => {
          setEditDrawerOpen(false)
          await refreshDepartments() // 🔥 Auto refresh fixed
        }}
        selectedDepartment={selectedDepartment}
        onSave={handleUpdateDepartment}
      />
    </>
  )
}

export default DepartmentListTable




