'use client'

import { useEffect, useState } from 'react'

// 📦 MUI Imports
import {
  Button,
  Drawer,
  IconButton,
  MenuItem,
  Typography,
  Divider,
  Snackbar,
  TextField,
  Alert as MuiAlert,
  Box
} from '@mui/material'

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'

// 🧩 React Hook Form (not used directly but imported)
import { Controller } from 'react-hook-form'

// 🧠 Server Actions
import { fetchListOfUser, fetchResignation } from '../../../../app/server/actions.js'

/* ------------------------ 📁 File Upload Controller ------------------------ */
const FileUploadController = ({ formData, setFormData, label }) => {
  return (
    <Box>
      <Typography variant='body2' sx={{ mb: 1, color: 'text.secondary', fontWeight: 500 }}>
        {label}
      </Typography>

      {/* 📤 File Input */}
      <TextField
        type='file'
        fullWidth
        inputProps={{ accept: 'image/*,.pdf' }}
        onChange={e =>
          setFormData({
            ...formData,
            document: e.target.files?.[0] || null
          })
        }
        sx={{
          '& input[type="file"]': {
            cursor: 'pointer',
            padding: '8px',
            borderRadius: '4px',
            border: '1px solid #bdbdbd'
          },
          '& .MuiOutlinedInput-root': {
            '& fieldset': { borderColor: '#bdbdbdbd' },
            '&:hover fieldset': { borderColor: '#2B3380' },
            '&.Mui-focused fieldset': {
              borderColor: '#2B3380',
              borderWidth: 2
            }
          }
        }}
      />

      {/* 📎 Preview or Existing Document */}
      {formData.document && (
        <Box sx={{ mt: 2 }}>
          {typeof formData.document === 'string' ? (
            <Box>
              <Typography variant='body2' sx={{ mb: 1 }}>
                Current Document:
              </Typography>
              {formData.document.endsWith('.pdf') ? (
                <a
                  href={formData.document}
                  target='_blank'
                  rel='noopener noreferrer'
                  style={{ color: '#2B3380', textDecoration: 'underline' }}
                >
                  View PDF Document
                </a>
              ) : (
                <img
                  src={formData.document}
                  alt='Uploaded Document'
                  style={{
                    width: '100%',
                    maxHeight: 200,
                    objectFit: 'contain',
                    borderRadius: 8,
                    border: '1px solid #ddd'
                  }}
                />
              )}
            </Box>
          ) : (
            <Typography variant='body2' sx={{ mt: 1, color: 'text.secondary' }}>
              Selected file: {formData.document.name}
            </Typography>
          )}
        </Box>
      )}
    </Box>
  )
}

