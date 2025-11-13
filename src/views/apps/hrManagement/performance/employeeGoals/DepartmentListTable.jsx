

// 'use client'

// // React Imports
// import { useEffect, useState, useMemo } from 'react'

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
// import { fetchEmployeeGoal, editEmployeeGoal } from '../../../../../app/server/actions'

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
//     const res = await fetchEmployeeGoal()
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


//        columnHelper.accessor('goalTitle', {
//         header: 'Title',
//           enableSorting: true,
//         cell: ({ row }) => (
//           <Typography color='text.primary'>{row.original.goalTitle}</Typography>
//         )
//       }),
//       columnHelper.accessor('employeeName', {
//         header: 'Employee',
//           enableSorting: true,
//         cell: ({ row }) => (
//           <Typography color='text.primary' className='font-medium'>
//             {row.original.employeeName}
//           </Typography>
//         )
//       }),

//       columnHelper.accessor('goalTypeName', {
//         header: 'Goal Type',
//           enableSorting: true,
//         cell: ({ row }) => (
//           <Typography color='text.primary' className='capitalize'>
//             {row.original.goalTypeName}
//           </Typography>
//         )
//       }),

     

//       columnHelper.accessor('target', {
//         header: 'Target',
//         enableSorting: true,
//         cell: ({ row }) => (
//           <Typography color='text.primary'>{row.original.target}</Typography>
//         )
//       }),

//       columnHelper.accessor('progress', {
//         header: 'Progress',
//         enableSorting: true,
//         cell: ({ row }) => (
//           <Typography color='text.primary'>{row.original.progress}%</Typography>
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
//               onClick={() => {
//                 setSelectedGoal(row.original)
//                 setViewOpen(true)
//               }}
//             >
//               <i className='tabler-eye text-textSecondary' />
//             </IconButton>

//             {/* <IconButton
//               onClick={() => {
//                 setSelectedGoal(row.original)
//                 setEditOpen(true)
//               }}
//             >
//               <i className='tabler-edit text-textSecondary' />
//             </IconButton> */}
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
//               placeholder='Search Employee Goal'
//               className='max-sm:is-full'
//             />

//             <ExportButton filteredData={filteredRows} />

//             <Button
//               variant='contained'
//               startIcon={<i className='tabler-plus' />}
//               onClick={() => setAddOpen(true)}
//               className='max-sm:is-full'
//             >
//               Add Employee Goal
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
//                     No goals found
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

//       {/* ➕ Add Goal Drawer */}
//       <AddEmployeeGoalDrawer
//         open={addOpen}
//         handleClose={() => setAddOpen(false)}
//         refreshDepartments={refreshGoals}
//       />

//       {/* 👁️ View Goal Drawer */}
//       <ViewEmployeeGoal
//         open={viewOpen}
//         handleClose={() => setViewOpen(false)}
//         goalData={selectedGoal}
//       />

//       {/* ✏️ Edit Goal Drawer (optional) */}
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
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import Checkbox from '@mui/material/Checkbox'
import IconButton from '@mui/material/IconButton'
import MenuItem from '@mui/material/MenuItem'
import TablePagination from '@mui/material/TablePagination'
import { styled } from '@mui/material/styles'
import classnames from 'classnames'
import { rankItem } from '@tanstack/match-sorter-utils'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
  getSortedRowModel,
  getPaginationRowModel
} from '@tanstack/react-table'

import AddEmployeeGoalDrawer from './AddDepartmentDrawer'
import ViewEmployeeGoal from './ViewDepartment'
import EditDepartment from './EditDepartment'
import ExportButton from '../../../../../@menu/components/tables/ExportButton'
import CustomTextField from '@core/components/mui/TextField'
import TablePaginationComponent from '@components/TablePaginationComponent'

import { fetchEmployeeGoal, editEmployeeGoal } from '../../../../../app/server/actions'
import tableStyles from '@core/styles/table.module.css'

const DebouncedInput = ({ value: initialValue, onChange, debounce = 500, ...props }) => {
  const [value, setValue] = useState(initialValue)

  useEffect(() => setValue(initialValue), [initialValue])

  useEffect(() => {
    const timeout = setTimeout(() => onChange(value), debounce)
    return () => clearTimeout(timeout)
  }, [value, onChange, debounce])

  return <CustomTextField {...props} value={value} onChange={e => setValue(e.target.value)} />
}

const fuzzyFilter = (row, columnId, value, addMeta) => {
  const itemRank = rankItem(row.getValue(columnId), value)
  addMeta({ itemRank })
  return itemRank.passed
}

const statusColorMap = {
  'Not Started': 'secondary',
  'In Progress': 'warning',
  Completed: 'success'
}

const columnHelper = createColumnHelper()

