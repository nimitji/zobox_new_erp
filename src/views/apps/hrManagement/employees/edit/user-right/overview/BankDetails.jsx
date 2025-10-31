

'use client'

import { useEffect, useState } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid2'
import Divider from '@mui/material/Divider'

const BankDetails = () => {
  const [bank, setBank] = useState(null)

  // 🧩 Load bank details from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('selectedUser')
    if (stored) {
      const user = JSON.parse(stored)
      setBank(user?.userBank || null)
    }
  }, [])

  if (!bank) return <Typography>Loading bank details...</Typography>

  const {
    nameofHolder,
    bankAccountNum,
    bank: bankName,
    bankIFSC,
    branchName,
    accountType,
    upiID,
    taxPlayerId
  } = bank

  return (
    <Card>
      <CardHeader title='Bank Details' />
      <Divider />
      <CardContent>
        <Grid container spacing={4}>
          {/* Left Column */}
          <Grid size={{ xs: 12, md: 6 }}>
            <TableRow label='Account Holder' value={nameofHolder} />
            <TableRow label='Account Number' value={bankAccountNum} />
            <TableRow label='Bank Name' value={bankName} />
            <TableRow label='Branch Name' value={branchName} />
          </Grid>

          {/* Right Column */}
          <Grid size={{ xs: 12, md: 6 }}>
            <TableRow label='IFSC Code' value={bankIFSC} />
            <TableRow label='Account Type' value={accountType} />
            <TableRow label='UPI ID' value={upiID} />
            <TableRow label='Tax Payer ID' value={taxPlayerId} />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

// ✅ Helper Row Component with bold label
const TableRow = ({ label, value }) => (
  <div className='flex items-center gap-2 mb-2'>
    <Typography sx={{ fontWeight: 600 }} color='text.primary'>
      {label}:
    </Typography>
    <Typography color='text.secondary'>{value || '—'}</Typography>
  </div>
)

export default BankDetails

