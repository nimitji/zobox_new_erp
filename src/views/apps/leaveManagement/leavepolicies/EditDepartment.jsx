

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
// import { FormControlLabel, Checkbox } from '@mui/material'

// import { useSession } from 'next-auth/react'

// // Server action to fetch leave types (adjust path if needed)
// import { fetchListOfLeaveType } from '../../../../app/server/actions'

// const EditDepartment = ({ open, handleClose, selectedDepartment, onSave }) => {
//   const { data: session } = useSession()
//   const token = session?.user?.accessToken

//   const [leaveTypes, setLeaveTypes] = useState([])
//   const [loadingLeaveTypes, setLoadingLeaveTypes] = useState(false)

//   const [formData, setFormData] = useState({
//     _id: '',
//     policyName: '',
//     description: '',
//     leaveType: '',
//     accuralType: 'Yearly',
//     accuralRates: '',
//     carryForwardLimit: '',
//     minDays: '',
//     maxDays: '',
//     isRequired: 'Required',
//     status: 'Active'
//   })

//   // Snackbar
//   const [snackbar, setSnackbar] = useState({
//     open: false,
//     message: '',
//     severity: 'success'
//   })

//   const handleSnackbarClose = () => setSnackbar(prev => ({ ...prev, open: false }))

//   // Load leave types for select
//   useEffect(() => {
//     const load = async () => {
//       try {
//         setLoadingLeaveTypes(true)
//         const res = await fetchListOfLeaveType()
//         // Accept both { success, data } or array response
//         const list = res?.success ? res.data : Array.isArray(res) ? res : []
//         setLeaveTypes(list)
//       } catch (err) {
//         console.error('Error loading leave types', err)
//         setLeaveTypes([])
//       } finally {
//         setLoadingLeaveTypes(false)
//       }
//     }
//     load()
//   }, [])

//   // Prefill form when selectedDepartment changes
//   useEffect(() => {
//     if (selectedDepartment) {
//       setFormData({
//         _id: selectedDepartment._id || '',
//         policyName: selectedDepartment.policyName || '',
//         description: selectedDepartment.description || '',
//         leaveType: selectedDepartment.leaveType || selectedDepartment.leaveTypeId || '',
//         accuralType: selectedDepartment.accuralType || 'Yearly',
//         accuralRates: selectedDepartment.accuralRates || '',
//         carryForwardLimit: selectedDepartment.carryForwardLimit || '',
//         minDays: selectedDepartment.minDays || '',
//         maxDays: selectedDepartment.maxDays || '',
//         isRequired: selectedDepartment.isRequired || 'Required',
//         status: selectedDepartment.status || 'Active'
//       })
//     } else {
//       // reset when no selection
//       setFormData({
//         _id: '',
//         policyName: '',
//         description: '',
//         leaveType: '',
//         accuralType: 'Yearly',
//         accuralRates: '',
//         carryForwardLimit: '',
//         minDays: '',
//         maxDays: '',
//         isRequired: 'Required',
//         status: 'Active'
//       })
//     }
//   }, [selectedDepartment])

//   // Basic validation: policyName and leaveType required
//   const isSaveDisabled = !formData.policyName || !formData.leaveType

//   // Save handler
//   const handleSave = async () => {
//     try {
//       // build payload exactly as you specified
//       const payload = {
//         _id:formData._id,
//         policyName: formData.policyName,
//         description: formData.description,
//         leaveType: formData.leaveType,
//         accuralType: formData.accuralType,
//         accuralRates: formData.accuralRates,
//         carryForwardLimit: formData.carryForwardLimit,
//         minDays: formData.minDays,
//         maxDays: formData.maxDays,
//         isRequired: formData.isRequired,
//         status: formData.status
//       }

//       // call parent onSave; parent should call backend update api
//       const res = await onSave?.({ id: formData._id, payload })

