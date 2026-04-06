
// 'use client'

// import { useState } from 'react'

// // 📦 MUI Imports
// import Button from '@mui/material/Button'
// import Drawer from '@mui/material/Drawer'
// import IconButton from '@mui/material/IconButton'
// import MenuItem from '@mui/material/MenuItem'
// import Typography from '@mui/material/Typography'
// import Divider from '@mui/material/Divider'
// import Snackbar from '@mui/material/Snackbar'
// import MuiAlert from '@mui/material/Alert'
// import Checkbox from '@mui/material/Checkbox'
// import FormControlLabel from '@mui/material/FormControlLabel'

// // 🕐 Date & Time Picker Imports
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
// import { TimePicker } from '@mui/x-date-pickers/TimePicker'
// import dayjs from 'dayjs'

// // 🧩 Third-party Imports
// import { useForm, Controller } from 'react-hook-form'

// // 🧠 Server Action
// import { createShift } from '../../../../app/server/actions.js'

// // 🧱 Component Imports
// import CustomTextField from '@core/components/mui/TextField'

// const AddDepartmentDrawer = props => {
//   const { open, handleClose, refreshDepartments } = props

//   const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' })

//   // 🔧 react-hook-form setup
//   const {
//     control,
//     reset: resetForm,
//     handleSubmit,
//     watch,
//     formState: { errors }
//   } = useForm({
//     defaultValues: {
//       name: '',
//       description: '',
//       status: 'Active',
//       startTime: '',
//       endTime: '',
//       breakDuration: '',
//       breakStartTime: '',
//       breakEndTime: '',
//       afternoonBreakStartTime: '',
//       afternoonBreakEndTime: '',
//       eveningBreakStartTime: '',
//       eveningBreakEndTime: '',
//       gracePeriod: '',
//       isNightShift: false
//     }
//   })

//   const isNightShift = watch('isNightShift')

//   // ✅ Form submit
//   const onSubmit = async data => {
//     try {
//           const payload = {
//       shiftName: data.name, // ✅ map frontend "name" to schema field
//       description: data.description,
//       startTime: data.startTime ? dayjs(data.startTime).format('HH:mm') : '',
//       endTime: data.endTime ? dayjs(data.endTime).format('HH:mm') : '',
//       breakDuration: data.breakDuration || '',
//       breakStartTime: data.breakStartTime ? dayjs(data.breakStartTime).format('HH:mm') : '',
//       breakEndTime: data.breakEndTime ? dayjs(data.breakEndTime).format('HH:mm') : '',
//       afternoonBreakStartTime: data.afternoonBreakStartTime
//         ? dayjs(data.afternoonBreakStartTime).format('HH:mm')
//         : '',
//       afternoonBreakEndTime: data.afternoonBreakEndTime
//         ? dayjs(data.afternoonBreakEndTime).format('HH:mm')
//         : '',
//       eveningBreakStartTime: data.eveningBreakStartTime
//         ? dayjs(data.eveningBreakStartTime).format('HH:mm')
//         : '',
//       eveningBreakEndTime: data.eveningBreakEndTime
//         ? dayjs(data.eveningBreakEndTime).format('HH:mm')
//         : '',
//       gracePeriod: data.gracePeriod || '',
//       isNightShift: !!data.isNightShift,
//       status: data.status
//     }
//       const response = await createShift(payload)

//       if (response?.success) {
//         setSnackbar({ open: true, message: response.message || 'Shift created successfully', severity: 'success' })

//         if (typeof refreshDepartments === 'function') await refreshDepartments()
//         handleClose()
//         resetForm()
//       } else {
//         setSnackbar({ open: true, message: response.message || 'Failed to create branch', severity: 'error' })
//       }
//     } catch (error) {
//       console.error('Error creating branch:', error)
//       setSnackbar({ open: true, message: 'Error creating branch', severity: 'error' })
//     }
//   }

//   const handleReset = () => {
//     handleClose()
//     resetForm()
//   }

//   return (
//     <>
//       <Drawer
//         open={open}
//         anchor='right'
//         variant='temporary'
//         onClose={handleReset}
//         ModalProps={{ keepMounted: true }}
//         sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 400 } } }}
//       >
//         <div className='flex items-center justify-between plb-5 pli-6'>
//           <Typography variant='h5'>Add New Leave Type</Typography>
//           <IconButton size='small' onClick={handleReset}>
//             <i className='tabler-x text-2xl text-textPrimary' />
//           </IconButton>
//         </div>

//         <Divider />

//         {/* 🧾 Form Section */}
//         <div>
//           <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-6 p-6'>

//             {/* ✅ Shift Name */}
//             <Controller
//               name='leaveTypeName'
//               control={control}
//               rules={{ required: true }}
//               render={({ field }) => (
//                 <CustomTextField
//                   {...field}
//                   value={field.value ?? ''}
//                   fullWidth
//                   label='Leave Type Name'
//                   placeholder='Annual Leave
// '
//                   error={!!errors.leaveTypeName}
//                   helperText={errors.leaveTypeName && 'This field is required.'}
//                 />
//               )}
//             />

//             {/* ✅ Description */}
//             <Controller
//               name='description'
//               control={control}
//               rules={{ required: true }}
//               render={({ field }) => (
//                 <CustomTextField
//                   {...field}
//                   value={field.value ?? ''}
//                   fullWidth
//                   label='Description'
//                   placeholder='Optional description'
//                   error={!!errors.description}
//                   helperText={errors.description && 'This field is required.'}
//                 />
//               )}
//             />

//                <Controller
//               name='maxDays'
//               control={control}
//               rules={{ required: true }}
//               render={({ field }) => (
//                 <CustomTextField
//                   {...field}
//                   value={field.value ?? ''}
//                   fullWidth
//                   label='Maximum Days Per Year'
//                   placeholder='10'
//                   error={!!errors.maxDays}
//                   helperText={errors.maxDays && 'This field is required.'}
//                 />
//               )}
//             />

