


// 'use client'

// import { useEffect, useState } from 'react'

// // MUI Imports
// import Drawer from '@mui/material/Drawer'
// import Typography from '@mui/material/Typography'
// import Divider from '@mui/material/Divider'
// import Button from '@mui/material/Button'
// import IconButton from '@mui/material/IconButton'
// import TextField from '@mui/material/TextField'
// import MenuItem from '@mui/material/MenuItem'
// import Box from '@mui/material/Box'
// import Snackbar from '@mui/material/Snackbar'
// import Alert from '@mui/material/Alert'
// import { description } from 'valibot'
// import { fetchListOfBranch } from '../../../../../app/server/actions.js'

// const EditDepartment = ({ open, handleClose, selectedDepartment, onSave }) => {
//   const [formData, setFormData] = useState({
//     _id: '',
//     name: '',
//     branch: '',
//     description: '',
//     status: 'Active'
//   })
// console.log("POOJA456",formData)
//     // ✅ Branch dropdown data
//   const [branches, setBranches] = useState([])
//   const [loadingBranches, setLoadingBranches] = useState(true)

//   // ✅ Snackbar state
//   const [snackbar, setSnackbar] = useState({
//     open: false,
//     message: '',
//     severity: 'success'
//   })

//   const handleSnackbarClose = () => {
//     setSnackbar({ ...snackbar, open: false })
//   }

//     useEffect(() => {
//     const loadBranches = async () => {
//       try {
//         const res = await fetchListOfBranch()
//         if (res?.success && Array.isArray(res.data)) {
//           setBranches(res.data)
//         } else if (Array.isArray(res)) {
//           setBranches(res)
//         } else {
//           console.warn('Invalid branch data format:', res)
//         }
//       } catch (err) {
//         console.error('Error fetching branches:', err)
//       } finally {
//         setLoadingBranches(false)
//       }
//     }

//     loadBranches()
//   }, [])

//   // ✅ Auto-fill fields when drawer opens
//   // useEffect(() => {
//   //   if (selectedDepartment) {
//   //     setFormData({
//   //       _id: selectedDepartment._id || '',
//   //       name: selectedDepartment.name || '',
//   //       branch: selectedDepartment.branch || '',
//   //       description: selectedDepartment.description || '',
//   //       status: selectedDepartment.status || 'Active'
//   //     })
//   //   }
//   // }, [selectedDepartment])

// /

// useEffect(() => {
//   if (selectedDepartment && branches.length > 0) {
//     const matchedBranch = branches.find(
//       b => b.branchName.trim() === selectedDepartment.branch.trim()
//     )

//     setFormData({
//       _id: selectedDepartment._id || '',
//       name: selectedDepartment.name || '',
//       branch: matchedBranch?._id || '',
//       description: selectedDepartment.description || '',
//       status: selectedDepartment.status || 'Active'
//     })
//   }
// }, [selectedDepartment, branches.length])


//   // ✅ Handle save with snackbar feedback
//   const handleSave = async () => {
//     try {
//       const res = await onSave(formData) // backend call in parent component
//       setSnackbar({
//         open: true,
//         message: res?.message || 'Department updated successfully!',
//         severity: res?.success ? 'success' : 'error'
//       })
//       if (res?.success) handleClose()
//     } catch (error) {
//       setSnackbar({
//         open: true,
//         message: 'Something went wrong!',
//         severity: 'error'
//       })
//     }
//   }

//   return (
//     <>
//       <Drawer
//         open={open}
//         anchor='right'
//         variant='temporary'
//         onClose={handleClose}
//         ModalProps={{ keepMounted: true }}
//         sx={{
//           '& .MuiDrawer-paper': { width: { xs: 320, sm: 420 } }
//         }}
//       >
//         {/* ✅ Header same as AddBranchDrawer */}
//         <div className='flex items-center justify-between plb-5 pli-6'>
//           <Typography variant='h5' sx={{ fontWeight: 600 }}>
//             Edit Department
//           </Typography>
//           <IconButton size='small' onClick={handleClose}>
//             <i className='tabler-x text-2xl text-textPrimary' />
//           </IconButton>
//         </div>

//         <Divider />

//         {/* ✅ Form Section */}
//         <Box sx={{ p: 6 }}>
//           <form className='flex flex-col gap-5'>
//             <TextField
//               label='Department Name'
//               fullWidth
//               value={formData.name}
//               onChange={e => setFormData({ ...formData, name: e.target.value })}
//             />

