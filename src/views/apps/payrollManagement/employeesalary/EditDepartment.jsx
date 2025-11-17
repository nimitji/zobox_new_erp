


// // 'use client'

// // import { useEffect, useState } from 'react'
// // import {
// //   Drawer, Typography, Divider, Button, IconButton, Grid, MenuItem,
// //   Box, Snackbar, Alert, Chip
// // } from '@mui/material'
// // import TextField from '@mui/material/TextField'
// // import { useSession } from 'next-auth/react'

// // import {
// //   fetchListOfUser,
// //   fetchListOfSalaryComponent
// // } from '../../../../app/server/actions'

// // const EditDepartment = ({ open, handleClose, selectedDepartment, onSave }) => {
// //   const { data: session } = useSession()
// //   const token = session?.user?.accessToken

// //   const [employees, setEmployees] = useState([])
// //   const [salaryComponentsList, setSalaryComponentsList] = useState([])
// //   const [loadingComponents, setLoadingComponents] = useState(true)

// //   const [formData, setFormData] = useState({
// //     _id: '',
// //     employee: '',
// //     annualSalary: '',
// //     grossSalary: '',
// //     basicSalary: '',
// //     fixedSalary: '',
// //     salaryComponents: [],
// //     status: '',
// //     notes: ''
// //   })

// //   const [snackbar, setSnackbar] = useState({
// //     open: false,
// //     message: '',
// //     severity: 'success'
// //   })

// //   const handleSnackbarClose = () =>
// //     setSnackbar(prev => ({ ...prev, open: false }))

// //   // Fetch employees
// //   useEffect(() => {
// //     const loadEmployees = async () => {
// //       try {
// //         const res = await fetchListOfUser()
// //         setEmployees(res?.data || res || [])
// //       } catch (err) {
// //         console.error('Error fetching employees:', err)
// //       }
// //     }
// //     loadEmployees()
// //   }, [])

// //   // Fetch salary components
// //   useEffect(() => {
// //     const loadComponents = async () => {
// //       try {
// //         const list = await fetchListOfSalaryComponent()
// //         setSalaryComponentsList(list)
// //       } catch (err) {
// //         console.error('Error fetching salary components:', err)
// //       } finally {
// //         setLoadingComponents(false)
// //       }
// //     }
// //     loadComponents()
// //   }, [])

// //   // Load selected data into form
// //   useEffect(() => {
// //     if (selectedDepartment) {
// //       setFormData({
// //         _id: selectedDepartment._id || '',
// //         employee: selectedDepartment.employeeId || '',
// //         annualSalary: selectedDepartment.annualSalary || '',
// //         grossSalary: selectedDepartment.grossSalary || '',
// //         basicSalary: selectedDepartment.basicSalary || '',
// //         fixedSalary: selectedDepartment.fixedSalary || '',
// //         salaryComponents: selectedDepartment.salaryComponents?.map(c => c._id) || [],
// //         status: selectedDepartment.status || '',
// //         notes: selectedDepartment.notes || ''
// //       })
// //     }
// //   }, [selectedDepartment])

// //   // SAVE handler
// //   const handleSave = async () => {
// //     try {
// //       const payload = {
// //         ...formData,
// //         employee: formData.employee,
// //         salaryComponents: formData.salaryComponents
// //       }

// //       // 🔥 This MUST return {success, message}
// //       const response = await onSave(payload)
// //   console.log("DATApooja",response)
// //       setSnackbar({
// //         open: true,
// //         message: response?.message || 'Updated successfully!',
// //         severity: response?.success ? 'success' : 'error'
// //       })

// //       if (response?.success) {
// //         handleClose()
// //       }
// //     } catch (err) {
// //       console.error(err)
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
// //         anchor="right"
// //         onClose={handleClose}
// //         variant="temporary"
// //         ModalProps={{ keepMounted: true }}
// //         sx={{ '& .MuiDrawer-paper': { width: { xs: 320, sm: 420 } } }}
// //       >
// //         {/* HEADER */}
// //         <div className="flex items-center justify-between p-5">
// //           <Typography variant="h5" fontWeight={600}>
// //             Edit Employee Salary
// //           </Typography>
// //           <IconButton onClick={handleClose}>
// //             <i className="tabler-x text-2xl" />
// //           </IconButton>
// //         </div>

// //         <Divider />

// //         {/* FORM */}
// //         <Box sx={{ p: 5 }}>
// //           <Grid container spacing={4}>

