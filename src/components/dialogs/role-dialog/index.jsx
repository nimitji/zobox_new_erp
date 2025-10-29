// 'use client'

// // React Imports
// import { useState, useEffect } from 'react'

// // MUI Imports
// import Dialog from '@mui/material/Dialog'
// import DialogTitle from '@mui/material/DialogTitle'
// import DialogContent from '@mui/material/DialogContent'
// import Typography from '@mui/material/Typography'
// import Checkbox from '@mui/material/Checkbox'
// import FormGroup from '@mui/material/FormGroup'
// import FormControlLabel from '@mui/material/FormControlLabel'
// import DialogActions from '@mui/material/DialogActions'
// import Button from '@mui/material/Button'

// // Component Imports
// import DialogCloseButton from '../DialogCloseButton'
// import CustomTextField from '@core/components/mui/TextField'

// // Style Imports
// import tableStyles from '@core/styles/table.module.css'

// const defaultData = [
//   'User Management',
//   'Content Management',
//   'Disputes Management',
//   'Database Management',
//   'Financial Management',
//   'Reporting',
//   'API Control',
//   'Repository Management',
//   'Payroll'
// ]

// const RoleDialog = ({ open, setOpen, title }) => {
//   // States
//   const [selectedCheckbox, setSelectedCheckbox] = useState(
//     title
//       ? [
//           'user-management-read',
//           'user-management-write',
//           'user-management-create',
//           'disputes-management-read',
//           'disputes-management-write',
//           'disputes-management-create'
//         ]
//       : []
//   )

//   const [isIndeterminateCheckbox, setIsIndeterminateCheckbox] = useState(false)

//   const handleClose = () => {
//     setOpen(false)
//   }

//   const togglePermission = id => {
//     const arr = selectedCheckbox

//     if (selectedCheckbox.includes(id)) {
//       arr.splice(arr.indexOf(id), 1)
//       setSelectedCheckbox([...arr])
//     } else {
//       arr.push(id)
//       setSelectedCheckbox([...arr])
//     }
//   }

//   const handleSelectAllCheckbox = () => {
//     if (isIndeterminateCheckbox) {
//       setSelectedCheckbox([])
//     } else {
//       defaultData.forEach(row => {
//         const id = (typeof row === 'string' ? row : row.title).toLowerCase().split(' ').join('-')

//         togglePermission(`${id}-read`)
//         togglePermission(`${id}-write`)
//         togglePermission(`${id}-create`)
//       })
//     }
//   }

//   useEffect(() => {
//     if (selectedCheckbox.length > 0 && selectedCheckbox.length < defaultData.length * 3) {
//       setIsIndeterminateCheckbox(true)
//     } else {
//       setIsIndeterminateCheckbox(false)
//     }
//   }, [selectedCheckbox])

//   return (
//     <Dialog
//       fullWidth
//       maxWidth='md'
//       scroll='body'
//       open={open}
//       onClose={handleClose}
//       closeAfterTransition={false}
//       sx={{ '& .MuiDialog-paper': { overflow: 'visible' } }}
//     >
//       <DialogCloseButton onClick={() => setOpen(false)} disableRipple>
//         <i className='tabler-x' />
//       </DialogCloseButton>
//       <DialogTitle variant='h4' className='flex flex-col gap-2 text-center sm:pbs-16 sm:pbe-6 sm:pli-16'>
//         {title ? 'Edit Role' : 'Add Role'}
//         <Typography component='span' className='flex flex-col text-center'>
//           Set Role Permissions
//         </Typography>
//       </DialogTitle>
//       <form onSubmit={e => e.preventDefault()}>
//         <DialogContent className='overflow-visible flex flex-col gap-6 pbs-0 sm:pli-16'>
//           <CustomTextField
//             label='Role Name'
//             variant='outlined'
//             fullWidth
//             placeholder='Enter Role Name'
//             defaultValue={title}
//             onChange={e => e.target.value}
//           />
//           <Typography variant='h5' className='min-is-[225px]'>
//             Role Permissions
//           </Typography>
//           <div className='overflow-x-auto'>
//             <table className={tableStyles.table}>
//               <tbody>
//                 <tr className='border-bs-0'>
//                   <th className='pis-0'>
//                     <Typography color='text.primary' className='font-medium whitespace-nowrap flex-grow min-is-[225px]'>
//                       Administrator Access
//                     </Typography>
//                   </th>
//                   <th className='!text-end pie-0'>
//                     <FormControlLabel
//                       className='mie-0 capitalize'
//                       control={
//                         <Checkbox
//                           onChange={handleSelectAllCheckbox}
//                           indeterminate={isIndeterminateCheckbox}
//                           checked={selectedCheckbox.length === defaultData.length * 3}
//                         />
//                       }
//                       label='Select All'
//                     />
//                   </th>
//                 </tr>
//                 {defaultData.map((item, index) => {
//                   const id = (typeof item === 'string' ? item : item.title).toLowerCase().split(' ').join('-')

