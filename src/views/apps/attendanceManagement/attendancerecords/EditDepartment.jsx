


// // 'use client'

// // import { useEffect, useState } from 'react'

// // // 📦 MUI Imports
// // import Drawer from '@mui/material/Drawer'
// // import Typography from '@mui/material/Typography'
// // import Divider from '@mui/material/Divider'
// // import Button from '@mui/material/Button'
// // import IconButton from '@mui/material/IconButton'
// // import Grid from '@mui/material/Grid'
// // import MenuItem from '@mui/material/MenuItem'
// // import Box from '@mui/material/Box'
// // import Snackbar from '@mui/material/Snackbar'
// // import Alert from '@mui/material/Alert'
// // import TextField from '@mui/material/TextField'

// // // 📦 Server Action Imports
// // import { fetchListOfUser } from '../../../../app/server/actions.js'

// // const EditDepartment = ({ open, handleClose, selectedDepartment, onSave }) => {
// //   const [formData, setFormData] = useState({
// //     _id: '',
// //     employeeId: '',
// //     employee: '',
// //     date:'',
// //     clockIn:'',
// //    clockOut:'',
// //    breakHours:'',
// //    status: 'Active',
// //    isHoliday:'',
// //    notes:''
// //   })

// //   const [employees, setEmployees] = useState([])
// //   const [loadingEmployees, setLoadingEmployees] = useState(true)

// //   const [snackbar, setSnackbar] = useState({
// //     open: false,
// //     message: '',
// //     severity: 'success'
// //   })

// //   // ✅ Snackbar close
// //   const handleSnackbarClose = () => setSnackbar(prev => ({ ...prev, open: false }))

// //   // ✅ Fetch employee list
// //   useEffect(() => {
// //     const loadEmployees = async () => {
// //       try {
// //         const res = await fetchListOfUser()
// //         if (res?.success && Array.isArray(res.data)) {
// //           setEmployees(res.data)
// //         } else if (Array.isArray(res)) {
// //           setEmployees(res)
// //         } else {
// //           console.warn('Invalid employee data format:', res)
// //         }
// //       } catch (err) {
// //         console.error('Error fetching employees:', err)
// //       } finally {
// //         setLoadingEmployees(false)
// //       }
// //     }

// //     loadEmployees()
// //   }, [])

// //   // ✅ Load selected record
// //   useEffect(() => {
// //     if (selectedDepartment) {
// //       setFormData({
// //         _id: selectedDepartment._id || '',
// //         employeeId: selectedDepartment.employeeId || '',
// //         employee: selectedDepartment.employee || '',
// //         date:selectedDepartment.date || '',
// //         clockIn:selectedDepartment.clockIn || '',
// //         clockOut:selectedDepartment.clockOut || '',
// //         breakHours:selectedDepartment.breakHours || '',
// //          status: selectedDepartment.status || 'Active',
// //          isHoliday:selectedDepartment.isHoliday || '',
// //           notes:selectedDepartment.notes || '',
        
       
// //       })
// //     }
// //   }, [selectedDepartment])

// //   // ✅ Save handler
// //   const handleSave = async () => {
// //     try {
// //       const res = await onSave(formData)
// //       setSnackbar({
// //         open: true,
// //         message: res?.message || 'Record updated successfully!',
// //         severity: res?.success ? 'success' : 'error'
// //       })
// //       if (res?.success) handleClose()
// //     } catch (error) {
// //       console.error(error)
// //       setSnackbar({
// //         open: true,
// //         message: 'Something went wrong!',
// //         severity: 'error'
// //       })
// //     }
// //   }

// //   return (
// //     <>
// //       <Drawer
// //         open={open}
// //         anchor='right'
// //         variant='temporary'
// //         onClose={handleClose}
// //         ModalProps={{ keepMounted: true }}
// //         sx={{
// //           '& .MuiDrawer-paper': { width: { xs: 320, sm: 420 } }
// //         }}
// //       >
// //         <div className='flex items-center justify-between plb-5 pli-6'>
// //           <Typography variant='h5' sx={{ fontWeight: 600 }}>
// //             Edit Attendance Record
// //           </Typography>
// //           <IconButton size='small' onClick={handleClose}>
// //             <i className='tabler-x text-2xl text-textPrimary' />
// //           </IconButton>
// //         </div>

// //         <Divider />

