

// 'use client'

// import { useState, useEffect } from 'react'

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
//    Checkbox,
//   FormControlLabel,
//   Box
// } from '@mui/material'

// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
// import { DatePicker } from '@mui/x-date-pickers/DatePicker'
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
// import dayjs from 'dayjs'

// // 🧩 Third-party Imports
// import { useForm, Controller } from 'react-hook-form'
// import FileUploadController from '../../../../components/fileUploadController'

// // 🧠 Server Action
// import { createAward, fetchListOfUser, fetchListOfBranch } from '../../../../app/server/actions.js'

// // 🧱 Component Imports
// import CustomTextField from '@core/components/mui/TextField'

// const AddDepartmentDrawer = props => {
//   const { open, handleClose, refreshDepartments } = props

//   const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' })
//   const [branches, setBranches] = useState([])

//   // 🔧 react-hook-form setup
//   const {
//     control,
//     reset,
//     handleSubmit,
//     formState: { errors }
//   } = useForm({
//     defaultValues: {
//       employee: '',
//       warningBy: '',
//       warningType: '',
//       subject: '',
//       severity: '',
//       warningDate: '',
//       expiryDate: '',
//       description: '',
//       document: null,
//       improvementPlan: '',
//       improvementGoals: '',
//       improvementStartDate: '',
//       improvementEndDate: ''
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

//   // ✅ Submit Form
//   const onSubmit = async data => {
//     try {
//       const formData = new FormData()
//       Object.entries(data).forEach(([key, value]) => {
//         if (value !== null && value !== undefined) formData.append(key, value)
//       })

//       const response = await createAward(formData)

//       if (response?.success) {
//         setSnackbar({
//           open: true,
//           message: response.message || 'Warning created successfully',
//           severity: 'success'
//         })
//         if (typeof refreshDepartments === 'function') await refreshDepartments()
//         handleClose()
//         reset()
//       } else {
//         setSnackbar({
//           open: true,
//           message: response.message || 'Failed to create warning',
//           severity: 'error'
//         })
//       }
//     } catch (error) {
//       console.error('Error creating warning:', error)
//       setSnackbar({
//         open: true,
//         message: 'Error creating warning',
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
//             Add New Holiday
//           </Typography>
//           <IconButton size='small' onClick={handleReset}>
//             <i className='tabler-x text-2xl text-textPrimary' />
//           </IconButton>
//         </div>
//         <Divider />

//         {/* 🧾 Form */}
//         <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-6 p-6'>
//           {/* 🧑 Employee */}
//           {/* <Controller
//             name='employee'
//             control={control}
//             rules={{ required: 'Employee is required' }}
//             render={({ field }) => (
//               <CustomTextField
//                 select
//                 fullWidth
//                 label='Complainant'
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
//           /> */}

          
//    <Controller
//             name='subject'
//             control={control}
//             rules={{ required: 'Subject is required' }}
//             render={({ field }) => (
//               <CustomTextField
//                 {...field}
//                 fullWidth
//                 label='Holiday Name'
//                 error={!!errors.subject}
//                 helperText={errors.subject?.message}
//               />
//             )}
//           />

//                     {/* ⚠️ Warning Type */}
//                     <Controller
//                       name='warningType'
//                       control={control}
//                       rules={{ required: 'Warning Type is required' }}
//                       render={({ field }) => (
//                         <CustomTextField select fullWidth label='Category' {...field}>
//                           <MenuItem value='National'>National</MenuItem>
//                           <MenuItem value='Religious'>Religious</MenuItem>
//                           <MenuItem value='Company Specific'>Company Specific</MenuItem>
//                           <MenuItem value='Regional'>Regional</MenuItem>
                          
//                         </CustomTextField>
//                       )}
//                     />

            


//                   <Controller
//             name='subject'
//             control={control}
//             rules={{ required: 'Subject is required' }}
//             render={({ field }) => (
//               <CustomTextField
//                 {...field}
//                 fullWidth
//                 label='Destination'
//                 error={!!errors.subject}
//                 helperText={errors.subject?.message}
//               />
//             )}
//           />


