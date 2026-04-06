

'use client'

import { useEffect, useState } from 'react'

// MUI Imports
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
import { FormControlLabel, Checkbox } from '@mui/material'

// MUI X Date Imports
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { TimePicker } from '@mui/x-date-pickers/TimePicker'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'

const EditDepartment = ({ open, handleClose, selectedDepartment, onSave }) => {
  const [formData, setFormData] = useState({
    _id: '',
    leaveTypeName: '',
    description: '',
    maxDays: '',
    isPaidStatus: '',
     status: ''
  })

  // ✅ Snackbar state
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  })

  const handleSnackbarClose = () => setSnackbar(prev => ({ ...prev, open: false }))

  // ✅ Load data when editing
  useEffect(() => {
    if (selectedDepartment) {
      setFormData({
        _id: selectedDepartment._id || '',
        leaveTypeName: selectedDepartment.leaveTypeName || '',
        description: selectedDepartment.description || '',
        maxDays: selectedDepartment.maxDays || '',
        isPaidStatus: selectedDepartment.isPaidStatus || '',
        status: selectedDepartment.status || 'Active'
      })
    }
  }, [selectedDepartment])

  // ✅ Handle save
  const handleSave = async () => {
    try {
      const res = await onSave(formData)

      setSnackbar({
        open: true,
        message: res?.message || 'Shift updated successfully!',
        severity: res?.success ? 'success' : 'error'
      })

      if (res?.success) handleClose()
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Something went wrong!',
        severity: 'error'
      })
    }
  }

 

  return (
    <>
      <Drawer
        open={open}
        anchor="right"
        variant="temporary"
        onClose={handleClose}
        ModalProps={{ keepMounted: true }}
        sx={{ '& .MuiDrawer-paper': { width: { xs: 320, sm: 420 } } }}
      >
        {/* Header */}
        <div className="flex items-center justify-between plb-5 pli-6">
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            Edit Leave Types
          </Typography>
          <IconButton size="small" onClick={handleClose}>
            <i className="tabler-x text-2xl text-textPrimary" />
          </IconButton>
        </div>

        <Divider />

        {/* Form */}
        <Box sx={{ p: 6 }}>
          <form className="flex flex-col gap-5">
            <TextField
              label="Leave Type Name"
              fullWidth
              value={formData.leaveTypeName}
              onChange={e => setFormData({ ...formData, leaveTypeName: e.target.value })}
            />

            <TextField
              label="Description"
              fullWidth
              value={formData.description}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
            />


            <TextField
              label="Maximum Days Per Year"
              fullWidth
              value={formData.maxDays}
              onChange={e =>
                setFormData({ ...formData, maxDays: e.target.value })
              }
            />

       <TextField
              select
              label="Select Paid Status"
              fullWidth
              value={formData.isPaidStatus}
              onChange={e =>
                setFormData({ ...formData, isPaidStatus: e.target.value })
              }
            >
              <MenuItem value="Paid">Paid</MenuItem>
              <MenuItem value="Unpaid">Unpaid</MenuItem>
            </TextField>  
   

         

            <TextField
              select
              label="Status"
              fullWidth
              value={formData.status}
              onChange={e =>
                setFormData({ ...formData, status: e.target.value })
              }
            >
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Inactive">Inactive</MenuItem>
            </TextField>

            {/* Buttons */}
            <div className="flex items-center gap-4 mt-4">
              <Button variant="contained" onClick={handleSave}>
                Save Changes
              </Button>
              <Button variant="tonal" color="error" onClick={handleClose}>
                Cancel
              </Button>
            </div>
          </form>
        </Box>
      </Drawer>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbar.severity}
          variant="filled"
          sx={{
            backgroundColor:
              snackbar.severity === 'success' ? '#2B3380' : '#d32f2f',
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