// //         <Box sx={{ p: 6 }}>
// //           <form className='flex flex-col gap-5'>
// //             <Grid container spacing={4}>
// //               {/* Employee Dropdown */}
// //               <Grid item xs={12}>
// //                 <TextField
// //                   select
// //                   label='Employee'
// //                   fullWidth
// //                   value={formData.employeeId || ''}
// //                   onChange={e => {
// //                     const selectedEmployee = employees.find(emp => emp._id === e.target.value)
// //                     setFormData(prev => ({
// //                       ...prev,
// //                       employeeId: selectedEmployee?._id || '',
// //                       employee: selectedEmployee?.username || ''
// //                     }))
// //                   }}
// //                 >
// //                   {loadingEmployees ? (
// //                     <MenuItem disabled>Loading employees...</MenuItem>
// //                   ) : employees.length > 0 ? (
// //                     employees.map(emp => (
// //                       <MenuItem key={emp._id} value={emp._id}>
// //                         {emp.username}
// //                       </MenuItem>
// //                     ))
// //                   ) : (
// //                     <MenuItem disabled>No employees found</MenuItem>
// //                   )}
// //                 </TextField>
// //               </Grid>

// //               {/* Description */}
// //               <Grid item xs={12}>
// //                 <TextField
// //                   label='Description'
// //                   fullWidth
// //                   value={formData.description}
// //                   onChange={e => setFormData({ ...formData, description: e.target.value })}
// //                 />
// //               </Grid>

// //               {/* Status */}
// //               <Grid item xs={12}>
// //                 <TextField
// //                   select
// //                   label='Status'
// //                   fullWidth
// //                   value={formData.status}
// //                   onChange={e => setFormData({ ...formData, status: e.target.value })}
// //                 >
// //                   <MenuItem value='Active'>Active</MenuItem>
// //                   <MenuItem value='Inactive'>Inactive</MenuItem>
// //                 </TextField>
// //               </Grid>
// //             </Grid>

// //             <div className='flex items-center gap-4 mt-4'>
// //               <Button variant='contained' onClick={handleSave}>
// //                 Save Changes
// //               </Button>
// //               <Button variant='tonal' color='error' onClick={handleClose}>
// //                 Cancel
// //               </Button>
// //             </div>
// //           </form>
// //         </Box>
// //       </Drawer>

// //       {/* ✅ Snackbar */}
// //       <Snackbar
// //         open={snackbar.open}
// //         autoHideDuration={3000}
// //         onClose={handleSnackbarClose}
// //         anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
// //       >
// //         <Alert
// //           onClose={handleSnackbarClose}
// //           severity={snackbar.severity}
// //           variant='filled'
// //           sx={{
// //             backgroundColor: snackbar.severity === 'success' ? '#2B3380' : '#d32f2f',
// //             color: 'white',
// //             fontWeight: 500
// //           }}
// //         >
// //           {snackbar.message}
// //         </Alert>
// //       </Snackbar>
// //     </>
// //   )
// // }

// // export default EditDepartment


// // 'use client'

// // import { useEffect, useState } from 'react'

// // // 📦 MUI Imports
// // import Drawer from '@mui/material/Drawer'
// // import Typography from '@mui/material/Typography'
// // import Divider from '@mui/material/Divider'
// // import Button from '@mui/material/Button'
// // import IconButton from '@mui/material/IconButton'
// // import Grid from '@mui/material/Grid'
// // import MenuItem from '@mui/material/MenuItem'
// // import Box from '@mui/material/Box'
// // import Snackbar from '@mui/material/Snackbar'
// // import Alert from '@mui/material/Alert'
// // import TextField from '@mui/material/TextField'

// // // 🗓️ MUI X Date & Time Pickers
// // import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
// // import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
// // import { TimePicker } from '@mui/x-date-pickers/TimePicker'
// // import { DatePicker } from '@mui/x-date-pickers/DatePicker'
// // import dayjs from 'dayjs'

// // // 📦 Server Action Imports
// // import { fetchListOfUser } from '../../../../app/server/actions.js'

// // const EditDepartment = ({ open, handleClose, selectedDepartment, onSave }) => {
// //   const [formData, setFormData] = useState({
// //     _id: '',
// //     employeeId: '',
// //     employee: '',
// //     date: '',
// //     clockIn: '',
// //     clockOut: '',
// //     breakHours: '',
// //     status: 'Present',
// //     isHoliday: false,
// //     notes: ''
// //   })

// //   const [employees, setEmployees] = useState([])
// //   const [loadingEmployees, setLoadingEmployees] = useState(true)
// //   const [snackbar, setSnackbar] = useState({
// //     open: false,
// //     message: '',
// //     severity: 'success'
// //   })

