

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
//   Alert as MuiAlert
// } from '@mui/material'

// // 🧩 Third-party Imports
// import { useForm, Controller } from 'react-hook-form'

// // 🧠 Server Actions
// import {
//   createNapsNats,
//   fetchListOfNapsNatsUser
// } from '../../../../app/server/actions'

// // 🧱 Component Imports
// import CustomTextField from '@core/components/mui/TextField'

// const AddAttendanceDrawer = props => {
//   const { open, handleClose, refreshDepartments } = props

//   const { data: session } = useSession()

//   const [employees, setEmployees] = useState([])
//   const [napsNatsType, setNapsNatsType] = useState('')
//   const [snackbar, setSnackbar] = useState({
//     open: false,
//     message: '',
//     severity: 'success'
//   })

//   // 📌 react-hook-form
//   const {
//     control,
//     reset,
//     handleSubmit,
//     setValue,
//     formState: { errors }
//   } = useForm({
//     defaultValues: {
//       napsNatsStatus: '',
//       employee: '',
//       amount: '',
//       status: ''
//     }
//   })

//   // ✅ Fetch employees on NAPS / NATS change
//   useEffect(() => {
//     if (!napsNatsType) return

//     const loadEmployees = async () => {
//       try {
//         const res = await fetchListOfNapsNatsUser(`${napsNatsType}`)
//         setEmployees(Array.isArray(res) ? res : [])
//         setValue('employee', '') // reset employee dropdown
//       } catch (error) {
//         console.error('❌ Error fetching employees', error)
//         setEmployees([])
//       }
//     }

//     loadEmployees()
//   }, [napsNatsType, setValue])

//   // ✅ Submit Form
//   const onSubmit = async data => {
//     try {
//       const token = session?.user?.accessToken
//       if (!token) return

//       const payload = {
//         employee: data.employee,
//         napsNatsStatus: data.napsNatsStatus,
//         amount: data.amount,
//         status: data.status
      
//       }

//       const response = await createNapsNats(payload, token)

//       setSnackbar({
//         open: true,
//         message: response?.message || 'Record saved successfully',
//         severity: response?.success ? 'success' : 'error'
//       })

//       if (response?.success) {
//         refreshDepartments?.()
//         handleClose()
//         reset()
//         setEmployees([])
//       }
//     } catch (error) {
//       setSnackbar({
//         open: true,
//         message: 'Something went wrong!',
//         severity: 'error'
//       })
//     }
//   }

//   const handleReset = () => {
//     handleClose()
//     reset()
//     setEmployees([])
//   }

//   return (
//     <>
//       <Drawer
//         open={open}
//         anchor='right'
//         onClose={handleReset}
//         sx={{ '& .MuiDrawer-paper': { width: { xs: 320, sm: 420 } } }}
//       >
//         <div className='flex items-center justify-between p-5'>
//           <Typography variant='h5' fontWeight='bold'>
//             Add NAPS/NATS Amount
//           </Typography>
//           <IconButton onClick={handleReset}>
//             <i className='tabler-x text-2xl' />
//           </IconButton>
//         </div>

//         <Divider />

//         <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-6 p-6'>

//           {/* ✅ NAPS / NATS */}
//           <Controller
//             name='napsNatsStatus'
//             control={control}
//             rules={{ required: 'NAPS / NATS is required' }}
//             render={({ field }) => (
//               <CustomTextField
//                 select
//                 fullWidth
//                 label='NAPS/NATS Type'
//                 {...field}
//                 onChange={e => {
//                   field.onChange(e)
//                   setNapsNatsType(e.target.value)
//                 }}
//                 error={!!errors.napsNatsStatus}
//                 helperText={errors.napsNatsStatus?.message}
//               >
//                 <MenuItem value='NAPS'>NAPS</MenuItem>
//                 <MenuItem value='NATS'>NATS</MenuItem>
               
//               </CustomTextField>
//             )}
//           />

//           {/* ✅ Employee */}
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
//                 disabled={!employees.length}
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

//            <Controller
//             name='deductionForThisMonth'
//             control={control}
//             rules={{ required: 'deductionForThisMonth is required' }}
//             render={({ field }) => (
//               <CustomTextField
//                 select
//                 fullWidth
//                 label='Deduction For This Month'
//                 {...field}
//                 error={!!errors.deductionForThisMonth}
//                 helperText={errors.deductionForThisMonth?.message}
//               >
//                <MenuItem value="1">January</MenuItem> 
//                <MenuItem value="2">February</MenuItem> 
//                <MenuItem value="3">March</MenuItem> 
//                <MenuItem value="4">April</MenuItem> 
//                <MenuItem value="5">May</MenuItem>
//                 <MenuItem value="6">June</MenuItem> 
//                 <MenuItem value="7">July</MenuItem> 
//                 <MenuItem value="8">August</MenuItem> 
//                 <MenuItem value="9">September</MenuItem> 
//                 <MenuItem value="10">October</MenuItem>
//                  <MenuItem value="11">November</MenuItem> 
//                  <MenuItem value="12">December</MenuItem>
//               </CustomTextField>
//             )}
//           />


//           {/* ✅ Amount */}
//           <Controller
//             name='amount'
//             control={control}
//             rules={{ required: 'Amount is required' }}
//             render={({ field }) => (
//               <CustomTextField
//                 {...field}
//                 fullWidth
//                 label='Amount'
//                 placeholder='Enter amount'
//                 error={!!errors.amount}
//                 helperText={errors.amount?.message}
//               />
//             )}
//           />

