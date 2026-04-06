


'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'

// MUI
import Button from '@mui/material/Button'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'

// React Hook Form
import { useForm, Controller } from 'react-hook-form'
import CustomTextField from '@core/components/mui/TextField'

// Server actions
import {
  createLeaveBalance,
  fetchListOfUser,
  fetchListOfLeaveType
} from '../../../../app/server/actions.js'

const AddDepartmentDrawer = ({ open, handleClose, refreshDepartments }) => {
  const { data: session } = useSession()

  const [users, setUsers] = useState([])
  const [leaveTypes, setLeaveTypes] = useState([])
  const [loadingUsers, setLoadingUsers] = useState(true)
  const [loadingLeaveTypes, setLoadingLeaveTypes] = useState(true)

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  })

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
      year: '',
      allocatedDays: '',
      carriedForwardDays: '',
      manualAdustment: '',
      reason: ''
    }
  })

  // ✅ Load Users
  useEffect(() => {
    const loadUsers = async () => {
      try {
        const res = await fetchListOfUser()
        setUsers(res?.data || res || [])
      } catch {
        setUsers([])
      } finally {
        setLoadingUsers(false)
      }
    }
    loadUsers()
  }, [])

  // ✅ Load Leave Types
  useEffect(() => {
    const loadLeaveTypes = async () => {
      try {
        const res = await fetchListOfLeaveType()
        setLeaveTypes(res?.data || res || [])
      } catch {
        setLeaveTypes([])
      } finally {
        setLoadingLeaveTypes(false)
      }
    }
    loadLeaveTypes()
  }, [])

  // ✅ Submit
  // const onSubmit = async data => {
  //   const token = session?.user?.accessToken
  //   if (!token) return

  //   try {
  //     const res = await createLeaveBalance(data, token)

  //     if (res?.success) {
  //       setSnackbar({
  //         open: true,
  //         message: 'Leave balance added successfully',
  //         severity: 'success'
  //       })
  //       refreshDepartments?.()
  //       reset()
  //       handleClose()
  //     } else {
  //       throw new Error()
  //     }
  //   } catch {
  //     setSnackbar({
  //       open: true,
  //       message: 'Failed to submit leave balance',
  //       severity: 'error'
  //     })
  //   }
  // }

  const onSubmit = async data => {
  const token = session?.user?.accessToken
  if (!token) return

  try {
    const res = await createLeaveBalance(data, token)

    if (res?.success) {
      setSnackbar({
        open: true,
        message: 'Leave balance added successfully',
        severity: 'success'
      })
      refreshDepartments?.()
      reset()
      handleClose()
    } else {
      throw new Error(res?.message)
    }
  } catch (error) {
    setSnackbar({
      open: true,
      message: error.message || 'Failed to submit leave balance',
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
          reset()
          handleClose()
        }}
        sx={{ '& .MuiDrawer-paper': { width: { xs: 320, sm: 420 } } }}
      >
        <div className='flex items-center justify-between plb-5 pli-6'>
          <Typography variant='h5'>Add Leave Balance</Typography>
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
              <CustomTextField
                select
                fullWidth
                label='Employee'
                {...field}
                value={field.value ?? ''}
                error={!!errors.employee}
                helperText={errors.employee?.message}
              >
                {loadingUsers ? (
                  <MenuItem disabled>Loading...</MenuItem>
                ) : (
                  users.map(user => (
                    <MenuItem key={user._id} value={user._id}>
                      {user.username}
                    </MenuItem>
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
              <CustomTextField
                select
                fullWidth
                label='Leave Type'
                {...field}
                value={field.value ?? ''}
                error={!!errors.leaveType}
                helperText={errors.leaveType?.message}
              >
                {loadingLeaveTypes ? (
                  <MenuItem disabled>Loading...</MenuItem>
                ) : (
                  leaveTypes.map(type => (
                    <MenuItem key={type._id} value={type._id}>
                      {type.leaveTypeName}
                    </MenuItem>
                  ))
                )}
              </CustomTextField>
            )}
          />

          {[
            { name: 'year', label: 'Year' },
            { name: 'allocatedDays', label: 'Allocated Days' },
            { name: 'carriedForwardDays', label: 'Carried Forward Days' },
            { name: 'manualAdustment', label: 'Manual Adjustment' }
          ].map(fieldData => (
            <Controller
              key={fieldData.name}
              name={fieldData.name}
              control={control}
              rules={{ required: `${fieldData.label} is required` }}
              render={({ field }) => (
                <CustomTextField
                  {...field}
                  value={field.value ?? ''}
                  fullWidth
                  label={fieldData.label}
                  error={!!errors[fieldData.name]}
                  helperText={errors[fieldData.name]?.message}
                />
              )}
            />
          ))}

          {/* Reason */}
          <Controller
            name='reason'
            control={control}
            rules={{ required: 'Reason is required' }}
            render={({ field }) => (
              <CustomTextField
                {...field}
                value={field.value ?? ''}
                fullWidth
                multiline
                rows={3}
                label='Adjustment Reason'
                placeholder='Enter reason in detail...'
                error={!!errors.reason}
                helperText={errors.reason?.message}
              />
            )}
          />

          <div className='flex gap-4'>
            <Button type='submit' variant='contained'>Submit</Button>
            <Button variant='tonal' color='error' onClick={handleClose}>Cancel</Button>
          </div>
        </form>
      </Drawer>

   

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










