

'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'

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

// 🕒 Date/Time Imports
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { TimePicker } from '@mui/x-date-pickers/TimePicker'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'

// 🧩 Third-party Imports
import { useForm, Controller } from 'react-hook-form'

// 🧠 Server Action
import { createAttendanceRecord, fetchListOfUser } from '../../../../app/server/actions.js'

// 🧱 Component Imports
import CustomTextField from '@core/components/mui/TextField'

const AddAttendanceDrawer = props => {
  const { open, handleClose, refreshDepartments } = props

  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' })
  const [employees, setEmployees] = useState([])
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
      date: '',
      clockIn: '',
      clockOut: '',
      breakHours: '',
      status: '',
      isHoliday: false,
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

  // ✅ Submit Form — Create Attendance Record
  const onSubmit = async data => {
    try {
       const token = session?.user?.accessToken  // ✅ safest way
  if (!token) {
    console.warn('No access token found in session')
    return
  }
      const payload = {
        employees: data.employees,
        date: data.date ? dayjs(data.date).format('YYYY-MM-DD') : '',
        clockIn: data.clockIn ? dayjs(data.clockIn).format('HH:mm') : '',
        clockOut: data.clockOut ? dayjs(data.clockOut).format('HH:mm') : '',
        breakHours: data.breakHours,
        status: data.status,
        isHoliday: data.isHoliday,
        notes: data.notes
      }
    

      console.log('🟢 Sending Attendance Record Payload123:', payload,token)

      const response = await createAttendanceRecord(payload)

      if (response?.success) {
        setSnackbar({
          open: true,
          message: response.message || 'Attendance record created successfully',
          severity: 'success'
        })
        if (typeof refreshDepartments === 'function') await refreshDepartments()
        handleClose()
        reset()
      } else {
        setSnackbar({
          open: true,
          message: response.message || 'Failed to create attendance record',
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
            Add New Attendance Record
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
                  <MenuItem disabled>No Employees found</MenuItem>
                )}
              </CustomTextField>
            )}
          />

          {/* 📅 Date */}
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Controller
              name='date'
              control={control}
              rules={{ required: 'Date is required' }}
              render={({ field }) => (
                <DatePicker
                  label='Date'
                  value={field.value ? dayjs(field.value) : null}
                  onChange={newValue => field.onChange(newValue ? newValue.toISOString() : null)}
                  enableAccessibleFieldDOMStructure={false}
                  slots={{ textField: CustomTextField }}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      error: !!errors.date,
                      helperText: errors.date?.message
                    }
                  }}
                />
              )}
            />
          </LocalizationProvider>

          {/* 🕐 Clock In */}
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Controller
              name='clockIn'
              control={control}
              rules={{ required: 'Clock In Time is required' }}
              render={({ field }) => (
                <TimePicker
                  label='Clock In Time'
                  value={field.value ? dayjs(field.value) : null}
                  onChange={newValue => field.onChange(newValue ? newValue.toISOString() : '')}
                  enableAccessibleFieldDOMStructure={false}
                  slots={{ textField: CustomTextField }}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      error: !!errors.clockIn,
                      helperText: errors.clockIn?.message
                    }
                  }}
                />
              )}
            />
          </LocalizationProvider>

          {/* 🕒 Clock Out */}
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Controller
              name='clockOut'
              control={control}
              rules={{ required: 'Clock Out Time is required' }}
              render={({ field }) => (
                <TimePicker
                  label='Clock Out Time'
                  value={field.value ? dayjs(field.value) : null}
                  onChange={newValue => field.onChange(newValue ? newValue.toISOString() : '')}
                  enableAccessibleFieldDOMStructure={false}
                  slots={{ textField: CustomTextField }}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      error: !!errors.clockOut,
                      helperText: errors.clockOut?.message
                    }
                  }}
                />
              )}
            />
          </LocalizationProvider>

          {/* ⏸ Break Hours */}
          <Controller
            name='breakHours'
            control={control}
            rules={{ required: 'Break Hours are required' }}
            render={({ field }) => (
              <CustomTextField
                {...field}
                fullWidth
                label='Break Hours'
                error={!!errors.breakHours}
                helperText={errors.breakHours?.message}
              />
            )}
          />

          {/* 📊 Status */}
          <Controller
            name='status'
            control={control}
            rules={{ required: 'Status is required' }}
            render={({ field }) => (
              <CustomTextField select fullWidth label='Status' {...field}>
                <MenuItem value='Present'>Present</MenuItem>
                <MenuItem value='Absent'>Absent</MenuItem>
                <MenuItem value='Half Day'>Half Day</MenuItem>
                <MenuItem value='On Leave'>On Leave</MenuItem>
                <MenuItem value='Holiday'>Holiday</MenuItem>
              </CustomTextField>
            )}
          />

          {/* 🎉 Holiday Checkbox */}
          <Controller
            name='isHoliday'
            control={control}
            render={({ field }) => (
              <FormControlLabel
                control={
                  <Checkbox
                    checked={!!field.value}
                    onChange={e => field.onChange(e.target.checked)}
                  />
                }
                label={<Typography>Holiday</Typography>}
              />
            )}
          />

          {/* 📝 Notes */}
          <Controller
            name='notes'
            control={control}
            rules={{ required: 'Notes are required' }}
            render={({ field }) => (
              <CustomTextField
                {...field}
                fullWidth
                label='Notes'
                error={!!errors.notes}
                helperText={errors.notes?.message}
              />
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



