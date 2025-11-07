


// // 'use client'

// // import { useState, useEffect } from 'react'

// // // 📦 MUI Imports
// // import {
// //   Button,
// //   Drawer,
// //   IconButton,
// //   MenuItem,
// //   Typography,
// //   Divider,
// //   Snackbar,
// //   Alert as MuiAlert,
// //   Checkbox,
// //   FormControlLabel,
// //   Box,
// //   Chip
// // } from '@mui/material'

// // import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
// // import { DatePicker } from '@mui/x-date-pickers/DatePicker'
// // import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
// // import dayjs from 'dayjs'

// // // 🧩 Third-party Imports
// // import { useForm, Controller } from 'react-hook-form'
// // import FileUploadController from '../../../../components/fileUploadController'

// // // 🧠 Server Action
// // import { createAward, fetchListOfUser, fetchListOfBranch } from '../../../../app/server/actions.js'

// // // 🧱 Component Imports
// // import CustomTextField from '@core/components/mui/TextField'

// // const AddDepartmentDrawer = props => {
// //   const { open, handleClose, refreshDepartments } = props

// //   const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' })
// //    const [branches, setBranches] = useState([]) // 🔹 Dynamic dropdown data
// //     const [loadingBranches, setLoadingBranches] = useState(true)

// //   // 🔧 react-hook-form setup
// //   const {
// //     control,
// //     reset,
// //     handleSubmit,
// //     formState: { errors }
// //   } = useForm({
// //     defaultValues: {
// //       subject: '',
// //       warningType: '',
// //       warningDate: '',
// //       expiryDate: '',
// //       description: '',
// //       document: null,
// //       improvementPlan: '',
// //       branches: [] // 🆕 added for multi-branch select
// //     }
// //   })

// //    useEffect(() => {
// //      const loadBranches = async () => {
// //        try {
// //          const response = await fetchListOfBranch() // server action call
// //          // Expected response: { success: true, data: [ { _id, branchName } ] }
// //          if (response?.success && Array.isArray(response.data)) {
// //            setBranches(response.data)
// //          } else if (Array.isArray(response)) {
// //            // handle array return directly
// //            setBranches(response)
// //          } else {
// //            console.warn('Invalid branch data format:', response)
// //          }
// //        } catch (err) {
// //          console.error('Error fetching branches:', err)
// //        } finally {
// //          setLoadingBranches(false)
// //        }
// //      }
 
// //      loadBranches()
// //    }, [])
// //   // ✅ Submit Form
// //   const onSubmit = async data => {
// //     try {
// //       const formData = new FormData()
// //       Object.entries(data).forEach(([key, value]) => {
// //         if (value !== null && value !== undefined) {
// //           if (Array.isArray(value)) {
// //             // 🆕 Proper array handling for multi-select
// //             value.forEach(v => formData.append(`${key}[]`, v))
// //           } else {
// //             formData.append(key, value)
// //           }
// //         }
// //       })

// //       const response = await createAward(formData)

// //       if (response?.success) {
// //         setSnackbar({
// //           open: true,
// //           message: response.message || 'Holiday created successfully',
// //           severity: 'success'
// //         })
// //         if (typeof refreshDepartments === 'function') await refreshDepartments()
// //         handleClose()
// //         reset()
// //       } else {
// //         setSnackbar({
// //           open: true,
// //           message: response.message || 'Failed to create holiday',
// //           severity: 'error'
// //         })
// //       }
// //     } catch (error) {
// //       console.error('Error creating holiday:', error)
// //       setSnackbar({
// //         open: true,
// //         message: 'Error creating holiday',
// //         severity: 'error'
// //       })
// //     }
// //   }

// //   const handleReset = () => {
// //     handleClose()
// //     reset()
// //   }

// //   return (
// //     <>
// //       <Drawer
// //         open={open}
// //         anchor='right'
// //         variant='temporary'
// //         onClose={handleReset}
// //         ModalProps={{ keepMounted: true }}
// //         sx={{ '& .MuiDrawer-paper': { width: { xs: 320, sm: 420 } } }}
// //       >
// //         <div className='flex items-center justify-between p-5'>
// //           <Typography variant='h5' fontWeight='bold'>
// //             Add New Announcement
// //           </Typography>
// //           <IconButton size='small' onClick={handleReset}>
// //             <i className='tabler-x text-2xl text-textPrimary' />
// //           </IconButton>
// //         </div>
// //         <Divider />

// //         <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-6 p-6'>
// //           {/* 🏖 Holiday Name */}
// //           <Controller
// //             name='subject'
// //             control={control}
// //             rules={{ required: 'Holiday name is required' }}
// //             render={({ field }) => (
// //               <CustomTextField
// //                 {...field}
// //                 fullWidth
// //                 label='Title'
// //                 error={!!errors.subject}
// //                 helperText={errors.subject?.message}
// //               />
// //             )}
// //           />

