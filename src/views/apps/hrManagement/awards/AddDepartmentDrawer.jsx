


'use client'

import { useState, useEffect } from 'react'

// 📦 MUI Imports
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

// 🧩 Third-party Imports
import { useForm, Controller } from 'react-hook-form'
import FileUploadController from '../../../../components/fileUploadController'

// 🧠 Server Action
import { createAward, fetchListOfUser, fetchListOfAwardTypes } from '../../../../app/server/actions.js'

// 🧱 Component Imports
import CustomTextField from '@core/components/mui/TextField'

const AddDepartmentDrawer = props => {
  const { open, handleClose, refreshDepartments } = props

  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' })
  const [branches, setBranches] = useState([]) // employees
  const [awardTypes, setAwardTypes] = useState([])

  // 🔧 react-hook-form setup
  const {
    control,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      user: '',
      awardType: '',
      gift: '',
      monetaryValue: '',
      description: '',
      awardDate: '',
      photo: null,
      certificate: null
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

  // 🧠 Fetch Award Types
  useEffect(() => {
    const loadAwardTypes = async () => {
      try {
        const res = await fetchListOfAwardTypes()
        if (res?.success && Array.isArray(res.data)) setAwardTypes(res.data)
        else if (Array.isArray(res)) setAwardTypes(res)
      } catch (err) {
        console.error('Error fetching award types:', err)
      }
    }
    loadAwardTypes()
  }, [])

  // ✅ Submit Form (with image upload)
  const onSubmit = async data => {
    try {
      const formData = new FormData()
      formData.append('user', data.user)
      formData.append('awardType', data.awardType)
      formData.append('gift', data.gift)
      formData.append('monetaryValue', data.monetaryValue)
      formData.append('description', data.description)
      formData.append('awardDate', data.awardDate)

      if (data.photo) formData.append('photo', data.photo)
      if (data.certificate) formData.append('certificate', data.certificate)

      const response = await createAward(formData)

      if (response?.success) {
        setSnackbar({ open: true, message: response.message || 'Award created successfully', severity: 'success' })
        if (typeof refreshDepartments === 'function') await refreshDepartments()
        handleClose()
        reset()
      } else {
        setSnackbar({ open: true, message: response.message || 'Failed to create award', severity: 'error' })
      }
    } catch (error) {
      console.error('Error creating award:', error)
      setSnackbar({ open: true, message: 'Error creating award', severity: 'error' })
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
            Add New Award
          </Typography>
          <IconButton size='small' onClick={handleReset}>
            <i className='tabler-x text-2xl text-textPrimary' />
          </IconButton>
        </div>
        <Divider />

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-6 p-6'>

          {/* 🧑 Employee */}
          <Controller
            name='user'
            control={control}
            rules={{ required: 'Employee is required' }}
            render={({ field }) => (
              <CustomTextField
                select
                fullWidth
                label='Employee'
                {...field}
                error={!!errors.user}
                helperText={errors.user?.message}
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

          {/* 🏆 Award Type */}
          <Controller
            name='awardType'
            control={control}
            rules={{ required: 'Award type is required' }}
            render={({ field }) => (
              <CustomTextField
                select
                fullWidth
                label='Award Type'
                {...field}
                error={!!errors.awardType}
                helperText={errors.awardType?.message}
              >
                {awardTypes.length > 0 ? (
                  awardTypes.map(type => (
                    <MenuItem key={type._id} value={type._id}>
                      {type.name}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem disabled>No Award Types found</MenuItem>
                )}
              </CustomTextField>
            )}
          />

          {/* 📅 Award Date */}
         <LocalizationProvider dateAdapter={AdapterDayjs}>
  <Controller
    name='awardDate'
    control={control}
    rules={{ required: 'Award date is required' }}
    render={({ field }) => (
      <DatePicker
        label='Award Date'
        value={field.value ? dayjs(field.value) : null}
        onChange={newValue => field.onChange(newValue ? newValue.toISOString() : null)}
        enableAccessibleFieldDOMStructure={false} // ✅ Fix for MUI v7+
        slots={{ textField: CustomTextField }}
        slotProps={{
          textField: {
            fullWidth: true,
            error: !!errors.awardDate,
            helperText: errors.awardDate?.message
          }
        }}
      />
    )}
  />
</LocalizationProvider>


          {/* 🎁 Gift */}
          <Controller
            name='gift'
            control={control}
            rules={{ required: 'Gift is required' }}
            render={({ field }) => (
              <CustomTextField {...field} fullWidth label='Gift' error={!!errors.gift} helperText={errors.gift?.message} />
            )}
          />

          {/* 💰 Monetary Value */}
          <Controller
            name='monetaryValue'
            control={control}
            rules={{ required: 'Monetary value is required' }}
            render={({ field }) => (
              <CustomTextField {...field} fullWidth label='Monetary Value' error={!!errors.monetaryValue} helperText={errors.monetaryValue?.message} />
            )}
          />

          {/* 📝 Description */}
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

          {/* 📸 Photo Upload */}
          <FileUploadController
            control={control}
            errors={errors}
            name='photo'
            label='Upload Photo'
            required
            accept='image/*'
          />

          {/* 📄 Certificate Upload */}
          <FileUploadController
            control={control}
            errors={errors}
            name='certificate'
            label='Upload Certificate'
            accept='.pdf,.docx,.jpg,.png'
          />

          {/* ✅ Buttons */}
          <div className='flex items-center gap-4'>
            <Button variant='contained' type='submit'>Submit</Button>
            <Button variant='tonal' color='error' onClick={handleReset}>Cancel</Button>
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


