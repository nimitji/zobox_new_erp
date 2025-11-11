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
        <Typography variant='h5'>View Transfer</Typography>
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
              label='To Branch'
              fullWidth
              value={departmentData.currentBranch || ''}
              InputProps={{ readOnly: true }}
            />
          </Grid>
            <Grid item xs={12}>
            <CustomTextField
              label='To Department'
              fullWidth
              value={departmentData.currentDepartment || ''}
              InputProps={{ readOnly: true }}
            />
          </Grid>
            <Grid item xs={12}>
            <CustomTextField
              label='To Designation'
              fullWidth
              value={departmentData.currentDesignation || ''}
              InputProps={{ readOnly: true }}
            />
          </Grid>
             <Grid item xs={12}>
            <CustomTextField
              label='Transfer Date'
              fullWidth
              value={departmentData.transferDate || ''}
              InputProps={{ readOnly: true }}
            />
          </Grid>
             <Grid item xs={12}>
            <CustomTextField
              label='Effective Date'
              fullWidth
              value={departmentData.effectiveDate || ''}
              InputProps={{ readOnly: true }}
            />
          </Grid>
              <Grid item xs={12}>
            <CustomTextField
              label='Reason'
              fullWidth
              value={departmentData.reason || ''}
              InputProps={{ readOnly: true }}
            />
          </Grid>

          <Grid item xs={12}>
  <Typography variant='subtitle2' sx={{ mb: 1, color: 'text.secondary' }}>
    Documents
  </Typography>

  {departmentData.document && departmentData.document !== 'NA' && departmentData.document.trim() !== '' ? (
    <Box
      sx={{
        border: '1px solid #E0E0E0',
        borderRadius: '8px',
        overflow: 'hidden',
        backgroundColor: '#FAFAFA',
        p: 1
      }}
    >
      {/* 🧾 PDF Preview */}
      {departmentData.document.toLowerCase().endsWith('.pdf') ? (
        <iframe
          src={departmentData.document}
          width='100%'
          height='200px'
          style={{ border: 'none', borderRadius: '8px' }}
          title='Reason Document Preview'
        />
      ) : (
        // 🖼️ Image Preview
        <Box
          component='img'
          src={departmentData.document}
          alt='Reason Document'
          sx={{
            width: '100%',
            maxHeight: 200,
            objectFit: 'contain',
            borderRadius: '8px',
            backgroundColor: '#fff'
          }}
        />
      )}
    </Box>
  ) : (
    <Typography
      variant='body2'
      color='text.secondary'
      sx={{
        py: 0.5,
        px: 1,
        borderRadius: '6px',
        display: 'inline-block'
      }}
    >
      –
    </Typography>
  )}
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





