//              {/* 📅 Warning Date */}
//           <LocalizationProvider dateAdapter={AdapterDayjs}>
//             <Controller
//               name='warningDate'
//               control={control}
//               render={({ field }) => (
//                 <DatePicker
//                   label='Start Date'
//                   value={field.value ? dayjs(field.value) : null}
//                   onChange={newValue => field.onChange(newValue ? newValue.toISOString() : null)}
//                   enableAccessibleFieldDOMStructure={false}
//                   slots={{ textField: CustomTextField }}
//                   slotProps={{
//                     textField: {
//                       fullWidth: true,
//                       error: !!errors.warningDate,
//                       helperText: errors.warningDate?.message
//                     }
//                   }}
//                 />
//               )}
//             />
//           </LocalizationProvider>


//             <LocalizationProvider dateAdapter={AdapterDayjs}>
//             <Controller
//               name='warningDate'
//               control={control}
//               render={({ field }) => (
//                 <DatePicker
//                   label='End Date'
//                   value={field.value ? dayjs(field.value) : null}
//                   onChange={newValue => field.onChange(newValue ? newValue.toISOString() : null)}
//                   enableAccessibleFieldDOMStructure={false}
//                   slots={{ textField: CustomTextField }}
//                   slotProps={{
//                     textField: {
//                       fullWidth: true,
//                       error: !!errors.warningDate,
//                       helperText: errors.warningDate?.message
//                     }
//                   }}
//                 />
//               )}
//             />
//           </LocalizationProvider>

      

//                 {/* 🗒️ Description */}
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

       



  

       

    

       
//           {/* 💡 Improvement Plan */}
//         {/* <Controller
//   name="improvementPlan"
//   control={control}
//   render={({ field }) => (
//     <FormControlLabel
//       control={
//         <Checkbox
//           checked={field.value || false} // ensure boolean
//           onChange={(e) => field.onChange(e.target.checked)} // true/false bhejta hai
//         />
//       }
//       label="Submit Anonymously"
//     />
//   )}
// /> */}

// <Controller
//   name="improvementPlan"
//   control={control}
//   render={({ field }) => (
//     <Box sx={{ display: 'flex', flexDirection: 'column', mb: 1 }}>
//       {/* Header text */}
//       <Typography
//         variant="body2"
//         fontWeight={600}
//         sx={{ mb: 0.5, color: 'text.primary' }}
//       >
//         Recurring Annual Holiday
//       </Typography>

//       {/* Checkbox with same label */}
//       <FormControlLabel
//         label="  Recurring Annual Holiday"
//         control={
//           <Checkbox
//             checked={field.value || false}
//             onChange={(e) => field.onChange(e.target.checked)}
//             sx={{
//               color: '#2B3380',
//               '&.Mui-checked': { color: '#2B3380' },
//               p: 0.5
//             }}
//           />
//         }
//         sx={{
//           ml: 1,
//           '& .MuiFormControlLabel-label': {
//             fontSize: '0.9rem',
//             color: 'text.primary'
//           }
//         }}
//       />
//     </Box>
//   )}
// />

// <Controller
//   name="improvementPlan"
//   control={control}
//   render={({ field }) => (
//     <Box sx={{ display: 'flex', flexDirection: 'column', mb: 1 }}>
//       {/* Header text */}
//       <Typography
//         variant="body2"
//         fontWeight={600}
//         sx={{ mb: 0.5, color: 'text.primary' }}
//       >
//         Paid Holiday
//       </Typography>

//       {/* Checkbox with same label */}
//       <FormControlLabel
//         label="Paid Holiday"
//         control={
//           <Checkbox
//             checked={field.value || false}
//             onChange={(e) => field.onChange(e.target.checked)}
//             sx={{
//               color: '#2B3380',
//               '&.Mui-checked': { color: '#2B3380' },
//               p: 0.5
//             }}
//           />
//         }
//         sx={{
//           ml: 1,
//           '& .MuiFormControlLabel-label': {
//             fontSize: '0.9rem',
//             color: 'text.primary'
//           }
//         }}
//       />
//     </Box>
//   )}
// />

// <Controller
//   name="improvementPlan"
//   control={control}
//   render={({ field }) => (
//     <Box sx={{ display: 'flex', flexDirection: 'column', mb: 1 }}>
//       {/* Header text */}
//       <Typography
//         variant="body2"
//         fontWeight={600}
//         sx={{ mb: 0.5, color: 'text.primary' }}
//       >
//         Half Day
//       </Typography>

