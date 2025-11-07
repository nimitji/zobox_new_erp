


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
  Alert as MuiAlert
} from '@mui/material'

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'

// 🧩 Third-party Imports
import { useForm, Controller } from 'react-hook-form'
import FileUploadController from '../../../../components/fileUploadController'

// 🧠 Server Actions
import {
  createTransfer,
  fetchListOfUser,
  fetchListOfBranch,
  fetchDepartmentsByBranch,
  fetchDesignationsByDepartment
} from '../../../../app/server/actions.js'

// 🧱 Component Imports
import CustomTextField from '@core/components/mui/TextField'

const AddDepartmentDrawer = ({ open, handleClose, refreshDepartments }) => {
  // 🧠 Local State
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' })
  const [employees, setEmployees] = useState([])
  const [branches, setBranches] = useState([])
  const [departments, setDepartments] = useState([])
  const [designations, setDesignations] = useState([])
  const [loadingBranches, setLoadingBranches] = useState(true)
  const [loadingDepartments, setLoadingDepartments] = useState(false)
  const [loadingDesignations, setLoadingDesignations] = useState(false)

  // ✅ React Hook Form setup — ensure every field has a default value
  const {
    control,
    reset,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm({
    defaultValues: {
      employee: '',
      branch: '',
      department: '',
      designation: '',
      transferDate: null,
      effectiveDate: null,
      reason: '',
      document: null,
      status: 'Pending'
    }
  })

  // 🧠 Helper to safely fetch JSON
  const safeFetchJSON = async (fetchFn, fallback = []) => {
    try {
      const response = await fetchFn()
      if (response && typeof response === 'object') {
        if (Array.isArray(response?.data)) return response.data
        if (Array.isArray(response)) return response
      }
      return fallback
    } catch (error) {
      console.error('Fetch JSON Error:', error)
      return fallback
    }
  }

  // 🧠 Load employees and branches
  useEffect(() => {
    const loadInitialData = async () => {
      setLoadingBranches(true)
      const [empList, branchList] = await Promise.all([
        safeFetchJSON(fetchListOfUser),
        safeFetchJSON(fetchListOfBranch)
      ])
      setEmployees(empList)
      setBranches(branchList)
      setLoadingBranches(false)
    }

    loadInitialData()
  }, [])

  // 🔍 Watch branch and department for dependent dropdowns
  const selectedBranch = watch('branch')
  const selectedDepartment = watch('department')

  // 🏢 Load departments when branch changes
  useEffect(() => {
    const loadDepartments = async () => {
      if (!selectedBranch) {
        setDepartments([])
        setDesignations([])
        return
      }

      setLoadingDepartments(true)
      const list = await safeFetchJSON(() => fetchDepartmentsByBranch(selectedBranch))
      setDepartments(list)
      setLoadingDepartments(false)
    }

    loadDepartments()
  }, [selectedBranch])

  // 💼 Load designations when department changes
  useEffect(() => {
    const loadDesignations = async () => {
      if (!selectedDepartment) {
        setDesignations([])
        return
      }

      setLoadingDesignations(true)
      const list = await safeFetchJSON(() => fetchDesignationsByDepartment(selectedDepartment))
      setDesignations(list)
      setLoadingDesignations(false)
    }

    loadDesignations()
  }, [selectedDepartment])

  // ✅ Submit Form — correct FormData
  const onSubmit = async data => {
    try {
      const formData = new FormData()

      formData.append('employee', data.employee || '')
      formData.append('branch', data.branch || '')
      formData.append('department', data.department || '')
      formData.append('designation', data.designation || '')
      if (data.transferDate) formData.append('transferDate', data.transferDate)
      if (data.effectiveDate) formData.append('effectiveDate', data.effectiveDate) // backend key
      formData.append('reason', data.reason || '')
      formData.append('status', data.status || 'Pending')
      if (data.document) formData.append('document', data.document)

      const response = await createTransfer(formData)

      if (response?.success) {
        setSnackbar({
          open: true,
          message: response.message || 'Transfer created successfully',
          severity: 'success'
        })
        await refreshDepartments?.()
        handleClose()
        reset()
      } else {
        setSnackbar({
          open: true,
          message: response?.message || 'Failed to create transfer',
          severity: 'error'
        })
      }
    } catch (err) {
      console.error('Error creating transfer:', err)
      setSnackbar({
        open: true,
        message: 'Error creating transfer',
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
        {/* Header */}
        <div className='flex items-center justify-between p-5'>
          <Typography variant='h5' fontWeight='bold'>
            Add New Transfer
          </Typography>
          <IconButton size='small' onClick={handleReset}>
            <i className='tabler-x text-2xl text-textPrimary' />
          </IconButton>
        </div>
        <Divider />

        {/* 🧾 Form */}
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-6 p-6'>
          {/* 👤 Employee */}
          <Controller
            name='employee'
            control={control}
            render={({ field }) => (
              <CustomTextField
                select
                fullWidth
                label='Employee'
                value={field.value || ''}
                onChange={field.onChange}
                error={!!errors.employee}
                helperText={errors.employee?.message}
              >
                {employees.length > 0 ? (
                  employees.map(emp => (
                    <MenuItem key={emp._id} value={emp._id}>
                      {emp.username || emp.name || 'Unnamed Employee'}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem disabled>No employees found</MenuItem>
                )}
              </CustomTextField>
            )}
          />

          {/* 🏢 Branch */}
          <Controller
            name='branch'
            control={control}
            render={({ field }) => (
              <CustomTextField
                select
                fullWidth
                label='To Branch'
                value={field.value || ''}
                onChange={field.onChange}
                error={!!errors.branch}
                helperText={errors.branch?.message}
              >
                {loadingBranches ? (
                  <MenuItem disabled>Loading branches...</MenuItem>
                ) : branches.length > 0 ? (
                  branches.map(branch => (
                    <MenuItem key={branch._id} value={branch._id}>
                      {branch.branchName || 'Unnamed Branch'}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem disabled>No branches found</MenuItem>
                )}
              </CustomTextField>
            )}
          />

          {/* 🏬 Department */}
          <Controller
            name='department'
            control={control}
            render={({ field }) => (
              <CustomTextField
                select
                fullWidth
                label='To Department'
                value={field.value || ''}
                onChange={field.onChange}
                error={!!errors.department}
                helperText={errors.department?.message}
                disabled={!selectedBranch}
              >
                {!selectedBranch ? (
                  <MenuItem disabled>Select a branch first</MenuItem>
                ) : loadingDepartments ? (
                  <MenuItem disabled>Loading departments...</MenuItem>
                ) : departments.length > 0 ? (
                  departments.map(dept => (
                    <MenuItem key={dept._id} value={dept._id}>
                      {dept.departmentName || dept.name || 'Unnamed Department'}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem disabled>No departments found</MenuItem>
                )}
              </CustomTextField>
            )}
          />

          {/* 💼 Designation */}
          <Controller
            name='designation'
            control={control}
            render={({ field }) => (
              <CustomTextField
                select
                fullWidth
                label='To Designation'
                value={field.value || ''}
                onChange={field.onChange}
                error={!!errors.designation}
                helperText={errors.designation?.message}
                disabled={!selectedDepartment}
              >
                {!selectedDepartment ? (
                  <MenuItem disabled>Select a department first</MenuItem>
                ) : loadingDesignations ? (
                  <MenuItem disabled>Loading designations...</MenuItem>
                ) : designations.length > 0 ? (
                  designations.map(des => (
                    <MenuItem key={des._id} value={des._id}>
                      {des.name || 'Unnamed Designation'}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem disabled>No designations found</MenuItem>
                )}
              </CustomTextField>
            )}
          />

          {/* 📅 Transfer Date */}
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Controller
              name='transferDate'
              control={control}
              render={({ field }) => (
                <DatePicker
                  label='Transfer Date'
                  value={field.value ? dayjs(field.value) : null}
                  onChange={val => field.onChange(val ? val.toISOString() : null)}
                  enableAccessibleFieldDOMStructure={false}
                  slots={{ textField: CustomTextField }}
                  slotProps={{ textField: { fullWidth: true } }}
                />
              )}
            />
          </LocalizationProvider>

          {/* 📅 Effective Date */}
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Controller
              name='effectiveDate'
              control={control}
              render={({ field }) => (
                <DatePicker
                  label='Effective Date'
                  value={field.value ? dayjs(field.value) : null}
                  onChange={val => field.onChange(val ? val.toISOString() : null)}
                  enableAccessibleFieldDOMStructure={false}
                  slots={{ textField: CustomTextField }}
                  slotProps={{ textField: { fullWidth: true } }}
                />
              )}
            />
          </LocalizationProvider>

          {/* 🗒 Reason */}
          <Controller
            name='reason'
            control={control}
            render={({ field }) => (
              <CustomTextField
                {...field}
                fullWidth
                value={field.value || ''}
                multiline
                minRows={2}
                label='Reason'
                error={!!errors.reason}
                helperText={errors.reason?.message}
              />
            )}
          />

          {/* 📎 Document Upload */}
          <FileUploadController
            control={control}
            errors={errors}
            name='document'
            label='Supporting Document'
            accept='image/*'
          />

          {/* 🔘 Status Dropdown */}
          <Controller
            name='status'
            control={control}
            render={({ field }) => (
              <CustomTextField select fullWidth label='Select Status' value={field.value || ''} onChange={field.onChange}>
                <MenuItem value='Pending'>Pending</MenuItem>
                <MenuItem value='Approved'>Approved</MenuItem>
                <MenuItem value='Rejected'>Rejected</MenuItem>
              </CustomTextField>
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




