

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
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import dayjs from 'dayjs'

import CustomAvatar from '@core/components/mui/Avatar'
import DialogCloseButton from '../DialogCloseButton'

const EditUserInfo = ({ open, setOpen }) => {
  const [userData, setUserData] = useState(null)
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [uploading, setUploading] = useState(false)

  const fileInputRef = useRef(null)

  useEffect(() => {
    const stored = localStorage.getItem('selectedUser')
    if (stored) setUserData(JSON.parse(stored))
  }, [open])

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
    if (!userData?._id) return alert('User ID missing!')

    try {
      const formData = new FormData()

      if (file) formData.append('avatar', file)
      Object.entries(userData).forEach(([key, value]) => {
        if (value === null || value === undefined) return
        if (typeof value === 'object') formData.append(key, JSON.stringify(value))
        else formData.append(key, value)
      })

      setUploading(true)

      const res = await fetch(`http://localhost:3001/zobiz/update-user/${userData._id}`, {
        method: 'PUT',
        body: formData
      })

      const text = await res.text()
      let result
      try {
        result = JSON.parse(text)
      } catch {
        console.error('Invalid JSON:', text)
        alert('Invalid response from server')
        setUploading(false)
        return
      }

      if (result.success) {
        localStorage.setItem('selectedUser', JSON.stringify(result.data))
        alert('✅ User details & image updated successfully!')
        setOpen(false)
      } else {
        alert(result.message || 'Update failed')
      }
    } catch (err) {
      console.error('❌ Error updating user:', err)
      alert('Error updating user details')
    } finally {
      setUploading(false)
    }
  }

  if (!userData) return null

  return (
    <Dialog fullWidth open={open} onClose={() => setOpen(false)} maxWidth='md'>
      <DialogCloseButton onClick={() => setOpen(false)} disableRipple>
        <i className='tabler-x' />
      </DialogCloseButton>
      <DialogTitle variant='h4' align='center'>
        Edit User Information
      </DialogTitle>
      <Divider />

      {/* ✅ Wrap your content with LocalizationProvider */}
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

            {/* ✅ DatePicker now works safely inside LocalizationProvider */}
            {/* <Grid size={{ xs: 12, sm: 6 }}>
              <DatePicker
                label='Date of Birth'
                value={
                  userData.DATEOFBIRTH
                    ? dayjs(userData.DATEOFBIRTH, 'DD-MM-YYYY')
                    : null
                }
                format='DD-MM-YYYY'
                onChange={newValue => {
                  const formatted = newValue
                    ? dayjs(newValue).format('DD-MM-YYYY')
                    : ''
                  setUserData({ ...userData, DATEOFBIRTH: formatted })
                }}
                slotProps={{ textField: { fullWidth: true } }}
              />
            </Grid> */}

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
        variant: 'outlined', // ✅ Force outlined variant so borders appear
        sx: {
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#2B3380' // ✅ Default border
            },
            '&:hover fieldset': {
              borderColor: '#2B3380' // ✅ On hover
            },
            '&.Mui-focused fieldset': {
              borderColor: '#2B3380', // ✅ On focus
              borderWidth: '2px'
            }
          },
          '& .MuiInputLabel-root.Mui-focused': {
            color: '#2B3380' // ✅ Focused label color
          }
        }
      }
    }}
  />
</Grid>



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
  )
}

export default EditUserInfo