// //             {/* EMPLOYEE */}
// //             <Grid item xs={12}>
// //               <TextField
// //                 select
// //                 fullWidth
// //                 label="Employee"
// //                 value={formData.employee}
// //                 onChange={e =>
// //                   setFormData({ ...formData, employee: e.target.value })
// //                 }
// //               >
// //                 {employees.map(emp => (
// //                   <MenuItem key={emp._id} value={emp._id}>
// //                     {emp.username}
// //                   </MenuItem>
// //                 ))}
// //               </TextField>
// //             </Grid>

// //             {/* SALARY INPUTS */}
// //             {['annualSalary', 'grossSalary', 'basicSalary', 'fixedSalary'].map(field => (
// //               <Grid item xs={12} key={field}>
// //                 <TextField
// //                   fullWidth
// //                   label={field.replace(/([A-Z])/g, ' $1')}
// //                   value={formData[field]}
// //                   onChange={e =>
// //                     setFormData({ ...formData, [field]: e.target.value })
// //                   }
// //                 />
// //               </Grid>
// //             ))}

// //             {/* MULTIPLE SALARY COMPONENTS */}
// //             <Grid item xs={12}>
// //               <TextField
// //                 select
// //                 fullWidth
// //                 label="Salary Components"
// //                 SelectProps={{
// //                   multiple: true,
// //                   value: formData.salaryComponents,
// //                   onChange: e =>
// //                     setFormData({
// //                       ...formData,
// //                       salaryComponents: e.target.value
// //                     }),
// //                   renderValue: selected => (
// //                     <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
// //                       {selected.map(id => {
// //                         const comp = salaryComponentsList.find(c => c._id === id)
// //                         return (
// //                           <Chip key={id} label={comp?.componentName || 'N/A'} />
// //                         )
// //                       })}
// //                     </Box>
// //                   )
// //                 }}
// //               >
// //                 {loadingComponents ? (
// //                   <MenuItem disabled>Loading...</MenuItem>
// //                 ) : (
// //                   salaryComponentsList.map(comp => (
// //                     <MenuItem key={comp._id} value={comp._id}>
// //                       {comp.componentName}
// //                     </MenuItem>
// //                   ))
// //                 )}
// //               </TextField>
// //             </Grid>

// //             {/* STATUS */}
// //             <Grid item xs={12}>
// //               <TextField
// //                 select
// //                 fullWidth
// //                 label="Status"
// //                 value={formData.status}
// //                 onChange={e =>
// //                   setFormData({ ...formData, status: e.target.value })
// //                 }
// //               >
// //                 <MenuItem value="Active">Active</MenuItem>
// //                 <MenuItem value="Inactive">Inactive</MenuItem>
// //               </TextField>
// //             </Grid>

// //             {/* NOTES */}
// //             <Grid item xs={12}>
// //               <TextField
// //                 multiline
// //                 rows={2}
// //                 fullWidth
// //                 label="Notes"
// //                 value={formData.notes}
// //                 onChange={e =>
// //                   setFormData({ ...formData, notes: e.target.value })
// //                 }
// //               />
// //             </Grid>
// //           </Grid>

// //           {/* BUTTONS */}
// //           <div className="flex gap-3 mt-5">
// //             <Button variant="contained" onClick={handleSave}>
// //               Save Changes
// //             </Button>
// //             <Button variant="tonal" color="error" onClick={handleClose}>
// //               Cancel
// //             </Button>
// //           </div>
// //         </Box>
// //       </Drawer>

// //       {/* SNACKBAR */}
// //       <Snackbar
// //         open={snackbar.open}
// //         autoHideDuration={3000}
// //         onClose={handleSnackbarClose}
// //         anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
// //       >
// //         <Alert
// //           severity={snackbar.severity}
// //           variant="filled"
// //           sx={{
// //             backgroundColor:
// //               snackbar.severity === 'success' ? '#2B3380' : '#D32F2F',
// //             color: 'white'
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
// import {
//   Drawer, Typography, Divider, Button, IconButton, Grid, MenuItem,
//   Box, Snackbar, Alert, Chip, Checkbox
// } from '@mui/material'
// import TextField from '@mui/material/TextField'
// import { useSession } from 'next-auth/react'

// import {
//   fetchListOfUser,
//   fetchListOfSalaryComponent
// } from '../../../../app/server/actions'

