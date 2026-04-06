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
//         <Typography variant='h5'>Attendance Records Details</Typography>
//         <IconButton size='small' onClick={handleClose}>
//           <i className='tabler-x text-2xl text-textPrimary' />
//         </IconButton>
//       </div>

//       <Divider sx={{ mb: 3 }} />

//       {/* Content */}
//       <Box className='flex flex-col gap-4'>
//         <Grid container spacing={2}>
//           <Grid item xs={12}>
//             <CustomTextField
//               label='Employee'
//               fullWidth
//               value={departmentData.employee || ''}
//               InputProps={{ readOnly: true }}
//             />
//           </Grid>

//           <Grid item xs={12}>
//             <CustomTextField
//               label='Date'
//               fullWidth
//               value={departmentData.date || ''}
//               InputProps={{ readOnly: true }}
//             />
//           </Grid>

//           <Grid item xs={12}>
//             <CustomTextField
//               label='Clock In Time'
//               fullWidth
//               value={departmentData.clockIn || ''}
//               InputProps={{ readOnly: true }}
//             />
//           </Grid>
//             <Grid item xs={12}>
//             <CustomTextField
//               label='Clock Out Time'
//               fullWidth
//               value={departmentData.clockOut || ''}
//               InputProps={{ readOnly: true }}
//             />
//           </Grid>
//             <Grid item xs={12}>
//             <CustomTextField
//               label='Break Hours'
//               fullWidth
//               value={departmentData.breakHours || ''}
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

//            <Grid item xs={12}>
//   <CustomTextField
//     label='Holiday'
//     fullWidth
//     value={departmentData.isHoliday ? 'Yes' : 'No'}
//     InputProps={{ readOnly: true }}
//   />
// </Grid>

//   <Grid item xs={12}>
//             <CustomTextField
//               label='Notes'
//               fullWidth
//               value={departmentData.notes || ''}
//               InputProps={{ readOnly: true }}
//             />
//           </Grid>

//         </Grid>

//         <Divider sx={{ my: 3 }} />

//         <Button variant='contained' onClick={handleClose}>
//           Close
//         </Button>
//       </Box>
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

const formatDate = value => {
  if (!value) return ''
  const date = new Date(value)
  return isNaN(date.getTime())
    ? value
    : date.toISOString().split('T')[0]
}

const ViewLeaveApplication = ({ open, handleClose, departmentData }) => {
  if (!departmentData) return null

  return (
    <Drawer
      open={open}
      anchor='right'
      onClose={handleClose}
      sx={{ '& .MuiDrawer-paper': { width: { xs: 340, sm: 420 }, p: 4 } }}
    >
      {/* Header */}
      <div className='flex items-center justify-between pb-3'>
        <Typography variant='h5'>View Leave Application</Typography>
        <IconButton size='small' onClick={handleClose}>
          <i className='tabler-x text-2xl' />
        </IconButton>
      </div>

      <Divider sx={{ mb: 3 }} />

     {/* Content */}
<Box className='flex flex-col gap-4'>
  <Grid container spacing={3}>

    {/* Employee */}
    <Grid item xs={12}>
      <CustomTextField
        label='Employee *'
        fullWidth
        value={departmentData.employeeName || ''}
        InputProps={{ readOnly: true }}
      />
    </Grid>

    {/* Leave Type */}
    <Grid item xs={12}>
      <CustomTextField
        label='Leave Type *'
        fullWidth
        value={departmentData.leaveTypeName || ''}
        InputProps={{ readOnly: true }}
      />
    </Grid>

    {/* Start Date */}
    <Grid item xs={12}>
      <CustomTextField
        label='Start Date *'
        fullWidth
        value={formatDate(departmentData.startDate)}
        InputProps={{ readOnly: true }}
      />
    </Grid>

    {/* End Date */}
    <Grid item xs={12}>
      <CustomTextField
        label='End Date *'
        fullWidth
        value={formatDate(departmentData.endDate)}
        InputProps={{ readOnly: true }}
      />
    </Grid>

    {/* Reason */}
    <Grid item xs={12}>
      <CustomTextField
        label='Reason *'
        fullWidth
        multiline
        rows={2}
        value={departmentData.reason || ''}
        InputProps={{ readOnly: true }}
      />
    </Grid>

    {/* Attachment */}
    {/* Attachment */}
{departmentData.attachments && (
  <Grid item xs={12}>
    <Typography variant='body2' fontWeight={500} mb={1}>
      Attachment
    </Typography>

    <Box
      sx={{
        border: '1px solid #e0e0e0',
        borderRadius: 2,
        p: 1.5,
        width: 'fit-content'
      }}
    >
      <img
        src={departmentData.attachments}
        alt='attachment'
        style={{
          maxWidth: 200,
          maxHeight: 200,
          borderRadius: 6,
          objectFit: 'contain'
        }}
        onError={e => {
          e.target.style.display = 'none'
        }}
      />
    </Box>
  </Grid>
)}


  </Grid>

  <Divider sx={{ my: 3 }} />

  {/* ✅ Button exactly like Leave Type View */}
  <Button variant='contained' fullWidth onClick={handleClose}>
    Close
  </Button>
</Box>

    </Drawer>
  )
}

export default ViewLeaveApplication






















