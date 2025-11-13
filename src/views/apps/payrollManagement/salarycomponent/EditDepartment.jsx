


// // 'use client'

// // import { useEffect, useState } from 'react'

// // // MUI Imports
// // import Drawer from '@mui/material/Drawer'
// // import Typography from '@mui/material/Typography'
// // import Divider from '@mui/material/Divider'
// // import Button from '@mui/material/Button'
// // import IconButton from '@mui/material/IconButton'
// // import TextField from '@mui/material/TextField'
// // import MenuItem from '@mui/material/MenuItem'
// // import Box from '@mui/material/Box'
// // import Snackbar from '@mui/material/Snackbar'
// // import Alert from '@mui/material/Alert'
// // import { description } from 'valibot'


// // const EditDepartment = ({ open, handleClose, selectedDepartment, onSave }) => {
// //   const [formData, setFormData] = useState({
// //     _id: '',
// //     policyName: '',
// //     description: '',
// //     lateArrivalGrace: '',
// //     earlyDeparture: '',
// //     status: 'Active'
// //   })
// //   console.log("POOJA456", formData)


// //   // ✅ Snackbar state
// //   const [snackbar, setSnackbar] = useState({
// //     open: false,
// //     message: '',
// //     severity: 'success'
// //   })

// //   const handleSnackbarClose = () => {
// //     setSnackbar({ ...snackbar, open: false })
// //   }





// //   useEffect(() => {
// //     if (selectedDepartment) {


// //       setFormData({
// //         _id: selectedDepartment._id || '',
// //         policyName: selectedDepartment.policyName || '',
// //         description: selectedDepartment.description || '',
// //         lateArrivalGrace: selectedDepartment.lateArrivalGrace || '',
// //         earlyDeparture: selectedDepartment.earlyDeparture || '',
// //         status: selectedDepartment.status || 'Active'
// //       })
// //     }
// //   }, [selectedDepartment])


// //   // ✅ Handle save with snackbar feedback
// //   const handleSave = async () => {
// //     try {
// //       const res = await onSave(formData) // backend call in parent component
// //       setSnackbar({
// //         open: true,
// //         message: res?.message || 'Department updated successfully!',
// //         severity: res?.success ? 'success' : 'error'
// //       })
// //       if (res?.success) handleClose()
// //     } catch (error) {
// //       setSnackbar({
// //         open: true,
// //         message: 'Something went wrong!',
// //         severity: 'error'
// //       })
// //     }
// //   }

// //   return (
// //     <>
// //       <Drawer
// //         open={open}
// //         anchor='right'
// //         variant='temporary'
// //         onClose={handleClose}
// //         ModalProps={{ keepMounted: true }}
// //         sx={{
// //           '& .MuiDrawer-paper': { width: { xs: 320, sm: 420 } }
// //         }}
// //       >
// //         {/* ✅ Header same as AddBranchDrawer */}
// //         <div className='flex items-center justify-between plb-5 pli-6'>
// //           <Typography variant='h5' sx={{ fontWeight: 600 }}>
// //             Edit Salary Component
// //           </Typography>
// //           <IconButton size='small' onClick={handleClose}>
// //             <i className='tabler-x text-2xl text-textPrimary' />
// //           </IconButton>
// //         </div>

// //         <Divider />

// //         {/* ✅ Form Section */}
// //         <Box sx={{ p: 6 }}>
// //           <form className='flex flex-col gap-5'>
// //             <TextField
// //               label='Component Name'
// //               fullWidth
// //               value={formData.componentName}
// //               onChange={e => setFormData({ ...formData, componentName: e.target.value })}
// //             />
// //             <TextField
// //               label='Description'
// //               fullWidth
// //               value={formData.description}
// //               onChange={e => setFormData({ ...formData, description: e.target.value })}
// //             />

// //              <TextField
// //               select
// //               label='Type'
// //               fullWidth
// //               value={formData.type}
// //               onChange={e => setFormData({ ...formData, type: e.target.value })}
// //             >
// //               <MenuItem value='Earning'>Earning</MenuItem>
// //               <MenuItem value='Deduction'>Deduction</MenuItem>
// //             </TextField>
          


