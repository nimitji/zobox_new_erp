


// 'use client'

// import { useEffect, useState } from 'react'

// // MUI Imports
// import Drawer from '@mui/material/Drawer'
// import Typography from '@mui/material/Typography'
// import Divider from '@mui/material/Divider'
// import Button from '@mui/material/Button'
// import IconButton from '@mui/material/IconButton'
// import TextField from '@mui/material/TextField'
// import MenuItem from '@mui/material/MenuItem'
// import Box from '@mui/material/Box'
// import Snackbar from '@mui/material/Snackbar'
// import Alert from '@mui/material/Alert'
// import { description } from 'valibot'
// import { fetchListOfDepartment } from '../../../../app/server/actions.js'

// const EditDepartment = ({ open, handleClose, selectedDepartment, onSave }) => {
//   const [formData, setFormData] = useState({
//     _id: '',
//     name: '',
//     department: '',
//     description: '',
//     status: 'Active'
//   })
// console.log("POOJA456",formData)
//     // ✅ Branch dropdown data
//   const [branches, setBranches] = useState([])
//   const [loadingBranches, setLoadingBranches] = useState(true)

//   // ✅ Snackbar state
//   const [snackbar, setSnackbar] = useState({
//     open: false,
//     message: '',
//     severity: 'success'
//   })

//   const handleSnackbarClose = () => {
//     setSnackbar({ ...snackbar, open: false })
//   }

//     useEffect(() => {
//     const loadBranches = async () => {
//       try {
//         const res = await fetchListOfDepartment()
//         if (res?.success && Array.isArray(res.data)) {
//           setBranches(res.data)
//         } else if (Array.isArray(res)) {
//           setBranches(res)
//         } else {
//           console.warn('Invalid designation data format:', res)
//         }
//       } catch (err) {
//         console.error('Error fetching designation:', err)
//       } finally {
//         setLoadingBranches(false)
//       }
//     }

//     loadBranches()
//   }, [])

//   // ✅ Auto-fill fields when drawer opens
//   // useEffect(() => {
//   //   if (selectedDepartment) {
//   //     setFormData({
//   //       _id: selectedDepartment._id || '',
//   //       name: selectedDepartment.name || '',
//   //       branch: selectedDepartment.branch || '',
//   //       description: selectedDepartment.description || '',
//   //       status: selectedDepartment.status || 'Active'
//   //     })
//   //   }
//   // }, [selectedDepartment])

// /

// useEffect(() => {
//   if (selectedDepartment && branches.length > 0) {
//     const matchedBranch = branches.find(
//       b => b.departmentName.trim() === selectedDepartment.department.trim()
//     )

//     setFormData({
//       _id: selectedDepartment._id || '',
//       name: selectedDepartment.name || '',
//       department: matchedBranch?._id || '',
//       description: selectedDepartment.description || '',
//       status: selectedDepartment.status || 'Active'
//     })
//   }
// }, [selectedDepartment, branches.length])


//   // ✅ Handle save with snackbar feedback
//   const handleSave = async () => {
//     try {
//       const res = await onSave(formData) // backend call in parent component
//       setSnackbar({
//         open: true,
//         message: res?.message || 'Designation updated successfully!',
//         severity: res?.success ? 'success' : 'error'
//       })
//       if (res?.success) handleClose()
//     } catch (error) {
//       setSnackbar({
//         open: true,
//         message: 'Something went wrong!',
//         severity: 'error'
//       })
//     }
//   }

//   return (
//     <>
//       <Drawer
//         open={open}
//         anchor='right'
//         variant='temporary'
//         onClose={handleClose}
//         ModalProps={{ keepMounted: true }}
//         sx={{
//           '& .MuiDrawer-paper': { width: { xs: 320, sm: 420 } }
//         }}
//       >
//         {/* ✅ Header same as AddBranchDrawer */}
//         <div className='flex items-center justify-between plb-5 pli-6'>
//           <Typography variant='h5' sx={{ fontWeight: 600 }}>
//             Edit Designation
//           </Typography>
//           <IconButton size='small' onClick={handleClose}>
//             <i className='tabler-x text-2xl text-textPrimary' />
//           </IconButton>
//         </div>

//         <Divider />

//         {/* ✅ Form Section */}
//         <Box sx={{ p: 6 }}>
//           <form className='flex flex-col gap-5'>
//             <TextField
//               label='Designation Name'
//               fullWidth
//               value={formData.name}
//               onChange={e => setFormData({ ...formData, name: e.target.value })}
//             />

//             {/* <TextField
//               label='Branch'
//               fullWidth
//               value={formData.Plot}
//               onChange={e => setFormData({ ...formData, Plot: e.target.value })}
//             /> */}

//              <TextField
//               select
//               label='Department'
//               fullWidth
//               value={formData.department||""}
//               onChange={e => setFormData({ ...formData, department: e.target.value })}
//             >
//               {loadingBranches ? (
//                 <MenuItem disabled>Loading departments...</MenuItem>
//               ) : branches.length > 0 ? (
//                 branches.map(branch => (
//                   <MenuItem key={branch._id} value={branch._id}>
//                     {branch.departmenthName}
//                   </MenuItem>
//                 ))
//               ) : (
//                 <MenuItem disabled>No departments found</MenuItem>
//               )}
//             </TextField>

//             <TextField
//               label='Description'
//               fullWidth
//               value={formData.description}
//               onChange={e => setFormData({ ...formData, description: e.target.value })}
//             />


//             <TextField
//               select
//               label='Status'
//               fullWidth
//               value={formData.status}
//               onChange={e => setFormData({ ...formData, status: e.target.value })}
//             >
//               <MenuItem value='Active'>Active</MenuItem>
//               <MenuItem value='Inactive'>Inactive</MenuItem>
//             </TextField>