export default function DepartmentListTable({ tableData }) {
  const [data, setData] = useState(tableData || [])
  const [addOpen, setAddOpen] = useState(false)
  const [viewOpen, setViewOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [selectedGoal, setSelectedGoal] = useState(null)
  const [globalFilter, setGlobalFilter] = useState('')
  const [rowSelection, setRowSelection] = useState({})

  // ⭐ Correct auto-refresh
  const refreshGoals = async () => {
    try {
      const res = await fetchEmployeeGoal()   // res = array
      setData(Array.isArray(res) ? res : [])
    } catch (e) {
      console.error('Refresh Error:', e)
    }
  }

  const handleUpdateGoal = async updatedData => {
    await editEmployeeGoal(updatedData)
    await refreshGoals()
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
            onChange={row.getToggleSelectedHandler()}
          />
        )
      },

      columnHelper.accessor('goalTitle', {
        header: 'Title',
        cell: ({ row }) => <Typography>{row.original.goalTitle}</Typography>
      }),

      columnHelper.accessor('employeeName', {
        header: 'Employee',
        cell: ({ row }) => <Typography>{row.original.employeeName}</Typography>
      }),

      columnHelper.accessor('goalTypeName', {
        header: 'Goal Type',
        cell: ({ row }) => <Typography>{row.original.goalTypeName}</Typography>
      }),

      columnHelper.accessor('target', {
        header: 'Target',
        cell: ({ row }) => <Typography>{row.original.target}</Typography>
      }),

      columnHelper.accessor('progress', {
        header: 'Progress',
        cell: ({ row }) => <Typography>{row.original.progress}%</Typography>
      }),

      columnHelper.accessor('status', {
        header: 'Status',
        cell: ({ row }) => (
          <Chip
            size='small'
            variant='tonal'
            color={statusColorMap[row.original.status]}
            label={row.original.status}
          />
        )
      }),

      columnHelper.accessor('createdAt', {
        header: 'Created At',
        cell: ({ row }) => (
          <Typography>
            {new Date(row.original.createdAt).toLocaleDateString('en-GB')}
          </Typography>
        )
      }),

      columnHelper.accessor('action', {
        header: 'Action',
        cell: ({ row }) => (
          <div className='flex gap-2'>
            <IconButton
              onClick={() => {
                setSelectedGoal(row.original)
                setViewOpen(true)
              }}
            >
              <i className='tabler-eye text-textSecondary' />
            </IconButton>

            {/* <IconButton
              onClick={() => {
                setSelectedGoal(row.original)
                setEditOpen(true)
              }}
            >
              <i className='tabler-edit text-textSecondary' />
            </IconButton> */}
          </div>
        )
      })
    ],
    [data]
  )

  const table = useReactTable({
    data,
    columns,
    filterFns: { fuzzy: fuzzyFilter },
    state: { rowSelection, globalFilter },
    globalFilterFn: fuzzyFilter,
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    initialState: { pagination: { pageSize: 10 } },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel()
  })

  const filteredRows = table.getFilteredRowModel().rows.map(r => r.original)

  return (
    <>
      <Card>
        {/* HEADER */}
        <div className='flex justify-between p-6 border-bs flex-col md:flex-row gap-4'>
          <CustomTextField
            select
            value={table.getState().pagination.pageSize}
            onChange={e => table.setPageSize(Number(e.target.value))}
          >
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={25}>25</MenuItem>
            <MenuItem value={50}>50</MenuItem>
          </CustomTextField>

          <div className='flex gap-4 flex-col sm:flex-row'>
            <DebouncedInput
              value={globalFilter}
              onChange={v => setGlobalFilter(String(v))}
              placeholder='Search Employee Goal'
            />

            <ExportButton filteredData={filteredRows} />

            <Button
              variant='contained'
              startIcon={<i className='tabler-plus' />}
              onClick={() => setAddOpen(true)}
            >
              Add Employee Goal
            </Button>
          </div>
        </div>

        {/* TABLE */}
        <div className='overflow-x-auto'>
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
              {filteredRows.length === 0 ? (
                <tr>
                  <td colSpan={columns.length} className='text-center'>
                    No goals found
                  </td>
                </tr>
              ) : (
                table.getRowModel().rows.map(row => (
                  <tr key={row.id}>
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
          rowsPerPage={table.getState().pagination.pageSize}
          page={table.getState().pagination.pageIndex}
          count={filteredRows.length}
          onPageChange={(_, page) => table.setPageIndex(page)}
        />
      </Card>

      {/* ADD Drawer */}
      <AddEmployeeGoalDrawer
        open={addOpen}
        handleClose={async () => {
          setAddOpen(false)
          await refreshGoals()   // ⭐ WORKING
        }}
      />

      {/* VIEW Drawer */}
      <ViewEmployeeGoal
        open={viewOpen}
        goalData={selectedGoal}
        handleClose={async () => {
          setViewOpen(false)
          await refreshGoals()   // ⭐ WORKING
        }}
      />

      {/* EDIT Drawer */}
      <EditDepartment
        open={editOpen}
        selectedDepartment={selectedGoal}
        onSave={handleUpdateGoal}
        handleClose={async () => {
          setEditOpen(false)
          await refreshGoals()   // ⭐ WORKING
        }}
      />
    </>
  )
}