// //   // ✅ Snackbar close
// //   const handleSnackbarClose = () => setSnackbar(prev => ({ ...prev, open: false }))

// //   // ✅ Fetch employee list
// //   useEffect(() => {
// //     const loadEmployees = async () => {
// //       try {
// //         const res = await fetchListOfUser()
// //         if (res?.success && Array.isArray(res.data)) {
// //           setEmployees(res.data)
// //         } else if (Array.isArray(res)) {
// //           setEmployees(res)
// //         } else {
// //           console.warn('Invalid employee data format:', res)
// //         }
// //       } catch (err) {
// //         console.error('Error fetching employees:', err)
// //       } finally {
// //         setLoadingEmployees(false)
// //       }
// //     }

// //     loadEmployees()
// //   }, [])

// //   // ✅ Load selected record
// //   useEffect(() => {
// //     if (selectedDepartment) {
// //       setFormData({
// //         _id: selectedDepartment._id || '',
// //         employeeId: selectedDepartment.employeeId || '',
// //         employee: selectedDepartment.employee || '',
// //         date: selectedDepartment.date || '',
// //         clockIn: selectedDepartment.clockIn || '',
// //         clockOut: selectedDepartment.clockOut || '',
// //         breakHours: selectedDepartment.breakHours || '',
// //         status: selectedDepartment.status || 'Present',
// //         isHoliday: selectedDepartment.isHoliday || false,
// //         notes: selectedDepartment.notes || ''
// //       })
// //     }
// //   }, [selectedDepartment])

// //   // ✅ Reusable Time Picker
// //   const renderTimePicker = (label, fieldName) => (
// //     <LocalizationProvider dateAdapter={AdapterDayjs}>
// //       <TimePicker
// //         label={label}
// //         value={formData[fieldName] ? dayjs(formData[fieldName], 'HH:mm') : null}
// //         onChange={newValue =>
// //           setFormData({
// //             ...formData,
// //             [fieldName]:
// //               newValue && dayjs(newValue).isValid()
// //                 ? dayjs(newValue).format('HH:mm')
// //                 : ''
// //           })
// //         }
// //         slots={{ textField: TextField }}
// //         slotProps={{
// //           textField: {
// //             fullWidth: true,
// //             variant: 'outlined'
// //           }
// //         }}
// //       />
// //     </LocalizationProvider>
// //   )

// //   // ✅ Save handler
// //   const handleSave = async () => {
// //     try {
// //       const res = await onSave(formData)
// //       setSnackbar({
// //         open: true,
// //         message: res?.message || 'Record updated successfully!',
// //         severity: res?.success ? 'success' : 'error'
// //       })
// //       if (res?.success) handleClose()
// //     } catch (error) {
// //       console.error(error)
// //       setSnackbar({
// //         open: true,
// //         message: 'Something went wrong!',
// //         severity: 'error'
// //       })
// //     }
// //   }

// //   return (
// //     <>
// //       <Drawer
// //         open={open}
// //         anchor='right'
// //         variant='temporary'
// //         onClose={handleClose}
// //         ModalProps={{ keepMounted: true }}
// //         sx={{
// //           '& .MuiDrawer-paper': { width: { xs: 320, sm: 420 } }
// //         }}
// //       >
// //         <div className='flex items-center justify-between plb-5 pli-6'>
// //           <Typography variant='h5' sx={{ fontWeight: 600 }}>
// //             Edit Attendance Record
// //           </Typography>
// //           <IconButton size='small' onClick={handleClose}>
// //             <i className='tabler-x text-2xl text-textPrimary' />
// //           </IconButton>
// //         </div>

// //         <Divider />

// //         <Box sx={{ p: 6 }}>
// //           <form className='flex flex-col gap-5'>
// //             <Grid container spacing={4}>
// //               {/* 🧑 Employee Dropdown */}
// //               <Grid item xs={12}>
// //                 <TextField
// //                   select
// //                   label='Employee'
// //                   fullWidth
// //                   value={formData.employeeId || ''}
// //                   onChange={e => {
// //                     const selectedEmployee = employees.find(emp => emp._id === e.target.value)
// //                     setFormData(prev => ({
// //                       ...prev,
// //                       employeeId: selectedEmployee?._id || '',
// //                       employee: selectedEmployee?.username || ''
// //                     }))
// //                   }}
// //                 >
// //                   {loadingEmployees ? (
// //                     <MenuItem disabled>Loading employees...</MenuItem>
// //                   ) : employees.length > 0 ? (
// //                     employees.map(emp => (
// //                       <MenuItem key={emp._id} value={emp._id}>
// //                         {emp.username}
// //                       </MenuItem>
// //                     ))
// //                   ) : (
// //                     <MenuItem disabled>No employees found</MenuItem>
// //                   )}
// //                 </TextField>
// //               </Grid>