// const EditDepartment = ({ open, handleClose, selectedDepartment, onSave }) => {

//   const convertToBoolean = value => {
//     if (value === true) return true
//     if (value === false) return false
//     if (value === 'Yes') return true
//     if (value === 'No') return false
//     return false
//   }

//   const { data: session } = useSession()
//   const token = session?.user?.accessToken

//   const [employees, setEmployees] = useState([])
//   const [salaryComponentsList, setSalaryComponentsList] = useState([])
//   const [loadingComponents, setLoadingComponents] = useState(true)

//   const [formData, setFormData] = useState({
//     _id: '',
//     employee: '',
//     annualSalary: '',
//     grossSalary: '',
//     basicSalary: '',
//     fixedSalary: '',
//     salaryComponents: [],
//     status: '',
//     notes: '',
//     isHraFixed: false,
//     hraFixedAmount: '',
//      isNAPS: false,
//       isNATS: false,
//   })

//   const [snackbar, setSnackbar] = useState({
//     open: false,
//     message: '',
//     severity: 'success'
//   })

//   const handleSnackbarClose = () =>
//     setSnackbar(prev => ({ ...prev, open: false }))

//   useEffect(() => {
//     const loadEmployees = async () => {
//       try {
//         const res = await fetchListOfUser()
//         setEmployees(res?.data || res || [])
//       } catch (err) {
//         console.error('Error fetching employees:', err)
//       }
//     }
//     loadEmployees()
//   }, [])

//   useEffect(() => {
//     const loadComponents = async () => {
//       try {
//         const list = await fetchListOfSalaryComponent()
//         setSalaryComponentsList(list)
//       } catch (err) {
//         console.error('Error fetching salary components:', err)
//       } finally {
//         setLoadingComponents(false)
//       }
//     }
//     loadComponents()
//   }, [])

//   // ⭐ LOAD SELECTED DEPARTMENT
//   useEffect(() => {
//     if (selectedDepartment) {
//       setFormData({
//         _id: selectedDepartment._id || '',
//         employee: selectedDepartment.employeeId || '',
//         annualSalary: selectedDepartment.annualSalary || '',
//         grossSalary: selectedDepartment.grossSalary || '',
//         basicSalary: selectedDepartment.basicSalary || '',
//         fixedSalary: selectedDepartment.fixedSalary || '',
//         salaryComponents: selectedDepartment.salaryComponents?.map(c => c._id) || [],
//         status: selectedDepartment.status || '',
//         notes: selectedDepartment.notes || '',

//         // ⭐ FIXED LOGIC
//         isHraFixed: convertToBoolean(selectedDepartment.isHraFixed),
//         hraFixedAmount: selectedDepartment.hraFixedAmount || '',
//         isNAPS: convertToBoolean(selectedDepartment.isNAPS),
//         isNATS: convertToBoolean(selectedDepartment.isNATS),

//       })
//     }
//   }, [selectedDepartment])

//   // ⭐ SAVE
//   const handleSave = async () => {
//     try {
//       const payload = {
//         ...formData,
//         isHraFixed: !!formData.isHraFixed,
//         hraFixedAmount: formData.isHraFixed ? formData.hraFixedAmount : null
//       }

//       const response = await onSave(payload)

//       setSnackbar({
//         open: true,
//         message: response?.message || 'Updated successfully!',
//         severity: response?.success ? 'success' : 'error'
//       })

//       if (response?.success) {
//         handleClose()
//       }

//     } catch (err) {
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
//         anchor="right"
//         onClose={handleClose}
//         variant="temporary"
//         ModalProps={{ keepMounted: true }}
//         sx={{ '& .MuiDrawer-paper': { width: { xs: 320, sm: 420 } } }}
//       >
        
//         <div className="flex items-center justify-between p-5">
//           <Typography variant="h5" fontWeight={600}>
//             Edit Employee Salary
//           </Typography>
//           <IconButton onClick={handleClose}>
//             <i className="tabler-x text-2xl" />
//           </IconButton>
//         </div>

//         <Divider />

//         <Box sx={{ p: 5 }}>
//           <Grid container spacing={4}>

//             <Grid item xs={12}>
//               <TextField
//                 select
//                 fullWidth
//                 label="Employee"
//                 value={formData.employee}
//                 onChange={e => setFormData({ ...formData, employee: e.target.value })}
//               >
//                 {employees.map(emp => (
//                   <MenuItem key={emp._id} value={emp._id}>
//                     {emp.username}
//                   </MenuItem>
//                 ))}
//               </TextField>
//             </Grid>

