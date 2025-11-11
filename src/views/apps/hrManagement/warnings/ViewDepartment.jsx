// // React Imports
// import React from 'react'

// // MUI Imports
// import Drawer from '@mui/material/Drawer'
// import IconButton from '@mui/material/IconButton'
// import Typography from '@mui/material/Typography'
// import Divider from '@mui/material/Divider'
// import Grid from '@mui/material/Grid'
// import Box from '@mui/material/Box'
// import Button from '@mui/material/Button'

// // Component Imports
// import CustomTextField from '@core/components/mui/TextField'

// const ViewDepartment = ({ open, handleClose, departmentData }) => {
//   if (!departmentData) return null

//   return (
//     <Drawer
//       open={open}
//       anchor='right'
//       variant='temporary'
//       onClose={handleClose}
//       ModalProps={{ keepMounted: true }}
//       sx={{ '& .MuiDrawer-paper': { width: { xs: 320, sm: 420 }, p: 4 } }}
//     >
//       {/* Header */}
//       <div className='flex items-center justify-between pb-3'>
//         <Typography variant='h5'>Warning Details</Typography>
//         <IconButton size='small' onClick={handleClose}>
//           <i className='tabler-x text-2xl text-textPrimary' />
//         </IconButton>
//       </div>

//       <Divider sx={{ mb: 3 }} />

//       {/* Content */}
//       {/* <Box className='flex flex-col gap-4'>
//         <Grid container spacing={2}>
//           <Grid item xs={12}>
//             <CustomTextField
//               label='Department Name'
//               fullWidth
//               value={departmentData.name || ''}
//               InputProps={{ readOnly: true }}
//             />
//           </Grid>

//           <Grid item xs={12}>
//             <CustomTextField
//               label='Branch'
//               fullWidth
//               value={departmentData.branch || ''}
//               InputProps={{ readOnly: true }}
//             />
//           </Grid>

//           <Grid item xs={12}>
//             <CustomTextField
//               label='Description'
//               fullWidth
//               value={departmentData.description || ''}
//               InputProps={{ readOnly: true }}
//             />
//           </Grid>

//      <Grid item xs={12}>
//             <CustomTextField
//               label='Status'
//               fullWidth
//               value={departmentData.status || ''}
//               InputProps={{ readOnly: true }}
//             />
//           </Grid>
//         </Grid>

//         <Divider sx={{ my: 3 }} />

//         <Button variant='contained' onClick={handleClose}>
//           Close
//         </Button>
//       </Box> */}

//            <Grid container spacing={2}>
//         <Grid item xs={12}>
//           <CustomTextField
//             label="Employee"
//             fullWidth
//             value={warningData.employeeName || ''}
//             InputProps={{ readOnly: true }}
//           />
//         </Grid>

//         <Grid item xs={12}>
//           <CustomTextField
//             label="Warning By"
//             fullWidth
//             value={warningData.warningByName || ''}
//             InputProps={{ readOnly: true }}
//           />
//         </Grid>

//         <Grid item xs={12}>
//           <CustomTextField
//             label="Warning Type"
//             fullWidth
//             value={warningData.warningType || ''}
//             InputProps={{ readOnly: true }}
//           />
//         </Grid>

//         <Grid item xs={12}>
//           <CustomTextField
//             label="Subject"
//             fullWidth
//             value={warningData.subject || ''}
//             InputProps={{ readOnly: true }}
//           />
//         </Grid>

//         <Grid item xs={12}>
//           <CustomTextField
//             label="Severity"
//             fullWidth
//             value={warningData.severity || ''}
//             InputProps={{ readOnly: true }}
//           />
//         </Grid>

//         <Grid item xs={6}>
//           <CustomTextField
//             label="Warning Date"
//             fullWidth
//             value={warningData.warningDate || ''}
//             InputProps={{ readOnly: true }}
//           />
//         </Grid>

//         <Grid item xs={6}>
//           <CustomTextField
//             label="Expiry Date"
//             fullWidth
//             value={warningData.expiryDate || '—'}
//             InputProps={{ readOnly: true }}
//           />
//         </Grid>

//         <Grid item xs={12}>
//           <CustomTextField
//             label="Description"
//             fullWidth
//             multiline
//             minRows={3}
//             value={warningData.description || ''}
//             InputProps={{ readOnly: true }}
//           />
//         </Grid>

//         <Grid item xs={12}>
//           <CustomTextField
//             label="Improvement Plan"
//             fullWidth
//             value={warningData.improvementPlan || ''}
//             InputProps={{ readOnly: true }}
//           />
//         </Grid>

//         <Grid item xs={12}>
//           <CustomTextField
//             label="Improvement Goals"
//             fullWidth
//             value={warningData.improvementGoals || ''}
//             InputProps={{ readOnly: true }}
//           />
//         </Grid>

//         <Grid item xs={6}>
//           <CustomTextField
//             label="Improvement Start Date"
//             fullWidth
//             value={warningData.improvementStartDate || ''}
//             InputProps={{ readOnly: true }}
//           />
//         </Grid>

//         <Grid item xs={6}>
//           <CustomTextField
//             label="Improvement End Date"
//             fullWidth
//             value={warningData.improvementEndDate || ''}
//             InputProps={{ readOnly: true }}
//           />
//         </Grid>

//         <Grid item xs={12}>
//           <CustomTextField
//             label="Status"
//             fullWidth
//             value={warningData.status || ''}
//             InputProps={{ readOnly: true }}
//           />
//         </Grid>