// //               {/* 📅 Date */}
// //               <Grid item xs={12}>
// //                 <LocalizationProvider dateAdapter={AdapterDayjs}>
// //                   <DatePicker
// //                     label='Date'
// //                     value={formData.date ? dayjs(formData.date) : null}
// //                     onChange={newValue =>
// //                       setFormData({
// //                         ...formData,
// //                         date:
// //                           newValue && dayjs(newValue).isValid()
// //                             ? dayjs(newValue).format('YYYY-MM-DD')
// //                             : ''
// //                       })
// //                     }
// //                     slots={{ textField: TextField }}
// //                     slotProps={{
// //                       textField: {
// //                         fullWidth: true,
// //                         variant: 'outlined'
// //                       }
// //                     }}
// //                   />
// //                 </LocalizationProvider>
// //               </Grid>

// //               {/* ⏰ Clock In */}
// //               <Grid item xs={12}>{renderTimePicker('Clock In', 'clockIn')}</Grid>

// //               {/* ⏰ Clock Out */}
// //               <Grid item xs={12}>{renderTimePicker('Clock Out', 'clockOut')}</Grid>

// //               {/* 🕐 Break Hours */}
// //               <Grid item xs={12}>
// //                 <TextField
// //                   label='Break Hours'
// //                   fullWidth
// //                   value={formData.breakHours}
// //                   onChange={e => setFormData({ ...formData, breakHours: e.target.value })}
// //                 />
// //               </Grid>

// //               {/* 🧾 Notes */}
// //               <Grid item xs={12}>
// //                 <TextField
// //                   label='Notes'
// //                   fullWidth
// //                   value={formData.notes}
// //                   onChange={e => setFormData({ ...formData, notes: e.target.value })}
// //                 />
// //               </Grid>

// //               {/* 📘 Status */}
// //               <Grid item xs={12}>
// //                 <TextField
// //                   select
// //                   label='Status'
// //                   fullWidth
// //                   value={formData.status}
// //                   onChange={e => setFormData({ ...formData, status: e.target.value })}
// //                 >
// //                   <MenuItem value='Present'>Present</MenuItem>
// //                   <MenuItem value='Absent'>Absent</MenuItem>
// //                   <MenuItem value='Half Day'>Half Day</MenuItem>
// //                   <MenuItem value='On Leave'>On Leave</MenuItem>
// //                   <MenuItem value='Holiday'>Holiday</MenuItem>
// //                 </TextField>
// //               </Grid>

// //               {/* 🏖️ Holiday */}
// //               <Grid item xs={12}>
// //                 <TextField
// //                   select
// //                   label='Is Holiday'
// //                   fullWidth
// //                   value={formData.isHoliday ? 'Yes' : 'No'}
// //                   onChange={e =>
// //                     setFormData({
// //                       ...formData,
// //                       isHoliday: e.target.value === 'Yes'
// //                     })
// //                   }
// //                 >
// //                   <MenuItem value='Yes'>Yes</MenuItem>
// //                   <MenuItem value='No'>No</MenuItem>
// //                 </TextField>
// //               </Grid>
// //             </Grid>

// //             <div className='flex items-center gap-4 mt-4'>
// //               <Button variant='contained' onClick={handleSave}>
// //                 Save Changes
// //               </Button>
// //               <Button variant='tonal' color='error' onClick={handleClose}>
// //                 Cancel
// //               </Button>
// //             </div>
// //           </form>
// //         </Box>
// //       </Drawer>

// //       {/* ✅ Snackbar */}
// //       <Snackbar
// //         open={snackbar.open}
// //         autoHideDuration={3000}
// //         onClose={handleSnackbarClose}
// //         anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
// //       >
// //         <Alert
// //           onClose={handleSnackbarClose}
// //           severity={snackbar.severity}
// //           variant='filled'
// //           sx={{
// //             backgroundColor: snackbar.severity === 'success' ? '#2B3380' : '#d32f2f',
// //             color: 'white',
// //             fontWeight: 500
// //           }}
// //         >
// //           {snackbar.message}
// //         </Alert>
// //       </Snackbar>
// //     </>
// //   )
// // }

// // export default EditDepartment

// 'use client'

