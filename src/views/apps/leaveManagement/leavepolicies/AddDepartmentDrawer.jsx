

//  'use client'

//  import { useState, useEffect } from 'react'
//  import {
//    Button,
//    Drawer,
//    IconButton,
//    MenuItem,
//    Typography,
//    Divider,
//    Snackbar,
//    Alert as MuiAlert
//  } from '@mui/material'
 
//  import { useForm, Controller } from 'react-hook-form'


//  import {
//    createAttendanceRegularization, 
//    fetchListOfLeaveType,
//    fetchAttendanceRecordsForAR
//  } from '../../../../app/server/actions.js'

 
//  import { useSession } from 'next-auth/react'

 
//  import CustomTextField from '@core/components/mui/TextField'

// const AddDepartmentDrawer = ({ open, handleClose, refreshData }) => {
//   const { data: session } = useSession()
//   const token = session?.user?.accessToken

//   const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' })
//   const [employees, setEmployees] = useState([])
//   const [attendanceRecords, setAttendanceRecords] = useState([])
//   const [loadingEmployees, setLoadingEmployees] = useState(true)
//   const [loadingAttendance, setLoadingAttendance] = useState(false)

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
//       const empList = await safeFetchJSON(fetchListOfLeaveType)
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

//   // ✅ Submit handler (sending JSON body)
//   const onSubmit = async data => {
//     try {
//       const payload = {
//         employee: data.employee,
//         attendanceRecord: data.attendanceRecord,
//         requestedClockIn: data.requestedClockIn,
//         requestedClockOut: data.requestedClockOut,
//         reason: data.reason,
//         status: data.status || 'Pending'
//       }

//       const response = await createAttendanceRegularization(payload, token)
//       console.log('✅ RESPONSE:', response)

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
//         <div className='flex items-center justify-between p-5'>
//           <Typography variant='h5' fontWeight='bold'>
//             Add Leave Policies
//           </Typography>
//           <IconButton size='small' onClick={handleReset}>
//             <i className='tabler-x text-2xl text-textPrimary' />
//           </IconButton>
//         </div>

//         <Divider />

//         <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-6 p-6'>

//               {/* 🗒 Reason */}
//           <Controller
//             name='policyName'
//             control={control}
//             rules={{ required: 'Policy Name is required' }}
//             render={({ field }) => (
//               <CustomTextField
//                 {...field}
//                 fullWidth
              
//                 minRows={1}
//                 label='Policy Name'
//                 error={!!errors.policyName}
//                 helperText={errors.policyName?.message}
//               />
//             )}
//           />

//              <Controller
//             name='description'
//             control={control}
//             rules={{ required: 'Description is required' }}
//             render={({ field }) => (
//               <CustomTextField
//                 {...field}
//                 fullWidth
//                 multiline
//                 minRows={2}
//                 label='Description'
//                 error={!!errors.description}
//                 helperText={errors.description?.message}
//               />
//             )}
//           />


//           {/* 👤 Employee Dropdown */}
//           <Controller
//             name='leaveType'
//             control={control}
//             rules={{ required: 'Leave Type is required' }}
//             render={({ field }) => (
//               <CustomTextField
//                 select
//                 fullWidth
//                 label='Leave Type'
//                 value={field.value || ''}
//                 onChange={field.onChange}
//                 error={!!errors.leaveType}
//                 helperText={errors.leaveType?.message}
//               >
//                 {loadingEmployees ? (
//                   <MenuItem disabled>Loading leave types...</MenuItem>
//                 ) : employees.length > 0 ? (
//                   employees.map(emp => (
//                     <MenuItem key={emp._id} value={emp._id}>
//                       {emp.leaveTypeName || emp.leaveTypeName || 'Unnamed Employee'}
//                     </MenuItem>
//                   ))
//                 ) : (
//                   <MenuItem disabled>No leave types found</MenuItem>
//                 )}
//               </CustomTextField>
//             )}
//           />

//             <Controller
//             name='accuralType'
//             control={control}
//             render={({ field }) => (
//               <CustomTextField select fullWidth label='Accural Type' value={field.value || ''} onChange={field.onChange}>
//                 <MenuItem value='Yearly'>Yearly</MenuItem>
//                <MenuItem value='Monthly'>Monthly</MenuItem>
//               </CustomTextField>
//             )}
//           />



       
     



//           {/* 🗒 Reason */}
//           <Controller
//             name='accuralRates'
//             control={control}
//             rules={{ required: 'Accural Rates is required' }}
//             render={({ field }) => (
//               <CustomTextField
//                 {...field}
//                 fullWidth
               
