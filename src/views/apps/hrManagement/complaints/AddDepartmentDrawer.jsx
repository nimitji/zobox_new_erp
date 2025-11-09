

// 'use client'

// import { useState, useEffect } from 'react'

// // 📦 MUI Imports
// import {
//   Button,
//   Drawer,
//   IconButton,
//   MenuItem,
//   Typography,
//   Divider,
//   Snackbar,
//   Alert as MuiAlert,
//    Checkbox,
//   FormControlLabel
// } from '@mui/material'

// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
// import { DatePicker } from '@mui/x-date-pickers/DatePicker'
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
// import dayjs from 'dayjs'

// // 🧩 Third-party Imports
// import { useForm, Controller } from 'react-hook-form'
// import FileUploadController from '../../../../components/fileUploadController'

// // 🧠 Server Action
// import { createComplaint, fetchListOfUser, fetchListOfAwardTypes } from '../../../../app/server/actions.js'

// // 🧱 Component Imports
// import CustomTextField from '@core/components/mui/TextField'

// const AddDepartmentDrawer = props => {
//   const { open, handleClose, refreshDepartments } = props

//   const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' })
//   const [branches, setBranches] = useState([])

//   // 🔧 react-hook-form setup
//   const {
//     control,
//     reset,
//     handleSubmit,
//     formState: { errors }
//   } = useForm({
//     defaultValues: {
//       employee: '',
//       warningBy: '',
//       warningType: '',
//       subject: '',
//       severity: '',
//       warningDate: '',
//       expiryDate: '',
//       description: '',
//       document: null,
//       improvementPlan: '',
//       improvementGoals: '',
//       improvementStartDate: '',
//       improvementEndDate: ''
//     }
//   })

//   // 🧠 Fetch Employee list
//   useEffect(() => {
//     const loadEmployees = async () => {
//       try {
//         const res = await fetchListOfUser()
//         if (res?.success && Array.isArray(res.data)) setBranches(res.data)
//         else if (Array.isArray(res)) setBranches(res)
//       } catch (err) {
//         console.error('Error fetching employees:', err)
//       }
//     }
//     loadEmployees()
//   }, [])

//   // ✅ Submit Form
//   const onSubmit = async data => {
//     try {
//       const formData = new FormData()
//       Object.entries(data).forEach(([key, value]) => {
//         if (value !== null && value !== undefined) formData.append(key, value)
//       })

//       const response = await createComplaint(formData)

//       if (response?.success) {
//         setSnackbar({
//           open: true,
//           message: response.message || 'Warning created successfully',
//           severity: 'success'
//         })
//         if (typeof refreshDepartments === 'function') await refreshDepartments()
//         handleClose()
//         reset()
//       } else {
//         setSnackbar({
//           open: true,
//           message: response.message || 'Failed to create warning',
//           severity: 'error'
//         })
//       }
//     } catch (error) {
//       console.error('Error creating warning:', error)
//       setSnackbar({
//         open: true,
//         message: 'Error creating warning',
//         severity: 'error'
//       })
//     }
//   }

//   const handleReset = () => {
//     handleClose()
//     reset()
//   }

//   return (
//     <>
//       <Drawer
//         open={open}
//         anchor='right'
//         variant='temporary'
//         onClose={handleReset}
//         ModalProps={{ keepMounted: true }}
//         sx={{ '& .MuiDrawer-paper': { width: { xs: 320, sm: 420 } } }}
//       >
//         <div className='flex items-center justify-between p-5'>
//           <Typography variant='h5' fontWeight='bold'>
//             Add New Complaint
//           </Typography>
//           <IconButton size='small' onClick={handleReset}>
//             <i className='tabler-x text-2xl text-textPrimary' />
//           </IconButton>
//         </div>
//         <Divider />

//         {/* 🧾 Form */}
//         <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-6 p-6'>
//           {/* 🧑 Employee */}
//           <Controller
//             name='complainant'
//             control={control}
//             rules={{ required: 'Employee is required' }}
//             render={({ field }) => (
//               <CustomTextField
//                 select
//                 fullWidth
//                 label='Complainant'
//                 {...field}
//                 error={!!errors.complainant}
//                 helperText={errors.complainant?.message}
//               >
//                 {branches.length > 0 ? (
//                   branches.map(emp => (
//                     <MenuItem key={emp._id} value={emp._id}>
//                       {emp.username}
//                     </MenuItem>
//                   ))
//                 ) : (
//                   <MenuItem disabled>No Employees found</MenuItem>
//                 )}
//               </CustomTextField>
//             )}
//           />

