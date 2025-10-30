

// 'use client'

// // MUI Imports
// import Card from '@mui/material/Card'
// import CardContent from '@mui/material/CardContent'
// import Typography from '@mui/material/Typography'
// import Chip from '@mui/material/Chip'
// import Divider from '@mui/material/Divider'
// import Button from '@mui/material/Button'

// // Component Imports
// import EditUserInfo from '@components/dialogs/edit-user-info'
// import ConfirmationDialog from '@components/dialogs/confirmation-dialog'
// import OpenDialogOnElementClick from '@components/dialogs/OpenDialogOnElementClick'
// import CustomAvatar from '@core/components/mui/Avatar'

// // React Imports
// import { useEffect, useState } from 'react'

// const UserDetails = () => {
//   const [userData, setUserData] = useState(null)

//   // 🧩 Load data from localStorage
//   useEffect(() => {
//     const stored = localStorage.getItem('selectedUser')
//     if (stored) {
//       setUserData(JSON.parse(stored))
//     }
//   }, [])

//   if (!userData) {
//     return <Typography>Loading user details...</Typography>
//   }

//   const {
//     EMPLOYEENAME,
//     EMPLOYEEID,
//     companyNameStatus,
//     JOBLOCATION,
//     REPORTINGMANAGER,
//     PANNUMBER,
//     AADHARCARD,
//     DATEOFBIRTH,
//     AGE,
//     ZOBOXEXPERIENCE,
//     EMERGENCYNUMBER,
//     MARITALSTATUS,
//     GENDER,
//     BLOODGROUP,
//     DESIGNATION,
//     DEPARTMENT,
//     EMAILID,
//     MOBILENUMBER,
//     DATEOFJOINING,
//     status,
//     Photo
//   } = userData

//   // 🧠 Helper: button props for dialog components
//   const buttonProps = (children, color, variant) => ({
//     children,
//     color,
//     variant
//   })

//   return (
//     <Card>
//       <CardContent className='flex flex-col pbs-12 gap-6'>
//         {/* ===== Header / Avatar Section ===== */}
//         <div className='flex flex-col gap-6'>
//           <div className='flex items-center justify-center flex-col gap-4'>
//             <div className='flex flex-col items-center gap-4'>
//               <CustomAvatar
//                 alt='user-profile'
//                 src={Photo?.[0] || '/images/avatars/1.png'}
//                 variant='rounded'
//                 size={120}
//               />
//               <Typography variant='h5'>{EMPLOYEENAME || '—'}</Typography>
//             </div>
//             <Chip
//               label={DESIGNATION || '—'}
//               color='secondary'
//               size='small'
//               variant='tonal'
//             />
//           </div>

        
//             </div>
      
       

//         {/* ===== Detailed Info ===== */}
//         <div>
//           <Typography variant='h5'>Details</Typography>
//           <Divider className='mlb-4' />
//           <div className='flex flex-col gap-2'>
//             <DetailRow label='EmployeeId' value={EMPLOYEEID} />
//             <DetailRow label='Company Status' value={companyNameStatus} />
//              <DetailRow label='Job Location' value={JOBLOCATION} />
//             <DetailRow label='Department' value={DEPARTMENT} />
//             <DetailRow label='Designation' value={DESIGNATION} />
//             <DetailRow label='Email' value={EMAILID} />
//             <DetailRow label='Mobile Number' value={MOBILENUMBER} />
//             <DetailRow label='Date of Joining' value={DATEOFJOINING} />
//             <DetailRow label='Reporting Manager' value={REPORTINGMANAGER} />
//             <DetailRow label='Pan Number' value={PANNUMBER} />
//             <DetailRow label='Aadhar Number' value={AADHARCARD} />
//             <DetailRow label='Date Of Birth' value={DATEOFBIRTH} />
//             <DetailRow label='Age' value={AGE} />
//             <DetailRow label='Zobox Experience' value={ZOBOXEXPERIENCE} />
//             <DetailRow label='Emergency' value={EMERGENCYNUMBER} />
//             <DetailRow label='Martial Status' value={MARITALSTATUS} />
//             <DetailRow label='Gender' value={GENDER} />
//             <DetailRow label='Blood Group' value={BLOODGROUP} />
//             <DetailRow label='Status' value={status} />
//           </div>
//         </div>

     
//       </CardContent>
//     </Card>
//   )
// }

// // ✅ Small helper component for displaying rows
// const DetailRow = ({ label, value }) => (
//   <div className='flex items-center flex-wrap gap-x-1.5'>
//     <Typography className='font-medium' color='text.primary'>
//       {label}:
//     </Typography>
//     <Typography color='text.primary'>{value || '—'}</Typography>
//   </div>
// )

