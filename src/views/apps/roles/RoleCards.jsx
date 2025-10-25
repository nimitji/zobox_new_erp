'use client'
import { useEffect, useState } from 'react'
import axios from 'axios'
// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid2'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import AvatarGroup from '@mui/material/AvatarGroup'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'

// Component Imports
import RoleDialog from '@components/dialogs/role-dialog'
import OpenDialogOnElementClick from '@components/dialogs/OpenDialogOnElementClick'
import Link from '@components/Link'
import { useSession } from 'next-auth/react'

// Vars
// const cardData = [
//   { totalUsers: 4, title: 'Administrator', avatars: ['1.png', '2.png', '3.png', '4.png'] },
//   { totalUsers: 7, title: 'Editor', avatars: ['5.png', '6.png', '7.png'] },
//   { totalUsers: 5, title: 'Users', avatars: ['4.png', '5.png', '6.png'] },
//   { totalUsers: 6, title: 'Support', avatars: ['1.png', '2.png', '3.png'] },
//   { totalUsers: 10, title: 'Restricted User', avatars: ['4.png', '5.png', '6.png'] },
//    { totalUsers: 10, title: 'Restricted User', avatars: ['4.png', '5.png', '6.png'] }
// ]

// const RoleCards = () => {

//   //changes here pooja
//   const [roles, setRoles] = useState([])
//   const [loading, setLoading] = useState(false)

//   const { data: session } = useSession()
//   const token = session?.user?.accessToken

//   useEffect(() => {
//     const fetchRoles = async () => {
//       setLoading(true)
//       try {
//         const response = await axios.get('http://localhost:3001/zobiz/total-role-count', {
//           headers: {
//             // Authorization: `Bearer ${token}`,
//             token: `${token}`,
//             'Content-Type': 'application/json'
//           }
//         })
//         setRoles(response.data.data || []) // Adjust according to your backend response
//       } catch (error) {
//         console.error('❌ Error fetching roles:', error)
//       } finally {
//         setLoading(false)
//       }
//     }

//     if (token) fetchRoles()
//   }, [token])

//   // Vars pooja
//   const typographyProps = {
//     children: 'Edit Role',
//     component: Link,
//     color: 'primary',
//     onClick: e => e.preventDefault()
//   }

//   const CardProps = {
//     className: 'cursor-pointer bs-full',
//     children: (
//       <Grid container className='bs-full'>
//         <Grid size={{ xs: 5 }}>
//           <div className='flex items-end justify-center bs-full'>
//             <img alt='add-role' src='/images/illustrations/characters/5.png' height={130} />
//           </div>
//         </Grid>
//         <Grid size={{ xs: 7 }}>
//           <CardContent>
//             <div className='flex flex-col items-end gap-4 text-right'>
//               <Button variant='contained' size='small'>
//                 Add Role
//               </Button>
//               <Typography>
//                 Add new role, <br />
//                 if it doesn&#39;t exist.
//               </Typography>
//             </div>
//           </CardContent>
//         </Grid>
//       </Grid>
//     )
//   }

//   return (
//     <>
//       <Grid container spacing={6}>
//         {cardData.map((item, index) => (
//           <Grid size={{ xs: 12, sm: 6, lg: 4 }} key={index}>
//             <Card>
//               <CardContent className='flex flex-col gap-4'>
//                 <div className='flex items-center justify-between'>
//                   <Typography className='flex-grow'>{`Total ${item.totalUsers} users`}</Typography>
//                   <AvatarGroup total={item.totalUsers}>
//                     {item.avatars.map((img, index) => (
//                       <Avatar key={index} alt={item.title} src={`/images/avatars/${img}`} />
//                     ))}
//                   </AvatarGroup>
//                 </div>
//                 <div className='flex justify-between items-center'>
//                   <div className='flex flex-col items-start gap-1'>
//                     <Typography variant='h5'>{item.title}</Typography>
//                     <OpenDialogOnElementClick
//                       element={Typography}
//                       elementProps={typographyProps}
//                       dialog={RoleDialog}
//                       dialogProps={{ title: item.title }}
//                     />
//                   </div>
//                   <IconButton>
//                     <i className='tabler-copy text-secondary' />
//                   </IconButton>
//                 </div>
//               </CardContent>
//             </Card>
//           </Grid>
//         ))}
//         <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
//           <OpenDialogOnElementClick element={Card} elementProps={CardProps} dialog={RoleDialog} />
//         </Grid>
//       </Grid>
//     </>
//   )
// }