//       setSnackbar({
//         open: true,
//         message: res?.message || (res?.success ? 'Policy updated' : 'Update failed'),
//         severity: res?.success ? 'success' : 'error'
//       })

//       if (res?.success) {
//         handleClose()
//       }
//     } catch (err) {
//       console.error('Error saving', err)
//       setSnackbar({
//         open: true,
//         message: 'Something went wrong',
//         severity: 'error'
//       })
//     }
//   }

//   return (
//     <>
//       <Drawer
//         open={open}
//         anchor="right"
//         variant="temporary"
//         onClose={handleClose}
//         ModalProps={{ keepMounted: true }}
//         sx={{ '& .MuiDrawer-paper': { width: { xs: 320, sm: 420 } } }}
//       >
//         {/* Header */}
//         <div className="flex items-center justify-between plb-5 pli-6">
//           <Typography variant="h5" sx={{ fontWeight: 600 }}>
//             Edit Leave Policy
//           </Typography>
//           <IconButton size="small" onClick={handleClose}>
//             <i className="tabler-x text-2xl text-textPrimary" />
//           </IconButton>
//         </div>

//         <Divider />

//         {/* Form */}
//         <Box sx={{ p: 6 }}>
//           <form className="flex flex-col gap-4" onSubmit={e => { e.preventDefault(); handleSave() }}>
//             <TextField
//               label="Policy Name"
//               fullWidth
//               value={formData.policyName}
//               onChange={e => setFormData({ ...formData, policyName: e.target.value })}
//               required
//             />

//             <TextField
//               label="Description"
//               fullWidth
//               multiline
//               minRows={3}
//               value={formData.description}
//               onChange={e => setFormData({ ...formData, description: e.target.value })}
//             />

//             <TextField
//               select
//               label="Leave Type"
//               fullWidth
//               value={formData.leaveType || ''}
//               onChange={e => setFormData({ ...formData, leaveType: e.target.value })}
//               required
//             >
//               {loadingLeaveTypes ? (
//                 <MenuItem disabled>Loading...</MenuItem>
//               ) : leaveTypes.length > 0 ? (
//                 leaveTypes.map(item => (
//                   <MenuItem key={item._id} value={item._id}>
//                     {item.leaveTypeName}
//                   </MenuItem>
//                 ))
//               ) : (
//                 <MenuItem disabled>No leave types</MenuItem>
//               )}
//             </TextField>

//             <TextField
//               select
//               label="Accrual Type"
//               fullWidth
//               value={formData.accuralType}
//               onChange={e => setFormData({ ...formData, accuralType: e.target.value })}
//             >
//               <MenuItem value="Yearly">Yearly</MenuItem>
//               <MenuItem value="Monthly">Monthly</MenuItem>
//             </TextField>

//             <TextField
//               label="Accrual Rates (Days)"
//               fullWidth
//               value={formData.accuralRates}
//               onChange={e => setFormData({ ...formData, accuralRates: e.target.value })}
//             />

//             <TextField
//               label="Carry Forward Limit (Days)"
//               fullWidth
//               value={formData.carryForwardLimit}
//               onChange={e => setFormData({ ...formData, carryForwardLimit: e.target.value })}
//             />

//             <div className="grid grid-cols-2 gap-4">
//               <TextField
//                 label="Minimum Days"
//                 fullWidth
//                 value={formData.minDays}
//                 onChange={e => setFormData({ ...formData, minDays: e.target.value })}
//               />
//               <TextField
//                 label="Maximum Days"
//                 fullWidth
//                 value={formData.maxDays}
//                 onChange={e => setFormData({ ...formData, maxDays: e.target.value })}
//               />
//             </div>

//             <TextField
//               select
//               label="Requires Approval"
//               fullWidth
//               value={formData.isRequired}
//               onChange={e => setFormData({ ...formData, isRequired: e.target.value })}
//             >
//               <MenuItem value="Required">Required</MenuItem>
//               <MenuItem value="Not Required">Not Required</MenuItem>
//             </TextField>

