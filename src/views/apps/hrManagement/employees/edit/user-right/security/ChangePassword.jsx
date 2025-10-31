// 'use client'

// // React Imports
// import { useState } from 'react'

// // MUI Imports
// import Card from '@mui/material/Card'
// import CardHeader from '@mui/material/CardHeader'
// import CardContent from '@mui/material/CardContent'
// import Grid from '@mui/material/Grid2'
// import InputAdornment from '@mui/material/InputAdornment'
// import IconButton from '@mui/material/IconButton'
// import Alert from '@mui/material/Alert'
// import AlertTitle from '@mui/material/AlertTitle'
// import Button from '@mui/material/Button'

// // Component Imports
// import CustomTextField from '@core/components/mui/TextField'

// const ChangePassword = () => {
//   // States
//   const [isPasswordShown, setIsPasswordShown] = useState(false)
//   const [isConfirmPasswordShown, setIsConfirmPasswordShown] = useState(false)

//   return (
//     <Card>
//       <CardHeader title='Change Password' />
//       <CardContent className='flex flex-col gap-4'>
//         <Alert icon={false} severity='warning' onClose={() => {}}>
//           <AlertTitle>Ensure that these requirements are met</AlertTitle>
//           Minimum 8 characters long, uppercase & symbol
//         </Alert>
//         <form>
//           <Grid container spacing={4}>
//             <Grid size={{ xs: 12, sm: 6 }}>
//               <CustomTextField
//                 fullWidth
//                 label='Password'
//                 type={isPasswordShown ? 'text' : 'password'}
//                 slotProps={{
//                   input: {
//                     endAdornment: (
//                       <InputAdornment position='end'>
//                         <IconButton
//                           edge='end'
//                           onClick={() => setIsPasswordShown(!isPasswordShown)}
//                           onMouseDown={e => e.preventDefault()}
//                         >
//                           <i className={isPasswordShown ? 'tabler-eye-off' : 'tabler-eye'} />
//                         </IconButton>
//                       </InputAdornment>
//                     )
//                   }
//                 }}
//               />
//             </Grid>
//             <Grid size={{ xs: 12, sm: 6 }}>
//               <CustomTextField
//                 fullWidth
//                 label='Confirm Password'
//                 type={isConfirmPasswordShown ? 'text' : 'password'}
//                 slotProps={{
//                   input: {
//                     endAdornment: (
//                       <InputAdornment position='end'>
//                         <IconButton
//                           edge='end'
//                           onClick={() => setIsConfirmPasswordShown(!isConfirmPasswordShown)}
//                           onMouseDown={e => e.preventDefault()}
//                         >
//                           <i className={isConfirmPasswordShown ? 'tabler-eye-off' : 'tabler-eye'} />
//                         </IconButton>
//                       </InputAdornment>
//                     )
//                   }
//                 }}
//               />
//             </Grid>

//             <Grid size={{ xs: 12 }} className='flex gap-4'>
//               <Button variant='contained'>Change Password</Button>
//             </Grid>
//           </Grid>
//         </form>
//       </CardContent>
//     </Card>
//   )
// }

// export default ChangePassword

// 'use client'

// import { useState } from 'react'

// // MUI Imports
// import Card from '@mui/material/Card'
// import CardHeader from '@mui/material/CardHeader'
// import CardContent from '@mui/material/CardContent'
// import Grid from '@mui/material/Grid2'
// import InputAdornment from '@mui/material/InputAdornment'
// import IconButton from '@mui/material/IconButton'
// import Alert from '@mui/material/Alert'
// import AlertTitle from '@mui/material/AlertTitle'
// import Button from '@mui/material/Button'
// import Snackbar from '@mui/material/Snackbar'
// import MuiAlert from '@mui/material/Alert'

// // Component Imports
// import CustomTextField from '@core/components/mui/TextField'

// const ChangePassword = () => {
//   // States
//   const [isPasswordShown, setIsPasswordShown] = useState(false)
//   const [isConfirmPasswordShown, setIsConfirmPasswordShown] = useState(false)
//   const [password, setPassword] = useState('')
//   const [confirmPassword, setConfirmPassword] = useState('')
//   const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' })
//   const [loading, setLoading] = useState(false)