// export default UserDetails


'use client'

import { useEffect, useState } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid2'
import Box from '@mui/material/Box'

// Component Imports
import CustomAvatar from '@core/components/mui/Avatar'

const UserDetails = () => {
  const [userData, setUserData] = useState(null)

  useEffect(() => {
    const stored = localStorage.getItem('selectedUser')
    if (stored) {
      setUserData(JSON.parse(stored))
    }
  }, [])

  if (!userData) return <Typography>Loading user details...</Typography>

  const {
    EMPLOYEENAME,
    EMPLOYEEID,
    companyNameStatus,
    JOBLOCATION,
    REPORTINGMANAGER,
    PANNUMBER,
    AADHARCARD,
    DATEOFBIRTH,
    AGE,
    ZOBOXEXPERIENCE,
    EMERGENCYNUMBER,
    MARITALSTATUS,
    GENDER,
    BLOODGROUP,
    DESIGNATION,
    DEPARTMENT,
    EMAILID,
    MOBILENUMBER,
    DATEOFJOINING,
    status,
    Photo
  } = userData

  return (
    <Card sx={{ boxShadow: 3, borderRadius: 3 }}>
      <CardContent className='flex flex-col pbs-12 gap-6'>
        {/* ===== Profile Header ===== */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            mb: 4
          }}
        >
          <CustomAvatar
            alt='user-profile'
            src={Photo?.[0] || '/images/avatars/1.png'}
            variant='rounded'
            size={120}
            sx={{ mb: 2, border: '3px solid #ddd' }}
          />
          <Typography variant='h5' sx={{ fontWeight: 600 }}>
            {EMPLOYEENAME || '—'}
          </Typography>
          <Chip
            label={DESIGNATION || '—'}
            color='secondary'
            size='small'
            variant='tonal'
            sx={{ mt: 1 }}
          />
          <Typography variant='body2' sx={{ mt: 0.5 }} color='text.secondary'>
            {DEPARTMENT || '—'} • {JOBLOCATION || '—'}
          </Typography>
        </Box>

        {/* ===== Divider ===== */}
        <Divider sx={{ mb: 4 }} />

        {/* ===== Details Section ===== */}
        <Box>
          <Typography variant='h6' sx={{ mb: 2, fontWeight: 600 }}>
            Employee Information
          </Typography>

          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <DetailRow label='Employee ID' value={EMPLOYEEID} />
              <DetailRow label='Company Status' value={companyNameStatus} />
              <DetailRow label='Department' value={DEPARTMENT} />
              <DetailRow label='Designation' value={DESIGNATION} />
              <DetailRow label='Date of Joining' value={DATEOFJOINING} />
              <DetailRow label='Zobox Experience' value={ZOBOXEXPERIENCE} />
              <DetailRow label='Reporting Manager' value={REPORTINGMANAGER} />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <DetailRow label='Email' value={EMAILID} />
              <DetailRow label='Mobile Number' value={MOBILENUMBER} />
              <DetailRow label='Emergency Contact' value={EMERGENCYNUMBER} />
              <DetailRow label='PAN Number' value={PANNUMBER} />
              <DetailRow label='Aadhar Number' value={AADHARCARD} />
              <DetailRow label='Date of Birth' value={DATEOFBIRTH} />
              <DetailRow label='Age' value={AGE} />
            </Grid>
          </Grid>
        </Box>

        {/* ===== Personal Info ===== */}
        <Box sx={{ mt: 4 }}>
          <Typography variant='h6' sx={{ mb: 2, fontWeight: 600 }}>
            Personal Information
          </Typography>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <DetailRow label='Marital Status' value={MARITALSTATUS} />
              <DetailRow label='Gender' value={GENDER} />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <DetailRow label='Blood Group' value={BLOODGROUP} />
              <DetailRow label='Status' value={status} />
            </Grid>
          </Grid>
        </Box>
      </CardContent>
    </Card>
  )
}

// ✅ Small helper component for displaying rows
const DetailRow = ({ label, value }) => (
  <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      py: 1.2,
      px: 1.5,
      borderBottom: '1px solid',
      borderColor: 'divider',
      borderRadius: 1,
      transition: 'background-color 0.2s ease',
      '&:hover': { backgroundColor: 'action.hover' }
    }}
  >
    <Typography sx={{ fontWeight: 600 }} color='text.primary'>
      {label}:
    </Typography>
    <Typography color='text.secondary'>{value || '—'}</Typography>
  </Box>
)

export default UserDetails


