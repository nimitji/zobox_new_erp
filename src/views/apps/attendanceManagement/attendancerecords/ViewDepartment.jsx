// React Imports
import React from 'react'

// MUI Imports
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

// Component Imports
import CustomTextField from '@core/components/mui/TextField'

const ViewDepartment = ({ open, handleClose, departmentData }) => {
  if (!departmentData) return null

  return (
    <Drawer
      open={open}
      anchor='right'
      variant='temporary'
      onClose={handleClose}
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: { xs: 320, sm: 420 }, p: 4 } }}
    >
      {/* Header */}
      <div className='flex items-center justify-between pb-3'>
        <Typography variant='h5'>Attendance Records Details</Typography>
        <IconButton size='small' onClick={handleClose}>
          <i className='tabler-x text-2xl text-textPrimary' />
        </IconButton>
      </div>

      <Divider sx={{ mb: 3 }} />

      {/* Content */}
      <Box className='flex flex-col gap-4'>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <CustomTextField
              label='Employee'
              fullWidth
              value={departmentData.employee || ''}
              InputProps={{ readOnly: true }}
            />
          </Grid>

          <Grid item xs={12}>
            <CustomTextField
              label='Date'
              fullWidth
              value={departmentData.date || ''}
              InputProps={{ readOnly: true }}
            />
          </Grid>

          <Grid item xs={12}>
            <CustomTextField
              label='Clock In Time'
              fullWidth
              value={departmentData.clockIn || ''}
              InputProps={{ readOnly: true }}
            />
          </Grid>
            <Grid item xs={12}>
            <CustomTextField
              label='Clock Out Time'
              fullWidth
              value={departmentData.clockOut || ''}
              InputProps={{ readOnly: true }}
            />
          </Grid>
            <Grid item xs={12}>
            <CustomTextField
              label='Break Hours'
              fullWidth
              value={departmentData.breakHours || ''}
              InputProps={{ readOnly: true }}
            />
          </Grid>

     <Grid item xs={12}>
            <CustomTextField
              label='Status'
              fullWidth
              value={departmentData.status || ''}
              InputProps={{ readOnly: true }}
            />
          </Grid>

           <Grid item xs={12}>
  <CustomTextField
    label='Holiday'
    fullWidth
    value={departmentData.isHoliday ? 'Yes' : 'No'}
    InputProps={{ readOnly: true }}
  />
</Grid>

  <Grid item xs={12}>
            <CustomTextField
              label='Notes'
              fullWidth
              value={departmentData.notes || ''}
              InputProps={{ readOnly: true }}
            />
          </Grid>

        </Grid>

        <Divider sx={{ my: 3 }} />

        <Button variant='contained' onClick={handleClose}>
          Close
        </Button>
      </Box>
    </Drawer>
  )
}

export default ViewDepartment





















