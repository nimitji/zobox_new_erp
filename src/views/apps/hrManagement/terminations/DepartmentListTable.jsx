

// 'use client'

// // 📦 React Imports
// import { useEffect, useState, useMemo } from 'react'

// // 🧭 Next Imports
// import { useParams } from 'next/navigation'

// // 🎨 MUI Imports
// import Card from '@mui/material/Card'
// import Button from '@mui/material/Button'
// import Typography from '@mui/material/Typography'
// import Chip from '@mui/material/Chip'
// import Checkbox from '@mui/material/Checkbox'
// import IconButton from '@mui/material/IconButton'
// import MenuItem from '@mui/material/MenuItem'
// import TablePagination from '@mui/material/TablePagination'
// import { styled } from '@mui/material/styles'

// // 🧩 Components
// import ExportButton from '../../../../@menu/components/tables/ExportButton'
// import TablePaginationComponent from '@components/TablePaginationComponent'
// import CustomTextField from '@core/components/mui/TextField'
// import CustomAvatar from '@core/components/mui/Avatar'
// import AddDepartmentDrawer from './AddDepartmentDrawer'
// import ViewDepartment from './ViewDepartment'
// import EditDepartment from './EditDepartment'

// // ⚙️ Utils
// import { getInitials } from '@/utils/getInitials'
// import tableStyles from '@core/styles/table.module.css'

// // 🧠 Server Actions
// import { fetchTermination, editDepartment } from '../../../../app/server/actions'

// // 🧰 Third-party Imports
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

// // 🧩 Styled Icon
// const Icon = styled('i')({})

// // 🧠 Fuzzy Filter
// const fuzzyFilter = (row, columnId, value, addMeta) => {
//   const itemRank = rankItem(row.getValue(columnId), value)
//   addMeta({ itemRank })
//   return itemRank.passed
// }

// // ⏱ Debounced Input Component
// const DebouncedInput = ({ value: initialValue, onChange, debounce = 500, ...props }) => {
//   const [value, setValue] = useState(initialValue)

//   useEffect(() => setValue(initialValue), [initialValue])

//   useEffect(() => {
//     const timeout = setTimeout(() => onChange(value), debounce)
//     return () => clearTimeout(timeout)
//   }, [value, debounce, onChange])

//   return <CustomTextField {...props} value={value} onChange={e => setValue(e.target.value)} />
// }

// // 🧩 Status Colors
// const userStatusObj = {
//   'In Progress': 'warning',
//   'Completed': 'success',
//   'Approved': 'success',
//   'Pending': 'warning',
//   'Rejected': 'error',
//   'Active': 'success'
// }

// const columnHelper = createColumnHelper()

// // 🧾 Main Component
// const DepartmentListTable = ({ tableData }) => {
//   const [data, setData] = useState(tableData || [])
//   const [filteredData, setFilteredData] = useState(data)
//   const [globalFilter, setGlobalFilter] = useState('')
//   const [rowSelection, setRowSelection] = useState({})

//   // Drawer States
//   const [addOpen, setAddOpen] = useState(false)
//   const [viewOpen, setViewOpen] = useState(false)
//   const [editOpen, setEditOpen] = useState(false)
//   const [selectedRecord, setSelectedRecord] = useState(null)

//   const { lang: locale } = useParams()

//   // 🔄 Refresh Termination List
//   // const refreshTerminations = async () => {
//   //   const res = await fetchTermination()
//   //   setData(res)
//   //   setFilteredData(res)
//   // }

//   const refreshTerminations = async () => {
//   const res = await fetchTermination()
//   if (res?.success && Array.isArray(res.data)) {
//     setData(res.data)
//     setFilteredData(res.data)
//   } else {
//     console.error('Invalid data format from API:', res)
//     setData([])
//   }
// }


//   // ✏️ Handle Edit Save
//   const handleUpdate = async updatedData => {
//     try {
//       await editDepartment(updatedData)
//       await refreshTerminations()
//     } catch (error) {
//       console.error('Error updating termination:', error)
//     }
//   }

//   // 🧱 Columns
//   const columns = useMemo(
//     () => [
//       // ✅ Selection Checkbox
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
//       columnHelper.accessor('employeeName', {
//         header: 'Employee',
//         enableSorting: true,
//         cell: ({ row }) => (
//           <Typography color='text.primary' className='font-medium'>
//             {row.original.employeeName}
//           </Typography>
//         )
//       }),

//       // 🔖 Type
//       columnHelper.accessor('terminationType', {
//         header: 'Type',
//         enableSorting: true,
//         cell: ({ row }) => (
//           <Typography className='capitalize' color='text.primary'>
//             {row.original.terminationType}
//           </Typography>
//         )
//       }),

