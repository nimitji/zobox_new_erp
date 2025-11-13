

// 'use client'

// import { useState, useEffect } from 'react'
// import { useSession } from 'next-auth/react'

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

// // 🕒 Date/Time Imports
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
// import { DatePicker } from '@mui/x-date-pickers/DatePicker'
// import { TimePicker } from '@mui/x-date-pickers/TimePicker'
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
// import dayjs from 'dayjs'

// // 🧩 Third-party Imports
// import { useForm, Controller } from 'react-hook-form'

// // 🧠 Server Action
// import { createAttendanceRecord, fetchListOfUser,fetchListOfSalaryComponent } from '../../../../app/server/actions.js'

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
//       employees: '',
//       date: '',
//       clockIn: '',
//       clockOut: '',
//       breakHours: '',
//       status: '',
//       isHoliday: false,
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
//         console.error('Error fetching employees:', err)
//       }
//     }
//     loadEmployees()
//   }, [])

//    useEffect(() => {
//       const loadSalaries = async () => {
//         try {
//           const response = await fetchListOfSalaryComponent()
//           if (response?.success && Array.isArray(response.data)) setSalaries(response.data)
//           else if (Array.isArray(response)) setSalaries(response)
//         } catch (err) {
//           console.error('Error fetching branches:', err)
//         } finally {
//           setLoadingSalaries(false)
//         }
//       }
//       loadSalaries()
//     }, [])

//   // ✅ Submit Form — Create Attendance Record
//   const onSubmit = async data => {
//     try {
//        const token = session?.user?.accessToken  // ✅ safest way
//   if (!token) {
//     console.warn('No access token found in session')
//     return
//   }
//       const payload = {
//         employees: data.employees,
//         date: data.date ? dayjs(data.date).format('YYYY-MM-DD') : '',
//         clockIn: data.clockIn ? dayjs(data.clockIn).format('HH:mm') : '',
//         clockOut: data.clockOut ? dayjs(data.clockOut).format('HH:mm') : '',
//         breakHours: data.breakHours,
//         status: data.status,
//         isHoliday: data.isHoliday,
//         notes: data.notes
//       }
    

//       console.log('🟢 Sending Attendance Record Payload123:', payload,token)

//       const response = await createAttendanceRecord(payload)

//       if (response?.success) {
//         setSnackbar({
//           open: true,
//           message: response.message || 'Attendance record created successfully',
//           severity: 'success'
//         })
//         if (typeof refreshDepartments === 'function') await refreshDepartments()
//         handleClose()
//         reset()
//       } else {
//         setSnackbar({
//           open: true,
//           message: response.message || 'Failed to create attendance record',
//           severity: 'error'
//         })
//       }
//     } catch (error) {
//       console.error('Error creating attendance record:', error)
//       setSnackbar({
//         open: true,
//         message: 'Error creating attendance record',
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
//             Add New Attendance Record
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
//             name='employees'
//             control={control}
//             rules={{ required: 'Employee is required' }}
//             render={({ field }) => (
//               <CustomTextField
//                 select
//                 fullWidth
//                 label='Employee'
//                 {...field}
//                 error={!!errors.employees}
//                 helperText={errors.employees?.message}
//               >
//                 {employees.length > 0 ? (
//                   employees.map(emp => (
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

//                 <Controller
//                        name='annualSalary'
//                        control={control}
//                        rules={{ required: 'Annual Salary is required' }}
//                        render={({ field }) => (
//                          <CustomTextField
//                            {...field}
//                            fullWidth
//                            label='Annual Salary'
//                            placeholder='120000'
//                            error={!!errors.basicSalary}
//                            helperText={errors.basicSalary?.message}
//                          />
//                        )}
//                      />
//                          <Controller
//                        name='grossSalary'
//                        control={control}
//                        rules={{ required: 'Gross Salary is required' }}
//                        render={({ field }) => (
//                          <CustomTextField
//                            {...field}
//                            fullWidth
//                            label='Gross Salary'
//                            placeholder='1500'
//                            error={!!errors.basicSalary}
//                            helperText={errors.basicSalary?.message}
//                          />
//                        )}
//                      />

