

'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import dayjs from 'dayjs'

// MUI
import Drawer from '@mui/material/Drawer'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'

// MUI Pickers
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'

// RHF
import { useForm, Controller } from 'react-hook-form'

// Components
import CustomTextField from '@core/components/mui/TextField'
import FileUploadController from '../../../../components/fileUploadController'

// APIs
import {
  fetchListOfUser,
  fetchListOfLeaveType
} from '../../../../app/server/actions.js'

const EditDepartment = ({ open, handleClose, selectedDepartment, onSave }) => {
  const { data: session } = useSession()

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
      reason: '',
      status: 'Pending',
      attachments: ''
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
      if (Array.isArray(res?.data)) setUsers(res.data)
      else if (Array.isArray(res)) setUsers(res)
    }
    loadUsers()
  }, [])

  /* ✅ LOAD LEAVE TYPES */
  useEffect(() => {
    const loadLeaveTypes = async () => {
      const res = await fetchListOfLeaveType()
      if (Array.isArray(res?.data)) setLeaveTypes(res.data)
      else if (Array.isArray(res)) setLeaveTypes(res)
    }
    loadLeaveTypes()
  }, [])

  /* ✅ PREFILL EDIT DATA */
  useEffect(() => {
    if (!selectedDepartment) return

    reset({
      employee: selectedDepartment.employeeId || '',
      leaveType: selectedDepartment.leaveTypeId || '',
      startDate: selectedDepartment.startDate
        ? dayjs(selectedDepartment.startDate)
        : null,
      endDate: selectedDepartment.endDate
        ? dayjs(selectedDepartment.endDate)
        : null,
      reason: selectedDepartment.reason || '',
      status: selectedDepartment.status || 'Pending',
      attachments: '' // 🔥 Important: keep empty (handled in submit)
    })
  }, [selectedDepartment, reset])

  /* ✅ SUBMIT (FINAL SAFE PAYLOAD) */
  // const onSubmit = async data => {
  //   const token = session?.user?.accessToken
  //   if (!token) return

  //   const payload = {
  //     _id: selectedDepartment._id,
  //     employee: data.employee,
  //     leaveType: data.leaveType,
  //     startDate: data.startDate
  //       ? dayjs(data.startDate).format('YYYY-MM-DD')
  //       : null,
  //     endDate: data.endDate
  //       ? dayjs(data.endDate).format('YYYY-MM-DD')
  //       : null,
  //     reason: data.reason,
  //     status: data.status,
  //     attachments: data.attachments || selectedDepartment.attachments // ✅ KEEP OLD IF NOT CHANGED
  //   }

  //   const res = await onSave(payload, token)

  //   setSnackbar({
  //     open: true,
  //     message: res?.message || 'Leave updated successfully',
  //     severity: res?.success ? 'success' : 'error'
  //   })

  //   if (res?.success) handleClose()
  // }

  const onSubmit = async data => {
  const token = session?.user?.accessToken
  if (!token) return

  const formData = new FormData()

  formData.append('_id', selectedDepartment._id)
  formData.append('employee', data.employee)
  formData.append('leaveType', data.leaveType)
  formData.append(
    'startDate',
    data.startDate ? dayjs(data.startDate).format('YYYY-MM-DD') : ''
  )
  formData.append(
    'endDate',
    data.endDate ? dayjs(data.endDate).format('YYYY-MM-DD') : ''
  )
  formData.append('reason', data.reason)
  formData.append('status', data.status)

  // ✅ IF NEW FILE SELECTED
  if (data.attachments instanceof File) {
    formData.append('attachments', data.attachments)
  } else {
    // ✅ KEEP OLD FILE
    formData.append('attachments', selectedDepartment.attachments || '')
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/zobiz/update-leave-application`,
    {
      method: 'PUT',
      headers: {
        token // ✅ DO NOT set Content-Type manually
      },
      body: formData
    }
  )

  const response = await res.json()

  setSnackbar({
    open: true,
    message: response.message || 'Leave updated successfully',
    severity: response.success ? 'success' : 'error'
  })

  if (response.success) handleClose()
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
          <Typography variant='h5'>Edit Leave Application</Typography>
          <IconButton size='small' onClick={handleClose}>
            <i className='tabler-x text-2xl' />
          </IconButton>
        </div>

        <Divider />

        {/* FORM */}
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-6 p-6'>

          {/* Employee */}
          <Controller
            name='employee'
            control={control}
            rules={{ required: 'Employee is required' }}
            render={({ field }) => (
              <CustomTextField select fullWidth label='Employee' {...field}>
                {users.map(u => (
                  <MenuItem key={u._id} value={u._id}>
                    {u.username}
                  </MenuItem>
                ))}
              </CustomTextField>
            )}
          />

          {/* Leave Type */}
          <Controller
            name='leaveType'
            control={control}
            rules={{ required: 'Leave Type is required' }}
            render={({ field }) => (
              <CustomTextField select fullWidth label='Leave Type' {...field}>
                {leaveTypes.map(l => (
                  <MenuItem key={l._id} value={l._id}>
                    {l.leaveTypeName}
                  </MenuItem>
                ))}
              </CustomTextField>
            )}
          />

          {/* Dates */}
          {['startDate', 'endDate'].map(name => (
            <LocalizationProvider dateAdapter={AdapterDayjs} key={name}>
              <Controller
                name={name}
                control={control}
                rules={{ required: 'Date is required' }}
                render={({ field }) => (
                  <DatePicker
                    enableAccessibleFieldDOMStructure={false}
                    label={
                      name
                        .replace(/([A-Z])/g, ' $1')
                        .replace(/^./, c => c.toUpperCase())
                    }
                    value={field.value}
                    onChange={field.onChange}
                    slots={{ textField: CustomTextField }}
                  />
                )}
              />
            </LocalizationProvider>
          ))}

          {/* Reason */}
          <Controller
            name='reason'
            control={control}
            render={({ field }) => (
              <CustomTextField fullWidth label='Reason' {...field} />
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

          {/* Existing Attachment Preview */}
          {selectedDepartment?.attachments && (
            <Box sx={{ border: '1px solid #ddd', p: 1 }}>
              <img
                src={selectedDepartment.attachments}
                alt='attachment'
                style={{ width: '100%', maxHeight: 200, objectFit: 'contain' }}
              />
            </Box>
          )}

          {/* Upload */}
          <FileUploadController
            control={control}
            errors={errors}
            name='attachments'
            label='Attachment'
            accept='image/*,application/pdf'
          />

          <div className='flex gap-4'>
            <Button type='submit' variant='contained'>Update</Button>
            <Button variant='tonal' color='error' onClick={handleClose}>
              Cancel
            </Button>
          </div>

        </form>
      </Drawer>

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
                backgroundColor:
                  snackbar.severity === 'success' ? '#2B3380' : '#D32F2F',
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