//                 minRows={1}
//                 label='Accural Rates (Days)'
//                 error={!!errors.accuralRates}
//                 helperText={errors.accuralRates?.message}
//               />
//             )}
//           />
//             <Controller
//             name='carryForwardLimit'
//             control={control}
//             rules={{ required: 'Carry Forword is required' }}
//             render={({ field }) => (
//               <CustomTextField
//                 {...field}
//                 fullWidth
                
//                 minRows={1}
//                 label='Carry Forword Limit (Days)'
//                 error={!!errors.carryForwardLimit}
//                 helperText={errors.carryForwardLimit?.message}
//               />
//             )}
//           />
//              <Controller
//             name='minDays'
//             control={control}
//             rules={{ required: 'Mimimum Days is required' }}
//             render={({ field }) => (
//               <CustomTextField
//                 {...field}
//                 fullWidth
            
//                 minRows={1}
//                 label='Minimum Days Per Application'
//                 error={!!errors.minDays}
//                 helperText={errors.minDays?.message}
//               />
//             )}
//           />
//              <Controller
//             name='maxDays'
//             control={control}
//             rules={{ required: 'Maximum Days is required' }}
//             render={({ field }) => (
//               <CustomTextField
//                 {...field}
//                 fullWidth
                
//                 minRows={1}
//                 label='Maximum Days Per Application'
//                 error={!!errors.maxDays}
//                 helperText={errors.maxDays?.message}
//               />
//             )}
//           />

//           {/* 🔘 Status */}

//            <Controller
//             name='isRequired'
//             control={control}
//             render={({ field }) => (
//               <CustomTextField select fullWidth label='Requires Approval' value={field.value || ''} onChange={field.onChange}>
//                 <MenuItem value='Required'>Required</MenuItem>
//                <MenuItem value='Not Required'>Not Required</MenuItem>
//               </CustomTextField>
//             )}
//           />
//           <Controller
//             name='status'
//             control={control}
//             render={({ field }) => (
//               <CustomTextField select fullWidth label='Status' value={field.value || ''} onChange={field.onChange}>
//                 <MenuItem value='Active'>Active</MenuItem>
//                <MenuItem value='Inactive'>Inactive</MenuItem>
//               </CustomTextField>
//             )}
//           />

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

import { useForm, Controller } from 'react-hook-form'
import { useSession } from 'next-auth/react'

import {
  fetchListOfLeaveType,
  createLeavePolicy
} from '../../../../app/server/actions.js'

import CustomTextField from '@core/components/mui/TextField'