//              <Controller
//                        name='basicSalary'
//                        control={control}
//                        rules={{ required: 'Basic Salary is required' }}
//                        render={({ field }) => (
//                          <CustomTextField
//                            {...field}
//                            fullWidth
//                            label='Basic Salary'
//                            placeholder='1500'
//                            error={!!errors.basicSalary}
//                            helperText={errors.basicSalary?.message}
//                          />
//                        )}
//                      />

//                             <Controller
//                        name='fixedSalary'
//                        control={control}
//                        rules={{ required: 'Fixed Salary is required' }}
//                        render={({ field }) => (
//                          <CustomTextField
//                            {...field}
//                            fullWidth
//                            label='Fixed Salary'
//                            placeholder='1500'
//                            error={!!errors.basicSalary}
//                            helperText={errors.basicSalary?.message}
//                          />
//                        )}
//                      />

//         {/* //Multiple salary component */}

//          <Controller
//                     name='salaryComponent'
//                     control={control}
//                     rules={{ required: 'Please select at least one salary component' }}
//                     render={({ field }) => (
//                       <CustomTextField
//                         select
//                         fullWidth
//                         label='Salary Component'
//                         SelectProps={{
//                           multiple: true,
//                           value: field.value || [],
//                           onChange: e => field.onChange(e.target.value),
//                           renderValue: selected => (
//                             <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
//                               {selected.map(value => {
//                                 const salary = salaries.find(b => b._id === value)
//                                 return <Chip key={value} label={salary?.componentName || 'Unnamed Branch'} size='small' />
//                               })}
//                             </Box>
//                           )
//                         }}
//                         error={!!errors.salaries}
//                         helperText={errors.salaries?.message}
//                       >
//                         {loadingSalaries ? (
//                           <MenuItem disabled>Loading salaries...</MenuItem>
//                         ) : salaries.length > 0 ? (
//                           salaries.map(salary => (
//                             <MenuItem key={salary._id} value={salary._id}>
//                               {salary.componentName || 'Unnamed Salary'}
//                             </MenuItem>
//                           ))
//                         ) : (
//                           <MenuItem disabled>No salaries found</MenuItem>
//                         )}
//                       </CustomTextField>
//                     )}
//                   />


//           {/* 📊 Status */}
//           <Controller
//             name='status'
//             control={control}
//             rules={{ required: 'Status is required' }}
//             render={({ field }) => (
//               <CustomTextField select fullWidth label='Status' {...field}>
//                 <MenuItem value='Active'>Active</MenuItem>
//                 <MenuItem value='Inactive'>Inactive</MenuItem>
             
//               </CustomTextField>
//             )}
//           />

//             <Controller
//                        name='notes'
//                        control={control}
//                        rules={{ required: 'Notes is required' }}
//                        render={({ field }) => (
//                          <CustomTextField
//                            {...field}
//                            fullWidth
//                            label='Notes'
//                            placeholder=''
//                            error={!!errors.notes}
//                            helperText={errors.notes?.message}
//                          />
//                        )}
//                      />

      

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
  Alert as MuiAlert,
  Chip,
  Box
} from '@mui/material'

// 🕒 Date/Time Imports
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { TimePicker } from '@mui/x-date-pickers/TimePicker'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'

// 🧩 Third-party Imports
import { useForm, Controller } from 'react-hook-form'

// 🧠 Server Actions
import { createAttendanceRecord, fetchListOfUser ,fetchListOfSalaryComponent} from '../../../../app/server/actions.js'

// 🧱 Component Imports
import CustomTextField from '@core/components/mui/TextField'



