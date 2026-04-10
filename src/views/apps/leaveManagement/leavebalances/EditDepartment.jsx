'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'

// MUI
import Drawer from '@mui/material/Drawer'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'

// RHF
import { useForm, Controller } from 'react-hook-form'

// Components
import CustomTextField from '@core/components/mui/TextField'

// APIs
import { fetchListOfUser, fetchListOfLeaveType } from '../../../../app/server/actions.js'

const EditDepartment = ({ open, handleClose, selectedDepartment }) => {
  const { data: session } = useSession()

  const { control, handleSubmit, reset } = useForm({
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

  const [users, setUsers] = useState([])
  const [leaveTypes, setLeaveTypes] = useState([])

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  })

  /* ✅ LOAD USERS */
  useEffect(() => {
    const loadUsers = async () => {
      const res = await fetchListOfUser()
      setUsers(res?.data || res || [])
    }
    loadUsers()
  }, [])

  /* ✅ LOAD LEAVE TYPES */
  useEffect(() => {
    const loadLeaveTypes = async () => {
      const res = await fetchListOfLeaveType()
      setLeaveTypes(res?.data || res || [])
    }
    loadLeaveTypes()
  }, [])

  /* ✅ PREFILL FORM */
  useEffect(() => {
    if (!selectedDepartment) return

    reset({
      employee: selectedDepartment.employeeId ?? '',
      leaveType: selectedDepartment.leaveTypeId ?? '',
      year: selectedDepartment.year ?? '',
      allocatedDays: selectedDepartment.allocatedDays ?? '',
      carriedForwardDays: selectedDepartment.carriedForwardDays ?? '',
      manualAdustment: selectedDepartment.manualAdustment ?? '',
      reason: selectedDepartment.reason ?? ''
    })
  }, [selectedDepartment, reset])

  /* ✅ SUBMIT */
  const onSubmit = async data => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/jaycon/update-leave-balance`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          token: `${session?.user?.accessToken}`
        },
        body: JSON.stringify({
          _id: selectedDepartment._id,
          employee: data.employee,
          leaveType: data.leaveType,
          year: data.year,
          allocatedDays: data.allocatedDays,
          carriedForwardDays: data.carriedForwardDays,
          manualAdustment: data.manualAdustment,
          reason: data.reason
        })
      })

      const response = await res.json()

      setSnackbar({
        open: true,
        message: response.message || 'Leave balance updated successfully',
        severity: response.success ? 'success' : 'error'
      })

      if (response.success) {
        handleClose()
        reset()
      }
    } catch (error) {
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
        onClose={handleClose}
        sx={{ '& .MuiDrawer-paper': { width: { xs: 320, sm: 420 } } }}
      >
        {/* HEADER */}
        <div className='flex items-center justify-between plb-5 pli-6'>
          <Typography variant='h5'>Edit Leave Balance</Typography>
          <IconButton size='small' onClick={handleClose}>
            <i className='tabler-x text-2xl' />
          </IconButton>
        </div>

        <Divider />

        {/* FORM */}
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-6 p-6'>
          <Controller
            name='employee'
            control={control}
            render={({ field }) => (
              <CustomTextField {...field} value={field.value ?? ''} select fullWidth label='Employee'>
                {users.map(u => (
                  <MenuItem key={u._id} value={u._id}>
                    {u.username}
                  </MenuItem>
                ))}
              </CustomTextField>
            )}
          />

          <Controller
            name='leaveType'
            control={control}
            render={({ field }) => (
              <CustomTextField {...field} value={field.value ?? ''} select fullWidth label='Leave Type'>
                {leaveTypes.map(l => (
                  <MenuItem key={l._id} value={l._id}>
                    {l.leaveTypeName}
                  </MenuItem>
                ))}
              </CustomTextField>
            )}
          />

          {[
            { name: 'year', label: 'Year' },
            { name: 'allocatedDays', label: 'Allocated Days' },
            { name: 'carriedForwardDays', label: 'Carried Forward Days' },
            { name: 'manualAdustment', label: 'Manual Adjustment' }
          ].map(f => (
            <Controller
              key={f.name}
              name={f.name}
              control={control}
              render={({ field }) => <CustomTextField {...field} value={field.value ?? ''} fullWidth label={f.label} />}
            />
          ))}

          <Controller
            name='reason'
            control={control}
            render={({ field }) => (
              <CustomTextField
                {...field}
                value={field.value ?? ''}
                fullWidth
                multiline
                rows={3}
                label='Adjustment Reason'
              />
            )}
          />

          <div className='flex gap-4'>
            <Button type='submit' variant='contained'>
              Update
            </Button>
            <Button variant='tonal' color='error' onClick={handleClose}>
              Cancel
            </Button>
          </div>
        </form>
      </Drawer>

      {/* SNACKBAR */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }} // ✅ LEFT TOP
      >
        <Alert
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
        </Alert>
      </Snackbar>
    </>
  )
}

export default EditDepartment