//           <Controller
//               name='isPaidStaus'
//               control={control}
//               rules={{ required: true }}
//               render={({ field }) => (
//                 <CustomTextField select fullWidth label='Select Paid Status' {...field}>
//                   <MenuItem value='Paid'>Paid</MenuItem>
//                   <MenuItem value='Unpaid'>Unpaid</MenuItem>
//                 </CustomTextField>
//               )}
//             />

     

//             {/* 🟢 Status */}
//             <Controller
//               name='status'
//               control={control}
//               rules={{ required: true }}
//               render={({ field }) => (
//                 <CustomTextField select fullWidth label='Select Status' {...field}>
//                   <MenuItem value='Active'>Active</MenuItem>
//                   <MenuItem value='Inactive'>Inactive</MenuItem>
//                 </CustomTextField>
//               )}
//             />

//             {/* ✅ Action Buttons */}
//             <div className='flex items-center gap-4'>
//               <Button variant='contained' type='submit'>
//                 Submit
//               </Button>
//               <Button variant='tonal' color='error' onClick={handleReset}>
//                 Cancel
//               </Button>
//             </div>
//           </form>
//         </div>
//       </Drawer>

//       {/* ✅ Snackbar for Success/Error */}
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

import { useState } from 'react'

// 📦 MUI Imports
import Button from '@mui/material/Button'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'

// 🧩 Third-party Imports
import { useForm, Controller } from 'react-hook-form'

// 🧠 Server Action
import { createLeaveType } from '../../../../app/server/actions.js'

// 🧱 Component Imports
import CustomTextField from '@core/components/mui/TextField'

const AddDepartmentDrawer = props => {
  const { open, handleClose, refreshDepartments } = props

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  })

  // 🔧 react-hook-form setup
  const {
    control,
    reset: resetForm,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      leaveTypeName: '',
      description: '',
      maxDays: '',
      isPaidStatus: 'Paid',
      status: 'Active'
    }
  })

  // ✅ API Submit Handler
  const onSubmit = async data => {
    try {
      const payload = {
        leaveTypeName: data.leaveTypeName,
        description: data.description,
        maxDays: data.maxDays,
        isPaidStatus: data.isPaidStatus,
        status: data.status
      }

      const response = await createLeaveType(payload)

      if (response?.success) {
        setSnackbar({
          open: true,
          message: response.message || 'Leave type created successfully',
          severity: 'success'
        })

        if (typeof refreshDepartments === 'function') {
          await refreshDepartments()
        }

        handleClose()
        resetForm()
      } else {
        setSnackbar({
          open: true,
          message: response.message || 'Failed to create leave type',
          severity: 'error'
        })
      }
    } catch (error) {
      console.error('Error creating leave type:', error)
      setSnackbar({
        open: true,
        message: 'Error creating leave type',
        severity: 'error'
      })
    }
  }

  const handleReset = () => {
    handleClose()
    resetForm()
  }

  return (
    <>
      <Drawer
        open={open}
        anchor='right'
        variant='temporary'
        onClose={handleReset}
        ModalProps={{ keepMounted: true }}
        sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 400 } } }}
      >
        <div className='flex items-center justify-between plb-5 pli-6'>
          <Typography variant='h5'>Add New Leave Type</Typography>
          <IconButton size='small' onClick={handleReset}>
            <i className='tabler-x text-2xl text-textPrimary' />
          </IconButton>
        </div>

        <Divider />

        {/* 🧾 Form Section */}
        <div>
          <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-6 p-6'>

            {/* Leave Type Name */}
            <Controller
              name='leaveTypeName'
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <CustomTextField
                  {...field}
                  value={field.value ?? ''}
                  fullWidth
                  label='Leave Type Name'
                  placeholder='Annual Leave'
                  error={!!errors.leaveTypeName}
                  helperText={errors.leaveTypeName && 'This field is required.'}
                />
              )}
            />

            {/* Description */}
            <Controller
              name='description'
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <CustomTextField
                  {...field}
                  value={field.value ?? ''}
                  fullWidth
                  label='Description'
                  placeholder='Optional description'
                  error={!!errors.description}
                  helperText={errors.description && 'This field is required.'}
                />
              )}
            />

            {/* Max Days */}
            <Controller
              name='maxDays'
              control={control}
              rules={{ required: true, min: 1 }}
              render={({ field }) => (
                <CustomTextField
                  {...field}
                  value={field.value ?? ''}
                  fullWidth
                  type='number'
                  label='Maximum Days Per Year'
                  placeholder='10'
                  error={!!errors.maxDays}
                  helperText={errors.maxDays && 'Please enter a valid number.'}
                />
              )}
            />

            {/* Paid Status */}
            <Controller
              name='isPaidStatus'
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <CustomTextField select fullWidth label='Select Paid Status' {...field}>
                  <MenuItem value='Paid'>Paid</MenuItem>
                  <MenuItem value='Unpaid'>Unpaid</MenuItem>
                </CustomTextField>
              )}
            />

            {/* Status */}
            <Controller
              name='status'
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <CustomTextField select fullWidth label='Select Status' {...field}>
                  <MenuItem value='Active'>Active</MenuItem>
                  <MenuItem value='Inactive'>Inactive</MenuItem>
                </CustomTextField>
              )}
            />

            {/* Buttons */}
            <div className='flex items-center gap-4'>
              <Button variant='contained' type='submit'>
                Submit
              </Button>
              <Button variant='tonal' color='error' onClick={handleReset}>
                Cancel
              </Button>
            </div>
          </form>
        </div>
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

export default AddDepartmentDrawer