//             {['annualSalary', 'grossSalary', 'basicSalary', 'fixedSalary'].map(field => (
//               <Grid item xs={12} key={field}>
//                 <TextField
//                   fullWidth
//                   label={field.replace(/([A-Z])/g, ' $1')}
//                   value={formData[field]}
//                   onChange={e => setFormData({ ...formData, [field]: e.target.value })}
//                 />
//               </Grid>
//             ))}

//             {/* ⭐ HRA FIXED CHECKBOX */}
//             <Grid item xs={12}>
//               <div className="flex items-center gap-3">
//                 <Checkbox
//                   checked={formData.isHraFixed}
//                   onChange={e =>
//                     setFormData({ ...formData, isHraFixed: e.target.checked })
//                   }
//                 />
//                 <Typography>Use Fixed HRA Amount?</Typography>
//               </div>
//             </Grid>

//             {/* ⭐ HRA FIXED AMOUNT INPUT */}
//             {formData.isHraFixed && (
//               <Grid item xs={12}>
//                 <TextField
//                   fullWidth
//                   label="Fixed HRA Amount"
//                   value={formData.hraFixedAmount}
//                   onChange={e =>
//                     setFormData({ ...formData, hraFixedAmount: e.target.value })
//                   }
//                 />
//               </Grid>
//             )}
            
//           <Grid item xs={12}>
//   <div className="flex items-center gap-3">
//     <Checkbox
//       checked={formData.isNAPS}
//       onChange={e =>
//         setFormData({ ...formData, isNAPS: e.target.checked })
//       }
//     />
//     <Typography>NAPS Applicable?</Typography>
//   </div>
// </Grid>

// <Grid item xs={12}>
//   <div className="flex items-center gap-3">
//     <Checkbox
//       checked={formData.isNATS}
//       onChange={e =>
//         setFormData({ ...formData, isNATS: e.target.checked })
//       }
//     />
//     <Typography>NATS Applicable?</Typography>
//   </div>
// </Grid>


//             <Grid item xs={12}>
//               <TextField
//                 select
//                 fullWidth
//                 label="Salary Components"
//                 SelectProps={{
//                   multiple: true,
//                   value: formData.salaryComponents,
//                   onChange: e =>
//                     setFormData({ ...formData, salaryComponents: e.target.value }),
//                   renderValue: selected => (
//                     <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
//                       {selected.map(id => {
//                         const comp = salaryComponentsList.find(c => c._id === id)
//                         return <Chip key={id} label={comp?.componentName || 'N/A'} />
//                       })}
//                     </Box>
//                   )
//                 }}
//               >
//                 {salaryComponentsList.map(comp => (
//                   <MenuItem key={comp._id} value={comp._id}>
//                     {comp.componentName}
//                   </MenuItem>
//                 ))}
//               </TextField>
//             </Grid>

//             <Grid item xs={12}>
//               <TextField
//                 select
//                 fullWidth
//                 label="Status"
//                 value={formData.status}
//                 onChange={e => setFormData({ ...formData, status: e.target.value })}
//               >
//                 <MenuItem value="Active">Active</MenuItem>
//                 <MenuItem value="Inactive">Inactive</MenuItem>
//               </TextField>
//             </Grid>

//             <Grid item xs={12}>
//               <TextField
//                 multiline
//                 rows={2}
//                 fullWidth
//                 label="Notes"
//                 value={formData.notes}
//                 onChange={e => setFormData({ ...formData, notes: e.target.value })}
//               />
//             </Grid>

//           </Grid>

//           <div className="flex gap-3 mt-5">
//             <Button variant="contained" onClick={handleSave}>Save Changes</Button>
//             <Button variant="tonal" color="error" onClick={handleClose}>Cancel</Button>
//           </div>
//         </Box>
//       </Drawer>

//       <Snackbar
//         open={snackbar.open}
//         autoHideDuration={3000}
//         onClose={handleSnackbarClose}
//         anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
//       >
//         <Alert severity={snackbar.severity} variant="filled">
//           {snackbar.message}
//         </Alert>
//       </Snackbar>
//     </>
//   )
// }

// export default EditDepartment

'use client'

import { useEffect, useState } from 'react'
import {
  Drawer, Typography, Divider, Button, IconButton,
  Grid, MenuItem, Box, Snackbar, Alert, Chip, Checkbox
} from '@mui/material'
import TextField from '@mui/material/TextField'
import { useSession } from 'next-auth/react'