//             {/* <TextField
//               label='Branch'
//               fullWidth
//               value={formData.Plot}
//               onChange={e => setFormData({ ...formData, Plot: e.target.value })}
//             /> */}

//              <TextField
//               select
//               label='Branch'
//               fullWidth
//               value={formData.branch||""}
//               onChange={e => setFormData({ ...formData, branch: e.target.value })}
//             >
//               {loadingBranches ? (
//                 <MenuItem disabled>Loading branches...</MenuItem>
//               ) : branches.length > 0 ? (
//                 branches.map(branch => (
//                   <MenuItem key={branch._id} value={branch._id}>
//                     {branch.branchName}
//                   </MenuItem>
//                 ))
//               ) : (
//                 <MenuItem disabled>No branches found</MenuItem>
//               )}
//             </TextField>

//             <TextField
//               label='Description'
//               fullWidth
//               value={formData.description}
//               onChange={e => setFormData({ ...formData, description: e.target.value })}
//             />


//             <TextField
//               select
//               label='Status'
//               fullWidth
//               value={formData.status}
//               onChange={e => setFormData({ ...formData, status: e.target.value })}
//             >
//               <MenuItem value='Active'>Active</MenuItem>
//               <MenuItem value='Inactive'>Inactive</MenuItem>
//             </TextField>

//             {/* ✅ Action Buttons same style as Add Drawer */}
//             <div className='flex items-center gap-4 mt-4'>
//               <Button variant='contained' onClick={handleSave}>
//                 Save Changes
//               </Button>
//               <Button variant='tonal' color='error' onClick={handleClose}>
//                 Cancel
//               </Button>
//             </div>
//           </form>
//         </Box>
//       </Drawer>

//       {/* ✅ Snackbar for backend message */}
//       <Snackbar
//         open={snackbar.open}
//         autoHideDuration={3000}
//         onClose={handleSnackbarClose}
//         anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
//       >
//         <Alert
//           onClose={handleSnackbarClose}
//           severity={snackbar.severity}
//           variant='filled'
//           sx={{
//             backgroundColor: snackbar.severity === 'success' ? '#2B3380' : '#d32f2f',
//             color: 'white',
//             fontWeight: 500
//           }}
//         >
//           {snackbar.message}
//         </Alert>
//       </Snackbar>
//     </>
//   )
// }

// export default EditDepartment

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

// 🗓 Date Picker
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'

// 🧩 Form
import { useForm, Controller } from 'react-hook-form'

// 🧠 Server Action
import { fetchListOfUser, fetchListOfGoalType } from '../../../../../app/server/actions.js'

// 🧱 Component Imports
import CustomTextField from '@core/components/mui/TextField'

