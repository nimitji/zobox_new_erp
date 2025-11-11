

'use client'
import React from 'react'
import dynamic from 'next/dynamic'

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

// Import ReactQuill dynamically for Next.js SSR support
// import 'react-quill/dist/quill.snow.css'
// const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })
const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false })
import 'react-quill-new/dist/quill.snow.css'


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
        <Typography variant='h5'>View Announcement</Typography>
        <IconButton size='small' onClick={handleClose}>
          <i className='tabler-x text-2xl text-textPrimary' />
        </IconButton>
      </div>

      <Divider sx={{ mb: 3 }} />

      {/* Content */}
      <Box className='flex flex-col gap-4'>
        <Grid container spacing={2}>
          {/* 🏷 Title */}
          <Grid item xs={12}>
            <CustomTextField
              label='Title'
              fullWidth
              value={departmentData.title || ''}
              InputProps={{ readOnly: true }}
            />
          </Grid>

          {/* 🗂 Category */}
          <Grid item xs={12}>
            <CustomTextField
              label='Category'
              fullWidth
              value={departmentData.category || ''}
              InputProps={{ readOnly: true }}
            />
          </Grid>

          {/* 📝 Short Description */}
          <Grid item xs={12}>
            <CustomTextField
              label='Short Description'
              fullWidth
              value={departmentData.description || ''}
              InputProps={{ readOnly: true }}
            />
          </Grid>

          {/* 📄 Content (Rich Text Viewer) */}
          <Grid item xs={12}>
            <Typography variant='subtitle2' sx={{ mb: 1, color: 'text.secondary' }}>
              Content
            </Typography>

            <ReactQuill
              value={departmentData.content || ''}
              readOnly={true}
              theme='snow'
              modules={{
                toolbar: [
                  ['bold', 'italic', 'underline', 'strike'],
                  [{ list: 'ordered' }, { list: 'bullet' }],
                  [{ align: [] }],
                  ['blockquote', 'code-block', 'link'],
                  ['clean']
                ]
              }}
              style={{
                backgroundColor: '#fff',
                borderRadius: '8px',
                minHeight: '150px',
                pointerEvents: 'none'
              }}
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
  <Typography variant='subtitle2' sx={{ mb: 1, color: 'text.secondary' }}>
    Attachment Preview
  </Typography>

  {departmentData.attachments && departmentData.attachments !== 'NA' ? (
    <Box
      sx={{
        border: '1px solid #E0E0E0',
        borderRadius: '8px',
        overflow: 'hidden',
        backgroundColor: '#FAFAFA',
        p: 1
      }}
    >
      {/* 🧾 If it's a PDF file */}
      {departmentData.attachments.endsWith('.pdf') ? (
        <iframe
          src={departmentData.attachments}
          width='100%'
          height='250px'
          style={{ border: 'none', borderRadius: '8px' }}
          title='Attachment'
        />
      ) : (
        // 🖼 Otherwise assume image
        <Box
          component='img'
          src={departmentData.attachments}
          alt='Attachment'
          sx={{
            width: '100%',
            maxHeight: 250,
            objectFit: 'contain',
            borderRadius: '8px',
            backgroundColor: '#fff',
            cursor: 'pointer'
          }}
          onClick={() => window.open(departmentData.attachments, '_blank')}
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
      No attachment uploaded
    </Typography>
  )}
</Grid>

   <Grid item xs={12}>
            <CustomTextField
              label='Featured Announcement'
              fullWidth
              value={departmentData.featuredAnnouncements || ''}
              InputProps={{ readOnly: true }}
            />
          </Grid>
            <Grid item xs={12}>
            <CustomTextField
              label='High Priority'
              fullWidth
              value={departmentData.highPriority || ''}
              InputProps={{ readOnly: true }}
            />
          </Grid>
           <Grid item xs={12}>
            <CustomTextField
              label='Company-wide Announcement'
              fullWidth
              value={departmentData.companyWideAnnouncements || ''}
              InputProps={{ readOnly: true }}
            />
          </Grid>
          <Grid item xs={12}>
            <CustomTextField
              label='Target Branches'
              fullWidth
              value={departmentData.branchName || ''}
              InputProps={{ readOnly: true }}
            />
          </Grid>
          <Grid item xs={12}>
            <CustomTextField
              label='Target Departments'
              fullWidth
              value={departmentData.departmentName || ''}
              InputProps={{ readOnly: true }}
            />
          </Grid>


        </Grid>

        <Divider sx={{ my: 3 }} />

        {/* Close Button */}
        <Button variant='contained' onClick={handleClose}>
          Close
        </Button>
      </Box>
    </Drawer>
  )
}

export default ViewDepartment





