// //           {/* 🏷 Category */}
// //           <Controller
// //             name='warningType'
// //             control={control}
// //             rules={{ required: 'Category is required' }}
// //             render={({ field }) => (
// //               <CustomTextField select fullWidth label='Category' {...field}>
// //                 <MenuItem value='Company News'>Company News</MenuItem>
// //                 <MenuItem value='Policy Updates'>Policy Updates</MenuItem>
// //                 <MenuItem value='Events'>Events</MenuItem>
// //                 <MenuItem value='HR'>HR</MenuItem>
// //                 <MenuItem value='IT Updates'>IT Updates</MenuItem>
// //               </CustomTextField>
// //             )}
// //           />

// //                <Controller
// //             name='description'
// //             control={control}
// //             rules={{ required: 'Description is required' }}
// //             render={({ field }) => (
// //               <CustomTextField
// //                 {...field}
// //                 fullWidth
// //                 multiline
// //                 minRows={2}
// //                 label='Short Description'
// //                 error={!!errors.description}
// //                 helperText={errors.description?.message}
// //               />
// //             )}
// //           />

// //                <Controller
// //             name='description'
// //             control={control}
// //             rules={{ required: 'Description is required' }}
// //             render={({ field }) => (
// //               <CustomTextField
// //                 {...field}
// //                 fullWidth
// //                 multiline
// //                 minRows={2}
// //                 label='Content'
// //                 error={!!errors.description}
// //                 helperText={errors.description?.message}
// //               />
// //             )}
// //           />

        

// //           {/* 📅 Dates */}
// //           <LocalizationProvider dateAdapter={AdapterDayjs}>
// //             <Controller
// //               name='warningDate'
// //               control={control}
// //               render={({ field }) => (
// //                 <DatePicker
// //                   label='Start Date'
// //                   value={field.value ? dayjs(field.value) : null}
// //                   onChange={newValue => field.onChange(newValue ? newValue.toISOString() : null)}
// //                   enableAccessibleFieldDOMStructure={false}
// //                   slots={{ textField: CustomTextField }}
// //                   slotProps={{
// //                     textField: {
// //                       fullWidth: true,
// //                       error: !!errors.warningDate,
// //                       helperText: errors.warningDate?.message
// //                     }
// //                   }}
// //                 />
// //               )}
// //             />
// //           </LocalizationProvider>

// //           <LocalizationProvider dateAdapter={AdapterDayjs}>
// //             <Controller
// //               name='expiryDate'
// //               control={control}
// //               render={({ field }) => (
// //                 <DatePicker
// //                   label='End Date'
// //                   value={field.value ? dayjs(field.value) : null}
// //                   onChange={newValue => field.onChange(newValue ? newValue.toISOString() : null)}
// //                   enableAccessibleFieldDOMStructure={false}
// //                   slots={{ textField: CustomTextField }}
// //                   slotProps={{
// //                     textField: {
// //                       fullWidth: true,
// //                       error: !!errors.expiryDate,
// //                       helperText: errors.expiryDate?.message
// //                     }
// //                   }}
// //                 />
// //               )}
// //             />
// //           </LocalizationProvider>

// //              {/* 📎 Document Upload */}
// //                     <FileUploadController
// //                       control={control}
// //                       errors={errors}
// //                       name='document'
// //                       label='Attachments'
// //                       required
// //                       accept='image/*'
// //                     />

        

// //           {/* ✅ Holiday Type Checkboxes */}
// //           {[
// //             'Featured Announcement',
// //             'High Priority',
// //             'Company-wide Announcment'
// //           ].map((label, index) => (
// //             <Controller
// //               key={index}
// //               name={label.replace(/\s+/g, '').toLowerCase()}
// //               control={control}
// //               render={({ field }) => (
// //                 <Box sx={{ display: 'flex', flexDirection: 'column', mb: 1 }}>
// //                   <Typography variant='body2' fontWeight={600} sx={{ mb: 0.5, color: 'text.primary' }}>
// //                     {label}
// //                   </Typography>
// //                   <FormControlLabel
// //                     label={label}
// //                     control={
// //                       <Checkbox
// //                         checked={field.value || false}
// //                         onChange={e => field.onChange(e.target.checked)}
// //                         sx={{
// //                           color: '#2B3380',
// //                           '&.Mui-checked': { color: '#2B3380' },
// //                           p: 0.5
// //                         }}
// //                       />
// //                     }
// //                     sx={{
// //                       ml: 1,
// //                       '& .MuiFormControlLabel-label': {
// //                         fontSize: '0.9rem',
// //                         color: 'text.primary'
// //                       }
// //                     }}
// //                   />
// //                 </Box>
// //               )}
// //             />
// //           ))}


