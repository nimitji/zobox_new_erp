

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
import { createResignation, fetchListOfUser } from '../../../../app/server/actions.js'

// 🧱 Component Imports
import CustomTextField from '@core/components/mui/TextField'

const AddResignationDrawer = props => {
  const { open, handleClose, refreshDepartments } = props

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  })

  const [employees, setEmployees] = useState([])

  // 🧩 React Hook Form setup
  const {
    control,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      employee: '',
      resignationDate: '',
      lastWorkingDay: '',
      noticePeriod: '',
      reason: '',
      description: '',
      status: 'Pending',
      document: null
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

  // ✅ Submit Form (with file upload)
  const onSubmit = async data => {
    try {
      const formData = new FormData()
      formData.append('employee', data.employee)
      formData.append('resignationDate', data.resignationDate)
      formData.append('lastWorkingDay', data.lastWorkingDay)
      formData.append('noticePeriod', data.noticePeriod)
      formData.append('reason', data.reason)
      formData.append('description', data.description)
      formData.append('status', data.status)

      if (data.document) {
        formData.append('document', data.document)
      }

      const response = await createResignation(formData)

      if (response?.success) {
        setSnackbar({
          open: true,
          message: response.message || 'Resignation created successfully',
          severity: 'success'
        })
        if (typeof refreshDepartments === 'function') await refreshDepartments()
        handleClose()
        reset({
          employee: '',
          resignationDate: '',
          lastWorkingDay: '',
          noticePeriod: '',
          reason: '',
          description: '',
          status: 'Pending',
          document: null
        })
      } else {
        setSnackbar({
          open: true,
          message: response.message || 'Failed to create resignation',
          severity: 'error'
        })
      }
    } catch (error) {
      console.error('Error creating resignation:', error)
      setSnackbar({
        open: true,
        message: 'Error creating resignation',
        severity: 'error'
      })
    }
  }

  const handleReset = () => {
    handleClose()
    reset({
      employee: '',
      resignationDate: '',
      lastWorkingDay: '',
      noticePeriod: '',
      reason: '',
      description: '',
      status: 'Pending',
      document: null
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
        {/* Header */}
        <div className='flex items-center justify-between p-5'>
          <Typography variant='h5' fontWeight='bold'>
            Add New Resignation
          </Typography>
          <IconButton size='small' onClick={handleReset}>
            <i className='tabler-x text-2xl text-textPrimary' />
          </IconButton>
        </div>
        <Divider />

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-6 p-6'>
          {/* 👤 Employee */}
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
                value={field.value || ''} // ✅ keeps controlled
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
                  <MenuItem disabled>No employees found</MenuItem>
                )}
              </CustomTextField>
            )}
          />

          {/* 📅 Resignation Date */}
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Controller
              name='resignationDate'
              control={control}
              rules={{ required: 'Resignation date is required' }}
              render={({ field }) => (
                <DatePicker
                  label='Resignation Date'
                  value={field.value ? dayjs(field.value) : null}
                  onChange={newValue =>
                    field.onChange(newValue ? newValue.toISOString() : null)
                  }
                  enableAccessibleFieldDOMStructure={false}
                  slots={{ textField: CustomTextField }}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      error: !!errors.resignationDate,
                      helperText: errors.resignationDate?.message
                    }
                  }}
                />
              )}
            />
          </LocalizationProvider>

          {/* 📅 Last Working Date */}
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Controller
              name='lastWorkingDay'
              control={control}
              rules={{ required: 'Last working date is required' }}
              render={({ field }) => (
                <DatePicker
                  label='Last Working Day'
                  value={field.value ? dayjs(field.value) : null}
                  onChange={newValue =>
                    field.onChange(newValue ? newValue.toISOString() : null)
                  }
                  enableAccessibleFieldDOMStructure={false}
                  slots={{ textField: CustomTextField }}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      error: !!errors.lastWorkingDay,
                      helperText: errors.lastWorkingDay?.message
                    }
                  }}
                />
              )}
            />
          </LocalizationProvider>

          {/* 📆 Notice Period */}
          <Controller
            name='noticePeriod'
            control={control}
            rules={{ required: 'Notice Period is required' }}
            render={({ field }) => (
              <CustomTextField
                {...field}
                fullWidth
                label='Notice Period'
                error={!!errors.noticePeriod}
                helperText={errors.noticePeriod?.message}
              />
            )}
          />

          {/* 📝 Reason */}
          <Controller
            name='reason'
            control={control}
            rules={{ required: 'Reason is required' }}
            render={({ field }) => (
              <CustomTextField
                {...field}
                fullWidth
                label='Reason'
                error={!!errors.reason}
                helperText={errors.reason?.message}
              />
            )}
          />

          {/* 🗒️ Description */}
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

          {/* 📎 Document Upload */}
          <FileUploadController
            control={control}
            errors={errors}
            name='document'
            label='Upload Document'
            accept='image/*'
          />

          {/* 🔖 Status */}
          <Controller
            name='status'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <CustomTextField
                select
                fullWidth
                label='Status'
                {...field}
                value={field.value || 'Pending'}
              >
                <MenuItem value='Pending'>Pending</MenuItem>
                <MenuItem value='Approved'>Approved</MenuItem>
                <MenuItem value='Rejected'>Rejected</MenuItem>
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

export default AddResignationDrawer