import {
  fetchListOfUser,
  fetchListOfSalaryComponent
} from '../../../../app/server/actions'

const EditDepartment = ({ open, handleClose, selectedDepartment, onSave }) => {

  const convertToBoolean = value => {
    if (value === true) return true
    if (value === false) return false
    if (value === 'Yes') return true
    if (value === 'No') return false
    return false
  }

  const { data: session } = useSession()

  const [employees, setEmployees] = useState([])
  const [salaryComponentsList, setSalaryComponentsList] = useState([])
  const [loadingComponents, setLoadingComponents] = useState(true)

  const [formData, setFormData] = useState({
    _id: '',
    employee: '',
    annualSalary: '',
    grossSalary: '',
    basicSalary: '',
    fixedSalary: '',
    salaryComponents: [],
    status: '',
    notes: '',

    // New Fields
    isHraFixed: false,
    hraFixedAmount: '',
    isNAPS: false,
    isNATS: false,
    employeeStatus:''

  })

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  })

  const handleSnackbarClose = () => setSnackbar({ ...snackbar, open: false })

  // Fetch employees
  useEffect(() => {
    const loadEmployees = async () => {
      try {
        const res = await fetchListOfUser()
        setEmployees(res?.data || res || [])
      } catch (err) {
        console.error("Error fetching employees:", err)
      }
    }
    loadEmployees()
  }, [])

  // Fetch salary components
  useEffect(() => {
    const loadComponents = async () => {
      try {
        const list = await fetchListOfSalaryComponent()
        setSalaryComponentsList(list)
      } catch (err) {
        console.error("Error fetching components:", err)
      } finally {
        setLoadingComponents(false)
      }
    }
    loadComponents()
  }, [])

  // Load selected department
  useEffect(() => {
    if (selectedDepartment) {
      setFormData({
        _id: selectedDepartment._id || '',
        employee: selectedDepartment.employeeId || "",
        annualSalary: selectedDepartment.annualSalary ?? "",
        grossSalary: selectedDepartment.grossSalary ?? "",
        basicSalary: selectedDepartment.basicSalary ?? "",
        fixedSalary: selectedDepartment.fixedSalary ?? "",
        salaryComponents: selectedDepartment.salaryComponents?.map(c => c._id) || [],
        status: selectedDepartment.status || "",
        notes: selectedDepartment.notes ?? "",

        isHraFixed: convertToBoolean(selectedDepartment.isHraFixed),
        hraFixedAmount: selectedDepartment.hraFixedAmount ?? "",
        isNAPS: convertToBoolean(selectedDepartment.isNAPS),
        isNATS: convertToBoolean(selectedDepartment.isNATS),
        employeeStatus:selectedDepartment.employeeStatus
      })
    }
  }, [selectedDepartment])

  // SAVE handler
  const handleSave = async () => {
    try {
      const payload = {
        ...formData,
        isHraFixed: !!formData.isHraFixed,
        hraFixedAmount: formData.isHraFixed ? formData.hraFixedAmount : null,
        isNAPS: !!formData.isNAPS,
        isNATS: !!formData.isNATS,
        employeeStatus:formData.employeeStatus
      }

      const response = await onSave(payload)

      setSnackbar({
        open: true,
        message: response?.message || "Updated successfully!",
        severity: response?.success ? "success" : "error"
      })

      if (response?.success) handleClose()

    } catch (err) {
      setSnackbar({
        open: true,
        message: "Something went wrong!",
        severity: "error"
      })
    }
  }

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

        <div className="flex items-center justify-between p-5">
          <Typography variant="h5" fontWeight={600}>
            Edit Employee Salary
          </Typography>
          <IconButton onClick={handleClose}>
            <i className="tabler-x text-2xl" />
          </IconButton>
        </div>

        <Divider />

        <Box sx={{ p: 5 }}>
          <Grid container spacing={4}>

            {/* Employee */}
            <Grid item xs={12}>
              <TextField
                select
                fullWidth
                label="Employee"
                value={formData.employee || ""}
                onChange={e => setFormData({ ...formData, employee: e.target.value })}
              >
                {employees.map(emp => (
                  <MenuItem key={emp._id} value={emp._id}>
                    {emp.username}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            {/* Salary Fields */}
            {['annualSalary', 'grossSalary', 'basicSalary', 'fixedSalary'].map(field => (
              <Grid item xs={12} key={field}>
                <TextField
                  fullWidth
                  label={field.replace(/([A-Z])/g, ' $1')}
                  value={formData[field] ?? ""}
                  onChange={e => setFormData({ ...formData, [field]: e.target.value })}
                />
              </Grid>
            ))}

            {/* HRA FIXED */}
            <Grid item xs={12}>
              <div className="flex items-center gap-3">
                <Checkbox
                  checked={!!formData.isHraFixed}
                  onChange={e => setFormData({ ...formData, isHraFixed: e.target.checked })}
                />
                <Typography>Use Fixed HRA Amount?</Typography>
              </div>
            </Grid>

            {formData.isHraFixed && (
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Fixed HRA Amount"
                  value={formData.hraFixedAmount ?? ""}
                  onChange={e => setFormData({ ...formData, hraFixedAmount: e.target.value })}
                />
              </Grid>
            )}

            {/* NAPS */}
            <Grid item xs={12}>
              <div className="flex items-center gap-3">
                <Checkbox
                  checked={!!formData.isNAPS}
                  onChange={e => setFormData({ ...formData, isNAPS: e.target.checked })}
                />
                <Typography>NAPS Applicable?</Typography>
              </div>
            </Grid>

            {/* NATS */}
            <Grid item xs={12}>
              <div className="flex items-center gap-3">
                <Checkbox
                  checked={!!formData.isNATS}
                  onChange={e => setFormData({ ...formData, isNATS: e.target.checked })}
                />
                <Typography>NATS Applicable?</Typography>
              </div>
            </Grid>

            {/* Salary Components */}
            <Grid item xs={12}>
              <TextField
                select
                fullWidth
                label="Salary Components"
                SelectProps={{
                  multiple: true,
                  value: formData.salaryComponents || [],
                  onChange: e =>
                    setFormData({ ...formData, salaryComponents: e.target.value }),
                  renderValue: selected => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {selected.map(id => {
                        const comp = salaryComponentsList.find(c => c._id === id)
                        return <Chip key={id} label={comp?.componentName || 'N/A'} />
                      })}
                    </Box>
                  )
                }}
              >
                {salaryComponentsList.map(comp => (
                  <MenuItem key={comp._id} value={comp._id}>
                    {comp.componentName}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

              <Grid item xs={12}>
              <TextField
                select
                fullWidth
                label="Employee Status"
                value={formData.employeeStatus || ""}
                onChange={e => setFormData({ ...formData, employeeStatus: e.target.value })}
              >
                <MenuItem value="ONROLL">ONROLL</MenuItem>
                <MenuItem value="CASH">CASH</MenuItem>
                <MenuItem value="NAPS">NAPS</MenuItem>
                <MenuItem value="NATS">NATS</MenuItem>
              </TextField>
            </Grid>

            {/* Status */}
            <Grid item xs={12}>
              <TextField
                select
                fullWidth
                label="Status"
                value={formData.status || ""}
                onChange={e => setFormData({ ...formData, status: e.target.value })}
              >
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="Inactive">Inactive</MenuItem>
              </TextField>
            </Grid>

            {/* Notes */}
            <Grid item xs={12}>
              <TextField
                multiline
                rows={2}
                fullWidth
                label="Notes"
                value={formData.notes ?? ""}
                onChange={e => setFormData({ ...formData, notes: e.target.value })}
              />
            </Grid>

          </Grid>

          <div className="flex gap-3 mt-5">
            <Button variant="contained" onClick={handleSave}>Save Changes</Button>
            <Button variant="tonal" color="error" onClick={handleClose}>
              Cancel
            </Button>
          </div>
        </Box>
      </Drawer>

      {/* Snackbar */}
      {/* <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert severity={snackbar.severity} variant="filled">
          {snackbar.message}
        </Alert>
      </Snackbar> */}
      <Snackbar
  open={snackbar.open}
  autoHideDuration={3000}
  onClose={handleSnackbarClose}
  anchorOrigin={{ vertical: "top", horizontal: "right" }}
>
  <Alert
    severity={snackbar.severity}
    variant="filled"
    sx={{
      backgroundColor:
        snackbar.severity === "success" ? "#2B3380" : "#D32F2F",
      color: "white"
    }}
  >
    {snackbar.message}
  </Alert>
</Snackbar>

    </>
  )
}

export default EditDepartment