// import { useEffect, useState } from 'react'

// // 📦 MUI Imports
// import Drawer from '@mui/material/Drawer'
// import Typography from '@mui/material/Typography'
// import Divider from '@mui/material/Divider'
// import Button from '@mui/material/Button'
// import IconButton from '@mui/material/IconButton'
// import Grid from '@mui/material/Grid'
// import MenuItem from '@mui/material/MenuItem'
// import Box from '@mui/material/Box'
// import Snackbar from '@mui/material/Snackbar'
// import Alert from '@mui/material/Alert'
// import TextField from '@mui/material/TextField'
// import { FormControlLabel, Checkbox } from '@mui/material'

// // 🗓️ MUI X Date & Time Pickers
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
// import { TimePicker } from '@mui/x-date-pickers/TimePicker'
// import { DatePicker } from '@mui/x-date-pickers/DatePicker'
// import dayjs from 'dayjs'

// // 📦 Server Action Imports
// import { fetchListOfUser } from '../../../../app/server/actions.js'

// const EditDepartment = ({ open, handleClose, selectedDepartment, onSave }) => {
//   const [formData, setFormData] = useState({
//     _id: '',
//     employeeId: '',
//     employee: '',
//     date: '',
//     clockIn: '',
//     clockOut: '',
//     breakHours: '',
//     status: 'Present',
//     isHoliday: false,
//     notes: ''
//   })

//   const [employees, setEmployees] = useState([])
//   const [loadingEmployees, setLoadingEmployees] = useState(true)
//   const [snackbar, setSnackbar] = useState({
//     open: false,
//     message: '',
//     severity: 'success'
//   })

//   // ✅ Snackbar close
//   const handleSnackbarClose = () => setSnackbar(prev => ({ ...prev, open: false }))

//   // ✅ Fetch employee list
//   useEffect(() => {
//     const loadEmployees = async () => {
//       try {
//         const res = await fetchListOfUser()
//         if (res?.success && Array.isArray(res.data)) {
//           setEmployees(res.data)
//         } else if (Array.isArray(res)) {
//           setEmployees(res)
//         } else {
//           console.warn('Invalid employee data format:', res)
//         }
//       } catch (err) {
//         console.error('Error fetching employees:', err)
//       } finally {
//         setLoadingEmployees(false)
//       }
//     }

//     loadEmployees()
//   }, [])

//   // ✅ Load selected record
//   useEffect(() => {
//     if (selectedDepartment) {
//       setFormData({
//         _id: selectedDepartment._id || '',
//         employeeId: selectedDepartment.employeeId || '',
//         employee: selectedDepartment.employee || '',
//         date: selectedDepartment.date || '',
//         clockIn: selectedDepartment.clockIn || '',
//         clockOut: selectedDepartment.clockOut || '',
//         breakHours: selectedDepartment.breakHours || '',
//         status: selectedDepartment.status || 'Present',
//         isHoliday: selectedDepartment.isHoliday || false,
//         notes: selectedDepartment.notes || ''
//       })
//     }
//   }, [selectedDepartment])

//   // ✅ Reusable Time Picker (with fixed props)
//   const renderTimePicker = (label, fieldName) => (
//     <LocalizationProvider dateAdapter={AdapterDayjs}>
//       <TimePicker
//         label={label}
//         value={formData[fieldName] ? dayjs(formData[fieldName], 'HH:mm') : null}
//         onChange={newValue =>
//           setFormData({
//             ...formData,
//             [fieldName]:
//               newValue && dayjs(newValue).isValid()
//                 ? dayjs(newValue).format('HH:mm')
//                 : ''
//           })
//         }
//         slotProps={{
//           textField: {
//             fullWidth: true,
//             variant: 'outlined',
//             enableAccessibleFieldDOMStructure: false // ✅ Prevent sectionListRef error
//           }
//         }}
//       />
//     </LocalizationProvider>
//   )

//   // ✅ Save handler
//   const handleSave = async () => {
//     try {
//       const res = await onSave(formData)
//       setSnackbar({
//         open: true,
//         message: res?.message || 'Record updated successfully!',
//         severity: res?.success ? 'success' : 'error'
//       })
//       if (res?.success) handleClose()
//     } catch (error) {
//       console.error(error)
//       setSnackbar({
//         open: true,
//         message: 'Something went wrong!',
//         severity: 'error'
//       })
//     }
//   }