//       {/* Checkbox with same label */}
//       <FormControlLabel
//         label="Half Day"
//         control={
//           <Checkbox
//             checked={field.value || false}
//             onChange={(e) => field.onChange(e.target.checked)}
//             sx={{
//               color: '#2B3380',
//               '&.Mui-checked': { color: '#2B3380' },
//               p: 0.5
//             }}
//           />
//         }
//         sx={{
//           ml: 1,
//           '& .MuiFormControlLabel-label': {
//             fontSize: '0.9rem',
//             color: 'text.primary'
//           }
//         }}
//       />
//     </Box>
//   )}
// />



        


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

// export default AddDepartmentDrawer


// 'use client'

// import { useState, useEffect } from 'react'

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
//   Checkbox,
//   FormControlLabel,
//   Box,
//   Chip
// } from '@mui/material'

// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
// import { DatePicker } from '@mui/x-date-pickers/DatePicker'
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
// import dayjs from 'dayjs'

// // 🧩 Third-party Imports
// import { useForm, Controller } from 'react-hook-form'
// import FileUploadController from '../../../../components/fileUploadController'

// // 🧠 Server Action
// import { createHolidays, fetchListOfUser, fetchListOfBranch } from '../../../../app/server/actions.js'

// // 🧱 Component Imports
// import CustomTextField from '@core/components/mui/TextField'

// const AddDepartmentDrawer = props => {
//   const { open, handleClose, refreshDepartments } = props

//   const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' })
//    const [branches, setBranches] = useState([]) // 🔹 Dynamic dropdown data
//     const [loadingBranches, setLoadingBranches] = useState(true)

//   // 🔧 react-hook-form setup
//   const {
//     control,
//     reset,
//     handleSubmit,
//     formState: { errors }
//   } = useForm({
//     defaultValues: {
//       subject: '',
//       warningType: '',
//       warningDate: '',
//       expiryDate: '',
//       description: '',
//       document: null,
//       improvementPlan: '',
//       branches: [] // 🆕 added for multi-branch select
//     }
//   })

//    useEffect(() => {
//      const loadBranches = async () => {
//        try {
//          const response = await fetchListOfBranch() // server action call
//          // Expected response: { success: true, data: [ { _id, branchName } ] }
//          if (response?.success && Array.isArray(response.data)) {
//            setBranches(response.data)
//          } else if (Array.isArray(response)) {
//            // handle array return directly
//            setBranches(response)
//          } else {
//            console.warn('Invalid branch data format:', response)
//          }
//        } catch (err) {
//          console.error('Error fetching branches:', err)
//        } finally {
//          setLoadingBranches(false)
//        }
//      }
 
//      loadBranches()
//    }, [])
//   // ✅ Submit Form
//   const onSubmit = async data => {
//     try {
//       const formData = new FormData()
//       Object.entries(data).forEach(([key, value]) => {
//         if (value !== null && value !== undefined) {
//           if (Array.isArray(value)) {
//             // 🆕 Proper array handling for multi-select
//             value.forEach(v => formData.append(`${key}[]`, v))
//           } else {
//             formData.append(key, value)
//           }
//         }
//       })

//       const response = await createHolidays(formData)

//       if (response?.success) {
//         setSnackbar({
//           open: true,
//           message: response.message || 'Holiday created successfully',
//           severity: 'success'
//         })
//         if (typeof refreshDepartments === 'function') await refreshDepartments()
//         handleClose()
//         reset()
//       } else {
//         setSnackbar({
//           open: true,
//           message: response.message || 'Failed to create holiday',
//           severity: 'error'
//         })
//       }
//     } catch (error) {
//       console.error('Error creating holiday:', error)
//       setSnackbar({
//         open: true,
//         message: 'Error creating holiday',
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
//             Add New Holiday
//           </Typography>
//           <IconButton size='small' onClick={handleReset}>
//             <i className='tabler-x text-2xl text-textPrimary' />
//           </IconButton>
//         </div>
//         <Divider />