//       // 📅 Termination Date
//       columnHelper.accessor('terminationDate', {
//         header: 'Termination Date',
//         enableSorting: true,
//         cell: ({ row }) => <Typography>{row.original.terminationDate}</Typography>
//       }),

//       // 📆 Notice Date
//       columnHelper.accessor('noticeDate', {
//         header: 'Notice Date',
//         enableSorting: true,
//         cell: ({ row }) => <Typography>{row.original.noticeDate}</Typography>
//       }),

//       // 📝 Reason
//       columnHelper.accessor('reason', {
//         header: 'Reason',
//         enableSorting: true,
//         cell: ({ row }) => <Typography>{row.original.reason}</Typography>
//       }),

//       // 📊 Status
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

//       // 📎 Document
//       columnHelper.accessor('document', {
//         header: 'Document',
//         cell: ({ row }) => (
//           <Typography color='primary'>
//             <a href={row.original.document} target='_blank' rel='noopener noreferrer'>
//               View Document
//             </a>
//           </Typography>
//         )
//       }),

//       // 🗓 Created At
//       columnHelper.accessor('createdAt', {
//         header: 'Created At',
//         enableSorting: true,
//         cell: ({ row }) => {
//           const formattedDate = new Date(row.original.createdAt).toLocaleDateString('en-GB', {
//             day: '2-digit',
//             month: 'short',
//             year: 'numeric'
//           })
//           return <Typography>{formattedDate}</Typography>
//         }
//       }),

//       // ⚙️ Actions
//       columnHelper.accessor('action', {
//         header: 'Actions',
//         enableSorting: false,
//         cell: ({ row }) => (
//           <div className='flex items-center'>
//             <IconButton
//               onClick={() => {
//                 setSelectedRecord(row.original)
//                 setViewOpen(true)
//               }}
//             >
//               <i className='tabler-eye text-textSecondary' />
//             </IconButton>

//             <IconButton
//               onClick={() => {
//                 setSelectedRecord(row.original)
//                 setEditOpen(true)
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

//   // ⚙️ React Table Config
//   const table = useReactTable({
//     data,
//     columns,
//     filterFns: { fuzzy: fuzzyFilter },
//     state: { rowSelection, globalFilter },
//     onRowSelectionChange: setRowSelection,
//     onGlobalFilterChange: setGlobalFilter,
//     globalFilterFn: fuzzyFilter,
//     getCoreRowModel: getCoreRowModel(),
//     getFilteredRowModel: getFilteredRowModel(),
//     getSortedRowModel: getSortedRowModel(),
//     getPaginationRowModel: getPaginationRowModel(),
//     getFacetedRowModel: getFacetedRowModel(),
//     getFacetedUniqueValues: getFacetedUniqueValues(),
//     getFacetedMinMaxValues: getFacetedMinMaxValues(),
//     initialState: { pagination: { pageSize: 10 } },
//     enableRowSelection: true
//   })

//   const filteredRows = table.getFilteredRowModel().rows.map(row => row.original)

//   return (
//     <>
//       <Card>
//         {/* 🔍 Filters + Add Button */}
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

//           <div className='flex flex-col sm:flex-row gap-4'>
//             <DebouncedInput
//               value={globalFilter ?? ''}
//               onChange={val => setGlobalFilter(String(val))}
//               placeholder='Search Termination'
//             />
//             <ExportButton filteredData={filteredRows} />
//             <Button
//               variant='contained'
//               startIcon={<i className='tabler-plus' />}
//               onClick={() => setAddOpen(true)}
//             >
//               Add Termination
//             </Button>
//           </div>
//         </div>

//         {/* 📋 Table */}
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
//                         <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
//                       ))}
//                     </tr>
//                   ))
//               )}
//             </tbody>
//           </table>
//         </div>

//         {/* 🔄 Pagination */}
//         <TablePagination
//           component={() => <TablePaginationComponent table={table} />}
//           count={table.getFilteredRowModel().rows.length}
//           rowsPerPage={table.getState().pagination.pageSize}
//           page={table.getState().pagination.pageIndex}
//           onPageChange={(_, page) => table.setPageIndex(page)}
//         />
//       </Card>

//       {/* ➕ Add / 👁 View / ✏️ Edit Drawers */}
//       <AddDepartmentDrawer open={addOpen} handleClose={() => setAddOpen(false)} refreshDepartments={refreshTerminations} />
//       <ViewDepartment open={viewOpen} handleClose={() => setViewOpen(false)} departmentData={selectedRecord} />
//       <EditDepartment open={editOpen} handleClose={() => setEditOpen(false)} selectedDepartment={selectedRecord} onSave={handleUpdate} />
//     </>
//   )
// }