// //                       <Controller
// //                         name='branch'
// //                         control={control}
// //                         rules={{ required: true }}
// //                         render={({ field }) => (
// //                           <CustomTextField
// //                             select
// //                             fullWidth
// //                             label='Branch'
// //                             {...field}
// //                             error={!!errors.branch}
// //                             helperText={errors.branch && 'Branch is required.'}
// //                           >
// //                             {loadingBranches ? (
// //                               <MenuItem disabled>Loading branches...</MenuItem>
// //                             ) : branches.length > 0 ? (
// //                               branches.map(branch => (
// //                                 <MenuItem key={branch._id} value={branch._id}>
// //                                   {branch.branchName}
// //                                 </MenuItem>
// //                               ))
// //                             ) : (
// //                               <MenuItem disabled>No branches found</MenuItem>
// //                             )}
// //                           </CustomTextField>
// //                         )}
// //                       />

// //           {/* ✅ Buttons */}
// //           <div className='flex items-center gap-4'>
// //             <Button variant='contained' type='submit'>
// //               Submit
// //             </Button>
// //             <Button variant='tonal' color='error' onClick={handleReset}>
// //               Cancel
// //             </Button>
// //           </div>
// //         </form>
// //       </Drawer>

// //       {/* ✅ Snackbar */}
// //       <Snackbar
// //         open={snackbar.open}
// //         autoHideDuration={3000}
// //         onClose={() => setSnackbar({ ...snackbar, open: false })}
// //         anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
// //       >
// //         <MuiAlert
// //           onClose={() => setSnackbar({ ...snackbar, open: false })}
// //           severity={snackbar.severity}
// //           variant='filled'
// //           sx={{
// //             width: '100%',
// //             backgroundColor: snackbar.severity === 'success' ? '#2B3380' : '#D32F2F',
// //             color: 'white',
// //             fontWeight: 500
// //           }}
// //         >
// //           {snackbar.message}
// //         </MuiAlert>
// //       </Snackbar>
// //     </>
// //   )
// // }

// // export default AddDepartmentDrawer

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
// import { useForm, Controller } from 'react-hook-form'
// import FileUploadController from '../../../../components/fileUploadController'

// // 🧠 Server Actions
// import {
//   createAnnouncements,
//   fetchListOfUser,
//   fetchListOfBranch,
//   fetchDepartmentsByBranch // 🆕 create this server action
// } from '../../../../app/server/actions'

// import CustomTextField from '@core/components/mui/TextField'

// const AddDepartmentDrawer = props => {
//   const { open, handleClose, refreshDepartments } = props

//   const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' })
//   const [branches, setBranches] = useState([])
//   const [departments, setDepartments] = useState([]) // 🆕 department list
//   const [loadingBranches, setLoadingBranches] = useState(true)
//   const [loadingDepartments, setLoadingDepartments] = useState(false)

//   const {
//     control,
//     reset,
//     handleSubmit,
//     watch,
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
//       branch: '',
//       department: ''
//     }
//   })

//   // 🧠 Fetch Branches
//   useEffect(() => {
//     const loadBranches = async () => {
//       try {
//         const response = await fetchListOfBranch()
//         if (response?.success && Array.isArray(response.data)) setBranches(response.data)
//         else if (Array.isArray(response)) setBranches(response)
//         else console.warn('Invalid branch data:', response)
//       } catch (err) {
//         console.error('Error fetching branches:', err)
//       } finally {
//         setLoadingBranches(false)
//       }
//     }

//     loadBranches()
//   }, [])

//   // 🧠 Watch selected branch and load departments dynamically
//   const selectedBranch = watch('branch')

//   useEffect(() => {
//     const loadDepartments = async () => {
//       if (!selectedBranch) {
//         setDepartments([])
//         return
//       }

//       setLoadingDepartments(true)
//       try {
//         const response = await fetchDepartmentsByBranch(selectedBranch)
//         // Expected response: { success: true, data: [ { _id, departmentName } ] }
//         if (response?.success && Array.isArray(response.data)) setDepartments(response.data)
//         else if (Array.isArray(response)) setDepartments(response)
//         else setDepartments([])
//       } catch (err) {
//         console.error('Error fetching departments:', err)
//         setDepartments([])
//       } finally {
//         setLoadingDepartments(false)
//       }
//     }

//     loadDepartments()
//   }, [selectedBranch])

//   // ✅ Submit Form
//   const onSubmit = async data => {
//     try {
//       const formData = new FormData()
//       Object.entries(data).forEach(([key, value]) => {
//         if (value !== null && value !== undefined) formData.append(key, value)
//       })

//       const response = await createAnnouncements(formData)
//       if (response?.success) {
//         setSnackbar({
//           open: true,
//           message: response.message || 'Announcement created successfully',
//           severity: 'success'
//         })
//         if (typeof refreshDepartments === 'function') await refreshDepartments()
//         handleClose()
//         reset()
//       } else {
//         setSnackbar({
//           open: true,
//           message: response.message || 'Failed to create announcement',
//           severity: 'error'
//         })
//       }
//     } catch (error) {
//       console.error('Error creating announcement:', error)
//       setSnackbar({
//         open: true,
//         message: 'Error creating announcement',
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
//             Add New Announcement
//           </Typography>
//           <IconButton size='small' onClick={handleReset}>
//             <i className='tabler-x text-2xl text-textPrimary' />
//           </IconButton>
//         </div>
//         <Divider />

