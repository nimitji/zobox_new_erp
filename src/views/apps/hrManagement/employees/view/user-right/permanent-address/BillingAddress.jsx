

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
  const addressData = userData?.permanentAddress || (userData?.permanentAddress ?? {})

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


