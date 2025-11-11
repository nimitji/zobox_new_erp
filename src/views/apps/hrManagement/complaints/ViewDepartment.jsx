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
        <Typography variant='h5'>View Complaint</Typography>
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
              label='Complainant'
              fullWidth
              value={departmentData.complainantName || ''}
              InputProps={{ readOnly: true }}
            />
          </Grid>

          <Grid item xs={12}>
            <CustomTextField
              label='Against'
              fullWidth
              value={departmentData.againstName || ''}
              InputProps={{ readOnly: true }}
            />
          </Grid>
           <Grid item xs={12}>
            <CustomTextField
              label='Complaint Type'
              fullWidth
              value={departmentData.complaintType || ''}
              InputProps={{ readOnly: true }}
            />
          </Grid>
           <Grid item xs={12}>
            <CustomTextField
              label='Subject'
              fullWidth
              value={departmentData.subject || ''}
              InputProps={{ readOnly: true }}
            />
          </Grid>
           <Grid item xs={12}>
            <CustomTextField
              label='Complaint Date'
              fullWidth
              value={departmentData.complaintDate || ''}
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
  <Typography variant='subtitle2' sx={{ mb: 1, color: 'text.secondary' }}>
    Document
  </Typography>

  {departmentData.documents && departmentData.documents !== 'NA' && departmentData.documents.trim() !== '' ? (
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
      {departmentData.documents.toLowerCase().endsWith('.pdf') ? (
        <iframe
          src={departmentData.documents}
          width='100%'
          height='180px'
          style={{ border: 'none', borderRadius: '8px' }}
          title='Document Preview'
        />
      ) : (
        // 🖼️ Image Preview
        <Box
          component='img'
          src={departmentData.documents}
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
              label='Submit Anonymously'
              fullWidth
              value={departmentData.submitAnonymously || ''}
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
              label='Assigned To'
              fullWidth
              value={departmentData.assignedToName || ''}
              InputProps={{ readOnly: true }}
            />
          </Grid>

          <Grid item xs={12}>
  <CustomTextField
    label='Resolution DeadLine'
    fullWidth
    value={
      departmentData.resolutionDeadLine && departmentData.resolutionDeadLine !== 'NA'
        ? departmentData.resolutionDeadLine
        : 'NA'
    }
    InputProps={{ readOnly: true }}
  />
</Grid>


 <Grid item xs={12}>
  <CustomTextField
    label='Investigation Notes'
    fullWidth
    value={
      departmentData.investigationNotes && departmentData.investigationNotes !== 'NA'
        ? departmentData.investigationNotes
        : 'NA'
    }
    InputProps={{ readOnly: true }}
  />
</Grid>

<Grid item xs={12}>
  <CustomTextField
    label='Resolution Action'
    fullWidth
    value={
      departmentData.resolutionAction && departmentData.resolutionAction !== 'NA'
        ? departmentData.resolutionAction
        : 'NA'
    }
    InputProps={{ readOnly: true }}
  />
</Grid>
<Grid item xs={12}>
  <CustomTextField
    label='Resolution Date'
    fullWidth
    value={
      departmentData.resolutionDate && departmentData.resolutionDate !== 'NA'
        ? departmentData.resolutionDate
        : 'NA'
    }
    InputProps={{ readOnly: true }}
  />
</Grid>
<Grid item xs={12}>
  <CustomTextField
    label='Follow-up Action'
    fullWidth
    value={
      departmentData.followUpActon && departmentData.followUpActon !== 'NA'
        ? departmentData.followUpActon
        : 'NA'
    }
    InputProps={{ readOnly: true }}
  />
</Grid>
<Grid item xs={12}>
  <CustomTextField
    label='Feedback'
    fullWidth
    value={
      departmentData.feedBack && departmentData.feedBack !== 'NA'
        ? departmentData.feedBack
        : 'NA'
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





















