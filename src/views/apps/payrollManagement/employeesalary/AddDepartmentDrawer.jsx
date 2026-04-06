


'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'

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
  Chip,
  Box,
  Checkbox
} from '@mui/material'

// 🧩 Third-party Imports
import { useForm, Controller } from 'react-hook-form'

// 🧠 Server Actions
import {
  createEmployeeSalary,
  fetchListOfUser,
  fetchListOfSalaryComponent
} from '../../../../app/server/actions.js'

// 🧱 Component Imports
import CustomTextField from '@core/components/mui/TextField'
const formatLabel = value =>
  value.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())

const AddAttendanceDrawer = props => {
  const { open, handleClose, refreshDepartments } = props

  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' })
  const [employees, setEmployees] = useState([])
  const [salaries, setSalaries] = useState([])
  const [loadingSalaries, setLoadingSalaries] = useState(true)

  const { data: session } = useSession()

  // 🔧 react-hook-form setup
  const {
    control,
    reset,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm({
    defaultValues: {
      employee: '',
      annualSalary: '',
      grossSalary: '',
      basicSalary: '',
      fixedSalary: '',
      salaryComponents: [],
      status: '',
      notes: '',
      isHraFixed: false,
      hraFixedAmount:'',
       isTdsFixed: false,
      tdsFixedAmount:'',
      employeeStatus:'',

      // ⭐ NEW CHECKBOX FIELDS
      isNAPS: false,
      isNATS: false
    }
  })

  const isHraFixed = watch('isHraFixed')
    const isTdsFixed = watch('isTdsFixed')


  // 🧠 Fetch Employee list
  useEffect(() => {
    const loadEmployees = async () => {
      try {
        const res = await fetchListOfUser()
        if (res?.success && Array.isArray(res.data)) setEmployees(res.data)
        else if (Array.isArray(res)) setEmployees(res)
      } catch (err) {
        console.error('❌ Error fetching employees:', err)
      }
    }

    loadEmployees()
  }, [])

  // 🧠 Fetch Salary Components
  useEffect(() => {
    const loadSalaries = async () => {
      try {
        const list = await fetchListOfSalaryComponent()
        setSalaries(list)
      } catch (err) {
        console.error('❌ Error loading salary components:', err)
      } finally {
        setLoadingSalaries(false)
      }
    }

    loadSalaries()
  }, [])

  // ✅ Submit Form
  const onSubmit = async data => {
    try {
      const token = session?.user?.accessToken
      if (!token) return

      const payload = {
        employee: data.employee,
        annualSalary: data.annualSalary,
        grossSalary: data.grossSalary,
        basicSalary: data.basicSalary,
        fixedSalary: data.fixedSalary,
        salaryComponents: data.salaryComponents,
        status: data.status,
        notes: data.notes,

        isHraFixed: data.isHraFixed,
        hraFixedAmount:data.hraFixedAmount,
         isTdsFixed: data.isTdsFixed,
        tdsFixedAmount:data.tdsFixedAmount,
        employeeStatus:data.employeeStatus,

        // ⭐ NEW CHECKBOXES
        isNAPS: data.isNAPS,
        isNATS: data.isNATS
      }

      const response = await createEmployeeSalary(payload, token)

      if (response?.success) {
        setSnackbar({
          open: true,
          message: response.message || 'Salary created successfully',
          severity: 'success'
        })

        if (typeof refreshDepartments === 'function') {
          await refreshDepartments()
        }

        handleClose()
        reset()
      } else {
        setSnackbar({
          open: true,
          message: response.message || 'Failed to create salary record',
          severity: 'error'
        })
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Error creating salary record',
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
            Add New Salary
          </Typography>
          <IconButton size='small' onClick={handleReset}>
            <i className='tabler-x text-2xl text-textPrimary' />
          </IconButton>
        </div>

        <Divider />

        {/* 🧾 FORM */}
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-6 p-6'>
          
          {/* EMPLOYEE */}
          <Controller
            name='employee'
            control={control}
            rules={{ required: 'Employee is required' }}
            render={({ field }) => (
              <CustomTextField select fullWidth label='Employee' {...field}>
                {employees.map(emp => (
                  <MenuItem key={emp._id} value={emp._id}>
                    {emp.username}
                  </MenuItem>
                ))}
              </CustomTextField>
            )}
          />

   {/* ✅ SALARY FIELDS */}
          {['annualSalary', 'grossSalary', 'basicSalary', 'fixedSalary'].map(name => (
            <Controller
              key={name}
              name={name}
              control={control}
              render={({ field }) => (
                <CustomTextField
                  {...field}
                  fullWidth
                  label={formatLabel(name)}
                />
              )}
            />
          ))}


     

          <Controller
  name='salaryComponents'
  control={control}
  render={({ field }) => (
    <CustomTextField
      select
      fullWidth
      label='Salary Components'
      SelectProps={{
        multiple: true,
        value: field.value ?? [],                 // ✅ ALWAYS ARRAY
        onChange: e => {
          const value = e.target.value
          field.onChange(Array.isArray(value) ? value : []) // ✅ SAFE
        },
        renderValue: selected => {
          if (!selected || selected.length === 0) {
            return <Typography color='text.disabled'>No components selected</Typography>
          }

          return (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map(value => {
                const salary = salaries.find(b => b._id === value)
                return (
                  <Chip
                    key={value}
                    label={salary?.componentName || 'Unnamed'}
                    size='small'
                  />
                )
              })}
            </Box>
          )
        }
      }}
    >
      {loadingSalaries ? (
        <MenuItem disabled>Loading...</MenuItem>
      ) : (
        salaries.map(salary => (
          <MenuItem key={salary._id} value={salary._id}>
            {salary.componentName}
          </MenuItem>
        ))
      )}
    </CustomTextField>
  )}
/>


          {/* HRA FIXED */}
          <Controller
            name='isHraFixed'
            control={control}
            render={({ field }) => (
              <div className='flex items-center gap-3'>
                <Checkbox checked={field.value} onChange={e => field.onChange(e.target.checked)} />
                <Typography>Use Fixed HRA Amount?</Typography>
              </div>
            )}
          />

          {isHraFixed && (
            <Controller
              name='hraFixedAmount'
              control={control}
              rules={{ required: 'Fixed HRA Amount is required' }}
              render={({ field }) => (
                <CustomTextField {...field} fullWidth label='Fixed HRA Amount' />
              )}
            />
          )}


            {/* HRA FIXED */}
          <Controller
            name='isTdsFixed'
            control={control}
            render={({ field }) => (
              <div className='flex items-center gap-3'>
                <Checkbox checked={field.value} onChange={e => field.onChange(e.target.checked)} />
                <Typography>Use Fixed TDS Amount?</Typography>
              </div>
            )}
          />

          {isTdsFixed && (
            <Controller
              name='tdsFixedAmount'
              control={control}
              rules={{ required: 'Fixed TDS Amount is required' }}
              render={({ field }) => (
                <CustomTextField {...field} fullWidth label='Fixed TDS Amount' />
              )}
            />
          )}

          {/* ⭐ NAPS CHECKBOX */}
          <Controller
            name='isNAPS'
            control={control}
            render={({ field }) => (
              <div className='flex items-center gap-3'>
                <Checkbox checked={field.value} onChange={e => field.onChange(e.target.checked)} />
                <Typography>NAPS Applicable?</Typography>
              </div>
            )}
          />

          {/* ⭐ NATS CHECKBOX */}
          <Controller
            name='isNATS'
            control={control}
            render={({ field }) => (
              <div className='flex items-center gap-3'>
                <Checkbox checked={field.value} onChange={e => field.onChange(e.target.checked)} />
                <Typography>NATS Applicable?</Typography>
              </div>
            )}
          />

          {/* Status */}

            <Controller
            name='employeeStatus'
            control={control}
            rules={{ required: 'Employee Status is required' }}
            render={({ field }) => (
              <CustomTextField select fullWidth label='Employee Status' {...field}>
                <MenuItem value='ONROLL'>ONROLL</MenuItem>
                <MenuItem value='CASH'>CASH</MenuItem>
                <MenuItem value='NAPS'>NAPS</MenuItem>
                <MenuItem value='NATS'>NATS</MenuItem>

              </CustomTextField>
            )}
          />
          <Controller
            name='status'
            control={control}
            rules={{ required: 'Status is required' }}
            render={({ field }) => (
              <CustomTextField select fullWidth label='Status' {...field}>
                <MenuItem value='Active'>Active</MenuItem>
                <MenuItem value='Inactive'>Inactive</MenuItem>
              </CustomTextField>
            )}
          />

          {/* Notes */}
          <Controller
            name='notes'
            control={control}
            render={({ field }) => (
              <CustomTextField {...field} fullWidth label='Notes' placeholder='Optional remarks' />
            )}
          />

          {/* Buttons */}
          <div className='flex items-center gap-4'>
            <Button variant='contained' type='submit'>Submit</Button>
            <Button variant='tonal' color='error' onClick={handleReset}>Cancel</Button>
          </div>
        </form>
      </Drawer>

      {/* Snackbar */}
        <Snackbar
                    open={snackbar.open}
                    autoHideDuration={3000}
                    onClose={() => setSnackbar({ ...snackbar, open: false })}
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }} // ✅ LEFT TOP
                  >
                    <MuiAlert
                      onClose={() => setSnackbar({ ...snackbar, open: false })}
                      severity={snackbar.severity}
                      variant='filled'
                      sx={{
                        width: '100%',
                        backgroundColor:
                          snackbar.severity === 'success' ? '#2B3380' : '#D32F2F',
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

export default AddAttendanceDrawer

