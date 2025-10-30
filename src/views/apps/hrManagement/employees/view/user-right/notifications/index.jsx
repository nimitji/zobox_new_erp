// // MUI Imports
// import Card from '@mui/material/Card'
// import CardHeader from '@mui/material/CardHeader'
// import CardActions from '@mui/material/CardActions'
// import Typography from '@mui/material/Typography'
// import Checkbox from '@mui/material/Checkbox'
// import Button from '@mui/material/Button'

// // Style Imports
// import tableStyles from '@core/styles/table.module.css'

// // Vars
// const tableData = [
//   {
//     app: false,
//     email: true,
//     browser: false,
//     type: 'New for you'
//   },
//   {
//     app: true,
//     email: false,
//     browser: true,
//     type: 'Account activity'
//   },
//   {
//     app: true,
//     email: true,
//     browser: true,
//     type: 'A new browser used to sign in'
//   },
//   {
//     app: false,
//     email: false,
//     browser: true,
//     type: 'A new device is linked'
//   }
// ]

// const NotificationsTab = () => {
//   return (
//     <Card>
//       <CardHeader title='Notifications' subheader='You will receive notification for the below selected items' />
//       <div className='overflow-x-auto'>
//         <table className={tableStyles.table}>
//           <thead>
//             <tr>
//               <th>Type</th>
//               <th>App</th>
//               <th>Email</th>
//               <th>Browser</th>
//             </tr>
//           </thead>
//           <tbody className='border-be'>
//             {tableData.map((data, index) => (
//               <tr key={index}>
//                 <td>
//                   <Typography color='text.primary'>{data.type}</Typography>
//                 </td>
//                 <td>
//                   <Checkbox defaultChecked={data.app} />
//                 </td>
//                 <td>
//                   <Checkbox defaultChecked={data.email} />
//                 </td>
//                 <td>
//                   <Checkbox defaultChecked={data.browser} />
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//       <CardActions className='flex items-center'>
//         <Button variant='contained' type='submit'>
//           Save Changes
//         </Button>
//         <Button variant='tonal' color='secondary' type='reset'>
//           Discard
//         </Button>
//       </CardActions>
//     </Card>
//   )
// }

// export default NotificationsTab


'use client'

// React Imports
import { useEffect, useState } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid2'
import Divider from '@mui/material/Divider'

// 🏦 Dynamic Bank Details Component
const NotificationsTab = () => {
  const [bankData, setBankData] = useState(null)

  // 🧩 Fetch userBank data from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('selectedUser')
    if (stored) {
      const user = JSON.parse(stored)
      setBankData(user?.userBank || null)
    }
  }, [])

  if (!bankData) {
    return <Typography>Loading bank details...</Typography>
  }

  const {
    nameofHolder,
    bankAccountNum,
    bank,
    bankIFSC,
    branchName,
    accountType,
    upiID,
    taxPlayerId
  } = bankData

  return (
    <Card>
      <CardHeader title='Bank Details' subheader='Employee’s registered bank information' />
      <CardContent>
        <Grid container spacing={4}>
          {/* Left Column */}
          <Grid size={{ xs: 12, md: 6 }}>
            <table>
              <tbody>
                <TableRow label='Account Holder Name' value={nameofHolder} />
                <TableRow label='Account Number' value={bankAccountNum} />
                <TableRow label='Bank Name' value={bank} />
                <TableRow label='Branch Name' value={branchName} />
              </tbody>
            </table>
          </Grid>

          {/* Right Column */}
          <Grid size={{ xs: 12, md: 6 }}>
            <table>
              <tbody>
                <TableRow label='IFSC Code' value={bankIFSC} />
                <TableRow label='Account Type' value={accountType} />
                <TableRow label='UPI ID' value={upiID} />
                <TableRow label='Tax Payer ID' value={taxPlayerId} />
              </tbody>
            </table>
          </Grid>
        </Grid>

        <Divider className='mt-6' />

        <Typography variant='body2' className='mt-4 text-gray-500'>
          *This information is fetched from the employee’s registered account details.
        </Typography>
      </CardContent>
    </Card>
  )
}

// ✅ Reusable Row Component
const TableRow = ({ label, value }) => (
  <tr>
    <td className='p-1 pis-0 is-[180px]'>
      <Typography className='font-medium' color='text.primary'>
        {label}:
      </Typography>
    </td>
    <td className='p-1'>
      <Typography>{value || '—'}</Typography>
    </td>
  </tr>
)

export default NotificationsTab