const AddAttendanceDrawer = props => {
  const { open, handleClose, refreshDepartments } = props

  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' })
  const [employees, setEmployees] = useState([])
  const [salaries, setSalaries] = useState([])
  const [loadingSalaries, setLoadingSalaries] = useState(true)
  const { data: session } = useSession()

  // 🔧 react-hook-form setup
  const {
    control,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      employees: '',
      annualSalary: '',
      grossSalary: '',
      basicSalary: '',
      fixedSalary: '',
      salaryComponent: [],
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
        console.error('Error fetching employees:', err)
      }
    }
    loadEmployees()
  }, [])

  // 🧠 Fetch Salary Components
  // useEffect(() => {
  //   const loadSalaries = async () => {
  //     try {
  //       const response = await fetchListOfSalaryComponent()
  //       setSalaries(response)
  //     } catch (err) {
  //       console.error('Error fetching salary components:', err)
  //     } finally {
  //       setLoadingSalaries(false)
  //     }
  //   }
  //   loadSalaries()
  // }, [])

  useEffect(() => {
  const loadSalaries = async () => {
    try {
      const list = await fetchListOfSalaryComponent()
      console.log('✅ Salary Components Loaded:', list)
      setSalaries(list)
    } catch (err) {
      console.error('❌ Error loading salary components:', err)
    } finally {
      setLoadingSalaries(false)
    }
  }
  loadSalaries()
}, [])


  // ✅ Submit Form
  const onSubmit = async data => {
    try {
      const token = session?.user?.accessToken
      if (!token) {
        console.warn('No access token found in session')
        return
      }

      const payload = {
        employees: data.employees,
        annualSalary: data.annualSalary,
        grossSalary: data.grossSalary,
        basicSalary: data.basicSalary,
        fixedSalary: data.fixedSalary,
        salaryComponent: data.salaryComponent,
        status: data.status,
        notes: data.notes
      }

      console.log('🟢 Sending Attendance Record Payload:', payload)

      const response = await createAttendanceRecord(payload)

      if (response?.success) {
        setSnackbar({
          open: true,
          message: response.message || 'Record created successfully',
          severity: 'success'
        })
        if (typeof refreshDepartments === 'function') await refreshDepartments()
        handleClose()
        reset()
      } else {
        setSnackbar({
          open: true,
          message: response.message || 'Failed to create record',
          severity: 'error'
        })
      }
    } catch (error) {
      console.error('Error creating attendance record:', error)
      setSnackbar({
        open: true,
        message: 'Error creating attendance record',
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
            Add New Salary
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
            name='employees'
            control={control}
            rules={{ required: 'Employee is required' }}
            render={({ field }) => (
              <CustomTextField
                select
                fullWidth
                label='Employee'
                {...field}
                error={!!errors.employees}
                helperText={errors.employees?.message}
              >
                {employees.length > 0 ? (
                  employees.map(emp => (
                    <MenuItem key={emp._id} value={emp._id}>
                      {emp.username}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem disabled>No Employees Found</MenuItem>
                )}
              </CustomTextField>
            )}
          />

          {/* 💰 Salary Fields */}
          {['annualSalary', 'grossSalary', 'basicSalary', 'fixedSalary'].map(fieldName => (
            <Controller
              key={fieldName}
              name={fieldName}
              control={control}
              rules={{ required: `${fieldName.replace(/([A-Z])/g, ' $1')} is required` }}
              render={({ field }) => (
                <CustomTextField
                  {...field}
                  fullWidth
                  label={fieldName.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                  placeholder='Enter amount'
                  error={!!errors[fieldName]}
                  helperText={errors[fieldName]?.message}
                />
              )}
            />
          ))}

          {/* 🧾 Multiple Salary Components */}
          <Controller
            name='salaryComponent'
            control={control}
            rules={{ required: 'Please select at least one salary component' }}
            render={({ field }) => (
              <CustomTextField
                select
                fullWidth
                label='Salary Components'
                SelectProps={{
                  multiple: true,
                  value: field.value || [],
                  onChange: e => field.onChange(e.target.value),
                  renderValue: selected => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map(value => {
                        const salary = salaries.find(b => b._id === value)
                        return <Chip key={value} label={salary?.componentName || 'Unnamed'} size='small' />
                      })}
                    </Box>
                  )
                }}
                error={!!errors.salaryComponent}
                helperText={errors.salaryComponent?.message}
              >
                {loadingSalaries ? (
                  <MenuItem disabled>Loading salary components...</MenuItem>
                ) : salaries.length > 0 ? (
                  salaries.map(salary => (
                    <MenuItem key={salary._id} value={salary._id}>
                      {salary.componentName || 'Unnamed Component'}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem disabled>No Salary Components Found</MenuItem>
                )}
              </CustomTextField>
            )}
          />

          {/* 📊 Status */}
          <Controller
            name='status'
            control={control}
            rules={{ required: 'Status is required' }}
            render={({ field }) => (
              <CustomTextField select fullWidth label='Status' {...field}>
                <MenuItem value='Active'>Active</MenuItem>
                <MenuItem value='Inactive'>Inactive</MenuItem>
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

export default AddAttendanceDrawer




