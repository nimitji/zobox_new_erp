 


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

// // 🧠 Server Action
// import {
//   createEmployee,
//   fetchListOfRole,
//   fetchListOfDepartment,
//   fetchListOfDesignationBasedOnDepartment,fetchListOfUser
// } from '../../../../../app/server/actions.js'

// // 🧱 Component Imports
// import CustomTextField from '@core/components/mui/TextField'

// const initialData = {
//   country: '',
//   contact: ''
// }

// const AddUserDrawer = props => {
//   const { open, handleClose, refreshDepartments } = props

//   const [formData, setFormData] = useState(initialData)
//   const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' })
//   const [roles, setRoles] = useState([])
//   const [loadingRoles, setLoadingRoles] = useState(true)
//   const [department, setDepartments] = useState([])
//   const [loadingDepartments, setLoadingDepartments] = useState(true)
//   const [designations, setDesignations] = useState([])
//   const [loadingDesignations, setLoadingDesignations] = useState(false)

// const [users, setUsers] = useState([])
// const [loadingUsers, setLoadingUsers] = useState(true)

//   const {
//     control,
//     reset: resetForm,
//     handleSubmit,
//     watch,
//     formState: { errors }
//   } = useForm({
//     defaultValues: {
//     username: '',             // Employee Name
//     companyNameStatus: '',    // Company Status
//     role: '',                 // Role dropdown
//     department: '',           // Department dropdown
//     designation: '',          // Designation dropdown
//     dateOfJoining: '',        // Date of Joining
//     reportingManager: '',     // Reporting Manager dropdown
//     email: '',                // Email
//     contact: '',              // Contact number
//     panNumber: '',            // PAN number
//     aadharNumber: '',         // Aadhar number
//     dateOfBirth: '',          // Date of Birth
//     gender: '',               // Gender
//     martialStatus: '',        // Marital Status
//     bloodGroup: '',           // Blood Group
//     emergencyNumber: '',      // Emergency Contact number
//     status: 'Active'          // Default Status
//   }
//   })

//   const selectedDepartment = watch('department')

//   // 🧠 Fetch Roles
//   useEffect(() => {
//     const loadRoles = async () => {
//       try {
//         const response = await fetchListOfRole()
//         if (response?.success && Array.isArray(response.data)) {
//           setRoles(response.data)
//         } else if (Array.isArray(response)) {
//           setRoles(response)
//         } else {
//           console.warn('Invalid role data format:', response)
//         }
//       } catch (err) {
//         console.error('Error fetching roles:', err)
//       } finally {
//         setLoadingRoles(false)
//       }
//     }
//     loadRoles()
//   }, [])

//   // 🧠 Fetch Departments
//   useEffect(() => {
//     const loadDepartments = async () => {
//       try {
//         const response = await fetchListOfDepartment()
//         if (response?.success && Array.isArray(response.data)) {
//           setDepartments(response.data)
//         } else if (Array.isArray(response)) {
//           setDepartments(response)
//         } else {
//           console.warn('Invalid department data format:', response)
//         }
//       } catch (err) {
//         console.error('Error fetching departments:', err)
//       } finally {
//         setLoadingDepartments(false)
//       }
//     }
//     loadDepartments()
//   }, [])

//   // 🧠 Fetch Designations (Based on Department)
//   useEffect(() => {
//     if (!selectedDepartment) {
//       setDesignations([])
//       return
//     }
//     const loadDesignations = async () => {
//       setLoadingDesignations(true)
//       try {
//         const response = await fetchListOfDesignationBasedOnDepartment(selectedDepartment)
//         if (response?.success && Array.isArray(response.data)) {
//           setDesignations(response.data)
//         } else if (Array.isArray(response)) {
//           setDesignations(response)
//         } else {
//           console.warn('Invalid designation data format:', response)
//         }
//       } catch (error) {
//         console.error('Error fetching designations:', error)
//       } finally {
//         setLoadingDesignations(false)
//       }
//     }
//     loadDesignations()
//   }, [selectedDepartment])