//   // ✅ Handle Password Change API
//   const handleChangePassword = async e => {
//     e.preventDefault()

//     // 🔹 Get user _id from localStorage
//     const storedUser = localStorage.getItem('selectedUser')
//     if (!storedUser) {
//       setSnackbar({ open: true, message: 'No user found in localStorage!', severity: 'error' })
//       return
//     }

//     const { _id } = JSON.parse(storedUser)

//     // 🔹 Basic validations
//     if (!password || !confirmPassword) {
//       setSnackbar({ open: true, message: 'Please fill all fields.', severity: 'warning' })
//       return
//     }

//     if (password.length < 8) {
//       setSnackbar({ open: true, message: 'Password must be at least 8 characters.', severity: 'warning' })
//       return
//     }

//     if (password !== confirmPassword) {
//       setSnackbar({ open: true, message: 'Passwords do not match!', severity: 'error' })
//       return
//     }

//     try {
//       setLoading(true)
//       const res = await fetch(`http://localhost:3001/zobiz/change-password/${_id}`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ password })
//       })

//       const result = await res.json()

//       if (result.success) {
//         setSnackbar({ open: true, message: result.message || 'Password changed successfully!', severity: 'success' })
//         setPassword('')
//         setConfirmPassword('')
//       } else {
//         setSnackbar({ open: true, message: result.message || 'Failed to change password', severity: 'error' })
//       }
//     } catch (error) {
//       console.error('❌ Password change error:', error)
//       setSnackbar({ open: true, message: 'Server error while changing password.', severity: 'error' })
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <>
//       <Card>
//         <CardHeader title='Change Password' />
//         <CardContent className='flex flex-col gap-4'>
//           <Alert icon={false} severity='warning'>
//             <AlertTitle>Ensure that these requirements are met</AlertTitle>
//             Minimum 8 characters long, include an uppercase letter and a symbol.
//           </Alert>

//           <form onSubmit={handleChangePassword}>
//             <Grid container spacing={4}>
//               {/* Password Field */}
//               <Grid size={{ xs: 12, sm: 6 }}>
//                 <CustomTextField
//                   fullWidth
//                   label='New Password'
//                   type={isPasswordShown ? 'text' : 'password'}
//                   value={password}
//                   onChange={e => setPassword(e.target.value)}
//                   slotProps={{
//                     input: {
//                       endAdornment: (
//                         <InputAdornment position='end'>
//                           <IconButton
//                             edge='end'
//                             onClick={() => setIsPasswordShown(!isPasswordShown)}
//                             onMouseDown={e => e.preventDefault()}
//                           >
//                             <i className={isPasswordShown ? 'tabler-eye-off' : 'tabler-eye'} />
//                           </IconButton>
//                         </InputAdornment>
//                       )
//                     }
//                   }}
//                 />
//               </Grid>

//               {/* Confirm Password Field */}
//               <Grid size={{ xs: 12, sm: 6 }}>
//                 <CustomTextField
//                   fullWidth
//                   label='Confirm Password'
//                   type={isConfirmPasswordShown ? 'text' : 'password'}
//                   value={confirmPassword}
//                   onChange={e => setConfirmPassword(e.target.value)}
//                   slotProps={{
//                     input: {
//                       endAdornment: (
//                         <InputAdornment position='end'>
//                           <IconButton
//                             edge='end'
//                             onClick={() => setIsConfirmPasswordShown(!isConfirmPasswordShown)}
//                             onMouseDown={e => e.preventDefault()}
//                           >
//                             <i className={isConfirmPasswordShown ? 'tabler-eye-off' : 'tabler-eye'} />
//                           </IconButton>
//                         </InputAdornment>
//                       )
//                     }
//                   }}
//                 />
//               </Grid>

//               {/* Submit Button */}
//               <Grid size={{ xs: 12 }} className='flex gap-4'>
//                 <Button
//                   variant='contained'
//                   type='submit'
//                   disabled={loading}
//                 >
//                   {loading ? 'Updating...' : 'Change Password'}
//                 </Button>
//               </Grid>
//             </Grid>
//           </form>
//         </CardContent>
//       </Card>