//           {/* ✅ Earned / Deduct */}
//           <Controller
//             name='status'
//             control={control}
//             rules={{ required: 'Status is required' }}
//             render={({ field }) => (
//               <CustomTextField
//                 select
//                 fullWidth
//                 label='Status'
//                 {...field}
//                 error={!!errors.status}
//                 helperText={errors.status?.message}
//               >
//                 <MenuItem value='Earned'>Earned</MenuItem>
//                 <MenuItem value='Deduct'>Deduct</MenuItem>
//               </CustomTextField>
//             )}
//           />

          

//           {/* ✅ Buttons */}
//           <div className='flex gap-4'>
//             <Button variant='contained' type='submit'>
//               Submit
//             </Button>
//             <Button variant='tonal' color='error' onClick={handleReset}>
//               Cancel
//             </Button>
//           </div>
//         </form>
//       </Drawer>

//      {/* 🔔 Snackbar */}
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
import { createNapsNats, fetchListOfNapsNatsUser } from '../../../../app/server/actions'

// 🧱 Component Imports
import CustomTextField from '@core/components/mui/TextField'

const AddAttendanceDrawer = ({ open, handleClose, refreshDepartments }) => {
  const { data: session } = useSession()

  const [employees, setEmployees] = useState([])
  const [napsNatsType, setNapsNatsType] = useState('')
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  })

  // ✅ NOTICE: all fields have default values
  const {
    control,
    reset,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm({
    defaultValues: {
      napsNatsStatus: '',
      employee: '',
      deductionForThisMonth: '',
      amount: '',
      status: ''
    }
  })

  // ✅ Fetch employees
  useEffect(() => {
    if (!napsNatsType) return

    const loadEmployees = async () => {
      try {
        const res = await fetchListOfNapsNatsUser(napsNatsType)
        setEmployees(Array.isArray(res) ? res : [])
        setValue('employee', '') // reset employee on change
      } catch (err) {
        console.error(err)
        setEmployees([])
      }
    }

    loadEmployees()
  }, [napsNatsType, setValue])

  // ✅ Submit
  const onSubmit = async data => {
    try {
      const token = session?.user?.accessToken
      if (!token) return

      const response = await createNapsNats(
        {
          employee: data.employee,
          napsNatsStatus: data.napsNatsStatus,
          deductionForThisMonth: data.deductionForThisMonth,
          amount: data.amount,
          status: data.status
        },
        token
      )

      setSnackbar({
        open: true,
        message: response?.message || 'Saved successfully',
        severity: response?.success ? 'success' : 'error'
      })

      if (response?.success) {
        reset()
        setEmployees([])
        handleClose()
        refreshDepartments?.()
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Something went wrong',
        severity: 'error'
      })
    }
  }

  const handleReset = () => {
    reset()
    setEmployees([])
    handleClose()
  }

  return (
    <>
      <Drawer
        open={open}
        anchor='right'
        onClose={handleReset}
        sx={{ '& .MuiDrawer-paper': { width: { xs: 320, sm: 420 } } }}
      >
        <div className='flex items-center justify-between p-5'>
          <Typography variant='h5' fontWeight='bold'>
            Add NAPS / NATS Amount
          </Typography>
          <IconButton onClick={handleReset}>
            <i className='tabler-x text-2xl' />
          </IconButton>
        </div>

        <Divider />

        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-6 p-6'>
          {/* NAPS / NATS */}
          <Controller
            name='napsNatsStatus'
            control={control}
            rules={{ required: 'Required' }}
            render={({ field }) => (
              <CustomTextField
                select
                fullWidth
                label='NAPS / NATS'
                {...field}
                value={field.value || ''}
                onChange={e => {
                  field.onChange(e)
                  setNapsNatsType(e.target.value)
                }}
                error={!!errors.napsNatsStatus}
                helperText={errors.napsNatsStatus?.message}
              >
                <MenuItem value='NAPS'>NAPS</MenuItem>
                <MenuItem value='NATS'>NATS</MenuItem>
              </CustomTextField>
            )}
          />

          {/* Employee */}
          <Controller
            name='employee'
            control={control}
            rules={{ required: 'Required' }}
            render={({ field }) => (
              <CustomTextField
                select
                fullWidth
                label='Employee'
                {...field}
                value={field.value || ''}
                disabled={!employees.length}
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

          {/* Month */}
          <Controller
            name='deductionForThisMonth'
            control={control}
            rules={{ required: 'Required' }}
            render={({ field }) => (
              <CustomTextField
                select
                fullWidth
                label='Deduction Month'
                {...field}
                value={field.value || ''}
                error={!!errors.deductionForThisMonth}
              >
                {[
                  'January','February','March','April','May','June',
                  'July','August','September','October','November','December'
                ].map((m, i) => (
                  <MenuItem key={i + 1} value={`${i + 1}`}>
                    {m}
                  </MenuItem>
                ))}
              </CustomTextField>
            )}
          />

          {/* Amount */}
          <Controller
            name='amount'
            control={control}
            rules={{ required: 'Required' }}
            render={({ field }) => (
              <CustomTextField
                {...field}
                value={field.value || ''}
                fullWidth
                type='number'
                label='Amount'
                error={!!errors.amount}
                helperText={errors.amount?.message}
              />
            )}
          />

          {/* Status */}
          <Controller
            name='status'
            control={control}
            rules={{ required: 'Required' }}
            render={({ field }) => (
              <CustomTextField
                select
                fullWidth
                label='Status'
                {...field}
                value={field.value || ''}
                error={!!errors.status}
              >
                <MenuItem value='Earned'>Earned</MenuItem>
                <MenuItem value='Deduct'>Deduct</MenuItem>
              </CustomTextField>
            )}
          />

          <div className='flex gap-4'>
            <Button variant='contained' type='submit'>
              Submit
            </Button>
            <Button variant='tonal' color='error' onClick={handleReset}>
              Cancel
            </Button>
          </div>
        </form>
      </Drawer>

      {/* Snackbar */}
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








