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
        <Typography variant='h5'>View Holiday</Typography>
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
              label='Holiday Name'
              fullWidth
              value={departmentData.holidayName || ''}
              InputProps={{ readOnly: true }}
            />
          </Grid>

          <Grid item xs={12}>
            <CustomTextField
              label='Category'
              fullWidth
              value={departmentData.category || ''}
              InputProps={{ readOnly: true }}
            />
          </Grid>

            <Grid item xs={12}>
            <CustomTextField
              label='Start Date'
              fullWidth
              value={departmentData.startDate || ''}
              InputProps={{ readOnly: true }}
            />
          </Grid>

            <Grid item xs={12}>
            <CustomTextField
              label='End Date'
              fullWidth
              value={departmentData.endDate || ''}
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
              label='Recurring Annual Holiday'
              fullWidth
              value={departmentData.recurringAnnualHoliday || ''}
              InputProps={{ readOnly: true }}
            />
          </Grid>
            <Grid item xs={12}>
            <CustomTextField
              label='Paid Holiday'
              fullWidth
              value={departmentData.paidHoliday || ''}
              InputProps={{ readOnly: true }}
            />
          </Grid>
               <Grid item xs={12}>
            <CustomTextField
              label='Half Day'
              fullWidth
              value={departmentData.halfDay || ''}
              InputProps={{ readOnly: true }}
            />
          </Grid>

         <Grid item xs={12}>
  <CustomTextField
    label='Branches'
    fullWidth
    value={
      Array.isArray(departmentData.branchNames) && departmentData.branchNames.length > 0
        ? departmentData.branchNames.join(', ') // join all names with commas
        : 'NA' // show NA if empty or not available
    }
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





