//   // Fetch Users
// useEffect(() => {
//   const loadUsers = async () => {
//     try {
//       const response = await fetchListOfUser() // server action
//       if (response?.success && Array.isArray(response.data)) {
//         setUsers(response.data)
//       } else if (Array.isArray(response)) {
//         setUsers(response)
//       } else {
//         console.warn('Invalid user data format:', response)
//       }
//     } catch (err) {
//       console.error('Error fetching users:', err)
//     } finally {
//       setLoadingUsers(false)
//     }
//   }

//   loadUsers()
// }, [])

//   // ✅ Form Submit
//   const onSubmit = async data => {
//     try {
//       const payload =  {
//       username: data.username,              // Employee Name
//       companyNameStatus: data.companyNameStatus, // Company Status
//       role: data.role,                      // Role dropdown
//       department: data.department,          // Department dropdown
//       designation: data.designation,        // Designation dropdown
//       dateOfJoining: data.dateOfJoining,    // Date of Joining
//       reportingManager: data.reportingManager, // Reporting Manager
//       email: data.email,                    // Email
//       contact: data.contact,                // Contact number
//       panNumber: data.panNumber,            // PAN number
//       aadharNumber: data.aadharNumber,      // Aadhar number
//       dateOfBirth: data.dateOfBirth,        // Date of Birth
//       gender: data.gender,                  // Gender
//       martialStatus: data.martialStatus,    // Marital Status
//       bloodGroup: data.bloodGroup,          // Blood Group
//       emergencyNumber: data.emergencyNumber,// Emergency Contact
//       status: data.status                   // Active/Inactive
//     }

//       const response = await createEmployee(payload)

//       if (response?.success) {
//         setSnackbar({
//           open: true,
//           message: response.message || 'Employee created successfully',
//           severity: 'success'
//         })

//         if (typeof refreshDepartments === 'function') {
//           await refreshDepartments()
//         }

//         handleClose()
//         setFormData(initialData)
//         resetForm()
//       } else {
//         setSnackbar({
//           open: true,
//           message: response.message || 'Failed to create employee',
//           severity: 'error'
//         })
//       }
//     } catch (error) {
//       console.error('Error creating employee:', error)
//       setSnackbar({ open: true, message: 'Error creating employee', severity: 'error' })
//     }
//   }

//   const handleReset = () => {
//     handleClose()
//     setFormData(initialData)
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
//           <Typography variant='h5'>Add Employee</Typography>
//           <IconButton size='small' onClick={handleReset}>
//             <i className='tabler-x text-2xl text-textPrimary' />
//           </IconButton>
//         </div>

//         <Divider />

//         <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-6 p-6'>
//           {/* Employee Name */}
//           <Controller
//             name='username'
//             control={control}
//             rules={{ required: true }}
//             render={({ field }) => (
//               <CustomTextField
//                 {...field}
//                 fullWidth
//                 label='Employee Name'
//                 placeholder='John Doe'
//                 error={!!errors.username}
//                 helperText={errors.username && 'This field is required.'}
//               />
//             )}
//           />

//                 <Controller
//              name='companyNameStatus'
//              control={control}
//              rules={{ required: true }}
//              render={({ field }) => (
//                <CustomTextField
//                  select
//                  fullWidth
//                  id='select-plan'
//                  label='Company Status'
//                  {...field}
//                  slotProps={{
//                    htmlInput: { placeholder: 'Company Status' }
//                  }}
//                  {...(errors.plan && { error: true, helperText: 'This field is required.' })}
//                >
//                  <MenuItem value='basic'>Company</MenuItem>
//                  <MenuItem value='company'>Elementz</MenuItem>
//                  <MenuItem value='enterprise'>MANAGE</MenuItem>
//                  <MenuItem value='team'>NOT INT</MenuItem>
//                   <MenuItem value='team'>Zobox</MenuItem>
//                    <MenuItem value='team'>LEFT</MenuItem>
//                </CustomTextField>
//              )}
//            />

//           {/* Role Dropdown */}
//           <Controller
//             name='role'
//             control={control}
//             rules={{ required: true }}
//             render={({ field }) => (
//               <CustomTextField
//                 select
//                 fullWidth
//                 label='Role'
//                 {...field}
//                 error={!!errors.role}
//                 helperText={errors.role && 'Role is required.'}
//               >
//                 {loadingRoles ? (
//                   <MenuItem disabled>Loading roles...</MenuItem>
//                 ) : roles.length > 0 ? (
//                   roles.map(role => (
//                     <MenuItem key={role._id} value={role._id}>
//                       {role.name}
//                     </MenuItem>
//                   ))
//                 ) : (
//                   <MenuItem disabled>No Roles found</MenuItem>
//                 )}
//               </CustomTextField>
//             )}
//           />