//                {/* 🧑 Employee */}
//           <Controller
//             name='against'
//             control={control}
//             rules={{ required: 'Employee is required' }}
//             render={({ field }) => (
//               <CustomTextField
//                 select
//                 fullWidth
//                 label='Against'
//                 {...field}
//                 error={!!errors.against}
//                 helperText={errors.employee?.against}
//               >
//                 {branches.length > 0 ? (
//                   branches.map(emp => (
//                     <MenuItem key={emp._id} value={emp._id}>
//                       {emp.username}
//                     </MenuItem>
//                   ))
//                 ) : (
//                   <MenuItem disabled>No Employees found</MenuItem>
//                 )}
//               </CustomTextField>
//             )}
//           />


//                     {/* ⚠️ Warning Type */}
//                     <Controller
//                       name='complaintType'
//                       control={control}
//                       rules={{ required: 'Complanint Type is required' }}
//                       render={({ field }) => (
//                         <CustomTextField select fullWidth label='Complaint Type' {...field}>
//                           <MenuItem value='Harassment'>Harassment</MenuItem>
//                           <MenuItem value='Discrimination'>Discrimination</MenuItem>
//                           <MenuItem value='Workplace Conditions'>Workplace Conditions</MenuItem>
//                           <MenuItem value='Bullying'>Bullying</MenuItem>
//                           <MenuItem value='Unfair Treatment'>Unfair Treatment</MenuItem>
//                           <MenuItem value='Compensation Issues'>Compensation Issues</MenuItem>
//                           <MenuItem value='Work Schedule'>Work Schedule</MenuItem>
//                           <MenuItem value='Safety Concerns'>Safety Concerns</MenuItem>
//                           <MenuItem value='Ethics Voilation'>Ethics Voilation</MenuItem>
//                           <MenuItem value='Management Issues'>Management Issues</MenuItem>
//                         </CustomTextField>
//                       )}
//                     />

//                <Controller
//             name='subject'
//             control={control}
//             rules={{ required: 'Subject is required' }}
//             render={({ field }) => (
//               <CustomTextField
//                 {...field}
//                 fullWidth
//                 label='Subject'
//                 error={!!errors.subject}
//                 helperText={errors.subject?.message}
//               />
//             )}
//           />


        


//              {/* 📅 Warning Date */}
//           <LocalizationProvider dateAdapter={AdapterDayjs}>
//             <Controller
//               name='complaintDate'
//               control={control}
//               render={({ field }) => (
//                 <DatePicker
//                   label='Complaint Date'
//                   value={field.value ? dayjs(field.value) : null}
//                   onChange={newValue => field.onChange(newValue ? newValue.toISOString() : null)}
//                   enableAccessibleFieldDOMStructure={false}
//                   slots={{ textField: CustomTextField }}
//                   slotProps={{
//                     textField: {
//                       fullWidth: true,
//                       error: !!errors.complaintDate,
//                       helperText: errors.complaintDate?.message
//                     }
//                   }}
//                 />
//               )}
//             />
//           </LocalizationProvider>

      

//                 {/* 🗒️ Description */}
//           <Controller
//             name='description'
//             control={control}
//             rules={{ required: 'Description is required' }}
//             render={({ field }) => (
//               <CustomTextField
//                 {...field}
//                 fullWidth
//                 multiline
//                 minRows={2}
//                 label='Description'
//                 error={!!errors.description}
//                 helperText={errors.description?.message}
//               />
//             )}
//           />

       



  

       

    

//           {/* 📎 Document Upload */}
//           <FileUploadController
//             control={control}
//             errors={errors}
//             name='document'
//             label='Documents'
//             required
//             accept='image/*'
//           />

