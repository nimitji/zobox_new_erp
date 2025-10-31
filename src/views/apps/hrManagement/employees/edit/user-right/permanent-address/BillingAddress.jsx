// // MUI Imports
// import Card from '@mui/material/Card'
// import CardHeader from '@mui/material/CardHeader'
// import CardContent from '@mui/material/CardContent'
// import Button from '@mui/material/Button'
// import Grid from '@mui/material/Grid2'
// import Typography from '@mui/material/Typography'

// // Component Imports
// import AddNewAddress from '@components/dialogs/add-edit-address'
// import OpenDialogOnElementClick from '@components/dialogs/OpenDialogOnElementClick'

// // Vars
// const data = {
//   firstName: 'John',
//   lastName: 'Doe',
//   email: 'johndoe@gmail.com',
//   country: 'US',
//   address1: '100 Water Plant Avenue,',
//   address2: 'Building 1303 Wake Island',
//   landmark: 'Near Water Plant',
//   city: 'New York',
//   state: 'Capholim',
//   zipCode: '403114',
//   taxId: 'TAX-875623',
//   vatNumber: 'SDF754K77',
//   contact: '+1(609) 933-44-22'
// }

// const BillingAddress = () => {
//   const buttonProps = {
//     variant: 'contained',
//     children: 'Edit Address',
//     size: 'small',
//     startIcon: <i className='tabler-plus' />
//   }

//   return (
//     <>
//       <Card>
//         <CardHeader
//           title='Billing Address'
//           action={
//             <OpenDialogOnElementClick
//               element={Button}
//               elementProps={buttonProps}
//               dialog={AddNewAddress}
//               dialogProps={{ data }}
//             />
//           }
//         />
//         <CardContent>
//           <Grid container>
//             <Grid size={{ xs: 12, md: 6 }}>
//               <table>
//                 <tbody className='align-top'>
//                   <tr>
//                     <td className='p-1 pis-0 is-[150px]'>
//                       <Typography className='font-medium' color='text.primary'>
//                         Name:
//                       </Typography>
//                     </td>
//                     <td className='p-1'>
//                       <Typography>{`${data.firstName} ${data.lastName}`}</Typography>
//                     </td>
//                   </tr>
//                   <tr>
//                     <td className='p-1 pis-0 is-[150px]'>
//                       <Typography className='font-medium' color='text.primary'>
//                         Billing Email:
//                       </Typography>
//                     </td>
//                     <td className='p-1'>
//                       <Typography>{data.email}</Typography>
//                     </td>
//                   </tr>
//                   <tr>
//                     <td className='p-1 pis-0 is-[150px]'>
//                       <Typography className='font-medium' color='text.primary'>
//                         Tax ID:
//                       </Typography>
//                     </td>
//                     <td className='p-1'>
//                       <Typography>{data.taxId}</Typography>
//                     </td>
//                   </tr>
//                   <tr>
//                     <td className='p-1 pis-0 is-[150px]'>
//                       <Typography className='font-medium' color='text.primary'>
//                         VAT Number:
//                       </Typography>
//                     </td>
//                     <td className='p-1'>
//                       <Typography>{data.vatNumber}</Typography>
//                     </td>
//                   </tr>
//                   <tr>
//                     <td className='p-1 pis-0 is-[150px]'>
//                       <Typography className='font-medium' color='text.primary'>
//                         Billing Address:
//                       </Typography>
//                     </td>
//                     <td className='p-1'>
//                       <Typography>{`${data.address1} ${data.address2}`}</Typography>
//                     </td>
//                   </tr>
//                 </tbody>
//               </table>
//             </Grid>
//             <Grid size={{ xs: 12, md: 6 }}>
//               <table>
//                 <tbody className='align-top'>
//                   <tr>
//                     <td className='p-1 pis-0 is-[150px]'>
//                       <Typography className='font-medium' color='text.primary'>
//                         Contact:
//                       </Typography>
//                     </td>
//                     <td className='p-1'>
//                       <Typography>{data.contact}</Typography>
//                     </td>
//                   </tr>
//                   <tr>
//                     <td className='p-1 pis-0 is-[150px]'>
//                       <Typography className='font-medium' color='text.primary'>
//                         Landmark:
//                       </Typography>
//                     </td>
//                     <td className='p-1'>
//                       <Typography>{data.landmark}</Typography>
//                     </td>
//                   </tr>
//                   <tr>
//                     <td className='p-1 pis-0 is-[150px]'>
//                       <Typography className='font-medium' color='text.primary'>
//                         Landmark:
//                       </Typography>
//                     </td>
//                     <td className='p-1'>
//                       <Typography>{data.city}</Typography>
//                     </td>
//                   </tr>
//                   <tr>
//                     <td className='p-1 pis-0 is-[150px]'>
//                       <Typography className='font-medium' color='text.primary'>
//                         Country:
//                       </Typography>
//                     </td>
//                     <td className='p-1'>
//                       <Typography>{data.country}</Typography>
//                     </td>
//                   </tr>
//                   <tr>
//                     <td className='p-1 pis-0 is-[150px]'>
//                       <Typography className='font-medium' color='text.primary'>
//                         State:
//                       </Typography>
//                     </td>
//                     <td className='p-1'>
//                       <Typography>{data.state}</Typography>
//                     </td>
//                   </tr>
//                   <tr>
//                     <td className='p-1 pis-0 is-[150px]'>
//                       <Typography className='font-medium' color='text.primary'>
//                         Zip Code:
//                       </Typography>
//                     </td>
//                     <td className='p-1'>
//                       <Typography>{data.zipCode}</Typography>
//                     </td>
//                   </tr>
//                 </tbody>
//               </table>
//             </Grid>
//           </Grid>
//         </CardContent>
//       </Card>
//     </>
//   )
// }

