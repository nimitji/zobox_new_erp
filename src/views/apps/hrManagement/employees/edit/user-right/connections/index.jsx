// 'use client'

// // Next Imports
// import Link from 'next/link'

// // MUI Imports
// import Card from '@mui/material/Card'
// import CardHeader from '@mui/material/CardHeader'
// import CardContent from '@mui/material/CardContent'
// import Grid from '@mui/material/Grid2'
// import Typography from '@mui/material/Typography'
// import Switch from '@mui/material/Switch'

// // Third-party Imports
// import classnames from 'classnames'

// // Component Imports
// import CustomIconButton from '@core/components/mui/IconButton'

// // Vars
// const connectedAccountsArr = [
//   {
//     checked: true,
//     title: 'Google',
//     logo: '/images/logos/google.png',
//     subtitle: 'Calendar and Contacts'
//   },
//   {
//     checked: false,
//     title: 'Slack',
//     logo: '/images/logos/slack.png',
//     subtitle: 'Communications'
//   },
//   {
//     checked: true,
//     title: 'Github',
//     logo: '/images/logos/github.png',
//     subtitle: 'Manage your Git repositories'
//   },
//   {
//     checked: true,
//     title: 'Mailchimp',
//     subtitle: 'Email marketing service',
//     logo: '/images/logos/mailchimp.png'
//   },
//   {
//     title: 'Asana',
//     checked: false,
//     subtitle: 'Task Communication',
//     logo: '/images/logos/asana.png'
//   }
// ]

// const socialAccountsArr = [
//   {
//     title: 'Facebook',
//     isConnected: false,
//     logo: '/images/logos/facebook.png'
//   },
//   {
//     title: 'Twitter',
//     isConnected: true,
//     username: '@Pixinvent',
//     logo: '/images/logos/twitter.png',
//     href: 'https://twitter.com/pixinvents'
//   },
//   {
//     title: 'Linkedin',
//     isConnected: true,
//     username: '@Pixinvent',
//     logo: '/images/logos/linkedin.png',
//     href: 'https://www.linkedin.com/company/pixinvent'
//   },
//   {
//     title: 'Dribbble',
//     isConnected: false,
//     logo: '/images/logos/dribbble.png'
//   },
//   {
//     title: 'Behance',
//     isConnected: false,
//     logo: '/images/logos/behance.png'
//   }
// ]

// const ConnectionsTab = () => {
//   return (
//     <Grid container spacing={6}>
//       <Grid size={{ xs: 12 }}>
//         <Card>
//           <CardHeader
//             title='Connected Accounts'
//             subheader='Display content from your connected accounts on your site'
//           />
//           <CardContent className='flex flex-col gap-4'>
//             {connectedAccountsArr.map((item, index) => (
//               <div key={index} className='flex items-center justify-between gap-4'>
//                 <div className='flex flex-grow items-center gap-4'>
//                   <img height={36} width={36} src={item.logo} alt={item.title} />
//                   <div className='flex flex-col flex-grow gap-0.5'>
//                     <Typography className='font-medium' color='text.primary'>
//                       {item.title}
//                     </Typography>
//                     <Typography>{item.subtitle}</Typography>
//                   </div>
//                 </div>
//                 <Switch defaultChecked={item.checked} />
//               </div>
//             ))}
//           </CardContent>
//         </Card>
//       </Grid>
//       <Grid size={{ xs: 12 }}>
//         <Card>
//           <CardHeader title='Social Accounts' subheader='Display content from social accounts on your site' />
//           <CardContent className='flex flex-col gap-4'>
//             {socialAccountsArr.map((item, index) => (
//               <div key={index} className='flex items-center justify-between gap-4'>
//                 <div className='flex flex-grow items-center gap-4'>
//                   <img height={36} width={36} src={item.logo} alt={item.title} />
//                   <div className='flex flex-col flex-grow gap-0.5'>
//                     <Typography className='font-medium' color='text.primary'>
//                       {item.title}
//                     </Typography>
//                     {item.isConnected ? (
//                       <Typography color='primary.main' component={Link} href={item.href || '/'} target='_blank'>
//                         {item.username}
//                       </Typography>
//                     ) : (
//                       <Typography>Not Connected</Typography>
//                     )}
//                   </div>
//                 </div>
//                 <CustomIconButton variant='tonal' color={item.isConnected ? 'error' : 'secondary'}>
//                   <i className={classnames(item.isConnected ? 'tabler-trash text-error' : 'tabler-link')} />
//                 </CustomIconButton>
//               </div>
//             ))}
//           </CardContent>
//         </Card>
//       </Grid>
//     </Grid>
//   )
// }