const EditDepartment = ({ open, handleClose, selectedGoal, onSave }) => {
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' })
  const [employees, setEmployees] = useState([])
  const [goalTypes, setGoalTypes] = useState([])

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      employee: '',
      goalType: '',
      goalTitle: '',
      description: '',
      startDate: '',
      endDate: '',
      target: '',
      progress: '',
      status: ''
    }
  })

  // 🧠 Fetch employees & goal types
  useEffect(() => {
    const loadData = async () => {
      try {
        const [usersRes, goalRes] = await Promise.all([
          fetchListOfUser(),
          fetchListOfGoalType()
        ])
        if (usersRes?.data) setEmployees(usersRes.data)
        if (goalRes?.data) setGoalTypes(goalRes.data)
      } catch (err) {
        console.error('Error loading dropdown data:', err)
      }
    }
    loadData()
  }, [])

  // 🧩 Prefill form when selectedGoal changes
  useEffect(() => {
    if (selectedGoal) {
      reset({
        employee: selectedGoal.employee || '',
        goalType: selectedGoal.goalType || '',
        goalTitle: selectedGoal.goalTitle || '',
        description: selectedGoal.description || '',
        startDate: selectedGoal.startDate ? dayjs(selectedGoal.startDate).toISOString() : '',
        endDate: selectedGoal.endDate ? dayjs(selectedGoal.endDate).toISOString() : '',
        target: selectedGoal.target || '',
        progress: selectedGoal.progress || '',
        status: selectedGoal.status || 'Not Started'
      })
    }
  }, [selectedGoal, reset])

  // ✅ Submit handler
  const onSubmit = async data => {
    try {
      const payload = {
        _id: selectedGoal?._id,
        employee: data.employee,
        goalType: data.goalType,
        goalTitle: data.goalTitle,
        description: data.description,
        startDate: data.startDate,
        endDate: data.endDate,
        target: data.target,
        progress: data.progress,
        status: data.status
      }

      const res = await onSave(payload)

      if (res?.success) {
        setSnackbar({ open: true, message: res.message || 'Goal updated successfully!', severity: 'success' })
        handleClose()
      } else {
        setSnackbar({ open: true, message: res.message || 'Failed to update goal', severity: 'error' })
      }
    } catch (error) {
      console.error('Error updating goal:', error)
      setSnackbar({ open: true, message: 'Something went wrong', severity: 'error' })
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
            Edit Employee Goal
          </Typography>
          <IconButton size='small' onClick={handleReset}>
            <i className='tabler-x text-2xl text-textPrimary' />
          </IconButton>
        </div>
        <Divider />

        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-6 p-6'>
          {/* 🧑 Employee (disabled) */}
          <Controller
            name='employee'
            control={control}
            render={({ field }) => (
              <CustomTextField
                select
                fullWidth
                label='Employee'
                {...field}
                disabled
              >
                {employees.length > 0 ? (
                  employees.map(emp => (
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

          {/* 🎯 Goal Type (disabled) */}
          <Controller
            name='goalType'
            control={control}
            render={({ field }) => (
              <CustomTextField
                select
                fullWidth
                label='Goal Type'
                {...field}
                disabled
              >
                {goalTypes.length > 0 ? (
                  goalTypes.map(type => (
                    <MenuItem key={type._id} value={type._id}>
                      {type.goalTypeName || type.name}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem disabled>No Goal Types found</MenuItem>
                )}
              </CustomTextField>
            )}
          />

          {/* 🏷️ Goal Title */}
          <Controller
            name='goalTitle'
            control={control}
            rules={{ required: 'Goal Title is required' }}
            render={({ field }) => (
              <CustomTextField {...field} fullWidth label='Goal Title' error={!!errors.goalTitle} helperText={errors.goalTitle?.message} />
            )}
          />

          {/* 📝 Description */}
          <Controller
            name='description'
            control={control}
            rules={{ required: 'Description is required' }}
            render={({ field }) => (
              <CustomTextField {...field} fullWidth label='Description' error={!!errors.description} helperText={errors.description?.message} />
            )}
          />

        
          <LocalizationProvider dateAdapter={AdapterDayjs}>
  <Controller
    name='startDate'
    control={control}
    render={({ field }) => (
      <DatePicker
        label='Start Date'
        value={field.value ? dayjs(field.value) : null}
        onChange={newValue => field.onChange(newValue ? newValue.toISOString() : null)}
        enableAccessibleFieldDOMStructure={false}  // ✅ Important fix
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

<LocalizationProvider dateAdapter={AdapterDayjs}>
  <Controller
    name='endDate'
    control={control}
    render={({ field }) => (
      <DatePicker
        label='End Date'
        value={field.value ? dayjs(field.value) : null}
        onChange={newValue => field.onChange(newValue ? newValue.toISOString() : null)}
        enableAccessibleFieldDOMStructure={false}  // ✅ Important fix
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


          {/* 🎯 Target */}
          <Controller
            name='target'
            control={control}
            render={({ field }) => (
              <CustomTextField {...field} fullWidth label='Target' />
            )}
          />

          {/* 📊 Progress */}
          <Controller
            name='progress'
            control={control}
            render={({ field }) => (
              <CustomTextField {...field} fullWidth label='Progress (%)' />
            )}
          />

          {/* 🚦 Status */}
          <Controller
            name='status'
            control={control}
            render={({ field }) => (
              <CustomTextField select fullWidth label='Select Status' {...field}>
                <MenuItem value='Not Started'>Not Started</MenuItem>
                <MenuItem value='In Progress'>In Progress</MenuItem>
                <MenuItem value='Completed'>Completed</MenuItem>
              </CustomTextField>
            )}
          />

          {/* ✅ Buttons */}
          <div className='flex items-center gap-4'>
            <Button variant='contained' type='submit'>
              Save Changes
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

export default EditDepartment



