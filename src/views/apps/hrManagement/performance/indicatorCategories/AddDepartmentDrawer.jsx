

// 'use client'

// import { useState,useEffect } from 'react'

// // 📦 MUI Imports
// import Button from '@mui/material/Button'
// import Drawer from '@mui/material/Drawer'
// import IconButton from '@mui/material/IconButton'
// import MenuItem from '@mui/material/MenuItem'
// import Typography from '@mui/material/Typography'
// import Divider from '@mui/material/Divider'
// import Snackbar from '@mui/material/Snackbar'
// import MuiAlert from '@mui/material/Alert'

// // 🧩 Third-party Imports
// import { useForm, Controller } from 'react-hook-form'

// // 🧠 Server Action
// import { createCategoryIndicator,fetchListOfBranch } from '../../../../../app/server/actions'

// // 🧱 Component Imports
// import CustomTextField from '@core/components/mui/TextField'
// import { description } from 'valibot'

// const initialData = {
//   country: '',
//   contact: ''
// }

// const AddDepartmentDrawer = props => {
//   const { open, handleClose, userData, setData, refreshDepartments } = props

//   const [formData, setFormData] = useState(initialData)
//   const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' })
//   //  const [branches, setBranches] = useState([]) // 🔹 Dynamic dropdown data
//   // const [loadingBranches, setLoadingBranches] = useState(true)

//   // 🔧 react-hook-form setup
//   const {
//     control,
//     reset: resetForm,
//     handleSubmit,
//     formState: { errors }
//   } = useForm({
//     defaultValues: {
//       name: '',
//       description: '',
//       status: 'Active'
//     }
//   })

//   // 🧠 Fetch Branch List from backend
//   //   useEffect(() => {
//   //   const loadBranches = async () => {
//   //     try {
//   //       const response = await fetchListOfBranch() // server action call
//   //       // Expected response: { success: true, data: [ { _id, branchName } ] }
//   //       if (response?.success && Array.isArray(response.data)) {
//   //         setBranches(response.data)
//   //       } else if (Array.isArray(response)) {
//   //         // handle array return directly
//   //         setBranches(response)
//   //       } else {
//   //         console.warn('Invalid branch data format:', response)
//   //       }
//   //     } catch (err) {
//   //       console.error('Error fetching branches:', err)
//   //     } finally {
//   //       setLoadingBranches(false)
//   //     }
//   //   }

//   //   loadBranches()
//   // }, [])

//   // ✅ Form submit
//   const onSubmit = async data => {
//     try {
//       const payload = {
//         name: data.name,
        
//         description: data.description,
//         status: data.status
//       }

//       const response = await createCategoryIndicator(payload)

//       if (response?.success) {
//         setSnackbar({ open: true, message: response.message || 'Branch created successfully', severity: 'success' })

//         // Refresh list (parent function)
//         if (typeof refreshDepartments === 'function') {
//           await refreshDepartments()
//         }

//         handleClose()
//         setFormData(initialData)
//         resetForm()
//       } else {
//         setSnackbar({ open: true, message: response.message || 'Failed to create branch', severity: 'error' })
//       }
//     } catch (error) {
//       console.error('Error creating branch:', error)
//       setSnackbar({ open: true, message: 'Error creating branch', severity: 'error' })
//     }
//   }

//   const handleReset = () => {
//     handleClose()
//     setFormData(initialData)
//     resetForm()
//   }

//   return (
//     <>
//       <Drawer
//         open={open}
//         anchor='right'
//         variant='temporary'
//         onClose={handleReset}
//         ModalProps={{ keepMounted: true }}
//         sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 400 } } }}
//       >
//         <div className='flex items-center justify-between plb-5 pli-6'>
//           <Typography variant='h5'>Add Category Name</Typography>
//           <IconButton size='small' onClick={handleReset}>
//             <i className='tabler-x text-2xl text-textPrimary' />
//           </IconButton>
//         </div>
//         <Divider />

//         {/* 🧾 Form Section */}
//         <div>
//           <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-6 p-6'>
//             <Controller
//               name='category'
//               control={control}
//               rules={{ required: true }}
//               render={({ field }) => (
//                 <CustomTextField
//                   {...field}
//                   fullWidth
//                   label='Category Name'
//                   placeholder='Job Performance'
//                   error={!!errors.category}
//                   helperText={errors.category && 'This field is required.'}
//                 />
//               )}
//             />

//             {/* //Dynamic dropdown  */}
         

