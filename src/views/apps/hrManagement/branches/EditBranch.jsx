

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

// const EditBranch = ({ open, handleClose, selectedBranch, onSave }) => {
//   const [formData, setFormData] = useState({
//     _id:'',
//     branchName: '',
//     Plot: '',
//     City: '',
//     State: '',
//     Country: '',
//     Pincode: '',
//     phone: '',
//     emailid: '',
//     status: 'Active'
//   })

//   // ✅ Auto-fill fields when drawer opens with selected branch data
//   useEffect(() => {
//     if (selectedBranch) {
//       setFormData({
//         _id:selectedBranch._id || '',
//         branchName: selectedBranch.branchName || '',
//         Plot: selectedBranch.Plot || '',
//         City: selectedBranch.City || '',
//         State: selectedBranch.State || '',
//         Country: selectedBranch.Country || '',
//         Pincode: selectedBranch.Pincode || '',
//         phone: selectedBranch.phone || '',
//         emailid: selectedBranch.emailid || '',
//         status: selectedBranch.status || 'Active'
//       })
//     }
//   }, [selectedBranch])

//   const handleSave = () => {
//     onSave(formData)
//     handleClose()
//   }

//   return (
//     <Drawer
//       open={open}
//       anchor='right'
//       variant='temporary'
//       onClose={handleClose}
//       ModalProps={{ keepMounted: true }}
//       sx={{
//         '& .MuiDrawer-paper': { width: { xs: 320, sm: 420 } }
//       }}
//     >
//       {/* ✅ Header same as AddBranchDrawer */}
//       <div className='flex items-center justify-between plb-5 pli-6'>
//         <Typography variant='h5' sx={{ fontWeight: 600 }}>
//           Edit Branch
//         </Typography>
//         <IconButton size='small' onClick={handleClose}>
//           <i className='tabler-x text-2xl text-textPrimary' />
//         </IconButton>
//       </div>

//       <Divider />

//       {/* ✅ Form Section */}
//       <Box sx={{ p: 6 }}>
//         <form className='flex flex-col gap-5'>
//           <TextField
//             label='Branch Name'
//             fullWidth
//             value={formData.branchName}
//             onChange={e => setFormData({ ...formData, branchName: e.target.value })}
//           />

//           <TextField
//             label='Address (Plot)'
//             fullWidth
//             value={formData.Plot}
//             onChange={e => setFormData({ ...formData, Plot: e.target.value })}
//           />

//           <TextField
//             label='City'
//             fullWidth
//             value={formData.City}
//             onChange={e => setFormData({ ...formData, City: e.target.value })}
//           />

//           <TextField
//             label='State'
//             fullWidth
//             value={formData.State}
//             onChange={e => setFormData({ ...formData, State: e.target.value })}
//           />

//           <TextField
//             label='Country'
//             fullWidth
//             value={formData.Country}
//             onChange={e => setFormData({ ...formData, Country: e.target.value })}
//           />

//           <TextField
//             label='Pincode'
//             fullWidth
//             value={formData.Pincode}
//             onChange={e => setFormData({ ...formData, Pincode: e.target.value })}
//           />

//           <TextField
//             label='Phone'
//             fullWidth
//             value={formData.phone}
//             onChange={e => setFormData({ ...formData, phone: e.target.value })}
//           />

//           <TextField
//             label='Email'
//             fullWidth
//             type='email'
//             value={formData.emailid}
//             onChange={e => setFormData({ ...formData, emailid: e.target.value })}
//           />

//           <TextField
//             select
//             label='Status'
//             fullWidth
//             value={formData.status}
//             onChange={e => setFormData({ ...formData, status: e.target.value })}
//           >
//             <MenuItem value='Active'>Active</MenuItem>
//             <MenuItem value='Inactive'>Inactive</MenuItem>
//           </TextField>