// //              <TextField
// //               select
// //               label='Calculation Type'
// //               fullWidth
// //               value={formData.calculationType}
// //               onChange={e => setFormData({ ...formData, calculationType: e.target.value })}
// //             >
// //               <MenuItem value='Percentage of Basic'>Percentage of Basic</MenuItem>
// //               <MenuItem value='Fixed Amount'>Fixed Amount</MenuItem>
// //             </TextField>
// //             <TextField
// //               label='Fixed Amount'
// //               fullWidth
// //               value={formData.fixedAmount}
// //               onChange={e => setFormData({ ...formData, fixedAmount: e.target.value })}
// //             />

// //             <TextField
// //               label='Percentage of Basic'
// //               fullWidth
// //               value={formData.percentageOfBasic}
// //               onChange={e => setFormData({ ...formData, percentageOfBasic: e.target.value })}
// //             />
       

// //        <TextField
// //         label='Percentage of Basic'
// //         fullWidth
// //         value={formData.percentageOfBasic || ''}
// //         onChange={e => setFormData({ ...formData, percentageOfBasic: e.target.value })}
// //       />

// //       {/* 🔹 Is Taxable Checkbox */}
// //       <Controller
// //         name='isTaxable'
// //         control={control}
// //         defaultValue={formData.isTaxable === 'Yes'} // ✅ checked if Yes
// //         render={({ field }) => (
// //           <FormControlLabel
// //             label='Is Taxable'
// //             control={
// //               <Checkbox
// //                 checked={field.value} // boolean true/false
// //                 onChange={e => {
// //                   const checked = e.target.checked
// //                   field.onChange(checked)
// //                   // ✅ Convert boolean to "Yes" / "No" for backend
// //                   setFormData({
// //                     ...formData,
// //                     isTaxable: checked ? 'Yes' : 'No'
// //                   })
// //                 }}
// //               />
// //             }
// //           />
// //         )}
// //       />

// //             <TextField
// //               select
// //               label='Status'
// //               fullWidth
// //               value={formData.status}
// //               onChange={e => setFormData({ ...formData, status: e.target.value })}
// //             >
// //               <MenuItem value='Active'>Active</MenuItem>
// //               <MenuItem value='Inactive'>Inactive</MenuItem>
// //             </TextField>

// //             {/* ✅ Action Buttons same style as Add Drawer */}
// //             <div className='flex items-center gap-4 mt-4'>
// //               <Button variant='contained' onClick={handleSave}>
// //                 Save Changes
// //               </Button>
// //               <Button variant='tonal' color='error' onClick={handleClose}>
// //                 Cancel
// //               </Button>
// //             </div>
// //           </form>
// //         </Box>
// //       </Drawer>

// //       {/* ✅ Snackbar for backend message */}
// //       <Snackbar
// //         open={snackbar.open}
// //         autoHideDuration={3000}
// //         onClose={handleSnackbarClose}
// //         anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
// //       >
// //         <Alert
// //           onClose={handleSnackbarClose}
// //           severity={snackbar.severity}
// //           variant='filled'
// //           sx={{
// //             backgroundColor: snackbar.severity === 'success' ? '#2B3380' : '#d32f2f',
// //             color: 'white',
// //             fontWeight: 500
// //           }}
// //         >
// //           {snackbar.message}
// //         </Alert>
// //       </Snackbar>
// //     </>
// //   )
// // }

// // export default EditDepartment

// 'use client'

// import { useEffect, useState } from 'react'

// // ✅ Import from react-hook-form
// import { useForm, Controller } from 'react-hook-form'

// // ✅ MUI Imports
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
// import Checkbox from '@mui/material/Checkbox'
// import FormControlLabel from '@mui/material/FormControlLabel'

// const EditDepartment = ({ open, handleClose, selectedDepartment, onSave }) => {
//   const [formData, setFormData] = useState({
//     _id: '',
//     componentName: '',
//     description: '',
//     type: '',
//     calculationType: '',
//     fixedAmount: '',
//     percentageOfBasic: '',
//     isTaxable: 'No',
//     status: 'Active'
//   })

//   // ✅ Initialize react-hook-form
//   const { control, reset } = useForm({
//     defaultValues: {
//       isTaxable: false
//     }
//   })

//   // ✅ Snackbar state
//   const [snackbar, setSnackbar] = useState({
//     open: false,
//     message: '',
//     severity: 'success'
//   })

//   const handleSnackbarClose = () => {
//     setSnackbar({ ...snackbar, open: false })
//   }

