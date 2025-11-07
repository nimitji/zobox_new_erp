


// 'use client'

// import { useState, useEffect } from 'react'

// // 📦 MUI Imports
// import Button from '@mui/material/Button'
// import Drawer from '@mui/material/Drawer'
// import IconButton from '@mui/material/IconButton'
// import MenuItem from '@mui/material/MenuItem'
// import Typography from '@mui/material/Typography'
// import Divider from '@mui/material/Divider'
// import Snackbar from '@mui/material/Snackbar'
// import MuiAlert from '@mui/material/Alert'

// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
// import { DatePicker } from '@mui/x-date-pickers/DatePicker'
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
// import dayjs from 'dayjs'

// // 🧩 Third-party Imports
// import { useForm, Controller } from 'react-hook-form'
// import FileUploadController from '../../../../components/fileUploadController'

// // 🧠 Server Action
// import { createTermination, fetchListOfUser, fetchListOfAwardTypes } from '../../../../app/server/actions.js'

// // 🧱 Component Imports
// import CustomTextField from '@core/components/mui/TextField'

// const AddDepartmentDrawer = props => {
//   const { open, handleClose, refreshDepartments } = props

//   const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' })
//   const [branches, setBranches] = useState([]) // employees
//   const [awardTypes, setAwardTypes] = useState([])

//   // 🔧 react-hook-form setup
//   const {
//     control,
//     reset,
//     handleSubmit,
//     formState: { errors }
//   } = useForm({
//     defaultValues: {
//       user: '',
//       awardType: '',
//       gift: '',
//       monetaryValue: '',
//       description: '',
//       awardDate: '',
//       photo: null,
//       certificate: null
//     }
//   })

//   // 🧠 Fetch Employee list
//   useEffect(() => {
//     const loadEmployees = async () => {
//       try {
//         const res = await fetchListOfUser()
//         if (res?.success && Array.isArray(res.data)) setBranches(res.data)
//         else if (Array.isArray(res)) setBranches(res)
//       } catch (err) {
//         console.error('Error fetching employees:', err)
//       }
//     }
//     loadEmployees()
//   }, [])

//   // 🧠 Fetch Award Types
//   useEffect(() => {
//     const loadAwardTypes = async () => {
//       try {
//         const res = await fetchListOfAwardTypes()
//         if (res?.success && Array.isArray(res.data)) setAwardTypes(res.data)
//         else if (Array.isArray(res)) setAwardTypes(res)
//       } catch (err) {
//         console.error('Error fetching award types:', err)
//       }
//     }
//     loadAwardTypes()
//   }, [])

//   // ✅ Submit Form (with image upload)
//   const onSubmit = async data => {
//     try {
//       const formData = new FormData()
//       formData.append('user', data.user)
//       formData.append('awardType', data.awardType)
//       formData.append('gift', data.gift)
//       formData.append('monetaryValue', data.monetaryValue)
//       formData.append('description', data.description)
//       formData.append('awardDate', data.awardDate)

//       if (data.photo) formData.append('photo', data.photo)
//       if (data.certificate) formData.append('certificate', data.certificate)

//       const response = await createTermination(formData)

//       if (response?.success) {
//         setSnackbar({ open: true, message: response.message || 'Award created successfully', severity: 'success' })
//         if (typeof refreshDepartments === 'function') await refreshDepartments()
//         handleClose()
//         reset()
//       } else {
//         setSnackbar({ open: true, message: response.message || 'Failed to create award', severity: 'error' })
//       }
//     } catch (error) {
//       console.error('Error creating award:', error)
//       setSnackbar({ open: true, message: 'Error creating award', severity: 'error' })
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
//             Add New Resignation
//           </Typography>
//           <IconButton size='small' onClick={handleReset}>
//             <i className='tabler-x text-2xl text-textPrimary' />
//           </IconButton>
//         </div>
//         <Divider />

//         {/* Form */}
//         <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-6 p-6'>

