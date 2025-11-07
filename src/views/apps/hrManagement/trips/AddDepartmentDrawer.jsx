


'use client'

import { useState, useEffect } from 'react'

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

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'

// 🧩 Third-party Imports
import { useForm, Controller } from 'react-hook-form'
import FileUploadController from '../../../../components/fileUploadController'

// 🧠 Server Action
import { createTrip, fetchListOfUser } from '../../../../app/server/actions.js'

// 🧱 Component Imports
import CustomTextField from '@core/components/mui/TextField'

const AddDepartmentDrawer = props => {
  const { open, handleClose, refreshDepartments } = props

  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' })
  const [branches, setBranches] = useState([])

  // 🔧 react-hook-form setup
  const {
    control,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      employee: '',
      purpose: '',
      destination: '',
      startDate: '',
      endDate: '',
      description: '',
      expectedOutcomes: '',
      documents: null,
      advancedAmount: ''
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

  // ✅ Submit Form (send all fields in FormData exactly as backend expects)
  const onSubmit = async data => {
    try {
      const formData = new FormData()

      formData.append('employee', data.employee)
      formData.append('purpose', data.purpose)
      formData.append('destination', data.destination)
      formData.append('startDate', data.startDate)
      formData.append('endDate', data.endDate)
      formData.append('description', data.description)
      formData.append('expectedOutcomes', data.expectedOutcomes)
      formData.append('advancedAmount', data.advancedAmount)

      if (data.documents) {
        formData.append('documents', data.documents)
      }

      const response = await createTrip(formData)

      if (response?.success) {
        setSnackbar({
          open: true,
          message: response.message || 'Trip created successfully',
          severity: 'success'
        })
        if (typeof refreshDepartments === 'function') await refreshDepartments()
        handleClose()
        reset()
      } else {
        setSnackbar({
          open: true,
          message: response.message || 'Failed to create trip',
          severity: 'error'
        })
      }
    } catch (error) {
      console.error('Error creating trip:', error)
      setSnackbar({
        open: true,
        message: 'Error creating trip',
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
            Add New Trip
          </Typography>
          <IconButton size='small' onClick={handleReset}>
            <i className='tabler-x text-2xl text-textPrimary' />
          </IconButton>
        </div>
        <Divider />

        {/* 🧾 Form */}
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

          {/* Purpose */}
          <Controller
            name='purpose'
            control={control}
            rules={{ required: 'Purpose is required' }}
            render={({ field }) => (
              <CustomTextField
                {...field}
                fullWidth
                label='Purpose'
                error={!!errors.purpose}
                helperText={errors.purpose?.message}
              />
            )}
          />

          {/* Destination */}
          <Controller
            name='destination'
            control={control}
            rules={{ required: 'Destination is required' }}
            render={({ field }) => (
              <CustomTextField
                {...field}
                fullWidth
                label='Destination'
                error={!!errors.destination}
                helperText={errors.destination?.message}
              />
            )}
          />

          {/* Start Date */}
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Controller
              name='startDate'
              control={control}
              rules={{ required: 'Start Date is required' }}
              render={({ field }) => (
                <DatePicker
                  label='Start Date'
                  value={field.value ? dayjs(field.value) : null}
                  onChange={newValue =>
                    field.onChange(newValue ? newValue.toISOString() : null)
                  }
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

          {/* End Date */}
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Controller
              name='endDate'
              control={control}
              rules={{ required: 'End Date is required' }}
              render={({ field }) => (
                <DatePicker
                  label='End Date'
                  value={field.value ? dayjs(field.value) : null}
                  onChange={newValue =>
                    field.onChange(newValue ? newValue.toISOString() : null)
                  }
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
                error={!!errors.description}
                helperText={errors.description?.message}
              />
            )}
          />

          {/* Expected Outcomes */}
          <Controller
            name='expectedOutcomes'
            control={control}
            rules={{ required: 'Expected Outcomes is required' }}
            render={({ field }) => (
              <CustomTextField
                {...field}
                fullWidth
                multiline
                minRows={2}
                label='Expected Outcomes'
                error={!!errors.expectedOutcomes}
                helperText={errors.expectedOutcomes?.message}
              />
            )}
          />

          {/* Document Upload */}
          <FileUploadController
            control={control}
            errors={errors}
            name='documents'
            label='Documents'
            required
            accept='image/*,application/pdf'
          />

          {/* Advance Amount */}
          <Controller
            name='advancedAmount'
            control={control}
            render={({ field }) => (
              <CustomTextField {...field} fullWidth label='Advance Amount' />
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
            backgroundColor:
              snackbar.severity === 'success' ? '#2B3380' : '#D32F2F',
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




