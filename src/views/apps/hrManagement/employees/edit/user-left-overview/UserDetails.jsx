

'use client'

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import Divider from '@mui/material/Divider'
import Button from '@mui/material/Button'

// Component Imports
import EditUserInfo from '@components/dialogs/edit-user-info'
import ConfirmationDialog from '@components/dialogs/confirmation-dialog'
import OpenDialogOnElementClick from '@components/dialogs/OpenDialogOnElementClick'
import CustomAvatar from '@core/components/mui/Avatar'

// React Imports
import { useEffect, useState } from 'react'

const UserDetails = () => {
  const [userData, setUserData] = useState(null)

  // 🧩 Load data from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('selectedUser')
    if (stored) {
      setUserData(JSON.parse(stored))
    }
  }, [])

  if (!userData) {
    return <Typography>Loading user details...</Typography>
  }

  const {
    EMPLOYEENAME,
    DESIGNATION,
    DEPARTMENT,
    EMAILID,
    MOBILENUMBER,
    DATEOFJOINING,
    status,
    Photo
  } = userData

  // 🧠 Helper: button props for dialog components
  const buttonProps = (children, color, variant) => ({
    children,
    color,
    variant
  })

  return (
    <Card>
      <CardContent className='flex flex-col pbs-12 gap-6'>
        {/* ===== Header / Avatar Section ===== */}
        <div className='flex flex-col gap-6'>
          <div className='flex items-center justify-center flex-col gap-4'>
            <div className='flex flex-col items-center gap-4'>
              <CustomAvatar
                alt='user-profile'
                src={Photo?.[0] || '/images/avatars/1.png'}
                variant='rounded'
                size={120}
              />
              <Typography variant='h5'>{EMPLOYEENAME || '—'}</Typography>
            </div>
            <Chip
              label={DESIGNATION || '—'}
              color='secondary'
              size='small'
              variant='tonal'
            />
          </div>

          {/* ===== Quick Stats (Optional Static) ===== */}
        {/* <div className='flex items-center justify-around flex-wrap gap-4'>
            <div className='flex items-center gap-4'>
              <CustomAvatar variant='rounded' color='primary' skin='light'>
                <i className='tabler-checkbox' />
              </CustomAvatar>
              <div>
                <Typography variant='h5'>1.23k</Typography>
                <Typography>Task Done</Typography>
              </div>
            </div>
            <div className='flex items-center gap-4'>
              <CustomAvatar variant='rounded' color='primary' skin='light'>
                <i className='tabler-briefcase' />
              </CustomAvatar>
              <div>
                <Typography variant='h5'>568</Typography>
                <Typography>Project Done</Typography>
              </div>
            </div>
          </div> */}
            </div>
      
       

        {/* ===== Detailed Info ===== */}
        <div>
          <Typography variant='h5'>Details</Typography>
          <Divider className='mlb-4' />
          <div className='flex flex-col gap-2'>
            <DetailRow label='Department' value={DEPARTMENT} />
            <DetailRow label='Designation' value={DESIGNATION} />
            <DetailRow label='Email' value={EMAILID} />
            <DetailRow label='Mobile Number' value={MOBILENUMBER} />
            <DetailRow label='Date of Joining' value={DATEOFJOINING} />
            <DetailRow label='Status' value={status} />
          </div>
        </div>

        {/* ===== Action Buttons ===== */}
        <div className='flex gap-4 justify-center'>
          <OpenDialogOnElementClick
            element={Button}
            elementProps={buttonProps('Edit', 'primary', 'contained')}
            dialog={EditUserInfo}
            dialogProps={{ data: userData }}
          />
          <OpenDialogOnElementClick
            element={Button}
            elementProps={buttonProps('Suspend', 'error', 'tonal')}
            dialog={ConfirmationDialog}
            dialogProps={{ type: 'suspend-account' }}
          />
        </div>
      </CardContent>
    </Card>
  )
}

// ✅ Small helper component for displaying rows
const DetailRow = ({ label, value }) => (
  <div className='flex items-center flex-wrap gap-x-1.5'>
    <Typography className='font-medium' color='text.primary'>
      {label}:
    </Typography>
    <Typography color='text.primary'>{value || '—'}</Typography>
  </div>
)

export default UserDetails

