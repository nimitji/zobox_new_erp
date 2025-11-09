


// 'use client'

// import { useState, useEffect } from 'react'
// import {
//   Button,
//   Drawer,
//   IconButton,
//   MenuItem,
//   Typography,
//   Divider,
//   Snackbar,
//   Alert as MuiAlert
// } from '@mui/material'
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
// import { TimePicker } from '@mui/x-date-pickers/TimePicker'
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
// import dayjs from 'dayjs'
// import { useForm, Controller } from 'react-hook-form'

// // 📂 Server Actions
// import {
//   createAttendanceRegularization, // ✅ rename your createTransfer API to this
//   fetchListOfUser,
//   fetchAttendanceRecordsForAR
// } from '../../../../app/server/actions.js'

// // 🔐 Auth
// import { useSession } from 'next-auth/react'

// // 🧱 Components
// import CustomTextField from '@core/components/mui/TextField'

// const AddDepartmentDrawer = ({ open, handleClose, refreshData }) => {
//   const { data: session } = useSession()
//   const token = session?.user?.accessToken

//   // 🧠 Local State
//   const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' })
//   const [employees, setEmployees] = useState([])
//   const [attendanceRecords, setAttendanceRecords] = useState([])
//   const [loadingEmployees, setLoadingEmployees] = useState(true)
//   const [loadingAttendance, setLoadingAttendance] = useState(false)

//   // ✅ Form setup
//   const {
//     control,
//     reset,
//     handleSubmit,
//     watch,
//     formState: { errors }
//   } = useForm({
//     defaultValues: {
//       employee: '',
//       attendanceRecord: '',
//       requestedClockIn: '',
//       requestedClockOut: '',
//       reason: '',
//       status: 'Pending'
//     }
//   })

//   const selectedEmployee = watch('employee')

//   // 🧠 Helper to safely fetch JSON
//   const safeFetchJSON = async (fetchFn, fallback = []) => {
//     try {
//       const response = await fetchFn()
//       if (response && typeof response === 'object') {
//         if (Array.isArray(response?.data)) return response.data
//         if (Array.isArray(response)) return response
//       }
//       return fallback
//     } catch (error) {
//       console.error('Fetch JSON Error:', error)
//       return fallback
//     }
//   }

//   // 👤 Load Employees
//   useEffect(() => {
//     const loadEmployees = async () => {
//       setLoadingEmployees(true)
//       const empList = await safeFetchJSON(fetchListOfUser)
//       setEmployees(empList)
//       setLoadingEmployees(false)
//     }
//     loadEmployees()
//   }, [])

//   // 🕒 Load Attendance Records when employee changes
//   useEffect(() => {
//     const loadAttendanceRecords = async () => {
//       if (!selectedEmployee || !token) {
//         setAttendanceRecords([])
//         return
//       }
//       setLoadingAttendance(true)
//       const response = await fetchAttendanceRecordsForAR(selectedEmployee, token)
//       if (response?.success) setAttendanceRecords(response.data)
//       else setAttendanceRecords([])
//       setLoadingAttendance(false)
//     }
//     loadAttendanceRecords()
//   }, [selectedEmployee, token])

//   // ✅ Submit handler
//   const onSubmit = async data => {
//     try {
//       const formData = new FormData()

//       formData.append('employee', data.employee || '')
//       formData.append('attendanceRecord', data.attendanceRecord || '')
//       formData.append('requestedClockIn', data.requestedClockIn || '')
//       formData.append('requestedClockOut', data.requestedClockOut || '')
//       formData.append('reason', data.reason || '')
//       formData.append('status', data.status || 'Pending')

//       const response = await createAttendanceRegularization(formData, token)
//       console.log("RESPONSEMESSAGE",response)