//         {/* 🧾 Document Preview */}
//         <Grid item xs={12}>
//           <Typography variant="subtitle2" sx={{ mb: 1, color: 'text.secondary' }}>
//             Document
//           </Typography>

//           {warningData.document ? (
//             <Box
//               sx={{
//                 border: '1px solid #E0E0E0',
//                 borderRadius: '8px',
//                 overflow: 'hidden',
//                 backgroundColor: '#FAFAFA',
//                 p: 1
//               }}
//             >
//               {warningData.document.endsWith('.pdf') ? (
//                 <iframe
//                   src={warningData.document}
//                   width="100%"
//                   height="300px"
//                   style={{ border: 'none', borderRadius: '8px' }}
//                   title="Document Preview"
//                 />
//               ) : (
//                 <Box
//                   component="img"
//                   src={warningData.document}
//                   alt="Uploaded Document"
//                   sx={{
//                     width: '100%',
//                     maxHeight: 200,
//                     objectFit: 'contain',
//                     borderRadius: '8px',
//                     backgroundColor: '#fff'
//                   }}
//                 />
//               )}
//             </Box>
//           ) : (
//             <Typography
//               variant="body2"
//               color="text.secondary"
//               sx={{
//                 py: 1.5,
//                 px: 2,
//                 borderRadius: '8px',
//                 border: '1px solid #E0E0E0',
//                 backgroundColor: '#FAFAFA'
//               }}
//             >
//               No document uploaded
//             </Typography>
//           )}
//         </Grid>
//       </Grid>

//       <Divider sx={{ my: 3 }} />

//       <Button variant="contained" fullWidth onClick={handleClose}>
//         Close
//       </Button>



      

//     </Drawer>
//   )
// }

// export default ViewDepartment

'use client'

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
      sx={{
        '& .MuiDrawer-paper': {
          width: { xs: 340, sm: 440 },
          p: 4,
          borderRadius: '16px 0 0 16px',
          backgroundColor: '#fff'
        }
      }}
    >
      {/* Header */}
      <div className='flex items-center justify-between pb-3'>
        <Typography variant='h5'>Warning Details</Typography>
        <IconButton size='small' onClick={handleClose}>
          <i className='tabler-x text-2xl text-textPrimary' />
        </IconButton>
      </div>

      <Divider sx={{ mb: 3 }} />

      {/* Content */}
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
            label='Warning By'
            fullWidth
            value={departmentData.warningByName || ''}
            InputProps={{ readOnly: true }}
          />
        </Grid>

        <Grid item xs={12}>
          <CustomTextField
            label='Warning Type'
            fullWidth
            value={departmentData.warningType || ''}
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
            label='Severity'
            fullWidth
            value={departmentData.severity || ''}
            InputProps={{ readOnly: true }}
          />
        </Grid>

        <Grid item xs={6}>
          <CustomTextField
            label='Warning Date'
            fullWidth
            value={departmentData.warningDate || ''}
            InputProps={{ readOnly: true }}
          />
        </Grid>

        <Grid item xs={6}>
          <CustomTextField
            label='Expiry Date'
            fullWidth
            value={departmentData.expiryDate || '—'}
            InputProps={{ readOnly: true }}
          />
        </Grid>

        <Grid item xs={12}>
          <CustomTextField
            label='Description'
            fullWidth
            multiline
            minRows={3}
            value={departmentData.description || ''}
            InputProps={{ readOnly: true }}
          />
        </Grid>

        <Grid item xs={12}>
          <CustomTextField
            label='Improvement Plan'
            fullWidth
            value={departmentData.improvementPlan || ''}
            InputProps={{ readOnly: true }}
          />
        </Grid>

        <Grid item xs={12}>
          <CustomTextField
            label='Improvement Goals'
            fullWidth
            value={departmentData.improvementGoals || ''}
            InputProps={{ readOnly: true }}
          />
        </Grid>

        <Grid item xs={6}>
          <CustomTextField
            label='Improvement Start Date'
            fullWidth
            value={departmentData.improvementStartDate || ''}
            InputProps={{ readOnly: true }}
          />
        </Grid>

        <Grid item xs={6}>
          <CustomTextField
            label='Improvement End Date'
            fullWidth
            value={departmentData.improvementEndDate || ''}
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

        {/* 🧾 Document Preview */}
      


        <Grid item xs={12}>
  <Typography
    variant='subtitle2'
    sx={{ mb: 1, color: 'text.secondary', fontWeight: 500 }}
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
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        p: 1,
        width: '85%',       // ⬅️ narrower than full width
        mx: 'auto'          // ⬅️ centers horizontally
      }}
    >
      {departmentData.document.endsWith('.pdf') ? (
        <iframe
          src={departmentData.document}
          width='100%'
          height='160px'     // ⬅️ reduced from 220px → 160px
          style={{
            border: 'none',
            borderRadius: '6px',
            backgroundColor: '#fff'
          }}
          title='Document Preview'
        />
      ) : (
        <Box
          component='img'
          src={departmentData.document}
          alt='Uploaded Document'
          sx={{
            width: '80%',       // ⬅️ narrower image preview
            maxHeight: 140,     // ⬅️ smaller height
            objectFit: 'contain',
            borderRadius: '6px',
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
        backgroundColor: '#FAFAFA',
        width: '85%',
        mx: 'auto',
        textAlign: 'center'
      }}
    >
      No document uploaded
    </Typography>
  )}
</Grid>

      </Grid>

      <Divider sx={{ my: 3 }} />

      <Button variant='contained' fullWidth onClick={handleClose}>
        Close
      </Button>
    </Drawer>
  )
}

export default ViewDepartment






















