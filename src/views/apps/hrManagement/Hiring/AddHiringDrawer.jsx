'use client'

import { useState, useEffect } from 'react'


import { useParams } from 'next/navigation'


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

// 🧠 Server Action (Change this API)
import { createHiring, fetchListOfDepartment } from '../../../../app/server/actions.js'

// 🧱 Component Imports
import CustomTextField from '@core/components/mui/TextField'

const initialData = {}

const AddHiringDrawer = props => {
  const { open, handleClose, refreshHiring } = props

  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' })
  const [departments, setDepartments] = useState([])
  const [loadingDepartments, setLoadingDepartments] = useState(true)

  // 🔧 react-hook-form setup
  const {
    control,
    reset: resetForm,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      jobTitle: '',
      department: '',
      experience: '',
      salary: '',
      status: 'Open'
    }
  })

  // 🧠 Fetch Department List
  useEffect(() => {
    const loadDepartments = async () => {
      try {
        const response = await fetchListOfDepartment()

        if (response?.success && Array.isArray(response.data)) {
          setDepartments(response.data)
        } else if (Array.isArray(response)) {
          setDepartments(response)
        } else {
          console.warn('Invalid department data format:', response)
        }
      } catch (err) {
        console.error('Error fetching departments:', err)
      } finally {
        setLoadingDepartments(false)
      }
    }

    loadDepartments()
  }, [])

  // ✅ Form submit
  const onSubmit = async data => {
    try {
      const payload = {
        jobTitle: data.jobTitle,
        department: data.department,
        experience: data.experience,
        salary: data.salary,
        status: data.status
      }

      const response = await createHiring(payload)

      if (response?.success) {
        setSnackbar({ open: true, message: response.message || 'Job created successfully', severity: 'success' })

        if (typeof refreshHiring === 'function') {
          await refreshHiring()
        }

        handleClose()
        resetForm()
      } else {
        setSnackbar({ open: true, message: response.message || 'Failed to create job', severity: 'error' })
      }
    } catch (error) {
      console.error('Error creating job:', error)
      setSnackbar({ open: true, message: 'Error creating job', severity: 'error' })
    }
  }

  const handleReset = () => {
    handleClose()
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
          <Typography variant='h5'>Add Job</Typography>
          <IconButton size='small' onClick={handleReset}>
            <i className='tabler-x text-2xl text-textPrimary' />
          </IconButton>
        </div>

        <Divider />

        {/* 🧾 Form */}
        <div>
          <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-6 p-6'>
            {/* Job Title */}
            <Controller
              name='jobTitle'
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <CustomTextField
                  {...field}
                  fullWidth
                  label='Job Title'
                  placeholder='Frontend Developer'
                  error={!!errors.jobTitle}
                  helperText={errors.jobTitle && 'This field is required.'}
                />
              )}
            />

            {/* Department Dropdown */}
            <Controller
              name='department'
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <CustomTextField
                  select
                  fullWidth
                  label='Department'
                  {...field}
                  error={!!errors.department}
                  helperText={errors.department && 'Department is required.'}
                >
                  {loadingDepartments ? (
                    <MenuItem disabled>Loading...</MenuItem>
                  ) : departments.length > 0 ? (
                    departments.map(dep => (
                      <MenuItem key={dep._id} value={dep._id}>
                        {dep.name}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem disabled>No departments found</MenuItem>
                  )}
                </CustomTextField>
              )}
            />

            {/* Experience */}
            <Controller
              name='experience'
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <CustomTextField
                  {...field}
                  fullWidth
                  label='Experience'
                  placeholder='2-4 Years'
                  error={!!errors.experience}
                  helperText={errors.experience && 'Required'}
                />
              )}
            />

            {/* Salary */}
            <Controller
              name='salary'
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <CustomTextField
                  {...field}
                  fullWidth
                  label='Salary'
                  placeholder='5-8 LPA'
                  error={!!errors.salary}
                  helperText={errors.salary && 'Required'}
                />
              )}
            />

            {/* Status */}
            <Controller
              name='status'
              control={control}
              render={({ field }) => (
                <CustomTextField select fullWidth label='Status' {...field}>
                  <MenuItem value='Open'>Open</MenuItem>
                  <MenuItem value='Closed'>Closed</MenuItem>
                </CustomTextField>
              )}
            />

            {/* Buttons */}
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

      {/* Snackbar */}
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
        >
          {snackbar.message}
        </MuiAlert>
      </Snackbar>
    </>
  )
}

export default AddHiringDrawer