// export default DepartmentListTable

'use client'

// 📦 React Imports
import { useEffect, useState, useMemo } from 'react'

// 🧭 Next Imports
import { useParams } from 'next/navigation'

// 🎨 MUI Imports
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import Checkbox from '@mui/material/Checkbox'
import IconButton from '@mui/material/IconButton'
import MenuItem from '@mui/material/MenuItem'
import TablePagination from '@mui/material/TablePagination'
import { styled } from '@mui/material/styles'

// 🧩 Components
import ExportButton from '../../../../@menu/components/tables/ExportButton'
import TablePaginationComponent from '@components/TablePaginationComponent'
import CustomTextField from '@core/components/mui/TextField'
import AddDepartmentDrawer from './AddDepartmentDrawer'
import ViewDepartment from './ViewDepartment'
import EditDepartment from './EditDepartment'

// ⚙️ Utils
import tableStyles from '@core/styles/table.module.css'

// 🧠 Server Actions
import { fetchTermination, editDepartment } from '../../../../app/server/actions'

// 🧰 Third-party Imports
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

// 🧩 Styled Icon
const Icon = styled('i')({})

// 🧠 Fuzzy Filter
const fuzzyFilter = (row, columnId, value, addMeta) => {
  const itemRank = rankItem(row.getValue(columnId), value)
  addMeta({ itemRank })
  return itemRank.passed
}

// ⏱ Debounced Input Component
const DebouncedInput = ({ value: initialValue, onChange, debounce = 500, ...props }) => {
  const [value, setValue] = useState(initialValue)

  useEffect(() => setValue(initialValue), [initialValue])

  useEffect(() => {
    const timeout = setTimeout(() => onChange(value), debounce)
    return () => clearTimeout(timeout)
  }, [value, debounce, onChange])

  return <CustomTextField {...props} value={value} onChange={e => setValue(e.target.value)} />
}

// 🧩 Status Colors
const userStatusObj = {
  'In Progress': 'warning',
  'Completed': 'success',
  'Approved': 'success',
  'Pending': 'warning',
  'Rejected': 'error',
  'Active': 'success'
}

const columnHelper = createColumnHelper()

