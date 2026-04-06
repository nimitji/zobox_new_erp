



'use client'

import { useEffect, useState } from 'react'
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
import { useForm, Controller, useWatch } from 'react-hook-form'
import { fetchListOfNapsNatsUser } from '../../../../app/server/actions'
import CustomTextField from '@core/components/mui/TextField'

const EditDepartment = ({ open, handleClose, selectedDepartment, onSave }) => {
  const [employees, setEmployees] = useState([])
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  })

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors }
  } = useForm({
    defaultValues: {
      napsNatsStatus: '',
      employee: '',
      deductionForThisMonth:'',
      amount: '',
      status: ''
    }
  })

  // ✅ stable watch
  const napsNatsStatus = useWatch({
    control,
    name: 'napsNatsStatus'
  })

  // ✅ Prefill base data
  useEffect(() => {
    if (!selectedDepartment || !open) return

    reset({
      napsNatsStatus: selectedDepartment.napsNatsStatus || '',
      employee: '',                 // 👈 later set
      amount: selectedDepartment.amount || '',
      status: selectedDepartment.status || '',
      deductionForThisMonth:selectedDepartment.deductionForThisMonth || ''
    })
  }, [selectedDepartment, open, reset])

  // ✅ Load employees & then set employee value
  useEffect(() => {
    if (!napsNatsStatus) {
      setEmployees([])
      return
    }

    const loadEmployees = async () => {
      try {
        const res = await fetchListOfNapsNatsUser(`${napsNatsStatus}`)
        const list = Array.isArray(res) ? res : res?.data || []

        setEmployees(list)

        if (selectedDepartment?.employeeId) {
          setValue('employee', selectedDepartment.employeeId) 
        }
      } catch (err) {
        console.error('Error fetching employees:', err)
        setEmployees([])
      }
    }

    loadEmployees()
  }, [napsNatsStatus, selectedDepartment?.employeeId, setValue])

  // ✅ Submit
  const onSubmit = async data => {
    const payload = {
      _id: selectedDepartment?._id,
      employee: data.employee,
      napsNatsStatus: data.napsNatsStatus,
      deductionForThisMonth:data.deductionForThisMonth,
      amount: data.amount,
      status: data.status
    }

    const response = await onSave(payload)

    setSnackbar({
      open: true,
      message: response?.message || 'Updated successfully',
      severity: response?.success ? 'success' : 'error'
    })

    if (response?.success) handleClose()
  }

  const handleReset = () => {
    handleClose()
    reset()
    setEmployees([])
  }

  return (
    <>
      <Drawer open={open} anchor='right' onClose={handleReset}
        sx={{ '& .MuiDrawer-paper': { width: { xs: 320, sm: 420 } } }}>

        <div className='flex items-center justify-between p-5'>
          <Typography variant='h5' fontWeight='bold'>
            Edit NAPS / NATS Amount
          </Typography>
          <IconButton onClick={handleReset}>
            <i className='tabler-x text-2xl' />
          </IconButton>
        </div>

        <Divider />

        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-6 p-6'>

          <Controller
            name='napsNatsStatus'
            control={control}
            rules={{ required: 'Required' }}
            render={({ field }) => (
              <CustomTextField select fullWidth label='NAPS / NATS Type' {...field}>
                <MenuItem value='NAPS'>NAPS</MenuItem>
                <MenuItem value='NATS'>NATS</MenuItem>
              </CustomTextField>
            )}
          />

          <Controller
            name='employee'
            control={control}
            rules={{ required: 'Employee required' }}
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

            <Controller
            name='deductionForThisMonth'
            control={control}
            rules={{ required: 'deductionForThisMonth required' }}
            render={({ field }) => (
              <CustomTextField select fullWidth label='Deduction For This Month' {...field}>
              <MenuItem value="1">January</MenuItem> 
               <MenuItem value="2">February</MenuItem> 
               <MenuItem value="3">March</MenuItem> 
               <MenuItem value="4">April</MenuItem> 
               <MenuItem value="5">May</MenuItem>
                <MenuItem value="6">June</MenuItem> 
                <MenuItem value="7">July</MenuItem> 
                <MenuItem value="8">August</MenuItem> 
                <MenuItem value="9">September</MenuItem> 
                <MenuItem value="10">October</MenuItem>
                 <MenuItem value="11">November</MenuItem> 
                 <MenuItem value="12">December</MenuItem>
              </CustomTextField>
            )}
          />

          <Controller
            name='amount'
            control={control}
            rules={{ required: 'Amount required' }}
            render={({ field }) => (
              <CustomTextField fullWidth label='Amount' {...field} />
            )}
          />

          <Controller
            name='status'
            control={control}
            rules={{ required: 'Status required' }}
            render={({ field }) => (
              <CustomTextField select fullWidth label='Status' {...field}>
                <MenuItem value='Earned'>Earned</MenuItem>
                <MenuItem value='Deduct'>Deduct</MenuItem>
              </CustomTextField>
            )}
          />

          <div className='flex gap-4'>
            <Button type='submit' variant='contained'>Save</Button>
            <Button variant='tonal' color='error' onClick={handleReset}>Cancel</Button>
          </div>
        </form>
      </Drawer>
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

export default EditDepartment



