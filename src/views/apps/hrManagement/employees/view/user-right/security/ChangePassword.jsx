// 'use client'

// // React Imports
// import { useState,useEffect } from 'react'

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
// import Typography from '@mui/material/Typography'

// // Component Imports
// import CustomTextField from '@core/components/mui/TextField'

// const ChangePassword = () => {
//   // States
//   const [isPasswordShown, setIsPasswordShown] = useState(false)
//   const [isConfirmPasswordShown, setIsConfirmPasswordShown] = useState(false)

//  const [userData, setUserData] = useState(null)

//   // 🧩 Load user data from localStorage
//   useEffect(() => {
//     const stored = localStorage.getItem('selectedUser')
//     if (stored) {
//       setUserData(JSON.parse(stored))
//     }
//   }, [])

//   if (!userData) {
//     return <Typography>Loading user information...</Typography>
//   }

//   const {
//     _id,
//     password
//   } = userData

//   return (
//     <Card>
//       <CardHeader title='Password' />
//       <CardContent className='flex flex-col gap-4'>
//         {/* <Alert icon={false} severity='warning' onClose={() => {}}>
//           <AlertTitle>Ensure that these requirements are met</AlertTitle>
//           Minimum 8 characters long, uppercase & symbol
//         </Alert> */}
//         <form>
//           <Grid container spacing={4}>
//             <Grid size={{ xs: 12, sm: 6 }}>
//               <CustomTextField
//                 fullWidth
//                 // label='Password'
//                 value={password || ''}
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
//                           {/* <i className={isPasswordShown ? 'tabler-eye-off' : 'tabler-eye'} /> */}
//                         </IconButton>
//                       </InputAdornment>
//                     )
//                   }
//                 }}
//               />
//             </Grid>
//             {/* <Grid size={{ xs: 12, sm: 6 }}>
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
//             </Grid> */}

//             {/* <Grid size={{ xs: 12 }} className='flex gap-4'>
//               <Button variant='contained'>Change Password</Button>
//             </Grid> */}
//           </Grid>
//         </form>
//       </CardContent>
//     </Card>
//   )
// }

// export default ChangePassword


'use client'

import { useState, useEffect } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid2'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'

// Component Imports
import CustomTextField from '@core/components/mui/TextField'

// ======================================================

const ChangePassword = () => {
  const [isPasswordShown, setIsPasswordShown] = useState(false)
  const [userData, setUserData] = useState(null)

  // 🧩 Load user data from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('selectedUser')
    if (stored) {
      setUserData(JSON.parse(stored))
    }
  }, [])

  if (!userData) {
    return <Typography>Loading user information...</Typography>
  }

  const { password } = userData

  return (
    <Card>
      <CardHeader title='Password' />
      <CardContent>
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <CustomTextField
              fullWidth
              type={isPasswordShown ? 'text' : 'password'}
              value={password || ''}
              InputProps={{
                readOnly: true
              }}
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
        </Grid>
      </CardContent>
    </Card>
  )
}

export default ChangePassword



