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
        <Typography variant='h5'>View Shift</Typography>
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
              label='Shift Name'
              fullWidth
              value={departmentData.shiftName || ''}
              InputProps={{ readOnly: true }}
            />
          </Grid>

        

          <Grid item xs={12}>
            <CustomTextField
              label='Description'
              fullWidth
              value={departmentData.description || ''}
              InputProps={{ readOnly: true }}
            />
          </Grid>

          <Grid item xs={12}>
            <CustomTextField
              label='Start Time'
              fullWidth
              value={departmentData.startTime || ''}
              InputProps={{ readOnly: true }}
            />
          </Grid>
          <Grid item xs={12}>
            <CustomTextField
              label='End Time'
              fullWidth
              value={departmentData.endTime || ''}
              InputProps={{ readOnly: true }}
            />
          </Grid>
          <Grid item xs={12}>
            <CustomTextField
              label='Break Duration (minutes)'
              fullWidth
              value={departmentData.breakDuration || ''}
              InputProps={{ readOnly: true }}
            />
          </Grid>

            <Grid item xs={12}>
            <CustomTextField
              label='Break Start Time'
              fullWidth
              value={departmentData.breakStartTime || ''}
              InputProps={{ readOnly: true }}
            />
          </Grid>
          <Grid item xs={12}>
            <CustomTextField
              label='Break End Time'
              fullWidth
              value={departmentData.breakEndTime || ''}
              InputProps={{ readOnly: true }}
            />
          </Grid>

            <Grid item xs={12}>
            <CustomTextField
              label='Afternoon Break Start Time'
              fullWidth
              value={departmentData.afternoonBreakStartTime || ''}
              InputProps={{ readOnly: true }}
            />
          </Grid>
          <Grid item xs={12}>
            <CustomTextField
              label='Afternoon Break End Time'
              fullWidth
              value={departmentData.afternoonBreakEndTime || ''}
              InputProps={{ readOnly: true }}
            />
          </Grid>

            <Grid item xs={12}>
            <CustomTextField
              label='Evening Break Start Time'
              fullWidth
              value={departmentData.eveningBreakStartTime || ''}
              InputProps={{ readOnly: true }}
            />
          </Grid>
          <Grid item xs={12}>
            <CustomTextField
              label='Evening Break End Time'
              fullWidth
              value={departmentData.eveningBreakEndTime || ''}
              InputProps={{ readOnly: true }}
            />
          </Grid>
            <Grid item xs={12}>
            <CustomTextField
              label='Grace Period (minutes)'
              fullWidth
              value={departmentData.gracePeriod || ''}
              InputProps={{ readOnly: true }}
            />
          </Grid>
           <Grid item xs={12}>
            <CustomTextField
              label='Night Shift'
              fullWidth
              value={departmentData.nightShift || ''}
              InputProps={{ readOnly: true }}
            />
          </Grid>
            <Grid item xs={12}>
            <CustomTextField
              label='Working Hours'
              fullWidth
              value={departmentData.workingHours || ''}
              InputProps={{ readOnly: true }}
            />
          </Grid>
             <Grid item xs={12}>
            <CustomTextField
              label='Type'
              fullWidth
              value={departmentData.type || ''}
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





