//                   return (
//                     <tr key={index} className='border-be'>
//                       <td className='pis-0'>
//                         <Typography
//                           className='font-medium whitespace-nowrap flex-grow min-is-[225px]'
//                           color='text.primary'
//                         >
//                           {typeof item === 'object' ? item.title : item}
//                         </Typography>
//                       </td>
//                       <td className='!text-end pie-0'>
//                         {typeof item === 'object' ? (
//                           <FormGroup className='flex-row justify-end flex-nowrap gap-6'>
//                             <FormControlLabel
//                               className='mie-0'
//                               control={<Checkbox checked={item.read} />}
//                               label='Read'
//                             />
//                             <FormControlLabel
//                               className='mie-0'
//                               control={<Checkbox checked={item.write} />}
//                               label='Write'
//                             />
//                             <FormControlLabel
//                               className='mie-0'
//                               control={<Checkbox checked={item.select} />}
//                               label='Select'
//                             />
//                           </FormGroup>
//                         ) : (
//                           <FormGroup className='flex-row justify-end flex-nowrap gap-6'>
//                             <FormControlLabel
//                               className='mie-0'
//                               control={
//                                 <Checkbox
//                                   id={`${id}-read`}
//                                   onChange={() => togglePermission(`${id}-read`)}
//                                   checked={selectedCheckbox.includes(`${id}-read`)}
//                                 />
//                               }
//                               label='Read'
//                             />
//                             <FormControlLabel
//                               className='mie-0'
//                               control={
//                                 <Checkbox
//                                   id={`${id}-write`}
//                                   onChange={() => togglePermission(`${id}-write`)}
//                                   checked={selectedCheckbox.includes(`${id}-write`)}
//                                 />
//                               }
//                               label='Write'
//                             />
//                             <FormControlLabel
//                               className='mie-0'
//                               control={
//                                 <Checkbox
//                                   id={`${id}-create`}
//                                   onChange={() => togglePermission(`${id}-create`)}
//                                   checked={selectedCheckbox.includes(`${id}-create`)}
//                                 />
//                               }
//                               label='Create'
//                             />
//                           </FormGroup>
//                         )}
//                       </td>
//                     </tr>
//                   )
//                 })}
//               </tbody>
//             </table>
//           </div>
//         </DialogContent>
//         <DialogActions className='justify-center pbs-0 sm:pbe-16 sm:pli-16'>
//           <Button variant='contained' type='submit' onClick={handleClose}>
//             Submit
//           </Button>
//           <Button variant='tonal' type='reset' color='secondary' onClick={handleClose}>
//             Cancel
//           </Button>
//         </DialogActions>
//       </form>
//     </Dialog>
//   )
// }

// export default RoleDialog


'use client'

import { useState, useEffect } from 'react'
import axios from 'axios'
import { useSession } from 'next-auth/react'

// MUI Imports
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import Typography from '@mui/material/Typography'
import Checkbox from '@mui/material/Checkbox'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'

// Component Imports
import DialogCloseButton from '../DialogCloseButton'
import CustomTextField from '@core/components/mui/TextField'

// Style Imports
import tableStyles from '@core/styles/table.module.css'

const defaultData = [
  'User Management',
  'Content Management',
  'Disputes Management',
  'Database Management',
  'Financial Management',
  'Reporting',
  'API Control',
  'Repository Management',
  'Payroll'
]

