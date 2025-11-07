

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
import { createEmployeeGoal, fetchListOfUser, fetchListOfGoalType } from '../../../../../app/server/actions.js'

// 🧱 Component Imports
import CustomTextField from '@core/components/mui/TextField'

const AddDepartmentDrawer = props => {
  const { open, handleClose, refreshDepartments } = props

  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' })
  const [employees, setEmployees] = useState([]) // users
  const [goalTypes, setGoalTypes] = useState([]) // goal types

  // 🔧 react-hook-form setup
  const {
    control,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      employee: '',
      goalType: '',   // ✅ fixed naming
      goalTitle: '',
      description: '',
      startDate: '',
      endDate: '',
      target: '',
      progress: '',
      status: 'Not Started'
    }
  })

  // 🧠 Fetch Employees
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

  // 🧠 Fetch Goal Types
  useEffect(() => {
    const loadGoalTypes = async () => {
      try {
        const res = await fetchListOfGoalType()
        console.log('🎯 Goal Types Response:', res)
        if (res?.success && Array.isArray(res.data)) setGoalTypes(res.data)
        else if (Array.isArray(res)) setGoalTypes(res)
        else console.warn('⚠️ Invalid goal type format:', res)
      } catch (err) {
        console.error('Error fetching goal types:', err)
      }
    }
    loadGoalTypes()
  }, [])

  // ✅ Submit Form
  const onSubmit = async data => {
    try {
      // const formData = new FormData()
      // formData.append('employee', data.employee)
      // formData.append('goalType', data.goalType)
      // formData.append('goalTitle', data.goalTitle)
      // formData.append('description', data.description)
      // formData.append('startDate', data.startDate)
      // formData.append('endDate', data.endDate)
      // formData.append('target', data.target)
      // formData.append('progress', data.progress)
      // formData.append('status', data.status)





      // const response = await createEmployeeGoal(formData)
      const payload = {
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

console.log("🚀 Sending JSON Payload:", payload)
const response = await createEmployeeGoal(payload)


      if (response?.success) {
        setSnackbar({
          open: true,
          message: response.message || 'Goal created successfully!',
          severity: 'success'
        })
        if (typeof refreshDepartments === 'function') await refreshDepartments()
        handleClose()
        reset()
      } else {
        setSnackbar({
          open: true,
          message: response.message || 'Failed to create goal',
          severity: 'error'
        })
      }
    } catch (error) {
      console.error('Error creating goal:', error)
      setSnackbar({ open: true, message: 'Error creating goal', severity: 'error' })
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
            Add New Employee Goal
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
              <CustomTextField select fullWidth label='Employee' {...field} error={!!errors.employee} helperText={errors.employee?.message}>
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

          {/* 🎯 Goal Type */}
          <Controller
            name='goalType'
            control={control}
            rules={{ required: 'Goal Type is required' }}
            render={({ field }) => (
              <CustomTextField select fullWidth label='Goal Type' {...field} error={!!errors.goalType} helperText={errors.goalType?.message}>
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

          <Controller
            name='goalTitle'
            control={control}
            rules={{ required: 'Goal Title is required' }}
            render={({ field }) => (
              <CustomTextField {...field} fullWidth label='Goal Title' error={!!errors.goalTitle} helperText={errors.goalTitle?.message} />
            )}
          />

          <Controller
            name='description'
            control={control}
            rules={{ required: 'Description is required' }}
            render={({ field }) => (
              <CustomTextField {...field} fullWidth label='Description' error={!!errors.description} helperText={errors.description?.message} />
            )}
          />

          {/* 📅 Start & End Date */}
          {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Controller
              name='startDate'
              control={control}
              rules={{ required: 'Start date is required' }}
              render={({ field }) => (
                <DatePicker
                  label='Start Date'
                  value={field.value ? dayjs(field.value) : null}
                  onChange={val => field.onChange(val ? val.toISOString() : null)}
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
              rules={{ required: 'End date is required' }}
              render={({ field }) => (
                <DatePicker
                  label='End Date'
                  value={field.value ? dayjs(field.value) : null}
                  onChange={val => field.onChange(val ? val.toISOString() : null)}
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
          </LocalizationProvider> */}

          <LocalizationProvider dateAdapter={AdapterDayjs}>
  <Controller
    name='startDate'
    control={control}
    rules={{ required: 'Start date is required' }}
    render={({ field }) => (
      <DatePicker
        label='Start Date'
        value={field.value ? dayjs(field.value) : null}
        onChange={newValue => field.onChange(newValue ? newValue.toISOString() : null)}
        enableAccessibleFieldDOMStructure={false} // ✅ FIX ADDED
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
    rules={{ required: 'End date is required' }}
    render={({ field }) => (
      <DatePicker
        label='End Date'
        value={field.value ? dayjs(field.value) : null}
        onChange={newValue => field.onChange(newValue ? newValue.toISOString() : null)}
        enableAccessibleFieldDOMStructure={false} // ✅ FIX ADDED
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


          <Controller
            name='target'
            control={control}
            rules={{ required: 'Target value is required' }}
            render={({ field }) => (
              <CustomTextField {...field} fullWidth label='Target' error={!!errors.target} helperText={errors.target?.message} />
            )}
          />

          <Controller
            name='progress'
            control={control}
            rules={{ required: 'Progress is required' }}
            render={({ field }) => (
              <CustomTextField {...field} fullWidth label='Progress' error={!!errors.progress} helperText={errors.progress?.message} />
            )}
          />

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