// export default BillingAddress


'use client'

import { useEffect, useState } from 'react'

// MUI Imports
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

// 🔧 API Function
import { updateUserPermanentAddress } from '../../../../../../../app/server/actions'

const BillingAddress = () => {
  const [userData, setUserData] = useState(null)
  const [address, setAddress] = useState({
    Plot: '',
    Building: '',
    Street: '',
    City: '',
    State: '',
    Country: '',
    Pincode: '',
    TypeofAddress: ''
  })
  const [loading, setLoading] = useState(false)
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  })

  // 🧩 Load address from localStorage
  const loadUserData = () => {
    const stored = localStorage.getItem('selectedUser')
    if (stored) {
      const parsed = JSON.parse(stored)
      setUserData(parsed)

      const addr = parsed?.permanentAddress || {}
      setAddress({
        Plot: addr.Plot || '',
        Building: addr.Building || '',
        Street: addr.Street || '',
        City: addr.City || '',
        State: addr.State || '',
        Country: addr.Country || '',
        Pincode: addr.Pincode || '',
        TypeofAddress: addr.TypeofAddress || ''
      })
    }
  }

  useEffect(() => {
    loadUserData()
  }, [])

  // 🧠 Handle input changes
  const handleChange = e => {
    const { name, value } = e.target
    setAddress(prev => ({ ...prev, [name]: value }))
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

      const result = await updateUserPermanentAddress(userData._id, address)
      console.log('✅ Backend response:', result)

      if (result.success) {
        // ✅ Merge updated address into localStorage
        const updatedUser =  result.data  //{ ...userData, address: [address] }
        localStorage.setItem('selectedUser', JSON.stringify(updatedUser))

        // ✅ Update UI immediately
        setUserData(updatedUser)
        setAddress({ ...address })

        setSnackbar({
          open: true,
          message: result.message || 'Address updated successfully!',
          severity: 'success'
        })
      } else {
        setSnackbar({
          open: true,
          message: result.message || 'Failed to update address.',
          severity: 'error'
        })
      }
    } catch (err) {
      console.error('❌ handleSave error:', err)
      setSnackbar({
        open: true,
        message: 'Server error while updating address.',
        severity: 'error'
      })
    } finally {
      setLoading(false)
    }
  }

  if (!userData) {
    return <Typography>Loading address details...</Typography>
  }

  return (
    <>
      <Card>
        <CardHeader title='Edit Address Details' />
        <CardContent>
          {loading && <LinearProgress sx={{ mb: 2 }} />}

          <Grid container spacing={3}>
            {Object.keys(address).map(field => (
              <Grid key={field} size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label={field}
                  name={field}
                  value={address[field] || ''}
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

export default BillingAddress

