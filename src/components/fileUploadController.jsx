// 'use client'

// import { useState } from 'react'
// import { Controller } from 'react-hook-form'
// import Box from '@mui/material/Box'
// import Button from '@mui/material/Button'
// import TextField from '@mui/material/TextField'
// import Typography from '@mui/material/Typography'
// import Avatar from '@mui/material/Avatar'

// const FileUploadController = ({
//   control,
//   errors,
//   name,
//   label,
//   required = false,
//   accept = 'image/*'
// }) => {
//   const [preview, setPreview] = useState(null)
//   const [fileName, setFileName] = useState('')

//   return (
//     <Controller
//       name={name}
//       control={control}
//       rules={required ? { required: `${label} is required` } : {}}
//       render={({ field: { onChange, value } }) => (
//         <Box className='flex flex-col gap-2'>
//           <Typography variant='subtitle1'>{label}</Typography>

//           {/* Image Preview (only for images) */}
//           {preview && accept.includes('image') && (
//             <Avatar
//               src={preview}
//               variant='rounded'
//               sx={{
//                 width: 120,
//                 height: 120,
//                 border: '2px solid #2B3380',
//                 mb: 1
//               }}
//             />
//           )}

//           {/* Input + Browse Button Layout */}
//           <Box className='flex items-center gap-2 w-full'>
//             <TextField
//               fullWidth
//               size='small'
//               placeholder='No file chosen'
//               value={fileName}
//               InputProps={{ readOnly: true }}
//             />

//             <Button
//               variant='outlined'
//               component='label'
//               sx={{
//                 color: '#2B3380',
//                 borderColor: '#2B3380',
//                 whiteSpace: 'nowrap'
//               }}
//             >
//               Browse
//               <input
//                 hidden
//                 type='file'
//                 accept={accept}
//                 onChange={e => {
//                   const file = e.target.files?.[0]
//                   if (!file) return
//                   setFileName(file.name)
//                   onChange(file)
//                   if (accept.includes('image')) {
//                     setPreview(URL.createObjectURL(file))
//                   }
//                 }}
//               />
//             </Button>
//           </Box>

//           {/* Error Message */}
//           {errors[name] && (
//             <Typography variant='caption' color='error'>
//               {errors[name].message}
//             </Typography>
//           )}
//         </Box>
//       )}
//     />
//   )
// }

// export default FileUploadController


'use client'

import { useState } from 'react'
import { Controller } from 'react-hook-form'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'

const FileUploadController = ({
  control,
  errors,
  name,
  label,
  required = false,
  accept = 'image/*'
}) => {
  const [preview, setPreview] = useState(null)
  const [fileName, setFileName] = useState('')

  return (
    <Controller
      name={name}
      control={control}
      rules={required ? { required: `${label} is required` } : {}}
      render={({ field: { onChange, value } }) => (
        <Box className='flex flex-col gap-2'>
          {/* 🔹 Bold Label */}
          <Typography variant='subtitle1'  sx={{ color: '#000000ff' }}>
            {label}
          </Typography>

          {/* 🖼️ Image Preview */}
          {preview && accept.includes('image') && (
            <Avatar
              src={preview}
              variant='rounded'
              sx={{
                width: 120,
                height: 120,
                border: '2px solid #D3D3D3',
                mb: 1
              }}
            />
          )}

          {/* 📂 Input + Browse Button */}
          <Box className='flex items-center gap-2 w-full'>
            <TextField
              fullWidth
              size='small'
              placeholder='No file chosen'
              value={fileName}
              InputProps={{ readOnly: true }}
            />

            <Button
              variant='outlined'
              component='label'
              sx={{
                color: '#111111',
                borderColor: '#111111',
                whiteSpace: 'nowrap'
              }}
            >
              Browse
              <input
                hidden
                type='file'
                accept={accept}
                onChange={e => {
                  const file = e.target.files?.[0]
                  if (!file) return
                  setFileName(file.name)
                  onChange(file)
                  if (accept.includes('image')) {
                    setPreview(URL.createObjectURL(file))
                  }
                }}
              />
            </Button>
          </Box>

          {/* ⚠️ Error Message */}
          {errors[name] && (
            <Typography variant='caption' color='error'>
              {errors[name].message}
            </Typography>
          )}
        </Box>
      )}
    />
  )
}

export default FileUploadController

