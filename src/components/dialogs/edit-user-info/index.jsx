



'use client'

import { useEffect, useState, useRef } from 'react'
import Grid from '@mui/material/Grid2'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Divider from '@mui/material/Divider'
import LinearProgress from '@mui/material/LinearProgress'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import dayjs from 'dayjs'

import CustomAvatar from '@core/components/mui/Avatar'
import DialogCloseButton from '../DialogCloseButton'
// import {updateUserDetails} from '../../../app/server/actions'

const EditUserInfo = ({ open, setOpen }) => {
  const [userData, setUserData] = useState(null)
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' })

  const fileInputRef = useRef(null)

  // ✅ Load selected user data when dialog opens
  useEffect(() => {
    const stored = localStorage.getItem('selectedUser')
    if (stored) setUserData(JSON.parse(stored))
  }, [open])

  // ✅ Create preview when file selected
  useEffect(() => {
    if (!file) return
    const url = URL.createObjectURL(file)
    setPreview(url)
    return () => URL.revokeObjectURL(url)
  }, [file])

  const handleFileSelect = e => {
    const f = e.target.files?.[0]
    if (!f) return
    setFile(f)
  }

  const handleSave = async () => {
    if (!userData?._id) {
      setSnackbar({ open: true, message: 'User ID missing!', severity: 'error' })
      return
    }

    try {
      const formData = new FormData()
      if (file) formData.append('userPhoto', file)

      Object.entries(userData).forEach(([key, value]) => {
        if (value === null || value === undefined) return
        if (typeof value === 'object') formData.append(key, JSON.stringify(value))
        else formData.append(key, value)
      })

      setUploading(true)
      // const res = await updateUserDetails(userData._id,formData)
      const API_URL = process.env.NEXT_PUBLIC_API_URL 
      // const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'
      const res = await fetch(`${API_URL}/zobiz/update-user/${userData._id}`, {
        method: 'PUT',
        body: formData
      })

      const text = await res.text()
      let result
      try {
        result = JSON.parse(text)
      } catch {
        console.error('Invalid JSON:', text)
        setSnackbar({ open: true, message: '⚠️ Invalid response from server', severity: 'warning' })
        setUploading(false)
        return
      }

      if (result.success) {
        localStorage.setItem('selectedUser', JSON.stringify(result.data))
        setSnackbar({ open: true, message: '✅ User details updated successfully!', severity: 'success' })
        setOpen(false)
        // ✅ Optional refresh (to reload UI)
        setTimeout(() => window.location.reload(), 800)
      } else {
        setSnackbar({ open: true, message: result.message || 'Update failed', severity: 'error' })
      }
    } catch (err) {
      console.error('❌ Error updating user:', err)
      setSnackbar({ open: true, message: '❌ Error updating user details', severity: 'error' })
    } finally {
      setUploading(false)
    }
  }

  if (!userData) return null

  return (
    <>
      <Dialog fullWidth open={open} onClose={() => setOpen(false)} maxWidth='md'>
        <DialogCloseButton onClick={() => setOpen(false)} disableRipple>
          <i className='tabler-x' />
        </DialogCloseButton>
        <DialogTitle variant='h4' align='center'>
          Edit User Information
        </DialogTitle>
        <Divider />

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DialogContent>
            {/* ==== Avatar Section ==== */}
            <div className='flex flex-col items-center mb-6'>
              <CustomAvatar
                src={preview || userData.Photo?.[0] || '/images/avatars/1.png'}
                size={120}
                variant='rounded'
                sx={{ border: '3px solid #2B3380' }}
              />
              <div className='flex gap-2 mt-2'>
                <Button variant='outlined' size='small' onClick={() => fileInputRef.current.click()}>
                  Choose Photo
                </Button>
                <input
                  type='file'
                  ref={fileInputRef}
                  hidden
                  accept='image/*'
                  onChange={handleFileSelect}
                />
              </div>
            </div>

            {/* ==== Editable Fields ==== */}
            <Grid container spacing={4}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label='Employee Name'
                  value={userData.EMPLOYEENAME || ''}
                  onChange={e => setUserData({ ...userData, EMPLOYEENAME: e.target.value })}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label='Email ID'
                  value={userData.EMAILID || ''}
                  onChange={e => setUserData({ ...userData, EMAILID: e.target.value })}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label='Mobile Number'
                  value={userData.MOBILENUMBER || ''}
                  onChange={e => setUserData({ ...userData, MOBILENUMBER: e.target.value })}
                />
              </Grid>

              {/* ==== Date of Birth ==== */}
              <Grid size={{ xs: 12, sm: 6 }}>
                <DatePicker
                  label='Date of Birth'
                  value={userData.DATEOFBIRTH ? dayjs(userData.DATEOFBIRTH, 'DD-MM-YYYY') : null}
                  format='DD-MM-YYYY'
                  onChange={newValue => {
                    const formatted = newValue ? dayjs(newValue).format('DD-MM-YYYY') : ''
                    setUserData({ ...userData, DATEOFBIRTH: formatted })
                  }}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      variant: 'outlined',
                      sx: {
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': { borderColor: '#2B3380' },
                          '&:hover fieldset': { borderColor: '#2B3380' },
                          '&.Mui-focused fieldset': {
                            borderColor: '#2B3380',
                            borderWidth: '2px'
                          }
                        },
                        '& .MuiInputLabel-root.Mui-focused': { color: '#2B3380' }
                      }
                    }
                  }}
                />
              </Grid>

              {/* ==== Gender ==== */}
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  select
                  fullWidth
                  label='Gender'
                  value={userData.GENDER || ''}
                  onChange={e => setUserData({ ...userData, GENDER: e.target.value })}
                >
                  <MenuItem value='Male'>Male</MenuItem>
                  <MenuItem value='Female'>Female</MenuItem>
                </TextField>
              </Grid>
            </Grid>

            {uploading && <LinearProgress sx={{ mt: 2 }} />}
          </DialogContent>
        </LocalizationProvider>

        <DialogActions sx={{ justifyContent: 'center', mb: 2 }}>
          <Button variant='contained' onClick={handleSave}>
            Save Changes
          </Button>
          <Button variant='outlined' color='secondary' onClick={() => setOpen(false)}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      {/* ✅ Snackbar Notification */}
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
            backgroundColor: snackbar.severity === 'success' ? '#2B3380' : '#D32F2F',
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

export default EditUserInfo