//         <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-6 p-6'>
//           {/* 🧾 Title */}
//           <Controller
//             name='title'
//             control={control}
//             rules={{ required: 'Title is required' }}
//             render={({ field }) => (
//               <CustomTextField {...field} fullWidth label='Title' error={!!errors.title} helperText={errors.title?.message} />
//             )}
//           />

//           {/* 🏷 Category */}
//           <Controller
//             name='category'
//             control={control}
//             rules={{ required: 'Category is required' }}
//             render={({ field }) => (
//               <CustomTextField select fullWidth label='Category' {...field}>
//                 <MenuItem value='Company News'>Company News</MenuItem>
//                 <MenuItem value='Policy Updates'>Policy Updates</MenuItem>
//                 <MenuItem value='Events'>Events</MenuItem>
//                 <MenuItem value='HR'>HR</MenuItem>
//                 <MenuItem value='IT Updates'>IT Updates</MenuItem>
//               </CustomTextField>
//             )}
//           />



//                     <Controller
//             name='description'
//             control={control}
//             rules={{ required: 'Description is required' }}
//             render={({ field }) => (
//               <CustomTextField
//                 {...field}
//                 fullWidth
//                 multiline
//                 minRows={2}
//                 label='Short Description'
//                 error={!!errors.description}
//                 helperText={errors.description?.message}
//               />
//             )}
//           />

//                <Controller
//             name='content'
//             control={control}
//             rules={{ required: 'Content is required' }}
//             render={({ field }) => (
//               <CustomTextField
//                 {...field}
//                 fullWidth
//                 multiline
//                 minRows={2}
//                 label='Content'
//                 error={!!errors.content}
//                 helperText={errors.content?.message}
//               />
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


//              <LocalizationProvider dateAdapter={AdapterDayjs}>
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




//                     <FileUploadController
//                       control={control}
//                       errors={errors}
//                        name='attachments'
//                       label='Attachments'
//                        required
//                       accept='image/*'
//                     /> 
//       {[
//   { label: 'Featured Announcement', name: 'featuredAnnouncements' },
//   { label: 'High Priority', name: 'highPriority' },
//   { label: 'Company Wide Announcement', name: 'companyWideAnnouncements' }
// ].map(({ label, name }) => (
//   <Controller
//     key={name}
//     name={name}
//     control={control}
//     defaultValue={false}
//     render={({ field }) => (
//       <Box sx={{ display: 'flex', flexDirection: 'column', mb: 2 }}>
//         {/* Header text above */}
//         <Typography
//           variant='subtitle1'
//           fontWeight={600}
//           sx={{ color: 'text.primary', mb: 0.5 }}
//         >
//           {label}
//         </Typography>

//         {/* Checkbox below header */}
//         <FormControlLabel
//           control={
//             <Checkbox
//               checked={!!field.value}
//               onChange={e => field.onChange(e.target.checked)}
//               sx={{
//                 color: '#2B3380',
//                 '&.Mui-checked': { color: '#2B3380' }
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

        

//           {/* 🏢 Branch Dropdown */}
//           <Controller
//             name='targetBranches'
//             control={control}
//             rules={{ required: 'Branch is required' }}
//             render={({ field }) => (
//               <CustomTextField
//                 select
//                 fullWidth
//                 label='Select Branch'
//                 {...field}
//                 error={!!errors.targetBranches}
//                 helperText={errors.targetBranches?.message}
//               >
//                 {loadingBranches ? (
//                   <MenuItem disabled>Loading branches...</MenuItem>
//                 ) : branches.length > 0 ? (
//                   branches.map(branch => (
//                     <MenuItem key={branch._id} value={branch._id}>
//                       {branch.branchName || 'Unnamed Branch'}
//                     </MenuItem>
//                   ))
//                 ) : (
//                   <MenuItem disabled>No branches found</MenuItem>
//                 )}
//               </CustomTextField>
//             )}
//           />

//           {/* 🏬 Department Dropdown (depends on branch) */}
//           <Controller
//             name='targetDepartment'
//             control={control}
//             rules={{ required: 'Department is required' }}
//             render={({ field }) => (
//               <CustomTextField
//                 select
//                 fullWidth
//                 label='Select Department'
//                 {...field}
//                 error={!!errors.targetDepartment}
//                 helperText={errors.targetDepartment?.message}
//               >
//                 {loadingDepartments ? (
//                   <MenuItem disabled>Loading departments...</MenuItem>
//                 ) : departments.length > 0 ? (
//                   departments.map(dept => (
//                     <MenuItem key={dept._id} value={dept._id}>
//                       {dept.departmentName || dept.name || 'Unnamed Department'}
//                     </MenuItem>
//                   ))
//                 ) : (
//                   <MenuItem disabled>No departments found</MenuItem>
//                 )}
//               </CustomTextField>
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