//           {/* ✅ Action Buttons same style as Add Drawer */}
//           <div className='flex items-center gap-4 mt-4'>
//             <Button variant='contained' onClick={handleSave}>
//               Save Changes
//             </Button>
//             <Button variant='tonal' color='error' onClick={handleClose}>
//               Cancel
//             </Button>
//           </div>
//         </form>
//       </Box>
//     </Drawer>
//   )
// }

// export default EditBranch


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

const EditBranch = ({ open, handleClose, selectedBranch, onSave }) => {
  const [formData, setFormData] = useState({
    _id: '',
    branchName: '',
    Plot: '',
    City: '',
    State: '',
    Country: '',
    Pincode: '',
    phone: '',
    emailid: '',
    status: 'Active'
  })

  // ✅ Snackbar state
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  })

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false })
  }

  // ✅ Auto-fill fields when drawer opens
  useEffect(() => {
    if (selectedBranch) {
      setFormData({
        _id: selectedBranch._id || '',
        branchName: selectedBranch.branchName || '',
        Plot: selectedBranch.Plot || '',
        City: selectedBranch.City || '',
        State: selectedBranch.State || '',
        Country: selectedBranch.Country || '',
        Pincode: selectedBranch.Pincode || '',
        phone: selectedBranch.phone || '',
        emailid: selectedBranch.emailid || '',
        status: selectedBranch.status || 'Active'
      })
    }
  }, [selectedBranch])

  // ✅ Handle save with snackbar feedback
  const handleSave = async () => {
    try {
      const res = await onSave(formData) // backend call in parent component
      setSnackbar({
        open: true,
        message: res?.message || 'Branch updated successfully!',
        severity: res?.success ? 'success' : 'error'
      })
      if (res?.success) handleClose()
    } catch (error) {
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
        {/* ✅ Header same as AddBranchDrawer */}
        <div className='flex items-center justify-between plb-5 pli-6'>
          <Typography variant='h5' sx={{ fontWeight: 600 }}>
            Edit Branch
          </Typography>
          <IconButton size='small' onClick={handleClose}>
            <i className='tabler-x text-2xl text-textPrimary' />
          </IconButton>
        </div>

        <Divider />

        {/* ✅ Form Section */}
        <Box sx={{ p: 6 }}>
          <form className='flex flex-col gap-5'>
            <TextField
              label='Branch Name'
              fullWidth
              value={formData.branchName}
              onChange={e => setFormData({ ...formData, branchName: e.target.value })}
            />

            <TextField
              label='Address (Plot)'
              fullWidth
              value={formData.Plot}
              onChange={e => setFormData({ ...formData, Plot: e.target.value })}
            />

            <TextField
              label='City'
              fullWidth
              value={formData.City}
              onChange={e => setFormData({ ...formData, City: e.target.value })}
            />

            <TextField
              label='State'
              fullWidth
              value={formData.State}
              onChange={e => setFormData({ ...formData, State: e.target.value })}
            />

            <TextField
              label='Country'
              fullWidth
              value={formData.Country}
              onChange={e => setFormData({ ...formData, Country: e.target.value })}
            />

            <TextField
              label='Pincode'
              fullWidth
              value={formData.Pincode}
              onChange={e => setFormData({ ...formData, Pincode: e.target.value })}
            />

            <TextField
              label='Phone'
              fullWidth
              value={formData.phone}
              onChange={e => setFormData({ ...formData, phone: e.target.value })}
            />

            <TextField
              label='Email'
              fullWidth
              type='email'
              value={formData.emailid}
              onChange={e => setFormData({ ...formData, emailid: e.target.value })}
            />

            <TextField
              select
              label='Status'
              fullWidth
              value={formData.status}
              onChange={e => setFormData({ ...formData, status: e.target.value })}
            >
              <MenuItem value='Active'>Active</MenuItem>
              <MenuItem value='Inactive'>Inactive</MenuItem>
            </TextField>

            {/* ✅ Action Buttons same style as Add Drawer */}
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

      {/* ✅ Snackbar for backend message */}
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
            backgroundColor: snackbar.severity === 'success' ? '#2B3380' : '#d32f2f',
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

export default EditBranch