//   return (
//     <>
//       <Drawer
//         open={open}
//         anchor='right'
//         variant='temporary'
//         onClose={handleClose}
//         ModalProps={{ keepMounted: true }}
//         sx={{
//           '& .MuiDrawer-paper': { width: { xs: 320, sm: 420 } }
//         }}
//       >
//         {/* Header */}
//         <div className='flex items-center justify-between plb-5 pli-6'>
//           <Typography variant='h5' sx={{ fontWeight: 600 }}>
//             Edit Attendance Record
//           </Typography>
//           <IconButton size='small' onClick={handleClose}>
//             <i className='tabler-x text-2xl text-textPrimary' />
//           </IconButton>
//         </div>

//         <Divider />

//         {/* Form */}
//         <Box sx={{ p: 6 }}>
//           <form className='flex flex-col gap-5'>
//             <Grid container spacing={4}>
//               {/* 🧑 Employee Dropdown */}
//               <Grid item xs={12}>
//                 <TextField
//                   select
//                   label='Employee'
//                   fullWidth
//                   value={formData.employeeId || ''}
//                   onChange={e => {
//                     const selectedEmployee = employees.find(emp => emp._id === e.target.value)
//                     setFormData(prev => ({
//                       ...prev,
//                       employeeId: selectedEmployee?._id || '',
//                       employee: selectedEmployee?.username || ''
//                     }))
//                   }}
//                 >
//                   {loadingEmployees ? (
//                     <MenuItem disabled>Loading employees...</MenuItem>
//                   ) : employees.length > 0 ? (
//                     employees.map(emp => (
//                       <MenuItem key={emp._id} value={emp._id}>
//                         {emp.username}
//                       </MenuItem>
//                     ))
//                   ) : (
//                     <MenuItem disabled>No employees found</MenuItem>
//                   )}
//                 </TextField>
//               </Grid>

//               {/* 📅 Date Picker */}
//               <Grid item xs={12}>
//                 <LocalizationProvider dateAdapter={AdapterDayjs}>
//                   <DatePicker
//                     label='Date'
//                     value={formData.date ? dayjs(formData.date) : null}
//                     onChange={newValue =>
//                       setFormData({
//                         ...formData,
//                         date:
//                           newValue && dayjs(newValue).isValid()
//                             ? dayjs(newValue).format('YYYY-MM-DD')
//                             : ''
//                       })
//                     }
//                     slotProps={{
//                       textField: {
//                         fullWidth: true,
//                         variant: 'outlined',
//                         enableAccessibleFieldDOMStructure: false // ✅ Fix MUI warning
//                       }
//                     }}
//                   />
//                 </LocalizationProvider>
//               </Grid>

//               {/* ⏰ Clock In */}
//               <Grid item xs={12}>{renderTimePicker('Clock In', 'clockIn')}</Grid>

//               {/* ⏰ Clock Out */}
//               <Grid item xs={12}>{renderTimePicker('Clock Out', 'clockOut')}</Grid>

//               {/* 🕐 Break Hours */}
//               <Grid item xs={12}>
//                 <TextField
//                   label='Break Hours'
//                   fullWidth
//                   value={formData.breakHours}
//                   onChange={e => setFormData({ ...formData, breakHours: e.target.value })}
//                 />
//               </Grid>

//               {/* 🧾 Notes */}
              

//               {/* 📘 Status */}
//               <Grid item xs={12}>
//                 <TextField
//                   select
//                   label='Status'
//                   fullWidth
//                   value={formData.status}
//                   onChange={e => setFormData({ ...formData, status: e.target.value })}
//                 >
//                   <MenuItem value='Present'>Present</MenuItem>
//                   <MenuItem value='Absent'>Absent</MenuItem>
//                   <MenuItem value='Half Day'>Half Day</MenuItem>
//                   <MenuItem value='On Leave'>On Leave</MenuItem>
//                   <MenuItem value='Holiday'>Holiday</MenuItem>
//                 </TextField>
//               </Grid>

//               {/* 🏖️ Holiday */}
            


//                <FormControlLabel
//               control={
//                 <Checkbox
//                   checked={!!formData.isHoliday}
//                   onChange={e =>
//                     setFormData({
//                       ...formData,
//                       isHoliday: e.target.checked
//                     })
//                   }
//                 />
//               }
//               label={<Typography>Holiday</Typography>}
//             />

//               <Grid item xs={12}>
//                 <TextField
//                   label='Notes'
//                   fullWidth
//                   value={formData.notes}
//                   onChange={e => setFormData({ ...formData, notes: e.target.value })}
//                 />
//               </Grid>
//             </Grid>

