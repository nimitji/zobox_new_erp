

// 'use client'

// import { useState, useEffect } from 'react'
// import { useSession } from 'next-auth/react'

// // 📦 MUI Imports
// import {
//   Button,
//   Drawer,
//   IconButton,
//   MenuItem,
//   Typography,
//   Divider,
//   Snackbar,
//   Alert as MuiAlert,
//   Chip,
//   Box
// } from '@mui/material'

// // 🧩 Third-party Imports
// import { useForm, Controller } from 'react-hook-form'

// // 🧠 Server Actions
// import {
//   createEmployeeSalary,
//   fetchListOfUser,
//   fetchListOfSalaryComponent
// } from '../../../../app/server/actions.js'

// // 🧱 Component Imports
// import CustomTextField from '@core/components/mui/TextField'

// const AddAttendanceDrawer = props => {
//   const { open, handleClose, refreshDepartments } = props

//   const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' })
//   const [employees, setEmployees] = useState([])
//   const [salaries, setSalaries] = useState([])
//   const [loadingSalaries, setLoadingSalaries] = useState(true)

//   const { data: session } = useSession()

//   // 🔧 react-hook-form setup
//   const {
//     control,
//     reset,
//     handleSubmit,
//     formState: { errors }
//   } = useForm({
//     defaultValues: {
//       employee: '',
//       annualSalary: '',
//       grossSalary: '',
//       basicSalary: '',
//       fixedSalary: '',
//       salaryComponents: [],
//       status: '',
//       notes: ''
//     }
//   })

//   // 🧠 Fetch Employee list
//   useEffect(() => {
//     const loadEmployees = async () => {
//       try {
//         const res = await fetchListOfUser()
//         if (res?.success && Array.isArray(res.data)) setEmployees(res.data)
//         else if (Array.isArray(res)) setEmployees(res)
//       } catch (err) {
//         console.error('❌ Error fetching employees:', err)
//       }
//     }

//     loadEmployees()
//   }, [])

//   // 🧠 Fetch Salary Components
//   useEffect(() => {
//     const loadSalaries = async () => {
//       try {
//         const list = await fetchListOfSalaryComponent()
//         console.log('✅ Salary Components Loaded:', list)
//         setSalaries(list)
//       } catch (err) {
//         console.error('❌ Error loading salary components:', err)
//       } finally {
//         setLoadingSalaries(false)
//       }
//     }

//     loadSalaries()
//   }, [])

//   // ✅ Submit Form
//   const onSubmit = async data => {
//     try {
//       const token = session?.user?.accessToken

//       if (!token) {
//         console.warn('⚠️ No access token found — user not logged in.')
//         return
//       }

//       const payload = {
//         employee: data.employee,
//         annualSalary: data.annualSalary,
//         grossSalary: data.grossSalary,
//         basicSalary: data.basicSalary,
//         fixedSalary: data.fixedSalary,
//         salaryComponents: data.salaryComponents,
//         status: data.status,
//         notes: data.notes
//       }

//       console.log('🟢 Sending Create Employee Salary Payload:', payload)

//       // ⭐ Correct API call with token
//       const response = await createEmployeeSalary(payload, token)

//       if (response?.success) {
//         setSnackbar({
//           open: true,
//           message: response.message || 'Salary created successfully',
//           severity: 'success'
//         })

//         if (typeof refreshDepartments === 'function') {
//           await refreshDepartments()
//         }

//         handleClose()
//         reset()
//       } else {
//         setSnackbar({
//           open: true,
//           message: response.message || 'Failed to create salary record',
//           severity: 'error'
//         })
//       }
//     } catch (error) {
//       console.error('❌ Error creating employee salary:', error)
//       setSnackbar({
//         open: true,
//         message: 'Error creating salary record',
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
//             Add New Advance Salary Request
//           </Typography>
//           <IconButton size='small' onClick={handleReset}>
//             <i className='tabler-x text-2xl text-textPrimary' />
//           </IconButton>
//         </div>

//         <Divider />

//         {/* 🧾 FORM */}
//         <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-6 p-6'>
//           {/* 👤 Employee */}
//           <Controller
//             name='employee'
//             control={control}
//             rules={{ required: 'Employee is required' }}
//             render={({ field }) => (
//               <CustomTextField
//                 select
//                 fullWidth
//                 label='Employee'
//                 {...field}
//                 error={!!errors.employee}
//                 helperText={errors.employee?.message}
//               >
//                 {employees.map(emp => (
//                   <MenuItem key={emp._id} value={emp._id}>
//                     {emp.username}
//                   </MenuItem>
//                 ))}
//               </CustomTextField>
//             )}
//           />

//           {/* 💰 Salary Fields */}
//           {['RequestedAmount'].map(fieldName => (
//             <Controller
//               key={fieldName}
//               name={fieldName}
//               control={control}
//               rules={{ required: `${fieldName.replace(/([A-Z])/g, ' $1')} is required` }}
//               render={({ field }) => (
//                 <CustomTextField
//                   {...field}
//                   fullWidth
//                   label={fieldName.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
//                   placeholder='Enter amount'
//                   error={!!errors[fieldName]}
//                   helperText={errors[fieldName]?.message}
//                 />
//               )}
//             />
//           ))}

      

