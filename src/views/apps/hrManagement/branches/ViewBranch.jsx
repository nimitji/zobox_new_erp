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

const ViewBranch = ({ open, handleClose, branchData }) => {
  if (!branchData) return null

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
        <Typography variant='h5'>Branch Details</Typography>
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
              label='Branch Name'
              fullWidth
              value={branchData.branchName || ''}
              InputProps={{ readOnly: true }}
            />
          </Grid>

          <Grid item xs={12}>
            <CustomTextField
              label='Address'
              fullWidth
              value={branchData.Plot || ''}
              InputProps={{ readOnly: true }}
            />
          </Grid>

          <Grid item xs={6}>
            <CustomTextField
              label='City'
              fullWidth
              value={branchData.City || ''}
              InputProps={{ readOnly: true }}
            />
          </Grid>

          <Grid item xs={6}>
            <CustomTextField
              label='State/Province'
              fullWidth
              value={branchData.State || ''}
              InputProps={{ readOnly: true }}
            />
          </Grid>

          <Grid item xs={6}>
            <CustomTextField
              label='Country'
              fullWidth
              value={branchData.Country || ''}
              InputProps={{ readOnly: true }}
            />
          </Grid>

          <Grid item xs={6}>
            <CustomTextField
              label='ZIP/Postal Code'
              fullWidth
              value={branchData.Pincode || ''}
              InputProps={{ readOnly: true }}
            />
          </Grid>

          <Grid item xs={12}>
            <CustomTextField
              label='Contact'
              fullWidth
              value={branchData.phone || ''}
              InputProps={{ readOnly: true }}
            />
          </Grid>

          <Grid item xs={12}>
            <CustomTextField
              label='Email'
              fullWidth
              value={branchData.emailid || ''}
              InputProps={{ readOnly: true }}
            />
          </Grid>

          <Grid item xs={12}>
            <CustomTextField
              label='Status'
              fullWidth
              value={branchData.status || ''}
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

export default ViewBranch





