//           {/* Department Dropdown */}
//           <Controller
//             name='department'
//             control={control}
//             rules={{ required: true }}
//             render={({ field }) => (
//               <CustomTextField
//                 select
//                 fullWidth
//                 label='Department'
//                 {...field}
//                 error={!!errors.department}
//                 helperText={errors.department && 'Department is required.'}
//               >
//                 {loadingDepartments ? (
//                   <MenuItem disabled>Loading departments...</MenuItem>
//                 ) : department.length > 0 ? (
//                   department.map(dept => (
//                     <MenuItem key={dept._id} value={dept._id}>
//                       {dept.departmentName}
//                     </MenuItem>
//                   ))
//                 ) : (
//                   <MenuItem disabled>No Departments found</MenuItem>
//                 )}
//               </CustomTextField>
//             )}
//           />

//           {/* Designation Dropdown */}
//           <Controller
//             name='designation'
//             control={control}
//             render={({ field }) => (
//               <CustomTextField
//                 select
//                 fullWidth
//                 label='Designation'
//                 {...field}
//                 disabled={!selectedDepartment || loadingDesignations}
//               >
//                 {loadingDesignations ? (
//                   <MenuItem disabled>Loading designations...</MenuItem>
//                 ) : designations.length > 0 ? (
//                   designations.map(des => (
//                     <MenuItem key={des._id} value={des._id}>
//                       {des.name}
//                     </MenuItem>
//                   ))
//                 ) : (
//                   <MenuItem disabled>No Designations found</MenuItem>
//                 )}
//               </CustomTextField>
//             )}
//           />

      

// <LocalizationProvider dateAdapter={AdapterDayjs}>
//   <Controller
//     name='dateOfJoining'
//     control={control}
//     rules={{ required: 'Date is required' }}
//     render={({ field }) => (
//       <DatePicker
//         label='Date of Joining'
//         value={field.value ? dayjs(field.value) : null}
//         onChange={newValue => field.onChange(newValue ? newValue.toISOString() : '')}
//         // ✅ ADD THIS LINE
//         enableAccessibleFieldDOMStructure={false}
//         // ✅ Keep using your CustomTextField safely
//         slots={{ textField: CustomTextField }}
//         slotProps={{
//           textField: {
//             fullWidth: true,
//             error: !!errors.dateOfJoining,
//             helperText: errors.dateOfJoining?.message || '',
//             placeholder: 'Select joining date'
//           }
//         }}
//       />
//     )}
//   />
// </LocalizationProvider>


// {/* //Users */}


// <Controller
//   name="reportingManager"
//   control={control}
//   rules={{ required: true }}
//   render={({ field }) => (
//     <CustomTextField
//       select
//       fullWidth
//       label="Reporting Manager"
//       {...field}
//       error={!!errors.reportingManager}
//       helperText={errors.reportingManager && 'User is required.'}
//     >
//       {loadingUsers ? (
//         <MenuItem disabled>Loading users...</MenuItem>
//       ) : users.length > 0 ? (
//         users.map(u => (
//           <MenuItem key={u._id} value={u._id}>
//             {`${u.username}`}
//           </MenuItem>
//         ))
//       ) : (
//         <MenuItem disabled>No Users found</MenuItem>
//       )}
//     </CustomTextField>
//   )}
// />


//    <Controller
//              name='email'
//              control={control}
//              rules={{ required: true }}
//              render={({ field }) => (
//                <CustomTextField
//                  {...field}
//                  fullWidth
//                  type='email'
//                  label='Email'
//                  placeholder='johndoe@gmail.com'
//                  {...(errors.email && { error: true, helperText: 'This field is required.' })}
//                />
//              )}
//            />




     

//                 <CustomTextField
//              label='Contact'
//              type='number'
//              fullWidth
//              placeholder='9034567123'
//              value={formData.contact}
//              onChange={e => setFormData({ ...formData, contact: e.target.value })}
//            />

