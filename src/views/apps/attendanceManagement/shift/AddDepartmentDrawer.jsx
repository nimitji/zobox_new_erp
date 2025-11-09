
'use client'

import { useState } from 'react'

// 📦 MUI Imports
import Button from '@mui/material/Button'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'

// 🕐 Date & Time Picker Imports
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { TimePicker } from '@mui/x-date-pickers/TimePicker'
import dayjs from 'dayjs'

// 🧩 Third-party Imports
import { useForm, Controller } from 'react-hook-form'

// 🧠 Server Action
import { createShift } from '../../../../app/server/actions.js'

// 🧱 Component Imports
import CustomTextField from '@core/components/mui/TextField'

const AddDepartmentDrawer = props => {
  const { open, handleClose, refreshDepartments } = props

  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' })

  // 🔧 react-hook-form setup
  const {
    control,
    reset: resetForm,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm({
    defaultValues: {
      name: '',
      description: '',
      status: 'Active',
      startTime: '',
      endTime: '',
      breakDuration: '',
      breakStartTime: '',
      breakEndTime: '',
      afternoonBreakStartTime: '',
      afternoonBreakEndTime: '',
      eveningBreakStartTime: '',
      eveningBreakEndTime: '',
      gracePeriod: '',
      isNightShift: false
    }
  })

  const isNightShift = watch('isNightShift')

  // ✅ Form submit
  const onSubmit = async data => {
    try {
          const payload = {
      shiftName: data.name, // ✅ map frontend "name" to schema field
      description: data.description,
      startTime: data.startTime ? dayjs(data.startTime).format('HH:mm') : '',
      endTime: data.endTime ? dayjs(data.endTime).format('HH:mm') : '',
      breakDuration: data.breakDuration || '',
      breakStartTime: data.breakStartTime ? dayjs(data.breakStartTime).format('HH:mm') : '',
      breakEndTime: data.breakEndTime ? dayjs(data.breakEndTime).format('HH:mm') : '',
      afternoonBreakStartTime: data.afternoonBreakStartTime
        ? dayjs(data.afternoonBreakStartTime).format('HH:mm')
        : '',
      afternoonBreakEndTime: data.afternoonBreakEndTime
        ? dayjs(data.afternoonBreakEndTime).format('HH:mm')
        : '',
      eveningBreakStartTime: data.eveningBreakStartTime
        ? dayjs(data.eveningBreakStartTime).format('HH:mm')
        : '',
      eveningBreakEndTime: data.eveningBreakEndTime
        ? dayjs(data.eveningBreakEndTime).format('HH:mm')
        : '',
      gracePeriod: data.gracePeriod || '',
      isNightShift: !!data.isNightShift,
      status: data.status
    }
      const response = await createShift(payload)

      if (response?.success) {
        setSnackbar({ open: true, message: response.message || 'Shift created successfully', severity: 'success' })

        if (typeof refreshDepartments === 'function') await refreshDepartments()
        handleClose()
        resetForm()
      } else {
        setSnackbar({ open: true, message: response.message || 'Failed to create branch', severity: 'error' })
      }
    } catch (error) {
      console.error('Error creating branch:', error)
      setSnackbar({ open: true, message: 'Error creating branch', severity: 'error' })
    }
  }

  const handleReset = () => {
    handleClose()
    resetForm()
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
          <Typography variant='h5'>Add New Shift</Typography>
          <IconButton size='small' onClick={handleReset}>
            <i className='tabler-x text-2xl text-textPrimary' />
          </IconButton>
        </div>

        <Divider />

        {/* 🧾 Form Section */}
        <div>
          <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-6 p-6'>

            {/* ✅ Shift Name */}
            <Controller
              name='name'
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <CustomTextField
                  {...field}
                  value={field.value ?? ''}
                  fullWidth
                  label='Shift Name'
                  placeholder='Morning Shift'
                  error={!!errors.name}
                  helperText={errors.name && 'This field is required.'}
                />
              )}
            />

            {/* ✅ Description */}
            <Controller
              name='description'
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <CustomTextField
                  {...field}
                  value={field.value ?? ''}
                  fullWidth
                  label='Description'
                  placeholder='Optional description'
                  error={!!errors.description}
                  helperText={errors.description && 'This field is required.'}
                />
              )}
            />

            {/* 🕐 Start Time */}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Controller
                name='startTime'
                control={control}
                rules={{ required: 'Start Time is required' }}
                render={({ field }) => (
                  <TimePicker
                    label='Start Time'
                    value={field.value ? dayjs(field.value) : null}
                    onChange={newValue => field.onChange(newValue ? newValue.toISOString() : '')}
                    enableAccessibleFieldDOMStructure={false}
                    slots={{ textField: CustomTextField }}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        error: !!errors.startTime,
                        helperText: errors.startTime?.message
                      }
                    }}
                  />
                )}
              />
            </LocalizationProvider>

            {/* 🕒 End Time */}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Controller
                name='endTime'
                control={control}
                rules={{ required: 'End Time is required' }}
                render={({ field }) => (
                  <TimePicker
                    label='End Time'
                    value={field.value ? dayjs(field.value) : null}
                    onChange={newValue => field.onChange(newValue ? newValue.toISOString() : '')}
                    enableAccessibleFieldDOMStructure={false}
                    slots={{ textField: CustomTextField }}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        error: !!errors.endTime,
                        helperText: errors.endTime?.message
                      }
                    }}
                  />
                )}
              />
            </LocalizationProvider>

            {/* ☕ Break Duration */}
            <Controller
              name='breakDuration'
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <CustomTextField
                  {...field}
                  value={field.value ?? ''}
                  fullWidth
                  label='Break Duration (minutes)'
                  placeholder='60'
                  error={!!errors.breakDuration}
                  helperText={errors.breakDuration && 'This field is required.'}
                />
              )}
            />

            {/* 🌅 Breaks */}
            {[
              { name: 'breakStartTime', label: 'Break Start Time' },
              { name: 'breakEndTime', label: 'Break End Time' },
              { name: 'afternoonBreakStartTime', label: 'Afternoon Break Start Time' },
              { name: 'afternoonBreakEndTime', label: 'Afternoon Break End Time' },
              { name: 'eveningBreakStartTime', label: 'Evening Break Start Time' },
              { name: 'eveningBreakEndTime', label: 'Evening Break End Time' }
            ].map(({ name, label }) => (
              <LocalizationProvider key={name} dateAdapter={AdapterDayjs}>
                <Controller
                  name={name}
                  control={control}
                  rules={{ required: `${label} is required` }}
                  render={({ field }) => (
                    <TimePicker
                      label={label}
                      value={field.value ? dayjs(field.value) : null}
                      onChange={newValue => field.onChange(newValue ? newValue.toISOString() : '')}
                      enableAccessibleFieldDOMStructure={false}
                      slots={{ textField: CustomTextField }}
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          error: !!errors[name],
                          helperText: errors[name]?.message
                        }
                      }}
                    />
                  )}
                />
              </LocalizationProvider>
            ))}

            {/* ⏱ Grace Period */}
            <Controller
              name='gracePeriod'
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <CustomTextField
                  {...field}
                  value={field.value ?? ''}
                  fullWidth
                  label='Grace Period (minutes)'
                  placeholder='15'
                  error={!!errors.gracePeriod}
                  helperText={errors.gracePeriod && 'This field is required.'}
                />
              )}
            />

            {/* 🌙 Night Shift Checkbox */}
            <Controller
              name='isNightShift'
              control={control}
              render={({ field }) => (
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={!!field.value}
                      onChange={e => field.onChange(e.target.checked)}
                    />
                  }
                  label={<Typography>Night Shift</Typography>}
                />
              )}
            />

            {/* 🟢 Status */}
            <Controller
              name='status'
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <CustomTextField select fullWidth label='Select Status' {...field}>
                  <MenuItem value='Active'>Active</MenuItem>
                  <MenuItem value='Inactive'>Inactive</MenuItem>
                </CustomTextField>
              )}
            />

            {/* ✅ Action Buttons */}
            <div className='flex items-center gap-4'>
              <Button variant='contained' type='submit'>
                Submit
              </Button>
              <Button variant='tonal' color='error' onClick={handleReset}>
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </Drawer>

      {/* ✅ Snackbar for Success/Error */}
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