//       {/* ✅ Snackbar for messages */}
//       <Snackbar
//         open={snackbar.open}
//         autoHideDuration={3000}
//         onClose={() => setSnackbar({ ...snackbar, open: false })}
//         anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
//       >
//         <MuiAlert
//           onClose={() => setSnackbar({ ...snackbar, open: false })}
//           severity={snackbar.severity}
//           variant='filled'
//           sx={{
//             width: '100%',
//             backgroundColor: snackbar.severity === 'success' ? '#2B3380' : '#D32F2F',
//             color: 'white',
//             fontWeight: 500
//           }}
//         >
//           {snackbar.message}
//         </MuiAlert>
//       </Snackbar>
//     </>
//   )
// }

// export default ChangePassword


// 'use client'

// import { useState } from 'react'
// import Card from '@mui/material/Card'
// import CardHeader from '@mui/material/CardHeader'
// import CardContent from '@mui/material/CardContent'
// import Grid from '@mui/material/Grid2'
// import InputAdornment from '@mui/material/InputAdornment'
// import IconButton from '@mui/material/IconButton'
// import Alert from '@mui/material/Alert'
// import AlertTitle from '@mui/material/AlertTitle'
// import Button from '@mui/material/Button'
// import Snackbar from '@mui/material/Snackbar'
// import MuiAlert from '@mui/material/Alert'
// import CustomTextField from '@core/components/mui/TextField'
// import {changeUserPassword} from '../../../../../../../app/server/actions'

// const ChangePassword = () => {
//   const [isPasswordShown, setIsPasswordShown] = useState(false)
//   const [isConfirmPasswordShown, setIsConfirmPasswordShown] = useState(false)
//   const [password, setPassword] = useState('')
//   const [confirmPassword, setConfirmPassword] = useState('')
//   const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' })
//   const [loading, setLoading] = useState(false)

//   const handleChangePassword = async e => {
//     e.preventDefault()

//     const storedUser = localStorage.getItem('selectedUser')
//     if (!storedUser) {
//       setSnackbar({ open: true, message: 'No user found in localStorage!', severity: 'error' })
//       return
//     }

//     const { _id } = JSON.parse(storedUser)

//     if (!password || !confirmPassword) {
//       setSnackbar({ open: true, message: 'Please fill all fields.', severity: 'warning' })
//       return
//     }

//     if (password.length < 8) {
//       setSnackbar({ open: true, message: 'Password must be at least 8 characters.', severity: 'warning' })
//       return
//     }

//     if (password !== confirmPassword) {
//       setSnackbar({ open: true, message: 'Passwords do not match!', severity: 'error' })
//       return
//     }

//     try {
//       setLoading(true)

//       console.log('🔹 Sending password update request:', { _id, password, confirmPassword })

//       const res = await changeUserPassword(_id, password)

//       console.log('🔹 Response status:', res.status)

//       const result = await res.json()
//       console.log('🔹 API Result:', result)

//       if (result.success) {
//         setSnackbar({ open: true, message: result.message || 'Password changed successfully!', severity: 'success' })
//         setPassword('')
//         setConfirmPassword('')
//       } else {
//         setSnackbar({ open: true, message: result.message || 'Failed to change password', severity: 'error' })
//       }
//     } catch (error) {
//       console.error('❌ Password change error:', error)
//       setSnackbar({ open: true, message: 'Server error while changing password.', severity: 'error' })
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <>
//       <Card>
//         <CardHeader title='Change Password' />
//         <CardContent className='flex flex-col gap-4'>
//           <Alert icon={false} severity='warning'>
//             <AlertTitle>Ensure that these requirements are met</AlertTitle>
//             Minimum 8 characters long, include an uppercase letter and a symbol.
//           </Alert>