//           {/* 🧑 Employee */}
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
//                 {branches.length > 0 ? (
//                   branches.map(emp => (
//                     <MenuItem key={emp._id} value={emp._id}>
//                       {emp.username}
//                     </MenuItem>
//                   ))
//                 ) : (
//                   <MenuItem disabled>No Employees found</MenuItem>
//                 )}
//               </CustomTextField>
//             )}
//           />


//              <Controller
//                         name='terminationType'
//                         control={control}
//                         rules={{ required: true }}
//                         render={({ field }) => (
//                           <CustomTextField select fullWidth label='Termination Type' {...field}>
//                             <MenuItem value='Voluntary'>Voluntary</MenuItem>
//                             <MenuItem value='Involuntary'>Involuntary</MenuItem>
//                             <MenuItem value='Layoff'>Layoff</MenuItem>
//                             <MenuItem value='Retirement'>Retirement</MenuItem>
//                             <MenuItem value='Contract Completion'>Contract Completion</MenuItem>
//                             <MenuItem value='Probation Failure'>Probation Failure</MenuItem>
//                             <MenuItem value='Misconduct'>Misconduct</MenuItem>
//                              <MenuItem value='Performance Issues'>Performance Issues</MenuItem>
//                           </CustomTextField>
//                         )}
//                       />

      

//           {/* 📅 Award Date */}
//          <LocalizationProvider dateAdapter={AdapterDayjs}>
//   <Controller
//     name='noticeDate'
//     control={control}
//     rules={{ required: 'Notice date is required' }}
//     render={({ field }) => (
//       <DatePicker
//         label='Notice Date'
//         value={field.value ? dayjs(field.value) : null}
//         onChange={newValue => field.onChange(newValue ? newValue.toISOString() : null)}
//         enableAccessibleFieldDOMStructure={false} // ✅ Fix for MUI v7+
//         slots={{ textField: CustomTextField }}
//         slotProps={{
//           textField: {
//             fullWidth: true,
//             error: !!errors.noticeDate,
//             helperText: errors.noticeDate?.message
//           }
//         }}
//       />
//     )}
//   />
// </LocalizationProvider>
// <LocalizationProvider dateAdapter={AdapterDayjs}>
//   <Controller
//     name='terminationDate'
//     control={control}
//     rules={{ required: 'Termination date is required' }}
//     render={({ field }) => (
//       <DatePicker
//         label='Termination Date'
//         value={field.value ? dayjs(field.value) : null}
//         onChange={newValue => field.onChange(newValue ? newValue.toISOString() : null)}
//         enableAccessibleFieldDOMStructure={false} // ✅ Fix for MUI v7+
//         slots={{ textField: CustomTextField }}
//         slotProps={{
//           textField: {
//             fullWidth: true,
//             error: !!errors.terminationDate,
//             helperText: errors.terminationDate?.message
//           }
//         }}
//       />
//     )}
//   />
// </LocalizationProvider>



//           {/* 🎁 Gift */}
//           <Controller
//             name='noticePeriod'
//             control={control}
//             rules={{ required: 'Notice Period is required' }}
//             render={({ field }) => (
//               <CustomTextField {...field} fullWidth label='Notice Period' error={!!errors.noticePeriod} helperText={errors.noticePeriod?.message} />
//             )}
//           />

//           {/* 💰 Monetary Value */}
//           <Controller
//             name='reason'
//             control={control}
//             rules={{ required: 'Reason value is required' }}
//             render={({ field }) => (
//               <CustomTextField {...field} fullWidth label='Reason' error={!!errors.reason} helperText={errors.reason?.message} />
//             )}
//           />

//           {/* 📝 Description */}
//           <Controller
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

//           {/* 📸 Photo Upload */}
//           <FileUploadController
//             control={control}
//             errors={errors}
//             name='document'
//             label='Document'
//             required
//             accept='image/*'
//           />
    
