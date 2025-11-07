

'use client'

import { useEffect, useState } from 'react'

// 📦 MUI Imports
import Drawer from '@mui/material/Drawer'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import Box from '@mui/material/Box'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'

// 🧠 Server Action
import { fetchListOfBranch } from '../../../../../app/server/actions'

const EditDepartment = ({ open, handleClose, selectedDepartment, onSave }) => {
  // ✅ Form Data
  const [formData, setFormData] = useState({
    _id: '',
    category: '',
    description: '',
    status: 'Active'
  })

  // ✅ Branch Dropdown Data
  const [branches, setBranches] = useState([])
  const [loadingBranches, setLoadingBranches] = useState(true)

  // ✅ Snackbar State
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  })

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false })
  }

  // ✅ Fetch Branch List
  useEffect(() => {
    const loadBranches = async () => {
      try {
        const res = await fetchListOfBranch()
        if (res?.success && Array.isArray(res.data)) {
          setBranches(res.data)
        } else if (Array.isArray(res)) {
          setBranches(res)
        } else {
          console.warn('Invalid branch data format:', res)
        }
      } catch (err) {
        console.error('Error fetching branches:', err)
      } finally {
        setLoadingBranches(false)
      }
    }

    loadBranches()
  }, [])

  // ✅ Auto-fill fields when drawer opens
  useEffect(() => {
    if (selectedDepartment) {
      setFormData({
        _id: selectedDepartment._id ?? '',
        category: selectedDepartment.category ?? '',
        description: selectedDepartment.description ?? '',
        status: selectedDepartment.status ?? 'Active'
      })
    }
  }, [selectedDepartment])

  // ✅ Handle Save
  const handleSave = async () => {
    try {
      const res = await onSave(formData) // parent handles backend call

      setSnackbar({
        open: true,
        message: res?.message || 'Category updated successfully!',
        severity: res?.success ? 'success' : 'error'
      })

      if (res?.success) handleClose()
    } catch (error) {
      console.error('Save Error:', error)
      setSnackbar({
        open: true,
        message: 'Something went wrong!',
        severity: 'error'
      })
    }
  }

  return (
    <>
      {/* 🪟 Drawer */}
      <Drawer
        open={open}
        anchor='right'
        variant='temporary'
        onClose={handleClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          '& .MuiDrawer-paper': { width: { xs: 320, sm: 420 } }
        }}
      >
        {/* ✅ Header */}
        <div className='flex items-center justify-between plb-5 pli-6'>
          <Typography variant='h5' sx={{ fontWeight: 600 }}>
            Edit Category Indicator
          </Typography>
          <IconButton size='small' onClick={handleClose}>
            <i className='tabler-x text-2xl text-textPrimary' />
          </IconButton>
        </div>

        <Divider />

        {/* ✅ Form Section */}
        <Box sx={{ p: 6 }}>
          <form className='flex flex-col gap-5'>
            {/* Category Name */}
            <TextField
              label='Category Name'
              fullWidth
              value={formData.category ?? ''}
              onChange={e => setFormData({ ...formData, category: e.target.value })}
            />

            {/* Description */}
            <TextField
              label='Description'
              fullWidth
              multiline
              minRows={2}
              value={formData.description ?? ''}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
            />

            {/* Status */}
            <TextField
              select
              label='Status'
              fullWidth
              value={formData.status ?? 'Active'}
              onChange={e => setFormData({ ...formData, status: e.target.value })}
            >
              <MenuItem value='Active'>Active</MenuItem>
              <MenuItem value='Inactive'>Inactive</MenuItem>
            </TextField>

            {/* ✅ Action Buttons */}
            <div className='flex items-center gap-4 mt-4'>
              <Button variant='contained' onClick={handleSave}>
                Save Changes
              </Button>
              <Button variant='tonal' color='error' onClick={handleClose}>
                Cancel
              </Button>
            </div>
          </form>
        </Box>
      </Drawer>

      {/* ✅ Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbar.severity}
          variant='filled'
          sx={{
            backgroundColor: snackbar.severity === 'success' ? '#2B3380' : '#d32f2f',
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