const RoleCards = () => {
  const [roles, setRoles] = useState([])
  const [loading, setLoading] = useState(false)
  const { data: session } = useSession()
  const token = session?.user?.accessToken

  useEffect(() => {
    const fetchRoles = async () => {
      setLoading(true)
      try {
        const response = await axios.get('http://localhost:3001/zobiz/total-role-count', {
          headers: {
            token: `${token}`,
            'Content-Type': 'application/json'
          }
        })
        setRoles(response.data?.data || [])
      } catch (error) {
        console.error('❌ Error fetching roles:', error)
      } finally {
        setLoading(false)
      }
    }

    if (token) fetchRoles()
  }, [token])

  const typographyProps = {
    children: 'Edit Role',
    component: Link,
    color: 'primary',
    onClick: e => e.preventDefault()
  }

  const CardProps = {
    className: 'cursor-pointer bs-full',
    children: (
      <Grid container className='bs-full'>
        <Grid size={{ xs: 5 }}>
          <div className='flex items-end justify-center bs-full'>
            <img alt='add-role' src='/images/illustrations/characters/5.png' height={130} />
          </div>
        </Grid>
        <Grid size={{ xs: 7 }}>
          <CardContent>
            <div className='flex flex-col items-end gap-4 text-right'>
              <Button variant='contained' size='small'>
                Add Role
              </Button>
              <Typography>
                Add new role, <br />
                if it doesn&#39;t exist.
              </Typography>
            </div>
          </CardContent>
        </Grid>
      </Grid>
    )
  }

  if (loading) {
    return <Typography>Loading roles...</Typography>
  }

  if (!loading && roles.length === 0) {
    return <Typography>No roles found.</Typography>
  }

  return (
    <Grid container spacing={6}>
      {roles.map((role, index) => (
        <Grid size={{ xs: 12, sm: 6, lg: 4 }} key={index}>
          <Card>
            <CardContent className='flex flex-col gap-4'>
              <div className='flex items-center justify-between'>
                <Typography className='flex-grow'>
                  {`Total ${role.totalUsers || 0} users`}
                </Typography>
                <AvatarGroup total={role.totalUsers || 0}>
                  {(role.avatars || []).map((img, idx) => (
                    <Avatar key={idx} alt={role.title} src={`/images/avatars/${img}`} />
                  ))}
                </AvatarGroup>
              </div>

              <div className='flex justify-between items-center'>
                <div className='flex flex-col items-start gap-1'>
                  <Typography variant='h5'>{role.title || 'Untitled Role'}</Typography>
                  <OpenDialogOnElementClick
                    element={Typography}
                    elementProps={typographyProps}
                    dialog={RoleDialog}
                    dialogProps={{ title: role.title }}
                  />
                </div>
                <IconButton>
                  <i className='tabler-copy text-secondary' />
                </IconButton>
              </div>
            </CardContent>
          </Card>
        </Grid>
      ))}

      {/* Add Role Card */}
      <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
        <OpenDialogOnElementClick element={Card} elementProps={CardProps} dialog={RoleDialog} />
      </Grid>
    </Grid>
  )
}




// const RoleCards = () => {



//   // Vars pooja
//   const typographyProps = {
//     children: 'Edit Role',
//     component: Link,
//     color: 'primary',
//     onClick: e => e.preventDefault()
//   }

//   const CardProps = {
//     className: 'cursor-pointer bs-full',
//     children: (
//       <Grid container className='bs-full'>
//         <Grid size={{ xs: 5 }}>
//           <div className='flex items-end justify-center bs-full'>
//             <img alt='add-role' src='/images/illustrations/characters/5.png' height={130} />
//           </div>
//         </Grid>
//         <Grid size={{ xs: 7 }}>
//           <CardContent>
//             <div className='flex flex-col items-end gap-4 text-right'>
//               <Button variant='contained' size='small'>
//                 Add Role
//               </Button>
//               <Typography>
//                 Add new role, <br />
//                 if it doesn&#39;t exist.
//               </Typography>
//             </div>
//           </CardContent>
//         </Grid>
//       </Grid>
//     )
//   }

//   return (
//     <>
//       <Grid container spacing={6}>
//         {cardData.map((item, index) => (
//           <Grid size={{ xs: 12, sm: 6, lg: 4 }} key={index}>
//             <Card>
//               <CardContent className='flex flex-col gap-4'>
//                 <div className='flex items-center justify-between'>
//                   <Typography className='flex-grow'>{`Total ${item.totalUsers} users`}</Typography>
//                   <AvatarGroup total={item.totalUsers}>
//                     {item.avatars.map((img, index) => (
//                       <Avatar key={index} alt={item.title} src={`/images/avatars/${img}`} />
//                     ))}
//                   </AvatarGroup>
//                 </div>
//                 <div className='flex justify-between items-center'>
//                   <div className='flex flex-col items-start gap-1'>
//                     <Typography variant='h5'>{item.title}</Typography>
//                     <OpenDialogOnElementClick
//                       element={Typography}
//                       elementProps={typographyProps}
//                       dialog={RoleDialog}
//                       dialogProps={{ title: item.title }}
//                     />
//                   </div>
//                   <IconButton>
//                     <i className='tabler-copy text-secondary' />
//                   </IconButton>
//                 </div>
//               </CardContent>
//             </Card>
//           </Grid>
//         ))}
//         <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
//           <OpenDialogOnElementClick element={Card} elementProps={CardProps} dialog={RoleDialog} />
//         </Grid>
//       </Grid>
//     </>
//   )
// }
export default RoleCards