//                 <Controller
//                   name='status'
//                   control={control}
//                   rules={{ required: true }}
//                   render={({ field }) => (
//                     <CustomTextField select fullWidth label='Select Status' {...field}>
//                       <MenuItem value='Planned'>Planned</MenuItem>
//                       <MenuItem value='In Progress'>In Progress</MenuItem>
//                       <MenuItem value='Completed'>Completed</MenuItem>
//                     </CustomTextField>
//                   )}
//                 />
      

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

// 'use client'

// import { useState, useEffect } from 'react'

// // 📦 MUI Imports
// import Button from '@mui/material/Button'
// import Drawer from '@mui/material/Drawer'
// import IconButton from '@mui/material/IconButton'
// import MenuItem from '@mui/material/MenuItem'
// import Typography from '@mui/material/Typography'
// import Divider from '@mui/material/Divider'
// import Snackbar from '@mui/material/Snackbar'
// import MuiAlert from '@mui/material/Alert'

// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
// import { DatePicker } from '@mui/x-date-pickers/DatePicker'
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
// import dayjs from 'dayjs'

// // 🧩 Third-party Imports
// import { useForm, Controller } from 'react-hook-form'
// import FileUploadController from '../../../../components/fileUploadController'

// // 🧠 Server Action
// import { createTermination, fetchListOfUser, fetchListOfAwardTypes } from '../../../../app/server/actions.js'

// // 🧱 Component Imports
// import CustomTextField from '@core/components/mui/TextField'

// const AddDepartmentDrawer = props => {
//   const { open, handleClose, refreshDepartments } = props

//   const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' })
//   const [branches, setBranches] = useState([]) // employees
//   const [awardTypes, setAwardTypes] = useState([])

//   // 🔧 react-hook-form setup
//   const {
//     control,
//     reset,
//     handleSubmit,
//     formState: { errors }
//   } = useForm({
//     defaultValues: {
//       employee: '',
//       terminationType: '',
//       noticeDate: '',
//       terminationDate: '',
//       noticePeriod: '',
//       reason: '',
//       description: '',
//       document: null,
//       status: ''
//     }
//   })

//   // 🧠 Fetch Employee list
//   useEffect(() => {
//     const loadEmployees = async () => {
//       try {
//         const res = await fetchListOfUser()
//         if (res?.success && Array.isArray(res.data)) setBranches(res.data)
//         else if (Array.isArray(res)) setBranches(res)
//       } catch (err) {
//         console.error('Error fetching employees:', err)
//       }
//     }
//     loadEmployees()
//   }, [])

//   // 🧠 Fetch Award Types
//   useEffect(() => {
//     const loadAwardTypes = async () => {
//       try {
//         const res = await fetchListOfAwardTypes()
//         if (res?.success && Array.isArray(res.data)) setAwardTypes(res.data)
//         else if (Array.isArray(res)) setAwardTypes(res)
//       } catch (err) {
//         console.error('Error fetching award types:', err)
//       }
//     }
//     loadAwardTypes()
//   }, [])

//   // ✅ Submit Form (with image upload)
//   const onSubmit = async data => {
//     try {
//       const formData = new FormData()

//       // ✅ Correct field names as per backend
//       formData.append('employee', data.employee)
//       formData.append('terminationType', data.terminationType)
//       formData.append('noticeDate', data.noticeDate)
//       formData.append('terminationDate', data.terminationDate)
//       formData.append('noticePeriod', data.noticePeriod)
//       formData.append('reason', data.reason)
//       formData.append('description', data.description)
//       formData.append('status', data.status)

//       if (data.document) formData.append('document', data.document)

//       const response = await createTermination(formData)

