


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
import Avatar from '@mui/material/Avatar'

// 🧱 Component Imports
import CustomTextField from '@core/components/mui/TextField'

const ViewDepartment = ({ open, handleClose, departmentData }) => {
  if (!departmentData) return null

  const handleDownload = (url, filename = 'file') => {
    if (!url) return
    try {
      const link = document.createElement('a')
      link.href = url
      link.download = filename
      link.target = '_blank'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (err) {
      console.error('Download failed:', err)
      alert('Unable to download file.')
    }
  }

  // Helper: Detect file types
  const isImageFile = (url = '') => /\.(png|jpg|jpeg|gif)$/i.test(url)
  const isPDFFile = (url = '') => /\.pdf$/i.test(url)

  // ✅ Shared preview style for Photo and Certificate
  const previewStyle = {
    width: '200px',
    height: '200px',
    objectFit: 'cover',
    border: '2px solid #D3D3D3',
    borderRadius: '12px',
    boxShadow: '0px 2px 8px rgba(0,0,0,0.1)',
    backgroundColor: '#f9f9f9'
  }

  return (
    <Drawer
      open={open}
      anchor='right'
      variant='temporary'
      onClose={handleClose}
      ModalProps={{ keepMounted: true }}
      sx={{
        '& .MuiDrawer-paper': { width: { xs: 320, sm: 420 }, p: 4 }
      }}
    >
      {/* 🔹 Header */}
      <div className='flex items-center justify-between pb-3'>
        <Typography variant='h5' fontWeight='bold'>
         View Resignation Details
        </Typography>
        <IconButton size='small' onClick={handleClose}>
          <i className='tabler-x text-2xl text-textPrimary' />
        </IconButton>
      </div>

      <Divider sx={{ mb: 3 }} />

      {/* 🧾 Content */}
      <Box className='flex flex-col gap-4'>
        <Grid container spacing={2}>
          {/* 🧑 Employee Info */}
          <Grid item xs={12}>
            <CustomTextField
              label='Employee Name'
              fullWidth
              value={departmentData.employeeName || ''}
              InputProps={{ readOnly: true }}
            />
          </Grid>

   
      

          <Grid item xs={12}>
            <CustomTextField
              label='Resignation Date'
              fullWidth
              value={
                departmentData.resignationDate
                  ? new Date(departmentData.resignationDate).toLocaleDateString('en-GB', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric'
                    })
                  : ''
              }
              InputProps={{ readOnly: true }}
            />
          </Grid>

            <Grid item xs={12}>
            <CustomTextField
              label='Last Working Date'
              fullWidth
              value={
                departmentData.lastWorkingDay
                  ? new Date(departmentData.lastWorkingDay).toLocaleDateString('en-GB', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric'
                    })
                  : ''
              }
              InputProps={{ readOnly: true }}
            />
          </Grid>

          <Grid item xs={12}>
            <CustomTextField
              label='Notice Period'
              fullWidth
              value={departmentData.noticePeriod || ''}
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
            <CustomTextField
              label='Description'
              fullWidth
              multiline
              minRows={2}
              value={departmentData.description || ''}
              InputProps={{ readOnly: true }}
            />
          </Grid>

          {/* 📸 Photo Section */}
          <Grid item xs={12}>
            <Typography variant='subtitle1' fontWeight='bold' sx={{ mb: 1 }}>
              Document
            </Typography>
            {departmentData.document ? (
              <Box className='flex flex-col items-start gap-2'>
                <img
                  src={departmentData.document}
                  alt='Document'
                  style={previewStyle}
                />
                <Button
                  variant='outlined'
                  size='small'
                  onClick={() => handleDownload(departmentData.document, 'document')}
                  sx={{
                    textTransform: 'none',
                    borderRadius: '8px',
                    color: '#111',
                    borderColor: '#111'
                  }}
                >
                  Download Document
                </Button>
              </Box>
            ) : (
              <Typography variant='body2' color='text.secondary'>
                No document uploaded
              </Typography>
            )}
          </Grid>

          <Grid item xs={12}>
            <CustomTextField
              label='Status'
              fullWidth
              multiline
              minRows={2}
              value={departmentData.status || ''}
              InputProps={{ readOnly: true }}
            />
          </Grid>

      
        </Grid>

        <Divider sx={{ my: 3 }} />

        {/* ✅ Close Button */}
        <Button variant='contained' onClick={handleClose} fullWidth>
          Close
        </Button>
      </Box>
    </Drawer>
  )
}

export default ViewDepartment



