//       if (response?.success) {
//         setSnackbar({
//           open: true,
//           message: response.message || 'Regularization request submitted successfully',
//           severity: 'success'
//         })
//         await refreshData?.()
//         handleClose()
//         reset()
//       } else {
//         setSnackbar({
//           open: true,
//           message: response?.message || 'Failed to submit request',
//           severity: 'error'
//         })
//       }
//     } catch (err) {
//       console.error('❌ Error creating regularization request:', err)
//       setSnackbar({
//         open: true,
//         message: 'Error creating regularization request',
//         severity: 'error'
//       })
//     }
//   }

//   // 🔄 Reset handler
//   const handleReset = () => {
//     handleClose()
//     reset()
//   }

//   return (
//     <>
//       <Drawer
//         open={open}
//         anchor='right'
//         variant='temporary'
//         onClose={handleReset}
//         ModalProps={{ keepMounted: true }}
//         sx={{ '& .MuiDrawer-paper': { width: { xs: 320, sm: 420 } } }}
//       >
//         {/* 🧩 Header */}
//         <div className='flex items-center justify-between p-5'>
//           <Typography variant='h5' fontWeight='bold'>
//             Add Attendance Regularization
//           </Typography>
//           <IconButton size='small' onClick={handleReset}>
//             <i className='tabler-x text-2xl text-textPrimary' />
//           </IconButton>
//         </div>

//         <Divider />

//         {/* 🧾 Form */}
//         <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-6 p-6'>
//           {/* 👤 Employee Dropdown */}
//           <Controller
//             name='employee'
//             control={control}
//             rules={{ required: 'Employee is required' }}
//             render={({ field }) => (
//               <CustomTextField
//                 select
//                 fullWidth
//                 label='Employee'
//                 value={field.value || ''}
//                 onChange={field.onChange}
//                 error={!!errors.employee}
//                 helperText={errors.employee?.message}
//               >
//                 {loadingEmployees ? (
//                   <MenuItem disabled>Loading employees...</MenuItem>
//                 ) : employees.length > 0 ? (
//                   employees.map(emp => (
//                     <MenuItem key={emp._id} value={emp._id}>
//                       {emp.username || emp.name || 'Unnamed Employee'}
//                     </MenuItem>
//                   ))
//                 ) : (
//                   <MenuItem disabled>No employees found</MenuItem>
//                 )}
//               </CustomTextField>
//             )}
//           />

//           {/* 🕒 Attendance Record Dropdown */}
//           <Controller
//             name='attendanceRecord'
//             control={control}
//             rules={{ required: 'Attendance record is required' }}
//             render={({ field }) => (
//               <CustomTextField
//                 select
//                 fullWidth
//                 label='Attendance Record'
//                 value={field.value || ''}
//                 onChange={field.onChange}
//                 disabled={!selectedEmployee}
//                 error={!!errors.attendanceRecord}
//                 helperText={errors.attendanceRecord?.message}
//               >
//                 {!selectedEmployee ? (
//                   <MenuItem disabled>Select an employee first</MenuItem>
//                 ) : loadingAttendance ? (
//                   <MenuItem disabled>Loading attendance records...</MenuItem>
//                 ) : attendanceRecords.length > 0 ? (
//                   attendanceRecords.map(rec => (
//                     <MenuItem key={rec._id} value={rec._id}>
//                       {rec.displayInfo}
//                     </MenuItem>
//                   ))
//                 ) : (
//                   <MenuItem disabled>No low-hour records found</MenuItem>
//                 )}
//               </CustomTextField>
//             )}
//           />

//           {/* 🕓 Requested Clock In */}
//           <LocalizationProvider dateAdapter={AdapterDayjs}>
//             <Controller
//               name='requestedClockIn'
//               control={control}
//               rules={{ required: 'Requested Clock In Time is required' }}
//               render={({ field }) => (
//                 <TimePicker
//                   label='Requested Clock In'
//                   value={field.value ? dayjs(field.value) : null}
//                   onChange={newValue => field.onChange(newValue ? newValue.toISOString() : '')}
//                   enableAccessibleFieldDOMStructure={false}
//                   slots={{ textField: CustomTextField }}
//                   slotProps={{
//                     textField: {
//                       fullWidth: true,
//                       error: !!errors.requestedClockIn,
//                       helperText: errors.requestedClockIn?.message
//                     }
//                   }}
//                 />
//               )}
//             />
//           </LocalizationProvider>