//         <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-6 p-6'>
//           {/* 🏖 Holiday Name */}
//           <Controller
//             name='holidayName'
//             control={control}
//             rules={{ required: 'Holiday name is required' }}
//             render={({ field }) => (
//               <CustomTextField
//                 {...field}
//                 fullWidth
//                 label='Holiday Name'
//                 error={!!errors.holidayName}
//                 helperText={errors.holidayName?.message}
//               />
//             )}
//           />

//           {/* 🏷 Category */}
//           <Controller
//             name='category'
//             control={control}
//             rules={{ required: 'Category is required' }}
//             render={({ field }) => (
//               <CustomTextField select fullWidth label='Category' {...field}>
//                 <MenuItem value='National'>National</MenuItem>
//                 <MenuItem value='Religious'>Religious</MenuItem>
//                 <MenuItem value='Company Specific'>Company Specific</MenuItem>
//                 <MenuItem value='Regional'>Regional</MenuItem>
//               </CustomTextField>
//             )}
//           />

//           {/* 🆕 🏢 Multi-branch Select */}
//           <Controller
//             name='branches'
//             control={control}
//             rules={{ required: 'Please select at least one branch' }}
//             render={({ field }) => (
//               <CustomTextField
//                 select
//                 fullWidth
//                 label='Applicable Branch(es)'
//                 SelectProps={{
//                   multiple: true,
//                   value: field.value || [],
//                   onChange: e => field.onChange(e.target.value),
//                   renderValue: selected => (
//                     <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
//                       {selected.map(value => {
//                         const branch = branches.find(b => b._id === value)
//                         return (
//                           <Chip
//                             key={value}
//                             label={branch?.branchName || branch?.branchName || 'Unnamed'}
//                             size='small'
//                           />
//                         )
//                       })}
//                     </Box>
//                   )
//                 }}
//                 error={!!errors.branches}
//                 helperText={errors.branches?.message}
//               >
//                 {branches.length > 0 ? (
//                   branches.map(branch => (
//                     <MenuItem key={branch._id} value={branch._id}>
//                       {branch.branchName || branch.name || 'Unnamed Branch'}
//                     </MenuItem>
//                   ))
//                 ) : (
//                   <MenuItem disabled>No branches found</MenuItem>
//                 )}
//               </CustomTextField>
//             )}
//           />

//           {/* 📅 Dates */}
//           <LocalizationProvider dateAdapter={AdapterDayjs}>
//             <Controller
//               name='startDate'
//               control={control}
//               render={({ field }) => (
//                 <DatePicker
//                   label='Start Date'
//                   value={field.value ? dayjs(field.value) : null}
//                   onChange={newValue => field.onChange(newValue ? newValue.toISOString() : null)}
//                   enableAccessibleFieldDOMStructure={false}
//                   slots={{ textField: CustomTextField }}
//                   slotProps={{
//                     textField: {
//                       fullWidth: true,
//                       error: !!errors.startDate,
//                       helperText: errors.startDate?.message
//                     }
//                   }}
//                 />
//               )}
//             />
//           </LocalizationProvider>

//           <LocalizationProvider dateAdapter={AdapterDayjs}>
//             <Controller
//               name='endDate'
//               control={control}
//               render={({ field }) => (
//                 <DatePicker
//                   label='End Date'
//                   value={field.value ? dayjs(field.value) : null}
//                   onChange={newValue => field.onChange(newValue ? newValue.toISOString() : null)}
//                   enableAccessibleFieldDOMStructure={false}
//                   slots={{ textField: CustomTextField }}
//                   slotProps={{
//                     textField: {
//                       fullWidth: true,
//                       error: !!errors.endDate,
//                       helperText: errors.endDate?.message
//                     }
//                   }}
//                 />
//               )}
//             />
//           </LocalizationProvider>

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

//           {/* ✅ Holiday Type Checkboxes */}
//        {[
//   { label: 'Recurring Annual Holiday', name: 'recurringAnnualHoliday' },
//   { label: 'Paid Holiday', name: 'paidHoliday' },
//   { label: 'Half Day', name: 'halfDay' }
// ].map(({ label, name }) => (
//   <Controller
//     key={name}
//     name={name}
//     control={control}
//     defaultValue={false}
//     render={({ field }) => (
//       <Box sx={{ display: 'flex', flexDirection: 'column', mb: 2 }}>
//         {/* Header (Top Text) */}
//         <Typography
//           variant='subtitle1'
//           fontWeight={600}
//           sx={{ color: 'text.primary', mb: 0.5 }}
//         >
//           {label}
//         </Typography>

