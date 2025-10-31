


'use client'

import { useEffect, useState } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid2'
import Divider from '@mui/material/Divider'

const FamilyDetails = () => {
  const [family, setFamily] = useState(null)

  // 🧩 Load data from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('selectedUser')
    if (stored) {
      const user = JSON.parse(stored)
      setFamily(user?.userFamilyDetails || null)
    }
  }, [])

  if (!family) return <Typography>Loading family details...</Typography>

  const { fatherName, motherName, spouseName } = family

  return (
    <Card>
      <CardHeader title='Family Details' />
      <Divider />
      <CardContent>
        <Grid container spacing={4}>
          {/* Left Column */}
          <Grid size={{ xs: 12, md: 6 }}>
            <TableRow label="Father’s Name" value={fatherName} />
            <TableRow label="Mother’s Name" value={motherName} />
          </Grid>

          {/* Right Column */}
          <Grid size={{ xs: 12, md: 6 }}>
            <TableRow label="Spouse Name" value={spouseName} />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

// ✅ Reusable TableRow Component
const TableRow = ({ label, value }) => (
  <div className="flex items-center gap-2 mb-2">
    <Typography sx={{ fontWeight: 600 }} color="text.primary">
      {label}:
    </Typography>
    <Typography color="text.secondary">{value || '—'}</Typography>
  </div>
)

export default FamilyDetails