// export default ConnectionsTab

'use client'

import { useEffect, useState } from 'react'

// 📦 MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid2'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'
import LinearProgress from '@mui/material/LinearProgress'
import Typography from '@mui/material/Typography'

// 🔧 Import API Function
import { updateUserFamilyDetails } from '../../../../../../../app/server/actions'

const ConnectionsTab = () => {
  const [userData, setUserData] = useState(null)
  const [family, setFamily] = useState({
    fatherName: '',
    motherName: '',
    spouseName: ''
  })
  const [loading, setLoading] = useState(false)
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  })

  // 🧩 Load family details from localStorage
  const loadUserData = () => {
    const stored = localStorage.getItem('selectedUser')
    if (stored) {
      const parsed = JSON.parse(stored)
      setUserData(parsed)

      const userFamily = parsed?.userFamilyDetails || {}
      setFamily({
        fatherName: userFamily.fatherName || '',
        motherName: userFamily.motherName || '',
        spouseName: userFamily.spouseName || ''
      })
    }
  }

  useEffect(() => {
    loadUserData()
  }, [])

  // 🧠 Handle input changes
  const handleChange = e => {
    const { name, value } = e.target
    setFamily(prev => ({ ...prev, [name]: value }))
  }

  // 🧱 Handle Save API call
  const handleSave = async () => {
    if (!userData?._id) {
      setSnackbar({
        open: true,
        message: 'No user found in localStorage!',
        severity: 'error'
      })
      return
    }

    try {
      setLoading(true)

      const result = await updateUserFamilyDetails(userData._id, family)
      console.log('✅ Backend Response:', result)

      if (result.success) {
        // ✅ Update localStorage with new family details
        const updatedUser = result.data 
        localStorage.setItem('selectedUser', JSON.stringify(updatedUser))
        setUserData(updatedUser)
        setFamily({ ...family })

        setSnackbar({
          open: true,
          message: result.message || 'Family details updated successfully!',
          severity: 'success'
        })
      } else {
        setSnackbar({
          open: true,
          message: result.message || 'Failed to update family details.',
          severity: 'error'
        })
      }
    } catch (err) {
      console.error('❌ handleSave error:', err)
      setSnackbar({
        open: true,
        message: 'Server error while updating family details.',
        severity: 'error'
      })
    } finally {
      setLoading(false)
    }
  }

  if (!userData) {
    return <Typography>Loading family details...</Typography>
  }

  return (
    <>
      <Card>
        <CardHeader
          title='Edit Family Details'
          subheader='Update information about employee’s immediate family members'
        />
        <CardContent>
          {loading && <LinearProgress sx={{ mb: 2 }} />}

          <Grid container spacing={3}>
            {Object.keys(family).map(field => (
              <Grid key={field} size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label={
                    field === 'fatherName'
                      ? 'Father’s Name'
                      : field === 'motherName'
                      ? 'Mother’s Name'
                      : 'Spouse Name'
                  }
                  name={field}
                  value={family[field] || ''}
                  onChange={handleChange}
                  variant='outlined'
                />
              </Grid>
            ))}

            <Grid size={{ xs: 12 }} className='flex gap-4 justify-center mt-4'>
              <Button
                variant='contained'
                color='primary'
                onClick={handleSave}
                disabled={loading}
              >
                {loading ? 'Saving...' : 'Save Changes'}
              </Button>

              <Button
                variant='outlined'
                color='secondary'
                onClick={loadUserData}
                disabled={loading}
              >
                Reset
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* ✅ Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MuiAlert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          variant='filled'
          sx={{
            width: '100%',
            backgroundColor:
              snackbar.severity === 'success' ? '#2B3380' : '#D32F2F',
            color: 'white',
            fontWeight: 500
          }}
        >
          {snackbar.message}
        </MuiAlert>
      </Snackbar>
    </>
  )
}

export default ConnectionsTab