//                 <Controller
//             name='panNumber'
//             control={control}
//             rules={{ required: true }}
//             render={({ field }) => (
//               <CustomTextField
//                 {...field}
//                 fullWidth
//                 label='Pan Number'
//                 placeholder='AAACS8577K'
//                 error={!!errors.panNumber}
//                 helperText={errors.panNumber && 'This field is required.'}
//               />
//             )}
//           />

//                  <Controller
//             name='aadharNumber'
//             control={control}
//             rules={{ required: true }}
//             render={({ field }) => (
//               <CustomTextField
//                 {...field}
//                 fullWidth
//                 label='Aadhar Number'
//                 placeholder='123409876543'
//                 error={!!errors.panNumber}
//                 helperText={errors.panNumber && 'This field is required.'}
//               />
//             )}
//           />

//           <LocalizationProvider dateAdapter={AdapterDayjs}>
//   <Controller
//     name='dateOfBirth'
//     control={control}
//     rules={{ required: 'Date is required' }}
//     render={({ field }) => (
//       <DatePicker
//         label='Date of Birth'
//         value={field.value ? dayjs(field.value) : null}
//         onChange={newValue => field.onChange(newValue ? newValue.toISOString() : '')}
//         // ✅ ADD THIS LINE
//         enableAccessibleFieldDOMStructure={false}
//         // ✅ Keep using your CustomTextField safely
//         slots={{ textField: CustomTextField }}
//         slotProps={{
//           textField: {
//             fullWidth: true,
//             error: !!errors.dateOfBirth,
//             helperText: errors.dateOfBirth?.message || '',
//             placeholder: 'Select date of birth'
//           }
//         }}
//       />
//     )}
//   />
// </LocalizationProvider>

//       <Controller
//              name='gender'
//              control={control}
//              rules={{ required: true }}
//              render={({ field }) => (
//                <CustomTextField
//                  select
//                  fullWidth
//                  id='select-plan'
//                  label='Gender'
//                  {...field}
//                  slotProps={{
//                    htmlInput: { placeholder: 'Gender' }
//                  }}
//                  {...(errors.plan && { error: true, helperText: 'This field is required.' })}
//                >
//                  <MenuItem value='Male'>Male</MenuItem>
//                  <MenuItem value='Female'>Female</MenuItem>
                
//                </CustomTextField>
//              )}
//            />

//            <Controller
//              name='martialStatus'
//              control={control}
//              rules={{ required: true }}
//              render={({ field }) => (
//                <CustomTextField
//                  select
//                  fullWidth
//                  id='select-plan'
//                  label='Martial Status'
//                  {...field}
//                  slotProps={{
//                    htmlInput: { placeholder: 'Martial Gender' }
//                  }}
//                  {...(errors.plan && { error: true, helperText: 'This field is required.' })}
//                >
//                  <MenuItem value='Married'>Married</MenuItem>
//                  <MenuItem value='Un-married'>Un-married</MenuItem>
                
//                </CustomTextField>
//              )}
//            />


//                 <Controller
//             name='bloodGroup'
//             control={control}
//             rules={{ required: true }}
//             render={({ field }) => (
//               <CustomTextField
//                 {...field}
//                 fullWidth
//                 label='Blood Group'
//                 placeholder='O+'
//                 error={!!errors.bloodGroup}
//                 helperText={errors.bloodGroup && 'This field is required.'}
//               />
//             )}
//           />


//         <CustomTextField
//              label='Emergency Number'
//              type='number'
//              fullWidth
//              placeholder='9034567123'
//              value={formData.emergencyNumber}
//              onChange={e => setFormData({ ...formData, emergencyNumber: e.target.value })}
//            />

            

//           {/* Status */}
//           <Controller
//             name='status'
//             control={control}
//             rules={{ required: true }}
//             render={({ field }) => (
//               <CustomTextField select fullWidth label='Select Status' {...field}>
//                 <MenuItem value='Active'>Active</MenuItem>
//                 <MenuItem value='Inactive'>Inactive</MenuItem>
//               </CustomTextField>
//             )}
//           />

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

//       {/* Snackbar */}
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

// export default AddUserDrawer


'use client'

import { useState, useEffect } from 'react'

// MUI
import Button from '@mui/material/Button'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'

// Date pickers
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'

