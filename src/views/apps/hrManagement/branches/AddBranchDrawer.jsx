// React Imports
import { useState } from 'react'

// MUI Imports
import Button from '@mui/material/Button'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'

// Third-party Imports
import { useForm, Controller } from 'react-hook-form'
import {createBranch} from "../../../../app/server/actions.js"

// Component Imports
import CustomTextField from '@core/components/mui/TextField'

// Vars
const initialData = {
  company: '',
  country: '',
  contact: ''
}
console.log("AddBranchDrawer rendered!")
const AddBranchDrawer = props => {
  // Props
  const { open, handleClose, userData, setData } = props
    console.log("AddBranchDrawer rendered!", props)

  

  // States
  const [formData, setFormData] = useState(initialData)

  // Hooks
  const {
    control,
    reset: resetForm,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      fullName: '',
      username: '',
      email: '',
      role: '',
      plan: '',
      status: ''
    }
  })

  const onSubmit = data => {
    const newUser = {
      id: (userData?.length && userData?.length + 1) || 1,
      avatar: `/images/avatars/${Math.floor(Math.random() * 8) + 1}.png`,
      fullName: data.fullName,
      username: data.username,
      email: data.email,
      role: data.role,
      currentPlan: data.plan,
      status: data.status,
      company: formData.company,
      country: formData.country,
      contact: formData.contact,
      billing: userData?.[Math.floor(Math.random() * 50) + 1].billing ?? 'Auto Debit'
    }

    setData([...(userData ?? []), newUser])
    handleClose()
    setFormData(initialData)
    resetForm({ branchName: '', Plot: '', City: '', State: '', Country: '', Pincode:'',phone:'',emailid:'',status: '' })
  }

  const handleReset = () => {
    handleClose()
    setFormData(initialData)
  }

  return (
    <Drawer
      open={open}
      anchor='right'
      variant='temporary'
      onClose={handleReset}
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 400 } } }}
    >
      <div className='flex items-center justify-between plb-5 pli-6'>
        <Typography variant='h5'>Add Branch</Typography>
        <IconButton size='small' onClick={handleReset}>
          <i className='tabler-x text-2xl text-textPrimary' />
        </IconButton>
      </div>
      <Divider />
      <div>
        <form onSubmit={handleSubmit(data => onSubmit(data))} className='flex flex-col gap-6 p-6'>
            <Controller
            name='branchName'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <CustomTextField
                {...field}
                fullWidth
                label='Branch'
                placeholder='Noida Sector 63'
                {...(errors.branchName && { error: true, helperText: 'This field is required.' })}
              />
            )}
          />
          <Controller
            name='Plot'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <CustomTextField
                {...field}
                fullWidth
                label='Address'
                placeholder='218,E-Block Noida sector 63'
                {...(errors.Plot && { error: true, helperText: 'This field is required.' })}
              />
            )}
          />
          <Controller
            name='City'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <CustomTextField
                {...field}
                fullWidth
                label='City'
                placeholder='Noida'
                {...(errors.City && { error: true, helperText: 'This field is required.' })}
              />
            )}
          />
           <Controller
            name='State'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <CustomTextField
                {...field}
                fullWidth
                label='State/Proviance'
                placeholder='Uttar Pradesh'
                {...(errors.State && { error: true, helperText: 'This field is required.' })}
              />
            )}
          />
          <CustomTextField
            select
            fullWidth
            id='Country'
            value={formData.country}
            onChange={e => setFormData({ ...formData, country: e.target.value })}
            label='Select Country'
            slotProps={{
              htmlInput: { placeholder: 'Country' }
            }}
          >
            <MenuItem value='India'>India</MenuItem>
           
          </CustomTextField>

              <Controller
            name='Pincode'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <CustomTextField
                {...field}
                fullWidth
                label='ZIP/Postal Code'
                placeholder='201301'
                {...(errors.Pincode && { error: true, helperText: 'This field is required.' })}
              />
            )}
          />
              <CustomTextField
            label='Contact'
            type='number'
            fullWidth
            placeholder='(397) 294-5153'
            value={formData.contact}
            onChange={e => setFormData({ ...formData, contact: e.target.value })}
          />

          <Controller
            name='emailid'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <CustomTextField
                {...field}
                fullWidth
                type='email'
                label='Email'
                placeholder='admin@zobox.in'
                {...(errors.emailid && { error: true, helperText: 'This field is required.' })}
              />
            )}
          />
          
        
          <Controller
            name='status'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <CustomTextField
                select
                fullWidth
                id='select-status'
                label='Select Status'
                {...field}
                {...(errors.status && { error: true, helperText: 'This field is required.' })}
              >
                {/* <MenuItem value='pending'>Pending</MenuItem> */}
                <MenuItem value='active'>Active</MenuItem>
                <MenuItem value='inactive'>Inactive</MenuItem>
              </CustomTextField>
            )}
          />
       
        
      
          <div className='flex items-center gap-4'>
            <Button variant='contained' type='submit'>
              Submit
            </Button>
            <Button variant='tonal' color='error' type='reset' onClick={() => handleReset()}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </Drawer>
  )
}

export default AddBranchDrawer