//             {/* ✅ Action Buttons same style as Add Drawer */}
//             <div className='flex items-center gap-4 mt-4'>
//               <Button variant='contained' onClick={handleSave}>
//                 Save Changes
//               </Button>
//               <Button variant='tonal' color='error' onClick={handleClose}>
//                 Cancel
//               </Button>
//             </div>
//           </form>
//         </Box>
//       </Drawer>

//       {/* ✅ Snackbar for backend message */}
//       <Snackbar
//         open={snackbar.open}
//         autoHideDuration={3000}
//         onClose={handleSnackbarClose}
//         anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
//       >
//         <Alert
//           onClose={handleSnackbarClose}
//           severity={snackbar.severity}
//           variant='filled'
//           sx={{
//             backgroundColor: snackbar.severity === 'success' ? '#2B3380' : '#d32f2f',
//             color: 'white',
//             fontWeight: 500
//           }}
//         >
//           {snackbar.message}
//         </Alert>
//       </Snackbar>
//     </>
//   )
// }

// export default EditDepartment


'use client'

import { useEffect, useState } from 'react'

// MUI Imports
import Drawer from '@mui/material/Drawer'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import Box from '@mui/material/Box'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'

// Import your backend action
import { fetchListOfDepartment } from '../../../../app/server/actions.js'

const EditDepartment = ({ open, handleClose, selectedDepartment, onSave }) => {
  const [formData, setFormData] = useState({
    _id: '',
    name: '',
    department: '',
    description: '',
    status: 'Active'
  })

  const [branches, setBranches] = useState([])
  const [loadingBranches, setLoadingBranches] = useState(true)

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  })

  const handleSnackbarClose = () => {
    setSnackbar(prev => ({ ...prev, open: false }))
  }

  // ✅ Load department list
  useEffect(() => {
    const loadDepartments = async () => {
      try {
        const res = await fetchListOfDepartment()

        if (res?.success && Array.isArray(res.data)) {
          setBranches(res.data)
        } else if (Array.isArray(res)) {
          setBranches(res)
        } else {
          console.warn('Invalid department data format:', res)
        }
      } catch (err) {
        console.error('Error fetching departments:', err)
      } finally {
        setLoadingBranches(false)
      }
    }

    loadDepartments()
  }, [])

  // ✅ Auto-fill form fields when drawer opens and data available
  useEffect(() => {
    if (selectedDepartment) {
      // Find the matching department in dropdown list if available
      const matchedDept = branches.find(
        dept =>
          dept.departmentName?.trim() ===
          selectedDepartment.departmentName?.trim()
      )

      setFormData({
        _id: selectedDepartment._id || '',
        name: selectedDepartment.name || '',
        department: matchedDept?._id || '',
        description: selectedDepartment.description || '',
        status: selectedDepartment.status || 'Active'
      })
    }
  }, [selectedDepartment, branches])

  // ✅ Handle save click
  const handleSave = async () => {
    try {
      const res = await onSave(formData)
      setSnackbar({
        open: true,
        message: res?.message || 'Designation updated successfully!',
        severity: res?.success ? 'success' : 'error'
      })

      if (res?.success) handleClose()
    } catch (error) {
      console.error(error)
      setSnackbar({
        open: true,
        message: 'Something went wrong!',
        severity: 'error'
      })
    }
  }

  return (
    <>
      <Drawer
        open={open}
        anchor='right'
        variant='temporary'
        onClose={handleClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          '& .MuiDrawer-paper': { width: { xs: 320, sm: 420 } }
        }}
      >
        {/* Header */}
        <div className='flex items-center justify-between plb-5 pli-6'>
          <Typography variant='h5' sx={{ fontWeight: 600 }}>
            Edit Designation
          </Typography>
          <IconButton size='small' onClick={handleClose}>
            <i className='tabler-x text-2xl text-textPrimary' />
          </IconButton>
        </div>

        <Divider />

        {/* Form Section */}
        <Box sx={{ p: 6 }}>
          <form className='flex flex-col gap-5'>
            <TextField
              label='Designation Name'
              fullWidth
              value={formData.name}
              onChange={e =>
                setFormData({ ...formData, name: e.target.value })
              }
            />

            {/* Department Dropdown */}
            <TextField
              select
              label='Department'
              fullWidth
              value={formData.department || ''}
              onChange={e =>
                setFormData({ ...formData, department: e.target.value })
              }
            >
              {loadingBranches ? (
                <MenuItem disabled>Loading departments...</MenuItem>
              ) : branches.length > 0 ? (
                branches.map(dept => (
                  <MenuItem key={dept._id} value={dept._id}>
                    {dept.departmentWithBranch || dept.departmentName}
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled>No departments found</MenuItem>
              )}
            </TextField>

            <TextField
              label='Description'
              fullWidth
              value={formData.description}
              onChange={e =>
                setFormData({ ...formData, description: e.target.value })
              }
            />

            <TextField
              select
              label='Status'
              fullWidth
              value={formData.status}
              onChange={e =>
                setFormData({ ...formData, status: e.target.value })
              }
            >
              <MenuItem value='Active'>Active</MenuItem>
              <MenuItem value='Inactive'>Inactive</MenuItem>
            </TextField>

            <div className='flex items-center gap-4 mt-4'>
              <Button variant='contained' onClick={handleSave}>
                Save Changes
              </Button>
              <Button variant='tonal' color='error' onClick={handleClose}>
                Cancel
              </Button>
            </div>
          </form>
        </Box>
      </Drawer>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbar.severity}
          variant='filled'
          sx={{
            backgroundColor:
              snackbar.severity === 'success' ? '#2B3380' : '#d32f2f',
            color: 'white',
            fontWeight: 500
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  )
}

export default EditDepartment



