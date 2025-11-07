


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
// import { fetchIndicator } from '../../../../../app/server/actions'

// const EditDepartment = ({ open, handleClose, selectedDepartment, onSave }) => {
//   const [formData, setFormData] = useState({
//     _id: '',
//     name: '',
//     branch: '',
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
//         const res = await fetchIndicator()
//         if (res?.success && Array.isArray(res.data)) {
//           setBranches(res.data)
//         } else if (Array.isArray(res)) {
//           setBranches(res)
//         } else {
//           console.warn('Invalid branch data format:', res)
//         }
//       } catch (err) {
//         console.error('Error fetching branches:', err)
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
//       b => b.category.trim() === selectedDepartment.category.trim()
//     )

//     setFormData({
//       _id: selectedDepartment._id || '',
//       indicatorName: selectedDepartment.indicatorName || '',
//       category: matchedBranch?._id || '',
//       description: selectedDepartment.description || '',
//       measurementUnit: selectedDepartment.measurementUnit || '',
//       targetValue: selectedDepartment.targetValue || '',
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
//         message: res?.message || 'Indicator updated successfully!',
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
//             Edit Indicator
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
//               label='Indicator Name'
//               fullWidth
//               value={formData.indicatorName}
//               onChange={e => setFormData({ ...formData, indicatorName: e.target.value })}
//             />

//             {/* <TextField
//               label='Branch'
//               fullWidth
//               value={formData.Plot}
//               onChange={e => setFormData({ ...formData, Plot: e.target.value })}
//             /> */}

//              <TextField
//               select
//               label='Category'
//               fullWidth
//               value={formData.category||""}
//               onChange={e => setFormData({ ...formData, category: e.target.value })}
//             >
//               {loadingBranches ? (
//                 <MenuItem disabled>Loading  category...</MenuItem>
//               ) : branches.length > 0 ? (
//                 branches.map(branch => (
//                   <MenuItem key={branch._id} value={branch._id}>
//                     {branch.category}
//                   </MenuItem>
//                 ))
//               ) : (
//                 <MenuItem disabled>No categories found</MenuItem>
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

// 📦 MUI Imports
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

// 🧠 Server Action
import { fetchListOfCategoryIndicator } from '../../../../../app/server/actions'

const EditDepartment = ({ open, handleClose, selectedDepartment, onSave }) => {
  // ✅ Local form data
  const [formData, setFormData] = useState({
    _id: '',
    indicatorName: '',
    category: '',
    description: '',
    measurementUnit: '',
    targetValue: '',
    status: 'Active'
  })

  // ✅ Dropdown categories
  const [categories, setCategories] = useState([])
  const [loadingCategories, setLoadingCategories] = useState(true)

  // ✅ Snackbar
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  })

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false })
  }

  // ✅ Fetch category list
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const res = await fetchListOfCategoryIndicator()
        if (res?.success && Array.isArray(res.data)) {
          setCategories(res.data)
        } else if (Array.isArray(res)) {
          setCategories(res)
        } else {
          console.warn('Invalid category data format:', res)
        }
      } catch (err) {
        console.error('Error fetching categories:', err)
      } finally {
        setLoadingCategories(false)
      }
    }

    loadCategories()
  }, [])

  // ✅ Auto-fill existing data when drawer opens
  useEffect(() => {
    if (selectedDepartment) {
      let categoryValue =
        selectedDepartment.category?._id ||
        selectedDepartment.category ||
        ''

      // 🧠 if backend gives category name instead of id
      if (typeof categoryValue === 'string' && categories.length > 0) {
        const matchedCategory = categories.find(
          c =>
            c.category?.trim().toLowerCase() ===
            categoryValue.trim().toLowerCase()
        )
        categoryValue = matchedCategory?._id || categoryValue
      }

      setFormData({
        _id: selectedDepartment._id || '',
        indicatorName: selectedDepartment.indicatorName || '',
        category: categoryValue || '',
        description: selectedDepartment.description || '',
        measurementUnit: selectedDepartment.measurementUnit || '',
        targetValue: selectedDepartment.targetValue || '',
        status: selectedDepartment.status || 'Active'
      })
    }
  }, [selectedDepartment, categories])

  // ✅ Save changes handler
  const handleSave = async () => {
    try {
      const res = await onSave(formData)
      setSnackbar({
        open: true,
        message: res?.message || 'Indicator updated successfully!',
        severity: res?.success ? 'success' : 'error'
      })
      if (res?.success) handleClose()
    } catch (error) {
      console.error('Update error:', error)
      setSnackbar({
        open: true,
        message: 'Something went wrong!',
        severity: 'error'
      })
    }
  }

  // ✅ Reset on close
  const handleReset = () => {
    handleClose()
    setFormData({
      _id: '',
      indicatorName: '',
      category: '',
      description: '',
      measurementUnit: '',
      targetValue: '',
      status: 'Active'
    })
  }

  return (
    <>
      {/* 🪟 Drawer */}
      <Drawer
        open={open}
        anchor='right'
        variant='temporary'
        onClose={handleReset}
        ModalProps={{ keepMounted: true }}
        sx={{
          '& .MuiDrawer-paper': { width: { xs: 320, sm: 420 } }
        }}
      >
        {/* Header */}
        <div className='flex items-center justify-between plb-5 pli-6'>
          <Typography variant='h5' sx={{ fontWeight: 600 }}>
            Edit Indicator
          </Typography>
          <IconButton size='small' onClick={handleReset}>
            <i className='tabler-x text-2xl text-textPrimary' />
          </IconButton>
        </div>

        <Divider />

        {/* ✅ Form Section */}
        <Box sx={{ p: 6 }}>
          <form className='flex flex-col gap-5'>
            <TextField
              label='Indicator Name'
              fullWidth
              value={formData.indicatorName}
              onChange={e =>
                setFormData({ ...formData, indicatorName: e.target.value })
              }
            />

            {/* Category Dropdown */}
            <TextField
              select
              label='Category'
              fullWidth
              value={formData.category}
              onChange={e =>
                setFormData({ ...formData, category: e.target.value })
              }
            >
              {loadingCategories ? (
                <MenuItem disabled>Loading categories...</MenuItem>
              ) : categories.length > 0 ? (
                categories.map(cat => (
                  <MenuItem key={cat._id} value={cat._id}>
                    {cat.category}
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled>No categories found</MenuItem>
              )}
            </TextField>

            <TextField
              label='Description'
              fullWidth
              multiline
              minRows={2}
              value={formData.description}
              onChange={e =>
                setFormData({ ...formData, description: e.target.value })
              }
            />

            <TextField
              select
              label='Measurement Unit'
              fullWidth
              value={formData.measurementUnit}
              onChange={e =>
                setFormData({ ...formData, measurementUnit: e.target.value })
              }
            >
              <MenuItem value='Rating'>Rating</MenuItem>
              <MenuItem value='Percentage'>Percentage</MenuItem>
              <MenuItem value='Hours'>Hours</MenuItem>
            </TextField>

            <TextField
              label='Target Value'
              fullWidth
              value={formData.targetValue}
              onChange={e =>
                setFormData({ ...formData, targetValue: e.target.value })
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

            {/* ✅ Buttons */}
            <div className='flex items-center gap-4 mt-4'>
              <Button variant='contained' onClick={handleSave}>
                Save Changes
              </Button>
              <Button variant='tonal' color='error' onClick={handleReset}>
                Cancel
              </Button>
            </div>
          </form>
        </Box>
      </Drawer>

      {/* ✅ Snackbar */}
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






