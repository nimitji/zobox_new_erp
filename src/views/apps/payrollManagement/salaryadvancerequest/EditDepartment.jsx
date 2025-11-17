


'use client'

import { useEffect, useState } from 'react'
import {
  Drawer, Typography, Divider, Button, IconButton, Grid, MenuItem,
  Box, Snackbar, Alert, Chip
} from '@mui/material'
import TextField from '@mui/material/TextField'
import { useSession } from 'next-auth/react'

import {
  fetchListOfUser,
  fetchListOfSalaryComponent
} from '../../../../app/server/actions'

const EditDepartment = ({ open, handleClose, selectedDepartment, onSave }) => {
  const { data: session } = useSession()
  const token = session?.user?.accessToken
const userType = session?.user?.typeOfUser; 

  const [employees, setEmployees] = useState([])
  const [salaryComponentsList, setSalaryComponentsList] = useState([])
  const [loadingComponents, setLoadingComponents] = useState(true)

  const [formData, setFormData] = useState({
    _id: '',
    employee: '',
    requestedAmount: '',
    status: '',
    notes: ''
  })

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  })

  const handleSnackbarClose = () =>
    setSnackbar(prev => ({ ...prev, open: false }))

  // Fetch employees
  useEffect(() => {
    const loadEmployees = async () => {
      try {
        const res = await fetchListOfUser()
        setEmployees(res?.data || res || [])
      } catch (err) {
        console.error('Error fetching employees:', err)
      }
    }
    loadEmployees()
  }, [])


  // Load selected data into form
  useEffect(() => {
    if (selectedDepartment) {
      setFormData({
        _id: selectedDepartment._id || '',
        employee: selectedDepartment.employeeId || '',
        requestedAmount: selectedDepartment.requestedAmount || '',
        status: selectedDepartment.status || '',
        notes: selectedDepartment.notes || ''
      })
    }
  }, [selectedDepartment])

  // SAVE handler
  const handleSave = async () => {
    try {
      const payload = {
        _id:formData._id,
        employee: formData.employee,
        requestedAmount:formData.requestedAmount,
        status: formData.status,
        notes: formData.notes
      }

      // 🔥 This MUST return {success, message}
      const response = await onSave(payload)
  console.log("DATApooja",response)
      setSnackbar({
        open: true,
        message: response?.message || 'Updated successfully!',
        severity: response?.success ? 'success' : 'error'
      })

      if (response?.success) {
        handleClose()
      }
    } catch (err) {
      console.error(err)
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
        onClose={handleClose}
        variant="temporary"
        ModalProps={{ keepMounted: true }}
        sx={{ '& .MuiDrawer-paper': { width: { xs: 320, sm: 420 } } }}
      >
        {/* HEADER */}
        <div className="flex items-center justify-between p-5">
          <Typography variant="h5" fontWeight={600}>
            Edit Advance Salary Request
          </Typography>
          <IconButton onClick={handleClose}>
            <i className="tabler-x text-2xl" />
          </IconButton>
        </div>

        <Divider />

        {/* FORM */}
        <Box sx={{ p: 5 }}>
          <Grid container spacing={4}>

            {/* EMPLOYEE */}
            <Grid item xs={12}>
              <TextField
                select
                fullWidth
                label="Employee"
                value={formData.employee}
                onChange={e =>
                  setFormData({ ...formData, employee: e.target.value })
                }
              >
                {employees.map(emp => (
                  <MenuItem key={emp._id} value={emp._id}>
                    {emp.username}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            {/* SALARY INPUTS */}
            {['requestedAmount'].map(field => (
              <Grid item xs={12} key={field}>
                <TextField
                  fullWidth
                  label={field.replace(/([A-Z])/g, ' $1')}
                  value={formData[field]}
                  onChange={e =>
                    setFormData({ ...formData, [field]: e.target.value })
                  }
                />
              </Grid>
            ))}

        

            {/* STATUS */}
            <Grid item xs={12}>
              <TextField
                select
                fullWidth
                label="Status"
                value={formData.status}
                onChange={e =>
                  setFormData({ ...formData, status: e.target.value })
                }
              >
                <MenuItem value="Pending">Pending</MenuItem>
                  {userType !== 'Employee' && (
                  <MenuItem value='Approved'>Approved</MenuItem>
                )}
                <MenuItem value="Rejected">Rejected</MenuItem>
              </TextField>
            </Grid>

            {/* NOTES */}
            <Grid item xs={12}>
              <TextField
                multiline
                rows={2}
                fullWidth
                label="Notes"
                value={formData.notes}
                onChange={e =>
                  setFormData({ ...formData, notes: e.target.value })
                }
              />
            </Grid>
          </Grid>

          {/* BUTTONS */}
          <div className="flex gap-3 mt-5">
            <Button variant="contained" onClick={handleSave}>
              Save Changes
            </Button>
            <Button variant="tonal" color="error" onClick={handleClose}>
              Cancel
            </Button>
          </div>
        </Box>
      </Drawer>

      {/* SNACKBAR */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert
          severity={snackbar.severity}
          variant="filled"
          sx={{
            backgroundColor:
              snackbar.severity === 'success' ? '#2B3380' : '#D32F2F',
            color: 'white'
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  )
}

export default EditDepartment