// react-hook-form
import { useForm, Controller } from 'react-hook-form'

// Server actions (your paths may vary)
import {
  createEmployee,
  fetchListOfRole,
  fetchListOfDepartment,
  fetchListOfDesignationBasedOnDepartment,
  fetchListOfUser
} from '../../../../../app/server/actions.js'

// Custom TextField
import CustomTextField from '@core/components/mui/TextField'

const AddUserDrawer = props => {
  const { open, handleClose, userData, setData, refreshDepartments } = props

  // dropdown data
  const [roles, setRoles] = useState([])
  const [loadingRoles, setLoadingRoles] = useState(true)

  const [departments, setDepartments] = useState([])
  const [loadingDepartments, setLoadingDepartments] = useState(true)

  const [designations, setDesignations] = useState([])
  const [loadingDesignations, setLoadingDesignations] = useState(false)

  const [users, setUsers] = useState([])
  const [loadingUsers, setLoadingUsers] = useState(true)

  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' })

  // IMPORTANT: defaultValues must include every controlled field
  const {
    control,
    handleSubmit,
    reset: resetForm,
    watch,
    formState: { errors }
  } = useForm({
    defaultValues: {
      username: '',
      companyNameStatus: '',
      role: '',
      department: '',
      designation: '',
      dateOfJoining: null, // MUST be null for DatePicker when empty
      reportingManager: '',
      email: '',
      contact: '',
      panNumber: '',
      aadharNumber: '',
      dateOfBirth: null, // null for DatePicker
      gender: '',
      martialStatus: '',
      bloodGroup: '',
      emergencyNumber: '',
     status: 'Active'
    }
  })

  // watch department for dynamic designations
  const selectedDepartment = watch('department')

  // load roles
  useEffect(() => {
    let mounted = true
    const load = async () => {
      try {
        const res = await fetchListOfRole()
        if (res?.success && Array.isArray(res.data)) {
          if (mounted) setRoles(res.data)
        } else if (Array.isArray(res)) {
          if (mounted) setRoles(res)
        }
      } catch (err) {
        console.error('Error fetching roles', err)
      } finally {
        if (mounted) setLoadingRoles(false)
      }
    }
    load()
    return () => { mounted = false }
  }, [])

  // load departments
  useEffect(() => {
    let mounted = true
    const load = async () => {
      try {
        const res = await fetchListOfDepartment()
        if (res?.success && Array.isArray(res.data)) {
          if (mounted) setDepartments(res.data)
        } else if (Array.isArray(res)) {
          if (mounted) setDepartments(res)
        }
      } catch (err) {
        console.error('Error fetching departments', err)
      } finally {
        if (mounted) setLoadingDepartments(false)
      }
    }
    load()
    return () => { mounted = false }
  }, [])

  // load designations based on selected department id
  useEffect(() => {
    if (!selectedDepartment) {
      setDesignations([])
      return
    }

    let mounted = true
    const load = async () => {
      setLoadingDesignations(true)
      try {
        const res = await fetchListOfDesignationBasedOnDepartment(selectedDepartment)
        if (res?.success && Array.isArray(res.data)) {
          if (mounted) setDesignations(res.data)
        } else if (Array.isArray(res)) {
          if (mounted) setDesignations(res)
        }
      } catch (err) {
        console.error('Error fetching designations:', err)
        if (mounted) setDesignations([])
      } finally {
        if (mounted) setLoadingDesignations(false)
      }
    }
    load()
    return () => { mounted = false }
  }, [selectedDepartment])

  // load users (reporting managers)
  useEffect(() => {
    let mounted = true
    const load = async () => {
      try {
        const res = await fetchListOfUser()
        if (res?.success && Array.isArray(res.data)) {
          if (mounted) setUsers(res.data)
        } else if (Array.isArray(res)) {
          if (mounted) setUsers(res)
        }
      } catch (err) {
        console.error('Error fetching users', err)
      } finally {
        if (mounted) setLoadingUsers(false)
      }
    }
    load()
    return () => { mounted = false }
  }, [])

  const handleReset = () => {
    resetForm()
    handleClose()
  }

  const onSubmit = async data => {
    try {
      // build payload from data
      const payload = {
        username: data.username,
        companyNameStatus: data.companyNameStatus,
        role: data.role,
        department: data.department,
        designation: data.designation,
        dateOfJoining: data.dateOfJoining ? data.dateOfJoining : null, // iso string already saved by DatePicker handler below
        reportingManager: data.reportingManager,
        email: data.email,
        contact: data.contact,
        panNumber: data.panNumber,
        aadharNumber: data.aadharNumber,
        dateOfBirth: data.dateOfBirth ? data.dateOfBirth : null,
        gender: data.gender,
        martialStatus: data.martialStatus,
        bloodGroup: data.bloodGroup,
        emergencyNumber: data.emergencyNumber,
        status: data.status
      }

      // example api call (replace with your actual endpoint)
      const response = await createEmployee(payload)

      if (response?.success) {
        setSnackbar({ open: true, message: response.message || 'Employee created', severity: 'success' })
        if (typeof refreshDepartments === 'function') await refreshDepartments()
        resetForm()
        handleClose()
      } else {
        setSnackbar({ open: true, message: response.message || 'Failed', severity: 'error' })
      }
    } catch (err) {
      console.error('Submit error', err)
      setSnackbar({ open: true, message: 'Error', severity: 'error' })
    }
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
          <Typography variant='h5'>Add Employee</Typography>
          <IconButton size='small' onClick={handleReset}>
            <i className='tabler-x text-2xl text-textPrimary' />
          </IconButton>
        </div>

        <Divider />

        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-6 p-6'>
          {/* Employee Name */}
          <Controller
            name='username'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <CustomTextField
                {...field}
                fullWidth
                label='Employee Name'
                placeholder='John Doe'
                error={!!errors.username}
                helperText={errors.username && 'This field is required.'}
              />
            )}
          />

          {/* Company Status */}
          <Controller
            name='companyNameStatus'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <CustomTextField select fullWidth label='Company Status' {...field}>
                <MenuItem value='Company'>Company</MenuItem>
                <MenuItem value='Elementz'>Elementz</MenuItem>
                <MenuItem value='MANAGE'>MANAGE</MenuItem>
                <MenuItem value='NOT INT'>NOT INT</MenuItem>
                <MenuItem value='Zobox'>Zobox</MenuItem>
                <MenuItem value='LEFT'>LEFT</MenuItem>
              </CustomTextField>
            )}
          />

          {/* Role */}
          <Controller
            name='role'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <CustomTextField select fullWidth label='Role' {...field} error={!!errors.role}>
                {loadingRoles ? (
                  <MenuItem disabled>Loading roles...</MenuItem>
                ) : roles.length > 0 ? (
                  roles.map(r => <MenuItem key={r._id} value={r._id}>{r.name}</MenuItem>)
                ) : (
                  <MenuItem disabled>No Roles found</MenuItem>
                )}
              </CustomTextField>
            )}
          />

          {/* Department */}
          <Controller
            name='department'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <CustomTextField select fullWidth label='Department' {...field} error={!!errors.department}>
                {loadingDepartments ? (
                  <MenuItem disabled>Loading departments...</MenuItem>
                ) : departments.length > 0 ? (
                  departments.map(d => <MenuItem key={d._id} value={d._id}>{d.departmentName}</MenuItem>)
                ) : (
                  <MenuItem disabled>No Departments found</MenuItem>
                )}
              </CustomTextField>
            )}
          />

          {/* Designation - dependent on department */}
          <Controller
            name='designation'
            control={control}
            render={({ field }) => (
              <CustomTextField
                select
                fullWidth
                label='Designation'
                {...field}
                disabled={!selectedDepartment || loadingDesignations}
              >
                {loadingDesignations ? (
                  <MenuItem disabled>Loading designations...</MenuItem>
                ) : designations.length > 0 ? (
                  designations.map(d => <MenuItem key={d._id} value={d._id}>{d.name}</MenuItem>)
                ) : (
                  <MenuItem disabled>No Designations found</MenuItem>
                )}
              </CustomTextField>
            )}
          />

          {/* Date of Joining */}
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Controller
              name='dateOfJoining'
              control={control}
              render={({ field }) => (
                <DatePicker
                  label='Date of Joining'
                  value={field.value ? dayjs(field.value) : null}
                  onChange={newValue => field.onChange(newValue ? newValue.toISOString() : null)}
                  enableAccessibleFieldDOMStructure={false}
                  slots={{ textField: CustomTextField }}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      error: !!errors.dateOfJoining,
                      helperText: errors.dateOfJoining?.message || ''
                    }
                  }}
                />
              )}
            />
          </LocalizationProvider>

          {/* Reporting Manager */}
          <Controller
            name='reportingManager'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <CustomTextField select fullWidth label='Reporting Manager' {...field} error={!!errors.reportingManager}>
                {loadingUsers ? (
                  <MenuItem disabled>Loading users...</MenuItem>
                ) : users.length > 0 ? (
                  users.map(u => <MenuItem key={u._id} value={u._id}>{u.username}</MenuItem>)
                ) : (
                  <MenuItem disabled>No Users found</MenuItem>
                )}
              </CustomTextField>
            )}
          />

          {/* Email */}
          <Controller
            name='email'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <CustomTextField {...field} fullWidth type='email' label='Email' placeholder='johndoe@gmail.com' />
            )}
          />

          {/* Contact */}
          <Controller
            name='contact'
            control={control}
            render={({ field }) => (
              <CustomTextField {...field} fullWidth type='tel' label='Contact' placeholder='9034567123' />
            )}
          />

          {/* PAN */}
          <Controller
            name='panNumber'
            control={control}
            render={({ field }) => (
              <CustomTextField {...field} fullWidth label='PAN Number' placeholder='AAACS8577K' />
            )}
          />

          {/* Aadhar */}
          <Controller
            name='aadharNumber'
            control={control}
            render={({ field }) => (
              <CustomTextField {...field} fullWidth label='Aadhar Number' placeholder='123409876543' />
            )}
          />

          {/* Date of Birth */}
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Controller
              name='dateOfBirth'
              control={control}
              render={({ field }) => (
                <DatePicker
                  label='Date of Birth'
                  value={field.value ? dayjs(field.value) : null}
                  onChange={newValue => field.onChange(newValue ? newValue.toISOString() : null)}
                  enableAccessibleFieldDOMStructure={false}
                  slots={{ textField: CustomTextField }}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      error: !!errors.dateOfBirth,
                      helperText: errors.dateOfBirth?.message || ''
                    }
                  }}
                />
              )}
            />
          </LocalizationProvider>

          {/* Gender */}
          <Controller
            name='gender'
            control={control}
            render={({ field }) => (
              <CustomTextField select fullWidth label='Gender' {...field}>
                <MenuItem value='Male'>Male</MenuItem>
                <MenuItem value='Female'>Female</MenuItem>
              </CustomTextField>
            )}
          />

          {/* Martial Status */}
          <Controller
            name='martialStatus'
            control={control}
            render={({ field }) => (
              <CustomTextField select fullWidth label='Marital Status' {...field}>
                <MenuItem value='Married'>Married</MenuItem>
                <MenuItem value='Un-married'>Un-married</MenuItem>
              </CustomTextField>
            )}
          />

          {/* Blood Group */}
          <Controller
            name='bloodGroup'
            control={control}
            render={({ field }) => (
              <CustomTextField {...field} fullWidth label='Blood Group' placeholder='O+' />
            )}
          />

          {/* Emergency Number */}
          <Controller
            name='emergencyNumber'
            control={control}
            render={({ field }) => (
              <CustomTextField {...field} fullWidth label='Emergency Number' placeholder='9034567123' />
            )}
          />

          {/* Description */}
     
          {/* Status */}
          <Controller
            name='status'
            control={control}
            render={({ field }) => (
              <CustomTextField select fullWidth label='Select Status' {...field}>
                <MenuItem value='Active'>Active</MenuItem>
                <MenuItem value='Inactive'>Inactive</MenuItem>
              </CustomTextField>
            )}
          />

          {/* Actions */}
          <div className='flex items-center gap-4'>
            <Button variant='contained' type='submit'>Submit</Button>
            <Button variant='tonal' color='error' onClick={handleReset}>Cancel</Button>
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
          sx={{ width: '100%', backgroundColor: snackbar.severity === 'success' ? '#2B3380' : '#D32F2F', color: 'white' }}
        >
          {snackbar.message}
        </MuiAlert>
      </Snackbar>
    </>
  )
}

export default AddUserDrawer

