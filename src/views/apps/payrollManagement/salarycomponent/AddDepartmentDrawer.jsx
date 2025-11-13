

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

// 🧩 Third-party Imports
import { useForm, Controller } from 'react-hook-form'

// 🧠 Server Action (replace later with actual API function)
import { createSalaryComponent } from '@/app/server/actions'

// 🧱 Component Imports
import CustomTextField from '@core/components/mui/TextField'

// 🧾 Component
const AddSalaryComponentDrawer = props => {
  const { open, handleClose, refreshPolicies } = props

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  })

  // 🔧 react-hook-form setup
  const {
    control,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      componentName: '',
      description: '',
      type: 'Earning',
      calculationType: 'Fixed Amount',
      fixedAmount: '',
      percentageOfBasic: '',
      isTaxable: false,
      isMandatory: false,
      status: 'Active'
    }
  })


  

  // ✅ Form Submit Handler
  const onSubmit = async data => {
    try {
      // ✅ Payload that exactly matches your backend Mongoose schema
      const payload = {
        componentName: data.componentName,
        description: data.description,
        type: data.type,
        calculationType: data.calculationType,
        fixedAmount: data.fixedAmount,
        percentageOfBasic: data.percentageOfBasic,
        isTaxable: data.isTaxable || false,
        isMandatory: data.isMandatory || false,
        status: data.status
      }

      console.log('🟢 Sending Salary Component Payload:', payload)

      // TODO: replace createAttendancePolicy with your actual API call
      const response = await createSalaryComponent(payload)

      if (response?.success) {
        setSnackbar({
          open: true,
          message: response.message || 'Salary component created successfully!',
          severity: 'success'
        })

        // ✅ Refresh parent list if passed
        if (typeof refreshPolicies === 'function') {
          await refreshPolicies()
        }

        handleReset()
      } else {
        setSnackbar({
          open: true,
          message: response.message || 'Failed to create salary component',
          severity: 'error'
        })
      }
    } catch (error) {
      console.error('❌ Error creating salary component:', error)
      setSnackbar({
        open: true,
        message: 'An error occurred while creating salary component',
        severity: 'error'
      })
    }
  }

  // ✅ Reset Form + Close Drawer
  const handleReset = () => {
    reset()
    handleClose()
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
        <div className='flex items-center justify-between plb-5 pli-6'>
          <Typography variant='h5' sx={{ fontWeight: 600 }}>
            Add New Salary Component
          </Typography>
          <IconButton size='small' onClick={handleReset}>
            <i className='tabler-x text-2xl text-textPrimary' />
          </IconButton>
        </div>

        <Divider />

        {/* 🧾 Form Section */}
        <div>
          <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-6 p-6'>
            {/* Component Name */}
            <Controller
              name='componentName'
              control={control}
              rules={{ required: 'Component name is required' }}
              render={({ field }) => (
                <CustomTextField
                  {...field}
                  fullWidth
                  label='Component Name'
                  placeholder='House Rent Allowance (HRA)'
                  error={!!errors.componentName}
                  helperText={errors.componentName?.message}
                />
              )}
            />

            {/* Description */}
            <Controller
              name='description'
              control={control}
              rules={{ required: 'Description is required' }}
              render={({ field }) => (
                <CustomTextField
                  {...field}
                  fullWidth
                  multiline
                  rows={2}
                  label='Description'
                  placeholder='Component description...'
                  error={!!errors.description}
                  helperText={errors.description?.message}
                />
              )}
            />

            {/* Select Type */}
            <Controller
              name='type'
              control={control}
              render={({ field }) => (
                <CustomTextField select fullWidth label='Select Type' {...field}>
                  <MenuItem value='Earning'>Earning</MenuItem>
                  <MenuItem value='Deduction'>Deduction</MenuItem>
                </CustomTextField>
              )}
            />

            {/* Select Calculation Type */}
            <Controller
              name='calculationType'
              control={control}
              render={({ field }) => (
                <CustomTextField select fullWidth label='Select Calculation Type' {...field}>
                  <MenuItem value='Fixed Amount'>Fixed Amount</MenuItem>
                  <MenuItem value='Percentage of Basic'>Percentage of Basic</MenuItem>
                   <MenuItem value='Percentage of Gross'>Percentage of Gross</MenuItem>
                  
                </CustomTextField>
              )}
            />

            {/* Fixed Amount */}
            <Controller
              name='fixedAmount'
              control={control}
              rules={{ required: 'Fixed Amount is required' }}
              render={({ field }) => (
                <CustomTextField
                  {...field}
                  fullWidth
                  label='Fixed Amount'
                  placeholder='1500'
                  error={!!errors.fixedAmount}
                  helperText={errors.fixedAmount?.message}
                />
              )}
            />

            {/* Percentage of Basic */}
            <Controller
              name='percentageOfBasic'
              control={control}
              rules={{ required: 'Percentage is required' }}
              render={({ field }) => (
                <CustomTextField
                  {...field}
                  fullWidth
                  label='Percentage of Basic/Gross'
                  placeholder='15'
                  error={!!errors.percentageOfBasic}
                  helperText={errors.percentageOfBasic?.message}
                />
              )}
            />

            {/* ✅ Is Taxable */}
            <Controller
              name='isTaxable'
              control={control}
              render={({ field }) => (
                <FormControlLabel
                  control={
                    <Checkbox
                      {...field}
                      checked={field.value || false}
                      onChange={e => field.onChange(e.target.checked)}
                    />
                  }
                  label='Is Taxable'
                />
              )}
            />

            {/* ✅ Is Mandatory */}
            <Controller
              name='isMandatory'
              control={control}
              render={({ field }) => (
                <FormControlLabel
                  control={
                    <Checkbox
                      {...field}
                      checked={field.value || false}
                      onChange={e => field.onChange(e.target.checked)}
                    />
                  }
                  label='Is Mandatory'
                />
              )}
            />

            {/* Status */}
            <Controller
              name='status'
              control={control}
              render={({ field }) => (
                <CustomTextField select fullWidth label='Select Status' {...field}>
                  <MenuItem value='Active'>Active</MenuItem>
                  <MenuItem value='Inactive'>Inactive</MenuItem>
                </CustomTextField>
              )}
            />

            {/* Buttons */}
            <div className='flex items-center gap-4 mt-2'>
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

export default AddSalaryComponentDrawer





