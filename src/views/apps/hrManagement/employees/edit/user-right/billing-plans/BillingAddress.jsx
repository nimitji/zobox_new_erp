
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
import { updateUserAddress } from '../../../../../../../app/server/actions'

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

      const addr = parsed?.address?.[0] || {}
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

      const result = await updateUserAddress(userData._id, address)
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