//           {/* 🕔 Requested Clock Out */}
//           <LocalizationProvider dateAdapter={AdapterDayjs}>
//             <Controller
//               name='requestedClockOut'
//               control={control}
//               rules={{ required: 'Requested Clock Out Time is required' }}
//               render={({ field }) => (
//                 <TimePicker
//                   label='Requested Clock Out'
//                   value={field.value ? dayjs(field.value) : null}
//                   onChange={newValue => field.onChange(newValue ? newValue.toISOString() : '')}
//                   enableAccessibleFieldDOMStructure={false}
//                   slots={{ textField: CustomTextField }}
//                   slotProps={{
//                     textField: {
//                       fullWidth: true,
//                       error: !!errors.requestedClockOut,
//                       helperText: errors.requestedClockOut?.message
//                     }
//                   }}
//                 />
//               )}
//             />
//           </LocalizationProvider>

//           {/* 🗒 Reason */}
//           <Controller
//             name='reason'
//             control={control}
//             rules={{ required: 'Reason is required' }}
//             render={({ field }) => (
//               <CustomTextField
//                 {...field}
//                 fullWidth
//                 multiline
//                 minRows={2}
//                 label='Reason'
//                 error={!!errors.reason}
//                 helperText={errors.reason?.message}
//               />
//             )}
//           />

//           {/* 🔘 Status */}
//           <Controller
//             name='status'
//             control={control}
//             render={({ field }) => (
//               <CustomTextField select fullWidth label='Status' value={field.value || ''} onChange={field.onChange}>
//                 <MenuItem value='Pending'>Pending</MenuItem>
//                 <MenuItem value='Approved'>Approved</MenuItem>
//                 <MenuItem value='Rejected'>Rejected</MenuItem>
//               </CustomTextField>
//             )}
//           />

//           {/* ✅ Buttons */}
//           <div className='flex items-center gap-4'>
//             <Button variant='contained' type='submit'>Submit</Button>
//             <Button variant='tonal' color='error' onClick={handleReset}>Cancel</Button>
//           </div>
//         </form>
//       </Drawer>

//       {/* ✅ Snackbar */}
//       <Snackbar
//         open={snackbar.open}
//         autoHideDuration={3000}
//         onClose={() => setSnackbar({ ...snackbar, open: false })}
//         anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
//       >
//         <MuiAlert
//           onClose={() => setSnackbar({ ...snackbar, open: false })}
//           severity={snackbar.severity}
//           variant='filled'
//           sx={{
//             width: '100%',
//             backgroundColor: snackbar.severity === 'success' ? '#2B3380' : '#D32F2F',
//             color: 'white',
//             fontWeight: 500
//           }}
//         >
//           {snackbar.message}
//         </MuiAlert>
//       </Snackbar>
//     </>
//   )
// }

// export default AddDepartmentDrawer

 'use client'

 import { useState, useEffect } from 'react'
 import {
   Button,
   Drawer,
   IconButton,
   MenuItem,
   Typography,
   Divider,
   Snackbar,
   Alert as MuiAlert
 } from '@mui/material'
 import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
 import { TimePicker } from '@mui/x-date-pickers/TimePicker'
 import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
 import dayjs from 'dayjs'
 import { useForm, Controller } from 'react-hook-form'


 import {
   createAttendanceRegularization, 
   fetchListOfUser,
   fetchAttendanceRecordsForAR
 } from '../../../../app/server/actions.js'

 
 import { useSession } from 'next-auth/react'

 
 import CustomTextField from '@core/components/mui/TextField'