const RoleDialog = ({ open, setOpen, title }) => {
     const { data: session } = useSession()
  const token = session?.user?.accessToken
  console.log("SESSION TOKEN:", token)
  const [roleName, setRoleName] = useState(title || '')
  const [description, setDescription] = useState('')
  const [selectedCheckbox, setSelectedCheckbox] = useState([])
  const [isIndeterminateCheckbox, setIsIndeterminateCheckbox] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleClose = () => setOpen(false)

  const togglePermission = id => {
    setSelectedCheckbox(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    )
  }

  const handleSelectAllCheckbox = () => {
    if (selectedCheckbox.length === defaultData.length * 3) {
      setSelectedCheckbox([])
    } else {
      const all = []
      defaultData.forEach(row => {
        const id = row.toLowerCase().split(' ').join('-')
        all.push(`${id}-read`, `${id}-write`, `${id}-create`)
      })
      setSelectedCheckbox(all)
    }
  }

  useEffect(() => {
    setIsIndeterminateCheckbox(
      selectedCheckbox.length > 0 && selectedCheckbox.length < defaultData.length * 3
    )
  }, [selectedCheckbox])

  const handleSubmit = async () => {
    if (!roleName) {
      alert('Please enter a role name')
      return
    }

    setLoading(true)
    try {
      // const token = localStorage.getItem('token') // auth middleware ke liye
      // console.log("TOKEN",token)
    

      const payload = {
        name: roleName,
        description: description,
        permissions: selectedCheckbox
      }
      console.log("ROLEPERMISSION",payload)

      const response = await axios.post(
        'http://localhost:3001/zobiz/create-role', // 🟢 replace with actual API URL
        payload,
        {
          headers: {
            // Authorization: `Bearer ${token}`,
            token: `${token}`,
            'Content-Type': 'application/json'
          }
        }
      )

      alert('✅ Role created successfully!')
      console.log('Response:', response.data)

      setOpen(false)
      setRoleName('')
      setDescription('')
      setSelectedCheckbox([])
    } catch (error) {
      console.error('❌ Error saving role:', error)
      alert(error.response?.data?.message || 'Failed to create role')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog fullWidth maxWidth='md' scroll='body' open={open} onClose={handleClose}>
      <DialogCloseButton onClick={handleClose} disableRipple>
        <i className='tabler-x' />
      </DialogCloseButton>

      <DialogTitle variant='h4' className='text-center'>
        {title ? 'Edit Role' : 'Add Role'}
        {/* <Typography component='span'>Set Role Permissions</Typography> */}
           <Typography component='span' className='flex flex-col text-center'>
          Set Role Permissions
        </Typography>
      </DialogTitle>

      <DialogContent className='overflow-visible flex flex-col gap-6'>
        <CustomTextField
          label='Role Name'
          variant='outlined'
          fullWidth
          placeholder='Enter Role Name'
          value={roleName}
          onChange={e => setRoleName(e.target.value)}
        />

        <CustomTextField
          label='Description'
          variant='outlined'
          fullWidth
          placeholder='Enter Role Description'
          value={description}
          onChange={e => setDescription(e.target.value)}
        />

        <Typography variant='h5'>Role Permissions</Typography>

        <div className='overflow-x-auto'>
          <table className={tableStyles.table}>
            <tbody>
              <tr>
                <th>
                  <Typography color='text.primary'>Administrator Access</Typography>
                </th>
                <th className='text-end'>
                  <FormControlLabel
                    control={
                      <Checkbox
                        onChange={handleSelectAllCheckbox}
                        indeterminate={isIndeterminateCheckbox}
                        checked={selectedCheckbox.length === defaultData.length * 3}
                      />
                    }
                    label='Select All'
                  />
                </th>
              </tr>

              {defaultData.map((item, index) => {
                const id = item.toLowerCase().split(' ').join('-')
                return (
                  <tr key={index}>
                    <td>
                      <Typography color='text.primary'>{item}</Typography>
                    </td>
                    <td className='text-end'>
                      <FormGroup className='flex-row justify-end gap-6'>
                        {['read', 'write', 'create'].map(action => (
                          <FormControlLabel
                            key={action}
                            control={
                              <Checkbox
                                onChange={() => togglePermission(`${id}-${action}`)}
                                checked={selectedCheckbox.includes(`${id}-${action}`)}
                              />
                            }
                            label={action.charAt(0).toUpperCase() + action.slice(1)}
                          />
                        ))}
                      </FormGroup>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </DialogContent>

      <DialogActions className='justify-center'>
        <Button
          variant='contained'
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? 'Saving...' : 'Submit'}
        </Button>
        <Button variant='tonal' color='secondary' onClick={handleClose}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default RoleDialog