// 🧾 Main Component
const DepartmentListTable = ({ tableData }) => {
  const [data, setData] = useState(tableData || [])
  const [globalFilter, setGlobalFilter] = useState('')
  const [rowSelection, setRowSelection] = useState({})

  // Drawer States
  const [addOpen, setAddOpen] = useState(false)
  const [viewOpen, setViewOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [selectedRecord, setSelectedRecord] = useState(null)

  const { lang: locale } = useParams()

  // 🔄 Refresh Termination List
  const refreshTerminations = async () => {
    try {
      const res = await fetchTermination()
      if (res?.success && Array.isArray(res.data)) {
        setData(res.data)
      } else {
        console.error('Invalid data format from API:', res)
        setData([])
      }
    } catch (err) {
      console.error('Error fetching terminations:', err)
      setData([])
    }
  }

  // 🕒 Fetch data on mount
  useEffect(() => {
    refreshTerminations()
  }, [])

  // ✏️ Handle Edit Save
  const handleUpdate = async updatedData => {
    try {
      await editDepartment(updatedData)
      await refreshTerminations()
    } catch (error) {
      console.error('Error updating termination:', error)
    }
  }

  // 🧱 Columns
  const columns = useMemo(
    () => [
      // ✅ Selection Checkbox
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

      // 🧍 Employee
      columnHelper.accessor('employeeName', {
        header: 'Employee',
        enableSorting: true,
        cell: ({ row }) => (
          <Typography color='text.primary' className='font-medium'>
            {row.original.employeeName || '—'}
          </Typography>
        )
      }),

      // 🔖 Type
      columnHelper.accessor('terminationType', {
        header: 'Type',
        enableSorting: true,
        cell: ({ row }) => (
          <Typography className='capitalize' color='text.primary'>
            {row.original.terminationType || '—'}
          </Typography>
        )
      }),

      // 📅 Termination Date
      columnHelper.accessor('terminationDate', {
        header: 'Termination Date',
        enableSorting: true,
        cell: ({ row }) => (
          <Typography>{row.original.terminationDate || '—'}</Typography>
        )
      }),

      // 📆 Notice Date
      columnHelper.accessor('noticeDate', {
        header: 'Notice Date',
        enableSorting: true,
        cell: ({ row }) => (
          <Typography>{row.original.noticeDate || '—'}</Typography>
        )
      }),

      // 📝 Reason
      columnHelper.accessor('reason', {
        header: 'Reason',
        enableSorting: true,
        cell: ({ row }) => (
          <Typography>{row.original.reason || '—'}</Typography>
        )
      }),

      // 📊 Status
      columnHelper.accessor('status', {
        header: 'Status',
        enableSorting: true,
        cell: ({ row }) => (
          <Chip
            variant='tonal'
            label={row.original.status || 'Pending'}
            size='small'
            color={userStatusObj[row.original.status] || 'secondary'}
            className='capitalize'
          />
        )
      }),

     
      columnHelper.accessor('document', {
  header: 'Document',
  cell: ({ row }) =>
    row.original.document ? (
      <Button
        variant='outlined'
        size='small'
        color='primary'
        sx={{
          textTransform: 'none',
          borderRadius: '8px',
          fontWeight: 500,
          px: 2,
          py: 0.5
        }}
        href={row.original.document}
        target='_blank'
        rel='noopener noreferrer'
      >
        View Document
      </Button>
    ) : (
      <Typography color='text.secondary'>—</Typography>
    )
}),


      // 🗓 Created At
      columnHelper.accessor('createdAt', {
        header: 'Created At',
        enableSorting: true,
        cell: ({ row }) => {
          if (!row.original.createdAt) return '—'
          const formattedDate = new Date(row.original.createdAt).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
          })
          return <Typography>{formattedDate}</Typography>
        }
      }),

      // ⚙️ Actions
      columnHelper.accessor('action', {
        header: 'Actions',
        enableSorting: false,
        cell: ({ row }) => (
          <div className='flex items-center'>
            {/* <IconButton
              onClick={() => {
                setSelectedRecord(row.original)
                setViewOpen(true)
              }}
            >
              <i className='tabler-eye text-textSecondary' />
            </IconButton> */}


            {/* <IconButton
              onClick={() => {
                setSelectedDepartment(row.original)  // 👈 branch ka data store karega
                setViewOpen(true)                // 👈 drawer open karega
              }}
            >
              <i className='tabler-eye text-textSecondary' />
            </IconButton> */}
            <IconButton
  onClick={() => {
    setSelectedRecord(row.original)  // ✅ correct function
    setViewOpen(true)
  }}
>
  <i className='tabler-eye text-textSecondary' />
</IconButton>


            {/* <IconButton
              onClick={() => {
                setSelectedRecord(row.original)
                setEditOpen(true)
              }}
            >
              <i className='tabler-edit text-textSecondary' />
            </IconButton> */}
          </div>
        )
      })
    ],
    []
  )

  // ⚙️ React Table Config
  const table = useReactTable({
    data,
    columns,
    filterFns: { fuzzy: fuzzyFilter },
    state: { rowSelection, globalFilter },
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: fuzzyFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    initialState: { pagination: { pageSize: 10 } },
    enableRowSelection: true
  })

  const filteredRows = table.getFilteredRowModel().rows.map(row => row.original)

  return (
    <>
      <Card>
        {/* 🔍 Filters + Add Button */}
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

          <div className='flex flex-col sm:flex-row gap-4'>
            <DebouncedInput
              value={globalFilter ?? ''}
              onChange={val => setGlobalFilter(String(val))}
              placeholder='Search Termination'
            />
            <ExportButton filteredData={filteredRows} />
            <Button
              variant='contained'
              startIcon={<i className='tabler-plus' />}
              onClick={() => setAddOpen(true)}
            >
              Add Termination
            </Button>
          </div>
        </div>

        {/* 📋 Table */}
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
                table.getRowModel().rows.map(row => (
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

        {/* 🔄 Pagination */}
        <TablePagination
          component={() => <TablePaginationComponent table={table} />}
          count={table.getFilteredRowModel().rows.length}
          rowsPerPage={table.getState().pagination.pageSize}
          page={table.getState().pagination.pageIndex}
          onPageChange={(_, page) => table.setPageIndex(page)}
        />
      </Card>

      {/* ➕ Add / 👁 View / ✏️ Edit Drawers */}
      <AddDepartmentDrawer
        open={addOpen}
        handleClose={() => setAddOpen(false)}
        refreshDepartments={refreshTerminations}
      />
      <ViewDepartment
        open={viewOpen}
        handleClose={() => setViewOpen(false)}
        departmentData={selectedRecord}
      />
      <EditDepartment
        open={editOpen}
        handleClose={() => setEditOpen(false)}
        selectedDepartment={selectedRecord}
        onSave={handleUpdate}
      />
    </>
  )
}

export default DepartmentListTable