//             <Controller
//               name='description'
//               control={control}
//               rules={{ required: true }}
//               render={({ field }) => (
//                 <CustomTextField
//                   {...field}
//                   fullWidth
//                   label='Description'
//                   placeholder=''
//                   error={!!errors.description}
//                   helperText={errors.description && 'This field is required.'}
//                 />
//               )}
//             />

   

//             <Controller
//               name='status'
//               control={control}
//               rules={{ required: true }}
//               render={({ field }) => (
//                 <CustomTextField select fullWidth label='Select Status' {...field}>
//                   <MenuItem value='Active'>Active</MenuItem>
//                   <MenuItem value='Inactive'>Inactive</MenuItem>
//                 </CustomTextField>
//               )}
//             />

//             {/* ✅ Action Buttons */}
//             <div className='flex items-center gap-4'>
//               <Button variant='contained' type='submit'>
//                 Submit
//               </Button>
//               <Button variant='tonal' color='error' onClick={handleReset}>
//                 Cancel
//               </Button>
//             </div>
//           </form>
//         </div>
//       </Drawer>

//       {/* ✅ Snackbar for Success/Error */}
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

// export default AddDepartmentDrawer


'use client'

import { useState } from 'react'

// 📦 MUI Imports
import Button from '@mui/material/Button'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'

// 🧩 Third-party Imports
import { useForm, Controller } from 'react-hook-form'

// 🧠 Server Actions
import { createCategoryIndicator } from '../../../../../app/server/actions'

// 🧱 Component Imports
import CustomTextField from '@core/components/mui/TextField'

const AddDepartmentDrawer = props => {
  const { open, handleClose, refreshDepartments } = props

  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' })

  // 🔧 react-hook-form setup
  const {
    control,
    reset: resetForm,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      category: '',
      description: '',
      status: 'Active'
    }
  })

  // ✅ Form submit
  const onSubmit = async data => {
    try {
      const payload = {
        category: data.category,
        description: data.description,
        status: data.status
      }

      const response = await createCategoryIndicator(payload)

      if (response?.success) {
        setSnackbar({
          open: true,
          message: response.message || 'Category created successfully',
          severity: 'success'
        })

        // Refresh list (parent function)
        if (typeof refreshDepartments === 'function') {
          await refreshDepartments()
        }

        handleClose()
        resetForm()
      } else {
        setSnackbar({
          open: true,
          message: response.message || 'Failed to create category',
          severity: 'error'
        })
      }
    } catch (error) {
      console.error('Error creating category:', error)
      setSnackbar({
        open: true,
        message: 'Error creating category',
        severity: 'error'
      })
    }
  }

  const handleReset = () => {
    handleClose()
    resetForm()
  }

  return (
    <>
      {/* 🪟 Drawer Section */}
      <Drawer
        open={open}
        anchor='right'
        variant='temporary'
        onClose={handleReset}
        ModalProps={{ keepMounted: true }}
        sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 400 } } }}
      >
        <div className='flex items-center justify-between plb-5 pli-6'>
          <Typography variant='h5'>Add Category</Typography>
          <IconButton size='small' onClick={handleReset}>
            <i className='tabler-x text-2xl text-textPrimary' />
          </IconButton>
        </div>

        <Divider />

        {/* 🧾 Form Section */}
        <div>
          <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-6 p-6'>
            {/* Category Name */}
            <Controller
              name='category'
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <CustomTextField
                  {...field}
                  fullWidth
                  label='Category Name'
                  placeholder='Job Performance'
                  error={!!errors.category}
                  helperText={errors.category && 'This field is required.'}
                />
              )}
            />

            {/* Description */}
            <Controller
              name='description'
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <CustomTextField
                  {...field}
                  fullWidth
                  label='Description'
                  placeholder='Enter category description'
                  error={!!errors.description}
                  helperText={errors.description && 'This field is required.'}
                />
              )}
            />

            {/* Status Dropdown */}
            <Controller
              name='status'
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <CustomTextField select fullWidth label='Select Status' {...field}>
                  <MenuItem value='Active'>Active</MenuItem>
                  <MenuItem value='Inactive'>Inactive</MenuItem>
                </CustomTextField>
              )}
            />

            {/* ✅ Action Buttons */}
            <div className='flex items-center gap-4'>
              <Button variant='contained' type='submit'>
                Submit
              </Button>
              <Button variant='tonal' color='error' onClick={handleReset}>
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </Drawer>

      {/* ✅ Snackbar for Success/Error */}
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

export default AddDepartmentDrawer