const AddDepartmentDrawer = ({ open, handleClose, refreshData }) => {
  const { data: session } = useSession()
  const token = session?.user?.accessToken

  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' })
  const [employees, setEmployees] = useState([])
  const [attendanceRecords, setAttendanceRecords] = useState([])
  const [loadingEmployees, setLoadingEmployees] = useState(true)
  const [loadingAttendance, setLoadingAttendance] = useState(false)

  const {
    control,
    reset,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm({
    defaultValues: {
      employee: '',
      attendanceRecord: '',
      requestedClockIn: '',
      requestedClockOut: '',
      reason: '',
      status: 'Pending'
    }
  })

  const selectedEmployee = watch('employee')

  // 🧠 Helper to safely fetch JSON
  const safeFetchJSON = async (fetchFn, fallback = []) => {
    try {
      const response = await fetchFn()
      if (response && typeof response === 'object') {
        if (Array.isArray(response?.data)) return response.data
        if (Array.isArray(response)) return response
      }
      return fallback
    } catch (error) {
      console.error('Fetch JSON Error:', error)
      return fallback
    }
  }

  // 👤 Load Employees
  useEffect(() => {
    const loadEmployees = async () => {
      setLoadingEmployees(true)
      const empList = await safeFetchJSON(fetchListOfUser)
      setEmployees(empList)
      setLoadingEmployees(false)
    }
    loadEmployees()
  }, [])

  // 🕒 Load Attendance Records when employee changes
  useEffect(() => {
    const loadAttendanceRecords = async () => {
      if (!selectedEmployee || !token) {
        setAttendanceRecords([])
        return
      }
      setLoadingAttendance(true)
      const response = await fetchAttendanceRecordsForAR(selectedEmployee, token)
      if (response?.success) setAttendanceRecords(response.data)
      else setAttendanceRecords([])
      setLoadingAttendance(false)
    }
    loadAttendanceRecords()
  }, [selectedEmployee, token])

  // ✅ Submit handler (sending JSON body)
  const onSubmit = async data => {
    try {
      const payload = {
        employee: data.employee,
        attendanceRecord: data.attendanceRecord,
        requestedClockIn: data.requestedClockIn,
        requestedClockOut: data.requestedClockOut,
        reason: data.reason,
        status: data.status || 'Pending'
      }

      const response = await createAttendanceRegularization(payload, token)
      console.log('✅ RESPONSE:', response)

      if (response?.success) {
        setSnackbar({
          open: true,
          message: response.message || 'Regularization request submitted successfully',
          severity: 'success'
        })
        await refreshData?.()
        handleClose()
        reset()
      } else {
        setSnackbar({
          open: true,
          message: response?.message || 'Failed to submit request',
          severity: 'error'
        })
      }
    } catch (err) {
      console.error('❌ Error creating regularization request:', err)
      setSnackbar({
        open: true,
        message: 'Error creating regularization request',
        severity: 'error'
      })
    }
  }

  const handleReset = () => {
    handleClose()
    reset()
  }

  return (
    <>
      <Drawer
        open={open}
        anchor='right'
        variant='temporary'
        onClose={handleReset}
        ModalProps={{ keepMounted: true }}
        sx={{ '& .MuiDrawer-paper': { width: { xs: 320, sm: 420 } } }}
      >
        <div className='flex items-center justify-between p-5'>
          <Typography variant='h5' fontWeight='bold'>
            Add Attendance Regularization
          </Typography>
          <IconButton size='small' onClick={handleReset}>
            <i className='tabler-x text-2xl text-textPrimary' />
          </IconButton>
        </div>

        <Divider />

        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-6 p-6'>
          {/* 👤 Employee Dropdown */}
          <Controller
            name='employee'
            control={control}
            rules={{ required: 'Employee is required' }}
            render={({ field }) => (
              <CustomTextField
                select
                fullWidth
                label='Employee'
                value={field.value || ''}
                onChange={field.onChange}
                error={!!errors.employee}
                helperText={errors.employee?.message}
              >
                {loadingEmployees ? (
                  <MenuItem disabled>Loading employees...</MenuItem>
                ) : employees.length > 0 ? (
                  employees.map(emp => (
                    <MenuItem key={emp._id} value={emp._id}>
                      {emp.username || emp.name || 'Unnamed Employee'}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem disabled>No employees found</MenuItem>
                )}
              </CustomTextField>
            )}
          />

          {/* 🕒 Attendance Record Dropdown */}
          <Controller
            name='attendanceRecord'
            control={control}
            rules={{ required: 'Attendance record is required' }}
            render={({ field }) => (
              <CustomTextField
                select
                fullWidth
                label='Attendance Record'
                value={field.value || ''}
                onChange={field.onChange}
                disabled={!selectedEmployee}
                error={!!errors.attendanceRecord}
                helperText={errors.attendanceRecord?.message}
              >
                {!selectedEmployee ? (
                  <MenuItem disabled>Select an employee first</MenuItem>
                ) : loadingAttendance ? (
                  <MenuItem disabled>Loading attendance records...</MenuItem>
                ) : attendanceRecords.length > 0 ? (
                  attendanceRecords.map(rec => (
                    <MenuItem key={rec._id} value={rec._id}>
                      {rec.displayInfo}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem disabled>No low-hour records found</MenuItem>
                )}
              </CustomTextField>
            )}
          />



           {/* 🕔 Requested Clock Out */}
          <LocalizationProvider dateAdapter={AdapterDayjs}>
  <Controller
    name='requestedClockIn'
    control={control}
    rules={{ required: 'Requested Clock In Time is required' }}
    render={({ field }) => (
      <TimePicker
        label='Requested Clock In'
        value={field.value ? dayjs(field.value, 'HH:mm') : null}
        onChange={newValue => field.onChange(newValue ? dayjs(newValue).format('HH:mm') : '')}
        enableAccessibleFieldDOMStructure={false}
        slots={{ textField: CustomTextField }}
        slotProps={{
          textField: {
            fullWidth: true,
            error: !!errors.requestedClockIn,
            helperText: errors.requestedClockIn?.message
          }
        }}
      />
    )}
  />
</LocalizationProvider>
  

           <LocalizationProvider dateAdapter={AdapterDayjs}>
  <Controller
    name='requestedClockOut'
    control={control}
    rules={{ required: 'Requested Clock Out Time is required' }}
    render={({ field }) => (
      <TimePicker
        label='Requested Clock Out'
        value={field.value ? dayjs(field.value, 'HH:mm') : null}
        onChange={newValue => field.onChange(newValue ? dayjs(newValue).format('HH:mm') : '')}
        enableAccessibleFieldDOMStructure={false}
        slots={{ textField: CustomTextField }}
        slotProps={{
          textField: {
            fullWidth: true,
            error: !!errors.requestedClockOut,
            helperText: errors.requestedClockOut?.message
          }
        }}
      />
    )}
  />
</LocalizationProvider>
       
     



          {/* 🗒 Reason */}
          <Controller
            name='reason'
            control={control}
            rules={{ required: 'Reason is required' }}
            render={({ field }) => (
              <CustomTextField
                {...field}
                fullWidth
                multiline
                minRows={2}
                label='Reason'
                error={!!errors.reason}
                helperText={errors.reason?.message}
              />
            )}
          />

          {/* 🔘 Status */}
          <Controller
            name='status'
            control={control}
            render={({ field }) => (
              <CustomTextField select fullWidth label='Status' value={field.value || ''} onChange={field.onChange}>
                <MenuItem value='Pending'>Pending</MenuItem>
               <MenuItem value='Rejected'>Rejected</MenuItem>
              </CustomTextField>
            )}
          />

          <div className='flex items-center gap-4'>
            <Button variant='contained' type='submit'>Submit</Button>
            <Button variant='tonal' color='error' onClick={handleReset}>Cancel</Button>
          </div>
        </form>
      </Drawer>

      {/* ✅ Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MuiAlert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          variant='filled'
          sx={{
            width: '100%',
            backgroundColor: snackbar.severity === 'success' ? '#2B3380' : '#D32F2F',
            color: 'white',
            fontWeight: 500
          }}
        >
          {snackbar.message}
        </MuiAlert>
      </Snackbar>
    </>
  )
}

export default AddDepartmentDrawer