/* ------------------------------ ✏️ Edit Drawer ------------------------------ */
const EditDepartment = ({ open, handleClose, selectedDepartment, onSave, refreshList }) => {
  // ✅ Form Data
  const [formData, setFormData] = useState({
    _id: '',
    name: '',
    employeeId: '',
    employeeName: '',
    description: '',
    status: 'Active',
    resignationDate: '',
    lastWorkingDay: '',
    noticePeriod: '',
    reason: '',
    document: null
  })

  // ✅ Employee dropdown data
  const [employees, setEmployees] = useState([])
  const [loadingEmployees, setLoadingEmployees] = useState(true)

  // ✅ Snackbar state
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  })

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false })
  }

  /* ---------------------------- 🧠 Fetch Employees ---------------------------- */
  useEffect(() => {
    const loadEmployees = async () => {
      try {
        const res = await fetchListOfUser()
        if (res?.success && Array.isArray(res.data)) {
          setEmployees(res.data)
        } else if (Array.isArray(res)) {
          setEmployees(res)
        } else {
          console.warn('Invalid employee data format:', res)
        }
      } catch (err) {
        console.error('Error fetching employees:', err)
      } finally {
        setLoadingEmployees(false)
      }
    }

    loadEmployees()
  }, [])

  /* ---------------------------- ✏️ Prefill on Edit ---------------------------- */
  useEffect(() => {
    if (selectedDepartment) {
      setFormData({
        _id: selectedDepartment._id || '',
        name: selectedDepartment.name || '',
        employeeId: selectedDepartment.employeeId || '',
        employeeName: selectedDepartment.employeeName || '',
        description: selectedDepartment.description || '',
        status: selectedDepartment.status || 'Active',
        resignationDate: selectedDepartment.resignationDate || '',
        lastWorkingDay: selectedDepartment.lastWorkingDay || '',
        noticePeriod: selectedDepartment.noticePeriod || '',
        reason: selectedDepartment.reason || '',
        document: selectedDepartment.document || '',
        status: selectedDepartment.status || ''
      })
    }
  }, [selectedDepartment])

  /* ---------------------------- 🧭 Handle Employee ---------------------------- */
  const handleEmployeeChange = e => {
    const selectedId = e.target.value
    const selectedEmp = employees.find(emp => emp._id === selectedId)
    setFormData({
      ...formData,
      employeeId: selectedId,
      employeeName: selectedEmp?.username || ''
    })
  }

  /* ----------------------------- 💾 Handle Save ----------------------------- */
  // const handleSave = async () => {
  //   try {
  //     const res = await onSave(formData)
  //     setSnackbar({
  //       open: true,
  //       message: res?.message || 'Department updated successfully!',
  //       severity: res?.success ? 'success' : 'error'
  //     })
  //     if (res?.success) handleClose()
  //   } catch (error) {
  //     console.error('Error saving:', error)
  //     setSnackbar({
  //       open: true,
  //       message: 'Something went wrong!',
  //       severity: 'error'
  //     })
  //   }
  // }

  const handleSave = async () => {
    try {
      let payload

      // 🧩 Check if document is a File (user uploaded a new file)
      const hasFile = formData.document instanceof File

      if (hasFile) {
        // 🟣 If user uploaded a new file → send multipart/form-data
        const fd = new FormData()

        Object.entries(formData).forEach(([key, value]) => {
          if (value !== null && value !== undefined) {
            if (key === 'document' && value instanceof File) {
              fd.append(key, value)
            } else {
              fd.append(key, value)
            }
          }
        })

        payload = fd

        console.log('📦 Sending multipart/form-data:')
        for (const [key, val] of fd.entries()) {
          console.log(`  ${key}:`, val)
        }
      } else {
        // 🟢 If no file uploaded → send as JSON object
        const jsonBody = { ...formData }
        payload = JSON.stringify(jsonBody)

        console.log('📩 Sending JSON body:', jsonBody)
      }

      // ✅ Send API request
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/jaycon/update-resignation`, {
        method: 'PUT',
        body: payload,
        ...(formData.document instanceof File
          ? {} // fetch automatically sets headers for FormData
          : { headers: { 'Content-Type': 'application/json' } })
      })

      const data = await res.json()

      setSnackbar({
        open: true,
        message: data?.message || 'Resignation updated successfully!',
        severity: data?.success ? 'success' : 'error'
      })

      // if (data?.success) handleClose()
      if (data?.success) {
        if (typeof refreshList === 'function') {
          await refreshList() // 🔁 Refresh table automatically
        }
        handleClose()
      }
    } catch (error) {
      console.error('❌ Error saving resignation:', error)
      setSnackbar({
        open: true,
        message: 'Something went wrong!',
        severity: 'error'
      })
    }
  }

  /* ------------------------------ 🧱 UI Layout ------------------------------ */
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
        {/* 🧩 Header */}
        <div className='flex items-center justify-between p-5'>
          <Typography variant='h5' fontWeight='bold'>
            Edit Resignation Details
          </Typography>
          <IconButton size='small' onClick={handleClose}>
            <i className='tabler-x text-2xl text-textPrimary' />
          </IconButton>
        </div>

        <Divider />

        {/* 🧩 Form Section */}
        <Box sx={{ p: 6 }}>
          <form className='flex flex-col gap-5'>
            {/* 👤 Employee Dropdown */}
            <TextField
              select
              label='Employee'
              fullWidth
              value={formData.employeeId || ''}
              onChange={handleEmployeeChange}
            >
              {loadingEmployees ? (
                <MenuItem disabled>Loading employees...</MenuItem>
              ) : employees.length > 0 ? (
                employees.map(emp => (
                  <MenuItem key={emp._id} value={emp._id}>
                    {emp.username}
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled>No employees found</MenuItem>
              )}
            </TextField>

            {/* 📅 Resignation Date */}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label='Resignation Date'
                value={formData.resignationDate ? dayjs(formData.resignationDate) : null}
                onChange={newValue =>
                  setFormData({
                    ...formData,
                    resignationDate: newValue ? newValue.toISOString() : ''
                  })
                }
                enableAccessibleFieldDOMStructure={false}
                slots={{ textField: TextField }}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    variant: 'outlined',
                    sx: {
                      '& .MuiOutlinedInput-root fieldset': {
                        borderColor: '#bdbdbd'
                      },
                      '& .MuiOutlinedInput-root:hover fieldset': {
                        borderColor: '#2B3380'
                      },
                      '& .MuiOutlinedInput-root.Mui-focused fieldset': {
                        borderColor: '#2B3380',
                        borderWidth: 2
                      }
                    }
                  }
                }}
              />
            </LocalizationProvider>

            {/* 📅 Last Working Date */}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label='Last Working Date'
                value={formData.lastWorkingDay ? dayjs(formData.lastWorkingDay) : null}
                onChange={newValue =>
                  setFormData({
                    ...formData,
                    lastWorkingDay: newValue ? newValue.toISOString() : ''
                  })
                }
                enableAccessibleFieldDOMStructure={false}
                slots={{ textField: TextField }}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    variant: 'outlined',
                    sx: {
                      '& .MuiOutlinedInput-root fieldset': {
                        borderColor: '#bdbdbd'
                      },
                      '& .MuiOutlinedInput-root:hover fieldset': {
                        borderColor: '#2B3380'
                      },
                      '& .MuiOutlinedInput-root.Mui-focused fieldset': {
                        borderColor: '#2B3380',
                        borderWidth: 2
                      }
                    }
                  }
                }}
              />
            </LocalizationProvider>

            {/* 🕒 Notice Period */}
            <TextField
              label='Notice Period'
              fullWidth
              value={formData.noticePeriod ?? ''}
              onChange={e =>
                setFormData({
                  ...formData,
                  noticePeriod: e.target.value
                })
              }
            />

            {/* 📝 Reason */}
            <TextField
              label='Reason'
              fullWidth
              value={formData.reason ?? ''}
              onChange={e =>
                setFormData({
                  ...formData,
                  reason: e.target.value
                })
              }
            />

            {/* 🗒️ Description */}
            <TextField
              label='Description'
              fullWidth
              multiline
              minRows={2}
              value={formData.description}
              onChange={e =>
                setFormData({
                  ...formData,
                  description: e.target.value
                })
              }
            />

            {/* 📎 Upload Document */}
            <FileUploadController formData={formData} setFormData={setFormData} label='Upload Document' />

            {/* 🔖 Status */}
            <TextField
              select
              label='Status'
              fullWidth
              value={formData.status}
              onChange={e =>
                setFormData({
                  ...formData,
                  status: e.target.value
                })
              }
            >
              <MenuItem value='Pending'>Pending</MenuItem>
              <MenuItem value='Approved'>Approved</MenuItem>
              <MenuItem value='Rejected'>Rejected</MenuItem>
            </TextField>

            {/* ✅ Buttons */}
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
        <MuiAlert
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
        </MuiAlert>
      </Snackbar>
    </>
  )
}

export default EditDepartment
