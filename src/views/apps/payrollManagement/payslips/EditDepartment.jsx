

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
    shiftName: '',
    description: '',
    startTime: '',
    endTime: '',
    breakDuration: '',
    breakStartTime: '',
    breakEndTime: '',
    afternoonBreakStartTime: '',
    afternoonBreakEndTime: '',
    eveningBreakStartTime: '',
    eveningBreakEndTime: '',
    gracePeriod: '',
    isNightShift: false,
    status: 'Active'
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
        shiftName: selectedDepartment.shiftName || '',
        description: selectedDepartment.description || '',
        startTime: selectedDepartment.startTime || '',
        endTime: selectedDepartment.endTime || '',
        breakDuration: selectedDepartment.breakDuration || '',
        breakStartTime: selectedDepartment.breakStartTime || '',
        breakEndTime: selectedDepartment.breakEndTime || '',
        afternoonBreakStartTime: selectedDepartment.afternoonBreakStartTime || '',
        afternoonBreakEndTime: selectedDepartment.afternoonBreakEndTime || '',
        eveningBreakStartTime: selectedDepartment.eveningBreakStartTime || '',
        eveningBreakEndTime: selectedDepartment.eveningBreakEndTime || '',
        gracePeriod: selectedDepartment.gracePeriod || '',
        isNightShift: !!selectedDepartment.isNightShift,
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

  // ✅ Reusable TimePicker Component
  const renderTimePicker = (label, fieldName) => (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <TimePicker
        label={label}
        value={formData[fieldName] ? dayjs(formData[fieldName], 'HH:mm') : null}
        onChange={newValue =>
          setFormData({
            ...formData,
            [fieldName]:
              newValue && dayjs(newValue).isValid()
                ? dayjs(newValue).format('HH:mm')
                : ''
          })
        }
        enableAccessibleFieldDOMStructure={false}
        slots={{ textField: TextField }}
        slotProps={{
          textField: {
            fullWidth: true,
            variant: 'outlined',
            sx: {
              '& .MuiOutlinedInput-root fieldset': {
                borderColor: '#bdbdbd'
              },
              '& .MuiOutlinedInput-root:hover fieldset': {
                borderColor: '#2B3380'
              },
              '& .MuiOutlinedInput-root.Mui-focused fieldset': {
                borderColor: '#2B3380',
                borderWidth: 2
              }
            }
          }
        }}
      />
    </LocalizationProvider>
  )

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
            Edit Shift Details
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
              label="Shift Name"
              fullWidth
              value={formData.shiftName}
              onChange={e => setFormData({ ...formData, shiftName: e.target.value })}
            />

            <TextField
              label="Description"
              fullWidth
              value={formData.description}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
            />

            {renderTimePicker('Start Time', 'startTime')}
            {renderTimePicker('End Time', 'endTime')}

            <TextField
              label="Break Duration (minutes)"
              fullWidth
              value={formData.breakDuration}
              onChange={e =>
                setFormData({ ...formData, breakDuration: e.target.value })
              }
            />

            {renderTimePicker('Break Start Time', 'breakStartTime')}
            {renderTimePicker('Break End Time', 'breakEndTime')}
            {renderTimePicker('Afternoon Break Start Time', 'afternoonBreakStartTime')}
            {renderTimePicker('Afternoon Break End Time', 'afternoonBreakEndTime')}
            {renderTimePicker('Evening Break Start Time', 'eveningBreakStartTime')}
            {renderTimePicker('Evening Break End Time', 'eveningBreakEndTime')}

            <TextField
              label="Grace Period (minutes)"
              fullWidth
              value={formData.gracePeriod}
              onChange={e =>
                setFormData({ ...formData, gracePeriod: e.target.value })
              }
            />

            {/* ✅ Night Shift Checkbox */}
            <FormControlLabel
              control={
                <Checkbox
                  checked={!!formData.isNightShift}
                  onChange={e =>
                    setFormData({
                      ...formData,
                      isNightShift: e.target.checked
                    })
                  }
                />
              }
              label={<Typography>Night Shift</Typography>}
            />

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