//           <form onSubmit={handleChangePassword}>
//             <Grid container spacing={4}>
//               {/* New Password */}
//               <Grid size={{ xs: 12, sm: 6 }}>
//                 <CustomTextField
//                   fullWidth
//                   label='New Password'
//                   type={isPasswordShown ? 'text' : 'password'}
//                   value={password}
//                   onChange={e => setPassword(e.target.value)}
//                   slotProps={{
//                     input: {
//                       endAdornment: (
//                         <InputAdornment position='end'>
//                           <IconButton
//                             edge='end'
//                             onClick={() => setIsPasswordShown(!isPasswordShown)}
//                             onMouseDown={e => e.preventDefault()}
//                           >
//                             <i className={isPasswordShown ? 'tabler-eye-off' : 'tabler-eye'} />
//                           </IconButton>
//                         </InputAdornment>
//                       )
//                     }
//                   }}
//                 />
//               </Grid>

//               {/* Confirm Password */}
//               <Grid size={{ xs: 12, sm: 6 }}>
//                 <CustomTextField
//                   fullWidth
//                   label='Confirm Password'
//                   type={isConfirmPasswordShown ? 'text' : 'password'}
//                   value={confirmPassword}
//                   onChange={e => setConfirmPassword(e.target.value)}
//                   slotProps={{
//                     input: {
//                       endAdornment: (
//                         <InputAdornment position='end'>
//                           <IconButton
//                             edge='end'
//                             onClick={() => setIsConfirmPasswordShown(!isConfirmPasswordShown)}
//                             onMouseDown={e => e.preventDefault()}
//                           >
//                             <i className={isConfirmPasswordShown ? 'tabler-eye-off' : 'tabler-eye'} />
//                           </IconButton>
//                         </InputAdornment>
//                       )
//                     }
//                   }}
//                 />
//               </Grid>

//               {/* Submit */}
//               <Grid size={{ xs: 12 }} className='flex gap-4'>
//                 <Button variant='contained' type='submit' disabled={loading}>
//                   {loading ? 'Updating...' : 'Change Password'}
//                 </Button>
//               </Grid>
//             </Grid>
//           </form>
//         </CardContent>
//       </Card>

//       {/* Snackbar */}
//       <Snackbar
//         open={snackbar.open}
//         autoHideDuration={3000}
//         onClose={() => setSnackbar({ ...snackbar, open: false })}
//         anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
//       >
//         <MuiAlert
//           onClose={() => setSnackbar({ ...snackbar, open: false })}
//           severity={snackbar.severity}
//           variant='filled'
//           sx={{
//             width: '100%',
//             backgroundColor: snackbar.severity === 'success' ? '#2B3380' : '#D32F2F',
//             color: 'white',
//             fontWeight: 500
//           }}
//         >
//           {snackbar.message}
//         </MuiAlert>
//       </Snackbar>
//     </>
//   )
// }

// export default ChangePassword

// 'use client'

// import { useState } from 'react'
// import Card from '@mui/material/Card'
// import CardHeader from '@mui/material/CardHeader'
// import CardContent from '@mui/material/CardContent'
// import Grid from '@mui/material/Grid2'
// import InputAdornment from '@mui/material/InputAdornment'
// import IconButton from '@mui/material/IconButton'
// import Alert from '@mui/material/Alert'
// import AlertTitle from '@mui/material/AlertTitle'
// import Button from '@mui/material/Button'
// import Snackbar from '@mui/material/Snackbar'
// import MuiAlert from '@mui/material/Alert'
// import CustomTextField from '@core/components/mui/TextField'

// // ✅ Import from the new utils folder
// import {changeUserPassword} from '../../../../../../../app/server/actions'

// const ChangePassword = () => {
//   const [isPasswordShown, setIsPasswordShown] = useState(false)
//   const [isConfirmPasswordShown, setIsConfirmPasswordShown] = useState(false)
//   const [password, setPassword] = useState('')
//   const [confirmPassword, setConfirmPassword] = useState('')
//   const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' })
//   const [loading, setLoading] = useState(false)

//   const handleChangePassword = async e => {
//     e.preventDefault()

//     const storedUser = localStorage.getItem('selectedUser')
//     if (!storedUser) {
//       setSnackbar({ open: true, message: 'No user found in localStorage!', severity: 'error' })
//       return
//     }

//     const { _id } = JSON.parse(storedUser)

//     // 🔹 Basic Validation
//     if (!password || !confirmPassword) {
//       setSnackbar({ open: true, message: 'Please fill all fields.', severity: 'warning' })
//       return
//     }