//           {/* 📊 Status */}
//           <Controller
//             name='status'
//             control={control}
//             rules={{ required: 'Status is required' }}
//             render={({ field }) => (
//               <CustomTextField select fullWidth label='Status' {...field}>
//                 <MenuItem value='Pending'>Pending</MenuItem>
//                 <MenuItem value='Approved'>Approved</MenuItem>
//                  <MenuItem value='Rejected'>Rejected</MenuItem>
//               </CustomTextField>
//             )}
//           />

//           {/* 📝 Notes */}
//           <Controller
//             name='notes'
//             control={control}
//             render={({ field }) => (
//               <CustomTextField {...field} fullWidth label='Notes' placeholder='Optional remarks' />
//             )}
//           />

//           {/* ✅ Buttons */}
//           <div className='flex items-center gap-4'>
//             <Button variant='contained' type='submit'>
//               Submit
//             </Button>
//             <Button variant='tonal' color='error' onClick={handleReset}>
//               Cancel
//             </Button>
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

// export default AddAttendanceDrawer


'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'

// 📦 MUI Imports
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

// 🧩 Third-party Imports
import { useForm, Controller } from 'react-hook-form'

// 🧠 Server Actions
import {
  createAdvanceSalaryRequest,
  fetchListOfUser
  
} from '../../../../app/server/actions.js'

// 🧱 Component Imports
import CustomTextField from '@core/components/mui/TextField'

const AddAttendanceDrawer = props => {
  const { open, handleClose, refreshDepartments } = props

  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' })
  const [employees, setEmployees] = useState([])
 

  const { data: session } = useSession()
  const userType = session?.user.typeOfUser     // 👈 Checking user type (Employee / Admin)
  console.log("poojapihu123456",userType)

  // 📌 react-hook-form setup
  const {
    control,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      employee: '',
      requestedAmount: '',
      status: '',
      notes: ''
    }
  })

  // 🧠 Fetch Employee list
  useEffect(() => {
    const loadEmployees = async () => {
      try {
        const res = await fetchListOfUser()
        if (res?.success && Array.isArray(res.data)) setEmployees(res.data)
        else if (Array.isArray(res)) setEmployees(res)
      } catch (err) {
        console.error('❌ Error fetching employees:', err)
      }
    }

    loadEmployees()
  }, [])

 

  // ✅ Submit Form
  const onSubmit = async data => {
    try {
      const token = session?.user?.accessToken
      if (!token) return

      const payload = {
        employee: data.employee,
        requestedAmount: data.requestedAmount,
        status: data.status,
        notes: data.notes
      }

      const response = await createAdvanceSalaryRequest(payload, token)

      setSnackbar({
        open: true,
        message: response?.message || 'Record saved',
        severity: response?.success ? 'success' : 'error'
      })

      if (response?.success) {
        refreshDepartments?.()
        handleClose()
        reset()
      }
    } catch (error) {
      console.log(error)
      setSnackbar({
        open: true,
        message: 'Something went wrong!',
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
            Add New Advance Salary Request
          </Typography>
          <IconButton size='small' onClick={handleReset}>
            <i className='tabler-x text-2xl text-textPrimary' />
          </IconButton>
        </div>

        <Divider />

        {/* 🧾 FORM */}
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-6 p-6'>
          
          {/* 👤 Employee */}
          <Controller
            name='employee'
            control={control}
            rules={{ required: 'Employee is required' }}
            render={({ field }) => (
              <CustomTextField
                select
                fullWidth
                label='Employee'
                {...field}
                error={!!errors.employee}
                helperText={errors.employee?.message}
              >
                {employees.map(emp => (
                  <MenuItem key={emp._id} value={emp._id}>
                    {emp.username}
                  </MenuItem>
                ))}
              </CustomTextField>
            )}
          />

          {/* 💰 Requested Amount */}
          <Controller
            name='requestedAmount'
            control={control}
            rules={{ required: 'Requested Amount is required' }}
            render={({ field }) => (
              <CustomTextField
                {...field}
                fullWidth
                label='Requested Amount'
                placeholder='Enter amount'
                error={!!errors.requestedAmount}
                helperText={errors.requestedAmount?.message}
              />
            )}
          />

          {/* 📊 Status — CONDITIONAL */}
          <Controller
            name='status'
            control={control}
            rules={{ required: 'Status is required' }}
            render={({ field }) => (
              <CustomTextField select fullWidth label='Status' {...field}>
                <MenuItem value='Pending'>Pending</MenuItem>

                {/* 👇 Hide Approved Option for Employees */}
                {userType !== 'Employee' && (
                  <MenuItem value='Approved'>Approved</MenuItem>
                )}

                <MenuItem value='Rejected'>Rejected</MenuItem>
              </CustomTextField>
            )}
          />

          {/* 📝 Notes */}
          <Controller
            name='notes'
            control={control}
            render={({ field }) => (
              <CustomTextField {...field} fullWidth label='Notes' placeholder='Optional remarks' />
            )}
          />

          {/* 🎯 Buttons */}
          <div className='flex items-center gap-4'>
            <Button variant='contained' type='submit'>
              Submit
            </Button>
            <Button variant='tonal' color='error' onClick={handleReset}>
              Cancel
            </Button>
          </div>
        </form>
      </Drawer>

      {/* 🔔 Snackbar */}
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

export default AddAttendanceDrawer