//   // ✅ Populate form when editing
//   useEffect(() => {
//     if (selectedDepartment) {
//       setFormData({
//         _id: selectedDepartment._id || '',
//         componentName: selectedDepartment.componentName || '',
//         description: selectedDepartment.description || '',
//         type: selectedDepartment.type || '',
//         calculationType: selectedDepartment.calculationType || '',
//         fixedAmount: selectedDepartment.fixedAmount || '',
//         percentageOfBasic: selectedDepartment.percentageOfBasic || '',
//         isTaxable: selectedDepartment.isTaxable || 'No',
//         status: selectedDepartment.status || 'Active'
//       })

//       // ✅ Sync checkbox state for react-hook-form
//       reset({
//         isTaxable: selectedDepartment.isTaxable === 'Yes'
//       })
//     }
//   }, [selectedDepartment, reset])

//   // ✅ Handle Save
//   const handleSave = async () => {
//     try {
//       const res = await onSave(formData)
//       setSnackbar({
//         open: true,
//         message: res?.message || 'Salary component updated successfully!',
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
//         {/* ✅ Header */}
//         <div className='flex items-center justify-between plb-5 pli-6'>
//           <Typography variant='h5' sx={{ fontWeight: 600 }}>
//             Edit Salary Component
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
//               label='Component Name'
//               fullWidth
//               value={formData.componentName}
//               onChange={e => setFormData({ ...formData, componentName: e.target.value })}
//             />

//             <TextField
//               label='Description'
//               fullWidth
//               value={formData.description}
//               onChange={e => setFormData({ ...formData, description: e.target.value })}
//             />

//             <TextField
//               select
//               label='Type'
//               fullWidth
//               value={formData.type}
//               onChange={e => setFormData({ ...formData, type: e.target.value })}
//             >
//               <MenuItem value='Earning'>Earning</MenuItem>
//               <MenuItem value='Deduction'>Deduction</MenuItem>
//             </TextField>

//             <TextField
//               select
//               label='Calculation Type'
//               fullWidth
//               value={formData.calculationType}
//               onChange={e => setFormData({ ...formData, calculationType: e.target.value })}
//             >
//               <MenuItem value='Percentage of Basic'>Percentage of Basic</MenuItem>
//               <MenuItem value='Fixed Amount'>Fixed Amount</MenuItem>
//             </TextField>

//             <TextField
//               label='Fixed Amount'
//               fullWidth
//               value={formData.fixedAmount}
//               onChange={e => setFormData({ ...formData, fixedAmount: e.target.value })}
//             />

//             <TextField
//               label='Percentage of Basic'
//               fullWidth
//               value={formData.percentageOfBasic || ''}
//               onChange={e => setFormData({ ...formData, percentageOfBasic: e.target.value })}
//             />

//             {/* ✅ Is Taxable Checkbox */}
//             <Controller
//               name='isTaxable'
//               control={control}
//               defaultValue={formData.isTaxable === 'Yes'}
//               render={({ field }) => (
//                 <FormControlLabel
//                   label='Is Taxable'
//                   control={
//                     <Checkbox
//                       checked={field.value}
//                       onChange={e => {
//                         const checked = e.target.checked
//                         field.onChange(checked)
//                         setFormData({
//                           ...formData,
//                           isTaxable: checked ? 'Yes' : 'No'
//                         })
//                       }}
//                     />
//                   }
//                 />
//               )}
//             />

//                <Controller
//               name='isMandatory'
//               control={control}
//               defaultValue={formData.isMandatory === 'Yes'}
//               render={({ field }) => (
//                 <FormControlLabel
//                   label='Is Manadatory'
//                   control={
//                     <Checkbox
//                       checked={field.value}
//                       onChange={e => {
//                         const checked = e.target.checked
//                         field.onChange(checked)
//                         setFormData({
//                           ...formData,
//                           isMandatory: checked ? 'Yes' : 'No'
//                         })
//                       }}
//                     />
//                   }
//                 />
//               )}
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

//             {/* ✅ Action Buttons */}
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

//       {/* ✅ Snackbar */}
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

// ✅ Import from react-hook-form
import { useForm, Controller } from 'react-hook-form'

// ✅ MUI Imports
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
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'

