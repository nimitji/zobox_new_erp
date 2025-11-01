



'use client'

import { useState, useEffect } from 'react'
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

import FileUploadController from '../../../../components/fileUploadController'
import { useForm, Controller } from 'react-hook-form'

// ✅ server actions
import {
  createPromotions,
  fetchListOfUser,
  fetchUserDesignation,
  fetchListOfNewDesignation
} from '../../../../app/server/actions.js'

import CustomTextField from '@core/components/mui/TextField'

const AddDepartmentDrawer = props => {
  const { open, handleClose, refreshDepartments } = props

  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' })
  const [users, setUsers] = useState([])
  const [loadingUsers, setLoadingUsers] = useState(true)

  const [designations, setDesignations] = useState([])
  const [loadingDesignations, setLoadingDesignations] = useState(true)

  // 💡 maintain both displayName and id of designation
  const [designationName, setDesignationName] = useState('')
  const [designationId, setDesignationId] = useState('')

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors }
  } = useForm({
    defaultValues: {
      employee: '',
      previousDesignation: '',
      newDesignation: '',
      promotionDate: '',
      effectiveDate: '',
      salaryAdjustment: '',
      remark: '',
      status: 'Pending',
      document: ''
    }
  })

  // 🔹 Load employees
  useEffect(() => {
    const loadUsers = async () => {
      try {
        const response = await fetchListOfUser()
        if (response?.success && Array.isArray(response.data)) {
          setUsers(response.data)
        } else if (Array.isArray(response)) setUsers(response)
      } catch (err) {
        console.error('Error fetching users:', err)
      } finally {
        setLoadingUsers(false)
      }
    }
    loadUsers()
  }, [])

  // 🔹 Load new designation list
  useEffect(() => {
    const loadDesignations = async () => {
      try {
        const response = await fetchListOfNewDesignation()
        if (response?.success && Array.isArray(response.data)) {
          setDesignations(response.data)
        } else if (Array.isArray(response)) setDesignations(response)
      } catch (err) {
        console.error('Error fetching designations:', err)
      } finally {
        setLoadingDesignations(false)
      }
    }
    loadDesignations()
  }, [])

  // 🔹 When employee changes, fetch their current designation
  const handleEmployeeChange = async userId => {
    try {
      const res = await fetchUserDesignation(userId)
      if (res?.success && res.data?.designation) {
        const { _id, name, department } = res.data.designation

        // Format name: designationName - departmentName (branchName)
        const dept = department?.name || ''
        const branch = department?.branch?.branchName || ''
        const displayName = `${name}${dept ? ` - ${dept}` : ''}${branch ? ` (${branch})` : ''}`

        setDesignationName(displayName)
        setDesignationId(_id)
        setValue('previousDesignation', _id)
      } else {
        setDesignationName('')
        setDesignationId('')
        setValue('previousDesignation', '')
      }
    } catch (err) {
      console.error('Error fetching user details:', err)
    }
  }

  // ✅ Submit form
  const onSubmit = async data => {
    try {
      const payload = {
        employee: data.employee,
        previousDesignation: data.previousDesignation,
        newDesignation: data.newDesignation,
        promotionDate: data.promotionDate,
        effectiveDate: data.effectiveDate,
        salaryAdjustment: data.salaryAdjustment,
        remark: data.remark,
        status: data.status,
        document: data.document
      }

      console.log('📤 Promotion Payload:', payload)
      const response = await createPromotions(payload)

      if (response?.success) {
        setSnackbar({
          open: true,
          message: 'Promotion created successfully!',
          severity: 'success'
        })
        await refreshDepartments?.()
        handleClose()
        reset()
        setDesignationName('')
        setDesignationId('')
      } else {
        setSnackbar({
          open: true,
          message: response.message || 'Failed to create promotion',
          severity: 'error'
        })
      }
    } catch (err) {
      console.error(err)
      setSnackbar({
        open: true,
        message: 'Error creating promotion',
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
          setDesignationName('')
          setDesignationId('')
        }}
        sx={{ '& .MuiDrawer-paper': { width: { xs: 320, sm: 420 } } }}
      >
        <div className='flex items-center justify-between plb-5 pli-6'>
          <Typography variant='h5'>Add Promotion</Typography>
          <IconButton size='small' onClick={handleClose}>
            <i className='tabler-x text-2xl text-textPrimary' />
          </IconButton>
        </div>
        <Divider />

        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-6 p-6'>

          {/* Employee Dropdown */}
          <Controller
            name='employee'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <CustomTextField
                select
                fullWidth
                label='Employee'
                {...field}
                onChange={e => {
                  field.onChange(e)
                  handleEmployeeChange(e.target.value)
                }}
                error={!!errors.employee}
                helperText={errors.employee && 'Employee is required.'}
              >
                {loadingUsers ? (
                  <MenuItem disabled>Loading employees...</MenuItem>
                ) : users.length > 0 ? (
                  users.map(user => (
                    <MenuItem key={user._id} value={user._id}>
                      {user.username}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem disabled>No employees found</MenuItem>
                )}
              </CustomTextField>
            )}
          />

          {/* Previous Designation */}
          <CustomTextField
            fullWidth
            label='Previous Designation'
            value={designationName || ''}
            InputProps={{
              readOnly: true,
              sx: {
                fontWeight: 'bold',
                color: '#000000',
                WebkitTextFillColor: '#000000',
                cursor: 'default'
              }
            }}
          />
          <Controller
            name='previousDesignation'
            control={control}
            render={({ field }) => (
              <input type='hidden' {...field} value={designationId} />
            )}
          />

          {/* New Designation */}
          <Controller
            name='newDesignation'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <CustomTextField
                select
                fullWidth
                label='New Designation'
                {...field}
                error={!!errors.newDesignation}
                helperText={errors.newDesignation && 'New Designation is required.'}
              >
                {loadingDesignations ? (
                  <MenuItem disabled>Loading designations...</MenuItem>
                ) : designations.length > 0 ? (
                  designations.map(d => (
                    <MenuItem key={d._id} value={d._id}>
                      {d.name}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem disabled>No designations found</MenuItem>
                )}
              </CustomTextField>
            )}
          />

          {/* Promotion Date */}
     
 <LocalizationProvider dateAdapter={AdapterDayjs}>
  <Controller
    name='promotionDate'
    control={control}
    rules={{ required: 'promotionDate is required' }}
    render={({ field }) => (
      <DatePicker
        label='Promotion Date'
        value={field.value ? dayjs(field.value) : null}
        onChange={newValue => field.onChange(newValue ? newValue.toISOString() : null)}
        enableAccessibleFieldDOMStructure={false} // ✅ Fix for MUI v7+
        slots={{ textField: CustomTextField }}
        slotProps={{
          textField: {
            fullWidth: true,
            error: !!errors.promotionDate,
            helperText: errors.promotionDate?.message
          }
        }}
      />
    )}
  />
</LocalizationProvider>
 <LocalizationProvider dateAdapter={AdapterDayjs}>
  <Controller
    name='effectiveDate'
    control={control}
    rules={{ required: 'Effective DateS is required' }}
    render={({ field }) => (
      <DatePicker
        label='Effective Date'
        value={field.value ? dayjs(field.value) : null}
        onChange={newValue => field.onChange(newValue ? newValue.toISOString() : null)}
        enableAccessibleFieldDOMStructure={false} // ✅ Fix for MUI v7+
        slots={{ textField: CustomTextField }}
        slotProps={{
          textField: {
            fullWidth: true,
            error: !!errors.effectiveDate,
            helperText: errors.effectiveDate?.message
          }
        }}
      />
    )}
  />
</LocalizationProvider>

          {/* Salary Adjustment */}
          <Controller
            name='salaryAdjustment'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <CustomTextField
                {...field}
                fullWidth
                label='Salary Adjustment'
                error={!!errors.salaryAdjustment}
                helperText={errors.salaryAdjustment && 'Salary adjustment is required.'}
              />
            )}
          />

          {/* Reason for Promotion */}
          <Controller
            name='remark'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <CustomTextField
                {...field}
                fullWidth
                label='Reason for Promotion'
                error={!!errors.remark}
                helperText={errors.remark && 'This field is required.'}
              />
            )}
          />

          {/* Status */}
          <Controller
            name='status'
            control={control}
            render={({ field }) => (
              <CustomTextField select fullWidth label='Status' {...field}>
                <MenuItem value='Approved'>Approved</MenuItem>
                <MenuItem value='Pending'>Pending</MenuItem>
                <MenuItem value='Rejected'>Rejected</MenuItem>
              </CustomTextField>
            )}
          />

          {/* Document Upload */}
          <FileUploadController
            control={control}
            errors={errors}
            name='document'
            label='Upload Document'
            required
            accept='image/*,application/pdf'
          />

          {/* Buttons */}
          <div className='flex items-center gap-4'>
            <Button variant='contained' type='submit'>
              Submit
            </Button>
            <Button variant='tonal' color='error' onClick={handleClose}>
              Cancel
            </Button>
          </div>
        </form>
      </Drawer>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MuiAlert
          severity={snackbar.severity}
          variant='filled'
          sx={{
            backgroundColor: snackbar.severity === 'success' ? '#2B3380' : '#D32F2F',
            color: 'white'
          }}
        >
          {snackbar.message}
        </MuiAlert>
      </Snackbar>
    </>
  )
}

export default AddDepartmentDrawer