//             {/* ✅ Action Buttons */}
//             <div className='flex items-center gap-4 mt-4'>
//               <Button variant='contained' onClick={handleSave}>
//                 Save Changes
//               </Button>
//               <Button variant='tonal' color='error' onClick={handleClose}>
//                 Cancel
//               </Button>
//             </div>
//           </form>
//         </Box>
//       </Drawer>

//       {/* ✅ Snackbar */}
//       <Snackbar
//         open={snackbar.open}
//         autoHideDuration={3000}
//         onClose={handleSnackbarClose}
//         anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
//       >
//         <Alert
//           onClose={handleSnackbarClose}
//           severity={snackbar.severity}
//           variant='filled'
//           sx={{
//             backgroundColor: snackbar.severity === 'success' ? '#2B3380' : '#d32f2f',
//             color: 'white',
//             fontWeight: 500
//           }}
//         >
//           {snackbar.message}
//         </Alert>
//       </Snackbar>
//     </>
//   )
// }

// export default EditDepartment

'use client'

import { useEffect, useState } from 'react'

// 📦 MUI Imports
import Drawer from '@mui/material/Drawer'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Grid from '@mui/material/Grid'
import MenuItem from '@mui/material/MenuItem'
import Box from '@mui/material/Box'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import TextField from '@mui/material/TextField'
import { FormControlLabel, Checkbox } from '@mui/material'

// 🗓️ MUI X Date & Time Pickers
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { TimePicker } from '@mui/x-date-pickers/TimePicker'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import dayjs from 'dayjs'

// 📦 Server Action Imports
import { fetchListOfUser } from '../../../../app/server/actions.js'