//         {/* Checkbox (below header) */}
//         <FormControlLabel
//           control={
//             <Checkbox
//               checked={!!field.value}
//               onChange={e => field.onChange(e.target.checked)}
//               sx={{
//                 color: '#2B3380',
//                 '&.Mui-checked': { color: '#2B3380' },
//               }}
//             />
//           }
//           label={
//             <Typography variant='body2' sx={{ color: 'text.primary' }}>
//               {label}
//             </Typography>
//           }
//           sx={{ ml: 1 }}
//         />
//       </Box>
//     )}
//   />
// ))}


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
  Alert as MuiAlert,
  Checkbox,
  FormControlLabel,
  Box,
  Chip
} from '@mui/material'

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'

import { useForm, Controller } from 'react-hook-form'
import CustomTextField from '@core/components/mui/TextField'
import { createHolidays, fetchListOfBranch } from '../../../../app/server/actions.js'

const AddDepartmentDrawer = props => {
  const { open, handleClose, refreshDepartments } = props

  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' })
  const [branches, setBranches] = useState([])
  const [loadingBranches, setLoadingBranches] = useState(true)

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      holidayName: '',
      category: '',
      startDate: '',
      endDate: '',
      description: '',
      recurringAnnualHoliday: false,
      paidHoliday: false,
      halfDay: false,
      branches: []
    }
  })

  // 🧠 Fetch Branch list
  useEffect(() => {
    const loadBranches = async () => {
      try {
        const response = await fetchListOfBranch()
        if (response?.success && Array.isArray(response.data)) setBranches(response.data)
        else if (Array.isArray(response)) setBranches(response)
      } catch (err) {
        console.error('Error fetching branches:', err)
      } finally {
        setLoadingBranches(false)
      }
    }
    loadBranches()
  }, [])

  // ✅ Submit Form — Proper FormData for backend schema
  const onSubmit = async data => {
    try {
      const formData = new FormData()

      // 🔹 Match backend schema field names exactly
      formData.append('holidayName', data.holidayName)
      formData.append('category', data.category)
      formData.append('startDate', data.startDate)
      formData.append('endDate', data.endDate)
      formData.append('description', data.description)

      // 🔹 Boolean checkboxes
      formData.append('recurringAnnualHoliday', data.recurringAnnualHoliday)
      formData.append('paidHoliday', data.paidHoliday)
      formData.append('halfDay', data.halfDay)

      // 🔹 Branch selection (array)
      if (Array.isArray(data.branches)) {
        data.branches.forEach(branchId => formData.append('branch[]', branchId))
      }

      // Debug (optional)
      // for (let [key, value] of formData.entries()) console.log(`${key}: ${value}`)

      const response = await createHolidays(formData)

      if (response?.success) {
        setSnackbar({
          open: true,
          message: response.message || 'Holiday created successfully',
          severity: 'success'
        })
        if (typeof refreshDepartments === 'function') await refreshDepartments()
        handleClose()
        reset()
      } else {
        setSnackbar({
          open: true,
          message: response.message || 'Failed to create holiday',
          severity: 'error'
        })
      }
    } catch (error) {
      console.error('Error creating holiday:', error)
      setSnackbar({
        open: true,
        message: 'Error creating holiday',
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
        {/* Header */}
        <div className='flex items-center justify-between p-5'>
          <Typography variant='h5' fontWeight='bold'>
            Add New Holiday
          </Typography>
          <IconButton size='small' onClick={handleReset}>
            <i className='tabler-x text-2xl text-textPrimary' />
          </IconButton>
        </div>
        <Divider />

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-6 p-6'>
          {/* 🏖 Holiday Name */}
          <Controller
            name='holidayName'
            control={control}
            rules={{ required: 'Holiday name is required' }}
            render={({ field }) => (
              <CustomTextField {...field} fullWidth label='Holiday Name' error={!!errors.holidayName} helperText={errors.holidayName?.message} />
            )}
          />

          {/* 🏷 Category */}
          <Controller
            name='category'
            control={control}
            rules={{ required: 'Category is required' }}
            render={({ field }) => (
              <CustomTextField select fullWidth label='Category' {...field}>
                <MenuItem value='National'>National</MenuItem>
                <MenuItem value='Religious'>Religious</MenuItem>
                <MenuItem value='Company Specific'>Company Specific</MenuItem>
                <MenuItem value='Regional'>Regional</MenuItem>
              </CustomTextField>
            )}
          />

          {/* 🏢 Branch Multi-select */}
          <Controller
            name='branches'
            control={control}
            rules={{ required: 'Please select at least one branch' }}
            render={({ field }) => (
              <CustomTextField
                select
                fullWidth
                label='Applicable Branch(es)'
                SelectProps={{
                  multiple: true,
                  value: field.value || [],
                  onChange: e => field.onChange(e.target.value),
                  renderValue: selected => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map(value => {
                        const branch = branches.find(b => b._id === value)
                        return <Chip key={value} label={branch?.branchName || 'Unnamed Branch'} size='small' />
                      })}
                    </Box>
                  )
                }}
                error={!!errors.branches}
                helperText={errors.branches?.message}
              >
                {loadingBranches ? (
                  <MenuItem disabled>Loading branches...</MenuItem>
                ) : branches.length > 0 ? (
                  branches.map(branch => (
                    <MenuItem key={branch._id} value={branch._id}>
                      {branch.branchName || 'Unnamed Branch'}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem disabled>No branches found</MenuItem>
                )}
              </CustomTextField>
            )}
          />

          {/* 📅 Dates */}
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Controller
              name='startDate'
              control={control}
              render={({ field }) => (
                <DatePicker
                  label='Start Date'
                  value={field.value ? dayjs(field.value) : null}
                  onChange={val => field.onChange(val ? val.toISOString() : null)}
                  enableAccessibleFieldDOMStructure={false}
                  slots={{ textField: CustomTextField }}
                  slotProps={{ textField: { fullWidth: true } }}
                />
              )}
            />
          </LocalizationProvider>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Controller
              name='endDate'
              control={control}
              render={({ field }) => (
                <DatePicker
                  label='End Date'
                  value={field.value ? dayjs(field.value) : null}
                  onChange={val => field.onChange(val ? val.toISOString() : null)}
                  enableAccessibleFieldDOMStructure={false}
                  slots={{ textField: CustomTextField }}
                  slotProps={{ textField: { fullWidth: true } }}
                />
              )}
            />
          </LocalizationProvider>

          {/* 📝 Description */}
          <Controller
            name='description'
            control={control}
            rules={{ required: 'Description is required' }}
            render={({ field }) => (
              <CustomTextField {...field} fullWidth multiline minRows={2} label='Description' error={!!errors.description} helperText={errors.description?.message} />
            )}
          />

          {/* ✅ Holiday Type Checkboxes */}
          {[
            { label: 'Recurring Annual Holiday', name: 'recurringAnnualHoliday' },
            { label: 'Paid Holiday', name: 'paidHoliday' },
            { label: 'Half Day', name: 'halfDay' }
          ].map(({ label, name }) => (
            <Controller
              key={name}
              name={name}
              control={control}
              defaultValue={false}
              render={({ field }) => (
                <Box sx={{ display: 'flex', flexDirection: 'column', mb: 2 }}>
                  <Typography variant='subtitle1' fontWeight={600} sx={{ color: 'text.primary', mb: 0.5 }}>
                    {label}
                  </Typography>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={!!field.value}
                        onChange={e => field.onChange(e.target.checked)}
                        sx={{ color: '#2B3380', '&.Mui-checked': { color: '#2B3380' } }}
                      />
                    }
                    label={<Typography variant='body2' sx={{ color: 'text.primary' }}>{label}</Typography>}
                    sx={{ ml: 1 }}
                  />
                </Box>
              )}
            />
          ))}

          {/* ✅ Buttons */}
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

      {/* ✅ Snackbar */}
      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar({ ...snackbar, open: false })} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <MuiAlert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} variant='filled' sx={{ width: '100%', backgroundColor: snackbar.severity === 'success' ? '#2B3380' : '#D32F2F', color: 'white', fontWeight: 500 }}>
          {snackbar.message}
        </MuiAlert>
      </Snackbar>
    </>
  )
}

export default AddDepartmentDrawer


