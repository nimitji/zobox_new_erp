

'use client'

import { useState,useEffect } from 'react'

// 📦 MUI Imports
import Button from '@mui/material/Button'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'

// 🧩 Third-party Imports
import { useForm, Controller } from 'react-hook-form'

// 🧠 Server Action
import { createGoalType,fetchListOfBranch } from '../../../../../app/server/actions.js'

// 🧱 Component Imports
import CustomTextField from '@core/components/mui/TextField'
import { description } from 'valibot'

const initialData = {
  country: '',
  contact: ''
}

const AddDepartmentDrawer = props => {
  const { open, handleClose, userData, setData, refreshDepartments } = props

  const [formData, setFormData] = useState(initialData)
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' })
  

  // 🔧 react-hook-form setup
  const {
    control,
    reset: resetForm,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      goalTypeName: '',
      description: '',
      status: 'Active'
    }
  })

 
  // ✅ Form submit
  const onSubmit = async data => {
    try {
      const payload = {
        goalTypeName: data.goalTypeName,
        description: data.description,
        status: data.status
      }

      const response = await createGoalType(payload)

      if (response?.success) {
        setSnackbar({ open: true, message: response.message || 'Goal Type created successfully', severity: 'success' })

        // Refresh list (parent function)
        if (typeof refreshDepartments === 'function') {
          await refreshDepartments()
        }

        handleClose()
        setFormData(initialData)
        resetForm()
      } else {
        setSnackbar({ open: true, message: response.message || 'Failed to create goal type', severity: 'error' })
      }
    } catch (error) {
      console.error('Error creating goal type:', error)
      setSnackbar({ open: true, message: 'Error creating goal type', severity: 'error' })
    }
  }

  const handleReset = () => {
    handleClose()
    setFormData(initialData)
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
          <Typography variant='h5'>Add Goal Type</Typography>
          <IconButton size='small' onClick={handleReset}>
            <i className='tabler-x text-2xl text-textPrimary' />
          </IconButton>
        </div>
        <Divider />

        {/* 🧾 Form Section */}
        <div>
          <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-6 p-6'>
            <Controller
              name='goalTypeName'
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <CustomTextField
                  {...field}
                  fullWidth
                  label='Goal Type Name'
                  placeholder='Compliance and Safety Goals'
                  error={!!errors.goalTypeName}
                  helperText={errors.goalTypeName && 'This field is required.'}
                />
              )}
            />

         

            <Controller
              name='description'
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <CustomTextField
                  {...field}
                  fullWidth
                  label='Description'
                  placeholder=''
                  error={!!errors.description}
                  helperText={errors.description && 'This field is required.'}
                />
              )}
            />

   

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


