// // MUI Imports
// import Card from '@mui/material/Card'
// import CardHeader from '@mui/material/CardHeader'
// import CardActions from '@mui/material/CardActions'
// import Typography from '@mui/material/Typography'
// import Checkbox from '@mui/material/Checkbox'
// import Button from '@mui/material/Button'

// // Style Imports
// import tableStyles from '@core/styles/table.module.css'

// // Vars
// const tableData = [
//   {
//     app: false,
//     email: true,
//     browser: false,
//     type: 'New for you'
//   },
//   {
//     app: true,
//     email: false,
//     browser: true,
//     type: 'Account activity'
//   },
//   {
//     app: true,
//     email: true,
//     browser: true,
//     type: 'A new browser used to sign in'
//   },
//   {
//     app: false,
//     email: false,
//     browser: true,
//     type: 'A new device is linked'
//   }
// ]

// const NotificationsTab = () => {
//   return (
//     <Card>
//       <CardHeader title='Notifications' subheader='You will receive notification for the below selected items' />
//       <div className='overflow-x-auto'>
//         <table className={tableStyles.table}>
//           <thead>
//             <tr>
//               <th>Type</th>
//               <th>App</th>
//               <th>Email</th>
//               <th>Browser</th>
//             </tr>
//           </thead>
//           <tbody className='border-be'>
//             {tableData.map((data, index) => (
//               <tr key={index}>
//                 <td>
//                   <Typography color='text.primary'>{data.type}</Typography>
//                 </td>
//                 <td>
//                   <Checkbox defaultChecked={data.app} />
//                 </td>
//                 <td>
//                   <Checkbox defaultChecked={data.email} />
//                 </td>
//                 <td>
//                   <Checkbox defaultChecked={data.browser} />
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//       <CardActions className='flex items-center'>
//         <Button variant='contained' type='submit'>
//           Save Changes
//         </Button>
//         <Button variant='tonal' color='secondary' type='reset'>
//           Discard
//         </Button>
//       </CardActions>
//     </Card>
//   )
// }

// export default NotificationsTab


'use client'

import { useEffect, useState } from 'react'

// 📦 MUI Imports
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

// 🔧 API import
 import { updateUserBankDetails } from '../../../../../../../app/server/actions'

const NotificationsTab = () => {
  const [userData, setUserData] = useState(null)
  const [bank, setBank] = useState({
    nameofHolder: '',
    bankAccountNum: '',
    bank: '',
    branchName: '',
    bankIFSC: '',
    accountType: '',
    upiID: '',
    taxPlayerId: ''
  })

  const [loading, setLoading] = useState(false)
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  })

  // 🧩 Load user & bank details from localStorage
  const loadUserData = () => {
    const stored = localStorage.getItem('selectedUser')
    if (stored) {
      const parsed = JSON.parse(stored)
      setUserData(parsed)

      const userBank = parsed?.userBank || {}
      setBank({
        nameofHolder: userBank.nameofHolder || '',
        bankAccountNum: userBank.bankAccountNum || '',
        bank: userBank.bank || '',
        branchName: userBank.branchName || '',
        bankIFSC: userBank.bankIFSC || '',
        accountType: userBank.accountType || '',
        upiID: userBank.upiID || '',
        taxPlayerId: userBank.taxPlayerId || ''
      })
    }
  }

  useEffect(() => {
    loadUserData()
  }, [])

  // 🧠 Handle field changes
  const handleChange = e => {
    const { name, value } = e.target
    setBank(prev => ({ ...prev, [name]: value }))
  }

  // 🧱 Save updated bank details to backend
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
      const result = await updateUserBankDetails(userData._id, bank)
      console.log('✅ Backend Response:', result)

      if (result.success) {
        // ✅ Update localStorage and React state
        const updatedUser = result.data 
        localStorage.setItem('selectedUser', JSON.stringify(updatedUser))
        setUserData(updatedUser)
        setBank({ ...bank })

        setSnackbar({
          open: true,
          message: result.message || 'Bank details updated successfully!',
          severity: 'success'
        })
      } else {
        setSnackbar({
          open: true,
          message: result.message || 'Failed to update bank details.',
          severity: 'error'
        })
      }
    } catch (error) {
      console.error('❌ handleSave error:', error)
      setSnackbar({
        open: true,
        message: 'Server error while updating bank details.',
        severity: 'error'
      })
    } finally {
      setLoading(false)
    }
  }

  if (!userData) {
    return <Typography>Loading bank details...</Typography>
  }

  return (
    <>
      <Card>
        <CardHeader title='Edit Bank Details' subheader='Employee’s registered bank information' />
        <CardContent>
          {loading && <LinearProgress sx={{ mb: 2 }} />}

          <Grid container spacing={3}>
            {[
              'nameofHolder',
              'bankAccountNum',
              'bank',
              'branchName',
              'bankIFSC',
              'accountType',
              'upiID',
              'taxPlayerId'
            ].map(field => (
              <Grid key={field} size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label={
                    field === 'nameofHolder'
                      ? 'Account Holder Name'
                      : field === 'bankAccountNum'
                      ? 'Account Number'
                      : field === 'bank'
                      ? 'Bank Name'
                      : field === 'branchName'
                      ? 'Branch Name'
                      : field === 'bankIFSC'
                      ? 'IFSC Code'
                      : field === 'accountType'
                      ? 'Account Type'
                      : field === 'upiID'
                      ? 'UPI ID'
                      : field === 'taxPlayerId'
                      ? 'Tax Payer ID'
                      : field
                  }
                  name={field}
                  value={bank[field] || ''}
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

export default NotificationsTab
