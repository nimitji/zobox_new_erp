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
        <Typography variant='h5'>Termination Details</Typography>
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
              label='Employee Name'
              fullWidth
              value={departmentData.employeeName || ''}
              InputProps={{ readOnly: true }}
            />
          </Grid>

          <Grid item xs={12}>
            <CustomTextField
              label='Termination Type'
              fullWidth
              value={departmentData.terminationType || ''}
              InputProps={{ readOnly: true }}
            />
          </Grid>

          <Grid item xs={12}>
            <CustomTextField
              label='Notice Date'
              fullWidth
              value={departmentData.noticeDate || ''}
              InputProps={{ readOnly: true }}
            />
          </Grid>
           <Grid item xs={12}>
            <CustomTextField
              label='Termination Date'
              fullWidth
              value={departmentData.terminationDate || ''}
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
              value={departmentData.description || ''}
              InputProps={{ readOnly: true }}
            />
          </Grid>
          {/* //Document */}
    <Grid item xs={12}>
  <Typography
    variant="subtitle1"
    sx={{
      mb: 1,
      color: 'black',
      fontWeight: 60
    }}
  >
    Document
  </Typography>

  {departmentData.document ? (
    <Box
      sx={{
        border: '1px solid #E0E0E0',
        borderRadius: '8px',
        overflow: 'hidden',
        backgroundColor: '#FAFAFA',
        p: 1,
        width: '60%', // 🔹 Reduced width for a compact preview
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
      }}
    >
      {departmentData.document.toLowerCase().includes('.pdf') ? (
        // 🧾 If it's a PDF
        <iframe
          src={departmentData.document}
          width="100%"
          height="300px"
          style={{
            border: 'none',
            borderRadius: '8px'
          }}
          title="Document Preview"
        />
      ) : (
        // 🖼️ If it's an image
        <Box
          component="img"
          src={departmentData.document}
          alt="Uploaded Document"
          sx={{
            width: '100%',
            maxHeight: 180,
            objectFit: 'contain',
            borderRadius: '8px'
          }}
        />
      )}
    </Box>
  ) : (
    <Typography
      variant="body2"
      color="text.secondary"
      sx={{
        py: 1.5,
        px: 2,
        width: '60%',
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

// 'use client'

// import React from 'react'

// // 📦 MUI Imports
// import Drawer from '@mui/material/Drawer'
// import IconButton from '@mui/material/IconButton'
// import Typography from '@mui/material/Typography'
// import Divider from '@mui/material/Divider'
// import Grid from '@mui/material/Grid'
// import Box from '@mui/material/Box'
// import Button from '@mui/material/Button'
// import Chip from '@mui/material/Chip'

// // 🧱 Component Imports
// import CustomTextField from '@core/components/mui/TextField'

// const ViewDepartment = ({ open, handleClose, terminationData }) => {
//   if (!terminationData) return null

//   return (
//     <Drawer
//       open={open}
//       anchor="right"
//       variant="temporary"
//       onClose={handleClose}
//       ModalProps={{ keepMounted: true }}
//       sx={{
//         '& .MuiDrawer-paper': {
//           width: { xs: 340, sm: 440 },
//           p: 4,
//           borderRadius: '16px 0 0 16px'
//         }
//       }}
//     >
//       {/* Header */}
//       <Box className="flex items-center justify-between pb-3">
//         <Typography variant="h5" fontWeight={600}>
//           Termination Details
//         </Typography>
//         <IconButton size="small" onClick={handleClose}>
//           <i className="tabler-x text-2xl text-textPrimary" />
//         </IconButton>
//       </Box>

//       <Divider sx={{ mb: 3 }} />

//       {/* Content */}
//       <Grid container spacing={2}>
//         <Grid item xs={12}>
//           <CustomTextField
//             label="Employee Name"
//             fullWidth
//             value={terminationData.employeeName || ''}
//             InputProps={{ readOnly: true }}
//           />
//         </Grid>

//         <Grid item xs={12} sm={6}>
//           <CustomTextField
//             label="Termination Type"
//             fullWidth
//             value={terminationData.terminationType || ''}
//             InputProps={{ readOnly: true }}
//           />
//         </Grid>

//         <Grid item xs={12} sm={6}>
//           <CustomTextField
//             label="Status"
//             fullWidth
//             value={terminationData.status || ''}
//             InputProps={{ readOnly: true }}
//           />
//         </Grid>

//         <Grid item xs={12} sm={6}>
//           <CustomTextField
//             label="Termination Date"
//             fullWidth
//             value={terminationData.terminationDate || ''}
//             InputProps={{ readOnly: true }}
//           />
//         </Grid>

//         <Grid item xs={12} sm={6}>
//           <CustomTextField
//             label="Notice Date"
//             fullWidth
//             value={terminationData.noticeDate || ''}
//             InputProps={{ readOnly: true }}
//           />
//         </Grid>

//         <Grid item xs={12}>
//           <CustomTextField
//             label="Reason"
//             fullWidth
//             value={terminationData.reason || ''}
//             multiline
//             InputProps={{ readOnly: true }}
//           />
//         </Grid>

//         {terminationData.document && (
//           <Grid item xs={12}>
//             <Button
//               variant="outlined"
//               color="primary"
//               href={terminationData.document}
//               target="_blank"
//               rel="noopener noreferrer"
//               sx={{
//                 borderRadius: '8px',
//                 px: 2,
//                 py: 0.5,
//                 textTransform: 'none',
//                 backgroundColor: '#E3F2FD',
//                 borderColor: '#90CAF9',
//                 '&:hover': {
//                   backgroundColor: '#BBDEFB'
//                 }
//               }}
//             >
//               View Attached Document
//             </Button>
//           </Grid>
//         )}
//       </Grid>

//       <Divider sx={{ my: 3 }} />

//       <Button variant="contained" onClick={handleClose}>
//         Close
//       </Button>
//     </Drawer>
//   )
// }

// export default ViewDepartment






