//       if (response?.success) {
//         setSnackbar({ open: true, message: response.message || 'Termination created successfully', severity: 'success' })
//         if (typeof refreshDepartments === 'function') await refreshDepartments()
//         handleClose()
//         reset()
//       } else {
//         setSnackbar({ open: true, message: response.message || 'Failed to create termination', severity: 'error' })
//       }
//     } catch (error) {
//       console.error('Error creating termination:', error)
//       setSnackbar({ open: true, message: 'Error creating termination', severity: 'error' })
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
//             Add New Resignation
//           </Typography>
//           <IconButton size='small' onClick={handleReset}>
//             <i className='tabler-x text-2xl text-textPrimary' />
//           </IconButton>
//         </div>
//         <Divider />

//         {/* Form */}
//         <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-6 p-6'>

//           {/* 🧑 Employee */}
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
//                 {branches.length > 0 ? (
//                   branches.map(emp => (
//                     <MenuItem key={emp._id} value={emp._id}>
//                       {emp.username}
//                     </MenuItem>
//                   ))
//                 ) : (
//                   <MenuItem disabled>No Employees found</MenuItem>
//                 )}
//               </CustomTextField>
//             )}
//           />

//           {/* Termination Type */}
//           <Controller
//             name='terminationType'
//             control={control}
//             rules={{ required: true }}
//             render={({ field }) => (
//               <CustomTextField select fullWidth label='Termination Type' {...field}>
//                 <MenuItem value='Voluntary'>Voluntary</MenuItem>
//                 <MenuItem value='Involuntary'>Involuntary</MenuItem>
//                 <MenuItem value='Layoff'>Layoff</MenuItem>
//                 <MenuItem value='Retirement'>Retirement</MenuItem>
//                 <MenuItem value='Contract Completion'>Contract Completion</MenuItem>
//                 <MenuItem value='Probation Failure'>Probation Failure</MenuItem>
//                 <MenuItem value='Misconduct'>Misconduct</MenuItem>
//                 <MenuItem value='Performance Issues'>Performance Issues</MenuItem>
//               </CustomTextField>
//             )}
//           />

//           {/* 📅 Notice Date */}
//           <LocalizationProvider dateAdapter={AdapterDayjs}>
//             <Controller
//               name='noticeDate'
//               control={control}
//               rules={{ required: 'Notice date is required' }}
//               render={({ field }) => (
//                 <DatePicker
//                   label='Notice Date'
//                   value={field.value ? dayjs(field.value) : null}
//                   onChange={newValue => field.onChange(newValue ? newValue.toISOString() : null)}
//                   enableAccessibleFieldDOMStructure={false}
//                   slots={{ textField: CustomTextField }}
//                   slotProps={{
//                     textField: {
//                       fullWidth: true,
//                       error: !!errors.noticeDate,
//                       helperText: errors.noticeDate?.message
//                     }
//                   }}
//                 />
//               )}
//             />
//           </LocalizationProvider>

//           {/* 📅 Termination Date */}
//           <LocalizationProvider dateAdapter={AdapterDayjs}>
//             <Controller
//               name='terminationDate'
//               control={control}
//               rules={{ required: 'Termination date is required' }}
//               render={({ field }) => (
//                 <DatePicker
//                   label='Termination Date'
//                   value={field.value ? dayjs(field.value) : null}
//                   onChange={newValue => field.onChange(newValue ? newValue.toISOString() : null)}
//                   enableAccessibleFieldDOMStructure={false}
//                   slots={{ textField: CustomTextField }}
//                   slotProps={{
//                     textField: {
//                       fullWidth: true,
//                       error: !!errors.terminationDate,
//                       helperText: errors.terminationDate?.message
//                     }
//                   }}
//                 />
//               )}
//             />
//           </LocalizationProvider>

//           {/* Notice Period */}
//           <Controller
//             name='noticePeriod'
//             control={control}
//             rules={{ required: 'Notice Period is required' }}
//             render={({ field }) => (
//               <CustomTextField {...field} fullWidth label='Notice Period' error={!!errors.noticePeriod} helperText={errors.noticePeriod?.message} />
//             )}
//           />

//           {/* Reason */}
//           <Controller
//             name='reason'
//             control={control}
//             rules={{ required: 'Reason is required' }}
//             render={({ field }) => (
//               <CustomTextField {...field} fullWidth label='Reason' error={!!errors.reason} helperText={errors.reason?.message} />
//             )}
//           />

