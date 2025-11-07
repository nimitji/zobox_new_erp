

'use client'

import React from 'react'

// 📦 MUI Imports
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

// 🧱 Component Imports
import CustomTextField from '@core/components/mui/TextField'
import dayjs from 'dayjs'

const ViewDepartment = ({ open, handleClose, goalData }) => {
  if (!goalData) return null

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
        <Typography variant='h5' fontWeight='bold'>
          View Employee Review Cycle
        </Typography>
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
              value={goalData.employeeName || ''}
              InputProps={{ readOnly: true }}
            />
          </Grid>

          <Grid item xs={12}>
            <CustomTextField
              label='Reviewer'
              fullWidth
              value={goalData.reviewerName || ''}
              InputProps={{ readOnly: true }}
            />
          </Grid>

          <Grid item xs={12}>
            <CustomTextField
              label='Review Cycle'
              fullWidth
              value={goalData.reviewCycleName || ''}
              InputProps={{ readOnly: true }}
            />
          </Grid>

          <Grid item xs={12}>
            <CustomTextField
              label='Rating'
              fullWidth
              multiline
              value={goalData.rating || '-'}
              InputProps={{ readOnly: true }}
            />
          </Grid>

     

     

        

          <Grid item xs={12}>
            <CustomTextField
              label='Status'
              fullWidth
              value={goalData.status || ''}
              InputProps={{ readOnly: true }}
            />
          </Grid>

          <Grid item xs={12}>
            <CustomTextField
              label='Created At'
              fullWidth
              value={goalData.createdAt ? dayjs(goalData.createdAt).format('DD MMM YYYY') : ''}
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




