//             <TextField
//               select
//               label="Status"
//               fullWidth
//               value={formData.status}
//               onChange={e => setFormData({ ...formData, status: e.target.value })}
//             >
//               <MenuItem value="Active">Active</MenuItem>
//               <MenuItem value="Inactive">Inactive</MenuItem>
//             </TextField>

//             {/* Buttons */}
//             <div className="flex items-center gap-4 mt-2">
//               <Button variant="contained" onClick={handleSave} disabled={isSaveDisabled}>
//                 Save Changes
//               </Button>
//               <Button variant="tonal" color="error" onClick={handleClose}>
//                 Cancel
//               </Button>
//             </div>
//           </form>
//         </Box>
//       </Drawer>

//       {/* Snackbar */}
//       <Snackbar
//         open={snackbar.open}
//         autoHideDuration={3000}
//         onClose={handleSnackbarClose}
//         anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
//       >
//         <Alert
//           onClose={handleSnackbarClose}
//           severity={snackbar.severity}
//           variant="filled"
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

import { fetchListOfLeaveType } from '../../../../app/server/actions'

const EditDepartment = ({ open, handleClose, selectedDepartment, onSave }) => {
  const [leaveTypes, setLeaveTypes] = useState([])
  const [loadingLeaveTypes, setLoadingLeaveTypes] = useState(false)

  const [formData, setFormData] = useState({
    _id: '',
    policyName: '',
    description: '',
    leaveType: '',
    accuralType: 'Yearly',
    accuralRates: '',
    carryForwardLimit: '',
    minDays: '',
    maxDays: '',
    isRequired: 'Required',
    status: 'Active'
  })

  // Snackbar
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  })

  const handleSnackbarClose = () =>
    setSnackbar(prev => ({ ...prev, open: false }))

  // Load leave types for dropdown
  useEffect(() => {
    const loadTypes = async () => {
      try {
        setLoadingLeaveTypes(true)
        const res = await fetchListOfLeaveType()
        const list = res?.success ? res.data : Array.isArray(res) ? res : []
        setLeaveTypes(list)
      } finally {
        setLoadingLeaveTypes(false)
      }
    }
    loadTypes()
  }, [])

  // Prefill form when opening edit drawer
  useEffect(() => {
    if (selectedDepartment) {
      setFormData({
        _id: selectedDepartment._id || '',
        policyName: selectedDepartment.policyName || '',
        description: selectedDepartment.description || '',
        leaveType:
          selectedDepartment.leaveType ||
          selectedDepartment.leaveTypeId ||
          '',
        accuralType: selectedDepartment.accuralType || 'Yearly',
        accuralRates: selectedDepartment.accuralRates || '',
        carryForwardLimit: selectedDepartment.carryForwardLimit || '',
        minDays: selectedDepartment.minDays || '',
        maxDays: selectedDepartment.maxDays || '',
        isRequired: selectedDepartment.isRequired || 'Required',
        status: selectedDepartment.status || 'Active'
      })
    }
  }, [selectedDepartment])

  // Submit
  const handleSave = async () => {
    try {
      const res = await onSave(formData)

      setSnackbar({
        open: true,
        message: res?.message || 'Failed to update!',
        severity: res?.success ? 'success' : 'error'
      })

      if (res?.success) handleClose()
    } catch (err) {
      setSnackbar({
        open: true,
        message: 'Something went wrong!',
        severity: 'error'
      })
    }
  }

  const isSaveDisabled =
    !formData.policyName || !formData.leaveType

  return (
    <>
      <Drawer
        open={open}
        anchor="right"
        onClose={handleClose}
        variant="temporary"
        ModalProps={{ keepMounted: true }}
        sx={{ '& .MuiDrawer-paper': { width: { xs: 320, sm: 420 } } }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5">
          <Typography variant="h5" fontWeight={600}>
            Edit Leave Policy
          </Typography>
          <IconButton size="small" onClick={handleClose}>
            <i className="tabler-x text-2xl" />
          </IconButton>
        </div>

        <Divider />

        <Box sx={{ p: 6 }}>
          <form
            className="flex flex-col gap-4"
            onSubmit={e => {
              e.preventDefault()
              handleSave()
            }}
          >
            {/* Policy Name */}
            <TextField
              label="Policy Name"
              fullWidth
              value={formData.policyName}
              onChange={e =>
                setFormData({ ...formData, policyName: e.target.value })
              }
              required
            />

            {/* Description */}
            <TextField
              label="Description"
              fullWidth
              multiline
              minRows={3}
              value={formData.description}
              onChange={e =>
                setFormData({ ...formData, description: e.target.value })
              }
            />

            {/* Leave Type */}
            <TextField
              select
              label="Leave Type"
              fullWidth
              value={formData.leaveType}
              onChange={e =>
                setFormData({ ...formData, leaveType: e.target.value })
              }
              required
            >
              {loadingLeaveTypes ? (
                <MenuItem disabled>Loading...</MenuItem>
              ) : leaveTypes.length > 0 ? (
                leaveTypes.map(item => (
                  <MenuItem key={item._id} value={item._id}>
                    {item.leaveTypeName}
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled>No leave types</MenuItem>
              )}
            </TextField>

            {/* Accrual Type */}
            <TextField
              select
              fullWidth
              label="Accrual Type"
              value={formData.accuralType}
              onChange={e =>
                setFormData({ ...formData, accuralType: e.target.value })
              }
            >
              <MenuItem value="Yearly">Yearly</MenuItem>
              <MenuItem value="Monthly">Monthly</MenuItem>
            </TextField>

            {/* Rates */}
            <TextField
              label="Accrual Rates (Days)"
              fullWidth
              value={formData.accuralRates}
              onChange={e =>
                setFormData({ ...formData, accuralRates: e.target.value })
              }
            />

            {/* Carry Forward */}
            <TextField
              label="Carry Forward Limit (Days)"
              fullWidth
              value={formData.carryForwardLimit}
              onChange={e =>
                setFormData({
                  ...formData,
                  carryForwardLimit: e.target.value
                })
              }
            />

            {/* Min/Max Days */}
            <div className="grid grid-cols-2 gap-4">
              <TextField
                label="Min Days"
                fullWidth
                value={formData.minDays}
                onChange={e =>
                  setFormData({ ...formData, minDays: e.target.value })
                }
              />
              <TextField
                label="Max Days"
                fullWidth
                value={formData.maxDays}
                onChange={e =>
                  setFormData({ ...formData, maxDays: e.target.value })
                }
              />
            </div>

            {/* Approval Required */}
            <TextField
              select
              label="Requires Approval"
              fullWidth
              value={formData.isRequired}
              onChange={e =>
                setFormData({ ...formData, isRequired: e.target.value })
              }
            >
              <MenuItem value="Required">Required</MenuItem>
              <MenuItem value="Not Required">Not Required</MenuItem>
            </TextField>

            {/* Status */}
            <TextField
              select
              label="Status"
              fullWidth
              value={formData.status}
              onChange={e =>
                setFormData({ ...formData, status: e.target.value })
              }
            >
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Inactive">Inactive</MenuItem>
            </TextField>

            {/* Buttons */}
            <div className="flex items-center gap-4 mt-2">
              <Button
                variant="contained"
                disabled={isSaveDisabled}
                onClick={handleSave}
              >
                Save Changes
              </Button>

              <Button variant="tonal" color="error" onClick={handleClose}>
                Cancel
              </Button>
            </div>
          </form>
        </Box>
      </Drawer>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={2500}
        onClose={handleSnackbarClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbar.severity}
          variant="filled"
          sx={{
            backgroundColor:
              snackbar.severity === 'success'
                ? '#2B3380'
                : '#d32f2f',
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