// export default AddDepartmentDrawer

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
//   Alert as MuiAlert,
//   Checkbox,
//   FormControlLabel,
//   Box
// } from '@mui/material'
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
// import { DatePicker } from '@mui/x-date-pickers/DatePicker'
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
// import dayjs from 'dayjs'
// import { useForm, Controller } from 'react-hook-form'
// import FileUploadController from '../../../../components/fileUploadController'

// // 🧠 Server Actions
// import {
//   createAnnouncements,
//   fetchListOfBranch,
//   fetchDepartmentsByBranch
// } from '../../../../app/server/actions'

// import CustomTextField from '@core/components/mui/TextField'

// const AddDepartmentDrawer = props => {
//   const { open, handleClose, refreshDepartments } = props

//   const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' })
//   const [branches, setBranches] = useState([])
//   const [departments, setDepartments] = useState([])
//   const [loadingBranches, setLoadingBranches] = useState(true)
//   const [loadingDepartments, setLoadingDepartments] = useState(false)

//   // 🎯 Form setup
//   const {
//     control,
//     reset,
//     handleSubmit,
//     watch,
//     formState: { errors }
//   } = useForm({
//     defaultValues: {
//       title: '',
//       category: '',
//       description: '',
//       content: '',
//       startDate: '',
//       endDate: '',
//       attachments: null,
//       featuredAnnouncements: false,
//       highPriority: false,
//       companyWideAnnouncements: false,
//       targetBranches: '',
//       targetDepartment: ''
//     }
//   })

//   // 🧩 Fetch branches
//   useEffect(() => {
//     const loadBranches = async () => {
//       try {
//         const response = await fetchListOfBranch()
//         if (response?.success && Array.isArray(response.data)) setBranches(response.data)
//         else if (Array.isArray(response)) setBranches(response)
//       } catch (err) {
//         console.error('Error fetching branches:', err)
//       } finally {
//         setLoadingBranches(false)
//       }
//     }
//     loadBranches()
//   }, [])

//   // 🧩 Fetch departments when branch changes
//   const selectedBranch = watch('targetBranches')
//   useEffect(() => {
//     const loadDepartments = async () => {
//       if (!selectedBranch) {
//         setDepartments([])
//         return
//       }

//       setLoadingDepartments(true)
//       try {
//         const response = await fetchDepartmentsByBranch(selectedBranch)
//         if (response?.success && Array.isArray(response.data)) setDepartments(response.data)
//         else if (Array.isArray(response)) setDepartments(response)
//         else setDepartments([])
//       } catch (err) {
//         console.error('Error fetching departments:', err)
//         setDepartments([])
//       } finally {
//         setLoadingDepartments(false)
//       }
//     }
//     loadDepartments()
//   }, [selectedBranch])

//   // ✅ Submit Form
//   const onSubmit = async data => {
//     try {
//       const formData = new FormData()

//       // 🎯 Text fields
//       formData.append('title', data.title)
//       formData.append('category', data.category)
//       formData.append('description', data.description)
//       formData.append('content', data.content)

//       // 🗓 Dates
//       if (data.startDate) formData.append('startDate', data.startDate)
//       if (data.endDate) formData.append('endDate', data.endDate)

//       // 📎 File upload
//       if (data.attachments) formData.append('attachments', data.attachments)

//       // ✅ Boolean fields
//       formData.append('featuredAnnouncements', data.featuredAnnouncements ? 'true' : 'false')
//       formData.append('highPriority', data.highPriority ? 'true' : 'false')
//       formData.append('companyWideAnnouncements', data.companyWideAnnouncements ? 'true' : 'false')

//       // 🏢 Reference fields
//       if (data.targetBranches) formData.append('targetBranches', data.targetBranches)
//       if (data.targetDepartment) formData.append('targetDepartment', data.targetDepartment)

//       // Optional Debug
//       // for (let [key, value] of formData.entries()) console.log(`${key}: ${value}`)

//       const response = await createAnnouncements(formData)

//       if (response?.success) {
//         setSnackbar({
//           open: true,
//           message: response.message || 'Announcement created successfully',
//           severity: 'success'
//         })
//         if (typeof refreshDepartments === 'function') await refreshDepartments()
//         handleClose()
//         reset()
//       } else {
//         setSnackbar({
//           open: true,
//           message: response.message || 'Failed to create announcement',
//           severity: 'error'
//         })
//       }
//     } catch (error) {
//       console.error('Error creating announcement:', error)
//       setSnackbar({
//         open: true,
//         message: 'Error creating announcement',
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
//         {/* Header */}
//         <div className='flex items-center justify-between p-5'>
//           <Typography variant='h5' fontWeight='bold'>
//             Add New Announcement
//           </Typography>
//           <IconButton size='small' onClick={handleReset}>
//             <i className='tabler-x text-2xl text-textPrimary' />
//           </IconButton>
//         </div>
//         <Divider />

