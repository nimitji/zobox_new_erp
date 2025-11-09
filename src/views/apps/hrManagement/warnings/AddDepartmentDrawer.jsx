

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
import { useForm, Controller, useWatch } from 'react-hook-form'
import FileUploadController from '../../../../components/fileUploadController'

// 🧠 Server Action
import { createWarning, fetchListOfUser } from '../../../../app/server/actions.js'

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
    formState: { errors },
    watch
  } = useForm({
    defaultValues: {
      employee: '',
      warningBy: '',
      warningType: '',
      subject: '',
      severity: '',
      warningDate: '',
      expiryDate: '',
      description: '',
      document: null,
      improvementPlan: '',
      improvementGoals: '',
      improvementStartDate: '',
      improvementEndDate: '',
      status:''
    }
  })

  // 👀 Watch improvementPlan
  const improvementPlanValue = watch('improvementPlan')

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

  // ✅ Submit Form
  const onSubmit = async data => {
    try {
      const formData = new FormData()
      Object.entries(data).forEach(([key, value]) => {
        if (value !== null && value !== undefined) formData.append(key, value)
      })

      const response = await createWarning(formData)

      if (response?.success) {
        setSnackbar({
          open: true,
          message: response.message || 'Warning created successfully',
          severity: 'success'
        })
        if (typeof refreshDepartments === 'function') await refreshDepartments()
        handleClose()
        reset()
      } else {
        setSnackbar({
          open: true,
          message: response.message || 'Failed to create warning',
          severity: 'error'
        })
      }
    } catch (error) {
      console.error('Error creating warning:', error)
      setSnackbar({
        open: true,
        message: 'Error creating warning',
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
            Add New Warning
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

          {/* ⚙️ Warning By */}
          <Controller
            name='warningBy'
            control={control}
            rules={{ required: 'Warning By is required' }}
            render={({ field }) => (
              <CustomTextField
                select
                fullWidth
                label='Warning By'
                {...field}
                error={!!errors.warningBy}
                helperText={errors.warningBy?.message}
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

          {/* ⚠️ Warning Type */}
          <Controller
            name='warningType'
            control={control}
            rules={{ required: 'Warning Type is required' }}
            render={({ field }) => (
              <CustomTextField select fullWidth label='Warning Type' {...field}>
                <MenuItem value='Attendance'>Attendance</MenuItem>
                <MenuItem value='Performance'>Performance</MenuItem>
                <MenuItem value='Conduct'>Conduct</MenuItem>
                <MenuItem value='Policy Violation'>Policy Violation</MenuItem>
                <MenuItem value='Safety'>Safety</MenuItem>
                <MenuItem value='Communication'>Communication</MenuItem>
                <MenuItem value='Misconduct'>Misconduct</MenuItem>
                <MenuItem value='Insubordination'>Insubordination</MenuItem>
                <MenuItem value='Confidentiality'>Confidentiality</MenuItem>
              </CustomTextField>
            )}
          />

          {/* 📝 Subject */}
          <Controller
            name='subject'
            control={control}
            rules={{ required: 'Subject is required' }}
            render={({ field }) => (
              <CustomTextField
                {...field}
                fullWidth
                label='Subject'
                error={!!errors.subject}
                helperText={errors.subject?.message}
              />
            )}
          />

          {/* 🚨 Severity */}
          <Controller
            name='severity'
            control={control}
            rules={{ required: 'Severity is required' }}
            render={({ field }) => (
              <CustomTextField select fullWidth label='Severity' {...field}>
                <MenuItem value='Verbal'>Verbal</MenuItem>
                <MenuItem value='Written'>Written</MenuItem>
                <MenuItem value='Final'>Final</MenuItem>
              </CustomTextField>
            )}
          />

          {/* 📅 Warning Date */}
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Controller
              name='warningDate'
              control={control}
              render={({ field }) => (
                <DatePicker
                  label='Warning Date'
                  value={field.value ? dayjs(field.value) : null}
                  onChange={newValue => field.onChange(newValue ? newValue.toISOString() : null)}
                  enableAccessibleFieldDOMStructure={false}
                  slots={{ textField: CustomTextField }}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      error: !!errors.warningDate,
                      helperText: errors.warningDate?.message
                    }
                  }}
                />
              )}
            />
          </LocalizationProvider>

          {/* 📅 Expiry Date */}
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Controller
              name='expiryDate'
              control={control}
              render={({ field }) => (
                <DatePicker
                  label='Expiry Date'
                  value={field.value ? dayjs(field.value) : null}
                  onChange={newValue => field.onChange(newValue ? newValue.toISOString() : null)}
                  enableAccessibleFieldDOMStructure={false}
                  slots={{ textField: CustomTextField }}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      error: !!errors.expiryDate,
                      helperText: errors.expiryDate?.message
                    }
                  }}
                />
              )}
            />
          </LocalizationProvider>

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
            label='Document'
            required
            accept='image/*'
          />

             <Controller
            name='status'
            control={control}
            rules={{ required: 'Status is required' }}
            render={({ field }) => (
              <CustomTextField select fullWidth label='Status' {...field}>
                <MenuItem value='Acknowledged'>Acknowledged</MenuItem>
                <MenuItem value='Draft'>Draft</MenuItem>
                <MenuItem value='Issued'>Issued</MenuItem>
                <MenuItem value='Expired'>Expired</MenuItem>
               
              </CustomTextField>
            )}
          />

          {/* 💡 Improvement Plan Dropdown */}
          <Controller
            name='improvementPlan'
            control={control}
            rules={{ required: 'Please select if Improvement Plan exists' }}
            render={({ field }) => (
              <CustomTextField
                {...field}
                select
                fullWidth
                label='Has Improvement Plan'
                value={field.value ?? ''}
                error={!!errors.improvementPlan}
                helperText={errors.improvementPlan?.message}
              >
                <MenuItem value='Yes'>Yes</MenuItem>
                <MenuItem value='No'>No</MenuItem>
              </CustomTextField>
            )}
          />

          {/* Conditionally show fields if Yes */}
          {improvementPlanValue === 'Yes' && (
            <>
              {/* 🎯 Improvement Goals */}
              <Controller
                name='improvementGoals'
                control={control}
                render={({ field }) => (
                  <CustomTextField {...field} fullWidth label='Improvement Plan Goals' />
                )}
              />

              {/* 📅 Improvement Start Date */}
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Controller
                  name='improvementStartDate'
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      label='Improvement Plan Start Date'
                      value={field.value ? dayjs(field.value) : null}
                      onChange={newValue => field.onChange(newValue ? newValue.toISOString() : null)}
                      enableAccessibleFieldDOMStructure={false}
                      slots={{ textField: CustomTextField }}
                      slotProps={{
                        textField: {
                          fullWidth: true
                        }
                      }}
                    />
                  )}
                />
              </LocalizationProvider>

              {/* 📅 Improvement End Date */}
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Controller
                  name='improvementEndDate'
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      label='Improvement Plan End Date'
                      value={field.value ? dayjs(field.value) : null}
                      onChange={newValue => field.onChange(newValue ? newValue.toISOString() : null)}
                      enableAccessibleFieldDOMStructure={false}
                      slots={{ textField: CustomTextField }}
                      slotProps={{
                        textField: {
                          fullWidth: true
                        }
                      }}
                    />
                  )}
                />
              </LocalizationProvider>
            </>
          )}

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