const EditDepartment = ({ open, handleClose, selectedDepartment, onSave }) => {
  const [formData, setFormData] = useState({
    _id: '',
    employeeId: '',
    employee: '',
    date: '',
    clockIn: '',
    clockOut: '',
    breakHours: '',
    status: 'Present',
    isHoliday: false,
    notes: ''
  })

  const [employees, setEmployees] = useState([])
  const [loadingEmployees, setLoadingEmployees] = useState(true)
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  })

  // ✅ Snackbar close
  const handleSnackbarClose = () => setSnackbar(prev => ({ ...prev, open: false }))

  // ✅ Fetch employee list
  useEffect(() => {
    const loadEmployees = async () => {
      try {
        const res = await fetchListOfUser()
        if (res?.success && Array.isArray(res.data)) {
          setEmployees(res.data)
        } else if (Array.isArray(res)) {
          setEmployees(res)
        } else {
          console.warn('Invalid employee data format:', res)
        }
      } catch (err) {
        console.error('Error fetching employees:', err)
      } finally {
        setLoadingEmployees(false)
      }
    }

    loadEmployees()
  }, [])

  // ✅ Load selected record
  useEffect(() => {
    if (selectedDepartment) {
      setFormData({
        _id: selectedDepartment._id || '',
        employeeId: selectedDepartment.employeeId || '',
        employee: selectedDepartment.employee || '',
        date: selectedDepartment.date || '',
        clockIn: selectedDepartment.clockIn || '',
        clockOut: selectedDepartment.clockOut || '',
        breakHours: selectedDepartment.breakHours || '',
        status: selectedDepartment.status || 'Present',
        isHoliday: selectedDepartment.isHoliday || false,
        notes: selectedDepartment.notes || ''
      })
    }
  }, [selectedDepartment])

  // ✅ Reusable Time Picker
  const renderTimePicker = (label, fieldName) => (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <TimePicker
        label={label}
        value={formData[fieldName] ? dayjs(formData[fieldName], 'HH:mm') : null}
        onChange={newValue =>
          setFormData({
            ...formData,
            [fieldName]:
              newValue && dayjs(newValue).isValid()
                ? dayjs(newValue).format('HH:mm')
                : ''
          })
        }
        slotProps={{
          textField: {
            fullWidth: true,
            variant: 'outlined',
            enableAccessibleFieldDOMStructure: false // ✅ Fix sectionListRef warning
          }
        }}
      />
    </LocalizationProvider>
  )

  // ✅ Save handler
  const handleSave = async () => {
    try {
      const res = await onSave(formData)
      setSnackbar({
        open: true,
        message: res?.message || 'Record updated successfully!',
        severity: res?.success ? 'success' : 'error'
      })
      if (res?.success) handleClose()
    } catch (error) {
      console.error(error)
      setSnackbar({
        open: true,
        message: 'Something went wrong!',
        severity: 'error'
      })
    }
  }

  return (
    <>
      <Drawer
        open={open}
        anchor='right'
        variant='temporary'
        onClose={handleClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          '& .MuiDrawer-paper': { width: { xs: 320, sm: 420 } }
        }}
      >
        {/* Header */}
        <div className='flex items-center justify-between plb-5 pli-6'>
          <Typography variant='h5' sx={{ fontWeight: 600 }}>
            Edit Attendance Record
          </Typography>
          <IconButton size='small' onClick={handleClose}>
            <i className='tabler-x text-2xl text-textPrimary' />
          </IconButton>
        </div>

        <Divider />

        {/* Form */}
        <Box sx={{ p: 6 }}>
          <form className='flex flex-col gap-5'>
            <Grid container spacing={4}>
              {/* 🧑 Employee Dropdown */}
              <Grid item xs={12}>
                <TextField
                  select
                  label='Employee'
                  fullWidth
                  value={formData.employeeId || ''}
                  onChange={e => {
                    const selectedEmployee = employees.find(emp => emp._id === e.target.value)
                    setFormData(prev => ({
                      ...prev,
                      employeeId: selectedEmployee?._id || '',
                      employee: selectedEmployee?.username || ''
                    }))
                  }}
                >
                  {loadingEmployees ? (
                    <MenuItem disabled>Loading employees...</MenuItem>
                  ) : employees.length > 0 ? (
                    employees.map(emp => (
                      <MenuItem key={emp._id} value={emp._id}>
                        {emp.username}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem disabled>No employees found</MenuItem>
                  )}
                </TextField>
              </Grid>

              {/* 📅 Date Picker */}
              <Grid item xs={12}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label='Date'
                    value={formData.date ? dayjs(formData.date) : null}
                    onChange={newValue =>
                      setFormData({
                        ...formData,
                        date:
                          newValue && dayjs(newValue).isValid()
                            ? dayjs(newValue).format('YYYY-MM-DD')
                            : ''
                      })
                    }
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        variant: 'outlined',
                        enableAccessibleFieldDOMStructure: false
                      }
                    }}
                  />
                </LocalizationProvider>
              </Grid>

              {/* ⏰ Clock In */}
              <Grid item xs={12}>{renderTimePicker('Clock In', 'clockIn')}</Grid>

              {/* ⏰ Clock Out */}
              <Grid item xs={12}>{renderTimePicker('Clock Out', 'clockOut')}</Grid>

              {/* 🕐 Break Hours */}
              <Grid item xs={12}>
                <TextField
                  label='Break Hours'
                  fullWidth
                  value={formData.breakHours}
                  onChange={e => setFormData({ ...formData, breakHours: e.target.value })}
                />
              </Grid>

              {/* 📘 Status */}
              <Grid item xs={12}>
                <TextField
                  select
                  label='Status'
                  fullWidth
                  value={formData.status}
                  onChange={e => setFormData({ ...formData, status: e.target.value })}
                >
                  <MenuItem value='Present'>Present</MenuItem>
                  <MenuItem value='Absent'>Absent</MenuItem>
                  <MenuItem value='Half Day'>Half Day</MenuItem>
                  <MenuItem value='On Leave'>On Leave</MenuItem>
                  <MenuItem value='Holiday'>Holiday</MenuItem>
                </TextField>
              </Grid>

              {/* 🏖️ Holiday Checkbox */}
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={!!formData.isHoliday}
                      onChange={e =>
                        setFormData({
                          ...formData,
                          isHoliday: e.target.checked
                        })
                      }
                    />
                  }
                  label={<Typography>Holiday</Typography>}
                />
              </Grid>

              {/* 🧾 Notes */}
              <Grid item xs={12}>
                <TextField
                  label='Notes'
                  fullWidth
                  multiline
                  rows={2}
                  value={formData.notes}
                  onChange={e => setFormData({ ...formData, notes: e.target.value })}
                />
              </Grid>
            </Grid>

            {/* ✅ Action Buttons */}
            <div className='flex items-center gap-4 mt-4'>
              <Button variant='contained' onClick={handleSave}>
                Save Changes
              </Button>
              <Button variant='tonal' color='error' onClick={handleClose}>
                Cancel
              </Button>
            </div>
          </form>
        </Box>
      </Drawer>

      {/* ✅ Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbar.severity}
          variant='filled'
          sx={{
            backgroundColor: snackbar.severity === 'success' ? '#2B3380' : '#d32f2f',
            color: 'white',
            fontWeight: 500
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  )
}

export default EditDepartment