const AddDepartmentDrawer = ({ open, handleClose, refreshData }) => {
  const { data: session } = useSession()
  const token = session?.user?.accessToken

  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' })
  const [leaveTypes, setLeaveTypes] = useState([])
  const [loadingLeaveTypes, setLoadingLeaveTypes] = useState(true)

  // ---------------------- FORM DEFAULT VALUES ----------------------
  const {
    control,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      policyName: '',
      description: '',
      leaveType: '',
      accuralType: 'Yearly',
      accuralRates: '',
      carryForwardLimit: '',
      minDays: '',
      maxDays: '',
      isRequired: 'Required',
      status: 'Active'
    }
  })

  // ---------------------- SAFE JSON HELPER ----------------------
  const safeFetchJSON = async (fetchFn, fallback = []) => {
    try {
      const response = await fetchFn()
      if (response?.success) return response.data
      if (Array.isArray(response)) return response
      return fallback
    } catch (error) {
      console.error('Fetch JSON Error:', error)
      return fallback
    }
  }

  // ---------------------- LOAD LEAVE TYPES ----------------------
  useEffect(() => {
    const loadLeaveTypes = async () => {
      setLoadingLeaveTypes(true)
      const list = await safeFetchJSON(fetchListOfLeaveType)
      setLeaveTypes(list)
      setLoadingLeaveTypes(false)
    }
    loadLeaveTypes()
  }, [])

  // ---------------------- SUBMIT HANDLER ----------------------
  const onSubmit = async data => {
    try {
      const payload = {
        policyName: data.policyName,
        description: data.description,
        leaveType: data.leaveType,
        accuralType: data.accuralType,
        accuralRates: data.accuralRates,
        carryForwardLimit: data.carryForwardLimit,
        minDays: data.minDays,
        maxDays: data.maxDays,
        isRequired: data.isRequired,
        status: data.status
      }

      console.log("📌 PAYLOAD:", payload)

      const response = await createLeavePolicy(payload)

      if (response?.success) {
        setSnackbar({
          open: true,
          message: response.message || 'Policy created successfully',
          severity: 'success'
        })
        await refreshData?.()
        handleClose()
        reset()
      } else {
        setSnackbar({
          open: true,
          message: response?.message || 'Failed to create policy',
          severity: 'error'
        })
      }
    } catch (err) {
      console.error('❌ Error creating policy:', err)
      setSnackbar({
        open: true,
        message: 'Error creating policy',
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
            Add Leave Policies
          </Typography>
          <IconButton size='small' onClick={handleReset}>
            <i className='tabler-x text-2xl text-textPrimary' />
          </IconButton>
        </div>

        <Divider />

        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-6 p-6'>

          {/* POLICY NAME */}
          <Controller
            name='policyName'
            control={control}
            rules={{ required: 'Policy Name is required' }}
            render={({ field }) => (
              <CustomTextField
                {...field}
                fullWidth
                label='Policy Name'
                error={!!errors.policyName}
                helperText={errors.policyName?.message}
              />
            )}
          />

          {/* DESCRIPTION */}
          <Controller
            name='description'
            control={control}
            rules={{ required: 'Description is required' }}
            render={({ field }) => (
              <CustomTextField
                {...field}
                fullWidth
                multiline
                minRows={2}
                label='Description'
                error={!!errors.description}
                helperText={errors.description?.message}
              />
            )}
          />

          {/* LEAVE TYPE */}
          <Controller
            name='leaveType'
            control={control}
            rules={{ required: 'Leave Type is required' }}
            render={({ field }) => (
              <CustomTextField
                select
                fullWidth
                label='Leave Type'
                {...field}
                error={!!errors.leaveType}
                helperText={errors.leaveType?.message}
              >
                {loadingLeaveTypes ? (
                  <MenuItem disabled>Loading leave types...</MenuItem>
                ) : leaveTypes.length > 0 ? (
                  leaveTypes.map(item => (
                    <MenuItem key={item._id} value={item._id}>
                      {item.leaveTypeName}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem disabled>No leave types found</MenuItem>
                )}
              </CustomTextField>
            )}
          />

          {/* ACCURAL TYPE */}
          <Controller
            name='accuralType'
            control={control}
            render={({ field }) => (
              <CustomTextField select fullWidth label='Accural Type' {...field}>
                <MenuItem value='Yearly'>Yearly</MenuItem>
                <MenuItem value='Monthly'>Monthly</MenuItem>
              </CustomTextField>
            )}
          />

          {/* ACCURAL RATES */}
          <Controller
            name='accuralRates'
            control={control}
            rules={{ required: 'Accural Rates is required' }}
            render={({ field }) => (
              <CustomTextField
                {...field}
                fullWidth
                label='Accural Rates (Days)'
                error={!!errors.accuralRates}
                helperText={errors.accuralRates?.message}
              />
            )}
          />

          {/* CARRY FORWARD LIMIT */}
          <Controller
            name='carryForwardLimit'
            control={control}
            rules={{ required: 'Carry Forward Limit is required' }}
            render={({ field }) => (
              <CustomTextField
                {...field}
                fullWidth
                label='Carry Forward Limit (Days)'
                error={!!errors.carryForwardLimit}
                helperText={errors.carryForwardLimit?.message}
              />
            )}
          />

          {/* MIN DAYS */}
          <Controller
            name='minDays'
            control={control}
            rules={{ required: 'Minimum Days is required' }}
            render={({ field }) => (
              <CustomTextField
                {...field}
                fullWidth
                label='Minimum Days Per Application'
                error={!!errors.minDays}
                helperText={errors.minDays?.message}
              />
            )}
          />

          {/* MAX DAYS */}
          <Controller
            name='maxDays'
            control={control}
            rules={{ required: 'Maximum Days is required' }}
            render={({ field }) => (
              <CustomTextField
                {...field}
                fullWidth
                label='Maximum Days Per Application'
                error={!!errors.maxDays}
                helperText={errors.maxDays?.message}
              />
            )}
          />

          {/* APPROVAL REQUIRED */}
          <Controller
            name='isRequired'
            control={control}
            render={({ field }) => (
              <CustomTextField select fullWidth label='Requires Approval' {...field}>
                <MenuItem value='Required'>Required</MenuItem>
                <MenuItem value='Not Required'>Not Required</MenuItem>
              </CustomTextField>
            )}
          />

          {/* STATUS */}
          <Controller
            name='status'
            control={control}
            render={({ field }) => (
              <CustomTextField select fullWidth label='Status' {...field}>
                <MenuItem value='Active'>Active</MenuItem>
                <MenuItem value='Inactive'>Inactive</MenuItem>
              </CustomTextField>
            )}
          />

          {/* BUTTONS */}
          <div className='flex items-center gap-4'>
            <Button variant='contained' type='submit'>Submit</Button>
            <Button variant='tonal' color='error' onClick={handleReset}>Cancel</Button>
          </div>
        </form>
      </Drawer>

      {/* SNACKBAR */}
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