//           {/* Description */}
//           <Controller
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

//           {/* 📄 Document Upload */}
//           <FileUploadController
//             control={control}
//             errors={errors}
//             name='document'
//             label='Document'
//             required
//             accept='image/*'
//           />

//           {/* Status */}
//           <Controller
//             name='status'
//             control={control}
//             rules={{ required: true }}
//             render={({ field }) => (
//               <CustomTextField select fullWidth label='Select Status' {...field}>
//                 <MenuItem value='Planned'>Planned</MenuItem>
//                 <MenuItem value='In Progress'>In Progress</MenuItem>
//                 <MenuItem value='Completed'>Completed</MenuItem>
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

// 📦 MUI Imports
import Button from '@mui/material/Button'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'

// 🧩 Third-party Imports
import { useForm, Controller } from 'react-hook-form'
import FileUploadController from '../../../../components/fileUploadController'

// 🧠 Server Action
import { createTermination, fetchListOfUser, fetchListOfAwardTypes } from '../../../../app/server/actions.js'

// 🧱 Component Imports
import CustomTextField from '@core/components/mui/TextField'

const AddDepartmentDrawer = props => {
  const { open, handleClose, refreshDepartments } = props

  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' })
  const [branches, setBranches] = useState([]) // employees
  const [awardTypes, setAwardTypes] = useState([])

  // 🔧 react-hook-form setup
  const {
    control,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      employee: '',
      terminationType: '',
      noticeDate: '',
      terminationDate: '',
      noticePeriod: '',
      reason: '',
      description: '',
      document: null,
      status: ''
    }
  })

  // 🧠 Fetch Employee list
  useEffect(() => {
    const loadEmployees = async () => {
      try {
        const res = await fetchListOfUser()
        if (res?.success && Array.isArray(res.data)) setBranches(res.data)
        else if (Array.isArray(res)) setBranches(res)
      } catch (err) {
        console.error('Error fetching employees:', err)
      }
    }
    loadEmployees()
  }, [])

  // 🧠 Fetch Award Types
  useEffect(() => {
    const loadAwardTypes = async () => {
      try {
        const res = await fetchListOfAwardTypes()
        if (res?.success && Array.isArray(res.data)) setAwardTypes(res.data)
        else if (Array.isArray(res)) setAwardTypes(res)
      } catch (err) {
        console.error('Error fetching award types:', err)
      }
    }
    loadAwardTypes()
  }, [])

  // ✅ Submit Form (with image upload)
  const onSubmit = async data => {
    try {
      const formData = new FormData()
      formData.append('employee', data.employee)
      formData.append('terminationType', data.terminationType)
      formData.append('noticeDate', data.noticeDate)
      formData.append('terminationDate', data.terminationDate)
      formData.append('noticePeriod', data.noticePeriod)
      formData.append('reason', data.reason)
      formData.append('description', data.description)
      formData.append('status', data.status)
      if (data.document) formData.append('document', data.document)

      const response = await createTermination(formData)

      if (response?.success) {
        setSnackbar({ open: true, message: response.message || 'Termination created successfully', severity: 'success' })
        if (typeof refreshDepartments === 'function') await refreshDepartments()
        handleClose()
        reset()
      } else {
        setSnackbar({ open: true, message: response.message || 'Failed to create termination', severity: 'error' })
      }
    } catch (error) {
      console.error('Error creating termination:', error)
      setSnackbar({ open: true, message: 'Error creating termination', severity: 'error' })
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
            Add New Resignation
          </Typography>
          <IconButton size='small' onClick={handleReset}>
            <i className='tabler-x text-2xl text-textPrimary' />
          </IconButton>
        </div>
        <Divider />

        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-6 p-6'>

          {/* 🧑 Employee */}
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
                value={field.value ?? ''} // ✅ ensure controlled
                error={!!errors.employee}
                helperText={errors.employee?.message}
              >
                {branches.length > 0 ? (
                  branches.map(emp => (
                    <MenuItem key={emp._id} value={emp._id}>
                      {emp.username}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem disabled>No Employees found</MenuItem>
                )}
              </CustomTextField>
            )}
          />

          {/* Termination Type */}
          <Controller
            name='terminationType'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <CustomTextField select fullWidth label='Termination Type' {...field} value={field.value ?? ''}>
                <MenuItem value='Voluntary'>Voluntary</MenuItem>
                <MenuItem value='Involuntary'>Involuntary</MenuItem>
                <MenuItem value='Layoff'>Layoff</MenuItem>
                <MenuItem value='Retirement'>Retirement</MenuItem>
                <MenuItem value='Contract Completion'>Contract Completion</MenuItem>
                <MenuItem value='Probation Failure'>Probation Failure</MenuItem>
                <MenuItem value='Misconduct'>Misconduct</MenuItem>
                <MenuItem value='Performance Issues'>Performance Issues</MenuItem>
              </CustomTextField>
            )}
          />

          {/* 📅 Notice Date */}
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Controller
              name='noticeDate'
              control={control}
              rules={{ required: 'Notice date is required' }}
              render={({ field }) => (
                <DatePicker
                  label='Notice Date'
                  value={field.value ? dayjs(field.value) : null}
                  onChange={newValue => field.onChange(newValue ? newValue.toISOString() : '')}
                  enableAccessibleFieldDOMStructure={false}
                  slots={{ textField: CustomTextField }}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      error: !!errors.noticeDate,
                      helperText: errors.noticeDate?.message
                    }
                  }}
                />
              )}
            />
          </LocalizationProvider>

          {/* 📅 Termination Date */}
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Controller
              name='terminationDate'
              control={control}
              rules={{ required: 'Termination date is required' }}
              render={({ field }) => (
                <DatePicker
                  label='Termination Date'
                  value={field.value ? dayjs(field.value) : null}
                  onChange={newValue => field.onChange(newValue ? newValue.toISOString() : '')}
                  enableAccessibleFieldDOMStructure={false}
                  slots={{ textField: CustomTextField }}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      error: !!errors.terminationDate,
                      helperText: errors.terminationDate?.message
                    }
                  }}
                />
              )}
            />
          </LocalizationProvider>

          {/* Notice Period */}
          <Controller
            name='noticePeriod'
            control={control}
            rules={{ required: 'Notice Period is required' }}
            render={({ field }) => (
              <CustomTextField
                {...field}
                fullWidth
                label='Notice Period'
                value={field.value ?? ''} // ✅ ensure controlled
                error={!!errors.noticePeriod}
                helperText={errors.noticePeriod?.message}
              />
            )}
          />

          {/* Reason */}
          <Controller
            name='reason'
            control={control}
            rules={{ required: 'Reason is required' }}
            render={({ field }) => (
              <CustomTextField
                {...field}
                fullWidth
                label='Reason'
                value={field.value ?? ''} // ✅ ensure controlled
                error={!!errors.reason}
                helperText={errors.reason?.message}
              />
            )}
          />

          {/* Description */}
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
                value={field.value ?? ''} // ✅ ensure controlled
                error={!!errors.description}
                helperText={errors.description?.message}
              />
            )}
          />

          {/* 📄 Document Upload */}
          <FileUploadController
            control={control}
            errors={errors}
            name='document'
            label='Document'
            required
            accept='image/*'
          />

          {/* Status */}
          <Controller
            name='status'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <CustomTextField select fullWidth label='Select Status' {...field} value={field.value ?? ''}>
                <MenuItem value='Planned'>Planned</MenuItem>
                <MenuItem value='In Progress'>In Progress</MenuItem>
                <MenuItem value='Completed'>Completed</MenuItem>
              </CustomTextField>
            )}
          />

          {/* ✅ Buttons */}
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