//           {/* 💡 Improvement Plan */}
//      <Controller
//   name="submitAnonymously"
//   control={control}
//   defaultValue={false} // ✅ start with false
//   render={({ field }) => (
//     <FormControlLabel
//       label="Submit Anonymously"
//       control={
//         <Checkbox
//           checked={!!field.value} // ✅ ensure boolean
//           onChange={(e) => field.onChange(e.target.checked)} // ✅ sends true/false
//         />
//       }
//     />
//   )}
// />



        


//           {/* ✅ Buttons */}
//           <div className='flex items-center gap-4'>
//             <Button variant='contained' type='submit'>
//               Submit
//             </Button>
//             <Button variant='tonal' color='error' onClick={handleReset}>
//               Cancel
//             </Button>
//           </div>
//         </form>
//       </Drawer>

//       {/* ✅ Snackbar */}
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

import { useState, useEffect } from 'react'

// 📦 MUI Imports
import {
  Button,
  Drawer,
  IconButton,
  MenuItem,
  Typography,
  Divider,
  Snackbar,
  Alert as MuiAlert,
  Checkbox,
  FormControlLabel
} from '@mui/material'

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'

// 🧩 Third-party Imports
import { useForm, Controller } from 'react-hook-form'
import FileUploadController from '../../../../components/fileUploadController'

// 🧠 Server Action
import { createComplaint, fetchListOfUser } from '../../../../app/server/actions.js'

// 🧱 Component Imports
import CustomTextField from '@core/components/mui/TextField'

