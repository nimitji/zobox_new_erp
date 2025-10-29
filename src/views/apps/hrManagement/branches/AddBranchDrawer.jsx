

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

// 🧩 Third-party Imports
import { useForm, Controller } from 'react-hook-form'

// 🧠 Server Action
import { createBranch } from '../../../../app/server/actions.js'

// 🧱 Component Imports
import CustomTextField from '@core/components/mui/TextField'

const initialData = {
  country: '',
  contact: ''
}

const AddBranchDrawer = props => {
  const { open, handleClose, userData, setData, refreshBranches } = props

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
      branchName: '',
      Plot: '',
      City: '',
      State: '',
      Country: '',
      Pincode: '',
      phone: '',
      emailid: '',
      status: 'Active'
    }
  })

  // ✅ Form submit
  const onSubmit = async data => {
    try {
      const payload = {
        branchName: data.branchName,
        Plot: data.Plot,
        City: data.City,
        State: data.State,
        Country: data.Country,
        Pincode: data.Pincode,
        phone: data.contact,
        emailid: data.emailid,
        status: data.status
      }

      const response = await createBranch(payload)

      if (response?.success) {
        setSnackbar({ open: true, message: response.message || 'Branch created successfully', severity: 'success' })

        // Refresh list (parent function)
        if (typeof refreshBranches === 'function') {
          await refreshBranches()
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
          <Typography variant='h5'>Add Branch</Typography>
          <IconButton size='small' onClick={handleReset}>
            <i className='tabler-x text-2xl text-textPrimary' />
          </IconButton>
        </div>
        <Divider />

        {/* 🧾 Form Section */}
        <div>
          <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-6 p-6'>
            <Controller
              name='branchName'
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <CustomTextField
                  {...field}
                  fullWidth
                  label='Branch Name'
                  placeholder='Noida Sector 63'
                  error={!!errors.branchName}
                  helperText={errors.branchName && 'This field is required.'}
                />
              )}
            />

            <Controller
              name='Plot'
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <CustomTextField
                  {...field}
                  fullWidth
                  label='Address'
                  placeholder='218, E-Block Noida Sector 63'
                  error={!!errors.Plot}
                  helperText={errors.Plot && 'This field is required.'}
                />
              )}
            />

            <Controller
              name='City'
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <CustomTextField
                  {...field}
                  fullWidth
                  label='City'
                  placeholder='Noida'
                  error={!!errors.City}
                  helperText={errors.City && 'This field is required.'}
                />
              )}
            />

            <Controller
              name='State'
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <CustomTextField
                  {...field}
                  fullWidth
                  label='State/Province'
                  placeholder='Uttar Pradesh'
                  error={!!errors.State}
                  helperText={errors.State && 'This field is required.'}
                />
              )}
            />

            <CustomTextField
              select
              fullWidth
              id='Country'
              value={formData.country}
              onChange={e => setFormData({ ...formData, country: e.target.value })}
              label='Select Country'
            >
              <MenuItem value='India'>India</MenuItem>
            </CustomTextField>

            <Controller
              name='Pincode'
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <CustomTextField
                  {...field}
                  fullWidth
                  label='ZIP / Postal Code'
                  placeholder='201301'
                  error={!!errors.Pincode}
                  helperText={errors.Pincode && 'This field is required.'}
                />
              )}
            />

            <CustomTextField
              label='Contact Number'
              type='number'
              fullWidth
              placeholder='(397) 294-5153'
              value={formData.contact}
              onChange={e => setFormData({ ...formData, contact: e.target.value })}
            />

            <Controller
              name='emailid'
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <CustomTextField
                  {...field}
                  fullWidth
                  type='email'
                  label='Email'
                  placeholder='admin@zobox.in'
                  error={!!errors.emailid}
                  helperText={errors.emailid && 'This field is required.'}
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

export default AddBranchDrawer