//         {/* Form */}
//         <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-6 p-6'>

//           {/* 🧾 Title */}
//           <Controller
//             name='title'
//             control={control}
//             rules={{ required: 'Title is required' }}
//             render={({ field }) => (
//               <CustomTextField {...field} fullWidth label='Title' error={!!errors.title} helperText={errors.title?.message} />
//             )}
//           />

//           {/* 🏷 Category */}
//           <Controller
//             name='category'
//             control={control}
//             rules={{ required: 'Category is required' }}
//             render={({ field }) => (
//               <CustomTextField select fullWidth label='Category' {...field}>
//                 <MenuItem value='Company News'>Company News</MenuItem>
//                 <MenuItem value='Policy Updates'>Policy Updates</MenuItem>
//                 <MenuItem value='Events'>Events</MenuItem>
//                 <MenuItem value='HR'>HR</MenuItem>
//                 <MenuItem value='IT Updates'>IT Updates</MenuItem>
//               </CustomTextField>
//             )}
//           />

//           {/* 📝 Description */}
//           <Controller
//             name='description'
//             control={control}
//             rules={{ required: 'Short Description is required' }}
//             render={({ field }) => (
//               <CustomTextField
//                 {...field}
//                 fullWidth
//                 multiline
//                 minRows={2}
//                 label='Short Description'
//                 error={!!errors.description}
//                 helperText={errors.description?.message}
//               />
//             )}
//           />

//           {/* 📄 Content */}
//           <Controller
//             name='content'
//             control={control}
//             rules={{ required: 'Content is required' }}
//             render={({ field }) => (
//               <CustomTextField
//                 {...field}
//                 fullWidth
//                 multiline
//                 minRows={3}
//                 label='Content'
//                 error={!!errors.content}
//                 helperText={errors.content?.message}
//               />
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
//                   slotProps={{ textField: { fullWidth: true } }}
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
//                   slotProps={{ textField: { fullWidth: true } }}
//                 />
//               )}
//             />
//           </LocalizationProvider>

//           {/* 📎 File Upload */}
//           <FileUploadController
//             control={control}
//             errors={errors}
//             name='attachments'
//             label='Attachments'
//             accept='image/*,.pdf,.doc,.docx'
//           />

//           {/* ✅ Boolean Checkboxes */}
//           {[
//             { label: 'Featured Announcement', name: 'featuredAnnouncements' },
//             { label: 'High Priority', name: 'highPriority' },
//             { label: 'Company Wide Announcement', name: 'companyWideAnnouncements' }
//           ].map(({ label, name }) => (
//             <Controller
//               key={name}
//               name={name}
//               control={control}
//               defaultValue={false}
//               render={({ field }) => (
//                 <Box sx={{ display: 'flex', flexDirection: 'column', mb: 2 }}>
//                   <Typography variant='subtitle1' fontWeight={600} sx={{ color: 'text.primary', mb: 0.5 }}>
//                     {label}
//                   </Typography>
//                   <FormControlLabel
//                     control={
//                       <Checkbox
//                         checked={!!field.value}
//                         onChange={e => field.onChange(e.target.checked)}
//                         sx={{
//                           color: '#2B3380',
//                           '&.Mui-checked': { color: '#2B3380' }
//                         }}
//                       />
//                     }
//                     label={<Typography variant='body2'>{label}</Typography>}
//                     sx={{ ml: 1 }}
//                   />
//                 </Box>
//               )}
//             />
//           ))}

//           {/* 🏢 Branch Dropdown */}
//           <Controller
//             name='targetBranches'
//             control={control}
//             rules={{ required: 'Branch is required' }}
//             render={({ field }) => (
//               <CustomTextField select fullWidth label='Select Branch' {...field}>
//                 {loadingBranches ? (
//                   <MenuItem disabled>Loading branches...</MenuItem>
//                 ) : branches.length > 0 ? (
//                   branches.map(branch => (
//                     <MenuItem key={branch._id} value={branch._id}>
//                       {branch.branchName || 'Unnamed Branch'}
//                     </MenuItem>
//                   ))
//                 ) : (
//                   <MenuItem disabled>No branches found</MenuItem>
//                 )}
//               </CustomTextField>
//             )}
//           />