//     if (password.length < 8) {
//       setSnackbar({ open: true, message: 'Password must be at least 8 characters.', severity: 'warning' })
//       return
//     }

//     if (password !== confirmPassword) {
//       setSnackbar({ open: true, message: 'Passwords do not match!', severity: 'error' })
//       return
//     }

//     try {
//       setLoading(true)

//       console.log('🔹 Sending password update request:', { _id, password, confirmPassword })

//       // ✅ Use helper API function
//       const result = await changeUserPassword(_id, password, confirmPassword)

//       console.log('🔹 API Result:', result)

//       if (result.success) {
//         setSnackbar({ open: true, message: result.message || 'Password changed successfully!', severity: 'success' })
//         setPassword('')
//         setConfirmPassword('')
//       } else {
//         setSnackbar({ open: true, message: result.message || 'Failed to change password', severity: 'error' })
//       }
//     } catch (error) {
//       console.error('❌ Password change error:', error)
//       setSnackbar({ open: true, message: 'Unexpected error while changing password.', severity: 'error' })
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <>
//       <Card>
//         <CardHeader title='Change Password' />
//         <CardContent className='flex flex-col gap-4'>
//           <Alert icon={false} severity='warning'>
//             <AlertTitle>Ensure that these requirements are met</AlertTitle>
//             Minimum 8 characters long, include an uppercase letter and a symbol.
//           </Alert>

//           <form onSubmit={handleChangePassword}>
//             <Grid container spacing={4}>
//               {/* New Password */}
//               <Grid size={{ xs: 12, sm: 6 }}>
//                 <CustomTextField
//                   fullWidth
//                   label='New Password'
//                   type={isPasswordShown ? 'text' : 'password'}
//                   value={password}
//                   onChange={e => setPassword(e.target.value)}
//                   slotProps={{
//                     input: {
//                       endAdornment: (
//                         <InputAdornment position='end'>
//                           <IconButton
//                             edge='end'
//                             onClick={() => setIsPasswordShown(!isPasswordShown)}
//                             onMouseDown={e => e.preventDefault()}
//                           >
//                             <i className={isPasswordShown ? 'tabler-eye-off' : 'tabler-eye'} />
//                           </IconButton>
//                         </InputAdornment>
//                       )
//                     }
//                   }}
//                 />
//               </Grid>

//               {/* Confirm Password */}
//               <Grid size={{ xs: 12, sm: 6 }}>
//                 <CustomTextField
//                   fullWidth
//                   label='Confirm Password'
//                   type={isConfirmPasswordShown ? 'text' : 'password'}
//                   value={confirmPassword}
//                   onChange={e => setConfirmPassword(e.target.value)}
//                   slotProps={{
//                     input: {
//                       endAdornment: (
//                         <InputAdornment position='end'>
//                           <IconButton
//                             edge='end'
//                             onClick={() => setIsConfirmPasswordShown(!isConfirmPasswordShown)}
//                             onMouseDown={e => e.preventDefault()}
//                           >
//                             <i className={isConfirmPasswordShown ? 'tabler-eye-off' : 'tabler-eye'} />
//                           </IconButton>
//                         </InputAdornment>
//                       )
//                     }
//                   }}
//                 />
//               </Grid>

//               {/* Submit */}
//               <Grid size={{ xs: 12 }} className='flex gap-4'>
//                 <Button variant='contained' type='submit' disabled={loading}>
//                   {loading ? 'Updating...' : 'Change Password'}
//                 </Button>
//               </Grid>
//             </Grid>
//           </form>
//         </CardContent>
//       </Card>

//       {/* Snackbar */}
//       <Snackbar
//         open={snackbar.open}
//         autoHideDuration={3000}
//         onClose={() => setSnackbar({ ...snackbar, open: false })}
//         anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
//       >
//         <MuiAlert
//           onClose={() => setSnackbar({ ...snackbar, open: false })}
//           severity={snackbar.severity}
//           variant='filled'
//           sx={{
//             width: '100%',
//             backgroundColor: snackbar.severity === 'success' ? '#2B3380' : '#D32F2F',
//             color: 'white',
//             fontWeight: 500
//           }}
//         >
//           {snackbar.message}
//         </MuiAlert>
//       </Snackbar>
//     </>
//   )
// }

