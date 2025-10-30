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

// React Imports
import { useEffect, useState } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid2'
import Typography from '@mui/material/Typography'

// 🏠 Dynamic Billing Address Component
const BillingAddress = () => {
  const [userData, setUserData] = useState(null)

  // 🧩 Load selected user from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('selectedUser')
    if (stored) {
      setUserData(JSON.parse(stored))
    }
  }, [])

  if (!userData) {
    return <Typography>Loading address details...</Typography>
  }

  // 🏠 Extract address data — prefer permanentAddress, fallback to address[0]
  const addressData = userData?.address?.[0] || (userData?.address?.[0] ?? {})

  const {
    Plot,
    Building,
    Street,
    City,
    State,
    Country,
    Pincode,
    TypeofAddress
  } = addressData

  return (
    <Card>
      <CardHeader title='Address Details' />
      <CardContent>
        <Grid container>
          {/* Left Column */}
          <Grid size={{ xs: 12, md: 6 }}>
            <table>
              <tbody className='align-top'>
                <TableRow label='Plot' value={Plot} />
                <TableRow label='Building' value={Building} />
                <TableRow label='Street' value={Street} />
                <TableRow label='City' value={City} />
              </tbody>
            </table>
          </Grid>

          {/* Right Column */}
          <Grid size={{ xs: 12, md: 6 }}>
            <table>
              <tbody className='align-top'>
                <TableRow label='State' value={State} />
                <TableRow label='Country' value={Country} />
                <TableRow label='Pincode' value={Pincode} />
                <TableRow label='Address Type' value={TypeofAddress} />
              </tbody>
            </table>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

// ✅ Small helper component for rows
const TableRow = ({ label, value }) => (
  <tr>
    <td className='p-1 pis-0 is-[150px]'>
      <Typography className='font-medium' color='text.primary'>
        {label}:
      </Typography>
    </td>
    <td className='p-1'>
      <Typography>{value || '—'}</Typography>
    </td>
  </tr>
)

export default BillingAddress

