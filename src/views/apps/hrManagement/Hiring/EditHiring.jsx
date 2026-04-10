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

// 🧠 API
import { fetchListOfDepartment } from '../../../../app/server/actions.js'

const EditHiring = ({ open, handleClose, selectedHiring, onSave }) => {
  const [formData, setFormData] = useState({
    _id: '',
    jobTitle: '',
    department: '',
    experience: '',
    salary: '',
    status: 'Open'
  })

  // ✅ Departments dropdown
  const [departments, setDepartments] = useState([])
  const [loadingDepartments, setLoadingDepartments] = useState(true)

  // ✅ Snackbar
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  })

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false })
  }

  // 📥 Load departments
  useEffect(() => {
    const loadDepartments = async () => {
      try {
        const res = await fetchListOfDepartment()

        if (res?.success && Array.isArray(res.data)) {
          setDepartments(res.data)
        } else if (Array.isArray(res)) {
          setDepartments(res)
        } else {
          console.warn('Invalid department data:', res)
        }
      } catch (err) {
        console.error('Error fetching departments:', err)
      } finally {
        setLoadingDepartments(false)
      }
    }

    loadDepartments()
  }, [])

  // ✅ Auto-fill when edit opens
  useEffect(() => {
    if (selectedHiring && departments.length > 0) {
      const matchedDepartment = departments.find(d => d.name?.trim() === selectedHiring.department?.trim())

      setFormData({
        _id: selectedHiring._id || '',
        jobTitle: selectedHiring.jobTitle || '',
        department: matchedDepartment?._id || '',
        experience: selectedHiring.experience || '',
        salary: selectedHiring.salary || '',
        status: selectedHiring.status || 'Open'
      })
    }
  }, [selectedHiring, departments])

  // ✅ Save
  const handleSave = async () => {
    try {
      const res = await onSave(formData)

      setSnackbar({
        open: true,
        message: res?.message || 'Job updated successfully!',
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
        anchor='right'
        variant='temporary'
        onClose={handleClose}
        ModalProps={{ keepMounted: true }}
        sx={{ '& .MuiDrawer-paper': { width: { xs: 320, sm: 420 } } }}
      >
        {/* Header */}
        <div className='flex items-center justify-between plb-5 pli-6'>
          <Typography variant='h5' sx={{ fontWeight: 600 }}>
            Edit Job
          </Typography>
          <IconButton size='small' onClick={handleClose}>
            <i className='tabler-x text-2xl text-textPrimary' />
          </IconButton>
        </div>

        <Divider />

        {/* Form */}
        <Box sx={{ p: 6 }}>
          <form className='flex flex-col gap-5'>
            <TextField
              label='Job Title'
              fullWidth
              value={formData.jobTitle}
              onChange={e => setFormData({ ...formData, jobTitle: e.target.value })}
            />

            <TextField
              select
              label='Department'
              fullWidth
              value={formData.department || ''}
              onChange={e => setFormData({ ...formData, department: e.target.value })}
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
            </TextField>

            <TextField
              label='Experience'
              fullWidth
              value={formData.experience}
              onChange={e => setFormData({ ...formData, experience: e.target.value })}
            />

            <TextField
              label='Salary'
              fullWidth
              value={formData.salary}
              onChange={e => setFormData({ ...formData, salary: e.target.value })}
            />

            <TextField
              select
              label='Status'
              fullWidth
              value={formData.status}
              onChange={e => setFormData({ ...formData, status: e.target.value })}
            >
              <MenuItem value='Open'>Open</MenuItem>
              <MenuItem value='Closed'>Closed</MenuItem>
            </TextField>

            {/* Buttons */}
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

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbar.severity} variant='filled'>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  )
}

export default EditHiring
