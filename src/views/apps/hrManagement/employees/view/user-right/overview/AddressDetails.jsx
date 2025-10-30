

'use client'

import { useEffect, useState } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid2'
import Divider from '@mui/material/Divider'

const AddressDetails = () => {
  const [address, setAddress] = useState(null)

  useEffect(() => {
    const stored = localStorage.getItem('selectedUser')
    if (stored) {
      const user = JSON.parse(stored)
      setAddress(user?.permanentAddress || user?.address?.[0] || null)
    }
  }, [])

  if (!address) return <Typography>Loading address...</Typography>

  const { Plot, Building, Street, City, State, Country, Pincode, TypeofAddress } = address

  return (
    <Card>
      <CardHeader title='Address Details' />
      <Divider />
      <CardContent>
        <Grid container spacing={4}>
          {/* Left Column */}
          <Grid size={{ xs: 12, md: 6 }}>
            <TableRow label='Plot' value={Plot} />
            <TableRow label='Building' value={Building} />
            <TableRow label='Street' value={Street} />
            <TableRow label='City' value={City} />
          </Grid>

          {/* Right Column */}
          <Grid size={{ xs: 12, md: 6 }}>
            <TableRow label='State' value={State} />
            <TableRow label='Country' value={Country} />
            <TableRow label='Pincode' value={Pincode} />
            <TableRow label='Address Type' value={TypeofAddress} />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

// ✅ Helper: Uniform, bold label styling
const TableRow = ({ label, value }) => (
  <div className='flex items-center gap-2 mb-2'>
    <Typography sx={{ fontWeight: 600 }} color='text.primary'>
      {label}:
    </Typography>
    <Typography color='text.secondary'>{value || '—'}</Typography>
  </div>
)

export default AddressDetails