// export default ChangePassword

'use client'

import { useState } from 'react'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid2'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import Button from '@mui/material/Button'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'
import CustomTextField from '@core/components/mui/TextField'
import { changeUserPassword } from '../../../../../../../app/server/actions'

const ChangePassword = () => {
  const [isPasswordShown, setIsPasswordShown] = useState(false)
  const [isConfirmPasswordShown, setIsConfirmPasswordShown] = useState(false)
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' })
  const [loading, setLoading] = useState(false)

  const handleChangePassword = async e => {
    e.preventDefault()

    const storedUser = localStorage.getItem('selectedUser')
    if (!storedUser) {
      setSnackbar({ open: true, message: 'No user found in localStorage!', severity: 'error' })
      return
    }

    const { _id } = JSON.parse(storedUser)

    if (!password || !confirmPassword) {
      setSnackbar({ open: true, message: 'Please fill all fields.', severity: 'warning' })
      return
    }

    if (password.length < 8) {
      setSnackbar({ open: true, message: 'Password must be at least 8 characters.', severity: 'warning' })
      return
    }

    if (password !== confirmPassword) {
      setSnackbar({ open: true, message: 'Passwords do not match!', severity: 'error' })
      return
    }

    try {
      setLoading(true)
      const result = await changeUserPassword(_id, password, confirmPassword)

      if (result.success) {
        setSnackbar({
          open: true,
          message: result.message || 'Password changed successfully!',
          severity: 'success'
        })
        setPassword('')
        setConfirmPassword('')
      } else {
        setSnackbar({
          open: true,
          message: result.message || 'Failed to change password',
          severity: 'error'
        })
      }
    } catch (error) {
      console.error('❌ Password change error:', error)
      setSnackbar({ open: true, message: 'Server error while changing password.', severity: 'error' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Card>
        <CardHeader title='Change Password' />
        <CardContent className='flex flex-col gap-4'>
          <Alert icon={false} severity='warning'>
            <AlertTitle>Ensure that these requirements are met</AlertTitle>
            Minimum 8 characters long, include an uppercase letter and a symbol.
          </Alert>

       <form
  onSubmit={e => {
    e.preventDefault()
    handleChangePassword(e)
  }}
>
  <Grid container spacing={4}>
    {/* New Password */}
    <Grid size={{ xs: 12, sm: 6 }}>
      <CustomTextField
        fullWidth
        label='New Password'
        type={isPasswordShown ? 'text' : 'password'}
        value={password}
        onChange={e => setPassword(e.target.value)}
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton
                  edge='end'
                  onClick={() => setIsPasswordShown(!isPasswordShown)}
                  onMouseDown={e => e.preventDefault()}
                >
                  <i className={isPasswordShown ? 'tabler-eye-off' : 'tabler-eye'} />
                </IconButton>
              </InputAdornment>
            )
          }
        }}
      />
    </Grid>

    {/* Confirm Password */}
    <Grid size={{ xs: 12, sm: 6 }}>
      <CustomTextField
        fullWidth
        label='Confirm Password'
        type={isConfirmPasswordShown ? 'text' : 'password'}
        value={confirmPassword}
        onChange={e => setConfirmPassword(e.target.value)}
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton
                  edge='end'
                  onClick={() => setIsConfirmPasswordShown(!isConfirmPasswordShown)}
                  onMouseDown={e => e.preventDefault()}
                >
                  <i className={isConfirmPasswordShown ? 'tabler-eye-off' : 'tabler-eye'} />
                </IconButton>
              </InputAdornment>
            )
          }
        }}
      />
    </Grid>

    {/* Submit */}
    <Grid size={{ xs: 12 }} className='flex gap-4'>
      <Button
        variant='contained'
        disabled={loading}
        type='submit'
      >
        {loading ? 'Updating...' : 'Change Password'}
      </Button>
    </Grid>
  </Grid>
</form>

        </CardContent>
      </Card>

      {/* Snackbar */}
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

export default ChangePassword




