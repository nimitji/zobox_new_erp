

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
import { createAwardTypes,fetchAwardTypes } from '../../../../app/server/actions.js'

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
   const [branches, setBranches] = useState([]) // 🔹 Dynamic dropdown data
  const [loadingBranches, setLoadingBranches] = useState(true)

  // 🔧 react-hook-form setup
  const {
    control,
    reset: resetForm,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      name: '',
      description: '',
      status: 'Active'
    }
  })

  // 🧠 Fetch Branch List from backend
    useEffect(() => {
    const loadBranches = async () => {
      try {
        const response = await fetchAwardTypes() // server action call
        // Expected response: { success: true, data: [ { _id, branchName } ] }
        if (response?.success && Array.isArray(response.data)) {
          setBranches(response.data)
        } else if (Array.isArray(response)) {
          // handle array return directly
          setBranches(response)
        } else {
          console.warn('Invalid branch data format:', response)
        }
      } catch (err) {
        console.error('Error fetching branches:', err)
      } finally {
        setLoadingBranches(false)
      }
    }

    loadBranches()
  }, [])

  // ✅ Form submit
  const onSubmit = async data => {
    try {
      const payload = {
        name: data.name,
        description: data.description,
        status: data.status
      }

      const response = await createAwardTypes(payload)

      if (response?.success) {
        setSnackbar({ open: true, message: response.message || 'Branch created successfully', severity: 'success' })

        // Refresh list (parent function)
        if (typeof refreshDepartments === 'function') {
          await refreshDepartments()
        }

        handleClose()
        setFormData(initialData)
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
          <Typography variant='h5'>Add Award Types</Typography>
          <IconButton size='small' onClick={handleReset}>
            <i className='tabler-x text-2xl text-textPrimary' />
          </IconButton>
        </div>
        <Divider />

        {/* 🧾 Form Section */}
        <div>
          <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-6 p-6'>
            <Controller
              name='name'
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <CustomTextField
                  {...field}
                  fullWidth
                  label='Award Type Name'
                  placeholder='Employee of the Year'
                  error={!!errors.name}
                  helperText={errors.name && 'This field is required.'}
                />
              )}
            />

            {/* //Dynamic dropdown  */}
            

            <Controller
              name='description'
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <CustomTextField
                  {...field}
                  fullWidth
                  label='Description'
                  placeholder='Annual recognition for exceptional contribution '
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


