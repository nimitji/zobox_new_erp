

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
// import { createDepartment } from '../../../../../app/server/actions.js'

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
 
//   // 🔧 react-hook-form setup
//   const {
//     control,
//     reset: resetForm,
//     handleSubmit,
//     formState: { errors }
//   } = useForm({
//     defaultValues: {
//       reviewCycleName: '',
//       frequency:'',
//       description: '',
//       status: 'Active'
//     }
//   })

//   // 🧠 Fetch Branch List from backend


//   // ✅ Form submit
//   const onSubmit = async data => {
//     try {
//       const payload = {
//         reviewCycleName: data.reviewCycleName,
//         frequency:data.frequency,
//         description: data.description,
//         status: data.status
//       }

//       const response = await createReviewCycle(payload)

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
//           <Typography variant='h5'>Add New Review Cycle</Typography>
//           <IconButton size='small' onClick={handleReset}>
//             <i className='tabler-x text-2xl text-textPrimary' />
//           </IconButton>
//         </div>
//         <Divider />

//         {/* 🧾 Form Section */}
//         <div>
//           <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-6 p-6'>
//             <Controller
//               name='reviewCycleName'
//               control={control}
//               rules={{ required: true }}
//               render={({ field }) => (
//                 <CustomTextField
//                   {...field}
//                   fullWidth
//                   label='Review Cycle Name'
//                   placeholder='Monthly Performance Review'
//                   error={!!errors.reviewCycleName}
//                   helperText={errors.reviewCycleName && 'This field is required.'}
//                 />
//               )}
//             />

//             {/* //Dynamic dropdown  */}
//              <Controller
//               name='frequency'
//               control={control}
//               rules={{ required: true }}
//               render={({ field }) => (
//                 <CustomTextField select fullWidth label='Select Frequency' {...field}>
//                   <MenuItem value='Monthly'>Monthly</MenuItem>
//                   <MenuItem value='Quartely'>Quartely</MenuItem>
//                    <MenuItem value='Semi-Annual'>Semi-Annual</MenuItem>
//                     <MenuItem value='Annual'>Annual</MenuItem>
//                      <MenuItem value='One-Time'>One-Time</MenuItem>
//                 </CustomTextField>
//               )}
//             />
          

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

// 🧠 Server Action
import { createReviewCycle } from '../../../../../app/server/actions.js'

// 🧱 Component Imports
import CustomTextField from '@core/components/mui/TextField'

const initialData = {
  country: '',
  contact: ''
}

const AddDepartmentDrawer = props => {
  const { open, handleClose, refreshDepartments } = props

  const [formData, setFormData] = useState(initialData)
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' })

  // 🔧 react-hook-form setup
  const {
    control,
    reset: resetForm,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      reviewCycleName: '',
      frequency: '',
      description: '',
      status: 'Active'
    }
  })

  // ✅ Form submit
  const onSubmit = async data => {
    try {
      const payload = {
        reviewCycleName: data.reviewCycleName,
        frequency: data.frequency,
        description: data.description,
        status: data.status
      }

      const response = await createReviewCycle(payload)

      if (response?.success) {
        setSnackbar({
          open: true,
          message: response.message || 'Review Cycle created successfully',
          severity: 'success'
        })

        if (typeof refreshDepartments === 'function') {
          await refreshDepartments()
        }

        handleClose()
        setFormData(initialData)
        resetForm({
          reviewCycleName: '',
          frequency: '',
          description: '',
          status: 'Active'
        })
      } else {
        setSnackbar({
          open: true,
          message: response.message || 'Failed to create Review Cycle',
          severity: 'error'
        })
      }
    } catch (error) {
      console.error('Error creating review cycle:', error)
      setSnackbar({
        open: true,
        message: 'Error creating review cycle',
        severity: 'error'
      })
    }
  }

  const handleReset = () => {
    handleClose()
    setFormData(initialData)
    resetForm({
      reviewCycleName: '',
      frequency: '',
      description: '',
      status: 'Active'
    })
  }

  return (
    <>
      <Drawer
        open={open}
        anchor='right'
        variant='temporary'
        onClose={handleReset}
        ModalProps={{ keepMounted: true }}
        sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 400 } } }}
      >
        <div className='flex items-center justify-between plb-5 pli-6'>
          <Typography variant='h5'>Add New Review Cycle</Typography>
          <IconButton size='small' onClick={handleReset}>
            <i className='tabler-x text-2xl text-textPrimary' />
          </IconButton>
        </div>
        <Divider />

        {/* 🧾 Form Section */}
        <div>
          <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-6 p-6'>
            {/* Review Cycle Name */}
            <Controller
              name='reviewCycleName'
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <CustomTextField
                  {...field}
                  value={field.value || ''} // ✅ Always controlled
                  fullWidth
                  label='Review Cycle Name'
                  placeholder='Monthly Performance Review'
                  error={!!errors.reviewCycleName}
                  helperText={errors.reviewCycleName && 'This field is required.'}
                />
              )}
            />

            {/* Frequency Dropdown */}
            <Controller
              name='frequency'
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <CustomTextField
                  select
                  fullWidth
                  label='Select Frequency'
                  {...field}
                  value={field.value || ''} // ✅ Fix uncontrolled input
                  error={!!errors.frequency}
                  helperText={errors.frequency && 'This field is required.'}
                >
                  <MenuItem value='Monthly'>Monthly</MenuItem>
                  <MenuItem value='Quarterly'>Quarterly</MenuItem>
                  <MenuItem value='Semi-Annual'>Semi-Annual</MenuItem>
                  <MenuItem value='Annual'>Annual</MenuItem>
                  <MenuItem value='One-Time'>One-Time</MenuItem>
                </CustomTextField>
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
                  value={field.value || ''} // ✅ Prevent undefined
                  fullWidth
                  label='Description'
                  placeholder='Enter description'
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
                <CustomTextField
                  select
                  fullWidth
                  label='Select Status'
                  {...field}
                  value={field.value || ''} // ✅ Prevent uncontrolled
                  error={!!errors.status}
                  helperText={errors.status && 'This field is required.'}
                >
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


