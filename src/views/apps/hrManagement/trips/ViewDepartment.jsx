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
        <Typography variant='h5'>Trips Details</Typography>
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
              label='Purpose'
              fullWidth
              value={departmentData.purpose || ''}
              InputProps={{ readOnly: true }}
            />
          </Grid>

          <Grid item xs={12}>
            <CustomTextField
              label='Destination'
              fullWidth
              value={departmentData.destination || ''}
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
              value={departmentData.startDate || ''}
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
              label='Expected Outcomes'
              fullWidth
              value={departmentData.expectedOutcomes || ''}
              InputProps={{ readOnly: true }}
            />
          </Grid>
            {/* <Grid item xs={12}>
            <CustomTextField
              label='Documents'
              fullWidth
              value={departmentData.documents || ''}
              InputProps={{ readOnly: true }}
            />
          </Grid> */}
          <Grid item xs={12}>
  <Typography variant='subtitle2' sx={{ mb: 1, color: 'text.secondary' }}>
    Document
  </Typography>

  {departmentData.documents ? (
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
      {departmentData.documents.endsWith('.pdf') ? (
        <iframe
          src={departmentData.documents}
          width='100%'
          height='200px'
          style={{ border: 'none', borderRadius: '8px' }}
          title='Document Preview'
        />
      ) : (
        // 🖼 Image or other file
        <Box
          component='img'
          src={departmentData.documents}
          alt='Uploaded Document'
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
        py: 1.5,
        px: 2,
        borderRadius: '8px',
        border: '1px solid #E0E0E0',
        backgroundColor: '#FAFAFA'
      }}
    >
      No document uploaded
    </Typography>
  )}
</Grid>


     <Grid item xs={12}>
            <CustomTextField
              label='Advance Amount'
              fullWidth
              value={departmentData.advancedAmount || ''}
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
              label='Advance Status'
              fullWidth
              value={departmentData.advanceStatus || ''}
              InputProps={{ readOnly: true }}
            />
          </Grid>
             <Grid item xs={12}>
            <CustomTextField
              label='Expenses Amount'
              fullWidth
              value={departmentData.expenseAmount || ''}
              InputProps={{ readOnly: true }}
            />
          </Grid>

             <Grid item xs={12}>
            <CustomTextField
              label='Reimbursement Status'
              fullWidth
              value={departmentData.reimbursementStatus || ''}
              InputProps={{ readOnly: true }}
            />
          </Grid>

 



<Grid item xs={12}>
  <Typography variant='subtitle2' sx={{ mb: 1, color: 'text.secondary' }}>
    Expenses Document
  </Typography>

  {departmentData.expenses && departmentData.expenses !== 'NA' && departmentData.expenses.trim() !== '' ? (
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
      {departmentData.expenses.toLowerCase().endsWith('.pdf') ? (
        <iframe
          src={departmentData.expenses}
          width='100%'
          height='180px'
          style={{ border: 'none', borderRadius: '8px' }}
          title='Document Preview'
        />
      ) : (
        // 🖼 Image or other file
        <Box
          component='img'
          src={departmentData.expenses}
          alt='Uploaded Document'
          sx={{
            width: '100%',
            maxHeight: 180,
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
              label='Trip Report'
              fullWidth
              value={departmentData.tripReport || ''}
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





















