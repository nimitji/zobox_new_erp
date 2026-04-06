

'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import Button from '@mui/material/Button'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'

import { useForm, Controller } from 'react-hook-form'
import CustomTextField from '@core/components/mui/TextField'
import FileUploadController from '../../../../components/fileUploadController'

// ✅ server actions
import {
  createLeaveApplication,
  fetchListOfUser,
  fetchListOfLeaveType
} from '../../../../app/server/actions.js'

const AddDepartmentDrawer = ({ open, handleClose, refreshDepartments }) => {
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  })

  const [users, setUsers] = useState([])
  const [leaveTypes, setLeaveTypes] = useState([])
  const [loadingUsers, setLoadingUsers] = useState(true)
  const [loadingLeaveTypes, setLoadingLeaveTypes] = useState(true)
  const { data: session } = useSession()
  const userType = session?.user.typeOfUser

  // ✅ FORM
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: {
      employee: '',
      leaveType: '',
      startDate: null,
      endDate: null,
      appliedOn: null,
      reason: '',
      status: 'Pending',
      attachments: ''
    }
  })

  // // 🔹 Users
  // useEffect(() => {
  //   const loadUsers = async () => {
  //     try {
  //       const res = await fetchListOfUser()
  //       console.log('👤 USERS API RESPONSE:', res)
  //       if (res?.success) setUsers(res.data)
  //     } finally {
  //       setLoadingUsers(false)
  //     }
  //   }
  //   loadUsers()
  // }, [])

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const res = await fetchListOfUser()
        console.log('👤 USERS API RESPONSE:', res)

        if (Array.isArray(res)) {
          setUsers(res)
        } else if (res?.success && Array.isArray(res.data)) {
          setUsers(res.data)
        } else {
          setUsers([])
        }
      } catch (err) {
        console.error('Error fetching users:', err)
        setUsers([])
      } finally {
        setLoadingUsers(false)
      }
    }

    loadUsers()
  }, [])


  // // 🔹 Leave Types
  // useEffect(() => {
  //   const loadLeaveTypes = async () => {
  //     try {
  //       const res = await fetchListOfLeaveType()
  //       if (res?.success) setLeaveTypes(res.data)
  //     } finally {
  //       setLoadingLeaveTypes(false)
  //     }
  //   }
  //   loadLeaveTypes()
  // }, [])

  useEffect(() => {
    const loadLeaveTypes = async () => {
      try {
        const res = await fetchListOfLeaveType()
        console.log('🟢 LEAVE TYPES API RESPONSE:', res)

        if (Array.isArray(res)) {
          setLeaveTypes(res)
        } else if (res?.success && Array.isArray(res.data)) {
          setLeaveTypes(res.data)
        } else {
          setLeaveTypes([])
        }
      } catch (err) {
        console.error('Error fetching leave types:', err)
        setLeaveTypes([])
      } finally {
        setLoadingLeaveTypes(false)
      }
    }

    loadLeaveTypes()
  }, [])


  // ✅ SUBMIT
  const onSubmit = async data => {
    const token = session?.user?.accessToken
    if (!token) return
    const payload = {
      employee: data.employee,
      leaveType: data.leaveType,
      startDate: data.startDate,
      endDate: data.endDate,
      appliedOn: data.appliedOn,
      reason: data.reason,
      status: data.status,
      attachments: data.attachments // 🔥 SAME AS PROMOTION
    }

    console.log('📤 Leave Payload:', payload)

    try {
      const res = await createLeaveApplication(payload, token)

      if (res?.success) {
        setSnackbar({
          open: true,
          message: 'Leave application submitted successfully',
          severity: 'success'
        })
        await refreshDepartments?.()
        handleClose()
        reset()
      } else {
        setSnackbar({
          open: true,
          message: res?.message || 'Failed to submit leave',
          severity: 'error'
        })
      }
    } catch (err) {
      console.error(err)
      setSnackbar({
        open: true,
        message: 'Something went wrong',
        severity: 'error'
      })
    }
  }

  return (
    <>
      <Drawer
        open={open}
        anchor='right'
        onClose={() => {
          handleClose()
          reset()
        }}
        sx={{ '& .MuiDrawer-paper': { width: { xs: 320, sm: 420 } } }}
      >
        <div className='flex items-center justify-between plb-5 pli-6'>
          <Typography variant='h5'>Add Leave Application</Typography>
          <IconButton size='small' onClick={handleClose}>
            <i className='tabler-x text-2xl' />
          </IconButton>
        </div>

        <Divider />

        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-6 p-6'>

          {/* Employee */}
          <Controller
            name='employee'
            control={control}
            rules={{ required: 'Employee is required' }}
            render={({ field }) => (
              <CustomTextField select fullWidth label='Employee' {...field}
                error={!!errors.employee}
                helperText={errors.employee?.message}
              >
                {loadingUsers ? (
                  <MenuItem disabled>Loading...</MenuItem>
                ) : (
                  users.map(u => (
                    <MenuItem key={u._id} value={u._id}>{u.username}</MenuItem>
                  ))
                )}
              </CustomTextField>
            )}
          />

          {/* Leave Type */}
          <Controller
            name='leaveType'
            control={control}
            rules={{ required: 'Leave Type is required' }}
            render={({ field }) => (
              <CustomTextField select fullWidth label='Leave Type' {...field}
                error={!!errors.leaveType}
                helperText={errors.leaveType?.message}
              >
                {loadingLeaveTypes ? (
                  <MenuItem disabled>Loading...</MenuItem>
                ) : (
                  leaveTypes.map(l => (
                    <MenuItem key={l._id} value={l._id}>{l.leaveTypeName}</MenuItem>
                  ))
                )}
              </CustomTextField>
            )}
          />

          {/* Dates */}
          {/* Dates */}
          {['startDate', 'endDate'].map(name => (
            <LocalizationProvider key={name} dateAdapter={AdapterDayjs}>
              <Controller
                name={name}
                control={control}
                rules={{ required: 'Date is required' }}
                render={({ field }) => (
                  <DatePicker
                    // label={name.replace(/([A-Z])/g, ' $1')}
                    label={
                      name
                        .replace(/([A-Z])/g, ' $1')
                        .replace(/^./, c => c.toUpperCase())
                    }

                    value={field.value ? dayjs(field.value) : null}
                    onChange={val => field.onChange(val ? val.toISOString() : null)}

                    enableAccessibleFieldDOMStructure={false} // ✅🔥 FIX

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


          {/* Reason */}
          <Controller
            name='reason'
            control={control}
            rules={{ required: 'Reason is required' }}
            render={({ field }) => (
              <CustomTextField {...field} fullWidth label='Reason'
                error={!!errors.reason}
                helperText={errors.reason?.message}
              />
            )}
          />

          {/* Status */}
          <Controller
            name='status'
            control={control}
            render={({ field }) => (
              <CustomTextField select fullWidth label='Status' {...field}>
                <MenuItem value='Pending'>Pending</MenuItem>
                <MenuItem value='Approved'>Approved</MenuItem>
                <MenuItem value='Rejected'>Rejected</MenuItem>
              </CustomTextField>
            )}
          />

          {/* 🔥 DOCUMENT UPLOAD (PROMOTION STYLE) */}
          <FileUploadController
            control={control}
            errors={errors}
            name='attachments'
            label='Attachment'
            required
            accept='image/*,application/pdf'
          />

          <div className='flex gap-4'>
            <Button type='submit' variant='contained'>Submit</Button>
            <Button variant='tonal' color='error' onClick={handleClose}>Cancel</Button>
          </div>
        </form>
      </Drawer>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }} // ✅ LEFT TOP
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