const AddDepartmentDrawer = props => {
  const { open, handleClose, refreshDepartments } = props

  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' })
  const [branches, setBranches] = useState([])

  // 🔧 react-hook-form setup
  const {
    control,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      complainant: '',
      against: '',
      complaintType: '',
      subject: '',
      complaintDate: '',
      description: '',
      document: null,
      submitAnonymously: false
    }
  })

  // 🧠 Fetch Employee list
  useEffect(() => {
    const loadEmployees = async () => {
      try {
        const res = await fetchListOfUser()
        if (res?.success && Array.isArray(res.data)) setBranches(res.data)
        else if (Array.isArray(res)) setBranches(res)
      } catch (err) {
        console.error('Error fetching employees:', err)
      }
    }
    loadEmployees()
  }, [])

  // ✅ Submit Form
  const onSubmit = async data => {
    try {
      const formData = new FormData()

      // 👇 Append all fields directly from form, same names as used in form
      formData.append('complainant', data.complainant)
      formData.append('against', data.against)
      formData.append('complaintType', data.complaintType)
      formData.append('subject', data.subject)
      formData.append('complaintDate', data.complaintDate)
      formData.append('description', data.description)
      formData.append('submitAnonymously', data.submitAnonymously ? 'true' : 'false')

      if (data.document) {
        formData.append('document', data.document)
      }

      // 📨 Send to backend
      const response = await createComplaint(formData)

      if (response?.success) {
        setSnackbar({
          open: true,
          message: response.message || 'Complaint created successfully',
          severity: 'success'
        })
        if (typeof refreshDepartments === 'function') await refreshDepartments()
        handleClose()
        reset()
      } else {
        setSnackbar({
          open: true,
          message: response.message || 'Failed to create complaint',
          severity: 'error'
        })
      }
    } catch (error) {
      console.error('Error creating complaint:', error)
      setSnackbar({
        open: true,
        message: 'Error creating complaint',
        severity: 'error'
      })
    }
  }

  const handleReset = () => {
    handleClose()
    reset()
  }

  return (
    <>
      <Drawer
        open={open}
        anchor='right'
        variant='temporary'
        onClose={handleReset}
        ModalProps={{ keepMounted: true }}
        sx={{ '& .MuiDrawer-paper': { width: { xs: 320, sm: 420 } } }}
      >
        <div className='flex items-center justify-between p-5'>
          <Typography variant='h5' fontWeight='bold'>
            Add New Complaint
          </Typography>
          <IconButton size='small' onClick={handleReset}>
            <i className='tabler-x text-2xl text-textPrimary' />
          </IconButton>
        </div>
        <Divider />

        {/* 🧾 Form */}
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-6 p-6'>
          {/* 👤 Complainant */}
          <Controller
            name='complainant'
            control={control}
            rules={{ required: 'Complainant is required' }}
            render={({ field }) => (
              <CustomTextField
                select
                fullWidth
                label='Complainant'
                {...field}
                error={!!errors.complainant}
                helperText={errors.complainant?.message}
              >
                {branches.length > 0 ? (
                  branches.map(emp => (
                    <MenuItem key={emp._id} value={emp._id}>
                      {emp.username}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem disabled>No Employees found</MenuItem>
                )}
              </CustomTextField>
            )}
          />

          {/* 🧑‍💼 Against */}
          <Controller
            name='against'
            control={control}
            rules={{ required: 'Against field is required' }}
            render={({ field }) => (
              <CustomTextField
                select
                fullWidth
                label='Against'
                {...field}
                error={!!errors.against}
                helperText={errors.against?.message}
              >
                {branches.length > 0 ? (
                  branches.map(emp => (
                    <MenuItem key={emp._id} value={emp._id}>
                      {emp.username}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem disabled>No Employees found</MenuItem>
                )}
              </CustomTextField>
            )}
          />

          {/* ⚠️ Complaint Type */}
          <Controller
            name='complaintType'
            control={control}
            rules={{ required: 'Complaint Type is required' }}
            render={({ field }) => (
              <CustomTextField select fullWidth label='Complaint Type' {...field}>
                <MenuItem value='Harassment'>Harassment</MenuItem>
                <MenuItem value='Discrimination'>Discrimination</MenuItem>
                <MenuItem value='Workplace Conditions'>Workplace Conditions</MenuItem>
                <MenuItem value='Bullying'>Bullying</MenuItem>
                <MenuItem value='Unfair Treatment'>Unfair Treatment</MenuItem>
                <MenuItem value='Compensation Issues'>Compensation Issues</MenuItem>
                <MenuItem value='Work Schedule'>Work Schedule</MenuItem>
                <MenuItem value='Safety Concerns'>Safety Concerns</MenuItem>
                <MenuItem value='Ethics Voilation'>Ethics Violation</MenuItem>
                <MenuItem value='Management Issues'>Management Issues</MenuItem>
              </CustomTextField>
            )}
          />

          {/* 📝 Subject */}
          <Controller
            name='subject'
            control={control}
            rules={{ required: 'Subject is required' }}
            render={({ field }) => (
              <CustomTextField
                {...field}
                fullWidth
                label='Subject'
                error={!!errors.subject}
                helperText={errors.subject?.message}
              />
            )}
          />

          {/* 📅 Complaint Date */}
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Controller
              name='complaintDate'
              control={control}
              render={({ field }) => (
                <DatePicker
                  label='Complaint Date'
                  value={field.value ? dayjs(field.value) : null}
                  onChange={newValue =>
                    field.onChange(newValue ? newValue.toISOString() : null)
                  }
                  enableAccessibleFieldDOMStructure={false}
                  slots={{ textField: CustomTextField }}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      error: !!errors.complaintDate,
                      helperText: errors.complaintDate?.message
                    }
                  }}
                />
              )}
            />
          </LocalizationProvider>

          {/* 🗒️ Description */}
          <Controller
            name='description'
            control={control}
            rules={{ required: 'Description is required' }}
            render={({ field }) => (
              <CustomTextField
                {...field}
                fullWidth
                multiline
                minRows={2}
                label='Description'
                error={!!errors.description}
                helperText={errors.description?.message}
              />
            )}
          />

          {/* 📎 Document Upload */}
          <FileUploadController
            control={control}
            errors={errors}
            name='document'
            label='Documents'
            required
            accept='image/*'
          />

          {/* ✅ Submit Anonymously */}
          <Controller
            name='submitAnonymously'
            control={control}
            defaultValue={false}
            render={({ field }) => (
              <FormControlLabel
                label='Submit Anonymously'
                control={
                  <Checkbox
                    checked={!!field.value}
                    onChange={e => field.onChange(e.target.checked)}
                  />
                }
              />
            )}
          />

          {/* ✅ Buttons */}
          <div className='flex items-center gap-4'>
            <Button variant='contained' type='submit'>
              Submit
            </Button>
            <Button variant='tonal' color='error' onClick={handleReset}>
              Cancel
            </Button>
          </div>
        </form>
      </Drawer>

      {/* ✅ Snackbar */}
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