//           {/* 🏬 Department Dropdown */}
//           <Controller
//             name='targetDepartment'
//             control={control}
//             rules={{ required: 'Department is required' }}
//             render={({ field }) => (
//               <CustomTextField select fullWidth label='Select Department' {...field}>
//                 {loadingDepartments ? (
//                   <MenuItem disabled>Loading departments...</MenuItem>
//                 ) : departments.length > 0 ? (
//                   departments.map(dept => (
//                     <MenuItem key={dept._id} value={dept._id}>
//                       {dept.departmentName || dept.name || 'Unnamed Department'}
//                     </MenuItem>
//                   ))
//                 ) : (
//                   <MenuItem disabled>No departments found</MenuItem>
//                 )}
//               </CustomTextField>
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
  Box
} from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'
import { useForm, Controller } from 'react-hook-form'
import FileUploadController from '../../../../components/fileUploadController'

// 🧠 Server Actions
import {
  createAnnouncements,
  fetchListOfBranch,
  fetchDepartmentsByBranch
} from '../../../../app/server/actions'

import CustomTextField from '@core/components/mui/TextField'

const AddDepartmentDrawer = props => {
  const { open, handleClose, refreshDepartments } = props

  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' })
  const [branches, setBranches] = useState([])
  const [departments, setDepartments] = useState([])
  const [loadingBranches, setLoadingBranches] = useState(true)
  const [loadingDepartments, setLoadingDepartments] = useState(false)

  // 🎯 Form setup
  const {
    control,
    reset,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm({
    defaultValues: {
      title: '',
      category: '',
      description: '',
      content: '',
      startDate: '',
      endDate: '',
      attachments: null,
      featuredAnnouncements: false,
      highPriority: false,
      companyWideAnnouncements: false,
      targetBranches: '',
      targetDepartment: ''
    }
  })

  // 🧩 Fetch branches
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

  // 🧩 Fetch departments when branch changes
  const selectedBranch = watch('targetBranches')
  useEffect(() => {
    const loadDepartments = async () => {
      if (!selectedBranch) {
        setDepartments([])
        return
      }

      setLoadingDepartments(true)
      try {
        const response = await fetchDepartmentsByBranch(selectedBranch)
        if (response?.success && Array.isArray(response.data)) setDepartments(response.data)
        else if (Array.isArray(response)) setDepartments(response)
        else setDepartments([])
      } catch (err) {
        console.error('Error fetching departments:', err)
        setDepartments([])
      } finally {
        setLoadingDepartments(false)
      }
    }
    loadDepartments()
  }, [selectedBranch])

  // ✅ Submit Form
  const onSubmit = async data => {
    try {
      const formData = new FormData()

      // 🎯 Text fields
      formData.append('title', data.title || '')
      formData.append('category', data.category || '')
      formData.append('description', data.description || '')
      formData.append('content', data.content || '')

      // 🗓 Dates
      if (data.startDate) formData.append('startDate', data.startDate)
      if (data.endDate) formData.append('endDate', data.endDate)

      // 📎 File upload
      if (data.attachments) formData.append('attachments', data.attachments)

      // ✅ Boolean fields
      formData.append('featuredAnnouncements', data.featuredAnnouncements ? 'true' : 'false')
      formData.append('highPriority', data.highPriority ? 'true' : 'false')
      formData.append('companyWideAnnouncements', data.companyWideAnnouncements ? 'true' : 'false')

      // 🏢 Reference fields
      if (data.targetBranches) formData.append('targetBranches', data.targetBranches)
      if (data.targetDepartment) formData.append('targetDepartment', data.targetDepartment)

      const response = await createAnnouncements(formData)

      if (response?.success) {
        setSnackbar({
          open: true,
          message: response.message || 'Announcement created successfully',
          severity: 'success'
        })
        if (typeof refreshDepartments === 'function') await refreshDepartments()
        handleClose()
        reset()
      } else {
        setSnackbar({
          open: true,
          message: response.message || 'Failed to create announcement',
          severity: 'error'
        })
      }
    } catch (error) {
      console.error('Error creating announcement:', error)
      setSnackbar({
        open: true,
        message: 'Error creating announcement',
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
            Add New Announcement
          </Typography>
          <IconButton size='small' onClick={handleReset}>
            <i className='tabler-x text-2xl text-textPrimary' />
          </IconButton>
        </div>
        <Divider />

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-6 p-6'>
          {/* 🧾 Title */}
          <Controller
            name='title'
            control={control}
            rules={{ required: 'Title is required' }}
            render={({ field }) => (
              <CustomTextField
                {...field}
                fullWidth
                label='Title'
                value={field.value ?? ''}
                error={!!errors.title}
                helperText={errors.title?.message}
              />
            )}
          />

          {/* 🏷 Category */}
          <Controller
            name='category'
            control={control}
            rules={{ required: 'Category is required' }}
            render={({ field }) => (
              <CustomTextField
                select
                fullWidth
                label='Category'
                {...field}
                value={field.value ?? ''}
              >
                <MenuItem value='Company News'>Company News</MenuItem>
                <MenuItem value='Policy Updates'>Policy Updates</MenuItem>
                <MenuItem value='Events'>Events</MenuItem>
                <MenuItem value='HR'>HR</MenuItem>
                <MenuItem value='IT Updates'>IT Updates</MenuItem>
              </CustomTextField>
            )}
          />

          {/* 📝 Description */}
          <Controller
            name='description'
            control={control}
            rules={{ required: 'Short Description is required' }}
            render={({ field }) => (
              <CustomTextField
                {...field}
                fullWidth
                multiline
                minRows={2}
                label='Short Description'
                value={field.value ?? ''}
                error={!!errors.description}
                helperText={errors.description?.message}
              />
            )}
          />

          {/* 📄 Content */}
          <Controller
            name='content'
            control={control}
            rules={{ required: 'Content is required' }}
            render={({ field }) => (
              <CustomTextField
                {...field}
                fullWidth
                multiline
                minRows={3}
                label='Content'
                value={field.value ?? ''}
                error={!!errors.content}
                helperText={errors.content?.message}
              />
            )}
          />

          {/* 📅 Dates */}
          {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Controller
              name='startDate'
              control={control}
              render={({ field }) => (
                <DatePicker
                  label='Start Date'
                  value={field.value ? dayjs(field.value) : null}
                  onChange={newValue => field.onChange(newValue ? newValue.toISOString() : '')}
                  enableAccessibleFieldDOMStructure={false}
                  slots={{ textField: CustomTextField }}
                  slotProps={{
                    textField: { fullWidth: true, value: field.value ?? '' }
                  }}
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
                  onChange={newValue => field.onChange(newValue ? newValue.toISOString() : '')}
                  enableAccessibleFieldDOMStructure={false}
                  slots={{ textField: CustomTextField }}
                  slotProps={{
                    textField: { fullWidth: true, value: field.value ?? '' }
                  }}
                />
              )}
            />
          </LocalizationProvider> */}
          {/* 📅 Start Date */}
<LocalizationProvider dateAdapter={AdapterDayjs}>
  <Controller
    name='startDate'
    control={control}
    render={({ field }) => (
      <DatePicker
        label='Start Date'
        value={field.value ? dayjs(field.value) : null}
        onChange={newValue => field.onChange(newValue ? newValue.toISOString() : null)}
        enableAccessibleFieldDOMStructure={false}
        slots={{ textField: CustomTextField }}
        slotProps={{
          textField: {
            fullWidth: true,
            error: !!errors.startDate,
            helperText: errors.startDate?.message
          }
        }}
      />
    )}
  />
</LocalizationProvider>

{/* 📅 End Date */}
<LocalizationProvider dateAdapter={AdapterDayjs}>
  <Controller
    name='endDate'
    control={control}
    render={({ field }) => (
      <DatePicker
        label='End Date'
        value={field.value ? dayjs(field.value) : null}
        onChange={newValue => field.onChange(newValue ? newValue.toISOString() : null)}
        enableAccessibleFieldDOMStructure={false}
        slots={{ textField: CustomTextField }}
        slotProps={{
          textField: {
            fullWidth: true,
            error: !!errors.endDate,
            helperText: errors.endDate?.message
          }
        }}
      />
    )}
  />
</LocalizationProvider>


          {/* 📎 File Upload */}
          <FileUploadController
            control={control}
            errors={errors}
            name='attachments'
            label='Attachments'
            defaultValue={null}
            accept='image/*,.pdf,.doc,.docx'
          />

          {/* ✅ Boolean Checkboxes */}
          {[
            { label: 'Featured Announcement', name: 'featuredAnnouncements' },
            { label: 'High Priority', name: 'highPriority' },
            { label: 'Company Wide Announcement', name: 'companyWideAnnouncements' }
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
                        sx={{
                          color: '#2B3380',
                          '&.Mui-checked': { color: '#2B3380' }
                        }}
                      />
                    }
                    label={<Typography variant='body2'>{label}</Typography>}
                    sx={{ ml: 1 }}
                  />
                </Box>
              )}
            />
          ))}

          {/* 🏢 Branch Dropdown */}
          <Controller
            name='targetBranches'
            control={control}
            rules={{ required: 'Branch is required' }}
            render={({ field }) => (
              <CustomTextField
                select
                fullWidth
                label='Select Branch'
                {...field}
                value={field.value ?? ''}
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

          {/* 🏬 Department Dropdown */}
          <Controller
            name='targetDepartment'
            control={control}
            rules={{ required: 'Department is required' }}
            render={({ field }) => (
              <CustomTextField
                select
                fullWidth
                label='Select Department'
                {...field}
                value={field.value ?? ''}
              >
                {loadingDepartments ? (
                  <MenuItem disabled>Loading departments...</MenuItem>
                ) : departments.length > 0 ? (
                  departments.map(dept => (
                    <MenuItem key={dept._id} value={dept._id}>
                      {dept.departmentName || dept.name || 'Unnamed Department'}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem disabled>No departments found</MenuItem>
                )}
              </CustomTextField>
            )}
          />

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



