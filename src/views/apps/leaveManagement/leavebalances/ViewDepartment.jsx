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
        <Typography variant='h5'>View Leave Balance</Typography>
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
              value={departmentData.employeeName || ''}
              InputProps={{ readOnly: true }}
            />
          </Grid>

        

          <Grid item xs={12}>
            <CustomTextField
              label='Leave ype'
              fullWidth
              value={departmentData.leaveTypeName || ''}
              InputProps={{ readOnly: true }}
            />
          </Grid>

           

            <Grid item xs={12}>
            <CustomTextField
              label='Year'
              fullWidth
              value={departmentData.year || ''}
              InputProps={{ readOnly: true }}
            />
          </Grid>
           <Grid item xs={12}>
            <CustomTextField
              label='Allocated Days'
              fullWidth
              value={departmentData.allocatedDays || ''}
              InputProps={{ readOnly: true }}
            />
          </Grid>
            <Grid item xs={12}>
            <CustomTextField
              label='Carried Forward Days'
              fullWidth
              value={departmentData.carriedForwardDays || ''}
              InputProps={{ readOnly: true }}
            />
          </Grid>

   
        </Grid>

         <Grid item xs={12}>
            <CustomTextField
              label='Manual Adjustment'
              fullWidth
              value={departmentData.manualAdustment || ''}
              InputProps={{ readOnly: true }}
            />
          </Grid>


         <Grid item xs={12}>
            <CustomTextField
              label='Adjustment Reason'
              fullWidth
              value={departmentData.reason || ''}
              InputProps={{ readOnly: true }}
            />
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





