const EditDepartment = ({ open, handleClose, selectedDepartment, onSave }) => {
  const [formData, setFormData] = useState({
    _id: '',
    componentName: '',
    description: '',
    type: '',
    calculationType: '',
    fixedAmount: '',
    percentageOfBasic: '',
    isTaxable: 'No',
    isMandatory: 'No', // ✅ added
    status: 'Active'
  })

  // ✅ Initialize react-hook-form
  const { control, reset } = useForm({
    defaultValues: {
      isTaxable: false,
      isMandatory: false
    }
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

  // ✅ Populate form when editing
  useEffect(() => {
    if (selectedDepartment) {
      setFormData({
        _id: selectedDepartment._id || '',
        componentName: selectedDepartment.componentName || '',
        description: selectedDepartment.description || '',
        type: selectedDepartment.type || '',
        calculationType: selectedDepartment.calculationType || '',
        fixedAmount: selectedDepartment.fixedAmount || '',
        percentageOfBasic: selectedDepartment.percentageOfBasic || '',
        isTaxable: selectedDepartment.isTaxable || 'No',
        isMandatory: selectedDepartment.isMandatory || 'No',
        status: selectedDepartment.status || 'Active'
      })

      // ✅ Sync checkbox state for react-hook-form
      reset({
        isTaxable: selectedDepartment.isTaxable === 'Yes',
        isMandatory: selectedDepartment.isMandatory === 'Yes'
      })
    }
  }, [selectedDepartment, reset])

  // ✅ Handle Save
  const handleSave = async () => {
    try {
      const res = await onSave(formData)
      setSnackbar({
        open: true,
        message: res?.message || 'Salary component updated successfully!',
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
        {/* ✅ Header */}
        <div className='flex items-center justify-between plb-5 pli-6'>
          <Typography variant='h5' sx={{ fontWeight: 600 }}>
            Edit Salary Component
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
              label='Component Name'
              fullWidth
              value={formData.componentName}
              onChange={e => setFormData({ ...formData, componentName: e.target.value })}
            />

            <TextField
              label='Description'
              fullWidth
              value={formData.description}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
            />

            <TextField
              select
              label='Type'
              fullWidth
              value={formData.type}
              onChange={e => setFormData({ ...formData, type: e.target.value })}
            >
              <MenuItem value='Earning'>Earning</MenuItem>
              <MenuItem value='Deduction'>Deduction</MenuItem>
            </TextField>

            <TextField
              select
              label='Calculation Type'
              fullWidth
              value={formData.calculationType}
              onChange={e => setFormData({ ...formData, calculationType: e.target.value })}
            >
              <MenuItem value='Percentage of Basic'>Percentage of Basic</MenuItem>
              <MenuItem value='Percentage of Gross'>Percentage of Gross</MenuItem>
             <MenuItem value='Fixed Amount'>Fixed Amount</MenuItem>
            </TextField>

            <TextField
              label='Fixed Amount'
              fullWidth
              value={formData.fixedAmount}
              onChange={e => setFormData({ ...formData, fixedAmount: e.target.value })}
            />

            <TextField
              label='Percentage of Basic/Gross'
              fullWidth
              value={formData.percentageOfBasic || ''}
              onChange={e => setFormData({ ...formData, percentageOfBasic: e.target.value })}
            />

            {/* ✅ Is Taxable Checkbox */}
            <Controller
              name='isTaxable'
              control={control}
              defaultValue={formData.isTaxable === 'Yes'}
              render={({ field }) => (
                <FormControlLabel
                  label='Is Taxable'
                  control={
                    <Checkbox
                      checked={field.value}
                      onChange={e => {
                        const checked = e.target.checked
                        field.onChange(checked)
                        setFormData({
                          ...formData,
                          isTaxable: checked ? 'Yes' : 'No'
                        })
                      }}
                    />
                  }
                />
              )}
            />

            {/* ✅ Is Mandatory Checkbox */}
            <Controller
              name='isMandatory'
              control={control}
              defaultValue={formData.isMandatory === 'Yes'}
              render={({ field }) => (
                <FormControlLabel
                  label='Is Mandatory'
                  control={
                    <Checkbox
                      checked={field.value}
                      onChange={e => {
                        const checked = e.target.checked
                        field.onChange(checked)
                        setFormData({
                          ...formData,
                          isMandatory: checked ? 'Yes' : 'No'
                        })
                      }}
                    />
                  }
                />
              )}
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

            {/* ✅ Action Buttons */}
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

export default EditDepartment



