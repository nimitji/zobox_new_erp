

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

const AddBranchDrawer = props => {
  const { open, handleClose, refreshBranches } = props

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  })

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
      Country: 'India',
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
        phone: data.phone,
        emailid: data.emailid,
        status: data.status
      }

      const response = await createBranch(payload)

      if (response?.success) {
        setSnackbar({
          open: true,
          message: response.message || 'Branch created successfully',
          severity: 'success'
        })

        // Refresh parent list if provided
        if (typeof refreshBranches === 'function') {
          await refreshBranches()
        }

        handleClose()
        resetForm()
      } else {
        setSnackbar({
          open: true,
          message: response.message || 'Failed to create branch',
          severity: 'error'
        })
      }
    } catch (error) {
      console.error('Error creating branch:', error)
      setSnackbar({
        open: true,
        message: 'Error creating branch',
        severity: 'error'
      })
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
        anchor="right"
        variant="temporary"
        onClose={handleReset}
        ModalProps={{ keepMounted: true }}
        sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 400 } } }}
      >
        <div className="flex items-center justify-between plb-5 pli-6">
          <Typography variant="h5">Add Branch</Typography>
          <IconButton size="small" onClick={handleReset}>
            <i className="tabler-x text-2xl text-textPrimary" />
          </IconButton>
        </div>
        <Divider />

        {/* 🧾 Form Section */}
        <div>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 p-6">
            <Controller
              name="branchName"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <CustomTextField
                  {...field}
                  fullWidth
                  label="Branch Name"
                  placeholder="Noida Sector 63"
                  error={!!errors.branchName}
                  helperText={errors.branchName && 'This field is required.'}
                />
              )}
            />

            <Controller
              name="Plot"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <CustomTextField
                  {...field}
                  fullWidth
                  label="Address"
                  placeholder="218, E-Block Noida Sector 63"
                  error={!!errors.Plot}
                  helperText={errors.Plot && 'This field is required.'}
                />
              )}
            />

            <Controller
              name="City"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <CustomTextField
                  {...field}
                  fullWidth
                  label="City"
                  placeholder="Noida"
                  error={!!errors.City}
                  helperText={errors.City && 'This field is required.'}
                />
              )}
            />

            <Controller
              name="State"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <CustomTextField
                  {...field}
                  fullWidth
                  label="State/Province"
                  placeholder="Uttar Pradesh"
                  error={!!errors.State}
                  helperText={errors.State && 'This field is required.'}
                />
              )}
            />

            <Controller
              name="Country"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <CustomTextField select fullWidth label="Select Country" {...field}>
                  <MenuItem value="India">India</MenuItem>
                </CustomTextField>
              )}
            />

            <Controller
              name="Pincode"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <CustomTextField
                  {...field}
                  fullWidth
                  label="ZIP / Postal Code"
                  placeholder="201301"
                  error={!!errors.Pincode}
                  helperText={errors.Pincode && 'This field is required.'}
                />
              )}
            />

            <Controller
              name="phone"
              control={control}
              rules={{
                required: true,
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: 'Enter a valid 10-digit phone number'
                }
              }}
              render={({ field }) => (
                <CustomTextField
                  {...field}
                  fullWidth
                  label="Contact Number"
                  type="number"
                  placeholder="9876543210"
                  error={!!errors.phone}
                  helperText={errors.phone && errors.phone.message}
                />
              )}
            />

            <Controller
              name="emailid"
              control={control}
              rules={{
                required: true,
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Enter a valid email address'
                }
              }}
              render={({ field }) => (
                <CustomTextField
                  {...field}
                  fullWidth
                  type="email"
                  label="Email"
                  placeholder="admin@zobox.in"
                  error={!!errors.emailid}
                  helperText={errors.emailid && errors.emailid.message}
                />
              )}
            />

            <Controller
              name="status"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <CustomTextField select fullWidth label="Select Status" {...field}>
                  <MenuItem value="Active">Active</MenuItem>
                  <MenuItem value="Inactive">Inactive</MenuItem>
                </CustomTextField>
              )}
            />

            {/* ✅ Action Buttons */}
            <div className="flex items-center gap-4">
              <Button variant="contained" type="submit">
                Submit
              </Button>
              <Button variant="tonal" color="error" onClick={handleReset}>
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
          variant="filled"
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



