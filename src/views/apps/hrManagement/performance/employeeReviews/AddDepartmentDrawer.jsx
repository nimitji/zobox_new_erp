

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
import {
  createEmployeeReviewCycle,
  fetchListOfUser,
  fetchListOfEmployeeReviewCycle
} from '../../../../../app/server/actions.js'

// 🧱 Component Imports
import CustomTextField from '@core/components/mui/TextField'

const AddDepartmentDrawer = props => {
  const { open, handleClose, refreshDepartments } = props

  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' })
  const [employees, setEmployees] = useState([])
  const [goalTypes, setGoalTypes] = useState([])

  // 🔧 react-hook-form setup
  const {
    control,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      employee: '',
      reviewer: '',
      reviewCycle: '',
      reviewDate: '',
      status: 'Scheduled'
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

  // 🧠 Fetch Review Cycles
  useEffect(() => {
    const loadGoalTypes = async () => {
      try {
        const res = await fetchListOfEmployeeReviewCycle()
        if (res?.success && Array.isArray(res.data)) setGoalTypes(res.data)
        else if (Array.isArray(res)) setGoalTypes(res)
      } catch (err) {
        console.error('Error fetching review cycles:', err)
      }
    }
    loadGoalTypes()
  }, [])

  // ✅ Submit Form
  const onSubmit = async data => {
    try {
      const payload = {
        employee: data.employee,
        reviewer: data.reviewer,
        reviewCycle: data.reviewCycle,
        reviewDate: data.reviewDate,
        status: data.status
      }

      console.log('🚀 Sending JSON Payload:', payload)
      const response = await createEmployeeReviewCycle(payload)

      if (response?.success) {
        setSnackbar({
          open: true,
          message: response.message || 'Review cycle created successfully!',
          severity: 'success'
        })
        if (typeof refreshDepartments === 'function') await refreshDepartments()
        handleClose()
        reset({
          employee: '',
          reviewer: '',
          reviewCycle: '',
          reviewDate: '',
          status: 'Scheduled'
        })
      } else {
        setSnackbar({
          open: true,
          message: response.message || 'Failed to create review cycle',
          severity: 'error'
        })
      }
    } catch (error) {
      console.error('Error creating review cycle:', error)
      setSnackbar({
        open: true,
        message: 'Error creating review cycle',
        severity: 'error'
      })
    }
  }

  const handleReset = () => {
    handleClose()
    reset({
      employee: '',
      reviewer: '',
      reviewCycle: '',
      reviewDate: '',
      status: 'Scheduled'
    })
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
            Add New Employee Review Cycle
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
                value={field.value || ''} // ✅ Fix uncontrolled input
                error={!!errors.employee}
                helperText={errors.employee?.message}
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

          {/* 🧑 Reviewer */}
          <Controller
            name='reviewer'
            control={control}
            rules={{ required: 'Reviewer is required' }}
            render={({ field }) => (
              <CustomTextField
                select
                fullWidth
                label='Reviewer'
                {...field}
                value={field.value || ''} // ✅ Fix uncontrolled input
                error={!!errors.reviewer}
                helperText={errors.reviewer?.message}
              >
                {employees.length > 0 ? (
                  employees.map(emp => (
                    <MenuItem key={emp._id} value={emp._id}>
                      {emp.username}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem disabled>No Reviewer found</MenuItem>
                )}
              </CustomTextField>
            )}
          />

          {/* 🔁 Review Cycle */}
          <Controller
            name='reviewCycle'
            control={control}
            rules={{ required: 'Review Cycle Type is required' }}
            render={({ field }) => (
              <CustomTextField
                select
                fullWidth
                label='Review Cycle'
                {...field}
                value={field.value || ''} // ✅ Fix uncontrolled input
                error={!!errors.reviewCycle}
                helperText={errors.reviewCycle?.message}
              >
                {goalTypes.length > 0 ? (
                  goalTypes.map(type => (
                    <MenuItem key={type._id} value={type._id}>
                      {type.reviewCycleName}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem disabled>No Review Cycles found</MenuItem>
                )}
              </CustomTextField>
            )}
          />

          {/* 📅 Review Date */}
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Controller
              name='reviewDate'
              control={control}
              rules={{ required: 'Review date is required' }}
              render={({ field }) => (
                <DatePicker
                  label='Review Date'
                  value={field.value ? dayjs(field.value) : null}
                  onChange={newValue =>
                    field.onChange(newValue ? newValue.toISOString() : '')
                  }
                  enableAccessibleFieldDOMStructure={false}
                  slots={{ textField: CustomTextField }}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      error: !!errors.reviewDate,
                      helperText: errors.reviewDate?.message
                    }
                  }}
                />
              )}
            />
          </LocalizationProvider>

          {/* 🔘 Status */}
          <Controller
            name='status'
            control={control}
            render={({ field }) => (
              <CustomTextField
                select
                fullWidth
                label='Status'
                {...field}
                value={field.value || 'Scheduled'} // ✅ Fix uncontrolled input
              >
                <MenuItem value='Scheduled'>Scheduled</MenuItem>
                <MenuItem value='In Progress'>In Progress</MenuItem>
              
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






